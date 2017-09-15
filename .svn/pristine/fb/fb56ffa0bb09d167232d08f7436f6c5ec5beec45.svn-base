<template>

	<div id="form-index">
		<ContentLeft @getByTree="getByTreepid" @backToFormList="backToFormList" @getFormByCondition="getFormByCondition"></ContentLeft>

		<div id="form_content2" class="form_content form_content2">
			<div class="fc_title">
				<h3>{{title}}</h3>
			</div>
			<div class="fc_content" style="height: 230px;;">
				<DataShowModel :child-data="defaultAddData.data" @addItem="addItem"></DataShowModel>
			</div>
			<div class="fc_content">
				<DataShowModel :child-data="listdata.data" :show-list="true" @deleteItem="deleteItem" @previewItem="previewItem" @editItem="editItem"></DataShowModel>
			</div>
		</div>
		<div id="form_content1" class="form_content form_content1">
			<el-tabs class="fc_tabs" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class="fc_tab" label="新建表单" name="first">
					<DataShowModel :child-data="defaultAddData.data" @addItem="addItem"></DataShowModel>
					<div class="fct1_title">从共享中心新建表单</div>
					<DataShowModel :child-data="formdata.recentlyshare"></DataShowModel>
				</el-tab-pane>
				<el-tab-pane label="最近编辑" name="second">
					<!--<DataShowModel :child-data="formdata.recently" :show-list="true" @deleteItem="deleteItem"></DataShowModel>-->
				</el-tab-pane>
				<el-tab-pane label="共享中心" name="third">
					<!--<DataShowModel :child-data="formdata.exchange" :show-list="true"></DataShowModel>-->
				</el-tab-pane>
			</el-tabs>
		</div>

			<!--选择表单类型部分-->
    <transition name='el-zoom-in-center'>
	  		<div class="tip" v-show="chooseForm">
	  			 <div class="model-bg">
	  			 		<div class="model-box">
                <div class="model-1" v-show="step_1" style="width: 100%;height: 100%;">
                  <div class="model-header">
                    <h3>请选择您需要创建的表单类型</h3>
                    <span class="close-model" @click="chooseForm = false">X</span>
                  </div>
                  <div class="model-content">
                    <ul>
                      <li class="form-type app-form" @click="choose('app')">
                        应用表单
                      </li>
                      <li class="form-type show-form" @click="choose('show')">
                        展示表单
                      </li>
                    </ul>
                  </div>
                  <div class="model-footer">

                  </div>
                </div>
                <div class="model-2" v-show="!step_1" style="height: 100%;width: 100%;">
                  <div class="model-header">
                    <h3>请输入您创建的表单信息</h3>
                    <span class="close-model" @click="chooseForm = false">X</span>
                  </div>
                  <div class="model-content">
                      <!---->
                      <div class="formname">
                          <span>请为您创建的表单输入名字</span>
                          <el-input size="small" v-model="formName"></el-input>
                      </div>
                    <div class="formdescription">
                      <span>请为您创建的表单添加描述</span>
                      <el-input size="small" v-model="formDescription"></el-input>
                    </div>


                  </div>
                  <div class="model-footer">
                    <el-button @click="step_1 = true">上一步</el-button>
                    <el-button @click="createForm">下一步</el-button>
                  </div>
                </div>




	  			 		</div>
	  			 </div>



	  		</div>
      </transition>

	</div>
</template>

<script>
	import ContentLeft from './ContentLeft.vue';
	import DataShowModel from '../common/DataShowModel.vue';
  import {mapGetters, mapActions} from 'vuex'
	export default {
		name: 'form-index',
		components: {
			ContentLeft,
			DataShowModel
		},
		data() {
			return {
        step_1:true,
				chooseForm:false,
        chooseType:'app',
        formName:'',
        formDescription:'',
				formPath: '/formDesign/init/',
				title: "未命名文件夹",
				type: 15,
				activeName: 'first',
				defaultAddData: {
					data: {
						data: [{
							formid: 1,
							name: "空白表单",
							type: 27,
							img: "/static/Index/img/newform.png",
							url: "/formDesign/init/new",
							usable: true,
							price: 0,
							author: "管理员",
							createdate: "2017-08-08"
						}, {
							formid: 1,
							name: "从已有表单创建",
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
							preview: "/formDesign/init",
							edit: "/formDesign/init",
							share: "/formDesign/init",
							delete: this.$http.defaults.baseURL + "TBUSER000001/formdesign/forms/delete/",
							move: ""
						},
						data: []
					}
				},
				formdata: {
					recently: {
						url: {
							preview: "/formDesign/init/",
							edit: "/formDesign/init/",
							share: "/formDesign/init/",
							move: ""
						},
						data: []
					},
					recentlyshare: {
						url: {
							preview: "/formDesign/init/",
							edit: "/formDesign/init/",
							share: "/formDesign/init/",
							move: ""
						},
						data: []
					},
					exchange: {
						url: {
							preview: "/formDesign/init/",
							edit: "/formDesign/init/",
							share: "/formDesign/init/",
							delete: "",
							move: ""
						},
						data: []
					}
				}

			}
		},
		methods: {
      ...mapActions([
        '_setCanvas',
      ]),
      createForm(){
        // 设置表名和描述
        if(this.formName === ''|| this.formDescription === ''){
          this.$confirm('你还没有添加表名或描述, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._setCanvas({attr:'formname',value:this.formName});
            this._setCanvas({attr:'description',value:this.formDescription});

            // 创建表单
            this.$router.replace({name: 'formdesigninit', params: {id:"new",type:this.chooseType}});
          }).catch(() => {

          });
        }else{
          this._setCanvas({attr:'formname',value:this.formName});
          this._setCanvas({attr:'description',value:this.formDescription});

          // 创建表单
          this.$router.replace({name: 'formdesigninit', params: {id:"new",type:this.chooseType}});
        }

      },
			editForm(oid) {
				this.$router.push(this.formPath + oid);
				console.log(this.formPath + oid);

			},
			handleClick(tab, event) {
				console.log(tab, event);
			},

			getByTreepid(node, store, data, childids) {
				document.getElementById("form_content1").style.display = "none";
				document.getElementById("form_content2").style.display = "block";
				this.listdata.title = data.name;
				if(data.id == "999") {
					var url = this.$http.defaults.baseURL + 'TBUSER000001/formdesign/forms';
					this.getFormByUrl(url, 28);
				} else {
					var url = this.$http.defaults.baseURL + 'TBUSER000001/formdesign/forms/folder/' + data.id;
					this.getFormByUrl(url, 28);
				}
				this.getFormByUrl(url, 28);
			},
			getFormByCondition(type, name) {
				this.listdata.title = name;
				document.getElementById("form_content1").style.display = "none";
				document.getElementById("form_content2").style.display = "block";
				if(type == 0) { //我的表单
					var url = this.$http.defaults.baseURL + 'TBUSER000001/formdesign/forms';
					this.getFormByUrl(url, 28);
				} else if(type == 1) { //已购买的表单
					var url = this.$http.defaults.baseURL + 'TBUSER000001/formdesign/forms';
					this.getFormByUrl(url, 29);
				} else if(type == 2) { //已分享的表单
					var url = this.$http.defaults.baseURL + 'TBUSER000001/formdesign/forms/share';
					this.getFormByUrl(url, 28);
				}

			},
			getFormByUrl(url, type) {
				var that = this;
				that.$http.get(url).then((res) => {
					if(res.data.result) {
						var data = [];
						/*for(var item in res.data.data) {
							data.push(res.data.data[item]);
						}*/
						switch(type) {
							case 28:
								that.listdata.data.url.preview = "/formpreview/";
								that.listdata.data.url.edit = "/formDesign/init/";
								that.listdata.data.url.share = "/formDesign/init/";
								that.listdata.data.url.delete = this.$http.defaults.baseURL + "TBUSER000001/formdesign/forms/delete/";
								that.listdata.data.url.move = "";
								break;
							case 29:
								break;
							default:

								break;
						}
						that.listdata.data.data = res.data.data;
					}
				});
			},
			backToFormList(evt) {
				document.getElementById("form_content2").style.display = "none";
				document.getElementById("form_content1").style.display = "block";
			},
			deleteItem(id) {
				var that = this;
				var url = this.$http.defaults.baseURL + "TBUSER000001/formdesign/forms/delete/" + id;
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
			addItem(){
				this.chooseForm = true;
				this.step_1 = true;
			},
			choose(type){
			  this.chooseType = type;
        this.step_1 = false;
			},
			previewItem(item) {
				let id = item.id;
				if(item.isinputform){
					this.$router.replace({name: 'appformpreview', params: {id,onlypre:true}});
				}else{
					this.$router.replace({name:'showformpreview',params:{id,detail:'new',onlypre:true}});
				}

			},
			editItem(id) {
				this.$router.replace({name: 'formdesigninit', params: {id,hasEdit:true}});
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
				//that.$bus.$emit("gettreedata");
				var that = this;
				var url = this.$http.defaults.baseURL + "TBUSER000001/formdesign/forms/inits";
				that.$http.get(url).then((res) => {
					if(res.data != null) {

						that.formdata.recently.data = res.data.data.Modify;
						that.formdata.recentlyshare.data = res.data.data.RecentlyShare;
						that.formdata.exchange.data = res.data.data.OtherShare;

					}
				});
			}
		},
		created() {

		},
		mounted() {
			var that=this;
			this.init();
			var ss = this.$Tools.compileStr("TBUSER000001")
			this.$Tools.html2images(document.getElementById("app"), function(canvas) {
				var imageData = canvas.toDataURL(1);
				that.$Tools.dealImage(imageData,function(base){
					 //console.log("压缩后：" + base.length / 1024 + " " + base);　
				});

			});
		}
	}
</script>

<style lang="less" scoped>
	@icon-base : '../../assets/formDesign/img/';
	.model-bg{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.7);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1999;
	text-align: center;
	.model-box{
		color: #333333;
		position: absolute;
		width: 600px;
		height: 420px;
		margin-left: -300px;
		top: 200px;
		left: 50%;
		background-color: #FFF;
		border-radius: 6px;
		.model-header{
			height: 30px;
			position: relative;
			border-bottom: 1px solid #E5E9ED;
			.close-model{
				display: inline-block;
				height: 16px;
				width: 16px;
				line-height: 16px;
				top:5px;
				right: 25px;
				position: absolute;
				cursor:pointer;
				&:hover{
					color: #66CCFF;
					background-color: #EEEEEE;
				}
			}
		}
		.model-content{
			padding-top: 30px;
      .formname,.formdescription{
        width: 50%;
        margin: 0 auto;
        padding-top: 20px;
        span{
          line-height: 30px;
          padding-bottom: 10px;
        }

      }
			ul{
				width: 100%;
				height: 100%;
				position: relative;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.form-type{
					cursor: pointer;
					height: 250px;
					width: 180px;
					border: 1px solid #E5E9ED;
					padding-top: 180px;
					box-sizing: border-box;
					line-height: 60px;
					font-size: 16px;
					background-position: center 20px;
					background-repeat:no-repeat;
					background-size: 120px 120px;

				}
				.app-form{
					background-image: url('@{icon-base}appform.png');
					&:hover{
						background-image: url('@{icon-base}appform-hover.png');
						color: #66CCFF;
						box-shadow: 0 6px 6px rgba(0, 0, 0, .175);
					}
				}
				.show-form{
					background-image: url('@{icon-base}showform.png');
					&:hover{
						background-image: url('@{icon-base}showform-hover.png');
						color: #66CCFF;
						box-shadow: 0 6px 6px rgba(0, 0, 0, .175);
					}
				}
			}
		}

	}
}
	#form-index {
		height: 100%;
		padding-left: 260px;
	}

	.form_content {
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

	.form_content .el-tabs__active-bar {}

	.form_content .el-tabs__item {
		background: #eee;
	}

	.form_content .el-tabs__item.is-active {
		color: #fbfdff;
		background: #232c32 !important;
	}

	.form_content1 {}

	.form_content2 {
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
	}
</style>
