<template>
  <div>
    <div class="setLine mb10">
      <div class="renderLabel">分级字段</div>
      <div class="renderDetail">
        <el-select v-model="renderSet.field.value" placeholder="请选择分级字段" @change="fieldChange" @visible-change="fieldIsShow">
          <el-option :label="item" :value="item" v-for="item in renderSet.field.fields" :key="item"></el-option>
        </el-select>
      </div>
    </div>

    <div class="setLine mb10">
      <div class="renderLabel">分级方法</div>
      <div class="renderDetail">
        <el-select v-model="grade_method.field" placeholder="请选择分级方法"  @change="gradeMethodChange" @visible-change="gradeMethodIsShow">
          <el-option :label="grade_method.default" :value="grade_method.default"></el-option>
          <el-option :label="grade_method.diy" :value="grade_method.diy"></el-option>
        </el-select>
      </div>
    </div>

    <div class="setLine">
      <div class="renderLabel">级别</div>
      <div class="renderDetail">
        <el-slider class="render-slider" v-model="renderSet.grade.value" :step="renderSet.grade.step" :min="renderSet.grade.min" :max="renderSet.grade.max" @change="gradeChange"></el-slider>
      </div>
    </div>

    <!--点 填充-->
    <div class="setLine mb10" v-for="item in renderSet.fieldStyleArray" :key="item.index" v-if="renderSet.isPoint && grade_method.isDiy">
      <div class="renderDetail" style="padding-left: 20%;">
        <div class="setLine">
          <div class="grade-field" style="font-size: 12px;">
            <div class="grade-min">{{item.min}}</div>
            <span class="grade-mark"> ~ </span>
            <input class="grade-max" type="text" v-model="item.max" @blur="pointGradeChange(item)" v-if="!isLast(item.index, renderSet.fieldStyleArray)">
            <div class="grade-max" style="border: 2px solid transparent;" v-if="isLast(item.index, renderSet.fieldStyleArray)">{{item.max}}</div>
          </div>
          <el-button-group>
            <el-button type="primary" icon="minus" @click="pointFillRadiusMinus(item)"></el-button>
            <el-input class="render-input" style="float: left;"  v-model="item.radius" @blur="pointFillRadiusBlur(item, $event)"></el-input>
            <el-button type="primary" icon="plus" @click="pointFillRadiusPlus(item)"></el-button>
          </el-button-group>
          <el-color-picker v-model="item.fillColor" show-alpha @change="pointFillColorChange(item)"></el-color-picker>
        </div>
      </div>
    </div>

    <!--线 填充-->
    <div class="setLine mb10" v-for="item in renderSet.fieldStyleArray" :key="item.index" v-if="renderSet.isLine && grade_method.isDiy">
      <div class="renderDetail" style="padding-left: 20%;">
        <div class="setLine">
          <div class="grade-field" style="font-size: 12px;">
            <div class="grade-min">{{item.min}}</div>
            <span class="grade-mark"> ~ </span>
            <input class="grade-max" type="text" v-model="item.max" @change="lineGradeChange(item)" v-if="!isLast(item.index, renderSet.fieldStyleArray)">
            <div class="grade-max" style="border: 2px solid transparent;" v-if="isLast(item.index, renderSet.fieldStyleArray)">{{item.max}}</div>
          </div>
          <el-button-group>
            <el-button type="primary" icon="minus" @click="lineBorderWeightMinus(item)"></el-button>
            <el-input class="render-input" style="float: left;"  v-model="item.weight" @blur="lineBorderWeightBlur(item, $event)"></el-input>
            <el-button type="primary" icon="plus" @click="lineBorderWeightPlus(item)"></el-button>
          </el-button-group>
          <el-color-picker v-model="item.color" color-format="hex" show-alpha @change="lineBorderColorChange(item)"></el-color-picker>
        </div>
      </div>
    </div>

    <!--面 填充-->
    <div class="setLine mb10" v-for="item in renderSet.fieldStyleArray" :key="item.index" v-if="renderSet.isPolygon && grade_method.isDiy">
      <div class="renderDetail" style="padding-left: 20%;">
        <div class="setLine">
          <div class="grade-field" style="font-size: 12px;">
            <div class="grade-min">{{item.min}}</div>
            <span class="grade-mark">~ </span>
            <input class="grade-max" type="text" v-model="item.max" @change="polygonGradeChange(item)" v-if="!isLast(item.index, renderSet.fieldStyleArray)">
            <div class="grade-max" style="border: 2px solid transparent;" v-if="isLast(item.index, renderSet.fieldStyleArray)">{{item.max}}</div>
          </div>
          <el-color-picker v-model="item.fillColor" color-format="hex" show-alpha @change="polygonFillColorChange(item)"></el-color-picker>
        </div>
      </div>
    </div>

    <!--色带-->
    <div class="setLine mb10">
      <div class="renderLabel">色带</div>
      <div class="renderDetail">
        <el-select v-model="renderSet.ribbon.value" @change="ribbonChange" @visible-change="ribbonIsShow">
          <el-option label="" :value="item" v-for="item in render.colorIndex" :key="item">
            <span><img :src="render.colorImgs[item]" alt=""></span>
          </el-option>
        </el-select>
        <div class="ribbon-preview">
          <img :src="render.colorImgs[renderSet.ribbon.value]" alt="">
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
            <el-input class="render-input" style="float: left;"  v-model="renderSet.border.weight" @blur="borderWeightBlur(item, $event)"></el-input>
            <el-button type="primary" icon="plus" @click="borderWeightPlus"></el-button>
          </el-button-group>
          <el-color-picker v-model="renderSet.border.color" color-format="hex" show-alpha @change="borderColorChange"></el-color-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tool from '@/components/tool.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'grade',
    data: function () {
      return {
        grade_method: {
          field: '绝对值',
          default: '绝对值',
          diy: '自定义',
          isDiy: false,
        },
        renderSet: {
          field: {
            value: null,
            fields: null
          },
          grade: {
            value: 1,
            step: 1,
            min: 1,
            max: 8
          },
          ribbon: {
            value: 'g'
          },
          fill: {
            radius: 4,
            color: '#e25252',
            opacity: 1,
            min: 4,
            max: 100,
            step: 1,
          },
          border: {
            color: '#fff',
            weight: 1,
            opacity: 1,
            min: 1,
            max: 100,
            step: 1,
          },
          isLine: false,
          isPolygon: false,
          isPoint: false,

          fieldStyleArray: null,
        },
        fieldShow: false,
        gradeMethodShow: false,
        ribbonShow: false,
      };
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

    },
    beforeDestroy () {
      this.destroyEvent();
    },
    methods: {
      ...mapActions([
        'updateOverLayer', 'setRenderType'
      ]),

      initEvent () {
        this.$bus.on('grade-render', () => {
          this.gradeRender();
        });

        /* 对当前图层的渲染保存 */
        this.$bus.on('save-current-grade-render', () => {
          this.updateCurrentStyle();
        });

        /* 对当前图层的渲染不保存 */
        this.$bus.on('not-save-current-grade-render', () => {
          this.notUpdateCurrentStyle();
        });

        this.$bus.on('grade-renderSet-restore', (obj) => {
          this.restoreRenderSet(obj)
        });

        this.$bus.on('reset-grade-data', () => {
          this.reset();
        });
      },

      destroyEvent () {
        this.$bus.off('grade-render');

        /* 对当前图层的渲染保存 */
        this.$bus.off('save-current-grade-render');

        /* 对当前图层的渲染不保存 */
        this.$bus.off('not-save-current-grade-render');

        this.$bus.off('grade-renderSet-restore');

        this.$bus.off('reset-grade-data');
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

      /* 第二次点击分级渲染，将之前分级的配置项覆盖当前data */
      restoreRenderSet (obj) {
        var renderSet = Tool.clone(obj.render.style); // 深拷贝vuex中的数据到此
        this.renderSet = renderSet;
      },

      /* 第一次点击分级渲染，需要判断能否分级 */
      gradeRender () {
        this.reset();

        var currentData, datas = this.render.geoJsons;
        var currentLayerId = this.render.currentLayerId;

        datas.forEach((item) => {
          if (currentLayerId === item.id) {
            currentData = item.data;
          }
        });

        console.log('currentData', currentData);

        var geometryType = currentData.features[0].geometry.type;
        Tool.initIsType(geometryType, this.renderSet);

        var gradeFields = Tool.getNumberField(currentData);  // gradeFields表示字段值长度小于8的字段数组，主要用于首次渲染

        if (gradeFields.length === 0) {
          if (!this.renderSet.field.value) {
            this.$message({
              showClose: true,
              message: '当前图层没有可用于分级的字段',
              type: 'warning'
            });
            return;
          }
        }
        this.renderSet.field.fields = gradeFields;

        // 预定义标注显示字段
        /*var labelFields = Tool.getField(currentData);
        this.renderSet.label.fields = labelFields;*/
      },

      updateCurrentStyle () {
        console.log('当前的渲染类型是 ',this.render.renderType)

        this.updateOverLayer({
          rtype: this.render.renderType,
          style: Tool.clone(this.renderSet)
        });
        console.log('this.render.renderType 更新保存时', this.render.renderType);
        this.setRenderType(null);
        this.reset();
      },

      notUpdateCurrentStyle () {
        var currentLayerId = this.render.currentLayerId;
        var overLayersStyle =  this.render.savedLayers.over_layer;

        this.setRenderType(null);
        this.reset();
        overLayersStyle.some((item) => {
          if (currentLayerId === item.id) {
            this.$bus.$emit('restore-render',item.render)
          }
        });
      },

      reset () {
        this.grade_method= {
          field: '绝对值',
          default: '绝对值',
          diy: '自定义',
          isDiy: false,
        };
        this.renderSet= {
          field: {
            value: null,
            fields: null
          },
          grade: {
            value: 1,
            step: 1,
            min: 1,
            max: 8
          },
          ribbon: {
            value: 'g'
          },
          fill: {
            radius: 4,
            color: '#e25252',
            opacity: 1,
            min: 4,
            max: 100,
            step: 1,
          },
          border: {
            color: '#fff',
            weight: 1,
            opacity: 1,
            min: 1,
            max: 100,
            step: 1,
          },
          isLine: false,
          isPolygon: false,
          isPoint: false,
          fieldStyleArray: null,
        };
      },

      gradeFillChange (item) {
        this.$bus.$emit('grade-fill-change', item, this.renderSet);
      },

      fieldChange () {
        if (!this.fieldShow) {
          return;
        }
        this.$bus.$emit('grade-render-change', this.renderSet);
      },

      fieldIsShow (isShow) {
        this.fieldShow = isShow;
      },

      /* 判断 index 是否为数组（自定义列 array) 最后一项 */
      isLast (index, array) {
        if (!!array) {
          if ( index === (array.length-1) ) {
            return true;
          }
          return false;
        }
        return false;
      },

      gradeMethodIsShow (isShow) {
        this.gradeMethodShow = isShow;
      },

      gradeMethodChange () {
        if (!this.gradeMethodShow) {
          return;
        }

        if (!this.grade_method.field) {
          this.$message({
            showClose: true,
            message: '请先选择分级方法',
            type: 'warning'
          });
          return;
        }


        if (!this.renderSet.field.value) {
          this.$message({
            showClose: true,
            message: '请先选择分级字段',
            type: 'warning'
          });
          this.grade_method.field = this.grade_method.default;
          return;
        }

        if (this.grade_method.field === this.grade_method.default) {
          this.grade_method.isDiy = false;
        }

        if (this.grade_method.field === this.grade_method.diy) {
          this.grade_method.isDiy = true;
        }

        this.$bus.$emit('grade-render-change', this.renderSet);
      },

      gradeChange () {
        if (this.render.renderType === 'grade') {
          if (!this.renderSet.field.value) {
            this.$message({
              showClose: true,
              message: '请先选择分级字段',
              type: 'warning'
            });

            this.renderSet.grade.value = 1;
            return;
          }

          this.$bus.$emit('grade-render-change', this.renderSet);
        }
      },

      pointGradeChange (obj) {
        if (!Tool.isNumber(obj.max)) {
          obj.max = Number(obj.max);
        }
        this.gradeConfigChange(obj, 'fieldStyleArray');
      },

      lineGradeChange (obj) {
        this.gradeConfigChange(this.renderSet, 'fieldStyleArray');
      },

      polygonGradeChange (obj) {
        this.gradeConfigChange(this.renderSet, 'fieldStyleArray');
      },

      gradeConfigChange (obj, key) {
        var gradeArray = this.renderSet[key], len = gradeArray.length, i = 0;


        //如果用户输入的不是数字
        if (!!isNaN(obj.max)) {
          gradeArray.some((item, i) => {
            if (Number(obj.index) === i) {
              obj.max = gradeArray[i+1].min;
              this.$message({
                showClose: true,
                message: '请输入正确的数字',
                type: 'warning'
              });
              return;
            }
          });
        }

        // 用户输入的值 < 当前行的最小值
        if (Number(obj.max) < Number(obj.min)) {
          gradeArray.some((item, i) => {
            if (Number(obj.index) === i) {
              obj.max = gradeArray[i+1].min;
              this.$message({
                showClose: true,
                message: '输入值应大于 ' + obj.min,
                type: 'warning'
              });
              return;
            }
          });
        }

        // 用户输入的值 >= 当前分组的最大值
        if (Number(obj.max) >= Number(gradeArray[len-1].max)) {
          gradeArray.some((item, i) => {
            if (Number(obj.index) === i) {
              obj.max = gradeArray[i+1].min;
              this.$message({
                showClose: true,
                message: '输入值应小于 ' + gradeArray[len-1].max,
                type: 'warning'
              });
              return;
            }
          });
        }

        // 用户输入的值符合要求
        gradeArray.some((item, i) => {
          if (obj.index === i) {
            gradeArray[i+1].min = Number(obj.max);

            // 取出i和i之前的数组
            var iBefore = gradeArray.slice(0, i+1);

            // 取出i之后的数组
            var iAfter = gradeArray.slice(i+1);

            // 对i之后的最大、最小值重新分组
            //gradeArray[i+1].min = Number(obj.max);
            var min = Number(obj.max), max = gradeArray[len - 1].max, grade = len-1- i;
            var irenderAfter = Tool.groupArray(min, max, grade);

            // 为i之后重新分组的数组添加之前额外的属性
            iAfter.forEach((item, index) => {
              for (let i in item) {
                if (i != 'min' && i != 'max') {
                  irenderAfter[index][i] = item[i] ;
                }
              }
            });

            var result = iBefore.concat(irenderAfter);

            this.$set(this.renderSet, key, result);
            this.$bus.$emit('grade-meghod-change', this.renderSet);
            return ;
          }
        });
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
            message: '请先选择分级字段',
            type: 'warning'
          });
          this.renderSet.ribbon.value = 'g';
          return;
        }
        this.$bus.$emit('grade-ribbon-change', this.renderSet);
      },

      /* 点  填充 */
      pointFillRadiusMinus (item) {
        if (item.radius - 1 === 1) {
          item.radius = 2;
        } else {
          item.radius -= 1;
        }

        this.gradeFillChange(item);
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
        this.gradeFillChange(item);
      },

      pointFillRadiusPlus (item) {
        if (item.radius + 1 === 101) {
          item.radius = 100;
        } else {
          item.radius += 1;
        }

        this.gradeFillChange(item);
      },

      pointFillColorChange (item) {
        this.gradeFillChange(item);
      },
      /* 点  填充 */

      /* 线  填充 */
      lineBorderWeightMinus (item) {
        if (item.weight - 1 === 0) {
          item.weight = 1;
        } else {
          item.weight -= 1;
        }
        this.gradeFillChange(item);
      },

      lineBorderWeightBlur () {
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
        this.gradeFillChange(item);
      },

      lineBorderWeightPlus (item) {
        if (item.weight + 1 === 101) {
          item.weight = 100;
        } else {
          item.weight += 1;
        }
        this.gradeFillChange(item);
      },

      lineBorderColorChange (item) {
        this.gradeFillChange(item);
      },
      /* 线  填充 */

      /* 面  填充 */
      polygonFillColorChange (item) {
        this.gradeFillChange(item);
      },
      /* 面  填充 */

      /* 点  面 边框样式设置 */
      borderWeightMinus () {
        if (!this.renderSet.field.value) {
          this.$message({
            showClose: true,
            message: '请先选择分级字段',
            type: 'warning'
          });
          this.renderSet.border.weight = 1;
          return;
        }

        if (this.renderSet.border.weight - 1 === 0) {
          this.renderSet.border.weight  = 1;
        } else {
          this.renderSet.border.weight -= 1;
        }
        this.$bus.$emit('grade-circle-border-change', this.renderSet);
      },

      borderWeightBlur (item, e) {
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
        this.gradeFillChange(item);
      },

      borderWeightPlus () {
        if (!this.renderSet.field.value) {
          this.$message({
            showClose: true,
            message: '请先选择分级字段',
            type: 'warning'
          });
          this.renderSet.border.weight = 1;
          return;
        }
        this.renderSet.border.weight += 1;
        this.$bus.$emit('grade-circle-border-change', this.renderSet);
      },

      borderColorChange () {
        if (!this.renderSet.field.value) {
          this.$message({
            showClose: true,
            message: '请先选择分级字段',
            type: 'warning'
          });
          this.renderSet.border.color = '#000000';
          return;
        }
        this.$bus.$emit('grade-circle-border-change', this.renderSet);
      },
      /* 点  面 边框样式设置 */
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

  .grade-field {
    border: 1px solid #bfcbd9;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px 4px;
    min-width: 120px;
    max-width: 150px;
    display: flex;
    align-items: center;
  }

  .grade-mark {
    width: 15px;
    display: inline-block;
    float: left;
  }

  .grade-min {
    display: inline-block;
    width: 50px;
    overflow: hidden;
    float: left;
  }

  .grade-max {
    display: inline-block;
    font-size: 12px;
    width: 50px;
    margin: 0;
    padding: 0;
    float: left;
  }

  .render-input {
    width: 40px;
  }
</style>
