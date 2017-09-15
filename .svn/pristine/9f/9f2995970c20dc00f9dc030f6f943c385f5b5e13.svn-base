<template>
  <div class="container">
    <!-- 地图列表 -->
    <div class="map-list" v-if="!dataList">
      <div class="btn-container">
        <el-button type="primary" @click="showDataList">创建新地图</el-button>
      </div>

      <ul>
        <li :class="[ item.checked ? 'data-checked' : '', 'data-item' ]"  v-for="item in map_list" :key="item.name"  @click="mapClick(item)">
          <i class="datatype" :class="item.layertype"></i>
          <span>{{item.tag}}</span>
          <span>{{item.mark}}</span>
          <span>{{item.description}}</span>
          <span>{{item.createdate}}</span>
        </li>
      </ul>

      <el-pagination
        @current-change="currentMapChange"
        :current-page.sync="mapCurrentPage"
        :page-size="10"
        layout="total,  prev, pager, next, jumper"
        :total="mapTotal" style="text-align: center">
      </el-pagination>
    </div>
    <!-- 地图列表结束 -->

    <!-- 数据列表 -->
    <div class="data-list" v-if="dataList">
      <div class="btn-container">
        <el-button type='primary' @click="toMapList"><i class="fa fa-arrow-left"></i></el-button>
        <el-button type='primary' @click="toRender" style="float: right;">创建</el-button>
      </div>

      <ul >
        <li :class="[ item.checked ? 'data-checked' : '', 'data-item' ]"  v-for="item in data_list" :key="item.name"  @click="dataClick(item)">
          <i class="datatype" :class="item.layertype"></i>
          <span>{{item.name}}</span>
          <span>{{item.description}}</span>
        </li>
      </ul>

      <el-pagination
        @current-change="currentDataChange"
        :current-page.sync="dataCurrentPage"
        :page-size="10"
        layout="total,  prev, pager, next, jumper"
        :total="dataTotal" style="text-align: center">
      </el-pagination>
    </div>
    <!-- 数据列表结束 -->
  </div>
</template>

<script>
  import Tool from '@/components/tool.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'usermap',
    data () {
      return {
        map_list: null,
        data_list: null,
        map_url: '/mapdesign/map',
        data_url: 'mapdesign/map/layers',
        mapCurrentPage: 1,
        dataCurrentPage: 1,
        mapTotal: null,
        dataTotal: null,
        // 控制地图列表和数据列表切换
        dataList: false,
      };
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    computed: {
      ...mapGetters([
        'getLogin', 'render'
      ]),
    },
    created () {
      this.fetchData();
      this.fetchMap();
    },
    mounted () {
      console.log('地图列表初始化成功');
    },
    methods: {
      ...mapActions([
        // 数据列表页，对用户勾选的数据进行id记录    添加， 删除， 重置
        'addIdChecked', 'removeIdChecked', 'resetIdChecked'
      ]),

      /* 获取用户地图集 */
      fetchMap () {
        // var url = this.getLogin.userName + this.map_url; TODO
        var url = 'TBUSER000001' + this.map_url;
        this.$http.get(url).then((res) => {
          var list = [];
          if (!res.data.data) {
            console.log('获取用户地图集: ' + res.data.data);
            return;
          }
          res.data.data.forEach((item) => {
            item.checked = false;
            list.push(item);
          });
          this.map_list = list;
          this.mapTotal = this.map_list.length;
        }).catch((err) => { console.log(err) });
      },

      /* 获取用户数据集 */
      fetchData () {
        // var url = this.getLogin.userName + this.data_url; TODO
        var url = this.data_url;
        this.$http.get(url).then((res) => {
          if (!res.data.data) {
            console.log('获取用户数据集: ' + res.data.data);
            return;
          }

          var list = [];
          res.data.data.forEach((item) => {
            item.checked = false;
            list.push(item);
          });
          this.data_list = list;
          this.dataTotal = this.data_list.length;
        }).catch((err) => { console.log(err) });
      },

      /* 地图列表当前页数改变 */
      currentMapChange(val){
        this.mapCurrentPage = val;
        this.fetchData(this.data_url, this.mapCurrentPage);
      },

      /* 数据列表当前页数改变 */
      currentDataChange(val){
        this.dataCurrentPage = val;
        this.fetchData(this.data_url, this.dataCurrentPage);
      },

      /* 页面跳转到数据列表页面 */
      showDataList () {
        this.dataList = !this.dataList;
        this.resetIdChecked();
      },

      /* 页面跳到地图列表页面 */
      toMapList () {
        this.dataList = !this.dataList;
      },

      /* 带着选择好的数据跳转到制作地图页面 */
      toRender () {
        this.$router.push('/mapdesign/new');
      },

      mapClick (item) {
        // TODO
        /*item.checked = !item.checked;
         if (item.checked) {
         this.addIDChecked(item.layerid);
         } else {
         this.removeIDChecked(item.layerid);
         }*/
      },

      dataClick (item) {
        item.checked = !item.checked;
        if (item.checked) {
          this.addIdChecked(item.layerid);
        } else {
          this.removeIdChecked(item.layerid);
        }
        /*console.log(this.render.idChecked);
        debugger*/
      },
    },
  }
</script>

<style scoped >
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .container{
    width: 1200px;
    margin: 0 auto;
    overflow-y: auto;
  }

  .datatype{
    display: inline-block;
    height: 50px;
    width: 50px;
    font-style: normal;
    background-repeat: no-repeat;
    background-size: 50px 50px;
    vertical-align: bottom;
    border: 1px solid #66CCFF;
  }

  .btn-container {
    display: flex;
    justify-content:space-between;
    height: 50px;
    align-items: center;
  }

  .LineString,
  .MultiLineString
  {
    background-image: url(../../assets/mapDesign/img/esriGeometryPolyline.png);
  }
  .Point,
  .MultiPoint
  {
    background-image: url(../../assets/mapDesign/img/esriGeometryPoint.png);
  }
  .Polygon,
  .MultiPolygon
  {
    background-image: url(../../assets/mapDesign/img/esriGeometryPolygon.png);
  }
  .esriGeometryPolygon{
    background-image: url(../../assets/mapDesign/img/esriGeometryPolygon.png);
  }
  .esriGeometryPolyline{
    background-image: url(../../assets/mapDesign/img/esriGeometryPolyline.png);
  }
  .esriGeometryPoint{
    background-image: url(../../assets/mapDesign/img/esriGeometryPoint.png);
  }
  .data-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;
    padding: 10px 30px;
    line-height: 60px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 1px solid #ECECEC;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .data-checked{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;
    padding: 10px 30px;
    line-height: 60px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 1px solid #66CCFF;
    border-radius: 5px;
    box-sizing: border-box;
  }


  .data-item:hover {
    border:1px solid #66CCFF;
  }
</style>
