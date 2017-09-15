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
          <el-form-item :label="key" v-for="val, key, index in edit.mViewProperties" :key="key">
            <el-input v-model="val"></el-input>
          </el-form-item>
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

  export default {
    name: 'editset',
    data: function () {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'edit'
        ])
    },
    mounted: function () {
      console.log('editSet',this.edit)
    },
    methods: {
      handleSave: function () {
        console.log('重置前this.edit',this.edit);
        this.$bus.emit('reset-edit-state');
        console.log('重置后this.edit',this.edit);
        // TODO 将用户编辑好的属性信息上传至服务器
      },

      handleDelete: function () {
        this.$confirm('确认删除？')
          .then(function () {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.$bus.emit('delete-feature');
            this.$bus.emit('reset-edit-state');
            //  TODO 重新请求数据刷新表格列表
          }.bind(this));
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
