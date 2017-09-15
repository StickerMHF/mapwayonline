<template>
  <div class="editLog">
    <el-row>
      <div class="fieldSetList">
        <el-form  :model="attributes" label-position="left"  ref="editForm" label-width="80px">
          <el-form-item :label="item.name" :prop="item.name"
                        v-for="item in fieldSchemaWithValue" :key="item.name"
                        v-if="isUpdate(item.name)"
                        :rules="getRules(item)">
            <el-input :type="item.name" v-model.number="attributes[item.name]" :disabled="item.name === 'mapwayid'"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script scoped>
  import { mapGetters, mapActions } from 'vuex'
  import Tool from '@/components/tool.vue'

  export default {
    name: 'editset',
    data: function () {
      return {
        attributes: {}, // 表格的model
        /*attributes : {
         k1: v2,
         k2: v2
         },*/
        fieldSchemaWithValue: [], // schema数组，数组中每一个元素中都有value属性
        /*fieldSchemaWithValue : [{
         name: k1,
         isNull: false,
         type: 'integer',
         value: v1
         }],*/
      }
    },
    computed: {
      ...mapGetters([
        'edit'
      ])
    },
    filters: {
      isNull (val) {
        if (!val) {
          return 'Null';
        }
        return val;
      },
    },
    mounted: function () {

    },
    created () {
      this.reset();
      this.initEvent();
    },
    methods: {
      ...mapActions([
        'resetCurrentDataId', 'setSubmitFeature'
      ]),
      reset () {
        this.attributes = {};
        this.fieldSchemaWithValue = [];
      },

      initEvent () {
        this.$bus.on('data-view-update-property', (obj) => {
          var proArr = [];
          for (let i in obj) {
            proArr.push(obj[i]);
          }
          this.fieldSchemaWithValue = proArr;

          proArr.forEach((item) => {
            this.attributes[item.name] = item.value;
          });
        });

        this.$bus.on('data-view-add-property', (obj) => {
          var proArr = [];
          for (let i in obj) {
            proArr.push(obj[i]);
          }
          this.fieldSchemaWithValue = proArr;

          proArr.forEach((item) => {
            this.attributes[item.name] = item.value;
          });
        });

        this.$bus.on('data-view-save', () => {
          this.handleSave();
        });
      },

      /* mapwayid 字段 是否显示 */
      isUpdate (key) {
        if (this.edit.editType === 'add' && key === 'mapwayid') {
          return false;
        }

        return true;
      },

      /* 类型判断 */
      getRules (item) {
        var rules = [], name = item.name, type = item.type;
        switch (type) {
          case 'integer':
          case 'bigint':
          case 'double precision':
            //rules.push({ required: true, message: name + '不能为空', trigger: 'blur'});
            rules.push({ type: 'number', message: name + '必须为数字值', trigger: 'blur'});

            break;
        }

        return rules;
      },

      handleSave: function () {
        if (!this.attributes.mapwayid && this.edit.editType === 'update') {
          console.error('mapwayid为: ', this.attributes.mapwayid);
          return;
        }

        var submitFeature = Tool.clone(this.edit.submitFeature);
        submitFeature.attributes = this.attributes;
        delete submitFeature.geometry.spatialReference;

        var layerid = this.edit.currentDataId, editType = this.edit.editType, url, layerid = 'TBDATA000002';
        switch (editType) {
          case 'add': url = 'TBUSER000001/mapdesign/maps/layers/' + layerid + '/features/add'; break;
          case 'update': url = 'TBUSER000001/mapdesign/maps/layers/' + layerid + '/features/update'; break;
        }

        var params = "data=" + JSON.stringify({
            features: [submitFeature],
            f: 'json',
            wkid: 4326
          });

        this.$http.post(url, params).then(res => {
          if (!res.data) {
            console.log('更新错误');
            return;
          }
          console.log('res', res);

          this.resetCurrentDataId();
          this.setSubmitFeature({});
          this.$bus.emit('data-view-refresh', '保存成功!');
        }).catch(err => {
          console.log(err)
        });
      },

    }
  }
</script>

<style>
  .editLog {
    padding: 0 10px;
  }
  .editLogTitle {
    margin: 0;
    text-align: left;
  }
  .editLogBtn {
    text-align: right;
  }
</style>
