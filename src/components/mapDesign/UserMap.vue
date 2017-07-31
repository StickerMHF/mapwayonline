<template>
  <div class="container">
    <el-button type="primary" @click="createNewMap">创建新地图</el-button>
    <ul style="width: 1000px;margin: 0 auto;">
      <li :class="[ item.checked ? 'data-checked' : '', 'data-item' ]"  v-for="item in data_list" :key="item.name"  @click="dataClick(item)">
        <i class="datatype" :class="item.layertype"></i>
        <span>{{item.name}}</span>
        <span>{{item.description}}</span>
        <span>{{item.pubdate}}</span>
      </li>
    </ul>

    <el-pagination
      @current-change="currentMapChange"
      :current-page.sync="mapCurrentPage"
      :page-size="10"
      layout="total,  prev, pager, next, jumper"
      :total="mapTotal" style="text-align: center">
    </el-pagination>

    <!--创建新地图-->
    <div >
      <div><el-button type='text' @click="toRender">创建</el-button></div>
      <ul style="width: 1000px;margin: 0 auto;">
        <li :class="[ item.checked ? 'data-checked' : '', 'data-item' ]"  v-for="item in data_list" :key="item.name"  @click="dataClick(item)">
          <i class="datatype" :class="item.layertype"></i>
          <span>{{item.name}}</span>
          <span>{{item.description}}</span>
          <span>{{item.pubdate}}</span>
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
  </div>
</template>

<script>
  import Tool from './render/tool.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'usermap',
    data () {
      return {
        map_list: null,
        data_list: null,
        map_url: '/mapdesign/map/get',
        data_url: '/mapdesign/map/layers',
        mapCurrentPage: 1,
        dataCurrentPage: 1,
        mapTotal: null,
        dataTotal: null,
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
        'addDataIDChecked', 'removeDataIDChecked'
      ]),
      fetchData () {
        // 获取用户数据集
        //var url = this.getLogin.userName + this.data_url;
        var url = 'TBUSER000001' + this.data_url;
        this.$http.get(url)
          .then((res) => {
            var list = [];
            res.data.data.forEach((item) => {
              item.checked = false;
              list.push(item);
            });
            this.data_list = list;
            this.dataTotal = this.data_list.length;
          });
      },

      fetchMap () {
        // 获取用户地图集
        //var url = this.getLogin.userName + this.map_url;
        var url = 'TBUSER000001' + this.map_url;
        this.$http.get(url)
          .then((res) => {
            var list = [];
            res.data.data.forEach((item) => {
              item.checked = false;
              list.push(item);
            });
            this.map_list = list;
            this.mapTotal = this.map_list.length;
          });
      },

      currentDataChange(val){
        this.dataCurrentPage = val;
        this.fetchData(this.data_url, this.dataCurrentPage);
      },

      currentMapChange(val){
        this.mapCurrentPage = val;
        this.fetchData(this.data_url, this.mapCurrentPage);
      },

      toRender () {
        this.$router.push('/mapdesign/new');
      },

      dataClick (item) {
        item.checked = !item.checked;
        if (item.checked) {
          this.addDataIDChecked(item.layerid);
        } else {
          this.removeDataIDChecked(item.layerid);
        }
      },

      /* 新建地图 */
      createNewMap () {

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
    width: 90%;
    padding: 10px 30px;
    line-height: 60px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 1px solid #ECECEC;
    border-radius: 5px;
  }

  .data-checked{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 90%;
    padding: 10px 30px;
    line-height: 60px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 1px solid #66CCFF;
    border-radius: 5px;
  }


  .data-item:hover {
    border:1px solid #66CCFF;
  }
</style>
