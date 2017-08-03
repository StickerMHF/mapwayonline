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
<style>
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
    overflow-y: scroll;
  }
  .el-message-box__header {
    		padding: 0px !important;
    	}
    	
    	.el-message-box__title {
    		padding: 16px !important;
    		font-size: 14px !important;
    color: #555 !important;
    	}
    	
    	.el-message-box__content {
    		border: 1px solid #eee;
    		padding: 20px 10px;
    	}
    	
    	.el-message-box {
    		width: 480px !important;
    	}
    	.el-message-box__btns {
    text-align: center;
}
.el-button {
    padding: 7px 24px;
}
</style>
