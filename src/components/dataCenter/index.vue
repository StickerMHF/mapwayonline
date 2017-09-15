<template>

	<div id="data-index">
		<ContentLeft @getByTree="getByTreepid" @backToDataList="backToDataList" @getDataByCondition="getDataByCondition"></ContentLeft>

		<div id="data_content2" class="data_content data_content2">
			<div class="dc_title">
				<h3>{{title}}</h3>
			</div>
			<div class="dc_content" style="height: 230px;;">
				<DataShowModel :child-data="defaultAddData.data" @addItem="addItem"></DataShowModel>
			</div>
			<div class="fct1_title">最新创建的数据</div>
			<div class="dc_content">
				<DataShowModel :child-data="listdata.data" @deleteItem="deleteItem" @designItem="designItem"></DataShowModel>
			</div>
		</div>
		<div id="data_content1" class="data_content data_content1">
			<el-tabs class="dc_tabs" v-model="activeName">
				<el-tab-pane class="dc_tab" label="个人数据" name="first">
          <el-tabs  v-model="active5" class="tabsTwo">
            <el-tab-pane label='创建' name='f1'>
              <div class="dc_content" style="height: 230px;">
              <DataShowModel :child-data="defaultAddData.data" @addItem="addItem"></DataShowModel>
              </div>
              <div class="fct1_title">数据列表</div>
              <DataShowModel :child-data="datadata.create" :show-list="true" @deleteItem="deleteItem" @designItem="designItem"></DataShowModel>
            </el-tab-pane>
            <el-tab-pane label='上传' name='f2' class="updata" >
              <el-tabs label="上传数据" >
                <div class="dc_createdata">
                  <el-tabs v-model='activeName4' class='getDataWays tabsTwo'>
                    <el-tab-pane label='shapefile' name='w3'>
                      <shapefile-box v-on:refreshdata='gotab' ></shapefile-box>
                    </el-tab-pane>
                    <el-tab-pane label='上传Excel' name='w2'>
                      <excelfile-box v-on:refreshdata='gotab'></excelfile-box>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label='在线' name='f3' class="updata">
              <el-tabs label="在线数据">
                <div class="dc_createdata">
                  <el-tabs v-model='activeName4' class='getDataWays tabsTwo'>
                    <el-tab-pane label='ArcGisServer' name='w1' >
                      <ags-box v-on:refreshdata='gotab'></ags-box>
                    </el-tab-pane>
                    <el-tab-pane label='MapWayServer' name='w3' >
                      <mws-box v-on:refreshdata='gotab'></mws-box>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-tabs>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
				<!--<el-tab-pane label="最近编辑" name="second">-->
					<!--<DataShowModel :child-data="datadata.recently" :show-list="true" @deleteItem="deleteItem" @designItem="designItem"></DataShowModel>-->
				<!--</el-tab-pane>-->
        <el-tab-pane label="公共数据" name="third">
          <div class="dc_commondata">
            <DataShowModel :child-data="datadata.common"></DataShowModel>
            <!--<el-tabs v-model='activeName0' class='getDataWays'>-->
              <!--<el-tab-pane label='公共数据' name='w1'>-->
                <!--<DataShowModel :child-data="datadata.common"></DataShowModel>-->
              <!--</el-tab-pane>-->
              <!--<el-tab-pane label='第三方数据' name='w2'>-->
              <!--</el-tab-pane>-->
              <!--<el-tab-pane label='数据库' name='w3'>-->

              <!--</el-tab-pane>-->
              <!--<el-tab-pane label='分享数据' name='w3'>-->

              <!--</el-tab-pane>-->
              <!--&lt;!&ndash;数据库方式正在开发中。。。&ndash;&gt;-->
              <!--&lt;!&ndash; <el-tab-pane label='数据库' name='w4'>-->
                              <!--<datalibrary-box></datalibrary-box>-->
                        <!--</el-tab-pane> &ndash;&gt;-->

            <!--</el-tabs>-->
          </div>
        </el-tab-pane>

				<!--<el-tab-pane label="已分享数据" name="fourth">-->
					<!--<div class="dc_commondata">-->
            <!--<DataShowModel :child-data="datadata.common"></DataShowModel>-->
						<!--&lt;!&ndash;<el-tabs v-model='activeName0' class='getDataWays'>&ndash;&gt;-->
							<!--&lt;!&ndash;<el-tab-pane label='公共数据' name='w1'>&ndash;&gt;-->
								<!--&lt;!&ndash;<DataShowModel :child-data="datadata.common"></DataShowModel>&ndash;&gt;-->
							<!--&lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
							<!--&lt;!&ndash;<el-tab-pane label='第三方数据' name='w2'>&ndash;&gt;-->
							<!--&lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
							<!--&lt;!&ndash;<el-tab-pane label='数据库' name='w3'>&ndash;&gt;-->

							<!--&lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
							<!--&lt;!&ndash;<el-tab-pane label='分享数据' name='w3'>&ndash;&gt;-->

							<!--&lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
							<!--&lt;!&ndash;&lt;!&ndash;数据库方式正在开发中。。。&ndash;&gt;&ndash;&gt;-->
							<!--&lt;!&ndash;&lt;!&ndash; <el-tab-pane label='数据库' name='w4'>&ndash;&gt;-->
				              <!--&lt;!&ndash;<datalibrary-box></datalibrary-box>&ndash;&gt;-->
				        <!--&lt;!&ndash;</el-tab-pane> &ndash;&gt;&ndash;&gt;-->

						<!--&lt;!&ndash;</el-tabs>&ndash;&gt;-->
					<!--</div>-->
				<!--</el-tab-pane>-->

				<el-tab-pane label="数据模型" name="fifth">
          <div class="fct1_title">创建新的数据</div>
          <DataShowModel :child-data="defaultAddData.data" @addItem="addModelItem" ></DataShowModel>
          <div class="fct1_title">最新创建的数据</div>
          <div class="dc_content" style="height: 230px;">
            <DataShowModel :child-data="myModeldata.recently" @addItem="addModelItem" @deleteModel="deleteModel" @editItem="designModel" ></DataShowModel>
          </div>

				</el-tab-pane>


			</el-tabs>
		</div>
	</div>

</template>

<script scoped>
	import ContentLeft from './ContentLeft.vue';
	import DataShowModel from '../common/DataShowModel.vue';
	import shapefileBox from './dataset/shapefilebox.vue';
	import excelfileBox from './dataset/excelfileBox.vue';
	import customdataBox from './dataset/customdataBox.vue';
	import datalibraryBox from './dataset/datalibrarybox.vue';
	import mwsBox from './dataset/mwsdatabox.vue';
	import agsBox from './dataset/agsdatabox.vue';

	export default {
		name: 'data-index',
		components: {
			ContentLeft,
			DataShowModel,
			shapefileBox,
			excelfileBox,
			customdataBox,
			datalibraryBox,
			mwsBox,
			agsBox,
		},
		data() {
			return {
				dataPath: '/dataDesign/init/',
				title: "文件夹",
				type: 18,
				activeName: 'first',
				activeName0: "w1",
				activeName2: 'w1',
				activeName3: "f1",
				activeName4: "w3",
				active5: "f1",
				dialogdata: {
					title: "创建数据表",
					description: "新建我自己的数据库表"
				},
				defaultAddData: {
					data: {
						data: [{
							formid: 1,
							name: "创建数据表",
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
        myModeldata:{
            recently:{
              url: {
                preview: "/datacenter/init/",
                edit: "/datacenter/init/edit/",
                share: "/datacenter/init/",
                delete: "",
                move: ""
              },
              data: []
            }

        },
				listdata: {
					title: "未命名文件夹",
					data: {
						url: {
							preview: "/datacenter/init/",
							edit: "/datacenter/init/",
							share: "/datacenter/init/",
							delete: "",
							move: ""
						},
						data: []
					}
				},
				datadata: {
					create: {
						url: {
							preview: "/datacenter/init",
							edit: "/datacenter/init",
							share: "/datacenter/init",
							delete: "",
							move: ""
						},
						data: []
					},
					recently: {
						url: {
							preview: "/datacenter/init",
							edit: "/datacenter/init",
							share: "/datacenter/init",
							delete: "",
							move: ""
						},
						data: []
					},
					common: {
						url: {
							preview: "/datacenter/init",
							edit: "/datacenter/init",
							share: "/datacenter/init",
							delete: "",
							move: ""
						},
						data: []
					},
					exchange: {
						url: {
							preview: "/datacenter/init",
							edit: "/datacenter/init",
							share: "/datacenter/init",
							delete: "",
							move: ""
						},

						data: []
					}
				}

			}
		},
		methods: {
			editdata(oid) {
				this.$router.push(this.dataPath + oid);
				console.log(this.dataPath + oid);

			},
			handleClick(tab, event) {
//				console.log(tab, event.target);
//				debugger
			},

			getByTreepid(node, store, data, childids) {
				document.getElementById("data_content1").style.display = "none";
				document.getElementById("data_content2").style.display = "block";
				this.listdata.title = data.name;
				if(data.id == "999") {
					var url = this.$http.defaults.baseURL + 'datacenter/datas';
					this.getDataByUrl(url, 28);
				} else {
					var url = this.$http.defaults.baseURL + 'datacenter/datas/folder/' + data.id;
					this.getDataByUrl(url, 28);
				}
				//this.getDataByUrl(url, 28);

			},
			getDataByCondition(type, name) {
				this.listdata.title = name;
//				document.getElementById("data_content1").style.display = "none";
//				document.getElementById("data_content2").style.display = "block";
//				if(type == 0) { //我的数据
//					var url = this.$http.defaults.baseURL + 'datacenter/datas';
//					this.getDataByUrl(url, 28);
//				} else if(type == 1) { //公共数据
//					var url = this.$http.defaults.baseURL + 'commondata/management';
//					this.getDataByUrl(url, 29);
//				} else if(type == 2) { //已分享的表单
//					var url = this.$http.defaults.baseURL + 'datacenter/datas/share';
//					this.getDataByUrl(url, 28);
//				} else if(type == 3){//数据模型
//          var url = this.$http.defaults.baseURL + 'datamodel';
//          this.getDataByUrl(url, 31);
//        }

			},
			getDataByUrl(url, type) {
				var that = this;
				that.$http.get(url).then((res) => {
				    debugger
					if(res.data.result) {
						var data = [];
						that.datadata.create.url.preview = "/datacenter/";
						that.datadata.create.url.edit = "/datacenter/init/";
						that.datadata.create.url.share = "/datacenter/init/";
						that.datadata.create.url.delete = this.$http.defaults.baseURL + "datacenter/datas/delete/";
						that.datadata.create.url.move = "";

						that.datadata.create.data = res.data.data;
					}
				});
			},
			deleteItem(id) {
				var that = this;
				var url = this.$http.defaults.baseURL + "datacenter/datas/delete/" + id;
				that.$http.get(url).then((res) => {
					if(res.data.result) {
						this.$message({
							message: res.data.message,
							type: 'success'
						});
						this.$bus.$emit("gettreedata");
						this.init();
						this.updateListData(this.listdata.data.data, id);
						this.updateListData(this.formdata.recently.data, id);
					} else {
						this.$message.error("删除失败");
					}
				});
			},
      deleteModel(id){

        var that = this;
        var url = "datamodel/" + id + "/daletedatamodel";
        that.$http.get(url).then((res) => {
          if(res.data.result) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.$bus.$emit("gettreedata");
            this.init();
//            this.updateListData(this.listdata.data.data, id);
            this.updateListData(this.myModeldata.recently.data, id);
          } else {
            this.$message.error("删除失败");
          }
        });
      },

			designItem(id) {
            var dialogdata = {
              title: "编辑数据表",
              description: "编辑我的数据表"
            };
            var model = {
              name: "DBTableCreate",
              data: {
                tableid: id,
                type: "update"
              }
            };
              this.$bus.$emit('init_mwdialog', dialogdata, model);
              this.$bus.$emit('initDBTableCreate', model.data.tableid);

            //this.$emit("designItem", id);
			},
      designModel(id){

        var dialogdata = {
          title: "编辑数据模型",
          description: "编辑我的数据模型"
      };
        var model = {
          name: "DBModelCreate",
          data: {
            tableid: id,
            type: "update"
          }
        };
        this.$bus.$emit('init_mwdialog', dialogdata, model);
        this.$bus.$emit('initDBModelCreate', model.data.tableid);

      },
			addItem() {
				var dialogdata = {
					title: "创建数据表",
					description: "创建我自己的数据表"
				};
				var model = {
					name: "DBTableCreate",
					data: {
						tableid: null,
						type: "add"
					}
				};
				this.$bus.$emit('init_mwdialog', dialogdata, model);
			},
			addModelItem() {
				var dialogdata = {
					title: "创建数据模型",
					description: "创建我自己的数据模型"
				};
				var model = {
					name: "DBModelCreate",
					data: {
						tableid: null,
						type: "add"
					}
				};
				this.$bus.$emit('init_mwdialog', dialogdata, model);
			},
			backToDataList(evt) {
				document.getElementById("data_content2").style.display = "none";
				document.getElementById("data_content1").style.display = "block";
			},
			gotab(tabname) {
				this.activeName = tabname;
			},

			init() {
				//that.$bus.$emit("gettreedata");
				var that = this;
				var url = this.$http.defaults.baseURL + "datacenter/datas/inits";
				that.$http.get(url).then((res) => {
					if(res.data.result) {

						that.datadata.create.data = res.data.data.Modify;
						that.datadata.recently.data = res.data.data.Modify;
						that.datadata.common.data = res.data.data.Management;
						that.datadata.exchange.data = res.data.data.OtherShare;

					}
				});
				var modelUrl="datamodel";
        that.$http.get(modelUrl).then((res) => {
          if(res.data.result) {

            that.myModeldata.recently.data = res.data.data;
          }
        });
			},

		},
		created() {

		},
		mounted() {
			//this.addModelItem();

			this.init();
      var tabHeader=document.getElementsByClassName("el-tabs__header");
      tabHeader[0].style.display="none";
      var tabLine=document.getElementsByClassName("el-tabs__active-bar");
      tabLine[5].style.backgroundColor="transparent";
      tabLine[3].style.backgroundColor="transparent";
      var tabHeaderBg=document.getElementsByClassName("el-tabs__header");
      tabHeaderBg[1].style.paddingTop="15px";
      tabHeaderBg[1].style.backgroundColor="#fff";

		}
	}

</script>

<style>
	#data-index {
		height: 100%;
		padding-left: 260px;
	}

	.data_content {
		height: 100%;
		margin-left: 1px;
	}

	.dc_title {
		height: 55px;
		box-shadow: 0 0 5px rgba(0, 0, 0, .1);
		background: #fff;
		position: relative;
		z-index: 10;
		border-bottom: 1px solid #eee;
		line-height: 55px;
	}

	.dc_title h3 {
		font-size: 16px;
		float: left;
		line-height: 55px;
		padding-left: 20px;
		color: #333;
		margin: 0;
	}

	.dc_tabs {
		/*padding: 20px 0 0 0;*/
		/*margin: 0 35px;*/
    /*padding-left:35px;*/
    background:#eee;
    height:100%;
	}
  .dc_tab{
    height:100%;
  }
	.data_content .el-tabs__active-bar {}

	.data_content .el-tabs__item {
		/*background: #eee;*/
	}
.el-tabs__content{

  /*overflow-y: auto !important;*/

}
	.data_content .el-tabs__item.is-active {
		color: #009688;
		/*background: #232c32 !important;*/
	}
	/*.data_content .el-tabs__content {
		margin-top: 30px;
	}*/

	.data_content1 {
    background-color: #eee !important;
  }

	.data_content2 {
		display: none ;
	}
  #data_content1{
    display:block !important;
    overflow-y:hidden;
  }
  #data_content2{
    display: none !important;
  }

	.dct1_title {
		font-size: 14px;
		line-height: 30px;
		padding: 0 20px;
		font-weight: bold;
		width: 100%;
		float: left;
		color: #758697;
	}

	.dc_content {
		margin-top: 20px;
	}

	.dc_createdata {
		text-align: center;
		/*margin-top: 40px;*/
    height:100%;
    margin-top:20px;
    padding-right:20px;
    border-radius: 5px;
	}

	.dc_createdata .el-tabs__item {
		background: #eee;
	}
  .el-tabs__content{
    height:100% !important;
  }
	.dc_createdata .el-tabs__content {
		border-top: 1px solid #d1dbe5;
		margin-top: 20px;
	}

	.dc_createdata .el-tabs__item.is-active {
		color: #009688;
		background: #eee !important;
	}

	.dc_createdata .el-tabs__header {
		border-bottom: 0px;
	}

	.dc_commondata {
		text-align: center;
		margin-top: 20px;
	}

	.dc_commondata .el-tabs__item {
		background: #eee;
	}
  .el-tabs__content{
    height:100% !important;
  }
	.dc_commondata .el-tabs__content {
		border-top: 1px solid #d1dbe5;
		margin-top: 0px;
	}

	.dc_commondata .el-tabs__item.is-active {
		color: #009688;
		background: #eee !important;
	}

	.dc_commondata .el-tabs__header {
		border-bottom: 0px;
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
  .el-tabs__active-bar{
    background-color: #009688;
  }
  /*.el-tabs__content{*/
    /*background-color: #eee;*/
  /*}*/
  .tabsTwo{
    /*margin-top: 20px;*/
    /*margin-left: 20px;*/
    height: 100%;
  }
  .el-tabs{
    height: 100%;
  }
  .el-tab-pane{
    height:100%;
  }
  /*.el-tabs__header{*/
    /*width: 0;*/
    /*height: 0;*/
    /*display: none;*/
  /*}*/
  .dc_tabs>div{
    overflow-y: auto !important;
  }
  .updata{
    padding-left:20px;
  }



</style>
