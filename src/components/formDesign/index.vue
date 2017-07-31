<template>
	<div id="form-index">
		
		<h2>表格列表</h2>
		
	
		<el-button @click="editForm('new')">新建表</el-button>
		<ul>
			<li>
				<el-button @click="editForm(1)">1</el-button>
			</li>
			<li><el-button @click="editForm(2)">2</el-button></li>
			<li><el-button @click="editForm(3)">3</el-button></li>
			
		</ul>
		
		
		
		
	</div>
</template>

<script>
	export default {
		name:'form-index',
		components:{},
		data(){
			return {
				formPath:'/formDesign/init/'
			
				
			}
		},
		methods:{
			editForm(oid){				
				this.$router.push(this.formPath+oid);
				console.log(this.formPath+oid)
			}
		},
		created(){
			
		},
		mounted(){
			
		}
	}
</script>

<style scoped>


</style>