<template>
	<div id="formside">

			<ul class="widget-class">
				<li class="list-item formlist"
					@mouseover="widget = true"
					@mouseout="widget = false">
					<!--表单控件列表 -->
					<div>控件</div>
					<transition name='el-zoom-in-top'>
						<ul class="widget-box " v-show="widget">
					    	<li class="widget-item" v-if="fifter(item)"
					    		:class="item.type" v-for="item in List.widgetList"
					    		@click="addWidget({type:item.type,tagname:item.tagname})">
					    		<span>{{item.label}}</span>
					    	</li>
					    </ul>
					</transition>
				</li>
				<li class="list-item commonlist"
					@mouseover="common = true"
					@mouseout="common = false">
					<!--常用控件列表 -->
					<div>常用</div>
					<transition name='el-zoom-in-top'>
						<ul class="widget-box " v-show="common">
					    	<li class="widget-item"  :class="item.tagname"
					    		v-for="item in List.commonList"
					    		@click="addWidget({type:item.type,tagname:item.tagname})">
					    		<span>{{item.label}}</span>
					    	</li>
					   </ul>
					</transition>
				</li>
				<li class="list-item applylist"
					@mouseover="apply = true"
					@mouseout="apply = false">
					<!--应用控件列表 -->
					<div>应用</div>
					<transition name='el-zoom-in-top'>
						<ul class="widget-box " v-show="apply">
					    	<li class="widget-item"  :class="item.tagname"
					    		v-for="item in List.applyList"
					    		@click="addWidget({type:item.type,tagname:item.tagname})">
					    		<span>{{item.label}}</span>
					    	</li>
					   </ul>
					</transition>
				</li>

			</ul>



	</div>
</template>

<script>
	import {mapGetters, mapActions } from 'vuex'
	export default {
		name:'formside',
		components:{},
		 computed: {
			...mapGetters([
				'getForm'
			])
		},
		data(){
			return {
				boxActive:'box1',
				apply:false,
				widget:false,
				common:false,
				List:{
					// 表单控件列表
					widgetList:[
						{tagname:'input',type:'text',label:"输入框"},
						{tagname:'textarea',type:'textarea',label:"文本域"},
						{tagname:'select',type:'select',label:"下拉框"},
						{tagname:'input',type:'checkbox',label:"复选框"},
						{tagname:'input',type:'radio',label:"单选框"},
						{tagname:'input',type:'password',label:"密码框"},
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

					],
					applyList:[
						{tagname:'div',type:'',label:'表格'}

					]
				}

			}
		},
		methods:{
			fifter(item){
				let arr = ['text','textarea','password'];
				if(!this.getForm.formConfig.isinputform){
					if(arr.indexOf(item.type)>=0){
						return true;
					}
					return false;
				}else{
					return true
				}

			},
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
  @icon-base:'../../../assets/formDesign/img/';
#formside{
  text-align: left;
  height: 100px;
  width: 400px;
  position: relative;
  z-index: 99999999999999999;
  box-sizing: border-box;
	ul,li,h3{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.header-icon{
		margin-left: 30px;
	}
	.widget-class{
    height: 100%;
    display: flex;
    align-items: center;
		.formlist{
			background:url("@{icon-base}form.png")  no-repeat center 2px;
			background-size: 40px 40px;
		}
		.formlist:hover{
			background-image:url("@{icon-base}form-hover.png");
		}
		.commonlist{
			background:url("@{icon-base}html.png") no-repeat center 4px;
			background-size: 35px 35px;
		}
		.commonlist:hover{
			background-image:url("@{icon-base}html-hover.png");
		}
		.list-item{
			&:hover{
				box-shadow: 2px 6px 12px rgba(0, 0, 0, .175);
				background-color: #FFF;
				color: #1296DB;
			}
			border-radius: 5px;
			position: relative;
			width:70px;
			height:70px;
      margin-left: 15px ;
			border: 1px solid #DFDFDF;
			text-align: center;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			padding-bottom: 4px;
			box-sizing: border-box;
			.widget-box{
				background-color: #FFFFFF;
				color: #333;
				border: 1px solid #DFDFDF;
        width: 550px;
				box-sizing: border-box;
				position: absolute;
			  top: 70px;
				padding: 20px;
        left: 0;
				z-index: 99999999999999999;
				background-color: #fff;
				text-align: left;
				border-radius: 5px;
				.widget-item{
					font-size: 12px;
					margin-bottom:5px;
					margin-left: 10px;
					width: 72px;
					height: 75px;
					box-sizing: border-box;
					padding-top: 50px;
					display: inline-block;
					text-align: center;
					border: 1px solid #EEEEEE;
					cursor: pointer;
					overflow: hidden;
					background-position: center 14px;
					background-size: 25px 25px;
					background-repeat: no-repeat;
					&:hover{
						/*background-color: azure;*/
						color:#1296DB ;
						border: 1px solid #66ccff ;
						box-shadow: 2px 6px 6px rgba(0, 0, 0, .175);
					}
				}
				.text{
					background-size: 30px 30px;
					background-image: url("@{icon-base}input.png");
					&:hover{
						background-image: url("@{icon-base}input-hover.png");
					}
				}
				.textarea{
					background-image: url("@{icon-base}textarea.png");
					&:hover{
						background-image: url("@{icon-base}textarea-hover.png");
					}
				}
				.select{
					background-image: url("@{icon-base}select.png");
					&:hover{
						background-image: url("@{icon-base}select-hover.png");
					}
				}
				.checkbox{
					background-image: url("@{icon-base}checkbox.png");
					&:hover{
						background-image: url("@{icon-base}checkbox-hover.png");
					}
				}
				.radio{
					background-image: url("@{icon-base}radio.png");
					&:hover{
						background-image: url("@{icon-base}radio-hover.png");
					}
				}
				.password{
					background-size: 34px 34px;
					background-image: url("@{icon-base}password.png");
					&:hover{
						background-image: url("@{icon-base}password-hover.png");
					}
				}
				.file{
					background-image: url("@{icon-base}file.png");
					&:hover{
						background-image: url("@{icon-base}file-hover.png");
					}
				}
				.submit{
					background-image: url("@{icon-base}button.png");
					&:hover{
						background-image: url("@{icon-base}button-hover.png");
					}
				}
				.reset{
					background-image: url("@{icon-base}button.png");
					&:hover{
						background-image: url("@{icon-base}button-hover.png");
					}
				}
				.button{
					background-image: url("@{icon-base}button.png");
					&:hover{
						background-image: url("@{icon-base}button-hover.png");
					}
				}
				.h1{
					background-image: url("@{icon-base}h.png");
					&:hover{
						background-image: url("@{icon-base}h-hover.png");
					}
				}
				.img{
					background-image: url("@{icon-base}img.png");
					&:hover{
						background-image: url("@{icon-base}img-hover.png");
					}
				}
				.p{
					background-image: url("@{icon-base}p.png");
					&:hover{
						background-image: url("@{icon-base}p-hover.png");
					}
				}

			}




		}




	}


}

</style>
