<template>
  <div class="renderDiv" v-loading="renderLoading" element-loading-text="数据加载中">
    <div class="renderConfig">

    </div>
    <div class="renderMap">
      <render-map></render-map>
    </div>
    <div class="renderSet">
      <render-set></render-set>
    </div>
  </div>
</template>

<script>
  import RenderConfig from './RenderConfig.vue'
  import RenderMap from  './RenderMap.vue'
  import RenderSet from  './RenderSet.vue'

  export default {
    name: 'render',
    components: {
      'render-config': RenderConfig,
      'render-map': RenderMap,
      'render-set': RenderSet
    },
    data: function () {
      return {
        renderLoading: false,
      }
    },

    created () {
      this.initEvent();
    },

    mounted () {
      this.showRenderLoading();
    },

    beforeDestroy () {
      this.destroyEvent();
    },
    methods: {
      initEvent () {
        this.$bus.on('hide-render-loading', () => {
          this.renderLoading = false;
          console.log('hide loading')
        });
      },

      destroyEvent () {
        this.$bus.off('hide-render-loading');
      },

      showRenderLoading () {
        this.renderLoading = true;
        console.log('show loading');
      },
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
