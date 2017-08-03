<template>
  <div id="data-map"></div>
</template>

<script>
  import Leaflet from 'leaflet'
  //import Leaflet_draw from 'leaflet-draw'
  import Leaflet_draw from '../../../../../static/mapDesign/js/leaflet-draw/leaflet.draw-src.js'
  import { mapGetters, mapActions } from 'vuex'
  var Terraformer = require('terraformer-arcgis-parser');

  require('../../../../../node_modules/leaflet-draw/dist/leaflet.draw-src.css');
  require('../../../../../node_modules/leaflet/dist/leaflet.css');
  // TODO  以后MAP_IMAGE_PATH这个图片地址要改成node_modules中的地址
  const MAP_IMAGE_PATH = "http://cdn.bootcss.com/leaflet/1.0.3/images/";


  export default {
    name: 'editmap',
    data () {
      return {
        map: null,
        markers: null,
        geoJsonLayer: null,
        init_map_data: null,
        reset_btn: null,
        map_config: {
          zoom: 5,
          center: [36, 108],
          minZoom: 2,
          maxZoom: 18
        },
        baselayer: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
        mapViewEditGroup: null,
        geoJsonLayer: null,

        // 编辑状态的feature属性
        now_layer: null,
        now_feature: null
      }
    },
    computed: {
      ...mapGetters([
        'edit'
      ])
    },
    mounted () {
      this.initMap();
      this.addMapLayer();
      this.fetchData();
      this.initListener();
      //console.log(this.edit);
    },
    methods: {
      ...mapActions([
         'setDViewProperties', 'setIsSave',  'setSubmitFeature'
      ]),
      initListener: function () {
        this.$bus.$on('reset-edit-state', function () {
          console.log('重置前', _this.now_layer);
          this.cancelEditState();
        });

        this.$bus.$on('delete-feature', function () {
          debugger
          this.geoJsonLayer.removeLayer(_this.now_layer);
          this.cancelEditState();
        });
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
        this.mapViewEditGroup = L.featureGroup().addTo(this.map);
      },

      addMapLayer: function () {
        L.tileLayer(this.baselayer).addTo(this.map);
      },

      fetchData: function () {
        var url ;
        switch (this.$route.params.dataid) {
          case '0':
            url = '../../../../static/data/pointdata.json';
            break;
          case '1':
            url = '../../../../static/data/polylinedata.json';
            break;
          case '2':
            url = '../../../../static/data/polygondata.json';
            break;
        }

        this.$http.get(url).then((res) => {
          let features = res.data.data.features;
          console.info(res)
          this.addDrawPlugin(features);
        });
      },

      toobarConfig: function (type) {
        let drawConfig = null;

        switch (type) {
          case 'Point':
            drawConfig = {
              rectangle: false,
              polyline: false,
              circle: false,
              marker: true,
              polygon: false
            };
            break;

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
            drawConfig = {
              rectangle: false,
              polyline: true,
              circle: false,
              marker: false,
              polygon: false
            };
            break;

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
          drawConfig = {
            rectangle: false,
            polyline: false,
            circle: false,
            marker: false,
            polygon: true
          };
          break;
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

      /**
       * initEditState: 图层feature点击的clicMapToSave
       */
      initEditState: function  (layer) {
        this.now_layer = layer;
        this.now_layer.editing.enable();
        this.setDViewProperties(layer.feature.properties);
        this.setIsSave(false);
      },

      /**
       * cancelEditState：取消feature编辑状态
       */
      cancelEditState: function  () {
        this.now_layer.editing.disable();
        this.now_layer = null;
        this.setDViewProperties(null);
        this.setIsSave(true);
        this.now_feature = null;
        this.setSubmitFeature(null);
      },

      onEachFeature: function (feature, layer) {
        var _this = this;
        //线和面处理编辑完后的处理
        layer.on('edit', function() {
          _this.now_editing = layer.editing;
          _this.now_layer = layer;
          var latlngs = [], latlngsArray = layer.editing.latlngs, _feature, type = layer.feature.geometry.type;
          //TODO 多线和多面没处理
          if (latlngsArray.length === 1) {
            latlngsArray[0].forEach(function (item) {
              var temArray = [item.lat, item.lng];
              latlngs.push(temArray);
            });
          }
          switch ( type ) {
            case 'LineString':
              _feature = L.polyline(latlngs);
              break;
            case 'Polygon':
              _feature = L.polygon(latlngs);
              break;
          }
          _this.now_feature = Terraformer.convert(_feature.toGeoJSON());
          _this.setSubmitFeature(_this.now_feature);
        });

        //点编辑后的处理
        layer.on('dragend', function(e) {
          _this.now_editing = layer.editing;
          _this.now_layer = layer;
          var latlng = e.target._latlng, _feature;
          _feature = L.marker(latlng);
          _this.now_feature = Terraformer.convert(_feature.toGeoJSON());
          console.log('拖动后', _this.edit);
          _this.setSubmitFeature(_this.now_feature);
        });

        layer.on('click', function  (e) {
          var _layer = e.target;
          if ( !_this.now_layer ) {
            console.log(layer);
            _this.initEditState(_layer);
            console.log('点击之后_this.now_layer', _this.now_layer)
          } else {
            if (_this.now_layer != _layer) {  // 当前点击的feature和上次的不一样
              if ( _this.edit.isSave === false) {
                _this.$confirm('当前有未保存的数据', '提示', {
                  type: 'warning'
                }).then(() => {
                  //saveToDb(_this.edit.now_layer);
                  _this.cancelEditState();
                  _this.initEditState(_layer);
                  console.log('点击别的feature', _this.now_layer)
                }).catch(() => {

                });
              }
            }
          }
        });
      },

      addDrawPlugin: function (features) {
        let map = this.map;
        let _this = this;
        let drawItem = _this.mapViewEditGroup;
        let type = features[0].geometry.type;

        // 添加从后台传过来的geojson数据
        _this.geoJsonLayer = L.geoJson(features, {
          style: {
            color: '#ff7800',
            weight: 5,
            opacity: 1,
            fillColor: 'pink',
            fillOpacity: 1,
            dashArray: '1, 2'
          },
          onEachFeature: _this.onEachFeature
        });
        drawItem.addLayer(_this.geoJsonLayer);

        // 添加draw插件
        map.addControl(new L.Control.Draw({
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
          draw: _this.toobarConfig(type)
        }));

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


        function saveToDb (obj) {
          console.log('保存到数据库')
        }

        /**
         * featureClick: 图层feature点击的处理函数
         */


        // 添加手动画的geojson数据
        map.on(L.Draw.Event.CREATED, function (e) {
          let layer = e.layer;
          let type = e.layerType;
          _this.geoJsonLayer = L.geoJson(layer.toGeoJSON(), {
            style: getStyle.bind(this, type),
            onEachFeature: _this.onEachFeature
          });
          drawItem.addLayer(_this.geoJsonLayer);
          debugger
          console.log(_this.now_layer)
          if (_this.now_layer) { //如果有正在编辑的feature
            _this.$confirm('当前有未保存的数据?', '提示', {
              type: 'warning'
            }).then(() => {
              //saveToDb(_this.edit.now_layer);
              _this.cancelEditState();
              _this.initEditState(_this.geoJsonLayer.getLayers()[0]);
              console.log('添加新的feature', _this.now_layer)
            }).catch(() => {
              drawItem.removeLayer(_this.geoJsonLayer);
            });
          } else {
            _this.initEditState(_this.geoJsonLayer.getLayers()[0]);
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
