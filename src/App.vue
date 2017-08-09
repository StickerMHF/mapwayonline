<template>
  <div id="app">
  
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
body,html{
	margin: 0;
	padding: 0;
	position: relative;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 0;
  padding: 0;
}

a { 
  text-decoration: none; 
}
 /*滚动条 start*/  
  ::-webkit-scrollbar {  
    width: 4px;  
    height: 4px;  
    background-color: #F5F5F5;  
  }  
  /*定义滚动条轨道 内阴影+圆角*/  
  ::-webkit-scrollbar-track {  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    background: #fff ;  
  }  
  /*定义滑块 内阴影+圆角*/  
  ::-webkit-scrollbar-thumb {  
    border-radius: 3px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color:rgba(7, 170, 247, 0.7);  
  }  
  ::-webkit-scrollbar-thumb:hover {  
    border-radius: 3px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color:rgba(7, 170, 247, 1);  
  }  
</style>
