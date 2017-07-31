<template>
	<div id="formcontent">
		<div style="display: none;border-bottom: 1px solid #BBBBBB;padding-bottom: 10px;background-color: #FFFFFF;">
			<div>formcontent</div>
			<button @click="addwidget('input')">添加一个input控件</button>
			<button @click="getList">展示列表</button>
			<label ><input type="checkbox" v-model="dragConfig.draggable" />拖动</label>
			<label ><input type="checkbox" v-model="dragConfig.resizable" />缩放</label>
		</div>
		<div class="hiddenbar">
			<div class="drag-area" id="drag-area">						
				<drag-box ref="cyGridster" 
					:your-list="myList" 
					:resizable='dragConfig.resizable' 
					:draggable='dragConfig.draggable' 
					:base-margin-left="dragConfig.baseMarginLeft" 
					:base-margin-top="dragConfig.baseMarginTop" 
					:base-width="dragConfig.baseWidth" 
					:base-height="dragConfig.baseHeight"
					
					>
					<template v-for="(item,index) in myList" :slot="'slot'+index">
						<div class="dragHandle" 
							
							>
							<div class="tool">								
								<span title="删除" @click="deleteItem(index)" class="tool-icon icon-del">&times;</span> 
								<span title="编辑" @click="editor(index)" class="editor tool-icon">&cong;</span>
							</div>
							
		                    <div :ref="'widget'+index" ></div>
		               </div>					
					</template>	
				</drag-box>		
				
			</div>
		</div>
			
		
		<div class="tableline">
			
		</div>
		
	</div>
</template>

<script>
	import drag from '../drag/drag.vue';
	import $ from 'jquery';
	import _ from "lodash";
	import _Bus_ from './formcontral.js';  
	import {mapGetters, mapActions } from 'vuex'
	
	export default {		
		name:'formcontent',
		props:['oid'],
		components:{
			'dragBox': drag
		},
		data() {         
            return {
            	// 一个form对象 包括form自身信息 以及mylist 布局数组，WidgetList 控件列表 还有很多配置信息
                myList: [], // 用来承载插件布局的数组 * 
                dragConfig:{
                	baseWidth: 0, // 插件对应的默认基础宽度
	                baseHeight: 0, // 插件对应的默认基础高度
	                draggable:true, // 是否允许拖拽
	                resizable:true, // 是否允许缩放
	               	maxid:0, // 默认开始的ID 0表示从1开始
	               	basePoint:5, // 对于缩放盒子的基点 越小越细致  
	               	baseMargin:0 // 对于拖拽盒子之间的间隔 越小间隔越小	               	
                }               
            }
        },
        computed: {
			...mapGetters([
				'getForm'
			])
		},
        methods: {
        	...mapActions([
        		'_addWidget' ,
        		'_removeWidget',
        		'_upData'
        	]),
            getList() {  // 获取布局的对象数据
                let gridster = this.$refs['cyGridster']; //获取gridster实例
                console.log(JSON.stringify(gridster.getList())); 
                console.log(JSON.stringify(this.getForm.widgetList));  
                console.log(JSON.stringify(this.getForm.formConfig));  
                console.log(JSON.stringify(this.dragConfig));  
            },
            
            // 编辑对应的控件属性
            editor(index){
            	let oid = this.myList[index].id;
             	_Bus_.$emit('set-widget',oid)            	
            },
            addItemBox() {
            	var vm = this;
                let gridster = this.$refs['cyGridster']; //获取gridster实例
                gridster.addItemBox({
                    id: vm.dragConfig.maxid,
                    x: 1,
                    y: 1,
                    sizex: 100,
                    sizey: 15
                })
            },
            // 添加控件
            addwidget(type){
            	let vm = this;
            	vm.dragConfig.maxid++;           	
            	let t = type || 'none';
           
            	let gridster = this.$refs['cyGridster']; //获取gridster实例

                gridster.addItemBox({
                    id: vm.dragConfig.maxid,
                    x: 1,
                    y: 1,
                    sizex: 100,
                    sizey:15
                })
                // 把新增的控价对象的属性和控件容器，绑定字段等数据存入控件对象，并用oid命名对象名
               	let wi = {                     	
                	type:t,
                	description:'',
                	label:'the_label',
                	id:vm.dragConfig.maxid,
                	databind:'',                 
                	style:{
                		height:'30px',
                		width:'200px',
                		lineHeight:'30px',
                		backgroundColor:'#FFF',
                		fontSize:'14px',
                		color:'#333',
                		borderStyle:'solid',
                		borderWidth:'1px',
                		borderColor:'#eee',
                		borderRadius:'0',
                		marginTop:'0',
                		marginLeft:'0',               	
                		paddingTop:'0',               	
                		paddingLeft:'0'              	
                	}
                }
                // 这里是根据不同的控件，添加不同的控件需要的属性，还有属性的过滤
				switch (t){
					case 'select':
						wi.option = ['选项一','选项二','选项三'];
						wi.style.width = '150px';
						wi.description = '下拉选择框';
						break;
					case 'input_checkbox':
						wi.option = ['选项一','选项二','选项三'];
						wi.description = '复选框';
						break;
					case 'input_radio':
						wi.option = ['选项一','选项二','选项三'];
						wi.description = '单选框';
						break;
					case 'textarea':
						wi.style.height = '70px';
						wi.description = '文本域';
						break;	
					case 'button':
						wi.style.width = '70px';
						wi.description = '按钮';
						break;
					case 'input_text':
						wi.style.width = '150px';	
						wi.description = '文本框';
						break;	
					case 'input_password':
						wi.style.width = '150px';
						wi.description = '密码框';
						break;	
					case 'input_file':
						wi.style.width = '150px';	
						wi.description = '文件上传';
						break;
					case 'h1':
						wi.style.width = '250px';
						wi.description = '标题';
						break;	
					case 'p':
						wi.style.width = '200px';
						wi.style.height = '70px';
						wi.description = '段落';
						break;
					case 'img':
						wi.style.width = '150px';
						wi.style.height = '200px';
						wi.description = '图片';
						break;					
					default:
						break;
				}


				vm._addWidget(wi);  // 最后把该控件的数据，添加到vuex中。
				
            	gridster.$nextTick(function () {
                   	// 添加对应得控件
                   	var widget = vm.$refs['widget' + (vm.myList.length - 1)][0];
                   	let ostyle = vm.getForm.widgetList['widget'+ vm.dragConfig.maxid].style;

                   	// 为控件容器中添加内容                  
                   	widget.innerHTML= `
							<i class='icon'></i>
							<span class='label'></span> 
                   			<span class='type'>`+wi.description+'-'+vm.dragConfig.maxid+`</span>            			
                		`
                   	for(var key in ostyle){
                   		widget.style[key] = ostyle[key];
                   		widget.setAttribute('class','widget'+ vm.dragConfig.maxid+' widget')
                   	}
                   	
                   	let icon = widget.getElementsByClassName('icon')[0];
                   	$(icon).css({
                   		'display':'inline-block',
                   		'width':'14px',
                   		'height':'14px'                 		
                   	})
               /*    	
                   	let type = widget.getElementsByClassName('type')[0];
                   	$(type).css({
                   		'width' : 'calc(100% - 90px)',
                   		'display' : 'inline-block',
                   		'box-sizing': 'border-box',
                   	})
                   	$(label).css({
                   		'display':'inline-block',
                   		'width': '90px',
                   		'box-sizing': 'border-box',
                   		'border':'1px solid #bbb',
                   		'height':'28px'
                   	})
                */
					$('.dragHandle').hover(function(){
		            	$(this).children('.tool').css({'display':'inline-block'});
		           },function(){
		            	$(this).children('.tool').css({'display':'none'});
		            })
                   	
                })
//          	console.log(vm.widgetInstanceBox,vm.myList)
				
            },
            
            // 删除对应的控件
            deleteItem(index) { // 删除布局中的控件
                let gridster = this.$refs['cyGridster'];
                let item = this.myList[index];
            	let oid = item.id;            	
            	this._removeWidget('widget'+oid);
                gridster.removeItem(index); //此时会在this.myList的index位置将item置为{}，目的是为了不让vue重新渲染整个v-for。
                //注意，这里删除布局框并不会删除里面的组件，组件需要自己用v-if来控制销毁，如果是highchart，必须手动调用chartInstance.$destroy()
            },
            
            
            /**
                e:事件对象
                item：拖动对象
                index：拖动对象下标
            */
            dragStart(e, item, index) {
            	console.log('dragStart')
            },
            dragging(e, item, index) {
            	console.log('dragging')
            },
            dragEnd(e, item, index) {
            	console.log('dragEnd')
            },
            resizeStart(e, item, index) {
            	console.log('resizeStart')
            },
            resizing(e, item, index) {
            	console.log('resizing')
            },
            resizeEnd(e, item, index) {
                console.log('resizeEnd');
            },
//          
//          showTool($event){
//         		var el = $event.target;
//          	el.style.borderColor = '#66ccff';
//          	el.style.borderStyle = 'solid';
//          	el.getElementsByClassName('tool')[0].style.display = 'inline-block';
//          },
//          hideTool($event){
//          	var el = $event.target;
//          	el.style.borderColor = '#bbb';
//          	$event.target.getElementsByClassName('tool')[0].style.display = 'none';
//          },
            // 初始化组件通讯总线中的事件         
            initEvent(){             	
            	let that = this ;          	
            	_Bus_.$on('add-widget',function(type){
            		console.log('添加',type);
            		that.addwidget(type);
            	})
        		_Bus_.$on('change-style',function(id,attr,value){
        			let w = that.$refs['cyGridster'].$el.getElementsByClassName('widget'+id)[0];
        			console.log(w.getElementsByClassName('type')[0])
        			w.style[attr] = value;
        		});
        		_Bus_.$on('change-set',function(id,attr,value){
        			let icon = that.$refs['cyGridster'].$el.getElementsByClassName('widget'+id)[0].getElementsByClassName('icon')[0];	
        			if(attr == 'label'){
        				that.$refs['cyGridster'].$el.getElementsByClassName('widget'+id)[0].getElementsByClassName('label')[0].innerText = value ;
        			}else if(attr == 'databind'){
        				if(value == ''){
        					icon.setAttribute('class','icon');
        				}else{
        					icon.setAttribute('class','icon el-icon-circle-check')
        				}
        			}
        		});
        		_Bus_.$on('set-drag',function(attr,value){
					that.setDrag(attr,value);
				})
            	
            },
            setDrag(attr,value){
				console.log(attr,value);
				var that = this ;
				let gridster = that.$refs['cyGridster']; //获取gridster实例
				if(attr == 'layout'){					
					that.initdrag(value,gridster.init);									
					window.onresize = function(){
						setTimeout(function(){
							that.initdrag(value,gridster.init);
		            				            		
		            	},100)
					}
				}
						
			},
            // 屏幕适配
            initdrag(t,cb){
            	let type = t || 'wide';
            	 //屏幕适配，使得当前布局能在所有分辨率下适用，示例是在1366*638分辨率下完成
            	let screenWidth,screenHeight,dragWidth,dragHeight; 
            	if(type == 'wide'){
            		screenWidth = dragWidth = 960;
            		screenHeight = dragHeight = 540;
            	}else if(type == 'vertical'){
            		screenWidth = dragWidth = 540;
            		screenHeight = dragHeight = 960;
            	}else if(type == 'suit'){
            		let screenWidth = window.innerWidth;
            		let screenHeight = window.innerHeight;
            		dragWidth = 1000;
            		dragHeight = 560;
            	}
            	
//	           	let screenWidth = window.innerWidth;
//          	let screenHeight = window.innerHeight;
	//          this.baseWidth = 90.8333 * (screenWidth / 1366);
	//          this.baseHeight = 100 * (screenHeight / 638);
	//          this.baseMarginLeft = 20 * (screenWidth / 1366);
	//          this.baseMarginTop = 20 * (screenHeight / 638);
				
	            this.dragConfig.baseWidth = this.dragConfig.basePoint * (screenWidth / 1366);
	            this.dragConfig.baseHeight = this.dragConfig.basePoint * (screenHeight / 638);
	            this.dragConfig.baseMarginLeft = this.dragConfig.baseMargin * (screenWidth / 1366);
	            this.dragConfig.baseMarginTop = this.dragConfig.baseMargin * (screenHeight / 638);		       		
	            this.$nextTick(function () {
	                $(".dragAndResize").css("width", "calc(100% - " + (this.dragConfig.baseMarginLeft) + "px)");
	                $('#drag-area').css('width',dragWidth + 'px');
	                $('#drag-area').css('min-height',dragHeight + 'px');
	                if(typeof cb == 'function'){
	                	cb();
	                }
	                
            
	            })
            },  
            
            //二次编辑的初始化布局
            initWidget(){
            	var that = this;
            	console.log(this.widgetList);
            	let gridster = that.$refs['cyGridster']; //获取gridster实例
	            gridster.afterInitOk(function () {
	                _.forEach(that.myList, function (item, index) {
	                 	// 这里给每一个已经保存好的控件按要求渲染出来 
	                   
	                   
	                   
	                });
	            })				
	            gridster.init();
            	
            }
        },      
        created() {  	
        	
        /*	
        	this.$http.get('http://localhost/fz/json.php').then((res)=>{
        		var data = res.data[0];
        		console.log(data);
        		this._upData({
        			name:'formConfig',
        			data:data.formConfig
        		})
        		this._upData({
        			name:'widgetList',
        			data:data.widgetList
        		})
        		this.dragConfig = data.dragBase;
        		this.myList = data.layout;
     		
        	}).catch((err)=>{
        		console.log(err)
        	})
        	
        */	
        	 // console.log(this.oid);根据路由传递的oid（数据的id）来判断是否为二次编辑并取出该数据或者建立一个空的模板
        	if(this.oid == 'new'){
        		console.log('新建form模板');
        	
        	
        	
        	}else{
        		console.log(this.oid,'数据二次编辑');
        		//      获取的数据需要存入vuex中 并使得其他控件能够操作
        	
			        	
			        	
			//      	this.initWidget(); 这里初始化二次布局的数据
        		
        		
        	}
        	
        	this.initdrag(); // 初始化drag区域的屏幕参数		
            this.initEvent(); // 初始化事件总线
        },
        mounted() {
        	var that = this;
            let gridster = this.$refs['cyGridster']; //获取gridster实例
            setTimeout(function(){ 
            	gridster.init(); //在适当的时候初始化布局组件
            },0)
            
            window.onresize = function(){
            	setTimeout(function(){           		
            		that.initdrag('wide',gridster.init);
            	},100)
            }
            
        } 
	}
	
</script>

<style lang="less" scoped>
#formcontent{	
	width: 100%;	
	min-width: 675px;
	.hiddenbar{
		padding-top: 35px;
		position: relative;
		width: 85%;
		height: 85%;
		margin: 0 auto;
		#drag-area{	
			box-shadow:6px 6px 5px #888888;
			background-color: #FFFFFF;			
			margin: 0 auto;
			text-align: left;
		}
	}
	
}
.dragHandle{
	// 拖拽的盒子 
	position: relative;
	overflow: hidden;	
	margin: 0 auto;	
	/*padding: 20px 15px 10px !important;*/
	height: 100%;
	border: 1px #FFFFFF dashed;
	border-bottom: 1px dashed #C0C0C0;	
	&:hover{
		border: 1px dashed chartreuse;	
	}
	.widget{
		// 控件的盒子
		border: 1px solid #BBBBBB;
		display: inline-block;
		overflow: hidden;
		cursor: default;	
		text-align: left;	
		
	}
	.tool{
		width: 16px;		
		position: absolute;
		right: 0;
		top: 0;
		clear:both;
		/*display: none;*/
		.tool-icon{
			float: right;
			height: 16px;
			width: 16px;
			margin-top: 2px;
			display: inline-block;
			line-height: 16px;
			font-size: 16px;
			text-align: center;
			background-color: aliceblue;
			cursor: pointer;
			margin-left: 3px;
		}
		.tool-icon:hover{
			background-color: #66CCFF;
		}
	}		
	
	
}


</style>