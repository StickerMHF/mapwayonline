<template>
	<div id="formset" >
		<!-- 用来设置属性的控件 -->
		<div style="height: 35px;line-height: 35px;font-size: 16px;border-bottom: 1px solid #BBBBBB;">
			<span v-if="mainset">画布设置</span>
			<span v-if="!mainset" style="display: inline-block;width: 100%;height: 35px;position: relative;" ><i @click='mainset=!mainset' class="el-icon-arrow-left" style="color: #0082E6;display: inline-block;width: 35px;height: 35px;line-height: 33px;font-size:20px;position: absolute;left: 2px;text-align: center;"></i> 元素设置</span>
		</div>
		<div style="position: relative;">
					
				<div class="main-set" v-show="mainset">
					<el-tabs type='card'  v-model='mainActive'>
						<el-tab-pane label="设置" name="first">
							<div class="set-tool">
								<div  class="tool-item">
									<span class="tool-lable">表名：</span>
									<div>
										<el-input size="small" style='width: 200px;' 
											v-model='formConfig.name' 
											placeholder="请输入表名" 
											@blur = "setCanvas('name')"
											></el-input>	
									</div>																
								</div>
								
								<div  class="tool-item">
									<span class="tool-lable">描述：</span>
									<div>
										<el-input size="small" style='width: 200px;' 
											v-model='formConfig.description' 
											placeholder="请添加描述" 
											@blur = "setCanvas('description')"
											></el-input>	
									</div>									
								</div>
								
								<div class="tool-item">
									<span class="tool-lable">绑定表名：</span>
									<div>
										<el-select  style='width: 200px;' @change="setCanvas('bindTable')" v-model="formConfig.bindTable"size='small' placeholder="请选择请选择" >
										    <el-option
										      v-for="item in userDataList"
										      :key="item.value"
										      :label="item.label"
										      :value="item.value">
										    </el-option>
										</el-select>	
									</div>	
								</div>
								
								<div class="line"></div>
								<div class="tool-item">
									<span class="tool-lable">画布风格：</span>									
									<el-radio-group v-model="formConfig.manner" @change = "setCanvas('manner')">
									    <el-radio label="wide">宽屏(16:9)</el-radio>
									    <el-radio label="vertical">竖屏(9:16)</el-radio>
									    <!--<el-radio label="suit" >自适应</el-radio>-->
									</el-radio-group>
								</div>
								<div class="tool-item">
									<span class="tool-lable">网格透明度：</span>									
									   <el-slider style="width: 200px" v-model="grid.opacity" :format-tooltip="formatTooltip" @change = "setGrid('opacity')"></el-slider>
								</div>
								<div class="tool-item">
									<span class="tool-lable">画布背景色：</span>									
									<el-color-picker v-model="formConfig.style.backgroundColor" @change = "setCanvasStyle('backgroundColor')" show-alpha></el-color-picker>						
									
								</div>
								<div class="tool-item" style="height:160px;">
									<span class="tool-lable">画布背景图：<el-switch on-text=""  off-text="" @change = "resetBgimg" v-model="has_bg_img"></el-switch></span>
									<div v-show="has_bg_img">
										<div class="bg-thumbnail" style="margin-right: 10px;border: 1px solid #BFCBD9;display: inline-block;width: 94px;height: 75px;vertical-align: middle;">
											<!--需要展示已选中背景的缩略图-->
										</div>	
										<el-button type="success" @click="bg_img = true">设置</el-button>
										<!--点击出来模态框-->
									</div>
									
									
								</div>
								
							</div>
						</el-tab-pane>
		    			<el-tab-pane label="元素" name="two">	
		    				<div class="widget-list">
								<div class="widget-item" v-for="(value,key,index) in getForm.widgetList" @click="showSetbox(index)">
		    						{{index}}-{{value.label}}-{{value.type}}
		    					</div>  
							</div>						
		    			</el-tab-pane>
		    			<el-tab-pane label="  表  " name="three">	
		    				<div class="widget-list">
		    					<div class="widget-item" v-for="(item,index) in userDataList" :key="index">
		    						{{index}} -- {{item.value}}
		    					</div>	
		    				</div>
	    						
		    			</el-tab-pane>
					</el-tabs>
				</div> 					
							
				<div class="form-set " v-show="!mainset">
					
					<div class="set-tool" v-if="getForm">						
						 <el-tabs v-model="formSetActive" type="card">
						 	 <el-tab-pane label="样式" name="style">	
								
								<div  class="tool-item">
									<span class="tool-lable">行高：</span>
									<el-input-number  size="small" 
										v-model="currentSet.style.lineHeight" 
										@change="setWidgetStyle('lineHeight')" 
										:min="20" :max='666'>
									</el-input-number>						
								</div>
								<div class="tool-item">
									<span class="tool-lable">字体大小：</span>
									<el-input-number  size="small" 
										v-model="currentSet.style.fontSize"
										 @change="setWidgetStyle('fontSize')" 
										 :min="12" :max='60'>
									</el-input-number>	
								</div>
								<div class="tool-item">
									<span class="tool-lable">字体颜色：</span>
									<el-color-picker 
										v-model="currentSet.style.color" 
										@change="setWidgetStyle('color')"  show-alpha>
									</el-color-picker>					
								</div>
								<div  class="tool-item">
									<span class="tool-lable">背景色：</span>
									
									<el-color-picker v-model="currentSet.style.backgroundColor"
									 	@change="setWidgetStyle('backgroundColor')" show-alpha>
									</el-color-picker>	
								</div>
<!--								
								<div class="tool-item">
									<span class="tool-lable">边框样式： </span>
									<el-select v-model="currentSet.style.borderStyle" placeholder="请选择" 
										style='width: 120px;'
										@change ="setWidgetStyle('borderStyle')"
										>
								     <el-option
								      v-for="item in [{'value': 'none','label': '无边框'}, {'value': 'solid','label': '实线'},{'value': 'dashed','label': '虚线'},{'value': 'dotted','label': '点线'}]"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>    
								    </el-select>
								</div>
								
								
								<div class="tool-item">
									<span class="tool-lable">边框宽度：</span>
									<el-input-number v-model="currentSet.style.borderWidth" 
										size="small"
										@change = "setWidgetStyle('borderWidth')" 
										:min='0' :max='50'>
									</el-input-number>
								</div>
								
								<div class="tool-item">
									<span class="tool-lable">边框颜色：</span>
									<el-color-picker v-model="currentSet.style.borderColor" 
										@change = "setWidgetStyle('borderColor')">
									</el-color-picker show-alpha>
								</div>-->
								
								<div class="tool-item">
									<span class="tool-lable">边框圆角：</span>
									<el-input-number v-model="currentSet.style.borderRadius" 
										size="small"
										:min='0' :max='5000'
										@change = "setWidgetStyle('borderRadius')"
										>
									</el-input-number>
								</div>	
								
						    </el-tab-pane>
	
						 	<el-tab-pane label="配置" name="config">
								<div  class="" style="padding-left: 20px;" >
									<span class="tool-lable">添加描述：</span><br />
									<el-input v-model="currentSet.description" 
										@blur = "setWidget('description')">
									</el-input>
								</div>
								
								<div  class="" style="padding-left: 20px;">
									<span class="tool-lable">绑定标签：</span><br />
									<el-input type='text' v-model = 'currentSet.label' @blur = 'setWidget("label")'></el-input>
								</div>
						    	<div  class="" style="padding-left: 20px;" v-if='formConfig.bindTable'>
									<span class="tool-lable">绑定字段：</span><br />
									<el-select style='width: 120px;' v-model="currentSet.bindFiled" clearable size='small' @change="setWidget('bindFiled')">
									    <el-option
									      v-for="item in fieldList"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>
								</div> 								
						   </el-tab-pane>					   
						 </el-tabs>			
					</div>
							
				</div>			
		</div>
		
		
		
		<!--背景设置的模态框 -->
		<transition name='el-zoom-in-center'>
			<div class="model-box" v-show ='bg_img' >
				<div class="bg-img-set">
					<div class="model-header">
						<span> 画布背景图 </span> 
						<el-button @click="bg_img = false" type="text"> × </el-button>
					</div>
					<div class="model-content">
						上传方式和默认提供的图片	
						<el-button @click="setCanvasStyle('backgroundImage')">这是一张图片</el-button>
					</div>
					<div class="model-footer">
						<el-button type="success">确定</el-button>
						<el-button @click="bg_img = false"	 >取消</el-button>
					</div>
				</div>
			</div>
		</transition> 
		
	</div>
</template>

<script>
	
	import _Bus_ from './formcontral.js';  
	import {mapGetters,mapActions} from 'vuex'

	export default {
		name:'formset',
		components:{},
		data(){
			return {
				formConfig:{},  // 画布的设置
				formSetActive:'style',
				mainActive:'first',
				grid:{opacity:60},
				bg_img:false,
				has_bg_img:false,
				mainset:true,
				fieldList:[],
				hasPx:['lineHeight','fontSize','borderWidth','borderRadius','height','width'],
              	userDataList:[], // 获取用户已有的数据表
              	currentOid: null, // 当前编辑的控件id 从1开始
				currentSet : {
					type:'input',
					description:'input',
					lebel:'label',
					layout:{
						x:0,y:0,w:150,h:150
					},
					style:{
						backgroundColor:'#eee',
						lineHeight: 20,
						fontSize: 16,
						color:'#333',
						borderStyle : 'solid',
						borderWidth : 1,
						borderColor : '#fff',
						borderRadius : 0
					}				
				}, // 寄存当前控件的属性对象
				
			}
		},
		computed: {
			...mapGetters([
				'getForm'
			])
		},
		methods:{
			...mapActions([
        		'_setWidget',
        		'_setWidgetStyle',
        		'_setCanvas',
        		'_setCanvasStyle'
			]),
			formatTooltip(val){
				 return val / 100;
			},
			showSetbox(oid){
				this.mainset = false;	
				this.currentOid = oid;				
        		this.currentSet = this.cloneObj(this.getForm.widgetList[oid]);
        		for(var attr in this.currentSet.style){
        			if(this.hasPx.indexOf(attr) >= 0){
        				this.currentSet.style[attr] = parseInt(this.currentSet.style[attr]);
        			}
        		}
        		
			},
			setGrid(attr){
				var value = this.grid[attr] / 100;
				_Bus_.$emit('setGrid',{attr,value});
			},
			setWidgetStyle(oattr){
				//设置的样式 
				console.log(oattr);
				var value = this.currentSet.style[oattr];
				if(this.hasPx.indexOf(oattr) >= 0){
        			value = this.currentSet.style[oattr] + 'px'
        		}
				
				this._setWidgetStyle({
					oid: this.currentOid,
					attr: oattr,
					value 
				})
			},
			
			setWidget(oattr){
				// 修改widget的属性（不是style）
			
				this._setWidget({
					oid: this.currentOid,
					attr:oattr,
					value: this.currentSet[oattr]
				})
			},
			setCanvas(attr){
				var that = this;
				let value = that.formConfig[attr];
				if(attr === 'bindTable' && this.formConfig[attr] !== ''){
					
						that.$http.get('http://localhost/fz/json.php?f=filed',{})
						.then((res)=>{
				        	console.log('字段',res);       		
				     		that.fieldList = res.data[0];
				        }).catch((err)=>{
				        	console.log(err);
				        });	 
				        
				}
				that._setCanvas({attr,value});
				
				
			},
			setCanvasStyle(attr){		
				var that = this;
				let value = that.formConfig.style[attr];
				
				let url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502079319083&di=004eef4a1a3e5019252a576ed5d52f42&imgtype=0&src=http%3A%2F%2Fpic49.nipic.com%2Ffile%2F20140927%2F19617624_230415502002_2.jpg'
				
				if(attr === 'backgroundImage'){
					value = 'url('+url+ ')';
				}
				
				that._setCanvasStyle({attr,value});
				
			},
			resetBgimg(){ // 关闭背景图 重置为无背景
			
				if(this.has_bg_img === true){
					this._setCanvasStyle({attr:'backgroundImage',value:'url(none)'})
				}
			},
			initEvent(){
				// 初始化你的所有总线事件
				var that = this;
				_Bus_.$on('show-setbox',function(oid){
					that.showSetbox(oid);
					
				})
				
				
				
				
				
			},
			initData(){		
				 // 初始化你的数据
	  			this.$http.get('http://localhost/fz/json.php?f=form').then((res)=>{
		        	console.log('表',res);       		
		     		this.userDataList = res.data[0];
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
		},
		created(){
			this.initEvent();
			this.initData(); // 获取到的用户列表
			this.formConfig = this.cloneObj(this.getForm.formConfig);	
		},
		mounted(){			
			
		},
		beforeDestory(){
			_Bus_.$off("show-setbox");
		}
	}
</script>

<style lang="less" scoped>

#formset{
	position: relative;
	height: 700px;
	overflow-y: scroll;
	overflow-x: hidden;	
	width:250px;
	background-color: #FFFFFF;
	.main-set{
		width: 100%;
		min-height: 500px;
		.set-tool{		
			.tool-item{
				height: 70px;
				vertical-align: middle;
				margin-bottom: 8px;
				text-align: left;
				padding-left: 20px;
				.tool-lable{
					display: inline-block;
					vertical-align: middle;
					height: 40px;
					width: 120px;
				}
			}
		}
		.table-list{
			.table-item{
				border: 1px solid #333333;
				padding: 10px;
				border-radius: 5px;
				box-sizing: border-box;
				margin: 0 10px 10px;
			}
		}
		
	}
	.form-set {
		.item-title{
			background-color: #eee;
			margin-bottom: 10px;
			font-size: 16px;
			padding: 5px 0;			
		}
		.set-tool{	
			text-align: left;				
			.tool-item{
				margin-bottom: 8px;
				text-align: left;
				height: 40px;
				padding-left: 20px;
				vertical-align: middle;	
				overflow: hidden;		
			}
			.tool-lable{
				text-align: left;
				display: inline-block;
				vertical-align: middle;
				height: 40px;
				width: 70px;
				line-height: 40px;
			}
		}
	}
	.widget-list{
		width: 100%;
		overflow: hidden;
		.widget-item{
			width: 85%;
			height: 30px;
			margin-left: 10px;
			line-height: 30px;
			text-align: left;
			text-indent: 20px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			border: 1px solid #BBBBBB;
			border-radius: 5px;
			margin-bottom: 4px;
			cursor: pointer;
		}
	}
	
.model-box{
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,0.4);
	z-index: 99999999999;
	.bg-img-set{
		position: absolute;
		width: 800px;
		height: 500px;
		top: 200px;
		margin-left: -400px;
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
			height: 350px;
			overflow: hidden;
		}
		.model-footer{
			height: 50px;
			padding-bottom: 50px;
		}
		
	}
}	
	

	
	
}
.line{
	width: 100%;
	height: 0;
	border-bottom: 1px solid #BFCBD9;
	padding-top: 5px;
	margin-bottom: 5px;
	background-color: transparent;
}

</style>