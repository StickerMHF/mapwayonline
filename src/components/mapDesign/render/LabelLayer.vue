<template>
  <div>
    <div class="setLine mb10">
      <div class="renderLabel">标注字段</div>
      <div class="renderDetail">
        <el-select v-model="label.value" @change="labelFieldChange" @visible-change="labelFieldIsShow" placeholder="请选择标注字段">
          <el-option label="请选择标注字段" value="none"></el-option>
          <el-option :label="item" :value="item" v-for="item in label.fields" :key="item"></el-option>
        </el-select>
      </div>
    </div>

    <div class="setLine mb10" v-show="labelSet">
      <div class="renderLabel">标注字体</div>
      <div class="renderDetail">
        <div class="setLine">
          <el-button-group>
            <el-button type="primary" icon="minus" @click="labelSizeMinus"></el-button>
            <el-input class="render-input" style="float: left;"  v-model="label.size"></el-input>
            <el-button type="primary" icon="plus" @click="labelSizePlus"></el-button>
          </el-button-group>

          <el-color-picker v-model="label.color" color-format="hex" show-alpha @change="labelColorChange"></el-color-picker>
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
    name: 'label',
    data: function () {
      return {
        label: {
          layerId: null,
          fields: [],
          value: "",
          color: '#000',
          size: 12
        },
        labelFieldShow: false,
        labelSet: false
      }
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
          'updateOverLayerLabel'
      ]),
      initEvent () {
        this.$bus.$on('init-label', () => {
          this.initLabel();
        });
      },

      initLabel () {
        var currentData, datas = this.render.geoJsons;
        var currentLayerId = this.render.currentLayerId;
        var over_layer = this.render.savedLayers.over_layer;

        this.reset();

        datas.forEach((item) => {
          if (currentLayerId === item.id) {
            currentData = item.data;
          }
        });

        over_layer.some((item) => {
          if (currentLayerId === item.data_id) {
            //debugger
            if (!!item.label) {
              let label = Tool.clone(item.label);
              this.label = label;
            } else {
              // 预定义标注显示字段
              var labelFields = Tool.getField(currentData);
              this.label.fields = labelFields;
            }
            return;
          }
        });
      },

      reset () {
        this.label = {
          layerId: null,
          fields: [],
          value: "",
          color: '#000',
          size: 12
        };
      },

      labelFieldIsShow (isShow) {
        this.labelFieldShow = isShow;
      },

      /* 标注 */
      labelFieldChange (field) {
        if (!this.labelFieldShow) {
          return;
        }

        if (field === 'none') {
          this.labelSet = false;
          this.$bus.$emit('remove-label');
          return;
        }
        this.labelSet = true;
        this.$bus.$emit('label-change', this.label);
      },

      labelSizeMinus () {
        if (!this.label.value) {
          this.$message({
            showClose: true,
            message: '请先选择标注字段',
            type: 'warning'
          });
          return;
        }

        if (this.label.size - 1 === 10) {
          this.label.size = 10;
        } else {
          this.label.size -= 1;
        }
        this.$bus.$emit('label-change', this.label);
      },

      labelSizePlus () {
        if (!this.label.value) {
          this.$message({
            showClose: true,
            message: '请先选择标注字段',
            type: 'warning'
          });
          return;
        }

        this.label.size += 1;
        this.$bus.$emit('label-change', this.label);
      },

      labelColorChange () {
        if (!this.label.value) {
          this.$message({
            showClose: true,
            message: '请先选择标注字段',
            type: 'warning'
          });
          this.label.color = '#000';
          return;
        }

        this.$bus.$emit('label-change', this.label);
      }
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

  .render-input {
    width: 40px;
  }
</style>
