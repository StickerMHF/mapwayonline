<template>
  <div class="index">
    <nav-bar class="nav-bar"></nav-bar>
    <div id="whole_content">
    <router-view class="route-view"></router-view>
    </div>
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
    display: flex;
  }
  #whole_content{
  	position: absolute;
  	top: 0;
  	bottom: 0;
  	right: 0;
  	left: 60px;
  }
</style>
