<template>
	<div id="formpreview">
		
		<div class="nav" >
			<router-link :to="{name:'formdesigninit'}"><el-button>编辑 </el-button></router-link>
		</div>
		<div class="myform ">
			<div class="form-header">
				<h1>{{formConfig.name}}</h1>
				<p>{{formConfig.description}}</p>
			</div>
			<div class="form-main" :style="formConfig.style">
				<form :action="toUrl" method="post">
					
					
				
					<div class="widget-item" 
						v-for="(item,index) in widgetList"
						:key = "item.tagname"
						:style="{'width':item.layout.w,'height':item.layout.h,'top':item.layout.y,'left':item.layout.x}"
						style="position: absolute;overflow: hidden;"
						>
						
						<!--<div :is="item.tagname" 
							:type='item.type ? item.src : ""' 
							:style="item.style" 
							:src="item.src ? item.src : ''"
							style="width: 100%;height: 100%;box-sizing: border-box;	">
							<option v-for="o in item.option" v-if="item.option" :key="o" :value="o">{{o}}</option>
							
						</div>-->
						<!--根据类型渲染不同的控件-->	
						<!--输入框-->
						<label  v-if="item.tagname === 'input' && item.type === 'text'" style="display: flex;height: 100%;">
							<span style="display: inline-block;margin-right:5px;min-width: 75px;vertical-align: middle;box-sizing: border-box;">{{item.label}}</span>
							<div
								:is="item.tagname" type='text'
								:style="item.style"	
								:name = "item.bindFiled"
								style="flex-grow: 1;height: 100%;box-sizing: border-box;outline: hidden;"
								>
							</div>					
						</label>
						<!--密码框-->
						<label  v-if="item.tagname === 'input' && item.type === 'password'"  style="display: flex;height: 100%;">
							<span style="display: inline-block;margin-right:5px;min-width: 75px;vertical-align: middle;box-sizing: border-box;">{{item.label}}</span>
							<div
								:is="item.tagname" type='password'
								:style="item.style"	
								:name = "item.bindFiled"
								style="flex-grow: 1;height: 100%;box-sizing: border-box;outline: hidden;"
								>
							</div>						
						</label>
						<!--文件上传-->
						<label  v-if="item.tagname === 'input' && item.type === 'file'" style="display: flex;height: 100%;">
							<span style="display: inline-block;margin-right:5px;min-width: 75px;vertical-align: middle;box-sizing: border-box;">{{item.label}}</span>
							<div
								:is="item.tagname" type='file'
								:style="item.style"	
								:name = "item.bindFiled"
								style="flex-grow: 1;height: 100%;box-sizing: border-box;"
								>
							</div>						
						</label>
						<!--文本域-->
						<label  v-if="item.tagname === 'textarea'" style="display: flex;height: 100%;">
							<span style="display: inline-block;margin-right:5px;min-width: 75px;vertical-align: middle;box-sizing: border-box;">{{item.label}}</span>
							<div
								:is="item.tagname"
								:style="item.style"	
								:name = "item.bindFiled"
								style="flex-grow: 1;height: 100%;box-sizing: border-box;"
								>
							</div>						
						</label>
						<!--下拉选择框-->
						<label  v-if="item.tagname === 'select'" style="display: flex;height: 100%;">
							<span style="display: inline-block;margin-right:5px;min-width: 75px;vertical-align: middle;box-sizing: border-box;">{{item.label}}</span>
							<div
								:is="item.tagname"
								:style="item.style"		
								:name = "item.bindFiled"
								style="flex-grow: 1;height: 100%;box-sizing: border-box;"
								>
								<option v-for="o in item.option" :key = "o" :value="o" >{{o}}</option>
							</div>						
						</label>	
						<!--复选框-->
						<div v-if="item.tagname === 'input' && item.type === 'checkbox'"
							 style="height: 100%;width: 100%; display: flex;box-sizing: border-box;">	
							<span style="display: inline-block;margin-right:5px;min-width: 75px;">{{item.label}}</span>
							<div :style="item.style" style="flex-grow: 1;height: 100%;box-sizing: border-box;">
								<label  v-for="o in item.option" :key="o" >
									<div :is="item.tagname" :value="o" type='checkbox' :name = "item.bindFiled + '[]'"></div>
									{{o}}
								</label>
							</div>
						</div>
						<!--单选框-->
						<div v-if="item.tagname === 'input' && item.type === 'radio'" 
							 style="height: 100%;width: 100%; display: flex;box-sizing: border-box;">
							 <span style="display: inline-block;margin-right:5px;min-width: 75px;">{{item.label}}</span>
							 <div :style="item.style" style="flex-grow: 1;height: 100%;box-sizing: border-box;">
							 	<label  v-for="o in item.option" :key="o">
									<div :is="item.tagname" :value="o" type='radio' :name = "item.bindFiled"></div>
									{{o}}
								</label>
							 </div>
						</div>
						<!--按钮-->
						<div
							:is="item.tagname"
							:type='item.type'
							v-if="item.tagname === 'button'" style="width: 100%;height: 100%;" :style="item.style">
							{{item.label}}
						</div>
						<!--标题-->
						<div :is ="item.tagname" v-if="item.tagname === 'h1'" :style="item.style" style="width: 100%;height: 100%;box-sizing: border-box;"> 
							{{item.description}}
						</div>
						<!--段落-->
						<div :is="item.tagname" v-if="item.tagname === 'p'" :style="item.style" 
							style="width: 100%;height: 100%;box-sizing: border-box;">
							{{item.description}}
						</div>
						<!--图片-->
						<div :is="item.tagname" v-if="item.tagname === 'img'" 
							:style="item.style" 
							:src="item.src ? item.src : ''"
							:alt = "item.description"
							style="width: 100%;height: 100%;box-sizing: border-box;">
							
						</div>
					
					
					
					
					</div>
	
				</form>
				
			</div>
			<div class="form-footer">
				
			</div>
			
			
		</div>
		
		
		
		
		
		
		
	</div>
</template>

<script>
	import {mapGetters, mapActions } from 'vuex'
	export default {
		name:'formpreview',
		computed: {
			...mapGetters([
				'getForm'
			])
		},
		components:{},
		data(){
			return {
				oneForm:{},
				toUrl:"", // 数据提交的接口地址
				formConfig:{},
				widgetList:[]
			}
		},
		methods:{
			getFormInfo(){
				
				var that = this;
				console.log(this.$route.params.id);
				that.$http.get('http://localhost/fz/json.php?f=oneform',{})
				.then((res)=>{
//		        	console.log('字段',res);       		
		     		that.oneForm = res.data[0];
		     		that.restoreCanvas();
					that.restoreWidget();
		        }).catch((err)=>{
		        	console.log(err);
		        });	 
	
			},
			restoreCanvas(){
				// 还原布局的画布
				this.formConfig = this.oneForm.formConfig;
				this.toUrl =  'http://192.168.0.217:8082/mapwayonline/TBUSER000001/datacenter/datas/'+this.formConfig.bindTable + "/insert";	
//				this.toUrl = "http://localhost:80/fz/submit.php"
			},
			restoreWidget(){
				// 还原控件
				this.widgetList = this.oneForm.widgetList;
				let wl = this.widgetList;
				for(var i=0;i<wl.length;i++){
					// 布局中添加单位px
					wl[i].layout.x = wl[i].layout.x +'px';
					wl[i].layout.y = wl[i].layout.y +'px';
					wl[i].layout.w = wl[i].layout.w +'px';
					wl[i].layout.h = wl[i].layout.h +'px';
					// option字符串 转化为对应的数组
					if(wl[i].option){
						wl[i].option = wl[i].option.split(',');
					}
					
					
					
				}
				
//				console.log(wl);
				
				
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
			
//			console.log(this.$router)
			var id = this.$route.params.id;
			
			if(id === 'new'){
				console.log('new');
				this.oneForm = this.cloneObj(this.getForm); // new 说明是来自正在编辑的内容预览 
				this.restoreCanvas();
				this.restoreWidget();
			}else if(id === 'none'){				
				console.log('没有任何数据'); 
				alert('没有任何数据');
				return ;
			}else{
				this.getFormInfo(); // 获取用户指定的某一条form数据
			}
			
			
		},
		mounted(){
			
			
		}
	}
</script>

<style lang="less" scoped>
#formpreview{
	
	.nav{
		height: 40px;
		background-color: rgba(0,0,0,0.5);
		margin-bottom: 20px;
		padding: 5px 40px;
		text-align: right;
	}
	.form-header{
		text-align: center;
	}
	.form-main {
		margin: 0 auto;
		position: relative;
		text-align: left;
	}
}		
</style>