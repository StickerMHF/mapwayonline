<template>
	<div id="showformpreview">
		 <!--展示表单-->
			<div class="nav" >
			<el-button :plain="true" type="success" @click="goEdit">编辑 </el-button>
			<el-button :plain="true" type="success" @click = "isSave = true">保存</el-button>
			<!--<el-button :plain="true" type="success" >发布</el-button>-->
			<!--<el-button :plain="true" type="success" >分享</el-button>-->
			<!--<el-button @click="getThumbnail" type="success">getThumbnail</el-button>-->
		</div>
		<div class="myform " id="myform" style="text-align: center;">
			
			<div class="form-header">
				<h1></h1>
				<p></p>
			</div>
			
			<div id="get_showimg" style="display: inline-block;">		
				<div class="form-main" id="form-main" :style="formConfig.style">
					<!--解析展示表单的样子-->
					<div class="widget-item" 
						v-for="(item,index) in widgetList"
						:key = "item.tagname"
						:style="{'width':item.layout.w,'height':item.layout.h,'top':item.layout.y,'left':item.layout.x}"
						style="position: absolute;overflow: hidden;"
						>
						<label style="display: flex;height: 100%;width: 100%;">
							<span style="display: inline-block;margin-right:5px;min-width: 75px;vertical-align: middle;box-sizing: border-box;">
								{{item.label}}
							</span>
							<span
								style="display: inline-block; padding-left:10px;flex-grow: 1;height: 100%;box-sizing: border-box;"
								 :style="item.style" v-if="oneData[item.bindFiled]">
								{{oneData[item.bindFiled]}}
							</span>	
						</label>
						
					</div>
					
				</div>
			</div>
			<div class="form-footer">
				
			</div>
			
			
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
	export default {
		name:'showformpreview',
		components:{},
		computed: {
			...mapGetters([
				'getForm'
			])
		},
		data(){
			return {
				isSave:false, // 保存数据模态框显示/隐藏
				hasNull:true, // 过滤保存的数据时的提醒 
				oneForm:{},
				thumbnail:'',// base64 的缩略图 
				formConfig:{},
				widgetList:[],
				oid:'new',
				detail:'new',
				oneData:{}
	
			}
		},
		methods:{
			...mapActions([
        		'_setCanvas',
        		'_setCurrent'
        	]),
        	goEdit(){
        		this._setCurrent({attr:'isSaveInPreview',value:false});
        		this._setCurrent({attr:'hasData',value:true});
        		this.$router.replace({name: 'formdesigninit', params: {id:this.oid,hasEdit:true}});
        	},
        	getDataInfo(){ // 获取具体的某一条数据 用于展示
        		var that = this;
        		let url = "TBUSER000001/formdesign/forms/"+this.formConfig.tablename +"/byField?field="+this.formConfig.selectfiled +"&value=" + this.detail;
        		this.$http.get(url).then((res)=>{
        			if(res.data.result){
        				console.log('onedata',res);
			        	that.oneData = res.data.data;
        			}else{
        				console.log(res.data.message);
        			}			      	
			    }).catch((err)=>{
			    	console.log(err)
			    });	
			
        	},
        	getFormInfo(){ // 获取具体的某一个表单样式
						
				var that = this;
				let url = 'TBUSER000002/formdesign/forms/'+this.oid;
				this.$http.get(url).then((res)=>{
			      	console.log('oneform',res);  
			      	let odata = res.data.data;
			      	let widgetList = JSON.parse(odata.formcontent);
			      	delete odata.formcontent;
			      	odata.style = JSON.parse(odata.style);
			      	
			      	let data = {widgetList:widgetList,formConfig:odata};	
			      	that.oneForm = data;
			      	console.log('preview',data)	
			        that.restoreCanvas();
					that.restoreWidget();
					that.getDataInfo();
					
			    }).catch((err)=>{
			    	console.log(err)
			    });	
				

			},
			cloneObj(obj){  // 深拷贝
			    var str, newobj = obj.constructor === Array ? [] : {};
			    if(typeof obj !== 'object'){
			        return;
			    } else if(window.JSON){
			        str = JSON.stringify(obj), //系列化对象
			        newobj = JSON.parse(str); //还原
			    } else {
			        for(var i in obj){
			            newobj[i] = typeof obj[i] === 'object' ? 
			            this.cloneObj(obj[i]) : obj[i]; 
			        }
			    }
			    return newobj;
			},
			getThumbnail(){
				var that = this;
				that.$nextTick(function(){
					let box = document.getElementById('get_showimg');
					
					that.$Tools.html2images(box, function(canvas) {
						var imageData = canvas.toDataURL();
						that.$Tools.dealImage(imageData,function(base){ // 压缩 
							that.thumbnail = base;
							that._setCanvas({attr:'img',value:base}); // 存储到state中
						});
						
					});
					
				})
				
			},
			fifterForm(obj){
				// 过滤数据，一些字段不能为空
				
//				return false;
				return true;
				
			},
			saveForm(){
				
				var that = this;
				that.isSave = false;
				let addUrl = 'TBUSER000002/formdesign/forms/add', // 添加的接口
					updateUrl = 'TBUSER000002/formdesign/forms/update/'; // 更新的接口
				// 保存数据
				// console.log({widgetList:that.getForm.widgetList,formConfig:that.getForm.formConfig});
				if(this.fifterForm(this.getForm)){
					
					// 过滤一部分数据  比如：一些字段不为空之类的
					let prams = 'data='+JSON.stringify({
						widgetList:that.getForm.widgetList,
						formConfig:that.getForm.formConfig
					});
//					console.log(this.getForm);
//					console.log(prams);	
				
					prams = encodeURI(prams);
//					console.log(prams)
					// 判断是否是二次编辑 ，如果是二次编辑，需要调用更新的接口
					if(that.oid === 'new'){
						that.$http.post(addUrl,prams)
				      	.then(
				      		(res) => {
				      			console.log(res.data.message);
				      			if(res.data.result == true){
				      				// 上传成功
				      				// 跳转到。。。。
				      				that.$notify.success({
							          title: '提交成功！',
							          message: '提交成功！！！',
							          offset: 100
							        });
				      				
				      			}else{
				      				that.$notify.error({
							          title: '保存失败！',
							          message: '保存失败！！！ ',
							          offset: 100
							        });
				      			}
				      			
				      		}     		
				      	).catch((error) => {
				      		console.log("出错了",error);	
				      	});
			      					
					}else{
						
						that.$http.post(updateUrl + that.oid,prams)
				      	.then(
				      		(res) => {
				      			console.log(res.data.message);
				      			if(res.data.result == true){
				      				// 上传成功
				      				// 跳转到。。。。
				      				that.$notify.success({
							          title: '修改成功！',
							          message: '提交成功！！！',
							          offset: 100
							        });
				      				
				      			}else{
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
				}else{
					that.$notify.error({
			          title: '请求失败！',
			          message: '请求失败！存在控件未绑定数据或者值错误！！！',
			          offset: 100
			       });
				}			
			},
			restoreCanvas(){
				// 还原布局的画布
				this.formConfig = this.oneForm.formConfig;
			},
			restoreWidget(){
				// 还原控件
				this.widgetList = this.oneForm.widgetList;
				let wl = this.widgetList;
				for(var i=0;i<wl.length;i++){
					// 布局中添加单位px
					wl[i].layout.x = wl[i].layout.x +'px';
					wl[i].layout.y = wl[i].layout.y +'px';
					wl[i].layout.w = wl[i].layout.w +'px';
					wl[i].layout.h = wl[i].layout.h +'px';
					// option字符串 转化为对应的数组
					if(wl[i].option){
						wl[i].option = wl[i].option.split(',');
					}	
				}	
			},
		},
		created(){
				
			this.oid = this.$route.params.id;
			this.detail = this.$route.params.detail;
			console.log('oid', this.oid,"detail",this.detail);
			// 在预览之前  清除上一次注册的事件 
			this.$bus.off('add-widget');
			this.$bus.off('set-grid');
			this.getThumbnail();// 生成缩略图 并保存 
		
			
			if(this.getForm.editState.isSaveInPreview){
				this.isSave = true;
				// 需要预览 并生成缩略图保存
			}
			
			if(this.oid === 'new' || this.getForm.editState.hasData){
				console.log('new');
				this.oneForm = this.cloneObj(this.getForm); // new 说明是来自正在编辑的内容预览 
				this.restoreCanvas();
				this.restoreWidget();
			}else if(this.oid === 'none'){				
				console.log('没有任何数据'); 
				alert('没有任何数据');
				return ;
			}else{
				this.getFormInfo(); // 获取用户指定的某一条form数据
				
			}
			
			
		},
		mounted(){
			
		}
	}
</script>

<style scoped lang="less">
#showformpreview{
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
		z-index: 99999999999;
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