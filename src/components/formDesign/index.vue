<template>
	
	<div id="form-index">
		<ContentLeft></ContentLeft>
		
		
		
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