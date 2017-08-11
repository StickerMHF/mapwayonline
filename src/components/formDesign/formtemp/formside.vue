<template>
	<div id="formside">
		
		<h3 style="text-align: center;">布局控件</h3>
		
			<ul class="widget-class">
				<li class="list-item" 
					@mouseover="widget = true"
					@mouseout="widget = false">
					<!--表单控件列表 -->
					<div>表单控件</div>
					<transition name='el-zoom-in-top'>
						<ul class="widget-box" v-show="widget">
					    	<li class="widget-item" v-for="item in List.widgetList" @click="addWidget({type:item.type,tagname:item.tagname})"><span>{{item.label}}</span></li>
					    </ul>
					</transition>
				</li>
				<li class="list-item"
					@mouseover="common = true"
					@mouseout="common = false">
					<!--常用控件列表 -->	
					<div>常用控件</div>
					<transition name='el-zoom-in-top'>
						<ul class="widget-box" v-show="common">
					    	<li class="widget-item" v-for="item in List.commonList" @click="addWidget({type:item.type,tagname:item.tagname})"><span>{{item.label}}</span></li>
					   </ul>	
					</transition>  
				</li>
				
			</ul>
		
		
			
		    
		
		
	</div>
</template>

<script>
	
	export default {
		name:'formside',
		components:{},
		data(){
			return {
				boxActive:'box1',
				widget:false,
				common:false,
				List:{
					// 表单控件列表
					widgetList:[
						{tagname:'input',type:'text',label:"文本输入框"},
						{tagname:'textarea',type:'',label:"文本域"},
						{tagname:'select',type:'',label:"下拉选择框"},
						{tagname:'input',type:'checkbox',label:"复选框"},
						{tagname:'input',type:'radio',label:"单选框"},
						{tagname:'input',type:'password',label:"密码输入框"},
						{tagname:'input',type:'file',label:"文件上传"},
						{tagname:'button',type:'submit',label:"提交按钮"},
						{tagname:'button',type:'reset',label:"重置按钮"},
						{tagname:'button',type:'button',label:"普通按钮"},
					],
					// 常用控件列表
					commonList:[
						{tagname:'h1',type:'',label:"一级标题"},
						{tagname:'p',type:'',label:"段落"},
						{tagname:'img',type:'',label:"图片"},
						
					]
				}
				
			}
		},
		methods:{
			addWidget(type){
				 var type = type || {};
				 
				// 触发组件content中的添加组件的事件
				
				this.$bus.emit('add-widget',type);
				
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
	.widget-class{
		
		.list-item{
			position: relative;
			width:70px;
			height:50px;
			border: 1px solid #DFDFDF;
			margin: 20px auto;
			.widget-box{
			
				border: 1px solid #DFDFDF;
				width:250px;
				box-sizing: border-box;
				position: absolute;
				right:-250px;
				
				padding: 20px;
				top:0;
				z-index: 999999999;
				background-color: #fff;
				border-radius: 5px;
				.widget-item{
					margin-bottom: 10px;
					margin-left: 10px;
					width: 45px;
					height: 45px;
					display: inline-block;
					line-height: 45px;
					text-align: center;
					margin-bottom: 5px;
					border: 1px solid #BBBBBB;
					border-radius: 6px;
					cursor: pointer;
					overflow: hidden;
				}
				.widget-item:hover{
					background-color: azure;
				}
			}
			
			
			
			
		}
		
		
		
		
	}
	
	
	
}

</style>