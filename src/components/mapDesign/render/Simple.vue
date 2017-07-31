<template>
  <div>
    <!--点  面 填充-->
    <div class="setLine mb10" v-if="!renderSet.isLine">
      <div class="renderLabel">填充</div>
      <div class="renderDetail">
        <div class="setLine">
          <el-button-group v-if="renderSet.isPoint">
            <el-button type="primary" icon="minus" @click="fillRadiusMinus"></el-button>
            <el-input class="render-input" style="float: left;"   v-model="renderSet.fill.radius" @blur="radiusBlur($event)"></el-input>
            <el-button type="primary" icon="plus" @click="fillRadiusPlus"></el-button>
          </el-button-group>

          <el-color-picker v-model="renderSet.fill.color"  show-alpha @change="fillColorChange(renderSet.fill.color)"></el-color-picker>
        </div>
      </div>
    </div>

    <!--线 填充 ||  点 和 面 边框-->
    <div class="setLine mb10">
      <div class="renderLabel" v-if="renderSet.isLine">填充</div>
      <div class="renderLabel" v-if="!renderSet.isLine">边框</div>
      <div class="renderDetail">
        <div class="setLine">
          <el-button-group>
            <el-button type="primary" icon="minus" @click="borderWeightMinus"></el-button>
            <el-input class="render-input" style="float: left;"  v-model="renderSet.border.weight" @blur="weightBlur($event)"></el-input>
            <el-button type="primary" icon="plus" @click="borderWeightPlus"></el-button>
          </el-button-group>

          <el-color-picker v-model="renderSet.border.color" color-format="hex" show-alpha @change="borderColorChange(renderSet.border.color)"></el-color-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tool from './tool.vue'
  import { mapActions, mapGetters } from 'vuex'
  import Vue from 'vue'

  export default {
    name: 'simple',
    data: function () {
      return {
        renderSet: {
          fill: {
            opacity: 1,
            radius: 4,
            color: '',
            max: 100,
            min: 4
          },
          border: {
            color: '#fff',
            weight: 1,
            opacity: 1,
            max: 100,
            min: 1
          },
          isLine: false,
          isPolygon: false,
          isPoint: false,
        }
      };
    },
    created () {

    },
    computed: {
      ...mapGetters([
        'render'
      ]),
    },
    mounted () {
      this.initEvent();
    },
    methods: {
      ...mapActions([
        'updateOverLayer', 'setRenderType'
      ]),
      initEvent () {
        this.$bus.on('simple-color-change', (color) => {
          this.renderSet.border.color = color;
        });

        this.$bus.on('simple-fill-color-change', color => {
          this.renderSet.fill.color = color;
        });

        this.$bus.on('simple-renderSet-change', (obj) => {
          this.restoreRenderSet(obj)
        });

        this.$bus.on('init-simple', () => {
          this.initSimple();
        });

        this.$bus.on('reset-simple-data', () => {
          this.reset();
        });

        /* 对当前图层的渲染保存 */
        this.$bus.on('save-current-simple-render', () => {
          this.updateCurrentStyle();
        });

        /* 对当前图层的渲染不保存 */
        this.$bus.on('not-save-current-simple-render', () => {
          this.notUpdateCurrentStyle();
        });

        this.$bus.on('init-render', () => {
          this.$bus.$emit('run-init-simple', this.renderSet);
        });
      },

      updateCurrentStyle () {
        this.updateOverLayer({
          rtype: this.render.renderType,
          style: Tool.clone(this.renderSet),
        });
        this.setRenderType(null);
        this.reset();
      },

      notUpdateCurrentStyle () {
        var currentLayerId = this.render.currentLayerId;
        var overLayersStyle =  this.render.savedLayers.over_layer;

        overLayersStyle.some((item) => {
          if (currentLayerId === item.data_id) {
            this.$bus.$emit('restore-render',item.render)
          }
        });

        this.setRenderType(null);
        this.reset();
      },

      /* 第二次点击简单渲染，将之前分级的配置项覆盖当前data */
      restoreRenderSet (obj) {
        var renderSet = Tool.clone(obj.render.style); // 深拷贝vuex中的数据到此
        this.renderSet = renderSet;

        /*if (!this.renderSet.label.value) {
          var currentData, datas = this.render.geoJsons;
          var currentLayerId = this.render.currentLayerId;

          datas.forEach((item) => {
            if (currentLayerId === item.id) {
              currentData = item.data;
            }
          });

          var geometryType = currentData.features[0].geometry.type;
          Tool.initIsType(geometryType, this.renderSet);

          // 预定义标注显示字段
          /!*var labelFields = Tool.getField(currentData);
          this.renderSet.label.fields = labelFields;*!/
        }*/
      },

      initSimple () {
        this.reset();

        var currentData, datas = this.render.geoJsons;
        var currentLayerId = this.render.currentLayerId;

        datas.forEach((item) => {
          if (currentLayerId === item.id) {
            currentData = item.data;
          }
        });

        var geometryType = currentData.features[0].geometry.type;
        Tool.initIsType(geometryType, this.renderSet);

        // 预定义标注显示字段
        /*var labelFields = Tool.getField(currentData);
        this.renderSet.label.fields = labelFields;*/

      },

      reset () {
        this.renderSet= {
          fill: {
            opacity: 1,
            radius: 4,
            color: '',
            max: 100,
            min: 4,
            step: 1,
          },
          border: {
            color: '#fff',
            weight: 1,
            opacity: 1,
            max: 100,
            min: 1,
            step: 1,
          },
          isLine: false,
          isPolygon: false,
          isPoint: false,
        };
      },

      simpleRenderChange () {
        this.$bus.$emit('simple-render-change', this.renderSet);
      },

      fillRadiusMinus () {
        if (this.renderSet.fill.radius - 1 === 1) {
          this.renderSet.fill.radius = 2;
        } else {
          this.renderSet.fill.radius -= 1;
        }
        this.simpleRenderChange();
      },

      radiusBlur (e) {
        var obj = e.srcElement ? e.srcElement:e.target, value = Number(obj.value);
        if (!Tool.isNumber(value)) {
          this.$message({
            showClose: true,
            message: '请输入正确的数字',
            type: 'error'
          });
          return;
        }

        if (value < 1) {
          this.$message({
            showClose: true,
            message: '允许输入的最小值为' + this.renderSet.fill.min,
            type: 'error'
          });
          return;
        }

        if (value > 10) {
          this.$message({
            showClose: true,
            message: '允许输入的最大值为' + this.renderSet.fill.min,
            type: 'error'
          });
          return;
        }

        this.renderSet.fill.radius = value;
        this.simpleRenderChange();
      },

      fillRadiusPlus () {
        if (this.renderSet.fill.radius + 1 === 101) {
          this.renderSet.fill.radius = 100;
        } else {
          this.renderSet.fill.radius += 1;
        }
        this.simpleRenderChange();
      },

      fillColorChange (val) {
        this.renderSet.fill.color = val;
        this.simpleRenderChange();
      },

      borderWeightMinus () {
        if (this.renderSet.border.weight - 1 === 0) {
          this.renderSet.border.weight = 1;
        } else {
          this.renderSet.border.weight -= 1;
        }
        this.simpleRenderChange();
      },

      weightBlur (e) {
        var obj = e.srcElement ? e.srcElement:e.target, value = Number(obj.value);
        if (!Tool.isNumber(value)) {
          this.$message({
            showClose: true,
            message: '请输入正确的数字',
            type: 'error'
          });
          return;
        }

        if (value < 1) {
          this.$message({
            showClose: true,
            message: '允许输入的最小值为1',
            type: 'error'
          });
          return;
        }

        if (value > 10) {
          this.$message({
            showClose: true,
            message: '允许输入的最大值为10',
            type: 'error'
          });
          return;
        }

        this.renderSet.border.weight = value;
        this.simpleRenderChange();
      },

      borderWeightPlus () {
        if (this.renderSet.border.weight + 1 === 11) {
          this.renderSet.border.weight = 10;
        } else {
          this.renderSet.border.weight += 1;
        }
        this.simpleRenderChange();
      },

      borderColorChange (val) {
        this.renderSet.border.color = val;
        this.simpleRenderChange();
      },
    }
  }
</script>

<style scoped>
  .setLine {
    display: flex;
    width: 100%;
    align-items:center;
  }

  @media (max-width: 1200px){
    /*.setLine {flex-wrap: wrap}
    .renderLabel, .renderDetail{width:100%;flex: inherit}*/
    .setLine { background: #000; }
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .renderLabel {
    width: 20%;
  }

  .renderDetail {
    text-align: left;
    width: 80%;
    position: relative;
  }

  .ribbon-preview {
    position: absolute;
    left: 10px;
    top: 12px;
  }

  .render-slider {
    width: 60%;
  }

  .render-input {
    width: 40px;
  }
</style>
