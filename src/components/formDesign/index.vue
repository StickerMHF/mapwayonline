<template>

	<div id="form-index">
		<ContentLeft @getByTree="getByTreepid" @backToFormList="backToFormList" @getFormByCondition="getFormByCondition"></ContentLeft>

		<div id="form_content2" class="form_content form_content2">
			<div class="fc_title">
				<h3>{{classifydata.title}}</h3>
			</div>
			<div class="fc_content">
				<DataShowModel v-for="item in classifydata.data" :key="item.id" :child-data="item"></DataShowModel>
			</div>
		</div>
		<div id="form_content1" class="form_content form_content1">
			<el-tabs class="fc_tabs" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class="fc_tab" label="新建表单" name="first">
					<DataShowModel v-for="item in formdata.create" :key="item.id" :child-data="item"></DataShowModel>
					<div class="fct1_title">从共享中心新建表单</div>
					<DataShowModel v-for="(item,index) in formdata.exchange" :key="index" v-if="index<10" :child-data="item"></DataShowModel>
				</el-tab-pane>
				<el-tab-pane label="最近编辑" name="second">
					<DataShowModel v-for="item in formdata.recently" :key="item.id" :child-data="item"></DataShowModel>
				</el-tab-pane>
				<el-tab-pane label="共享中心" name="third">
					<DataShowModel v-for="item in formdata.exchange" :key="item.id" :child-data="item"></DataShowModel>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import ContentLeft from './ContentLeft.vue';
	import DataShowModel from '../common/DataShowModel.vue';
	export default {
		name: 'form-index',
		components: {
			ContentLeft,
			DataShowModel
		},
		data() {
			return {
				formPath: '/formDesign/init/',
				title: "文件夹",
				activeName: 'first',
				classifydata: {
					title: "未命名文件夹",
					data: [{
						formid: 1,
						name: "空白表单",
						img: "/static/Index/img/newform.png",
						url: "/formDesign/init/new",
						type: 26,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}]
				},
				formdata: {
					create: [{
						formid: 1,
						name: "空白表单",
						img: "/static/Index/img/newform.png",
						url: "/formDesign/init/new",
						type: 26,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "从已有表单创建",
						img: "/static/Index/img/newform.png",
						url: "/formDesign/init/new",
						type: 26,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}],
					recently: [{
						formid: 1,
						name: "录入表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 27,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "共享表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/mapdesign/new",
						type: 27,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}],
					exchange: [{
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: true,
						price: 2,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: true,
						price: 2,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: true,
						price: 2,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: true,
						price: 2,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: true,
						price: 1,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: true,
						price: 1,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: true,
						price: 1,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: true,
						price: 1,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: false,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: false,
						price: 2,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/formDesign/init/new",
						type: 28,
						usable: true,
						price: 2,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						formid: 1,
						name: "财务报表",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/mapdesign/new",
						type: 28,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}]
				}

			}
		},
		methods: {
			editForm(oid) {
				this.$router.push(this.formPath + oid);
				console.log(this.formPath + oid);

			},
			handleClick(tab, event) {
				console.log(tab, event);
			},

			getByTreepid(node, store, data, childids) {
				document.getElementById("form_content1").style.display = "none";
				document.getElementById("form_content2").style.display = "block";
				this.classifydata.title = data.name;
				console.log(node.data.id);
				console.log(childids);
				console.log(node.data.name + ";");
				console.log(data.id);
				console.log(data.name + ";");
			},
			getFormByCondition(type, name) {
				var that = this;
				this.classifydata.title = name;
				document.getElementById("form_content1").style.display = "none";
				document.getElementById("form_content2").style.display = "block";
				var url = this.$http.defaults.baseURL + 'TBUSER000001/formdesign/forms';
				that.$http.get(url).then((res) => {
					if(res.data.result) {
						var data = [{
							formid: 1,
							name: "空白表单",
							img: "/static/Index/img/newform.png",
							url: "/formDesign/init/new",
							type: 26,
							usable: true,
							price: 0,
							author: "管理员",
							createdate: "2017-08-08"
						}];
						for(var item in res.data.data) {
							data.push(res.data.data[item]);
						}
						that.classifydata.data = data;
					}
				});

			},
			backToFormList(evt) {
				document.getElementById("form_content2").style.display = "none";
				document.getElementById("form_content1").style.display = "block";
			}
		},
		created() {
			
		},
		mounted() {

			this.$Tools.html2images(document.getElementById("nav-bar"), function(canvas) {
				var imageData = canvas.toDataURL(1);
			});
		}
	}
</script>

<style>
	#form-index {
		height: 100%;
		padding-left: 260px;
	}
	
	.form_content {
		height: 100%;
		margin-left: 1px;
	}
	
	.fc_title {
		height: 55px;
		box-shadow: 0 0 5px rgba(0, 0, 0, .1);
		background: #fff;
		position: relative;
		z-index: 10;
		border-bottom: 1px solid #eee;
		line-height: 55px;
	}
	
	.fc_title h3 {
		font-size: 16px;
		float: left;
		line-height: 55px;
		padding-left: 20px;
		color: #333;
		margin: 0;
	}
	
	.fc_tabs {
		padding: 40px 0 0 0;
		margin: 0 35px;
	}
	
	.form_content .el-tabs__active-bar {}
	
	.form_content .el-tabs__item {
		background: #eee;
	}
	
	.form_content .el-tabs__item.is-active {
		color: #fbfdff;
		background: #232c32 !important;
	}
	
	.form_content1 {}
	
	.form_content2 {
		display: none;
	}
	
	.fct1_title {
		font-size: 14px;
		line-height: 30px;
		padding: 0 20px;
		font-weight: bold;
		width: 100%;
		float: left;
		color: #758697;
	}
	
	.fc_content {
		margin-top: 20px;
	}
</style>