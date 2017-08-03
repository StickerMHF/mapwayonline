<template>
  <div id="data-map"></div>
</template>

<script>
  import Leaflet from 'leaflet'
  //import Leaflet_draw from 'leaflet-draw'
  import Leaflet_draw from '../../../../../static/js/leaflet-draw/leaflet.draw-src.js'
  import EventComponent from '../../../EventBus.js'


  require('../../../../../node_modules/leaflet-draw/dist/leaflet.draw-src.css');
  require('../../../../../node_modules/leaflet/dist/leaflet.css');
  // TODO  以后MAP_IMAGE_PATH这个图片地址要改成node_modules中的地址
  const MAP_IMAGE_PATH = "http://cdn.bootcss.com/leaflet/1.0.3/images/";

  export default {
    name: 'datamap',
    data ()  {
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
        //  draw插件
        mapViewEditGroup: null,
        drawPlugin: null,

        // 编辑状态的feature属性
        now_editing: null,
        now_layer: null,
      }
    },
    created () {

    },
    mounted () {
      console.log('点击编辑后地图初始化成功');
      this.initMap();
      this.addMapLayer();
      //this.fetchData('/static/data/polylinedata.json');
      //this.initListener();
      this.addDrawPlugin(this.GLOBAL.obj.editFeatures);
    },
    methods: {
      handleClose: function () {

      },
      initMap: function () {
        L.Icon.Default.imagePath = MAP_IMAGE_PATH;

        this.map = L.map("data-map",{
          center: this.map_config.center,
          zoom: this.map_config.zoom,
          minZoom: this.map_config.minZoom,
          maxZoom: this.map_config.maxZoom,
          attributionControl: false
          // scrollWheelZoom: false,
        });
      },

      addMapLayer: function () {
        L.tileLayer(this.baselayer).addTo(this.map);
        // 添加leaflet-draw插件draw和edit的保存图层
        this.mapViewEditGroup = L.featureGroup().addTo(this.map);
      },

      // 添加与其他组件的事件监听
      initListener: function () {
        EventComponent.$on('datamap-data-add', (map_data) => {
          this.init_map_data = map_data;
          this.addDrawPlugin(this.init_map_data);
          L.marker([36, 108]).addTo(this.map);
        });
      },

      inArray: function (arr, obj) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      },

      fetchData: function (url) {
        this.$http.get(url).then((res) => {
          let features = res.data.data.features;
          console.info(res)
          this.addDrawPlugin(features);
        });
      },

      toobarConfig: function (type) {
        let drawConfig = null;

        console.log(type)
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
          case 'LineString':
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

        }
        return drawConfig;
      },

      addDrawPlugin: function (features) {
        // 添加从后台传过来的geojson数据

        let map = this.map;
        let _this = this;
        let drawItem = this.mapViewEditGroup;
        let type = features[0].geometry.type;

        let dbGeojsonLayer = L.geoJson(features, {
          style: {
            color: '#ff7800',
            weight: 2,
            opacity: 1,
            fillColor: 'pink',
            fillOpacity: 1,
            dashArray: '1, 2'
          },
          onEachFeature: this.onEachFeature
        });
        drawItem.addLayer(dbGeojsonLayer);
        featureGroupChangeHandler(drawItem);

        console.info('features', features)

        // 将drawcontrol添加到map上
        _this.drawControl = new L.Control.Draw({
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
        })
        map.addControl(_this.drawControl);

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
                weight: 2,
                opacity: 1,
                dashArray: '1, 2'
              };
            default: return;
          }
        }

        function clicMapToSave (e) {
          //console.log(e);
          var _layer = e.target;
          if (!_this.now_layer) {
            return ;
          }

          // 前后点击的两个feature这不一样
          if (_this.now_layer != _layer) {
            var _type = _this.now_layer.feature.geometry.type;
            if (_type === 'Point') {
              var latLng = _this.now_layer._latlng;
              var _latLng = e.latlng;
              if ( latLng != _latLng ) {
                saveToDb(_this.now_layer);
                cancelEditState();
              }
            }
            else if (_type === 'LineString') {
              var latLngs = _this.now_layer._latlngs;
              var _latLng = e.latlng;
              if ( !_this.inArray(latLngs, _latLng) ) {
                saveToDb(_this.now_layer);
                cancelEditState();
              }
            }
            else if (_type === 'Polygon') {
              var bounds = _this.now_layer.getBounds();
              var _latLng = e.latlng;
              /*console.log(bounds)
               debugger;*/
              if ( !bounds.contains(_latLng) ) {
                saveToDb(_this.now_layer);
                cancelEditState();
              }
            }
          }
        }





        /**
         * onEachFeature：从数据库读取和用户创建的feature的编辑结束事件
         */
        function onEachFeature (feature, layer) {
          // 将编辑过的feature保存到为当前的一个状态，并且释放源码中改过的禁止掉map的click事件   e.target._map.off('click');  源码注释： 韩帅
          function updateEditedFeature () {
            let map = _this.map;
            _this.now_layer = layer;
            setTimeout(function () {
              map.on('click', clicMapToSave);
              console.info('map对象的点击事件为',map.click)
            }, 0);
          }

          layer.on('edit', updateEditedFeature);
          layer.on('dragend', updateEditedFeature);
        }

        /**
         * initEditState: 图层feature点击的处理函数
         */
        function initEditState (e) {
          _this.now_editing = e.layer.editing;
          _this.now_layer = e.layer;
          /*console.log(_this.now_layer);
           debugger;*/
          _this.now_editing.enable();
          console.info('点击的feature为' + e.layer.feature.properties.name)
          // 请求当前选中feature的属性信息，填充feature字段区域
          //Edit.getData('./data/schema.json', Edit.creaeSchemaList);
        }

        /**
         * cancelEditState：取消feature编辑状态
         */
        function cancelEditState () {
          _this.now_editing.disable();
          _this.now_editing = null;
          _this.now_layer = null;

          // 隐藏右侧编辑记录页面
        }

        function saveToDb (obj) {
          console.info(obj, '已成功保存到数据库');
        }

        /**
         * featureClick: 图层feature点击的处理函数
         */
        function featureClick (e) {
          // 禁止map的click事件
          //_this.map.on('click', clicMapToSave);
          L.DomEvent.stopPropagation(e);
          //console.info(e)
          if ( !_this.now_layer ) {
            initEditState(e);
            console.info('没有当前编辑的图层')
          }
          else {
            if (_this.now_layer === e.layer) {
              // 当前点击的feature和上次点击的是同一个
              //this.featureMapViewToggle();
            }
            else {
              saveToDb(_this.now_layer);
              cancelEditState();

              initEditState(e);
            }
          }
        }

        /**
         * featureGroupChangeHandler：如果editGroup中有layer添加，重新给editGroup中的layer绑定点击事件
         */
        function featureGroupChangeHandler (drawItem) {
          drawItem.eachLayer(function (layer) {
            layer.on('click', featureClick);
          });
        }

        // 添加手动画的geojson数据
        map.on(L.Draw.Event.CREATED, function (e) {
          let layer = e.layer;
          let type = e.layerType;
          let drawGeoJsonLayer = L.geoJson(layer.toGeoJSON(), {
            style: getStyle.bind(this, type),
            onEachFeature: onEachFeature
          });
          drawItem.addLayer(drawGeoJsonLayer)
          featureGroupChangeHandler(drawItem);
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
