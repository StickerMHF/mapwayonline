<template>
  <div>
    <div class="setLine mb10">
      <div class="renderLabel">分类字段</div>
      <div class="renderDetail">
        <el-select v-model="renderSet.field.value" placeholder="请选择分类字段" @change="fieldChange" @visible-change="fieldIsShow">
          <el-option :label="item" :value="item" v-for="item in renderSet.field.fields" :key="item"></el-option>
        </el-select>
      </div>
    </div>

    <div class="setLine mb10">
      <div class="renderLabel">色带</div>
      <div class="renderDetail">
        <el-select v-model="renderSet.ribbon.value" @change="ribbonChange(renderSet.ribbon.value)" @visible-change="ribbonIsShow">
          <el-option label="" :value="item" v-for="item in render.colorIndex" :key="item">
            <span><img :src="render.colorImgs[item]" alt=""></span>
          </el-option>
        </el-select>
        <div class="ribbon-preview">
          <img :src="render.colorImgs[renderSet.ribbon.value]" alt="">
        </div>
      </div>
    </div>

    <!--点 填充-->
    <div class="setLine mb10" v-for="item in renderSet.fieldStyleArray" v-if="renderSet.isPoint">
      <div class="renderDetail" style="padding-left: 20%;">
        <div class="setLine">
          <div class="field-value-box" >{{ item.fieldVal }}</div>
          <el-button-group>
            <el-button type="primary" icon="minus" @click="pointFillRadiusMinus(item)"></el-button>
            <el-input class="render-input" style="float: left;"  v-model="item.radius" @blur="pointFillRadiusBlur(item, $event)"></el-input>
            <el-button type="primary" icon="plus" @click="pointFillRadiusPlus(item)"></el-button>
          </el-button-group>
          <el-color-picker v-model="item.fillColor"  show-alpha @change="pointFillColorChange(item)"></el-color-picker>
        </div>
      </div>
    </div>

    <!--线 填充-->
    <div class="setLine mb10" v-for="item in renderSet.fieldStyleArray" v-if="renderSet.isLine">
      <div class="renderDetail" style="padding-left: 20%;">
        <div class="setLine">
          <div class="field-value-box">{{ item.fieldVal }}</div>
          <el-button-group>
            <el-button type="primary" icon="minus" @click="lineBorderWeightMinus(item)"></el-button>
            <el-input class="render-input" style="float: left;"  v-model="item.weight" @blur="lineBorderWeightBlur(item, $event)"></el-input>
            <el-button type="primary" icon="plus" @click="lineBorderWeightPlus(item)"></el-button>
          </el-button-group>
          <el-color-picker v-model="item.color" show-alpha @change="lineBorderColorChange(item)"></el-color-picker>
        </div>
      </div>
    </div>

    <!--面 填充-->
    <div class="setLine mb10" v-for="item in renderSet.fieldStyleArray" v-if="renderSet.isPolygon">
      <div class="renderDetail" style="padding-left: 20%;">
        <div class="setLine">
          <div class="field-value-box">{{ item.fieldVal }}</div>
          <el-color-picker v-model="item.fillColor" show-alpha @change="polygonFillColorChange(item)"></el-color-picker>
        </div>
      </div>
    </div>

    <!--点 面 边框-->
    <div class="setLine mb10" v-if="renderSet.isPoint">
      <div class="renderLabel">边框</div>
      <div class="renderDetail">
        <div class="setLine">
          <el-button-group>
            <el-button type="primary" icon="minus" @click="borderWeightMinus"></el-button>
            <el-input class="render-input" style="float: left;"  v-model="renderSet.border.weight" @blur="borderWeightBlur($event)"></el-input>
            <el-button type="primary" icon="plus" @click="borderWeightPlus"></el-button>
          </el-button-group>
          <el-color-picker v-model="renderSet.border.color" show-alpha @change="borderColorChange"></el-color-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tool from '@/components/tool.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'type',
    data: function () {
      return {
        renderSet: {
          field: {
            value: null,
            fields: null
          },
          ribbon: {
            value: 'g'
          },
          fill: {
            color: '',
            radius: 4,
            opacity: 1,
            opacity: 1,
            max: 100,
            min: 4,
            step: 1,
          },
          border: {
            color: '#fff',
            weight: 1,
            opacity: 1,
            opacity: 1,
            max: 100,
            min: 1,
            step: 1,
          },
          isLine: false,
          isPolygon: false,
          isPoint: false,
          fieldStyleArray: null,
        },
        currentLayerId: null,
        fieldShow: false,
        ribbonShow: false,
      };
    },
    computed: {
      ...mapGetters([
        'render',
      ]),
    },
    mounted () {
      this.initEvent();
    },
    beforeDestroy () {
      this.destroyEvent();
    },
    methods: {
      ...mapActions([
        'updateOverLayer', 'setRenderType'
      ]),
      initEvent () {
        this.$bus.on('type-render', () => {
          this.typeRender();
        });

        /* 对当前图层的渲染保存 */
        this.$bus.on('save-current-type-render', () => {
          this.updateCurrentStyle();
        });

        /* 对当前图层的渲染不保存 */
        this.$bus.on('not-save-current-type-render', () => {
          this.notUpdateCurrentStyle();
        });

        this.$bus.on('type-renderSet-restore', (obj) => {
          this.restoreRenderSet(obj)
        });

        this.$bus.on('reset-type-data', () => {
          this.reset();
        });
      },

      destroyEvent () {
        this.$bus.off('type-render');

        /* 对当前图层的渲染保存 */
        this.$bus.off('save-current-type-render');

        /* 对当前图层的渲染不保存 */
        this.$bus.off('not-save-current-type-render');

        this.$bus.off('type-renderSet-restore');

        this.$bus.off('reset-type-data');
      },

      updateCurrentStyle () {
        this.updateOverLayer({
          rtype: this.render.renderType,
          style: Tool.clone(this.renderSet),
        });

        this.setRenderType(null);
        this.reset();
      },

      currentLayerIsAdded () {
        var currentLayerId = this.render.currentLayerId, layers = this.render.layers, isAdded = false;

        layers.some((item) => {
          if (item.id === currentLayerId) {
            isAdded = item.isAdded;
          }
        });

        debugger

        return isAdded;
      },

      notUpdateCurrentStyle () {
        var currentLayerId = this.render.currentLayerId;
        var overLayersStyle =  this.render.savedLayers.over_layer;

        this.setRenderType(null);
        this.reset();

        overLayersStyle.some((item) => {
          if (currentLayerId === item.id) {
            this.$bus.emit('restore-render',item.render)
          }
        });
      },

      /* 第二次点击分类渲染，将之前分级的配置项覆盖当前data */
      restoreRenderSet (obj) {
        var renderSet = Tool.clone(obj.render.style); // 深拷贝vuex中的数据到此
        this.renderSet = renderSet;
      },

      /* 第一次点击分类渲染，需要判断能否分类 */
      typeRender () {
        this.reset();

        var currentData, datas = this.render.geoJsons;
        this.currentLayerId = this.render.currentLayerId;

        datas.forEach((item) => {
          if (this.currentLayerId === item.id) {
            currentData = item.data;
          }
        });

        var geometryType = currentData.features[0].geometry.type;
        Tool.initIsType(geometryType, this.renderSet);

        var typeFields = Tool.getTypeField(currentData);  // typeFields表示字段值长度小于8的字段数组，主要用于首次渲染
        //debugger
        if (typeFields.length === 0) {
          if (!this.renderSet.field.value) {
            this.$message({
              showClose: true,
              message: '当前图层没有可用于分类的字段',
              type: 'warning'
            });
            return;
          }
        }
        this.renderSet.field.fields = typeFields;
      },

      /* 保存当前图层样式信息后，将当前组件的数据重置 */
      reset () {
        this.renderSet = {
          field: {
            value: null,
            fields: null
          },
          ribbon: {
            value: 'g'
          },
          fill: {
            color: '',
            radius: 4,
            opacity: 1,
            max: 100,
            min: 4,
            step: 1,
          },
          border: {
            color: '#fff',
            weight: 1,
            opacity: 1,
            opacity: 1,
            max: 100,
            min: 1,
            step: 1,
          },
          isLine: false,
          isPolygon: false,
          isPoint: false,
          fieldStyleArray: null,
        };
      },

      typeFillChange (item) {
        this.$bus.emit('type-fill-change', item, this.renderSet);
      },

      typeCircleBorderChange () {
        this.$bus.emit('type-circle-border-change', this.renderSet);
      },

      fieldIsShow (isShow) {
        this.fieldShow = isShow;
      },

      fieldChange () {
        if (!this.fieldShow) {
          return;
        }

        this.$bus.emit('type-render-change', this.renderSet);
      },

      ribbonIsShow (isShow) {
        this.ribbonShow = isShow;
      },

      ribbonChange () {
        if (!this.ribbonShow) {
          return;
        }

        if (!this.renderSet.field.value) {
          this.$message({
            showClose: true,
            message: '请先选择分类字段',
            type: 'warning'
          });
          this.renderSet.ribbon.value = 'g';
          return;
        }

        this.$bus.emit('type-ribbon-change', this.renderSet);
      },

      /* 点  填充 */
      pointFillRadiusMinus (item) {
        if (item.radius - 1 === 1) {
          item.radius = 2;
        } else {
          item.radius -= 1;
        }

        this.typeFillChange(item);
      },

      pointFillRadiusBlur (item, e) {
        var obj = e.srcElement ? e.srcElement:e.target, value = Number(obj.value);
        if (!Tool.isNumber(value)) {
          this.$message({
            showClose: true,
            message: '请输入正确的数字',
            type: 'error'
          });
          return;
        }

        if (value < this.renderSet.fill.min) {
          this.$message({
            showClose: true,
            message: '允许输入的最小值为' + this.renderSet.fill.min,
            type: 'error'
          });
          return;
        }

        if (value > this.renderSet.fill.max) {
          this.$message({
            showClose: true,
            message: '允许输入的最大值为' + this.renderSet.fill.max,
            type: 'error'
          });
          return;
        }

        item.radius = value;
        this.typeFillChange(item);
      },

      pointFillRadiusPlus (item) {
        if (item.radius + 1 === 101) {
          item.radius = 100;
        } else {
          item.radius += 1;
        }

        this.typeFillChange(item);
      },

      pointFillColorChange (item) {
        this.typeFillChange(item);
      },
      /* 点  填充 */

      /* 线  填充 */
      lineBorderWeightMinus (item) {
        if (item.weight - 1 === 0) {
          item.weight = 1;
        } else {
          item.weight -= 1;
        }
        this.typeFillChange(item);
      },

      lineBorderWeightBlur (item, e) {
        var obj = e.srcElement ? e.srcElement:e.target, value = Number(obj.value);
        if (!Tool.isNumber(value)) {
          this.$message({
            showClose: true,
            message: '请输入正确的数字',
            type: 'error'
          });
          return;
        }

        if (value < this.renderSet.border.min) {
          this.$message({
            showClose: true,
            message: '允许输入的最小值为' + this.renderSet.border.min,
            type: 'error'
          });
          return;
        }

        if (value > this.renderSet.border.max) {
          this.$message({
            showClose: true,
            message: '允许输入的最大值为' + this.renderSet.border.max,
            type: 'error'
          });
          return;
        }

        item.weight = value;
        this.typeFillChange(item);
      },

      lineBorderWeightPlus (item) {
        if (item.weight + 1 === 101) {
          item.weight = 100;
        } else {
          item.weight += 1;
        }
        this.typeFillChange(item);
      },

      lineBorderColorChange (item) {
        this.typeFillChange(item);
      },
      /* 线  填充 */

      /* 面  填充 */
      polygonFillColorChange (item) {
        this.typeFillChange(item);
      },
      /* 面  填充 */

      /* 点  面 边框样式设置 */
      borderWeightMinus () {
        if (!this.renderSet.field.value) {
          this.$message({
            showClose: true,
            message: '请先选择分类字段',
            type: 'warning'
          });
          this.renderSet.border.weight = 1;
          return;
        }

        if (this.renderSet.border.weight  - 1 === 0) {
          this.renderSet.border.weight  = 1;
        } else {
          this.renderSet.border.weight  -= 1;
        }

        this.typeCircleBorderChange();
      },

      borderWeightBlur (e) {
        var obj = e.srcElement ? e.srcElement:e.target, value = Number(obj.value);
        if (!Tool.isNumber(value)) {
          this.$message({
            showClose: true,
            message: '请输入正确的数字',
            type: 'error'
          });
          return;
        }

        if (value < this.renderSet.border.min) {
          this.$message({
            showClose: true,
            message: '允许输入的最小值为' + this.renderSet.border.min,
            type: 'error'
          });
          return;
        }

        if (value > this.renderSet.border.max) {
          this.$message({
            showClose: true,
            message: '允许输入的最大值为' + this.renderSet.border.max,
            type: 'error'
          });
          return;
        }

        this.renderSet.border.weight = value;
        this.typeCircleBorderChange();
      },

      borderWeightPlus () {
        if (!this.renderSet.field.value) {
          this.$message({
            showClose: true,
            message: '请先选择分类字段',
            type: 'warning'
          });
          this.renderSet.border.weight = 1;
          return;
        }

        if (this.renderSet.border.weight  + 1 === 101) {
          this.renderSet.border.weight  = 100;
        } else {
          this.renderSet.border.weight  += 1;
        }

        this.typeCircleBorderChange();
      },

      borderColorChange () {
        if (!this.renderSet.field.value) {
          this.$message({
            showClose: true,
            message: '请先选择分类字段',
            type: 'warning'
          });
          this.renderSet.border.color = '#000';
          return;
        }

        this.typeCircleBorderChange();
      },
      /* 点  边框样式设置 */
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

  .field-value-box {
    border: 1px solid #bfcbd9;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px 20px;
  }

  .render-input {
    width: 40px;
  }
</style>
