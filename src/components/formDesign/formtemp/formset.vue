<template>
	<div id="formset" >
		<!-- 用来设置属性的控件 -->
		<div class="formset_header" >
			<div v-if="mainset" class="main_top">
          <span class="main_canvas" :class="actived ? 'actived':''" @click = 'main_top'>画布设置</span>
          <span class="main_widget" :class="actived ? '':'actived'" @click="select_widget">控件元素</span>
      </div>
			<div v-if="!mainset" class="widget_top">
         <span>设置元素</span>
      </div>

		</div>


		<div class="formset_content">

				<div class="main-set" v-show="mainset">
          <div v-show="actived" class="main_canvas">

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
								<div class="tool-item label-table">
                  <div>
                    <span >绑定表名</span>
                    <span v-show="formConfig.tablename"  class="el-icon-circle-check" style="color: #42D885;"></span>
                  </div>
									<el-button style="background-color: #00958F;border: none;height: 34px;" type="success" @click="settable">设置</el-button>
								</div>

								<div class="tool-item canvas-style">
									<span class="tool-lable ">画布风格</span>
									<el-radio-group class="radio-group" v-model="formConfig.manner" @change = "setCanvas('manner')">
									    <el-radio class="radio-item" label="wide">宽屏 ( 16:9 )</el-radio>
									    <el-radio class="radio-item" label="vertical">竖屏 ( 9:16 )</el-radio>
									    <!--<el-radio class="r-item" label="suit" >自适应</el-radio>-->
									</el-radio-group>
								</div>
								<div class="tool-item gird-opacity" v-if="more_mainSet">
									<span class="tool-lable">网格透明度</span>
									   <el-slider style="width:100%" v-model="grid.opacity"
                          :format-tooltip="formatTooltip"
                          @change = "setGrid('opacity')">
                     </el-slider>
								</div>
								<div class="tool-item canvas-bgcolor">
									<span class="tool-lable">画布背景色</span>
									<el-color-picker class="color-picker" v-model="formConfig.style.backgroundColor"
                      @change = "setCanvasStyle('backgroundColor')" show-alpha>
                  </el-color-picker>
								</div>
								<div class="tool-item canvas-bgimg" >
                  <div class="cbit">
                    <span class="tool-lable">画布背景图</span>
                    <el-switch  on-text=""  off-text="" @change = "resetBgimg" v-model="has_bg_img"></el-switch>
                  </div>

									<div v-show="has_bg_img" >
										<div class="bg-thumbnail" style="margin-right: 10px;border: 1px solid #BFCBD9;display: inline-block;width: 94px;height: 75px;vertical-align: middle;">
											<!--需要展示已选中背景的缩略图-->
										</div>
										<el-button type="success" @click="bg_img = true">设置</el-button>
										<!--点击出来模态框-->
									</div>


								</div>
                <div class="moreSet"  >
                  <span @click="more_mainSet = !more_mainSet">{{more_mainSet ? "简单 <<":"高级 >>" }}</span>
                </div>
							</div>

          </div>
          <div v-show="!actived" class="main_widget">
              <!--控件列表-->
            <div class="widget-list">
              <div class="widget-item" v-for="(value,key,index) in getForm.widgetList" @click="showSetbox(value.id)">
                {{value.id}}-{{value.label}}-{{value.type}}
              </div>
            </div>

          </div>
				</div>

				<div class="form-set " v-show="!mainset">

					<div class="set-tool" v-if="getForm">
            <div  class="bindfield tool-item"  v-if='formConfig.tablename && hasFiled(currentSet.tagname)'>
              <span class="tool-lable">字段绑定</span>
              <el-select v-model="currentSet.bindFiled" clearable size='small' @change="setWidget('bindFiled')">
                <el-option
                  v-for="item in fieldList"
                  :key="item.name"
                  :label="item.aliasname"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>

            <div  class="bindlabel tool-item" >
              <span class="tool-lable">标签</span>
              <el-input type='text'  placeholder="绑定标签" v-model = 'currentSet.label'
                        @blur = 'setWidget("label")' size="small">
              </el-input>
            </div>
            <div v-if="more_widgetSet"  class="description tool-item" >
              <span class="tool-lable" >描述</span>
              <el-input v-model="currentSet.description" placeholder="输入描述"
                        @blur = "setWidget('description')" size="small">
              </el-input>
            </div>

            <div  class="bindoption tool-item"  v-if="currentSet.option">
              <span class="">自定义选项</span>
              <el-input type='text' size="small" v-model = 'currentSet.option' @blur = 'setWidget("option")'></el-input>
              <span style="font-size: 12px;color: #BFCBD9;">【注意】 选项之间请用英文的" , "隔开！ </span>
            </div>

            <div  class="imgsrc tool-item"  v-if="currentSet.src">
              <span class="">图片路径</span>
              <el-input type='text' size="small" v-model = 'currentSet.src' @blur = 'setWidget("src")'></el-input>
            </div>
                <!--<div  class="tool-item"  v-if="more_widgetSet">-->
									<!--<span class="tool-lable" >行高：</span>-->
									<!--<el-input-number  size="small"-->
										<!--v-model="currentSet.style.lineHeight"-->
										<!--@change="setWidgetStyle('lineHeight')"-->
										<!--:min="16" :max='666'>-->
									<!--</el-input-number>-->
								<!--</div>-->
								<div class="tool-item fontsize">
									<span class="tool-lable">字体大小</span>
									<el-input-number  size="small"
										v-model="currentSet.style.fontSize"
										 @change="setWidgetStyle($event,'fontSize')"
										 :min="12" :max='60'>
									</el-input-number>
								</div>
								<div class="tool-item fontcolor"  v-if="more_widgetSet">
									<span class="tool-lable">字体颜色</span>
									<el-color-picker
										v-model="currentSet.style.color"
										@change="setWidgetStyle($event,'color')"  show-alpha>
									</el-color-picker>
								</div>
								<div  class="tool-item bgcolor">
									<span class="tool-lable">背景颜色</span>

									<el-color-picker v-model="currentSet.style.backgroundColor"
									 	@change="setWidgetStyle($event,'backgroundColor')" show-alpha>
									</el-color-picker>
								</div>

								<div class="tool-item borderstyle"  v-if="more_widgetSet">
									<span class="tool-lable">边框样式</span>
									<el-select class="sel-borderstyle" v-model="currentSet.style.borderStyle" placeholder="请选择" size="small"
										@change ="setWidgetStyle($event,'borderStyle')"
										>
								     <el-option
								      v-for="item in [{'value': 'none','label': '无边框'}, {'value': 'solid','label': '————————'},{'value': 'dashed','label': '--------------------'},{'value': 'dotted','label': '....................................'}]"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								    </el-select>
								</div>


								<div class="tool-item borderwidth"  v-if="more_widgetSet">
									<span class="tool-lable">边框宽度</span>
									<el-input-number v-model="currentSet.style.borderWidth"
										size="small"
										@change = "setWidgetStyle($event,'borderWidth')"
										:min='0' :max='50'>
									</el-input-number>
								</div>

								<div class="tool-item bordercolor" v-if="more_widgetSet">
									<span class="tool-lable" >边框颜色</span>
									<el-color-picker v-model="currentSet.style.borderColor"
										@change = "setWidgetStyle($event,'borderColor')"  show-alpha>
									</el-color-picker>
								</div>

								<div class="tool-item borderradius">
									<span class="tool-lable">边框圆角</span>
									<el-input-number v-model="currentSet.style.borderRadius"
										size="small"
										:min='0' :max='5000'
										@change = "setWidgetStyle($event,'borderRadius')"
										>
									</el-input-number>
								</div>

              <div class="moreSet" @click="more_widgetSet = !more_widgetSet" >
                {{ more_widgetSet ? "简单<<":"高级>>" }}
              </div>



					</div>

				</div>

    </div>


		<!--数据表设置模态框-->
		<transition name='el-zoom-in-center'>
			<div class="model-box table-box" v-show ='bg_table' >
				<div class="bg-table-set">
					<div class="model-header">
						<span> 数据源绑定 </span>
						<el-button @click="bg_table = false" type="text"> × </el-button>
					</div>
					<div class="model-content">

            <div class="modelway"  v-if="!formConfig.isinputform">
               <!--<span>是否使用数据模型：</span>-->
               <!--<el-switch-->
                 <!--v-model="data_model"-->
                 <!--@change = "getList"-->
                 <!--on-text=""-->
                 <!--off-text="">-->
               <!--</el-switch>-->
              <div class="chooseway" >
                <span class="wayitem choose-table" :class="data_model ? '':'actived'" @click="bindtabel">绑定数据表</span>
                <span class="wayitem choose-model"  :class="data_model ? 'actived':''" @click="bindmodel">绑定数据模型</span>
              </div>

            </div>

            <div class="tableway" v-if="!data_model">
              <div>

                <h5>选择绑定表：</h5>
                <el-select class="sel-box"  @change="setCanvas('tablename')"
                            v-model="formConfig.tablename"
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
                <el-select class="sel-box" @change="setCanvas('selectfield')"
                            v-model="formConfig.selectfield"
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

            <div class="datamodel" v-if="data_model && !formConfig.isinputform">
                <!--数据模型方式-->
              <h5>选择数据模型：</h5>
              <div class="select-model">
                <el-select class="sel-box"  @change="setCanvas('tablename')"
                            v-model="formConfig.tablename"
                            placeholder="请选择请选择" >
                  <el-option
                    v-for="item in dataModelList"
                    :key="item.id"
                    :label="item.modelname"
                    :value="item.id">
                  </el-option>

                </el-select>
              </div>
              <div class="select-field">
                <h5>选择数据模型字段：</h5>
                <el-select class="sel-box"  @change="setCanvas('selectfield')"
                            v-model="formConfig.selectfield"
                            placeholder="请选择请选择" >
                  <el-option
                    v-for="item in modelfieldList"
                    :key="item.index"
                    :label="item.namecomment"
                    :value="item.name">
                  </el-option>

                </el-select>
              </div>
            </div>


					</div>
					<div class="model-footer">
						<el-button class="ok" type="success" @click="chooseModel">确 定</el-button>
						<el-button class="cancel" @click="cancelModel" >取 消</el-button>
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
        actived:true,
        more_mainSet:false,
        data_model:false,
        more_widgetSet:false,
				bg_img:false,
				bg_table:false,
				has_bg_img:false,
				mainset:true,
        bg_imgtype:"myself", // 背景图选项卡名字
        currentOid: null, // 当前编辑的控件id 从1开始
        grid:{opacity:60},
        userDataList:[], // 获取用户已有的数据表
        dataModelList:[], // 获取用户数据模型表
				fieldList:[],// 数据表字段列表
        modelfieldList:[], //数据模型字段列表
				hasPx:['lineHeight','fontSize','borderWidth','borderRadius','height','width'],
        withoutField:['button','h1','img','p'],
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
        formConfig:{
          formname: "",
          description: "",
          tablename: "",
          datamodel:false,
          manner: "wide", // 画布风格
          mark:"备注",
          maxid:0,
          img:'', // base64的缩略图
          isinputform:true, // 判断创建的是否为录入
          selectfield:'mapwayid', // 根据具体的某一个字段展示数据
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
        imgofbg:{
          myself:[],
          dark:[
            {url:'http://t.bitools.cn/bi/asset/default/images/s_1.jpg'},
            {url:'http://t.bitools.cn/bi/asset/default/images/s_2.jpg'},
            {url:'http://t.bitools.cn/bi/asset/default/images/s_3.jpg'},
            {url:'http://t.bitools.cn/bi/asset/default/images/s_4.jpg'},
            {url:'http://t.bitools.cn/bi/asset/default/images/s_5.jpg'},
          ],
          light:[
            {url:'http://t.bitools.cn/bi/asset/default/images/q_1.jpg'},
            {url:'http://t.bitools.cn/bi/asset/default/images/q_2.jpg'},
            {url:'http://t.bitools.cn/bi/asset/default/images/q_3.jpg'},
            {url:'http://t.bitools.cn/bi/asset/default/images/q_5.jpg'},
            {url:'http://t.bitools.cn/bi/asset/default/images/q_4.jpg'}
          ]
        },// 背景图列表
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
      main_top(){
        // 点击画布设置
        this.actived = true;
      },
      select_widget(){
        // 点击元素时
        this.actived = false;
      },
      chooseModel(){ // 数据绑定确定按钮
        this.bg_table = false;
        this._setCanvas({attr:'datamodel',value:this.data_model});
        if(this.getForm.formConfig.tablename !==''){
          if(this.getForm.formConfig.isinputform){
            this.$message('绑定数据成功！')
          }else{
             if(this.getForm.formConfig.selectfield !==''){
               this.$message('绑定数据成功！')
             }
          }
        }

      },
      cancelModel(){ // 数据绑定取消按钮
        this.bg_table = false;
        this.data_model = false;
        this.formConfig.tablename = '';
        this.formConfig.selectfield = 'mapwayid';
        this._setCanvas({attr:'tablename',value:''});
        this._setCanvas({attr:'selectfield',value:'mapwayid'});
        this._setCanvas({attr:'datamodel',value:false});
      },
      bindtabel(){
        this.data_model = false;
        this.formConfig.tablename = '';
        this.formConfig.selectfield = 'mapwayid';
        this._setCanvas({attr:'tablename',value:''});
        this._setCanvas({attr:'selectfield',value:'mapwayid'});

        // 获取数据表列表
        /***
         this.initData(function(that){
                  for(let index in that.userDataList){
                    if(that.userDataList[index].value === that.formConfig.tablename){
                      that.formConfig.tablename = that.userDataList[index].label;
                    }
                  }
                });
         */
      },
      bindmodel(){
        this.data_model = true;
        this.formConfig.tablename = '';
        this.formConfig.selectfield = 'mapwayid';
        this._setCanvas({attr:'tablename',value:''});
        this._setCanvas({attr:'selectfield',value:'mapwayid'});
        // 获取数据模型的列表
        this.$http.get('datamodel').then((res)=>{
          if(res.data.result){
            this.dataModelList = res.data.data;
            console.log('数据模型表',this.dataModelList)
          }else{
            console.log(res.data.message);
          }

        }).catch((err)=>{
          console.log(err);
        })
      },
      hasFiled(tagname){
			   return  this.withoutField.indexOf(tagname) < 0
      },
			formatTooltip(val){
				 return val / 100;
			},
			showSetbox(oid){
				this.mainset = false;
				this.currentOid = oid;
        		this.currentSet = this.cloneObj(this.getForm.widgetList[oid]);
        		for(let attr in this.currentSet.style){
        			if(this.hasPx.indexOf(attr) >= 0){
        				this.currentSet.style[attr] = parseInt(this.currentSet.style[attr]);
        			}
        		}
			},
			setGrid(attr){
        let value = this.grid[attr] / 100;
				this.$bus.emit("set-grid",{attr,value});
			},
			setWidgetStyle($event,oattr){
				//设置的样式
				console.log("设置控件样式",$event,oattr);
        let value = $event;
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
        let that = this;
				let value = that.formConfig[attr];

				if(attr === 'tablename' && this.formConfig[attr] !== ''){
            if(this.data_model){ //数据模型获取字段列表
 //          this.modelfieldList = JSON.parse(res.data.resultobj);
              this.dataModelList.forEach(function (item) {
                if(item.id === value){
                  that.modelfieldList = JSON.parse(item.resultobj);
                  that.fieldList = that.modelfieldList;
                  console.log('数据模型字段',that.modelfieldList);
                }
              })

            }else{ // 数据表获取字段列表
              let url = 'datacenter/datas/'+ value+'/field '
              that.$http.get(url,{})
                .then((res)=>{
                  console.log('表字段',res.data.data);
                  that.fieldList = res.data.data;
                }).catch((err)=>{
                console.log(err);
              });
            }


				};

				that._setCanvas({attr,value});


			},
			setCanvasStyle(attr){
        let that = this;
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
			settable(){ //绑定数据表或者数据模型
				this.bg_table = true;
				this.initData(function(){
				  if(this.formConfig.datamodel){
            for(let index in this.dataModelList){
              if(this.dataModelList[index].id === this.formConfig.tablename){
                this.formConfig.tablename = this.dataModelList[index].name;
                console.log(this.formConfig.tablename);
              }
            }
          }else{
            for(let index in this.userDataList){
              if(this.userDataList[index].id === this.formConfig.tablename){
                this.formConfig.tablename = this.userDataList[index].name;
                console.log(this.formConfig.tablename);
              }
            }
          }

				});
			},
			initEvent(){
				// 初始化你的所有总线事件
        let that = this;
				that.$bus.on('show-setbox',that.showSetbox);

			},
			initData(cb){
				 // 初始化你的数据
        let that = this;
        this.$http.get('datacenter/datas').then((res)=>{
          if(res.data.result){
            console.log('数据表',res.data.data);
            that.userDataList = res.data.data;
            if(typeof cb === "function"){
              cb();
            }
          }else{
            console.log(res.data.message);
          }

            }).catch((err)=>{
              console.log(err);
            });
        this.$http.get('datamodel').then((res)=>{
            if(res.data.result){
              that.dataModelList = res.data.data;
              console.log('数据模型表',this.dataModelList)
            }else{
              console.log(res.data.message);
            }

          }).catch((err)=>{
            console.log(err);
          })

	  		},

	  		cloneObj(obj){  // 深拷贝
          let str, newobj = obj.constructor === Array ? [] : {};
			    if(typeof obj !== 'object'){
			        return;
			    } else if(window.JSON){
			        str = JSON.stringify(obj), //系列化对象
			        newobj = JSON.parse(str); //还原
			    } else {
			        for(let i in obj){
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
      this.data_model =this.formConfig.datamodel ;
//		console.log( "set",this.formConfig);
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
.actived{
  background-color: #00958F;
  color: white;
}
#formset{
  .el-input-number .el-input__inner{
    padding-right: 35px !important;
    padding-left: 45px !important;
  }
  .el-input-number .el-input-number__decrease{
    left: 0 !important;
  }
	position: relative;
	height: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	width:300px;
  box-sizing: border-box;
	background-color: #FFFFFF;
  .formset_header{
    height: 60px;
    box-sizing:border-box ;
    background-color: #F8F8F8;
    padding:15px;
    .widget_top{
      display: inline-block;
      width: 100%;
      height: 35px;
      position: relative;
      line-height: 35px;
      font-size: 14px;
      border: 1px solid #EEEEEE
    }
    .main_top{
      font-size: 0;
      border: 1px solid #D8D8D8;
      border-radius: 4px;
      overflow: hidden;
      span{
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
        width: 50%;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
    }

  }
  .formset_content{
    position: relative;
    box-sizing: border-box;
    padding: 20px 15px;
    .main-set{ // 画布设置的样式
      width: 100%;
      .main_canvas{
        width: 100%;
        .set-tool{
          width: 100%;
          .tool-item{
            width: 100%;
            font-size: 14px;
            .tool-lable{
              display: block;
              text-align: left;
            }
          }
          .label-table{
            display: flex;
            line-height: 32px;
            justify-content: space-between;
            vertical-align: middle;
            padding: 10px 0 15px;
          }
          .canvas-style{
            text-align: left;
            padding-top: 5px;
            padding-bottom: 5px;

            .radio-group{
                text-align: left;
              .radio-item{
                  width: 100%;
                  margin: 0;
                  text-align: left;
                  height: 45px;
                  line-height: 45px;
                .el-radio__input.is-checked .el-radio__inner{
                  border-color: #dfe6ec!important;
                  background-color: #fbfdff!important;
                  &::after{
                    background-color:#00958f!important;
                  }
                }
              }
            }
          }
          .gird-opacity{
            padding-top: 10px;
            padding-bottom: 10px;

          }
          .canvas-bgcolor{
            display: flex;
            justify-content: space-between;
            line-height: 36px;
            padding-top: 10px;
            padding-bottom: 16px;
            .tool-lable{
              display: inline-block;
              text-align: left;
            }
            .color-picker{
              vertical-align: middle;
            }
          }
          .canvas-bgimg{
            padding: 10px 0 20px;
            .tool-lable{
              display: inline-block;
              text-align: left;

            }
            .cbit{
              display: flex;
              padding-bottom: 6px;
              justify-content: space-between;
            }
          }
        }
      }
    }
    .form-set{ // 表单控件设置样式
      text-align: left;
      .tool-item{
        padding-bottom: 10px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        .tool-lable{
          display: inline-block;
          padding-bottom: 10px;
        }
        .sel-borderstyle{
          width: 130px;
        }
      }









    }
    .moreSet{
      height: 30px;
      text-align: right;
      span{
        cursor: pointer;
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
		width: 600px;
		height: 600px;
		top: 100px;
		margin-left: -300px;
		left: 50%;
		border-radius: 5px;
		background-color: #FFFFFF;
		overflow:hidden;
		.model-header{
			height: 50px;
			padding-left: 30px;
			font-size: 16px;
			border-bottom: 1px solid #ececec;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.model-content{
			height: 350px;
			overflow: hidden;
			text-align: left;
			padding: 10px 30px 0;
      .sel-box{
        width: 100%;
      }
      .modelway{
        width: 100%;
        padding-top: 4px;
        padding-left: 10px;
        .chooseway{
          height: 30px;
          width: 240px;
          font-size: 0;
          box-sizing: border-box;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #d8d8d8;
          background-color: #F7F7F7;
          .wayitem{
            font-size: 14px;
            display: inline-block;
            width: 50%;
            height: 100%;
            text-align: center;
            line-height: 28px;
            cursor: pointer;
          }
        }
      }
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
			position: absolute;
      bottom: 30px;
      left: 0;
      width: 100%;
      .ok{
        background-color: #00958F;
        border: none;
        width: 100px;
        height: 40px;
        margin-right: 20px;
      }
      .cancel{
        background-color: #F8F8F8;

        border: 1px solid #EEEEEE;
        margin-left: 20px;
        width: 100px;
        height: 40px;
      }
		}

	}
}
  .table-box{

  }


}

</style>
