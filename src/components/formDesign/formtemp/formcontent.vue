<template>
<div id="formcontent">
		
		<el-button @click = "addBox('input')">添加</el-button>
		<el-button @click = "showList">查看列表</el-button>
		<br />
		
		<div class="hiddenbar ">
			
			<div class="drag-area no-select deactivated " 
				:style="getForm.formConfig.style" id="drag-area" 
				@mouseover="showBar = true"
				@mouseout="showBar = false"
				>
    			<div class="grid deactivated" :style="{opacity:grid.opacity}" style="height: 100%;width: 100%;position: absolute;"></div>
		   	  	
		   	  	<div v-show="showBar " @mousedown="dragCanvas" class="drag-bar deactivated"> 
		   	  		<div class="drag-icon"><i class="point"></i><i class="point"></i><i class="point"></i><i class="point"></i><i class="point"></i></div>
		   	  		<div class="drag-icon"><i class="point"></i><i class="point"></i><i class="point"></i><i class="point"></i><i class="point"></i></div> 		
		   	  	</div>
		   	  
		   	  	<div :is = "'vue-draggable-resizable'"
		   	  	v-for="(item,index) in getForm.widgetList" 
		   	  	:key = 'index'
		   	  	:x='item.layout.x' 
		   	  	:y = 'item.layout.y' 
		   	  	:w = 'item.layout.w' 
		   	  	:h = 'item.layout.h'
		   	  	:oid = 'index'
		   	  	@removeBox = 'removeBox'
		   	  	@resizestop="onResizeStop" 
		   	  	@dragstop="onDragStop"
		   	  	@resizing = "resizing"
		   	  	@activated="activated"
		   	  	@deactivated='deactivated'
		   	  	@dragging="dragging"
		   	  	@selectMore = "selectMore"
		   	  	class="box-item deactivated"
		   	  	:class="'widget'+index"
		   	  	
		   	  	>
			   	  	<div :style = 'item.style' style="width: 100%;height: 100%;overflow: hidden;display: flex;">
			   	  		<div class="label deactivated"  v-show= "hasLabel(item.tagname)">{{item.label}}</div><div 
				   	  		:style="{backgroundColor: item.style.backgroundColor}" 
				   	  		class="type deactivated"> {{index}} {{item.tagname}}</div>	 
			   	  	</div>
			   	  	  	 	
		   	  </div>
	   	  
			</div>
			
		
		<div class="tableline">
			
		</div>
		
	</div>
</div>
</template>

<script>
	import VueDraggableResizable from '../drag/vue-draggable-resizable.vue'
	import {mapGetters, mapActions } from 'vuex'
	
	export default {		
		name:'formcontent',
		props:['oid'],
		components:{
			'vue-draggable-resizable': VueDraggableResizable
		},
		data() {         
            return {
            	currentOid:null,
            	showBar:false,
            	grid:{
            		opacity:0.6
            	},
            	selectList:[],
            }
        },
        computed: {
			...mapGetters([
				'getForm'
			])
		},
        methods: {
        	...mapActions([
        		'_addWidget',
        		'_removeWidget',
        		'_savePosition'
        	]),
        	selectMore(obox){
        		// 用来多选盒子
        		// console.log(obox);
        		
        	},
            activated(i){
        		console.log('容器被选中',i.oid);  
        		this.currentOid = i.oid;
        		this.$bus.emit('show-setbox',i.oid);
        	},
        	deactivated(i){
        		console.log("容器失去选中",i.oid);          		       		
        	},
			onResizeStop(x,y,w,h){
				var that = this;
				// 选中元素缩放完毕
				console.log('缩放完毕',x,y,w,h);	
				that._savePosition({
					oid:that.currentOid,
					option:{x,y,w,h}
				})
			},
			onDragStop(x,y,w,h){
				var that = this;
				// 选中元素拖拽完毕 
				console.log('拖拽完毕',x,y,w,h);
				that._savePosition({
					oid:that.currentOid,
					option:{x,y,w,h}
				})
			},			
			resizing(x,y,w,h){
				// 缩放时
//				console.log('缩放时',x,y,w,h)
			},
			dragging(x,y){
				// 拖拽中
//				console.log('拖拽中',x,y);
			},						
			removeBox(id){
				// 删除一个盒子
				console.log('删除',id);
				this._removeWidget(id);				
			},
			dragCanvas($event){
				// 拖拽增加画布长度
				console.log($event);
			},
			hasLabel(tagname){
				let noLabel = ['button','h1','p','img'];
				if(noLabel.indexOf(tagname) >= 0 ){
					return false ;
				}else{
					return true;
				}
			},
			addBox(t){
				console.log("添加了一个");
				// 添加一个盒子 并设置默认属性
				var type = t.type || '',
					tagname = t.tagname || '';
				let that = this,
					description = 'description',
					label = 'label',
					bindFiled = '';
				let	oneWidget = {
						tagname,
						type,
						description,
						label,
						bindFiled,
						layout:{
							x:0,y:0,w:300,h:30
						},
						style:{
							backgroundColor:'',
							lineHeight: '',
							fontSize: '16px',
							color:'#333',
							borderStyle : 'solid',
							borderWidth : '1px',
							borderColor : '#233333',
							borderRadius : '0'
						}				
					}
				
				
				switch (tagname+type){
					case 'inputtext':
						oneWidget.layout.w = 300;
						oneWidget.layout.h = 40;
						oneWidget.label = oneWidget.description = '输入框';
						break;
					case 'textarea':
						oneWidget.layout.w = 300;
						oneWidget.layout.h = 150;
						oneWidget.label = oneWidget.description = '文本域';
						break;
					case 'inputcheckbox':
						oneWidget.layout.w = 300;
						oneWidget.layout.h = 80;
						oneWidget.label = oneWidget.description = '复选框';
						oneWidget.option = '选项1,选项2,选项3';
						break;
					case 'inputradio':
						oneWidget.layout.w = 300;
						oneWidget.layout.h = 80;
						oneWidget.label = oneWidget.description = '单选框';
						oneWidget.option = '选项1,选项2,选项3';
						break;
					case 'inputpassword':
						oneWidget.layout.w = 300;
						oneWidget.layout.h = 40;
						oneWidget.label = oneWidget.description = '密码框';
						break;
					case 'inputfile':
						oneWidget.layout.w = 300;
						oneWidget.layout.h = 40;
						oneWidget.label = oneWidget.description = '文件上传';
						break;
					case 'select':
						oneWidget.layout.w = 250;
						oneWidget.layout.h = 40;
						oneWidget.label = oneWidget.description = '下拉选择框';
						oneWidget.option = '选项1,选项2,选项3';
						break;
					case 'buttonsubmit':
						oneWidget.layout.w = 120;
						oneWidget.layout.h = 50;
						oneWidget.label = oneWidget.description = '提交';
						break;
					case 'buttonreset':
						oneWidget.layout.w = 120;
						oneWidget.layout.h = 50;
						oneWidget.label = oneWidget.description = '重置';
						break;
					case 'buttonbutton':
						oneWidget.layout.w = 120;
						oneWidget.layout.h = 50;
						oneWidget.label = oneWidget.description = '按钮';
						break;
					case 'h1':
						oneWidget.layout.w = 400;
						oneWidget.layout.h = 40;
						oneWidget.label = oneWidget.description = '标题';
						break;
					case 'img':
						oneWidget.layout.w = 200;
						oneWidget.layout.h = 250;
						oneWidget.label = oneWidget.description = '图片';
						oneWidget.src = "";
						break;
					case 'p':
						oneWidget.layout.w = 300;
						oneWidget.layout.h = 250;
						ooneWidget.label = neWidget.description = '段落';
						break;	
					default:
						break;
				}
				
				
				that._addWidget(oneWidget);
				
				
				
			},
			
			showList(){
				var x = this.getForm.widgetList;
//				console.log(this.getForm);
				console.log(JSON.stringify(this.getForm));
				for(var i=0 ; i < x.length;i++){
					console.log( JSON.stringify(x[i].layout));
				}
				
			},
			setGrid(obj){
				this.grid[obj.attr] = obj.value;
			},
            initEvent(){
            	var that = this ;
            	that.$bus.on('add-widget',that.addBox);
            	that.$bus.on('set-grid',that.setGrid);
				
			},
           	initData(){
           		var that = this ;
           		
           		
           		
           	}
        },      
        created() {  	
        	this.initEvent(); // 初始化总线事件
       		this.initData(); // 初始化数据
        },
        mounted() {
        	
            
        },		
		beforeDestory(){
			console.log("beforeDestory");
			this.$bus.off('add-widget');
			this.$bus.off('set-grid');
		},
		destoryed(){
			console.log("destoryed");
			console.log('this.currentOid', this.currentOid)
		}
	}
	
</script>

<style lang="less" scoped>
#formcontent{	
	width: 100%;	
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
			min-height: 540px;
			position: relative;
			width: 960px;
			.drag-bar{
				width: 100%;
				height: 12px;
				background-color: #C3C3C3;
				position: absolute;
				bottom: -10px;
				left: 0;
				cursor: s-resize;
				.drag-icon{
					text-align: center;
					height: 3px;					
					line-height: 3px;
					.point{
						display: inline-block;
						border: 1px solid ;	
						margin-left: 3px;
					}
				}
			}
		}
	  .active {
	    border: 1px dashed #28B779;
	  } 
	.vdr-content{
		width: 100%;
		height: 100%;
		background-color: aqua;
		font-size: 40px;
		box-sizing: border-box;
	}
	.no-select{
		-moz-user-select:none; /*火狐*/
         -webkit-user-select:none; /*webkit浏览器*/
         -ms-user-select:none; /*IE10*/
         -khtml-user-select:none; /*早期浏览器*/
         user-select:none;
	}
	.box-item {
		text-align: left;
		line-height: 20px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		
	}
	
	.label{
		display: inline-block;
		height: 100%;
		width: 80px;
		padding: 0 10px;
		box-sizing: border-box;
		background-color: #D9D9D9;
		border-right: solid 1px #EEEEEE;
		vertical-align: middle;
		font-size: 12px;
		
	}
	.type{
		display: inline-block;
		height: 100%;
		flex-grow: 1;
		background-color: white;
		box-sizing: border-box;
		vertical-align: middle;
		font-size: 12px;
		
	}
	}
	
}

.grid{
	    background:			
	        -webkit-linear-gradient(top,transparent 19px,#DFDFDF 20px),			
	        -webkit-linear-gradient(left,transparent 19px, #DFDFDF 20px);			
	    background-size: 20px 20px;
	    
	}
</style>