<template>
	<div id="formside">
		
		<h3 style="text-align: center;">布局控件</h3>
		<el-collapse accordion v-model='boxActive'>
		  <el-collapse-item name='box1'>
		    <template slot="title">
		      From表单控件<i class="header-icon el-icon-document"></i>
		    </template>
		    <ul class="widget-box">
		    	<li class="widget-item" @click="addWidget('input_text')">文本输入框</li>
		    	<li class="widget-item" @click="addWidget('textarea')">文本域</li>		    	
		    	<li class="widget-item" @click="addWidget('select')">下拉选择框</li>
		    	<li class="widget-item" @click="addWidget('input_checkbox')">复选框</li>
		    	<li class="widget-item" @click="addWidget('input_radio')">单选框</li>
		    	<li class="widget-item" @click="addWidget('input_password')">密码输入框</li>
		    	<li class="widget-item" @click="addWidget('input_file')">文件上传</li>
		    	<li class="widget-item" @click="addWidget('button')">按钮</li>
		    </ul>
		  </el-collapse-item>
		  <el-collapse-item name='box2'>
		  	<template slot="title">
		      	常用组件<i class="header-icon el-icon-date"></i>
		    </template>
		    <ul class="widget-box">
		    	<li class="widget-item"  @click="addWidget('h1')">标题</li>
		    	<li class="widget-item" @click="addWidget('p')">段落</li>
		    	<li class="widget-item" @click="addWidget('img')">图片</li>	
		    </ul>
		  </el-collapse-item>
		  
		</el-collapse>
	
		
	</div>
</template>

<script>
	import _Bus_ from './formcontral.js';  
	
	export default {
		name:'formside',
		components:{},
		data(){
			return {
				boxActive:'box1'
				
				
			}
		},
		methods:{
			addWidget(type){
				 var type = type || 'none'
				// 触发组件content中的添加组件的事件
				_Bus_.$emit('add-widget',type);
			}
			
				
		
			
			
			
			
		},
		created(){
			
		},
		mounted(){
			
		}
	}
</script>

<style lang="less" scoped>
	
#formside{
	
	ul,li{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	text-align: left;
	.header-icon{
		margin-left: 30px;
	}
	.widget-box{
		width:100%;
		.widget-item{
			height: 35px;
			line-height: 35px;
			text-align: center;
			margin-bottom: 5px;
			border: 1px solid #BBBBBB;
			border-radius: 6px;
			cursor: pointer;
		}
		.widget-item:hover{
			background-color: azure;
		}
	}
	
	
}

</style>