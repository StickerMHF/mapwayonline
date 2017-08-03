<template>
  <div class="userdatasets">

    <el-tabs class='tabs' v-model='activeName' type='card' >
      <el-tab-pane label='我的数据集' name='myDataSets'>
        <!--<h2>我的数据集</h2>-->

        <ul style="width: 1000px;margin: 0 auto;">
          <li class="dataItem" v-for="item in data_list" :key='item.id' >
            <i class="datatype" :class="item.layertype"></i>
            <span>{{item.dataname}}</span>
            <span>{{item.datadescribe}}</span>
            <span>{{item.pubdate}}</span>
            <el-button type='text' @click.prevent="getName(item.id)">编辑</el-button>
            <el-button type='text'>删除</el-button>
          </li>
        </ul>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total,  prev, pager, next, jumper"
          :total="pagetotal">
        </el-pagination>

        <!--
                      <el-row :gutter="10">
                        <el-col :xs="6" :sm="6" :md="4" :lg="8" v-for="item in data_list" :key="item.name">
                          <div style="cursor: pointer; margin: 15px 0; height: 100px;" @click.prevent="getName(item.id)">
                            <img :src="item.img" alt="" style="height: 100px; width: 100px;">
                            <div>{{ item.name }}</div>
                          </div>
                        </el-col>
                      </el-row>
                                        -->
      </el-tab-pane>
      <el-tab-pane label='新增数据' name='getDataSets' class='getDataSets'>

        <!--<div class="tips" >
          <div class="headerIcon">
            <i class="el-icon-upload"></i>
          </div>
          <h2 style="font-weight: 400;">连接数据集</h2>
          <p style="color: #979ea1;">从外部服务连接数据集或上传数据文件</p>
        </div>-->
        <el-tabs v-model='activeName2'   class='getDataWays'  style="margin-top: 30px;">
          <el-tab-pane label='MapWayServer' name='w1' >
            <mws-box v-on:refreshdata = 'gotab'></mws-box>
          </el-tab-pane>
          <el-tab-pane label='上传Excel' name='w2'>
            <excelfile-box v-on:refreshdata = 'gotab'></excelfile-box>
          </el-tab-pane>
          <el-tab-pane label='shapefile' name='w3'>
            <shapefile-box v-on:refreshdata = 'gotab'></shapefile-box>
          </el-tab-pane>
          <!--数据库方式正在开发中。。。-->
          <!--
                  <el-tab-pane label='数据库' name='w4'>
                      <datalibrary-box></datalibrary-box>
                  </el-tab-pane>
                  -->
          <el-tab-pane label='自定义数据' name='w5'>
            <customdata-box v-on:refreshdata = 'gotab'></customdata-box>
          </el-tab-pane>
        </el-tabs>


      </el-tab-pane>

    </el-tabs>


  </div>

</template>

<script>
  import shapefileBox from './dataset/shapefilebox.vue'
  import excelfileBox from './dataset/excelfileBox.vue'
  import customdataBox from './dataset/customdataBox.vue'
  import datalibraryBox from './dataset/datalibrarybox.vue'
  import mwsBox from './dataset/mwsdatabox.vue'
  import { mapGetters } from 'vuex'


  export default {
    name: 'userdataset',
    components: {shapefileBox,excelfileBox,customdataBox,datalibraryBox,mwsBox},
    data () {
      return {
        data_list: null,
        data_url: '/datacenter/datas',
        activeName: 'myDataSets',
        activeName2: 'w1',
        currentPage:1,
        pagetotal:0
      };
    },
    computed: {
      ...mapGetters([
        'getLogin', 'render'
      ]),
    },
    created () {
      this.fetchData();
    },
    methods:{
      handleCurrentChange(val){
        this.currentPage = val;
      },
      gotab(tabname){
        this.activeName = tabname
      },
      fetchData () {
        // 获取用户数据集
        //var url = this.login.userName + this.data_url;
        var url = 'TBUSER000001' + this.data_url;
        this.$http.get(url)
          .then((res) => {
            this.data_list = res.data.data;
            this.pagetotal = this.data_list.length;
          });

      },
      getName (id) {
        this.$router.push('/datacenter/' + id + '/edit');
      }
    }
  }
</script>

<style>
  ul,li{
    list-style: none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .tabs {
    padding: 40px 10%;
  }
  .tips{
    padding: 20px 0;
    background-color: #f9f9f9;
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
  .dataItem{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 90%;
    padding: 10px 30px;
    line-height: 60px;
    margin-bottom: 10px;
    border: 1px solid #ECECEC;
    border-radius: 5px;
  }
  .dataItem:hover{
    border:1px solid #66CCFF;
  }
</style>
