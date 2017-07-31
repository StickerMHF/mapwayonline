<template>
  <div>
    <!--数据视图表格部分-->
    <el-row>
      <el-table :data="dataList" v-loading="tableLoading" stripe style="width: 100%;">
        <el-table-column v-for="item in tableHeader" :key="item.cloum" :label="item.cloumName" :prop="item.cloum" align="left" sortable header-align="left"></el-table-column>
        <el-table-column  label="编辑"  align="left">
          <template scope="scope">
            <el-button-group>
              <el-button type="primary" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button type="primary" icon="delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--数据视图分页部分-->
    <el-row>
      <el-col :span="24">
        <div style="text-align: center; margin-top: 30px;">
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
    <el-dialog title="空间编辑" :visible.sync="dialogEditVisible">
      <hr>
      <div class="data-map-main">
        <div class="data-map">
          <data-map></data-map>
        </div>
        <div class="edit-log">
          <div v-for="val, key, index in edit.dViewProperties" class="fieldSetList">
            <el-form label-position="left" label-width="80px">
              <el-form-item :label="key" >
                <el-input v-model="val"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <hr>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import DataMap from './DataMap.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: { DataMap },
    name: 'datagrid',
    computed: {
      ...mapGetters([
        'edit'
      ])
    },
    data: function () {
      return {
        // 表格数据
        tableHeader: [
          {
            cloum: "vlargeid",
            cloumName: "行业ID"
          },
          {
            cloum: "vlargename",
            cloumName: "行业名称"
          },
          {
            cloum: "advercount",
            cloumName: "广告主"
          },
          {
            cloum: "filescount",
            cloumName: "文件数量"
          },
          {
            cloum: "casecount",
            cloumName: "创意组"
          },
          {
            cloum: "days",
            cloumName: "投放天次"
          },
          {
            cloum: "historybill",
            cloumName: "预估费用"
          }
        ],
        datalist: [
          {
            advercount: 1153,
            days: 149,
            vlargename: "qjlt",
            vlargeid: 1888,
            casecount: 5297,
            filescount: 7738,
            historybill: 64988
          },
          {
            advercount: 751,
            days: 556,
            vlargename: "jndlkvvf",
            vlargeid: 116,
            casecount: 7225,
            filescount: 2386,
            historybill: 33499
          },
          {
            advercount: 1935,
            days: 950,
            vlargename: "oltzpjrf",
            vlargeid: 505,
            casecount: 420,
            filescount: 8172,
            historybill: 96179
          },
          {
            advercount: 120,
            days: 253,
            vlargename: "kkiox",
            vlargeid: 935,
            casecount: 8180,
            filescount: 4406,
            historybill: 33471
          },
          {
            advercount: 1073,
            days: 690,
            vlargename: "kpxcl",
            vlargeid: 415,
            casecount: 8431,
            filescount: 8888,
            historybill: 66520
          },
          {
            advercount: 1284,
            days: 684,
            vlargename: "yoyqpu",
            vlargeid: 377,
            casecount: 2894,
            filescount: 8134,
            historybill: 78935
          },
          {
            advercount: 263,
            days: 638,
            vlargename: "xqubrgrg",
            vlargeid: 1543,
            casecount: 1485,
            filescount: 8973,
            historybill: 72717
          },
          {
            advercount: 1366,
            days: 342,
            vlargename: "vetvmybkq",
            vlargeid: 959,
            casecount: 6681,
            filescount: 9503,
            historybill: 43252
          },
          {
            advercount: 1926,
            days: 455,
            vlargename: "qtubyqkxwi",
            vlargeid: 974,
            casecount: 8733,
            filescount: 4630,
            historybill: 86404
          },
          {
            advercount: 1534,
            days: 726,
            vlargename: "chwd",
            vlargeid: 501,
            casecount: 9181,
            filescount: 3306,
            historybill: 60453
          },
          {
            advercount: 1153,
            days: 149,
            vlargename: "qjlt998989",
            vlargeid: 1888,
            casecount: 5297,
            filescount: 7738,
            historybill: 64988
          },
          {
            advercount: 751,
            days: 556,
            vlargename: "jndlkvvf",
            vlargeid: 116,
            casecount: 7225,
            filescount: 2386,
            historybill: 33499
          },
          {
            advercount: 1935,
            days: 950,
            vlargename: "oltzpjrf",
            vlargeid: 505,
            casecount: 420,
            filescount: 8172,
            historybill: 96179
          },
          {
            advercount: 120,
            days: 253,
            vlargename: "kkiox",
            vlargeid: 935,
            casecount: 8180,
            filescount: 4406,
            historybill: 33471
          },
          {
            advercount: 1073,
            days: 690,
            vlargename: "kpxcl",
            vlargeid: 415,
            casecount: 8431,
            filescount: 8888,
            historybill: 66520
          },
          {
            advercount: 1284,
            days: 684,
            vlargename: "yoyqpu",
            vlargeid: 377,
            casecount: 2894,
            filescount: 8134,
            historybill: 78935
          },
          {
            advercount: 263,
            days: 638,
            vlargename: "xqubrgrg",
            vlargeid: 1543,
            casecount: 1485,
            filescount: 8973,
            historybill: 72717
          },
          {
            advercount: 1366,
            days: 342,
            vlargename: "vetvmybkq",
            vlargeid: 959,
            casecount: 6681,
            filescount: 9503,
            historybill: 43252
          },
          {
            advercount: 1926,
            days: 455,
            vlargename: "qtubyqkxwi",
            vlargeid: 974,
            casecount: 8733,
            filescount: 4630,
            historybill: 86404
          },
          {
            advercount: 1534,
            days: 726,
            vlargename: "chwd",
            vlargeid: 501,
            casecount: 9181,
            filescount: 3306,
            historybill: 60453
          }
        ],
        dataList: null,
        datalistArray: [],
        tableLoading: false,
        //  分页的配置
        pagination: {
          currentPage: 1,
          total: null,
          pageSize: 10
        },

        // 编辑弹出层
        dialogEditVisible: false,
      };
    },
    mounted: function () {
      this.getData('rest/service/ags/FeatureService/s000341/343/query?returnGeometry=true&outSr=4326&f=geojson');
    },
    methods: {
      // 表格
      getTableHeadField: function () {

      },

      handleEdit(index, row) {
        this.dialogEditVisible = true
        console.log('编辑',index, row);
        this.GLOBAL.obj.editFeatures = [{
          "type": "Feature",
          "properties": {
            "name": "北京",
            "污染": 1000
          },
          "geometry": {
            "type": "Point",
            "coordinates": [116, 39]
          }
        }];
        this.properties = {
          "name": "北京",
          "wuran": 1000
        };
      },
      handleDelete: function (index, row) {
        console.log('删除', index, row);
        this.$confirm('确认删除？', '提示', {
          type: 'warning'
        }).then(function () {
          this.$message({
            showClose: true,
            message: '成功删除！',
            type: 'success'
          });
          //  TODO 重新请求数据刷新表格列表
        }.bind(this)).catch(function () {
          this.$message({
            showClose: true,
            message: '取消删除！',
            type: 'warning'
          });
        }.bind(this));
      },
      getData: function(url) {
        var _this = this;
        _this.tableLoading = true;
        _this.$http.get(url).then((res) => {
          console.log(res);
          let features = res.data.features;
          //let features = _this.datalist;
          if(features) {
            //  将服务列表分组，每组10个
            _this.datalistArray = _this.groupData(features, _this.pagination.pageSize);
            _this.pagination.total = features.length;
            _this.dataList = this.datalistArray[0];
            _this.tableLoading = false;
          }
          else {
            console.info("暂无数据");
            //  清空数据，并且重置数据条数为0、默认显示第一页，
            _this.dataList = null;
            _this.pagination.total = 0;
            _this.pagination.currentPage = 1;
          }
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
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange: function(val) {
        this.pagination.currentPage = val;
        console.log(`当前页: ${val}`);
        this.dataList = this.datalistArray[val-1];
      },
    }
  }
</script>

<style>
  .deal span {
    color: #20a0ff;
    display: inline-block;
    margin-left: 1%;
  }
  .fl {
    float: left;
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
