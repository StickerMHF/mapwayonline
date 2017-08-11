<template>
  <div class="editLog">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <h3 class="editLogTitle">编辑记录</h3>
      </el-col>
    </el-row>
    <hr style="margin-bottom: 22px;">
    <el-row>
      <div class="fieldSetList">
        <el-form label-position="left"  ref="editForm" label-width="80px">
          <el-form-item :label="key" :prop="key" v-for="val, key, index in mViewProperties" :key="key" :rules="[
            { type: 'number', message: '年龄必须为数字值'}
          ]">
            <el-input v-model="val" :disabled="key === 'mapwayid'" @blur="valChange(key, val, mViewProperties)"></el-input>
          </el-form-item>
          <!--<el-form-item :label="(val.name)" v-for="val in edit.schema" :key="val.name">
            <el-input v-model="mViewProperties[val.name]"></el-input>
          </el-form-item>-->
        </el-form>
      </div>
    </el-row>
    <hr>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <div class="editLogBtn">
          <el-button-group>
            <el-button type="success" @click="handleSave"><i class="el-icon-document"></i></el-button>
            <el-button type="danger" @click="handleDelete"><i class="el-icon-delete2"></i></el-button>
          </el-button-group>
        </div>
      </el-col>
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
        mViewProperties: null,
        update_url: 'TBUSER000001/mapdesign/map/layers/{layerid}/features/update',
        add_url: '',
        remove_url: '',
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
      console.log('editSet',this.edit);
      //this.mViewProperties = Tool.clone(this.edit.mViewProperties);
      console.log(this.mViewProperties)
      //debugger
      this.initEvent();
      //debugger
    },
    methods: {
      ...mapActions([
        'resetCurrentDataId'
      ]),
      initEvent () {
        this.$bus.on('m-v-update-property', (obj) => {
          //debugger
          this.mViewProperties = obj;
        });

        this.$bus.on('m-v-add-property', (obj) => {
          //debugger
          this.mViewProperties = obj;
        });
      },

      handleSave: function () {
        //console.log('重置前this.edit',this.edit);
        this.$bus.emit('reset-edit-state');
        //console.log('重置后this.edit',this.edit);
        // TODO 将用户编辑好的属性信息上传至服务器
        console.log(this.mViewProperties.mapwayid);
        var layerid = this.edit.currentDataId, editType = this.edit.editType, url;
        switch (editType) {
          case 'add': url = 'TBUSER000001/mapdesign/map/layers/' + layerid + '/features/add'; break;
          case 'update': url = 'TBUSER000001/mapdesign/map/layers/' + layerid + '/features/update'; break;
        }

        var params = "data=" + JSON.stringify({
            features: [{
              geometry:{x:104, y:54},
              attributes: Tool.clone(this.mViewProperties),
            }],
            f: 'json',
            wkid: 4326
          });
        console.log(params)
        debugger

        this.$http.post(url, params).then(res => {
          if (!res.data) {
            console.log('更新错误');
            return;
          }
          this.$message({
            showClose: true,
            message: '成功保存至数据库',
            type: 'success',
          });
          this.resetCurrentDataId();
        }).catch(err => {
          console.log(err)
        });
      },

      valChange (key, val) {
        this.mViewProperties[key] = val
        console.log(key, '变为:' + this.mViewProperties[key])
      },

      canNull (key) {
        var schema = this.edit.schema;
        schema.some((item) => {
          if (key === item.name) {
            if (item.notnull) {
              return false;
            }
            return true;
          }
        });
      },

      handleDelete: function () {
        this.$confirm('确认删除？').then(() =>  {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
          this.$bus.emit('delete-feature');
          this.$bus.emit('reset-edit-state');
          //  TODO 重新请求数据刷新表格列表
        });
      }
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
