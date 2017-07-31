<template>
    <div class="renderDiv">
      <div class="renderMap">
        <render-map></render-map>
      </div>
      <div class="renderSet">
        <render-set></render-set>
      </div>
    </div>
</template>

<script>
  import RenderMap from  './RenderMap'
  import RenderSet from  './RenderSet'

  export default {
    name: 'render',
    components: { RenderMap, RenderSet },
    data: function () {
      return {

      }
    },
    mounted () {

    },
    methods: {

    }
  }
</script>

<style scoped>
  .renderDiv {
    display: flex;
    flex: 1;
    overflow: hidden;
    height: 100%;
  }

  .renderMap {
    flex: 0 0 75%;
    width: 75%;
  }

  .renderSet {
    flex: 1;
    overflow-y: scroll;
    background-color: #fff;
  }

</style>
