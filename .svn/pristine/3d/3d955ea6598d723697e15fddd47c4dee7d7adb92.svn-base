<template>
	<div id="formset" >
		<!-- 用来设置属性的控件 -->
		<div style="height: 35px;line-height: 35px;font-size: 16px;border-bottom: 1px solid #BBBBBB;">
			<span v-if="mainset">画布设置</span>
			<span v-if="!mainset" style="display: inline-block;width: 100%;height: 35px;position: relative;" ><i @click='mainset=!mainset' class="el-icon-arrow-left" style="color: #0082E6;display: inline-block;width: 35px;height: 35px;line-height: 33px;font-size:20px;position: absolute;left: 2px;text-align: center;"></i> 元素设置</span>
		</div>
		<div style="position: relative;">
					
				<div class="main-set" v-show="mainset">
					<el-tabs v-model='mainActive' type='card' @tab-click="" >
						<el-tab-pane label="设置" name="first">
							<div class="set-tool">
								<div  class="tool-item">
									<span class="tool-lable">表名：</span>
									<div>
										<el-input size="small" style='width: 200px;' 
											v-model='formConfig.name' 
											placeholder="请输入表名" 
											@blur = "setDrag('name')"
											></el-input>	
									</div>																
								</div>
								
								<div  class="tool-item">
									<span class="tool-lable">描述：</span>
									<div>
										<el-input size="small" style='width: 200px;' 
											v-model='formConfig.description' 
											placeholder="请添加描述" 
											@blur = "setDrag('description')"
											></el-input>	
									</div>									
								</div>
								
								<div class="tool-item">
									<span class="tool-lable">绑定表名：</span>
									<div>
										<el-select  style='width: 200px;' @change="setDrag('bindData')" v-model="formConfig.bindData"size='small' placeholder="请选择请选择" >
										    <el-option
										      v-for="item in userDataList"
										      :key="item.value"
										      :label="item.label"
										      :value="item.value">
										    </el-option>
										</el-select>	
									</div>	
								</div>
								<div class="tool-item">
									<span class="tool-lable" title="应用列表导出可填写的form表单，展示则仅仅用于展示！">应用表单：</span>
									<div>
										<el-switch v-model="formConfig.isApp" on-text="应用" off-text="展示" :width = '70' @change = "setDrag('isApp')"></el-switch>
									</div>									
								</div>
								<div class="tool-item" v-if="!formConfig.isApp">
									<span class="tool-lable">绑定数据ID：</span>
									<div>
										<el-autocomplete
									      class="inline-input"
									      v-model="selectDataId"
									      :fetch-suggestions="querySearch"
									      placeholder="请输入内容"
									      :trigger-on-focus="false"
									      <!--@select="handleSelect"-->
									    ></el-autocomplete>
										<el-button size="mini" @click = "setdataId">查询</el-button>
										
									</div>	
								</div>
								<div class="line"></div>
								<div class="tool-item">
									<span class="tool-lable">画布风格：</span>									
									<el-radio-group v-model="formConfig.layout" @change = "setDrag('layout')">
									    <el-radio label="wide">宽屏</el-radio>
									    <el-radio label="vertical">竖屏</el-radio>
									    <el-radio label="suit" >自适应</el-radio>
									</el-radio-group>
								</div>
								<div class="tool-item">
									<span class="tool-lable">画布背景色：</span>									
									<el-color-picker v-model="formConfig.style.backgroundColor" @change = "setDrag('backgroundColor')" show-alpha></el-color-picker>						
									
								</div>
								<div class="tool-item">
									<span class="tool-lable">画布背景图：</span>																		
								</div>
								
								
							</div>	
						</el-tab-pane>
		    			<el-tab-pane label="元素" name="two">
		    				<div class="widget-list">
		    					<div class="widget-item" v-for="(value,key,index) in getForm.widgetList" @click="showSetbox(value.id)">
		    						{{value.id}}-{{value.label}}-{{value.type}}
		    					</div>  
		    				</div>
		    														
		    			</el-tab-pane>
		    			<el-tab-pane label="  表  " name="three">
		    			
	    					<div class="table-list" v-if="userDataList">
		    					<div class="table-item" v-for="item in userDataList" >
		    						{{item.value}} - {{item.label}}
		    					</div>
		    				</div>
		    			
		    				
		    			</el-tab-pane>
					</el-tabs>
				</div> 					
							
				<div class="form-set " v-show="!mainset">
					<div class="item-title">{{widgetobj.type}} - {{widgetobj.id}}</div>					
					<div class="set-tool" v-if="getForm">						
						 <el-tabs v-model="formSetActive" type="card">
						 							    <el-tab-pane label="样式" name="style">
								<div  class="tool-item">
									 <span class="tool-lable">高度(%)：</span>
									 <el-input-number :step="5" size="small" v-model="ostyle.height" @change="drawing('height')" :min="20" :max='100'></el-input-number>
								</div>
								<div  class="tool-item">
									<span class="tool-lable">宽度(%)：</span>
									<el-input-number :step="5" size="small" v-model="ostyle.width" @change="drawing('width')" :min="20" :max='100'></el-input-number>												
								</div>
								<div  class="tool-item">
									<span class="tool-lable">行高(px)：</span>
									<el-input-number  size="small" v-model="ostyle.lineHeight" @change="drawing('lineHeight')" :min="20" :max='666'></el-input-number>						
								</div>
								<div  class="tool-item">
									<span class="tool-lable">背 景 色 ：</span>
									<el-color-picker v-model="ostyle.backgroundColor" @change="drawing('backgroundColor')"  show-alpha></el-color-picker>						
								</div>
								<div class="tool-item">
									<span class="tool-lable">字体大小：</span>
									<el-input-number  size="small" v-model="ostyle.fontSize" @change="drawing('fontSize')" :min="12" :max='60'></el-input-number>	
								</div>
								<div class="tool-item">
									<span class="tool-lable">字体颜色：</span>
									<el-color-picker v-model="ostyle.color" @change="drawing('color')"  show-alpha></el-color-picker>					
								</div>
								<div  class="tool-item">
									<span class="tool-lable">边框样式：</span>
									<el-select style='width: 120px;' v-model="ostyle.borderStyle" size='small' placeholder="请选择" @change="drawing('borderStyle')"  @visible-change = 'showBorder'>
									    <el-option
									      v-for="item in [{'value': 'none','label': '无边框'}, {'value': 'solid','label': '实线'},{'value': 'dashed','label': '虚线'},{'value': 'dotted','label': '点线'}]"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>	
								</div>
								<div  class="tool-item" v-if="ostyle.borderStyle != 'none'">
									<span class="tool-lable">边框宽度：</span>
									<el-input-number  size="small" v-model="ostyle.borderWidth" @change="drawing('borderWidth')" :min="1" :max='666'></el-input-number>		
								</div>
								<div  class="tool-item" v-if="ostyle.borderStyle != 'none'">
									<span class="tool-lable">边框颜色：</span>
									<el-color-picker v-model="ostyle.borderColor" @change="drawing('borderColor')"  show-alpha></el-color-picker>	
								</div>
								<div  class="tool-item" v-if="ostyle.borderStyle != 'none'">
									<span class="tool-lable">边框圆角：</span>
									<el-input-number  size="small" v-model="ostyle.borderRadius" @change="drawing('borderRadius')" :min="-66" :max='666'></el-input-number>		
								</div>
								<!--<div  class="tool-item">
									<span class="tool-lable">上外边距：</span>
									<el-input-number size="small" v-model="ostyle.marginTop" @change="drawing('marginTop')" :min="-666" :max='666'></el-input-number>		
								</div>						
								<div  class="tool-item">
									<span class="tool-lable">左外边距：</span>
									<el-input-number  size="small" v-model="ostyle.marginLeft" @change="drawing('marginLeft')" :min="-666" :max='666'></el-input-number>		
								</div>
								-->
								<div  class="tool-item">
									<span class="tool-lable">上边距：</span>
									<el-input-number  size="small" v-model="ostyle.paddingTop" @change="drawing('paddingTop')" :min="0" :max='666'></el-input-number>		
								</div>						
								
								<div  class="tool-item">
									<span class="tool-lable">左边距：</span>
									<el-input-number  size="small" v-model="ostyle.paddingLeft" @change="drawing('paddingLeft')" :min="0" :max='666'></el-input-number>		
								</div>
								<div  class="tool-item">
									<span class="tool-lable">下边距：</span>
									<el-input-number  size="small" v-model="ostyle.paddingBottom" @change="drawing('paddingBottom')" :min="0" :max='666'></el-input-number>		
								</div>						
								
								<div  class="tool-item">
									<span class="tool-lable">右边距：</span>
									<el-input-number  size="small" v-model="ostyle.paddingRight" @change="drawing('paddingRight')" :min="0" :max='666'></el-input-number>		
								</div>		    	
						    </el-tab-pane>
	
						 	<el-tab-pane label="配置" name="config">
						    	<div  class="" style="padding-left: 20px;" v-if="widgetobj.label">
									<span class="tool-lable">绑定标签：</span><br />
									<el-input type='text' v-model = 'widgetobj.label' @blur = 'setWidget("label")'></el-input>
								</div>
						    	<div  class="" style="padding-left: 20px;" v-if='formConfig.bindData'>
									<span class="tool-lable">绑定字段：</span><br />
									<el-select style='width: 120px;' v-model="widgetobj.databind" clearable size='small' @change="setWidget('databind')" @visible-change = 'showBindField'>
									    <el-option
									      v-for="item in fieldList"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>
								</div> 	
								<div  class="" style="padding-left: 20px;" v-if='widgetobj.option'>
									<span class="tool-lable">选项列表：</span><br />
									<el-input type='text' v-model = 'widgetobj.option' @blur = 'setWidget("option")'></el-input>
								</div>
						    </el-tab-pane>
					   
						 </el-tabs>
						
						
					
					</div>
							
				</div>
			
		</div>
	
		
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
				formSetActive:'style',
				haspx:['lineHeight','fontSize','borderRadius','borderWidth','marginTop','marginLeft','marginBottom','marginRight','paddingTop','paddingBottom','paddingLeft','paddingRight'],				
				mainActive:'first',
				mainset:true,
				widgetobj:{ },
              	ostyle:{},
              	// 获取用户已有的数据表
              	// {'value': '4','label': '4'}, {'value': '3','label': '3'},{'value': '2','label': '2'},{'value': '1','label': '1'}
              	userDataList:[],
              	// 获取到的对应表的字段列表 {'value':'f1','label':'字段一'}
              	fieldList:[],
              	formConfig:{},
              	// 选择框控制
              	_showBindField: false,
              	_showBorder:false,
              	dataIdList:[],
              	selectDataId:''
			}
		},
		computed: {
			...mapGetters([
				'getForm'
			])
		},
		methods:{
			...mapActions([
				'_changeStyle',
				'_setWidget',
				'_setDrag',
				'_setDragStyle'
				
			]),
			initEvent(){
				var that = this;
				_Bus_.$on('set-widget',function(obj){
					that.showSetbox(obj);
				})
				
			},
			showSetbox(oid){
				this.mainset = false;			
//				console.log(this.getForm.widgetList);			
				this.widgetobj = this.getForm.widgetList['widget'+oid];	
				
				var bindData = this.getForm.formConfig.bindData || '';
				
				console.log(this.getForm.formConfig.bindData);
				console.log(bindData);
				// 处理样式
				var ostyle = this.widgetobj.style;
				for(let key in ostyle){
					if(this.haspx.includes(key)){
						ostyle[key] = parseInt(ostyle[key]);
					}					
					if(key === 'width' || key === 'height'){
						ostyle[key] = parseInt(ostyle[key]);
					}
				}
				this.ostyle = ostyle;				
			},
			drawing(attr){
				if(attr == 'borderStyle' && !this._showBorder){
					return;
				}
				let value=this.ostyle[attr] || '';
				let oid = this.widgetobj.id || '';
				if(this.haspx.includes(attr)){
					value = this.ostyle[attr] +'px';
				}
				if(attr === 'width' || attr === 'height'){
					value = this.ostyle[attr] +'%';
				}
//				console.log(this.widgetobj.id,attr,value);				
				this._changeStyle({oid,attr,value});				
				_Bus_.$emit('change-style',oid,attr,value);
			},
			setWidget(attr){		
				// 这里的value有个错误 
				let oid = this.widgetobj.id || '';
				let value = this.widgetobj[attr] || '';
//				console.log(attr,value);
				if(attr === 'databind'){
//					if (!this._showBindField) {
//						return;
//					}
					this._setWidget({oid,attr,value});	
					_Bus_.$emit('change-set',oid,attr,value);					
				}else{
					this._setWidget({oid,attr,value});	
					_Bus_.$emit('change-set',oid,attr,value);					
				}
							
			},
			showBindField(isShow){
				this._showBindField = isShow;
			},
			showBorder(isShow){
				this._showBorder = isShow;
			},
			setdataId(attr){
				// 设置展示表单的绑定数据id
				
				var that = this;
				if(that.formConfig.bindData){ // 只有数据表已经绑定了表，才能获取对应的展示列表的信息，模糊查找
					
					that.$http.get('TBUSER000001/formdesign/form/'+that.formConfig.bindData+'/like',{
						type:that.selectDataId
					})
					.then((res)=>{
			        	console.log('dataId',res);       		
			     		that.dataIdList = res.data[0];
			        }).catch((err)=>{
			        	console.log(err);
			        });
					
				}
					
				
				
			},
			setDrag(attr){
				var that = this;
				// 过滤不需要修改样式的表单配置项 
				if(['bindData','isApp'].indexOf(attr) < 0){
				
					if(attr === 'backgroundImage'){
						console.log('背景图片');
						// ...
						return;
					}
					let value = that.formConfig.style[attr];
					if(attr === 'layout'){
						value = that.formConfig[attr]
					}
					that._setDragStyle({attr,value});
					_Bus_.$emit('set-drag',attr,value);
					
				}else{
					// 如果在修改表单绑定的表时，会获取到对应表中的字段 
					if(attr === 'bindData' && that.formConfig.bindData){
						
						console.log('查找表字段',that.getForm.formConfig.bindData)
						
						that.$http.get('http://localhost/fz/json.php?f=filed',{})
						.then((res)=>{
				        	console.log('字段',res);       		
				     		that.fieldList = res.data[0];
				        }).catch((err)=>{
				        	console.log(err);
				        });	 
				        
					}
					
					let value = that.formConfig[attr];
					that._setDrag({attr,value});
				}			
			},
			querySearch(queryString, cb){ // 展示列表获取到的id列表
				
				// 请求dataIdList
							
				var list = this.dataIdList || []; 
		        var results = queryString ? list.filter(this.createFilter(queryString)) : list;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
			},
			  createFilter(queryString) {
		        return (data) => {
		          return (data.value.indexOf(queryString.toLowerCase()) === 0);
		        };
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
			initData(){				
	  			this.$http.get('http://localhost/fz/json.php?f=form').then((res)=>{
		        	console.log('表',res);       		
		     		this.userDataList = res.data[0];
		        }).catch((err)=>{
		        	console.log(err)
		        });	       
	  		},
		},
		created(){
			this.initEvent();
			this.initData(); // 获取到的用户列表
			this.formConfig =this.cloneObj(this.getForm.formConfig);
			console.log(this.formConfig)
		},
		mounted(){			
			
		}
	}
</script>

<style lang="less" scoped>
.line{
	width: 100%;
	height: 0;
	border-bottom: 1px solid #BFCBD9;
	padding-top: 5px;
	padding-bottom: 5px;
	background-color: transparent;
}
#formset{
	position: relative;
	height: 700px;
	overflow-y: scroll;
	overflow-x: hidden;
	margin-right: -20px;
	width:257px;
	background-color: #FFFFFF;
	padding-bottom: 40px;
	.back{
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		transform: rotateY(180deg);
	}
	.front{
		top: 0;
		left: 0;
		position: absolute;
		display: inline-block;
		transform: rotateY(0deg);
	}
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

</style>