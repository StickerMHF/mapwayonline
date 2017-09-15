<template>
	<div id="formset" >
		<!-- 用来设置属性的控件 -->
		<div style="height: 35px;line-height: 35px;font-size: 16px;border-bottom: 1px solid #BBBBBB;">
			<span v-if="mainset">设置画布</span>
			<span v-if="!mainset" style="display: inline-block;width: 100%;height: 35px;position: relative;" ><i @click='mainset=!mainset' class="el-icon-arrow-left" style="color: #0082E6;display: inline-block;width: 35px;height: 35px;line-height: 33px;font-size:20px;position: absolute;left: 2px;text-align: center;"></i> 设置元素</span>
		</div>
		<div style="position: relative; padding-top: 20px">

				<div class="main-set" v-show="mainset">



							<div class="set-tool">
								<!--<div  class="tool-item">-->
									<!--<span class="tool-lable">表名：</span>-->
									<!--<div>-->
										<!--<el-input size="small" style='width: 200px;'-->
											<!--v-model='formConfig.formname'-->
											<!--placeholder="请输入表名"-->
											<!--@blur = "setCanvas('formname')"-->
											<!--&gt;</el-input>-->
									<!--</div>-->
								<!--</div>-->

								<!--<div  class="tool-item">-->
									<!--<span class="tool-lable">描述：</span>-->
									<!--<div>-->
										<!--<el-input size="small" style='width: 200px;'-->
											<!--v-model='formConfig.description'-->
											<!--placeholder="请添加描述"-->
											<!--@blur = "setCanvas('description')"-->
											<!--&gt;</el-input>-->
									<!--</div>-->
								<!--</div>-->
								<!--<br />-->
								<div class="tool-item">
									<span v-show="formConfig.tablename"  class="el-icon-circle-check" style="color: #42D885;"></span>
									<span >绑定表名：<span v-if="formConfig.tablename">{{formConfig.tablename}}</span></span>
									<br />
									<br />
									<el-button style="margin-left: 20px;" type="success" @click="settable">设置</el-button>
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
								<div class="tool-item" v-if="more_mainSet">
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
                <div class="moreSet" @click="more_mainSet = !more_mainSet" >
                  {{more_mainSet ? "收 起 <<<":"高 级 >>>" }}
                </div>
							</div>

				</div>
				<div class="form-set " v-show="!mainset">

					<div class="set-tool" v-if="getForm">

            <div  class="" style="padding-left: 20px;">
              <span class="tool-lable">绑定标签：</span><br />
              <el-input type='text' v-model = 'currentSet.label' @blur = 'setWidget("label")'></el-input>
            </div>
            <div v-if="more_widgetSet"  class="" style="padding-left: 20px;" >
              <span class="tool-lable" >添加描述：</span><br />
              <el-input v-model="currentSet.description"
                        @blur = "setWidget('description')">
              </el-input>
            </div>
            <div  class="" style="padding-left: 20px;" v-if='formConfig.tablename'>
              <span class="tool-lable">绑定字段：</span><br />
              <el-select style='width: 120px;' v-model="currentSet.bindFiled" clearable size='small' @change="setWidget('bindFiled')">
                <el-option
                  v-for="item in fieldList"
                  :key="item.name"
                  :label="item.aliasname"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>

            <div  class="" style="padding-left: 20px;" v-if="currentSet.option">
              <span class="">自定义选项：</span><br /><br />
              <el-input type='text' v-model = 'currentSet.option' @blur = 'setWidget("option")'></el-input><br />
              <span style="font-size: 12px;color: #BFCBD9;">【注意】 选项之间请用英文的" , "隔开！ </span><br />
            </div>
                <div  class="tool-item"  v-if="more_widgetSet">
									<span class="tool-lable" >行高：</span>
									<el-input-number  size="small"
										v-model="currentSet.style.lineHeight"
										@change="setWidgetStyle('lineHeight')"
										:min="16" :max='666'>
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
								<div class="tool-item"  v-if="more_widgetSet">
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

								<div class="tool-item"  v-if="more_widgetSet">
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


								<div class="tool-item"  v-if="more_widgetSet">
									<span class="tool-lable">边框宽度：</span>
									<el-input-number v-model="currentSet.style.borderWidth"
										size="small"
										@change = "setWidgetStyle('borderWidth')"
										:min='0' :max='50'>
									</el-input-number>
								</div>

								<div class="tool-item" v-if="more_widgetSet">
									<span class="tool-lable" >边框颜色：</span>
									<el-color-picker v-model="currentSet.style.borderColor"
										@change = "setWidgetStyle('borderColor')"  show-alpha>
									</el-color-picker>
								</div>

								<div class="tool-item">
									<span class="tool-lable">边框圆角：</span>
									<el-input-number v-model="currentSet.style.borderRadius"
										size="small"
										:min='0' :max='5000'
										@change = "setWidgetStyle('borderRadius')"
										>
									</el-input-number>
								</div>

              <div class="moreSet" @click="more_widgetSet = !more_widgetSet" >
                {{ more_widgetSet ? "收 起 <<<":"高 级 >>>" }}
              </div>



					</div>

				</div>

    </div>


		<!--数据表设置模态框-->
		<transition name='el-zoom-in-center'>
			<div class="model-box" v-show ='bg_table' >
				<div class="bg-table-set">
					<div class="model-header">
						<span> 数据表选择 </span>
						<el-button @click="bg_table = false" type="text"> × </el-button>
					</div>
					<div class="model-content">
						<div>
							<h5>选择绑定表：</h5>
							<el-select  style='width: 200px;'
								@change="setCanvas('tablename')"
								v-model="formConfig.tablename" size='small'
								placeholder="请选择请选择" >

							    <el-option
							      v-for="item in userDataList"
							      :key="item.id"
							      :label="item.name"
							      :value="item.id">
							    </el-option>

							</el-select>
						</div>

						<div v-if="!formConfig.isinputform">
							<h5>选择查找源：</h5>
							<el-select  style='width: 200px;'
								@change="setCanvas('selectfiled')"
								v-model="formConfig.selectfiled" size='small'
								placeholder="默认为数据id" >

							    <el-option
							      v-for="item in fieldList"
							      :key="item.aliasname"
							      :label="item.aliasname"
							      :value="item.name">
							    </el-option>

							</el-select>



						</div>



					</div>
					<div class="model-footer">
						<el-button type="success" @click="bg_table = false">确定</el-button>
						<el-button @click="bg_table = false" >取消</el-button>
					</div>
				</div>



			</div>
		</transition>
		<!--背景设置的模态框 -->
		<transition name='el-zoom-in-center'>
			<div class="model-box" v-show ='bg_img' >
				<div class="bg-img-set">
					<div class="model-header">
						<span> 画布背景图 </span>
						<el-button @click="bg_img = false" type="text"> × </el-button>
					</div>

					<div class="model-content">
						<div>
							<el-tabs v-model="bg_imgtype" type="card">
							    <el-tab-pane label="我的背景图" name="myself" style="padding: 10px 25px 0;" >

							    	<div @click="upDataBgImg" class="updata" style="display: inline-block;text-align: center;width: 90px;height: 90px;border: 1px solid #EEEEEE;">
							    		<span style="display: inline-block;font-size: 40px;padding:10px 20px;line-height: 40px;width: 90px;box-sizing: border-box;"> + </span>
							    		<span >上传背景</span>
							    	</div>
							    	<ul v-if="imgofbg.myself">
							    		<li v-for="(item,index) in imgofbg.myself" class="bg-list">
							    			<div :style="{backgroundImage:'url('+ item.url+')'}" class="bg-item"
							    				@click="setCanvasBgStyle('myself',index)">

							    			</div>
							    		</li>
							    	</ul>
							    </el-tab-pane>
							    <el-tab-pane label="深色系背景" name="dark" style="padding: 10px 25px 0;">

							    	<ul v-if="imgofbg.dark">
							    		<li v-for="(item,index) in imgofbg.dark" class="bg-list">
							    			<div :style="{backgroundImage:'url('+ item.url+')'}" class="bg-item"
							    				@click="setCanvasBgStyle('dark',index)">

							    			</div>

							    		</li>
							    	</ul>
							    </el-tab-pane>
							    <el-tab-pane label="浅色系背景" name="light" style="padding: 10px 25px 0;">

							    	<ul v-if="imgofbg.light">
							    		<li v-for="(item,index) in imgofbg.light" v-if="imgofbg.light" class="bg-list">
							    			<div :style="{backgroundImage:'url('+ item.url+')'}" class="bg-item"
							    				@click="setCanvasBgStyle('light',index)">

							    			</div>
							    		</li>
							    	</ul>
							    </el-tab-pane>
							</el-tabs>


						</div>

					</div>
					<div class="model-footer">
						<el-button type="success" @click="bg_img = false">确定</el-button>
						<el-button @click="bg_img = false"	 >取消</el-button>
					</div>
				</div>
			</div>
		</transition>

	</div>
</template>

<script>


	import {mapGetters,mapActions} from 'vuex'

	export default {
		name:'formset',
		components:{},
		data(){
			return {
				formConfig:{
					formname: "",
					description: "",
					tablename: "",
					manner: "wide", // 画布风格
					mark:"备注",
					maxid:0,
					img:'', // base64的缩略图
					isinputform:true, // 判断创建的是否为录入
					selectfiled:'mapwayid', // 根据具体的某一个字段展示数据
					style: {
						width: "960px",
						height:'540px',
						minHeight: "540px",
						backgroundColor: "none",
						backgroundImage: "url(none)",
						backgroundPosition: "0 0",
						backgroundSize: "100% 100%"
					}
				},  // 画布的设置
        more_mainSet:false,
        more_widgetSet:false,
				grid:{opacity:60},
				bg_img:false,
				bg_imgtype:"myself",
				bg_table:false,
				has_bg_img:false,
				imgofbg:{
					myself:[],
					dark:[	{url:'http://t.bitools.cn/bi/asset/default/images/s_1.jpg'},
							{url:'http://t.bitools.cn/bi/asset/default/images/s_2.jpg'},
							{url:'http://t.bitools.cn/bi/asset/default/images/s_3.jpg'},
							{url:'http://t.bitools.cn/bi/asset/default/images/s_4.jpg'},
							{url:'http://t.bitools.cn/bi/asset/default/images/s_5.jpg'},
						],
					light:[ {url:'http://t.bitools.cn/bi/asset/default/images/q_1.jpg'},
							{url:'http://t.bitools.cn/bi/asset/default/images/q_2.jpg'},
							{url:'http://t.bitools.cn/bi/asset/default/images/q_3.jpg'},
							{url:'http://t.bitools.cn/bi/asset/default/images/q_5.jpg'},
							{url:'http://t.bitools.cn/bi/asset/default/images/q_4.jpg'}
						]
				},
				mainset:true,
				fieldList:[],
				hasPx:['lineHeight','fontSize','borderWidth','borderRadius','height','width'],
        userDataList:[], // 获取用户已有的数据表
        currentOid: null, // 当前编辑的控件id 从1开始
				currentSet : {
					id:1,
					type:'text',
					tagname:'input',
					description:'input',
					lebel:'label',
					bindFiled:"",
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
				this.$bus.emit("set-grid",{attr,value});
			},
			setWidgetStyle(oattr){
				//设置的样式
				console.log("设置控件样式",oattr);
				var value = this.currentSet.style[oattr];
				if(this.hasPx.indexOf(oattr) >= 0){
        			value = value + 'px'
        		}

				this._setWidgetStyle({
					oid: this.currentOid,
					attr: oattr,
					value
				})
			},
			upDataBgImg(){
				// 上传自己的背景图
				console.log('上传自己的背景图')
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
				if(attr === 'tablename' && this.formConfig[attr] !== ''){

						let url = 'TBUSER000001/datacenter/datas/'+ value+'/field '
						that.$http.get(url,{})
						.then((res)=>{
              console.log('字段',res);
            that.fieldList = res.data.data;
            }).catch((err)=>{
              console.log(err);
            });

				}
				that._setCanvas({attr,value});


			},
			setCanvasStyle(attr){
				var that = this;
				let value = that.formConfig.style[attr];
				that._setCanvasStyle({attr,value});
			},
			setCanvasBgStyle(type,urlindex){
				let url = this.imgofbg[type][urlindex].url || 'none';

				let value = 'url('+url+ ')';
				let attr = "backgroundImage";
				this._setCanvasStyle({attr,value});

			},
			resetBgimg(){ // 关闭背景图 重置为无背景

				if(this.has_bg_img === true){
					this._setCanvasStyle({attr:'backgroundImage',value:'url(none)'})
				}
			},
			settable(){ //
				this.bg_table = true;
				this.initData(function(that){
//					console.log('test', that.formConfig.tablename)
		     		for(var index in that.userDataList){
		     			if(that.userDataList[index].value == that.formConfig.tablename){
		     				that.formConfig.tablename = that.userDataList[index].label;

		     			}
		        	}
//			     	console.log(that.formConfig.tablename)

				}); // 获取到的用户列表

			},
			initEvent(){
				// 初始化你的所有总线事件
				var that = this;
				that.$bus.on('show-setbox',that.showSetbox);

			},
			initData(cb){
				 // 初始化你的数据
				 var that = this;
	  			this.$http.get('TBUSER000001/datacenter/datas').then((res)=>{
		        	console.log('表',res.data.data);
		     		that.userDataList = res.data.data;
		     		if(typeof cb === "function"){
		     			cb(that);
		     		}
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
			this.$bus.off('show-setbox'); // 创建之前 清除已有的事件
			this.formConfig = this.cloneObj(this.getForm.formConfig);
			console.log( "set",this.formConfig);
			this.initEvent();

		},
		mounted(){
//			console.log(this.getForm)
		},
		beforeDestory(){
			this.$bus.off('show-setbox');
		}

	}
</script>

<style lang="less" scoped>
.el-tabs__item{
	padding: 0!important;
}
#formset{
	position: relative;
	height: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	width:300px;
  box-sizing: border-box;
	background-color: #FFFFFF;
	.main-set{
		width: 100%;
		min-height: 500px;
		.set-tool{
      .moreSet{
        width: 100%;
        height: 25px;
        font-size: 14px;
        line-height: 25px;
        box-sizing: border-box;
        border: 1px solid #EEEEEE;
      }
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
      .moreSet{
        text-align: center;
        width: 100%;
        height: 25px;
        font-size: 14px;
        line-height: 25px;
        box-sizing: border-box;
        border: 1px solid #EEEEEE;
      }
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
	z-index: 1999;
	.bg-img-set,.bg-table-set{
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
			text-align: left;
			padding: 10px 20px 0;
			.bg-list{
				display: inline-block;
				padding: 10px;
			}
			.bg-item{
				background-position: 0 0;
				background-repeat: no-repeat;
				background-size: 120px 90px;
				width: 120px;
				height: 90px;
				display: inline-block;
			}
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
