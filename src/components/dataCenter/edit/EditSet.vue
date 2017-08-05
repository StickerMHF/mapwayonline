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
        <el-form label-position="left" label-width="80px">
          <el-form-item :label="key" v-for="val, key, index in mViewProperties" :key="key">
            <el-input :value="val | isNull" :disabled="editable(key)"></el-input>
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
      initEvent () {
        this.$bus.on('m-v-property', (obj) => {
          //debugger
          this.mViewProperties = obj;
        });
      },

      handleSave: function () {
        //console.log('重置前this.edit',this.edit);
        this.$bus.emit('reset-edit-state');
        //console.log('重置后this.edit',this.edit);
        // TODO 将用户编辑好的属性信息上传至服务器

      },

      editable (key) {
        var schema = this.edit.schema;
        schema.some((item) => {
          if (key === item.mapwayid) {
            return true;
          }
        });
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
