<template>
  <div id="render-map"></div>
</template>
<script>
  import Leaflet from 'leaflet'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import Tool from '@/components/tool.vue'
  require('../../../../node_modules/leaflet/dist/leaflet.css');
  // TODO  以后MAP_IMAGE_PATH这个图片地址要改成node_modules中的地址
  const MAP_IMAGE_PATH = "http://cdn.bootcss.com/leaflet/1.0.3/images/";

  export default {
    name: 'rendermap',
    data () {
      return {
        map: null,
        datas: [],
        /*datas: [{
         id: **,
         layer: **
         }],*/
        currentLayerId: null,
        markers: null,
        geoJsonLayer: null,
        init_map_data: null,
        reset_btn: null,
        map_config: {
          zoom: 3,
          center: [36, 108],
          minZoom: 2,
          maxZoom: 18
        },
        baseLayer: null,
        renderLayer: null,
        labelLayer: null,
        layer: null,
        labelClass: 'render-label',
        pointClassifyArray: null,
        lineClassifyArray: null,
        polygonClassifyArray: null,
      }
    },
    computed: {
      ...mapGetters([
        'render'
      ]),
    },
    created () {
      this.initEvent();
    },
    mounted () {
      console.log('地图初始化成功');
      this.initMap();
      this.addDefaultLayer();
    },
    methods: {
      ...mapActions([
        'setLayers', 'setBaseLayer', 'addOverlayer', 'setCurrentStyle', 'updateOverLayer', 'updateOverLayerLabel'
      ]),
      initEvent () {

        this.$bus.on('run-init-simple', (obj) => {
          this.changeToRenderSimple(obj);
        });

        this.$bus.on('simple-render-change', (obj) => {
          this.changeToRenderSimple(obj);
        });

        this.$bus.on('restore-render', (obj) => {
          this.restoreRender(obj);
        });

        /* 分级开始 */
        this.$bus.on('grade-render-change', (obj) => {
          this.changeToRenderGrade(obj);
        });

        this.$bus.on('grade-meghod-change', (obj) => {
          this.changeToGradeMethod(obj);
        });

        this.$bus.on('grade-fill-change', (item, obj) => {
          if (obj.isPoint) {
            this.changePointFill(item, obj);
          } else if (obj.isLine) {
            this.changeLineBorder(item, obj);
          } else if (obj.isPolygon) {
            this.changePolygonFill(item, obj);
          }
        });

        this.$bus.on('grade-circle-border-change', (obj) => {
          if (obj.isPoint) {
            this.pointRibbonChange(obj);
          } else if (obj.isPolygon) {
            this.polygonRibbonChange(obj);
          }
        });

        this.$bus.on('grade-ribbon-change', (obj) => {
          if (obj.isPoint) {
            this.pointRibbonChange(obj);
          } else if (obj.isLine) {
            this.lineRibbonChange(obj);
          } else if (obj.isPolygon) {
            this.polygonRibbonChange(obj);
          }
        });

        /* 分类开始 */
        this.$bus.on('type-render-change', (obj) => {
          this.changeToRenderType(obj);
        });

        this.$bus.on('type-fill-change', (item, obj) => {
          if (obj.isPoint) {
            this.changePointFill(item, obj);
          } else if (obj.isLine) {
            this.changeLineBorder(item, obj);
          } else if (obj.isPolygon) {
            this.changePolygonFill(item, obj);
          }
        });

        this.$bus.on('type-circle-border-change', (obj) => {
          if (obj.isPoint) {
            this.pointRibbonChange(obj);
          } else if (obj.isPolygon) {
            this.polygonRibbonChange(obj);
          }
        });

        this.$bus.on('type-ribbon-change', (obj) => {
          if (obj.isPoint) {
            this.pointRibbonChange(obj);
          } else if (obj.isLine) {
            this.lineRibbonChange(obj);
          } else if (obj.isPolygon) {
            this.polygonRibbonChange(obj);
          }
        });


        this.$bus.on('label-change', (obj) => {
          this.changeToLabel(obj);
        });

        this.$bus.on('remove-label', () => {
          this.removeLabel();
        });

        this.$bus.on('add-label', () => {

          var temObj; // 临时存放label对象
          this.currentLayerId = this.render.currentLayerId;

          var over_layer = this.render.savedLayers.over_layer;

          over_layer.forEach((item) => {
            if (item.data_id === this.currentLayerId) {
              temObj = Tool.clone(item.label);
            }
          });

          if (!temObj) {
            // temObj为空，说明当前图层没有添加label
            return;
          }
          this.changeToLabel(temObj);
        });

        this.$bus.on('remove-layer', (id) => {
          this.removeLayer(id);
        });

        this.$bus.on('add-layer', (id) => {
          this.addLayer(id);
        });
      },

      initMap() {
        L.Icon.Default.imagePath = MAP_IMAGE_PATH;
        this.map = L.map("render-map",{
          center: this.map_config.center,
          zoom: this.map_config.zoom,
          minZoom: this.map_config.minZoom,
          maxZoom: this.map_config.maxZoom,
          attributionControl: false,
          scrollWheelZoom: true,
        });
      },
      addDefaultLayer() {
        this.baseLayer = L.tileLayer('http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}').addTo(this.map);
        this.setBaseLayer('http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}');
        this.renderLayer = L.layerGroup().addTo(this.map);
        this.labelLayer = L.layerGroup().addTo(this.map);
      },

      removeLayer (id) {
        //debugger
        this.datas.forEach((item) => {
          if (item.id === id) {
            this.renderLayer.removeLayer(item.layer);
          }
        });
      },

      addLayer (id) {
        this.datas.forEach((item) => {
          if (item.id === id) {
            this.renderLayer.addLayer(item.layer);
          }
        });
      },

      /* 简单渲染 */
      changeToRenderSimple (obj) {
        var layers = [], data = this.render.geoJsons, _this = this, layers = [], currentLayer;
        this.currentLayerId = this.render.currentLayerId;

        if (typeof this.currentLayerId === 'number' && this.currentLayerId.toString()) {
          this.datas.forEach((item) => {
            if (this.currentLayerId == item.id) {
              currentLayer = item.layer;
            }
          });

          for(let i in currentLayer._layers) {
            let graphic = currentLayer._layers[i];
            graphic.setStyle( Tool.getFeatureStyle(obj) );
          }
          return;
        }

        console.log("data.length" ,data.length);

        //debugger  TODO 循环次数多

        data.forEach((item, index) => {
          var geometryType = item.data.features[0].geometry.type, layer; // TODO 需要后台传过来
          var style = Tool.createInitStyle(geometryType);
          console.log(style)
          //debugger
          if (geometryType === 'LineString' || geometryType === 'MultiLineString') {

            layer = L.geoJson(item.data, {
              style: function () {
                return style;
              },
            });
            this.$bus.$emit('simple-color-change', style.color);

          } else if (geometryType === 'Point' || geometryType === 'MultiPoint') {
            layer = L.geoJson(item.data, {
              pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, style);
              }
            });
            this.$bus.$emit('simple-fill-color-change', style.fillColor);

          } else if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {

            layer = L.geoJson(item.data, {
              style: function () {
                return style;
              }
            });
            this.$bus.$emit('simple-fill-color-change', style.fillColor);
          }

          this.renderLayer.addLayer(layer);

          this.datas.push({
            id: index,
            layer,
          });

          layers.push({
            data_id: index,
            isAdded: true,
          });


          // 每条数据初始化默认简单渲染保存下渲染style
          //this.addCurrentLayerRender();

          this.addOverlayer({
            data_id: index,
            gtype: geometryType,

            render: {
              style: Tool.clone(obj),
              rtype: this.render.renderType,
            },
            label: null
          });
        });
        this.setLayers(layers);
        this.$bus.$emit('update-layers', layers);
      },

      restoreRender (obj) {
        var type = obj.rtype;
        var _obj =  obj.style;

        if (type === 'simple') {
          this.changeToRenderSimple(_obj);
        } else if (type === 'grade') {

          this.changeToGradeMethod(_obj);
        } else if (type === 'type') {
          this.changeToRenderType(_obj);
        }
      },


      clearRenderLayer () {
        this.renderLayer.clearLayers();
        this.layer = null;
      },


      /* 分级渲染 */
      changeToRenderGrade: function (obj) {
        var datas = this.render.geoJsons, data, currentLayer;
        this.currentLayerId = this.render.currentLayerId;

        datas.forEach((item) => {
          if (item.id === this.currentLayerId) {
            data = item.data;
          }
        });

        var geometryType = data.features[0].geometry.type;

        var currentField = obj.field.value;
        var fieldVals = Tool.getGradeValue(data, currentField);  // fieldVals符合要求的字段的所有可取值 []

        var grade = obj.grade.value, min = Math.min.apply(null, fieldVals), max = Math.max.apply(null, fieldVals);
        var fieldValsSortedGrouped = Tool.groupArray(min, max, grade);

        var gradients = this.render.gradients;
        var gradientsIndex = obj.ribbon.value;

        Tool.getGradeArray(geometryType, fieldValsSortedGrouped, obj, gradients[gradientsIndex]);

        if (typeof this.currentLayerId === 'number' && this.currentLayerId.toString()) {
          this.datas.forEach((item) => {
            if (this.currentLayerId == item.id) {
              currentLayer = item.layer;
              this.layer = item.layer;
            }
          });

          for (var i in currentLayer._layers) {
            let graphic = currentLayer._layers[i];
            let field = graphic.feature.properties[currentField];
            if (!field) {
              this.$message({
                showClose: true,
                message: '当前字段值为' + field,
                type: 'warning',
              });
              return;
            }

            let index = Tool.getIndexInArray(fieldValsSortedGrouped, field);
            debugger

            if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
              obj.border.color = gradients[gradientsIndex][index];
            } else if (geometryType === 'Point' || geometryType === 'MultiPoint') {
              obj.fill.color = gradients[gradientsIndex][index];
            } else if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
              obj.fill.color = gradients[gradientsIndex][index];
            }

            graphic.setStyle( Tool.getFeatureStyle(obj) );
          }

          return;
        }
      },

      /* 分级规则改变后重新渲染图层 */
      changeToGradeMethod (obj) {
        var datas = this.render.geoJsons, data;
        var currentLayer;
        this.currentLayerId = this.render.currentLayerId;

        datas.forEach((item) => {
          if (item.id === this.currentLayerId) {
            data = item.data;
          }
        });


        var geometryType = data.features[0].geometry.type;

        var currentField = obj.field.value;

        if (typeof this.currentLayerId === 'number' && this.currentLayerId.toString()) {
          this.datas.forEach((item) => {
            if (this.currentLayerId == item.id) {
              currentLayer = item.layer;
              this.layer = item.layer;
            }
          });

          var nowStyleArray = obj.pointGradeArray || obj.lineGradeArray || obj.polygonGradeArray;

          for (var i in currentLayer._layers) {
            let graphic = currentLayer._layers[i];
            let index = Tool.getIndexInArray(nowStyleArray, graphic.feature.properties[currentField]);
            console.log(index);
            //debugger
            if (geometryType === 'Point' || geometryType === 'MultiPoint') {
              graphic.setStyle({
                radius: nowStyleArray[index].radius,
                fillColor: nowStyleArray[index].fillColor,
                color: obj.border.color,
                weight: obj.border.weight,
                opacity: null,
                fillOpacity: null
              });
            } else if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
              graphic.setStyle({
                radius: obj.fill.radius,
                fillColor: obj.fill.color,
                color: nowStyleArray[index].fillColor,
                weight: nowStyleArray[index].weight,
                opacity: null,
                fillOpacity: null
              });
            } else if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
              graphic.setStyle({
                radius: obj.fill.radius,
                fillColor: nowStyleArray[index].fillColor,
                color: obj.border.color,
                weight: obj.border.weight,
                opacity: null,
                fillOpacity: null
              });
            }


          }
        }
      },

      /* 分类渲染 */
      changeToRenderType: function (obj) {
        var datas = this.render.geoJsons, data;
        var currentLayer;
        this.currentLayerId = this.render.currentLayerId;

        datas.forEach((item) => {
          if (item.id === this.currentLayerId) {
            data = item.data;
          }
        });

        var geometryType = data.features[0].geometry.type;

        var currentField = obj.field.value;
        var fieldVals = Tool.getTypeValue(data, currentField);


        var gradients = this.render.gradients;
        var gradientsIndex = obj.ribbon.value;



        Tool.getClassifyArray(geometryType, fieldVals, obj, gradients[gradientsIndex]);

        if (typeof this.currentLayerId === 'number' && this.currentLayerId.toString()) {
          this.datas.forEach((item) => {
            if (this.currentLayerId == item.id) {
              currentLayer = item.layer;
              this.layer = item.layer;
            }
          });

          var valueArr = Tool.getFieldValue(currentLayer, currentField)

          for(let i in currentLayer._layers) {
            let graphic = currentLayer._layers[i];
            let index = valueArr.indexOf( graphic.feature.properties[currentField]);
            if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
              obj.border.color = gradients[gradientsIndex][index];
            } else if (geometryType === 'Point' || geometryType === 'MultiPoint') {
              obj.fill.color = gradients[gradientsIndex][index];
            } else if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
              obj.fill.color = gradients[gradientsIndex][index];
            }

            graphic.setStyle( Tool.getFeatureStyle(obj) );
          }
        }
      },

      pointRibbonChange: function (obj) {
        var layer = this.layer, gradients = this.render.gradients, type = this.render.renderType;

        if (!!obj.pointClassifyArray) {
          obj.pointClassifyArray.forEach((item, index) => {
            item.fillColor = gradients[obj.ribbon.value][index];
          });
        }

        if (!!obj.pointGradeArray) {
          obj.pointGradeArray.forEach((item, index) => {
            item.fillColor = gradients[obj.ribbon.value][index];
          });
        }

        var nowStyleArray = obj.pointClassifyArray || obj.pointGradeArray, currentField = obj.field.value;

        for(var i in layer._layers) {
          var graphic = layer._layers[i];

          if (type === 'type') {
            nowStyleArray.forEach((item) => {
              if(graphic.feature.properties[currentField] === item.fieldVal) {

                graphic.setStyle({
                  radius: item.radius,
                  fillColor: item.fillColor,
                  color: obj.border.color,
                  weight: obj.border.weight,
                  opacity: null,
                  fillOpacity: null
                });
              }
            });
          }

          if (type === 'grade') {
              let index = Tool.getIndexInArray(nowStyleArray, graphic.feature.properties[currentField]);
              if(typeof index === 'number' && index.toString()) {
                graphic.setStyle({
                  radius: nowStyleArray[index].radius,
                  fillColor: nowStyleArray[index].fillColor,
                  color: obj.border.color,
                  weight: obj.border.weight,
                  opacity: null,
                  fillOpacity: null
                });
              }

          }

        }
      },

      lineRibbonChange: function (obj) {
        var layer = this.layer, gradients = this.render.gradients, type = this.render.renderType;

        if (!!obj.lineClassifyArray) {
          obj.lineClassifyArray.forEach((item, index) => {
            item.color = gradients[obj.ribbon.value][index];
          });
        }

        if (!!obj.lineGradeArray) {
          obj.lineGradeArray.forEach((item, index) => {
            item.color = gradients[obj.ribbon.value][index];
          });
        }

        var nowStyleArray = obj.lineClassifyArray || obj.lineGradeArray, currentField = obj.field.value;

        for(var i in layer._layers) {
          var graphic = layer._layers[i];

          if (type === 'type') {
            nowStyleArray.forEach((item) => {
              if(graphic.feature.properties[currentField] === item.fieldVal) {

                graphic.setStyle({
                  radius: obj.fill.radius,
                  fillColor: obj.fill.color,
                  color: item.color,
                  weight: item.weight,
                  opacity: null,
                  fillOpacity: null
                });
              }
            });
          }

          if (type === 'grade') {
            let index = Tool.getIndexInArray(nowStyleArray, graphic.feature.properties[currentField]);
            if(typeof index === 'number' && index.toString()) {
              graphic.setStyle({
                radius: obj.fill.radius,
                fillColor: obj.fill.color,
                color: nowStyleArray[index].color,
                weight: nowStyleArray[index].weight,
                opacity: null,
                fillOpacity: null
              });
            }
          }
        }
      },

      polygonRibbonChange: function (obj) {
        var layer = this.layer, gradients = this.render.gradients, type = this.render.renderType;

        if (!!obj.polygonClassifyArray) {
          obj.polygonClassifyArray.forEach((item, index) => {
            item.fillColor = gradients[obj.ribbon.value][index];
          });
        }

        if (!!obj.polygonGradeyArray) {
          obj.polygonGradeyArray.forEach((item, index) => {
            item.fillColor = gradients[obj.ribbon.value][index];
          });
        }

        var nowStyleArray = obj.polygonClassifyArray || obj.polygonGradeyArray, currentField = obj.field.value;

        for(var i in layer._layers) {
          var graphic = layer._layers[i];

          if (type === 'type') {
            nowStyleArray.forEach((item) => {
              if(graphic.feature.properties[currentField] === item.fieldVal) {

                graphic.setStyle({
                  radius: obj.fill.radius,
                  fillColor: item.fillColor,
                  color: obj.border.color,
                  weight: obj.border.weight,
                  opacity: null,
                  fillOpacity: null
                });
              }
            });
          }

          if (type === 'grade') {
            let index = Tool.getIndexInArray(nowStyleArray, graphic.feature.properties[currentField]);
            if(typeof index === 'number' && index.toString()) {
              graphic.setStyle({
                radius: obj.fill.radius,
                fillColor: nowStyleArray[index].fillColor,
                color: obj.border.color,
                weight: obj.border.weight,
                opacity: null,
                fillOpacity: null
              });
            }
          }

        }
      },

      /* 线 填充 */
      changeLineBorder: function (item, obj) {
        var layer = this.layer, currentField = obj.field.value, nowStyleArray = [], type = this.render.renderType;
        nowStyleArray.push(item);

        for(var i in layer._layers) {
          var graphic = layer._layers[i];

          if (type === 'type') {
            if(graphic.feature.properties[currentField] === nowStyleArray[0].fieldVal) {
              graphic.setStyle({
                radius: obj.fill.border,
                fillColor: obj.fill.color,
                color: nowStyleArray[0].color,
                weight: nowStyleArray[0].weight,
                opacity: null,
                fillOpacity: null
              });
            }
          }

          if (type === 'grade') {
            var index = Tool.getIndexInArray(nowStyleArray, graphic.feature.properties[currentField]);
            if (typeof index === 'number' && index.toString()) {
              graphic.setStyle({
                radius: obj.fill.border,
                fillColor: obj.fill.color,
                color: nowStyleArray[0].color,
                weight: nowStyleArray[0].weight,
                opacity: null,
                fillOpacity: null
              });
            }
          }


        }
      },

      /* 点 填充 */
      changePointFill: function (item, obj) {
        var layer = this.layer, currentField = obj.field.value, nowStyleArray = [], type = this.render.renderType;
        nowStyleArray.push(item);


        for(var i in layer._layers) {
          var graphic = layer._layers[i];

          if (type === 'type') {
            if(graphic.feature.properties[currentField] === nowStyleArray[0].fieldVal) {
              graphic.setStyle({
                radius: nowStyleArray[0].radius,
                fillColor: nowStyleArray[0].fillColor,
                color: obj.border.color,
                weight: obj.border.weight,
                opacity: null,
                fillOpacity: null
              });
            }
          }

          if (type === 'grade') {
            var index = Tool.getIndexInArray(nowStyleArray, graphic.feature.properties[currentField]);
            if (typeof index === 'number' && index.toString()) {
              graphic.setStyle({
                radius: nowStyleArray[0].radius,
                fillColor: nowStyleArray[0].fillColor,
                color: obj.border.color,
                weight: obj.border.weight,
                opacity: null,
                fillOpacity: null
              });
            }
          }
        }
      },

      /* 面 填充 */
      changePolygonFill: function (item, obj) {
        var layer = this.layer, currentField = obj.field.value, nowStyleArray = [], type = this.render.renderType;
        nowStyleArray.push(item);

        for(var i in layer._layers) {
          var graphic = layer._layers[i];

          if (type === 'type') {
            if(graphic.feature.properties[currentField] === nowStyleArray[0].fieldVal) {
              graphic.setStyle({
                radius: obj.fill.radius,
                fillColor: nowStyleArray[0].fillColor,
                color: obj.border.color,
                weight: obj.border.weight,
                opacity: null,
                fillOpacity: null
              });
            }
          }

          if (type === 'grade') {
            var index = Tool.getIndexInArray(nowStyleArray, graphic.feature.properties[currentField]);
            if (typeof index === 'number' && index.toString()) {
              graphic.setStyle({
                radius: obj.fill.radius,
                fillColor: nowStyleArray[0].color,
                color: obj.border.color,
                weight: obj.border.weight,
                opacity: null,
                fillOpacity: null
              });
            }
          }
        }
      },

      /* 线 填充， 点 面边框 */
      changeBorder: function (_item, obj) {
        var layer = this.layer, currentField = obj.field.value, lineClassifyArray = [],  _this = this;
        lineClassifyArray.push(_item);

        for(var i in layer._layers) {
          var graphic = layer._layers[i];
          lineClassifyArray.forEach((item) => {
            if(graphic.feature.properties[currentField] === item.fieldVal) {
              graphic.setStyle({
                radius: obj.fill.radius,
                fillColor: obj.fill.color,
                color: item.color,
                weight: obj.weight,
                opacity: null,
                fillOpacity: null
              });
            }
          });
        }
      },

      changeFillRadius: function (obj) {
        var layer = this.layer, currentField = this.render.field.value, circleClassifyArray = [];
        circleClassifyArray.push(obj);
        for(var i in layer._layers) {
          var graphic = layer._layers[i];
          circleClassifyArray.forEach((item) => {
            if(graphic.feature.properties[currentField] === item.fieldVal) {
              graphic.setStyle({
                radius: item.radius,
                fillColor: item.color,
                color: this.render.border.color,
                weight: item.weight,
                opacity: null,
                fillOpacity: null
              });
            }
          });
        }
      },


      /* 点 面边框 */
      changeCircleBorder (obj) {
        var layer = this.layer;
        for(var i in layer._layers) {
          var graphic = layer._layers[i];
          graphic.setStyle(Tool.getFeatureStyle(obj));
        }
      },

      /* 面 边框 */
      changePolygonBorder () {
        var layer = this.layer;
        for(var i in layer._layers) {
          var graphic = layer._layers[i];
          graphic.setStyle(Tool.getFeatureStyle());
        }
      },

      /* 添加标注图层 */
      changeToLabel (obj) {

        //this.removeLabel(); // 先清空之前的labelLayer
        var temLabelLayer = L.layerGroup();
        console.log(this.labelLayer);


        var datas = this.render.geoJsons, data;
        var _this = this;
        this.currentLayerId = this.render.currentLayerId;


        datas.forEach((item) => {
          if (item.id === this.currentLayerId) {
            data = item.data;
          }
        });

        var geometryType = data.features[0].geometry.type,
          color = obj.color,
          size = obj.size,
          value = obj.value,
          labelClass = this.labelClass,
          width  = obj.value.length*size + 20,
          height = size + 2;

        var over_layer = this.render.savedLayers.over_layer;
        over_layer.some((item) => {
          if (item.data_id === _this.currentLayerId) {
            // 如果当前图层已经包含标注，先清除，再添加一次
            if (item.label) {
              var layerId = item.label.layerId;
              _this.labelLayer.removeLayer(layerId);
            }
            // 对当前图层添加标注

            _this.addLabel(geometryType, data,  { color, size, value, labelClass, width, height}, temLabelLayer, _this.labelLayer);
            obj.layerId = this.labelLayer.getLayerId(temLabelLayer);

            this.updateOverLayerLabel(Tool.clone(obj));
            return;
          }
        });
      },

      addLabel (geometryType, data, obj, temLabelLayer, labelLayer) {
        //debugger
        if (geometryType === 'Point' || geometryType === 'MultiPoint') {
          L.geoJson(data, {
            onEachFeature: function(feature, layer) {
              var label = L.marker(layer._latlng, {
                icon: L.divIcon({
                  className: obj.labelClass,
                  html: '<label class="hover" style="color: ' + obj.color +'; font-size:'+ obj.size + 'px">' + feature.properties[obj.value] + '</label>',
                  iconSize: [obj.width, obj.height],
                })
              });
              temLabelLayer.addLayer(label);
            }
          });
        } else {
          L.geoJson(data, {
            onEachFeature: function(feature, layer) {
              var label = L.marker(layer.getBounds().getCenter(), {
                icon: L.divIcon({
                  className: obj.labelClass,
                  html: '<label class="hover" style="color: ' + obj.color +'; font-size:'+ obj.size + 'px">' + feature.properties[obj.value] + '</label>',
                  iconSize: [obj.width, obj.height]
                })
              });
              temLabelLayer.addLayer(label);
            }
          });
        }

        temLabelLayer.addTo(labelLayer);
      },

      /* 移除标注图层 */
      removeLabel () {
        var layerId;
        this.currentLayerId = this.render.currentLayerId;
        var over_layer = this.render.savedLayers.over_layer;
        over_layer.some((item) => {
          if (item.data_id === this.currentLayerId) {
            if (!!item.label) {
              var layerId = item.label.layerId;
              this.labelLayer.removeLayer(layerId);
            }
          }
        });
      },


    }
  }
</script>

<style>
  #render-map {
    width: 100%;
    height: 100%;
  }

  .render-label {
    text-align: center;
  }
</style>
