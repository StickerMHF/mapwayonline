<template>
  <div>
    <!--数据视图表格部分-->
    <el-row>
      <el-table :data="dataList" v-loading="tableLoading" stripe style="width: 100%;">
        <el-table-column v-for="item in edit.schema" :key="item.name" :label="item.name" :prop="item.name" align="left" sortable header-align="left"></el-table-column>
        <el-table-column  label="编辑"  align="left">
          <template scope="scope">
            <el-button-group>
              <el-button type="success" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--数据视图分页部分-->
    <el-row>
      <el-col :span="24">
        <div class="tabel-paging">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!--点击编辑弹出的dialog-->
    <el-dialog title="编辑记录" :visible.sync="dialogEditVisible" :close-on-press-escape="false" :close-on-click-modal="false" @close="dialogClose">
      <hr>
      <div class="data-map-main">
        <div class="data-map">
          <data-map :message="sinleFeature" v-if="dialogEditVisible"></data-map>
        </div>
        <div class="edit-log">
          <data-set v-if="dialogEditVisible"></data-set>
        </div>
      </div>
      <hr>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataViewSave">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import DataMap from './DataMap.vue'
  import DataSet from  './DataSet.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: { DataMap, DataSet },
    name: 'datagrid',
    computed: {
      ...mapGetters([
        'edit'
      ])
    },
    data: function () {
      return {
        dataList: [],
        datalistArray: [],
        tableLoading: false,
        //  分页的配置
        pagination: {
          currentPage: 1,
          total: null,
          pageSize: 20
        },
        geoJson: null,
        sinleFeature: null,

        // 编辑弹出层 显隐
        dialogEditVisible: false,
      };
    },

    computed: {
      ...mapGetters([
        'edit',
      ]),
    },

    created () {
      this.initEvent();
    },

    mounted () {
      this.fetchData();
    },

    methods: {
      ...mapActions([
        'setIsSave', 'setEditLog', 'setSubmitFeature', 'setSchema', 'setEditType',
      ]),

      initEvent () {
        this.$bus.on('data-view-refresh', (tip) => {
          this.dialogEditVisible = false;
          this.refresh(tip);
        });
      },

      refresh  (tip) {
        this.tableLoading = true;
        this.setEditType('');
        this.fetchData(tip);
      },

      fetchData: function(tip) {
        this.tableLoading = true;

        var id = this.$route.params.id;
        var url = 'mapdesign/maps/layers/'+ id + '/query?f=geojson&outSr=4326&returnGeometry=true';
        this.$http.get(url).then((res) => {
          /*console.log(res);
           debugger*/

          if (tip) { // 删除或者保存后给用户的提示信息
            this.$message({
              showClose: true,
              message: tip,
              type: 'success'
            });
          }

          this.geoJson = res.data;
          let features = res.data.features, temArray = [];  // []
          features.forEach((item) => {
            temArray.push(item.properties);
          });

          if(temArray) {
            //  将服务列表分组，每组10个
            this.datalistArray = this.groupData(temArray, this.pagination.pageSize);
            this.pagination.total = temArray.length;
            this.dataList = this.datalistArray[0];
            this.tableLoading = false;
          }
          else {
            console.info("暂无数据");
            //  清空数据，并且重置数据条数为0、默认显示第一页，
            this.dataList = null;
            this.pagination.total = 0;
            this.pagination.currentPage = 1;
          }
        });
      },

      /* 编辑当前feature */
      handleEdit(index, row) {
        this.geoJson.features.some((item) => {
          if (item.properties.mapwayid === row.mapwayid) {
            this.sinleFeature = item;
            this.dialogEditVisible = true;
            return;
          }
        });

        console.log('编辑',index, row);
      },

      /* 删除当前feature */
      handleDelete: function (index, row) {
        console.log('删除', index, row);
        var mapwayid = row.mapwayid;

        this.$confirm('确认删除？', '提示', {
          type: 'warning'
        }).then(() => {
          // TODO  向后台提交删除
          var id = this.$route.params.id;
          var url = 'mapdesign/maps/layers/' + id + '/features/delete';

          var params = "data=" + JSON.stringify({
              mapwayid: mapwayid,
              f: 'json',
            });

          this.$http.post(url, params).then(res => {
            if (!res.data) {
              console.log('更新错误');
              return;
            }
            console.log('res', res);

            this.refresh('删除成功!');
          }).catch(err => { console.log(err) });
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '取消删除！',
            type: 'warning'
          });
        });
      },

      //  分页
      groupData: function (array, gap) {
        let result = [];
        for(let i = 0, len = array.length; i < len; i += gap) {
          result.push( array.slice(i, i+gap) );
        }
        return result;
      },

      handleSizeChange: function(val) {
        //console.log(`每页 ${val} 条`);
      },

      handleCurrentChange: function(val) {
        this.pagination.currentPage = val;
        //console.log(`当前页: ${val}`);
        this.dataList = this.datalistArray[val-1];
      },

      /* 弹出层保存按钮 */
      dataViewSave () {
        if (!this.edit.submitFeature.geometry) {
          this.$message({
            showClose: true,
            message: '当前没有编辑记录，不需要保存',
            type: 'warning',
          });

          return;
        }

        this.$bus.emit('data-view-save');
      },

      dialogClose () {
        this.dialogEditVisible = false;
        this.setEditType('');
      },
    }
  }
</script>

<style>
  .tabel-paging {
    text-align: center;
    margin-top: 30px;
  }

  .data-map-main {
    display: flex;
    height: 500px;
    width: 100%;
  }

  .data-map {
    flex: 0 0 50%;
    width: 50%;
    border: 1px solid #324157;
  }

  .edit-log {
    padding:0 10px;
    flex: 1;
    overflow-y: scroll;
  }
</style>
