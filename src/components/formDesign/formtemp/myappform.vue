<template>
	<div id="myappform">
		
		
		<!---->
			<div class="form-main" id="form-main" :style="formdata.formConfig.style" v-if="formdata">
				<form :action="toUrl" method="post" @submit="checkForm">
					<div class="widget-item" 
						v-for="(item,index) in formdata.widgetList"
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
			</div>
			
		
		<!---->
		
		
	</div>
</template>

<script>
	export default {
		replace : true,
		name :'myappform',
		props : {
			formdata : {
				type : Object,
				default : {
					widgetList: [],
					formConfig: {
						formname: "",
						description: "",
						tablename: "",
						manner: "wide", // 画布风格
						mark:"备注",
						maxid:0,
						img:'', // base64的缩略图
						isinputform:true, // 判断创建的是否为录入 
						style: {
							width: "960px",
							height:'540px',
							minHeight: "540px",
							backgroundColor: "none",
							backgroundImage: "url(none)",
							backgroundPosition: "0 0",
							backgroundSize: "100% 100%"
						}
					}
				}
			}
		},
		data(){
			return {
				toUrl : 'http://localhost:80/fz/submit.php',
				
				
			}
		},
		methods:{
			checkForm(){
				
				var that = this;
				this.$confirm("您确定要提交吗？","提示",{
					confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
				}).then(()=>{
					return true;
				}).catch(()=>{
					return false;
				})
					
				
			}
		},
		created(){
			console.log("formdata",this.formdata);
			
			
			
		},
		mounted(){
			
		}
	}
</script>

<style lang="less" scoped>
.form-main {
		margin: 0 auto;
		position: relative;
		text-align: left;
	}

</style>