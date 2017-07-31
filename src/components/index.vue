<template>
  <div class="index">
  		<nav-bar></nav-bar>
			<router-view></router-view>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
export default {
  name: 'index',
  components:{
  	'navBar':navBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index{		
		padding-left: 60px;
		overflow: hidden;
		height: 100%;
	}
	
</style>
