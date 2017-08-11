<template>

	<div id="data-index">
		<ContentLeft @getByTree="getByTreepid" @backToDataList="backToDataList"></ContentLeft>

		<div id="data_content2" class="data_content data_content2">
			<div class="dc_title">
				<h3>{{classifydata.title}}</h3>
			</div>
			<div class="dc_content">
				<DataShowModel v-for="item in classifydata.data" :key="item.id"  :child-data="item"></DataShowModel>
			</div>
		</div>
		<div id="data_content1" class="data_content data_content1">
			<el-tabs class="dc_tabs" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class="dc_tab" label="数据列表" name="first">
					<DataShowModel v-for="item in datadata.create" :key="item.id"  :child-data="item"></DataShowModel>
				</el-tab-pane>
				<el-tab-pane label="最近编辑" name="second">
					<DataShowModel v-for="item in datadata.recently" :key="item.id"  :child-data="item"></DataShowModel>
				</el-tab-pane>
				<el-tab-pane label="新建数据" name="third">
					<div class="dc_createdata">
					<el-tabs v-model='activeName2' class='getDataWays' >
						<el-tab-pane label='MapWayServer' name='w1'>
							<mws-box v-on:refreshdata='gotab'></mws-box>
						</el-tab-pane>
						<el-tab-pane label='上传Excel' name='w2'>
							<excelfile-box v-on:refreshdata='gotab'></excelfile-box>
						</el-tab-pane>
						<el-tab-pane label='shapefile' name='w3'>
							<shapefile-box v-on:refreshdata='gotab'></shapefile-box>
						</el-tab-pane>
						<!--数据库方式正在开发中。。。-->
						<!-- <el-tab-pane label='数据库' name='w4'>
				              <datalibrary-box></datalibrary-box>
				        </el-tab-pane> -->
						<el-tab-pane label='自定义数据' name='w5'>
							<customdata-box v-on:refreshdata='gotab'></customdata-box>
						</el-tab-pane>
					</el-tabs>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script scoped>
	import ContentLeft from './ContentLeft.vue';
	import DataShowModel from '../common/DataShowModel.vue';
	import shapefileBox from './dataset/shapefilebox.vue'
	import excelfileBox from './dataset/excelfileBox.vue'
	import customdataBox from './dataset/customdataBox.vue'
	import datalibraryBox from './dataset/datalibrarybox.vue'
	import mwsBox from './dataset/mwsdatabox.vue'
	export default {
		name: 'data-index',
		components: {
			ContentLeft,
			DataShowModel,
			shapefileBox,
			excelfileBox,
			customdataBox,
			datalibraryBox,
			mwsBox
		},
		data() {
			return {
				dataPath: '/dataDesign/init/',
				title: "文件夹",
				activeName: 'first',
				activeName2: 'w1',
				classifydata: {
					title: "未命名文件夹",
					data: [{
						dataid: 1,
						name: "创建数据",
						img: "/static/Index/img/newform.png",
						url: "/dataDesign/init/new",
						type: 26,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}]
				},
				datadata: {
					create: [{
						dataid: 1,
						name: "点",
						url: "/dataDesign/init/new",
						type: 2,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					},{
						dataid: 1,
						name: "线",
						url: "/dataDesign/init/new",
						type: 3,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					},{
						dataid: 1,
						name: "面",
						url: "/dataDesign/init/new",
						type: 4,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					},{
						dataid: 1,
						name: "表格",
						url: "/dataDesign/init/new",
						type: 9,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					},{
						dataid: 1,
						name: "表格",
						url: "/dataDesign/init/new",
						type: 9,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}],
					recently: [{
						dataid: 1,
						name: "录入表单",
						url: "/dataDesign/init/new",
						type: 9,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						dataid: 1,
						name: "共享表单",
						url: "/mapdesign/new",
						type: 3,
						usable: true,
						price: 0,
						author: "管理员",
						createdate: "2017-08-08"
					}],
					exchange: [{
						dataid: 1,
						name: "报销表单",
						img: "/static/Index/canvas_5977_tpl.png",
						url: "/dataDesign/init/new",
						type: 28,
						usable: true,
						price: 2,
						author: "管理员",
						createdate: "2017-08-08"
					}, {
						dataid: 1,
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
			editdata(oid) {
				this.$router.push(this.dataPath + oid);
				console.log(this.dataPath + oid);

			},
			handleClick(tab, event) {
				console.log(tab, event);
			},

			getByTreepid(node, store, data,childids) {
				debugger
				document.getElementById("data_content1").style.display = "none";
				document.getElementById("data_content2").style.display = "block";
				this.classifydata.title = data.name;
				console.log(node.data.id);

				console.log(childids);
				console.log(data.id);
				console.log(data.name + ";");
			},
			backToDataList(evt) {
				document.getElementById("data_content2").style.display = "none";
				document.getElementById("data_content1").style.display = "block";
			},
			 gotab(tabname){
        this.activeName = tabname
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
	#data-index {
		height: 100%;
		padding-left: 260px;
	}
	
	.data_content {
		height: 100%;
		margin-left: 1px;
	}
	
	.dc_title {
		height: 55px;
		box-shadow: 0 0 5px rgba(0, 0, 0, .1);
		background: #fff;
		position: relative;
		z-index: 10;
		border-bottom: 1px solid #eee;
		line-height: 55px;
	}
	
	.dc_title h3 {
		font-size: 16px;
		float: left;
		line-height: 55px;
		padding-left: 20px;
		color: #333;
		margin: 0;
	}
	
	.dc_tabs {
		padding: 40px 0 0 0;
		margin: 0 35px;
	}
	
	.data_content .el-tabs__active-bar {}
	
	.data_content .el-tabs__item {
		background: #eee;
	}
	
	.data_content .el-tabs__item.is-active {
		color: #fbfdff;
		background: #232c32 !important;
	}
	.data_content .el-tabs__content{
		margin-top: 30px;
	}
	.data_content1 {}
	
	.data_content2 {
		display: none;
	}
	
	.dct1_title {
		font-size: 14px;
		line-height: 30px;
		padding: 0 20px;
		font-weight: bold;
		width: 100%;
		float: left;
		color: #758697;
	}
	
	.dc_content {
		margin-top: 20px;
	}
	.dc_createdata{
		text-align: center;
	}
	
	.dc_createdata .el-tabs__item {
		background: #f9f9f9;
	}
	.dc_createdata .el-tabs__content{
		border-top: 1px solid #d1dbe5;
		margin-top: 0px;
	}
	
	.dc_createdata .el-tabs__item.is-active {
		color: #20a0ff;
    background: #ffffff !important;
	}
	.dc_createdata .el-tabs__header {
    border-bottom: 0px;
}
</style>