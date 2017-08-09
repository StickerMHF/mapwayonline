<template>

	<div id="form-index">
		<ContentLeft></ContentLeft>

		<div class="form_content form_content2">
			<div class="fc_title">
				<h3>{{title}}</h3>
			</div>
			<div>

			</div>
		</div>
		<div class="form_content form_content1">
			<el-tabs class="fc_tabs" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class="fc_tab" label="新建表单" name="first">
					<FormItem v-for="item in formdata" :child-data="item"></FormItem>
				</el-tab-pane>
				<el-tab-pane label="最近编辑" name="second">
					
				</el-tab-pane>
				<el-tab-pane label="表单共享" name="third">
					
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import ContentLeft from './ContentLeft.vue';
	import FormItem from './formlist/FormItem.vue';
	export default {
		name: 'form-index',
		components: {
			ContentLeft,
			FormItem
		},
		data() {
			return {
				formPath: '/formDesign/init/',
				title: "文件夹",
				activeName: 'first',
				formdata:[{
				    
					name:"空白表单",
					img:"",
					url:"/formDesign/init/new",
					status:27
				},
				{
					name:"使用已有表单",
					img:"",
					url:"/mapdesign/new",
					status:29
				}
				]

			}
		},
		methods: {
			editForm(oid) {
				this.$router.push(this.formPath + oid);
				console.log(this.formPath + oid)

			},
			handleClick(tab, event) {
				console.log(tab, event);
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

<style >
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
	.fc_tabs{
		padding: 40px 0 0 0;
    margin: 0 35px;
	}
	.el-tabs__active-bar{
	}
	.el-tabs__item{
		background: #eee;
	}
	.el-tabs__item.is-active {
    color: #fbfdff;
    background: #232c32 !important;
}

	.form_content1{
		
	}
	.form_content2{
		display: none;
	}
</style>