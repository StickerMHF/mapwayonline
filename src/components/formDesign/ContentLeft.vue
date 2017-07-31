<template>
	<div id="content-left">
	<div class="cl_head">
	<h2>表单</h2>
	<div class="cl_header_menu dropdown">
		<i class="el-icon-plus "></i>
	</div>
	</div>
	</div>
</template>

<script>
	export default {
		name:'content-left',
		data(){
			return {
				formPath:'/formDesign/init/'
			}
		},
		methods:{
			
		},
		created(){
			
		},
		mounted(){
			
		}
	}
</script>

<style scoped>

#content-left{
	position: absolute;
    width: 220px;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    background: #f9f9f9;
    border-right: 1px solid #e5e9ed;
}
.cl_head{
	padding: 23px 18px 22px 18px;
    line-height: 22px;
    position: absolute;
    right: 0;
    left: 0;
}
.cl_head h2{
	float: left;
    font-size: 14px;
    margin-right: 10px;
    font-weight: bold;
    color: #333;
    margin: 0;
    padding: 0;
}
.cl_header_menu {
    float: right;
    position: relative;
    height: 16px;
    line-height: 16px;
}
.cl_header_menu i{
	font-size: 12px;
    line-height: 22px;
    color: #2093ef;
}
.cl_header_menu i:hover{
	cursor: pointer;
}
</style>