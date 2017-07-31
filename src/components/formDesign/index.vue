<template>
	
	<div id="form-index">
		<ContentLeft></ContentLeft>
		
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
import ContentLeft from './ContentLeft.vue';
	export default {
		name:'form-index',
		components:{ContentLeft},
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
			this.$Tools.html2images(document.getElementById("nav-bar"),function(canvas){
					var imageData = canvas.toDataURL(1);
				});
		}
	}
</script>

<style scoped>
#form-index{
	height: 100%;
}

</style>