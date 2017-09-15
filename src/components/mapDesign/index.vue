<template>

  <div id="map-index">
    <ContentLeft @getByTree="getByTreepid" @backTomapList="backTomapList" @getmapByCondition="getmapByCondition"></ContentLeft>

    <div id="map_content2" class="map_content map_content2">
      <div class="fc_title">
        <h3>{{listdata.title}}</h3>
      </div>
      <div class="fc_content" >
        <!--<DataShowModel :child-data="defaultAddData.data"></DataShowModel>-->
      </div>
      <div class="fc_content">
        <DataShowModel :child-data="listdata.data" @deleteItem="deleteItem" @previewItem="previewMap" @editItem="editMap"></DataShowModel>
      </div>
    </div>
    <div id="map_content1" class="map_content map_content1">
      <el-tabs class="fc_tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="fc_tab" label="新建地图" name="first">
          <DataShowModel :child-data="defaultAddData.data" @deleteItem="deleteItem" @addItem="showCreateDialog"></DataShowModel>
          <div class="fct1_title">从共享中心新建地图</div>
          <DataShowModel :child-data="mapdata.recentlyshare"></DataShowModel>
        </el-tab-pane>
        <el-tab-pane label="最近编辑" name="second">
          <DataShowModel :child-data="mapdata.recently" :show-list="true" @deleteItem="deleteItem"></DataShowModel>
        </el-tab-pane>
        <el-tab-pane label="共享中心" name="third">
          <DataShowModel :child-data="mapdata.exchange" :show-list="true"></DataShowModel>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 创建地图选择弹出框dialog -->
    <el-dialog title="创建地图" :visible.sync="dialogCreateMapVisible" :close-on-press-escape="false" :close-on-click-modal="false">
      <div class="data-map-main">
        <div class="edit-log">
          <el-row :gutter="10" v-if="!isDataView">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-input v-model="mapInfo.name" placeholder="请输入地图名称"></el-input>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-input v-model="mapInfo.description" placeholder="请输入地图描述"></el-input>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-input type="textarea" autosize placeholder="请输入地图标签(以逗号隔开)" v-model="mapInfo.tag" style="margin: 10px 0;">
              </el-input>
            </el-col>
          </el-row>
          <div v-if="isDataView">
            <!-- 数据列表 -->
            <div class="data-list" v-loading="datalistLoading">
              <ul >
                <li :class="[ item.checked ? 'data-checked' : '', 'data-item' ]"  v-for="item in data_list" :key="item.name"  @click="dataClick(item)">
                  <i class="datatype" :class="item.layertype"></i>
                  <span>{{item.name}}</span>
                  <span>{{item.pubdate}}</span>
                </li>
              </ul>

              <el-pagination
                @current-change="currentDataChange"
                :current-page.sync="pagination.currentPage"
                :page-size="pagination.pageSize"
                layout="total,  prev, pager, next, jumper"
                :total="pagination.total" style="text-align: center">
              </el-pagination>
            </div>
            <!-- 数据列表结束 -->
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateMapVisible = false">取 消</el-button>
        <el-button type="primary" @click="showDataView" v-show="!isDataView">继 续</el-button>
        <el-button type="primary" @click="toRender" v-show="isDataView">创 建</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import ContentLeft from './ContentLeft.vue';
  import Tool from '@/components/tool.vue'
  import DataShowModel from '../common/DataShowModel.vue';
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    name: 'map-index',
    components: {
      ContentLeft,
      DataShowModel
    },
    data() {
      return {
        mapPath: '/mapDesign/init/',
        title: "文件夹",
        activeName: 'first',
        type:16,
        defaultAddData: {
          data: {
            data: [{
              formid: 1,
              name: "创建地图",
              type: 27,
              img: "/static/Index/img/newform.png",
              url: "/formDesign/init/new",
              usable: true,
              price: 0,
              author: "管理员",
              createdate: "2017-08-08"
            }]
          }
        },
        listdata: {
          title: "未命名文件夹",
          data: {
            url: {
              preview: "/formDesign/preview",
              edit: "/formDesign/edit",
              share: "/formDesign/init",
              delete: this.$http.defaults.baseURL + "TBUSER000001/formdesign/forms/delete/",
              move: ""
            },
            data: []
          }
        },
        mapdata: {
          recentlyshare: {
            url: {
              preview: "/formDesign/init",
              edit: "/formDesign/init",
              share: "/formDesign/init",
              delete: this.$http.defaults.baseURL + "TBUSER000001/formdesign/forms/delete/",
              move: ""
            },
            data:[]
          },
          recently: {
            url: {
              preview: "/formDesign/init",
              edit: "/formDesign/init",
              share: "/formDesign/init",
              delete: this.$http.defaults.baseURL + "TBUSER000001/formdesign/forms/delete/",
              move: ""
            },
            data:[]
          },
          exchange: {
            url: {
              preview: "/formDesign/init",
              edit: "/formDesign/init",
              share: "/formDesign/init",
              delete: this.$http.defaults.baseURL + "TBUSER000001/formdesign/forms/delete/",
              move: ""
            },
            data:[]
          }
        },
        /* 创建地图dialog */
        dialogCreateMapVisible: false,
        mapInfo: {
          name: '',
          description: '',
          tag: '',
        },
        isDataView: false,

        datalistLoading: false,
        data_list_array: [],
        data_list: null,
        //  分页的配置
        pagination: {
          currentPage: 1,
          total: 0,
          pageSize: 10
        },
        data_url: '/datacenter/datas',
        /* 创建地图dialog */
      }
    },
    computed: {
      ...mapGetters([
        'render',
      ]),
    },
    methods: {
      ...mapActions([
        'setNewMapInfo', // 保存下创建新地图的基础信息
        'addDataIdChecked', 'removeDataIdChecked', 'resetDataIdChecked',  // 数据列表页，对用户勾选的数据进行id记录    添加， 删除， 重置
        'setCurrentDataId', 'setEditLog',
        'setNotFirstRender', 'setFirstRender', // 设置成非首次渲染     首次渲染
        'setCurrentMapId',   // 设置当前选中的mapid
      ]),

      /* 显示创建地图弹出框 */
      showCreateDialog () {
        this.dialogCreateMapVisible = true;
        this.beforeShowCreateDialog();
      },

      /* 弹出框显示前配置 */
      beforeShowCreateDialog () {
        this.$set(this.mapInfo, 'name', '');
        this.$set(this.mapInfo, 'description', '');
        this.$set(this.mapInfo, 'tag', '');
        this.isDataView = false;
      },

      /* 用户数据列表展示 */
      showDataView () {
        this.isDataView = true;
        this.resetDataIdChecked();
        console.log(this.render.dataIdChecked)
        this.fetchData();
      },

      /* 获取用户数据集 */
      fetchData () {
        this.datalistLoading = true;
        // var url = this.getLogin.userName + this.data_url; TODO
        var url = 'TBUSER000001' + this.data_url;
        this.$http.get(url).then((res) => {
          this.datalistLoading = false;
          if (!res.data.data) {
            console.log('ajax 获取数据集 接口数据结构变化: ' + res.data);

            console.info("暂无数据");
            //  清空数据，并且重置数据条数为0、默认显示第一页，
            this.data_list = null;
            this.pagination.total = 0;
            this.pagination.currentPage = 1;
            return;
          }

          var temArray = [];
          // temArray = 用户数据列表，为每一个列表加checked字段，初始为false，用于判断是否勾选
          res.data.data.forEach((item) => {
            item.checked = false;
            temArray.push(item);
          });

          // 将服务列表分组，每组10个
          this.data_list_array = this.groupData(temArray, this.pagination.pageSize);
          this.pagination.total = temArray.length;
          this.data_list = this.data_list_array[0];
          this.tableLoading = false;
        }).catch((err) => { console.log(err) });
      },

      /* 分页 */
      groupData: function (array, gap) {
        let result = [];
        for(let i = 0, len = array.length; i < len; i += gap) {
          result.push( array.slice(i, i+gap) );
        }
        return result;
      },

      /* 数据列表当前页数改变 */
      currentDataChange(val){
        this.dataCurrentPage = val;
        this.data_list = this.data_list_array[val-1];
      },

      dataClick (item) {
        item.checked = !item.checked;
        if (item.checked) {
          this.addDataIdChecked(item.id);
        } else {
          this.removeDataIdChecked(item.id);
        }
        /*console.log(this.render.dataIdChecked);
         debugger*/
      },

      /* 转至地图渲染页面(首次渲染) */
      toRender () {
        if (this.render.dataIdChecked.length === 0) {
          this.$message({
            showClose: true,
            message: '请先选择图层',
            type: 'warning',
          });
          return;
        }

        /* 进入地图渲染页面之前，在vuex中先保存下新地图的基础信息 */
        for (let i in this.mapInfo) {
          let _temObj = { key: '', value: ''};
          _temObj.key = i;
          _temObj.value = this.mapInfo[i];
          this.setNewMapInfo(_temObj);
        }

        this.beforeToRender();
        this.$router.push('/mapdesign/new');
      },

      /* 跳转至渲染页面之前 */
      beforeToRender () {
        this.setFirstRender(); // 渲染状态改为首次渲染

      },


      /********************************************* 二次编辑 **************************************************/
      editMap (id) {
        this.setCurrentMapId(id);
        this.setNotFirstRender(); // 非首次渲染
        this.$router.push(this.listdata.data.url.render  + id);
      },

      previewMap (item){
        var id = item.id;
        this.$router.push(this.listdata.data.url.preview  + id);
      },

      handleClick (tab, event) {
        console.log(tab, event);
      },

      getByTreepid (node, store, data, childids) {
        document.getElementById("map_content1").style.display = "none";
        document.getElementById("map_content2").style.display = "block";
        this.listdata.title = data.name;
        if(data.id == "999") {
          var url = 'TBUSER000001/mapdesign/maps';
          this.getMapByUrl(url, 0);
        } else {
          var url = 'TBUSER000001/mapdesign/maps/folder/' + data.id;
          this.getMapByUrl(url, 0);
        }
        this.getMapByUrl(url, 28);
      },

      getmapByCondition(type, name) {
        this.listdata.title = name;
        document.getElementById("map_content1").style.display = "none";
        document.getElementById("map_content2").style.display = "block";
        if(type == 0) { //我的地图
          var url = 'TBUSER000001/mapdesign/maps';
          this.getMapByUrl(url, type);
        }  else if(type == 2) { //已分享的表单
          var url = 'TBUSER000001/mapdesign/maps/share';
          this.getMapByUrl(url, type);
        }
      },

      getMapByUrl(url, type) {
        this.$http.get(url).then((res) => {
          console.log(type, res)

          if (!res.data) {
            console.log('判断条件res.data： ', res.data)
            return;
          }

          switch(type) {
            case 0:
              this.listdata.data.url.preview = "/mapdesign/preview/";
              this.listdata.data.url.render = "/mapdesign/render/";
              this.listdata.data.url.share = "/mapdesign/init/";
              this.listdata.data.url.delete = this.$http.defaults.baseURL + "TBUSER000001/mapdesign/maps/delete/";
              this.listdata.data.url.move = "";
              break;
            case 2:
              break;
            default:

              break;
          }
          this.listdata.data.data = res.data;
          //debugger
        });
      },

      backTomapList(evt) {
        document.getElementById("map_content2").style.display = "none";
        document.getElementById("map_content1").style.display = "block";
      },

      deleteItem(id) {
        var url = this.$http.defaults.baseURL + "TBUSER000001/mapdesign/maps/delete/" + id;
        this.$http.get(url).then((res) => {
          if(res.data.result) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.$bus.$emit("gettreedata");
            this.init();
            this.updateListData(this.listdata.data.data, id);
            this.updateListData(this.mapdata.recently.data, id);
          } else {
            this.$message.error("删除失败");
          }
        });
      },

      updateListData(list, id) {
        var data = [];
        for(var item in list) {
          if(list[item].id != id) {
            data.push(list[item]);
          }
        }
        list = data;
      },

      init() {
        var that = this;
        var url = "TBUSER000001/mapdesign/maps/inits";
        that.$http.get(url).then((res) => {
          if(res.data != null) {
            that.mapdata.recently.data = res.data.data.Modify;
            that.mapdata.recentlyshare.data = res.data.data.RecentlyShare;
            that.mapdata.exchange.data = res.data.data.OtherShare;
          }
        });
      },



      /* 跳转至geo数据编辑界面 */
      toEdit(id) {
        this.setCurrentDataId(id); // 重置用户选择的数据id
        this.setEditLog(false); // 重置编辑界面右侧条的伸缩
        this.$router.push('/datacenter/edit/' + id);
      },
    },
    created() {

    },
    mounted() {
      this.init();

    }
  }
</script>

<style>
  #map-index {
    height: 100%;
    padding-left: 260px;
  }

  .map_content {
    height: 100%;
    margin-left: 1px;
  }

  .fc_title {
    height: 55px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    background: #fff;
    position: relative;
    z-index: 10;
    border-bottom: 1px solid #eee;
    line-height: 55px;
  }

  .fc_title h3 {
    font-size: 16px;
    float: left;
    line-height: 55px;
    padding-left: 20px;
    color: #333;
    margin: 0;
  }

  .fc_tabs {
    padding: 40px 0 0 0;
    margin: 0 35px;
  }

  .map_content .el-tabs__active-bar {}

  .map_content .el-tabs__item {
    background: #eee;
  }

  .map_content .el-tabs__item.is-active {
    color: #fbfdff;
    background: #232c32 !important;
  }

  .map_content1 {}

  .map_content2 {
    display: none;
  }

  .fct1_title {
    font-size: 14px;
    line-height: 30px;
    padding: 0 20px;
    font-weight: bold;
    width: 100%;
    float: left;
    color: #758697;
  }

  .fc_content {
    margin-top: 20px;
    width: 100%;
    float: left;
  }
</style>
