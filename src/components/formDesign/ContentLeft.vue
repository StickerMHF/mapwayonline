<template>
	<div id="content-left">
	<div class="cl_head">
	<h2>表单</h2>
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
}
.cl_head h2{
	float: left;
    font-size: 14px;
    margin-right: 10px;
    font-weight: bold;
    color: #333;
}
</style>