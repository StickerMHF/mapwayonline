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
        <div class="fct1_title">表单列表</div>
				<DataShowModel :child-data="listdata.data" :show-list="true" @lookShare="lookform" @goShare="shareItem" @deleteItem="deleteItem" @previewItem="previewItem" @editItem="editItem"></DataShowModel>
			</div>
		</div>
		<div id="form_content1" class="form_content form_content1">


					<DataShowModel :child-data="defaultAddData.data" @addItem="addItem"></DataShowModel>
					<div class="fct1_title">表单列表</div>
					<DataShowModel :child-data="formdata.recently" @lookShare="lookform" @goShare="shareItem" @deleteItem="deleteItem" @previewItem="previewItem" @editItem="editItem"></DataShowModel>



		</div>

			<!--选择表单类型部分-->
    <transition name='el-zoom-in-center'>

	  			 <div class="model-bg" v-show="chooseForm">
	  			 		<div class="model-box">

                  <div class="model-header">
                    <h3>选择表单</h3>
                    <span class="close-model" @click="closemodel">X</span>
                  </div>

                  <div class="model-content">
                    <ul class="model-content-top">
                      <li class=" form-type app-form" :class="actived ? 'item-actived':''" @click="choose('app')">
                        应用表单
                      </li>
                      <li class="form-type show-form" :class="actived ? '':'item-actived'" @click="choose('show')">
                        展示表单
                      </li>
                    </ul>
                    <div class="model-content-bottom">
                      <!---->
                      <div class="list-item formname">
                        <span  class="item-label">表单名称</span>
                        <el-input size="small" v-model="formName"></el-input>
                      </div>
                      <div class="list-item formdescription">
                        <span  class="item-label">表单描述</span>
                        <el-input size="small" v-model="formDescription"></el-input>
                      </div>
                      <!--表单标签-->
                      <div class="list-item formlabel">
                        <span  class="item-label">标签</span>
                        <div class="marks" >
                          <el-tag
                            :key="tag"
                            :type="'primary'"
                            v-for="tag in marks"
                            :closable="true"
                            :close-transition="false"
                            @close="handleClose(tag)"
                          >
                            {{tag}}
                          </el-tag>
                          <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="mini"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                          >
                          </el-input>
                          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                        </div>
                      </div>
                      <!--分类文件夹-->
                      <div class="list-item formdir">
                        <span class="item-label">分类</span>
                        <el-cascader
                          :options="options"
                          size="small"
                          :props = "{'value':'id','label':'name','children':'children'}"
                          change-on-select
                          :show-all-levels="false"
                          v-model="formfolder"
                        >
                        </el-cascader>
                      </div>
                    </div>


                  </div>

                  <div class="model-footer">
                    <el-button @click="createForm">创建</el-button>
                    <el-button @click="closemodel">取消</el-button>
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
        actived:true,
        options:[],
        formfolder:['999'],
        marks:["表单"],
        inputVisible: false,
        inputValue: '',
				chooseForm:false,
        chooseType:'app',
        formName:'',
        formDescription:'',
				formPath: '/formDesign/init/',
				title: "未命名文件夹",
				type: 15,
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
							delete: "formdesign/forms/delete/",
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
        '_cleanUp'
      ]),
     lookform(uuid){

        this.$router.replace({name: 'shareform', params: {uuid}});
      },
      shareItem(odata){
        let url = "form/share",
          data ={
            formid:odata.id,
            issecret:odata.issecret,
            code:odata.code
          },
          prams = encodeURI("data="+JSON.stringify(data));
        console.log(prams);

        this.$http.post(url,prams)
          .then((res) => {
            let uuid = res.data.data.uuid;
            console.log('分享成功',uuid);

            this.$confirm('分享成功！', '提示', {
              confirmButtonText: '去看看',
              cancelButtonText: '知道了',
              type: 'success'
            }).then(() => {
              this.$router.replace({name: 'shareform', params: {uuid}});
            }).catch(() => {

            });


          }).catch((error) => {
          console.log("出错了",error);
        });
      },
      getTreedata(){ //获取用户的目录信息
        let that = this;
        let url = 'formdesign/folder';
        that.$http.get(url).then((r) => {
          console.log(r);
          this.options = JSON.parse(r.data.treedata[0].subitem);
          console.log(this.options);

        });



      },
      handleClose(tag) {
        this.marks.splice(this.marks.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.marks.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      createForm(){

        // 设置表名和描述
        if(this.formName === ''|| this.formDescription === ''){
          this.$confirm('你还没有添加表名或描述, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            let omark = this.marks.join(','),
                ofolder = this.formfolder.pop() || '999';
            console.log(omark,ofolder);
            this._setCanvas({attr:'formname',value:this.formName});
            this._setCanvas({attr:'description',value:this.formDescription});
            this._setCanvas({attr:'mark',value:omark });
            this._setCanvas({attr:'folder',value:ofolder });
            // 创建表单
            this.$router.replace({name: 'formdesigninit', params: {id:"new",type:this.chooseType}});
          }).catch(() => {

          });
        }else{
          let omark = this.marks.join(','),
            ofolder = this.formfolder.pop();
          this._setCanvas({attr:'formname',value:this.formName});
          this._setCanvas({attr:'description',value:this.formDescription});
          this._setCanvas({attr:'mark',value:omark});
          this._setCanvas({attr:'folder',value:ofolder});
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
				if(data.id === "999") {
          let url = this.$http.defaults.baseURL + 'formdesign/forms';
					this.getFormByUrl(url, 28);
				} else {
          let url = this.$http.defaults.baseURL + 'formdesign/forms/folder/' + data.id;
					this.getFormByUrl(url, 28);
				}

			},
			getFormByCondition(type, name) {
				this.listdata.title = name;
				document.getElementById("form_content1").style.display = "none";
				document.getElementById("form_content2").style.display = "block";
				if(type === 0) { //我的表单
          let url = 'formdesign/forms';
					this.getFormByUrl(url, 28);
				} else if(type === 1) { //已购买的表单
          let url = 'formdesign/forms';
					this.getFormByUrl(url, 29);
				} else if(type === 2) { //已分享的表单
          let url = 'formdesign/forms/share';
					this.getFormByUrl(url, 28);
				}

			},
			getFormByUrl(url, type) {
        let that = this;
				that.$http.get(url).then((res) => {
					if(res.data.result) {
            let data = [];
						/*for(var item in res.data.data) {
							data.push(res.data.data[item]);
						}*/
						switch(type) {
							case 28:
								that.listdata.data.url.preview = "/formpreview/";
								that.listdata.data.url.edit = "/formDesign/init/";
								that.listdata.data.url.share = "/formDesign/init/";
								that.listdata.data.url.delete =  "formdesign/forms/delete/";
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
        let that = this;
        let url = "formdesign/forms/delete/" + id;
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
        this._cleanUp();
        this.getTreedata(); // 获取用户表单的目录结构
			},
      closemodel(){
        this.chooseForm = false;
        this.marks = ['表单'];
        this.formfolder = [];
        this.actived = true;
      },
			choose(type){ // 新建表单时，需要选择的部分内容
			  this.chooseType = type;
        this._cleanUp(); //清空数据
        if(this.chooseType === 'app'){
          this._setCanvas({attr:'isinputform',value:true});
          this.actived = true;
        }else{
          this._setCanvas({attr:'isinputform',value:false});
          this.actived = false;
        }


			},
			previewItem(item) {
				let id = item.id;
				console.log(item);
				if(item.isinputform){
					this.$router.replace({name: 'appformpreview', params: {id}});
				}else{
					this.$router.replace({name:'showformpreview',params:{id,detail:'new'}});
				}

			},
			editItem(id) {
				this.$router.replace({name: 'formdesigninit', params: {id,hasEdit:true}});
			},
			updateListData(list, id) {
				let data = [];
				for(let item in list) {
					if(list[item].id !== id) {
						data.push(list[item]);
					}
				}
				list = data;
			},
			init() {
				//that.$bus.$emit("gettreedata");
        let that = this;
        let url = this.$http.defaults.baseURL + "formdesign/forms/inits";
				that.$http.get(url).then((res) => {
					if(res.data !== null) {
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
//      let that=this;
			this.init();
//			this.$Tools.html2images(document.getElementById("app"), function(canvas) {
//        let imageData = canvas.toDataURL(1);
//				that.$Tools.dealImage(imageData,function(base){
//					 //console.log("压缩后：" + base.length / 1024 + " " + base);　
//				});
//
//			});
		}
	}
</script>

<style lang="less" scoped>
	@icon-base : '../../assets/formDesign/icon/';
  .button-new-tag{
    max-width: 100px;
  }
  .input-new-tag{
    max-width: 100px;
  }
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
		width: 560px;
		height: 650px;
		margin-left: -280px;
		top: 120px;
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

      .el-input__inner{
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      }
      .el-input__inner:focus{
        outline-color:#00958F!important;
        border-color: #00958F !important;
      }
			.model-content-top{
        margin: 0 auto;
				width: 70%;
        height: 200px;
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
        overflow: hidden;
				.form-type{
          position: relative;
					cursor: pointer;
					height: 160px;
					width: 160px;
					border: 1px solid #E5E9ED;
					padding-top: 100px;
					box-sizing: border-box;
					line-height: 50px;
					font-size: 14px;
					background-position: center 15px;
					background-repeat:no-repeat;
					background-size: 70px 85px;
				}
        .item-actived{
          color: #66ccff;
          border-color: #66ccff;
          box-shadow: 0 6px 6px rgba(0, 0, 0, .175);
        }
        .item-actived::after{
          content: '';
          height: 50px ;
          width: 60px;
          position: absolute;
          bottom: 0;
          right: 0;
          background-image:url('@{icon-base}icon_14.png');
          background-position: right bottom;
          background-repeat: no-repeat;
          background-size: 60px 50px;
        }
				.app-form{
					background-image: url('@{icon-base}icon_13.png');
					&:hover{
						color: #66CCFF;
						box-shadow: 0 6px 6px rgba(0, 0, 0, .175);
					}
				}
				.show-form{
					background-image: url('@{icon-base}icon_12.png');
					&:hover{

						color: #66CCFF;
						box-shadow: 0 6px 6px rgba(0, 0, 0, .175);
					}
				}
			}
      .model-content-bottom{
        margin: 0 auto;
        width: 70%;
        text-align: left;
        .list-item{
            width: 100%;

          .item-label{
            display: block;
            padding: 5px 2px 5px 10px;
            /*margin: 5px 0 ;*/
            /*border-left: 3px solid #00958F;*/
          }
        }
        .formname{

        }
        .formdir{
          .el-cascader--small{
            width: 100%;
          }
        }
        .formlabel{
            .el-button{
              padding:  0 5px;
              height: 24px;
              box-sizing: border-box;
            }
            .marks{
              width: 100%;
              height: 35px;
              text-align: center;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              padding: 3px;
              /*border-bottom: 1px solid #e6e6e6;*/
              /*border-radius: 4px;*/
              box-sizing: border-box;
            }
        }
        .formdescription{

        }


      }
		}
    .model-footer{
        position: absolute;
        bottom: 50px;
        width: 100%;
        left: 0;
      button{
        padding: 10px 35px;
      }
      button:nth-child(1){
        color: white;
        background-color: #00958F ;
      }
      button:nth-child(2){
        margin-left: 50px;
        background-color: #F8F8F8;
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
.el-tag{
  margin-right: 5px;
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
		padding: 15px 0 0 0;
		/*margin: 0 35px;*/
	}

	.form_content .el-tabs__active-bar {

  }

	.form_content .el-tabs__item {
		background: #eee;
	}

	.form_content .el-tabs__item.is-active {
		/*color: #fbfdff;*/
		/*background: #232c32 !important;*/
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
