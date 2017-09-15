<template>
  <div>
    <div class="container">

      <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12" style="cursor: pointer; margin: 15px 0; height: 100px;">
        <div>{{ datasetInfo.img }}</div>
        <!--<img v-bind:src="datasetInfo.img" alt="" style="height: 100px; width: 100px;">-->
        <div @click.prevent="getName(datasetInfo.id)">{{ datasetInfo.name }}</div>
      </div>

    </div>
  </div>
</template>


<script>
  export default {
    name: 'datasetlist',
    props: [ 'datasetInfo' ],
    data () {
      return {

      }
    },
    mounted: function () {
      console.log(this.datasetInfo)

    },
    methods: {
      getName (id) {
        let uid = this.$route.params.userid;
        this.GLOBAL.obj.uid = uid;
        console.log(id);
        this.$router.push('/user/' + uid + '/data/' + id + '/edit');
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
