<template>
  <div id="data-map"></div>
</template>

<script>
  import Leaflet from 'leaflet'
  //import Leaflet_draw from 'leaflet-draw'
  import Leaflet_draw from '../../../../../static/mapDesign/js/leaflet-draw/leaflet.draw-src.js'
  import { mapGetters, mapActions } from 'vuex'
  import Tool from '@/components/tool.vue'

  var Terraformer = require('terraformer-arcgis-parser');

  require('../../../../../node_modules/leaflet-draw/dist/leaflet.draw-src.css');
  require('../../../../../node_modules/leaflet/dist/leaflet.css');
  // TODO  以后MAP_IMAGE_PATH这个图片地址要改成node_modules中的地址
  const MAP_IMAGE_PATH = "http://cdn.bootcss.com/leaflet/1.0.3/images/";


  export default {
    name: 'editmap',
    props: ['message'],
    data () {
      return {
        map: null,
        drawPlugin: null, // 实例化的draw插件
        map_config: {
          zoom: 5,
          center: [36, 108],
          minZoom: 2,
          maxZoom: 20
        },
        baselayer: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
        featureGroup: null, // 添加leaflet-draw插件draw的layer和默认原始layer的保存图层， featureGroup

        // 编辑状态的feature属性
        now_layer: null, // 当前处在编辑状态的layer

        fieldSchema: {},  // 后台传过来的数据的所有字段

        mapLoading: false, // 加载数据时，loading动画控制
      }
    },
    computed: {
      ...mapGetters([
        'edit'
      ])
    },
    mounted () {
      console.log(this.message)
      this.initMap();
      this.addMapLayer();
      this.fetSchema();
      this.addDrawPlugin([this.message]);
      this.initEvent();
    },
    methods: {
      ...mapActions([
        'setIsSave', 'setEditLog', 'setSubmitFeature', 'setSchema', 'setEditType',
      ]),
      initEvent: function () {

      },

      initMap: function () {
        L.Icon.Default.imagePath = MAP_IMAGE_PATH;
        this.map = L.map("data-map",{
          center: this.map_config.center,
          zoom: this.map_config.zoom,
          minZoom: this.map_config.minZoom,
          maxZoom: this.map_config.maxZoom,
          attributionControl: false,
          // scrollWheelZoom: false,
        });
        // 添加leaflet-draw插件draw和edit的保存图层
        this.featureGroup = L.featureGroup().addTo(this.map);
      },

      addMapLayer: function () {
        L.tileLayer(this.baselayer).addTo(this.map);
      },

      fetSchema () {
        var id = this.$route.params.id;
        var url = 'datacenter/datas/' + id + '/field';

        this.$http.get(url).then((res) => {
          let field = res.data.data;
          this.setSchema(field);
          this.$bus.emit('update-schema', field);

          field.forEach((item) => {
            if (Tool.postsql2Js(item.type) === 'number') {
              item.value = 0;
              return;
            }

            if (Tool.postsql2Js(item.type) === 'string') {
              item.value = '';
              return;
            }

            if (Tool.postsql2Js(item.type) === 'date') {
              item.value = Tool.sqlDateFormet(new Date);
              return;
            }
          });

          this.fieldSchema = field;
        })
      },

      toobarConfig: function (type) {
        let drawConfig = {};

        switch (type) {
          case 'Point':
          case 'MultiPoint':
            drawConfig = {
              rectangle: false,
              polyline: false,
              circle: false,
              marker: true,
              polygon: false
            };
            break;

          case 'LineString':
          case 'MultiLineString':
            drawConfig = {
              rectangle: false,
              polyline: true,
              circle: false,
              marker: false,
              polygon: false
            };
            break;

          case 'Polygon':
          case 'MultiPolygon':
            drawConfig = {
              rectangle: false,
              polyline: false,
              circle: false,
              marker: false,
              polygon: true
            };
            break;
        }
        return drawConfig;
      },

      /* 图层feature点击的clicMapToSave */
      initEditState: function  (layer, feature) {
        var arcgisJson = Terraformer.convert(layer.toGeoJSON());
        this.setSubmitFeature(Tool.clone(arcgisJson));

        this.now_layer = layer;
        this.now_layer.editing.enable();
        this.setEditLog(true);
        //显示editlog
        this.setIsSave(false);

        var editType = this.edit.editType;

        switch (editType) {
          case 'add':
            this.$bus.emit('data-view-add-property', Tool.clone(this.fieldSchema));
            break;
          case 'update':
            this.$bus.emit('data-view-update-property', Tool.clone(this.schemaAddValueField(feature)));
            break;
        }
      },

      /**
       * cancelEditState：取消feature编辑状态
       */
      cancelEditState: function  () {
        if (!!this.now_layer && !!this.now_layer.editing) {
          this.now_layer.editing.disable();
          this.now_layer = null;
        }

        this.setIsSave(true);
        this.setEditLog(false); // 隐藏右侧editlog
        this.setEditType('');
      },

      onEachFeature: function (feature, layer) {
        var vm = this;

        layer.on('click', function  (e) {
          vm.setEditType('update');
          let layer = e.layer || e.target, feature = e.target.feature;

          /*  编辑开始 */
          //线和面处理编辑完后的处理
          layer.on('edit', function() {
            var arcgisJson = Terraformer.convert(layer.toGeoJSON());
            //console.log(arcgisJson)
            vm.setSubmitFeature(Tool.clone(arcgisJson));
            console.log('vm.edit.submitFeature', vm.edit.submitFeature)
          });

          //点编辑后的处理  // TODO
          layer.on('dragend', function(e) {
            vm.now_layer = layer;
            var latlng = e.target._latlng, _feature;
            _feature = L.marker(latlng);
            var now_feature = Terraformer.convert(_feature.toGeoJSON());

            //debugger
            console.log('拖动后', vm.edit);
            vm.setSubmitFeature(now_feature);
          });
          /*  编辑结束 */

          if ( !vm.now_layer ) {
            vm.initEditState(layer, feature);
            console.log('点击之后vm.now_layer', vm.now_layer)
          } else {
            if (vm.now_layer != layer) {  // 当前点击的feature和上次的不一样
              if ( vm.edit.isSave === false) {
                /*vm.$confirm('当前有未保存的数据', '提示', {
                  type: 'warning'
                }).then(() => {*/
                  vm.cancelEditState();
                  vm.initEditState(layer, feature);
                  console.log('点击别的feature', vm.now_layer)
                //}).catch((err) => { console.log(err); });
              }
            }
          }
        });
      },

      /* 给字段字段的schame数据中的每一项添加value字段，并为其赋值 */
      schemaAddValueField (feature) {
        var proObj = Tool.clone(this.fieldSchema), proArr = [];

        for (let i in proObj) {
          proArr.push(proObj[i]);
        }

        proArr.forEach((item) => {
          item.value = feature.properties[item.name];
        });

        return proArr;
      },

      addDrawPlugin: function (features) {
        let map = this.map;
        let vm = this;
        let drawItem = vm.featureGroup;
        let type = features[0].geometry.type;

        map.off(L.Draw.Event.CREATED);

        // 添加从后台传过来的geojson数据
        var defalutLayer = L.geoJson(features, {
          style: {
            color: '#ff7800',
            weight: 5,
            opacity: 1,
            fillColor: 'pink',
            fillOpacity: 1,
            dashArray: '1, 2',
          },
          onEachFeature: vm.onEachFeature
        });
        console.log(defalutLayer);
        drawItem.addLayer(defalutLayer);
        map.fitBounds(defalutLayer.getBounds(), { maxZoom: 10 });


        // 添加draw插件
        if (!this.drawPlugin) {
          this.drawPlugin =  new L.Control.Draw({
            position: 'topright',
            edit: {
              selectedPathOptions: {
                dashArray: '10, 10',
                fill: true,
                fillColor: '#fe57a1',
                fillOpacity: 0.1,
                // Whether to user the existing layers color
                maintainColor: false
              },
              poly: null,
              featureGroup: drawItem,
              remove: false,
              edit: false
            },
            draw: vm.toobarConfig(type),
          });
          map.addControl(this.drawPlugin);
        }

        function getStyle (type) {
          switch (type) {
            case 'polygon':
              return {
                color: '#ff7800',
                weight: 2,
                opacity: 1,
                fillColor: 'pink',
                fillOpacity: 1,
                dashArray: '1, 2'
              };
            case 'polyline':
              return {
                color: '#ff7800',
                weight: 5,
                opacity: 1,
                dashArray: '1, 2'
              };
            default: return;
          }
        }


        // 添加手动画的geojson数据
        map.on(L.Draw.Event.CREATED, function (e) {
          vm.setEditType('add');
          let layerFromE = e.layer, type = e.layerType;

          var drawLayer = L.geoJson(layerFromE.toGeoJSON(), {
            style: getStyle.bind(this, type),
            onEachFeature: vm.onEachFeature
          });
          var arcgisJson = Terraformer.convert(drawLayer.toGeoJSON());
          //console.log(arcgisJson[0]);
          vm.setSubmitFeature(arcgisJson[0]);

          drawItem.addLayer(drawLayer);
          var layer = drawLayer.getLayers()[0], feature = layer.feature;

          if (vm.now_layer) { //如果有正在编辑的feature
            /*vm.$confirm('当前有未保存的数据?', '提示', {
              type: 'warning'
            }).then(() => {*/
              vm.cancelEditState();
              vm.initEditState(layer, feature);
              console.log('添加新的feature', vm.now_layer)
            /*}).catch(() => {
              drawItem.removeLayer(drawLayer);
            });*/
          } else {
            vm.initEditState(layer, feature);
          }
        });
      },

    }
  }
</script>

<style scoped>
  #data-map {
    width: 100%;
    height: 100%;
  }
</style>
