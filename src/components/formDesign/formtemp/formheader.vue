<template>
	<div id="formheader">
		
		<ul class="form-list">
			<li class="form-item">+</li>
			<li class="form-item">1</li>
			<li class="form-item">2</li>
			<li class="form-item">3</li>
			<li class="form-item">4</li>
		</ul>
		
	
		<div class="header-tool" >
			<el-button :plain="true" type="success" @click = "previewForm">预览</el-button>
			<el-button :plain="true" type="success" @click = "saveForm">保存</el-button>
			<el-button :plain="true" type="success">发布</el-button>
			<el-button :plain="true" type="success">分享</el-button>
		
		</div>
		
		
		
	</div>
</template>

<script>
	
	import {mapGetters, mapActions } from 'vuex'
	
	export default {
		name:'formheader',
		components:{},
		data(){
			return {
				
				
				
			}
		},
		computed: {
			...mapGetters([
				'getForm'
			])
		},
		methods:{
			previewForm(){
				// 预览数据	
				this.$router.replace({name: 'formpreview', params: {id:'new'}});
			},
			saveForm(){
				// 保存数据 
				
				// 过滤一部分数据  比如：一些字段不为空之类的
				let prams = 'data='+JSON.stringify(this.getForm);      
		      	this.$http.post( 'TBUSER000002/formdesign/form/add',prams)
		      	.then(
		      		(res) => {
		      			console.log(res);
		      			if(res.data.result == true){
		      				// 上传成功
		      				// 跳转到。。。。
		      				this.$notify.success({
					          title: '成功！',
					          message: '提交数据成功！！！',
					          offset: 300
					        });
		      				
		      			}else{
		      				this.$notify.error({
					          title: '请求失败！',
					          message: '请求失败！ 请填写正确的地址格式或者检查您的地址是否正确！！！',
					          offset: 300
					        });
		      			}
		      			
		      		}     		
		      	).catch((error) => {
		      		console.log(error);	
		      	});
		      	
				
				
			}
		},
		created(){
			
		},
		mounted(){
			
		}
	}
</script>

<style lang="less" scoped>
#formheader{
	text-align: left;
	ul,li{
		list-style: none;
		text-decoration: none;
		margin: 0;
		padding: 0;
	}
	.form-list{
		height:100px;
		width: 800px;
		background-color: #F0F8FF;
		text-align: left;
		vertical-align: middle;
		padding-left: 20px;
		display: inline-block;
		
		.form-item{
			display: inline-block;
			margin-top:1px;
			margin-left: 5px;
			height: 98px;
			width: 98px;
			box-sizing: border-box;
			border: 1px solid #BBBBBB;
			text-align: center;
		
		}
			
	}
	.header-tool{
		display: inline-block;
		margin-left: 150px;
		
		
		
	}
	
	
}

</style>