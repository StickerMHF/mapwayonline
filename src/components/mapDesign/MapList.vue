<template>
  <div class="container">
    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12" style="cursor: pointer; margin: 15px 0;">
      <div>{{ mapInfo.img }}</div>
      <div @click.prevent="toRender(mapInfo.id)">{{ mapInfo.name }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'maplist',
    props: [ 'mapInfo' ],
    data () {
      return {

      }
    },
    methods: {
      toRender (mapid) {
        console.log(mapid);
        this.$router.push('/user/:id/map/' + mapid);
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
