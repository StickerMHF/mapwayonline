<template>
	<div id="showformpreview">
		 <!--展示表单-->
			<div class="nav" v-if="onlypre">
        <el-button :plain="true" type="success" @click="goEdit">编辑 </el-button>
        <el-button :plain="true" type="success" @click = "isSave = true">保存</el-button>
        <!--<el-button :plain="true" type="success" >发布</el-button>-->
        <!--<el-button :plain="true" type="success" >分享</el-button>-->

      </div>
    <div id="get_showimg" style="display: inline-block;">
      <my-show-form ref="showform" :selected = 'false' v-if="hasformdata" :formdata = "formdata" :showdata="detail"></my-show-form>
    </div>

		<!--提示保存模态框-->
		<transition name='el-zoom-in-center'>
			<div class="model-box" v-show ='isSave' >
				<div class="save-set">
					<div class="model-header">
						<span>保存数据 </span>
						<el-button @click="isSave = false" type="text"> × </el-button>
					</div>
					<div class="model-content">
						<div v-if="hasNull">还有字段未绑定数据。。。balabala</div>

						<p>确定要保存吗？</p>

					</div>
					<div class="model-footer">
						<el-button type="success" @click="saveForm">确定</el-button>
						<el-button @click="isSave = false" >取消</el-button>
					</div>
				</div>



			</div>
		</transition>




	</div>
</template>

<script>
	import {mapGetters, mapActions } from 'vuex'
  import myShowForm from '@/components/formDesign/preview/temp/myshowform.vue'
	export default {
    name: 'showformpreview',
    components: {
      "myShowForm": myShowForm
    },
    computed: {
      ...mapGetters([
        'getForm'
      ])
    },
    data() {
      return {
        hasformdata:false,
        isSave: false, // 保存数据模态框显示/隐藏
        hasNull: true, // 过滤保存的数据时的提醒
        onlypre:false,
        oneForm: {},
        oid: 'new',
        detail: 'new',
        formdata: {}
      }
    },
    methods: {
      ...mapActions([
        '_setCanvas',
        '_setCurrent'
      ]),
      goEdit() {
        this._setCurrent({attr: 'isSaveInPreview', value: false});
        this._setCurrent({attr: 'hasData', value: true});
        this.$router.replace({name: 'formdesigninit', params: {id: this.oid, hasEdit: true}});
      },

      getFormInfo() { // 获取具体的某一个表单样式
        let that = this;

        let url = 'formdesign/forms/' + this.oid;
        this.$http.get(url).then((res) => {
//			   console.log('oneform',res);
          let odata = res.data.data;
          let widgetList = JSON.parse(odata.formcontent);
          delete odata.formcontent;
          odata.style = JSON.parse(odata.style);
          let data = {widgetList: widgetList, formConfig: odata};
          that.oneForm = data;
          that.formdata = data;
          that.hasformdata = true;

        }).catch((err) => {
          console.log(err)
        });


      },
      cloneObj(obj) {  // 深拷贝
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
          return;
        } else if (window.JSON) {
          str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
        } else {
          for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ?
              this.cloneObj(obj[i]) : obj[i];
          }
        }
        return newobj;
      },
      getThumbnail() {
        var that = this;
        that.$nextTick(function () {
          let box = document.getElementById('get_showimg');

          that.$Tools.html2images(box, function (canvas) {
            var imageData = canvas.toDataURL();
            that.$Tools.dealImage(imageData, function (base) { // 压缩
              that._setCanvas({attr: 'img', value: base}); // 存储到state中
//              console.log(base)
            });

          });

        })

      },
      fifterForm(obj) {
        // 过滤数据，一些字段不能为空

//				return false;
        return true;

      },
      saveForm() {

        var that = this;
        that.isSave = false;
        let addUrl = 'formdesign/forms/add', // 添加的接口
          updateUrl = 'formdesign/forms/update/'; // 更新的接口
        // 保存数据
        // console.log({widgetList:that.getForm.widgetList,formConfig:that.getForm.formConfig});
        if (this.fifterForm(this.getForm)) {

          // 过滤一部分数据  比如：一些字段不为空之类的
          let odata = {
            widgetList: that.getForm.widgetList,
            formConfig: that.getForm.formConfig
          }
          let prams = 'data=' + JSON.stringify(odata);
          console.log("保存数据",prams);

          prams = encodeURI(prams);
//					console.log(prams)
          // 判断是否是二次编辑 ，如果是二次编辑，需要调用更新的接口
          if (that.oid === 'new') {
            that.$http.post(addUrl, prams)
              .then(
                (res) => {
                  console.log(res.data.message);
                  if (res.data.result === true) {
                    // 上传成功
                    this.$router.replace({name:'formDesign'});
                    // 跳转到。。。。
                    that.$notify.success({
                      title: '提交成功！',
                      message: '提交成功！！！',
                      offset: 100
                    });

                  } else {
                    that.$notify.error({
                      title: '保存失败！',
                      message: '保存失败！！！ ',
                      offset: 100
                    });
                  }

                }
              ).catch((error) => {
              console.log("出错了", error);
            });

          } else {

            that.$http.post(updateUrl + that.oid, prams)
              .then(
                (res) => {
                  console.log(res.data.message);
                  if (res.data.result === true) {
                    // 上传成功
                    // 跳转到。。。。
                    that.$notify.success({
                      title: '修改成功！',
                      message: '提交成功！！！',
                      offset: 100
                    });

                  } else {
                    console.log(res.data.message);
                    that.$notify.error({
                      title: '修改失败！',
                      message: '修改失败！！！ ',
                      offset: 100
                    });
                  }

                }
              ).catch((error) => {
              console.log(error);
            });
          }
        } else {
          that.$notify.error({
            title: '请求失败！',
            message: '请求失败！存在控件未绑定数据或者值错误！！！',
            offset: 100
          });
        }



      },
    },
      created() {
        this.oid = this.$route.params.id;
        this.detail = this.$route.params.detail;
        this.onlypre = this.$route.params.onlypre;

//			console.log('oid', this.oid,"detail",this.detail);
        // 在预览之前  清除上一次注册的事件
        this.$bus.off('add-widget');
        this.$bus.off('set-grid');
        this.getThumbnail();// 生成缩略图 并保存


        if (this.getForm.editState.isSaveInPreview) {
          this.isSave = true;
          // 需要预览 并生成缩略图保存
        }

        if (this.oid === 'new' || this.getForm.editState.hasData) {
//				console.log('new');
          this.oneForm = this.cloneObj(this.getForm); // new 说明是来自正在编辑的内容预览
          this.formdata = {
            formConfig: this.oneForm.formConfig,
            widgetList: this.oneForm.widgetList
          }
          this.hasformdata = true;
        } else if (this.oid === null || this.oid === undefined) {
          console.log('没有任何数据');
          alert('没有任何数据');
        } else {
          this.getFormInfo(); // 获取用户指定的某一条form数据
        }

      },
      mounted() {


//        console.log("*********************")
//        console.log(this.formdata,this.oneData);
      }

  }
</script>

<style scoped lang="less">
#showformpreview{
 text-align: center;
  position: relative;
	.nav{
		height: 40px;
		background-color: rgba(0,0,0,0.5);
		margin-bottom: 20px;
		padding: 5px 40px;
		text-align: right;
	}
	.form-header{
		text-align: center;
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 12px;
		margin-bottom: 12px;
	}
	.form-main {
		margin: 0 auto;
		position: relative;
		text-align: left;
	}
	.model-box{
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0,0,0,0.4);
		z-index: 999;
		.save-set{
			position: absolute;
			width: 400px;
			height: 280px;
			top: 200px;
			margin-left: -200px;
			left: 50%;
			border-radius: 5px;
			background-color: #FFFFFF;
			overflow:hidden;
			.model-header{
				height: 50px;
				padding-left: 30px;
				font-size: 16px;
				border-bottom: 1px solid #BFCBD9;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.model-content{
				height: 170px;
				overflow: hidden;
				text-align: center;
			}
			.model-footer{
				text-align: center;
				height: 50px;
				padding-bottom: 30px;
			}

		}
	}
}

</style>
