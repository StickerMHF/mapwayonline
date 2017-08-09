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
			<el-button :plain="true" type="success">保存</el-button>
			<el-button :plain="true" type="success">发布</el-button>
			<el-button :plain="true" type="success">分享</el-button>
		
		</div>
		
		
		
	</div>
</template>

<script>
	import _Bus_ from './formcontral.js';  
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