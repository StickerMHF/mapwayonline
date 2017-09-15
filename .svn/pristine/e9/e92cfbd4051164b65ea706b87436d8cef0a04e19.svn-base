<template>
  <div class="renderContent">

    <div v-show="isShowLayerList" class="layer-list">
      <div class="tip-btns">
        <el-button type="success" @click="saveMap">保存</el-button>
      </div>

      <div class="layer" v-for="item in layers" :key="item.id" :class="[ item.isAdded ? '' : 'opacity05']" @click="renderCurrent(item)">
        <div class="left">
          <div class="box"><img src="../../../assets/mapDesign/img/esriGeometryPoint.png" alt=""></div>
        </div>
        <div>{{ item.id }}</div>
        <div class="right">
          <div class="box">
            <i :class="[ item.isAdded ? 'fa-eye' : 'fa-eye-slash', 'fa']" @click.stop.prevent="showRenderSetting(item)"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-show="isShowRenderSetting">
      <div class="current-layer-info">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="8" :lg="8"><el-button icon="arrow-left" style="margin-left: 10px;" @click="showLayerList">上一页</el-button></el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="10"><div class="layer-name">{{ currentLayer.name }}</div></el-col>
          <!--<el-col :xs="24" :sm="24" :md="8" :lg="8"><div class="layer-name">{{ currentLayer.name }}</div></el-col>-->
        </el-row>
      </div>

      <div class="render-btns">
        <el-button-group>
          <el-button type="primary"  @click="simpleRender">简单</el-button>
          <el-button type="primary"  @click="gradeRender">分级</el-button>
          <el-button type="primary"  @click="typeRender">分类</el-button>
        </el-button-group>
      </div>
      <hr>

      <div class="render-set">
        <simple v-show="isSimple"></simple>
        <grade v-show="isGrade"></grade>
        <type v-show="isType"></type>
        <label-layer></label-layer>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import Grade from './Grade.vue'
  import Type from './Type.vue'
  import Simple from './Simple.vue'
  import LabelLayer from './LabelLayer.vue'
  import Tool from '@/components/tool.vue'

  export default {
    name: 'renderSet',
    components: { Grade, Type, Simple, LabelLayer },
    computed: {
      ...mapGetters([
        'render'
      ])
    },
    data () {
      return {
        isShowLayerList: true,
        layers: null,
        /*layers: {
         data_id: index,
         isAdded: true
         }*/

        isShowRenderSetting: false,
        isGrade: false,
        isType: false,
        isSimple: false,
        currentLayer: {
          id: null,
          name: null,
          isAdded: null,
        },
        currentLayerId: null,
        _geoJson: null
      }
    },
    mounted () {
      this.initEvent();
      var _this = this;
      var _geoJson = [];
      var url = ['TBUSER000001/mapdesign/map/layers/TBDATA000119/query?f=geojson&returnGeometry=true', 'TBUSER000001/mapdesign/map/layers/TBDATA000120/query?f=geojson&returnGeometry=true'];
      var dataIdChecked = Tool.clone(this.render.dataIdChecked);


      /*console.log(dataIdChecked)
      debugger*/
      _this.$http.get(url[1]).then(function(res){
        _geoJson.push({
          id: 0,
          data: res.data
        });
        //_this.$http.get(url[1]).then(function(res){
        /*_geoJson.push({
         id: 1,
         data: res.data
         });*/
        _this._geoJson = _geoJson;
        _this.setGeoJsons(_geoJson);

        _this.$bus.emit('init-render');

        console.log('_this.render.geoJsons', _this.render.geoJsons);
        //});
      }).catch(function (error) {
        console.log(error);
      });
    },
    methods: {
      ...mapActions([
        'setRenderType','setGeoJsons', 'setCurrentLayer',
      ]),
      initEvent () {
        this.$bus.on('grade-render',() => {
          this.gradeRender();
        });

        this.$bus.on('type-render', () => {
          this.typeRender();
        });

        this.$bus.on('update-layers',(layers) => {
          this.layers = Tool.clone(layers);
        });

        this.$bus.on('hide-render',() => {
          this.hideRender();
        });
      },

      /* 保存新创建的地图 */
      saveMap () {
        var url = 'TBUSER000001/mapdesign/map/add';
        //var url = 'TBUSER000001/mapdesign/map/TBMAP000003/update';
        var data = this.render.savedLayers;

        var params = "data=" + JSON.stringify({
            "lid": 1,
            "description": "描述",
            "tag": "标签",
            "mark": "备注",
            "createdate": "2017-07-26",
            "modifydate": "2017-07-26",
            "layers": Tool.clone(data),
          });

        this.$http.post(url, params).then(res => {
          if (res.data) {
            this.$message({
              showClose: true,
              message: '成功保存至数据库',
              type: 'success',
            });
          }
        }).then(err => {
          console.log(err)
        });
        console.log(this.render.savedLayers)
      },

      showRenderSetting (item) {
        item.isAdded = !item.isAdded;
        if (item.isAdded === false) {
          this.$bus.emit('remove-layer', item.data_id);
          this.$bus.emit('remove-label');
        } else if (item.isAdded === true) {
          this.$bus.emit('add-layer', item.data_id);
          this.$bus.emit('add-label');
        }
      },

      /* 选择图层进行渲染 */
      renderCurrent (item) {
        if (this.currentLayer.id) {
          return;
        }

        if (!item.isAdded) {
          this.$message({
            showClose: true,
            message: '未添加的图层不允许编辑',
            type: 'warning',
          });
          return;
        }

        console.log('this.render.savedLayers.over_layer: ',this.render.savedLayers.over_layer);
        this.currentLayer.id = item.data_id;
        this.setCurrentLayer(item.data_id);
        this.initRenderSet(item.data_id, this.render.savedLayers.over_layer);
        this.$bus.emit('init-label');
        this.currentLayer.name = '当前数据的name';
        // 发出渲染的事件
        this.isShowRenderSetting = true;
        this.isShowLayerList = false;
      },

      initRenderSet (data_id, over_layers) {
        over_layers.some((item) => {

          if (data_id === item.data_id) {
            var geometryType = item.gtype, renderType = item.render.rtype;
            this.setRenderType(renderType);
            console.log('renderType 点击当前图层的时候', renderType)

            switch (renderType) {
              case 'simple':
                this.showOneRender('isSimple');
                this.$bus.emit('init-simple');
                break;
              case 'grade':
                this.showOneRender('isGrade');
                break;
              case 'type':
                this.showOneRender('isType');
                break;
            }
            this.$bus.emit(this.render.renderType + '-renderSet-change', item);

            return;
          }
        });
      },

      /* 返回图层列表 */
      showLayerList () {
        this.$confirm('是否保存对当前图层的修改?', '提示', {
          type: 'warning'
        }).then(() => {
          this.saveCurrentLayerRender();

          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success',
          });
          // TODO 保存当前对层的修改,
        }).catch(() => {
          this.notSaveCurrentLayerRender();
          // TODO 不保存当前对层的修改,
        });

        this.isShowLayerList = true;
        this.isShowRenderSetting = false;

        // 清空currentLayer数据
        this.currentLayer = {
          id: null,
          name: null,
          isAdded: null,
        };

        this.$bus.emit('update-currentLayerId', null);
      },

      /* 对当前图层渲染样式的保存 */
      saveCurrentLayerRender () {
        this.hideRender();
        switch (this.render.renderType) {
          case 'simple':
            this.$bus.emit('save-current-simple-render');
            break;

          case 'grade':
            this.$bus.emit('save-current-grade-render');
            break;

          case 'type':
            this.$bus.emit('save-current-type-render');
            break;
        }
      },

      /* 对当前图层渲染样式的不保存 */
      notSaveCurrentLayerRender () {
        this.hideRender();
        switch (this.render.renderType) {

          case 'simple':
            this.$bus.emit('not-save-current-simple-render');
            break;

          case 'grade':
            this.$bus.emit('not-save-current-grade-render');
            break;

          case 'type':
            this.$bus.emit('not-save-current-type-render');
            break;
        }
      },

      simpleRender () {
        if (this.render.renderType === 'simple') {
          return;
        }
        this.isGrade = false;
        this.isType = false;
        this.isSimple = true;
        this.$bus.emit('reset-type-data');
        this.$bus.emit('reset-grade-data');
        this.setRenderType('simple');
        this.$bus.emit('init-simple');
      },

      gradeRender () {
        if (this.render.renderType === 'grade') {
          return;
        }
        this.isGrade = true;
        this.isType = false;
        this.isSimple = false;
        this.$bus.emit('reset-type-data');
        this.$bus.emit('reset-simple-data');
        this.setRenderType('grade');
        this.$bus.emit('init-grade');
      },

      typeRender () {
        if (this.render.renderType === 'type') {
          return;
        }
        this.isGrade = false;
        this.isType = true;
        this.isSimple = false;
        this.$bus.emit('reset-grade-data');
        this.$bus.emit('reset-simple-data');
        this.setRenderType('type');
        this.$bus.emit('init-type');
      },

      hideRender () {
        this.isGrade = false;
        this.isType = false;
        this.isSimple = false;
        //this.setRenderType(null);
      },

      showOneRender (type) {
        var types = ['isSimple', 'isGrade', 'isType'], len = types.length;
        for (let i = 0; i < len; i++) {
          var _type = types[i];
          if (type === _type) {
            this[_type] = true;
          } else {
            this[_type] = false;
          }
        }
        console.log('this.isGrade ', this.isGrade )
        console.log('this.isSimple ', this.isSimple )
        console.log('this.isType ', this.isType )
      },
    }
  }
</script>

<style>
  .tip-btns {
    text-align: center;
    margin: 10px 0;
  }

  h3 {
    margin: 0;
    text-align: center;
  }

  .renderContent {
    height: 100%;
    overflow-y: auto;
  }

  .layer-list {
    margin: 0 10px;
  }

  .current-layer-info {
    height: 36px;
    line-height: 36px;
    margin: 10px 0;
  }

  .layer-name {
    font-size: 20px;
  }

  .render-btns {
    text-align: center;
  }

  .render-set {
    padding: 10px;
  }

  .layer {
    display: table;
    width: 100%;
    margin: 10px 0;
    border: 1px solid #eee;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .opacity05 {
    opacity: 0.5;
  }

  .layer:hover {
    border: 1px solid #AAA;
    cursor: pointer;
  }

  .box {
    width: 100px;
    height: 75px;
    line-height: 75px;
    text-align: center;
    display: inline-block;
    color: #20a0ff;
  }

  .box img {
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }

  .box i {
    vertical-align: middle;
  }
  .right {
    display: table-cell;
    text-align: right;
  }
  .left {
    display: table-cell;
    text-align: left;
  }
</style>

