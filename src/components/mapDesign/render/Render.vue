<template>
  <div class="renderDiv" v-loading="renderLoading" element-loading-text="数据加载中">
    <div class="renderHeader">
      <render-header></render-header>
    </div>
    <div class="renderBody">
      <div class="renderConfig">
        <render-config></render-config>
      </div>
      <div class="renderMap">
        <render-map></render-map>
      </div>
      <div class="renderSet" id="renderSetDiv">
        <render-set></render-set>
      </div>
    </div>
  </div>
</template>

<script>
  import RenderHeader from './RenderHeader.vue'
  import RenderConfig from './RenderConfig.vue'
  import RenderMap from  './RenderMap.vue'
  import RenderSet from  './RenderSet.vue'

  export default {
    name: 'render',
    components: {
      'render-header': RenderHeader,
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

        this.$bus.on('show-render-loading', () => {
          this.renderLoading = true;
          console.log('show loading')
        });

        this.$bus.on('show-render-set', () => {
            this.showRenderSet();
        });
        this.$bus.on('hide-render-set', () => {
            this.hideRenderSet();
        });
      },

      destroyEvent () {
        this.$bus.off('hide-render-loading');
        this.$bus.off('show-render-loading');
        this.$bus.off('show-render-set');
        this.$bus.off('hide-render-set');
      },

      showRenderSet () {
        var renderSetDiv = document.getElementById('renderSetDiv');
        renderSetDiv.style.width = '350px';
      },

      hideRenderSet () {
          var renderSetDiv = document.getElementById('renderSetDiv');
          renderSetDiv.style.width = '0';
      },
    }
  }
</script>

<style scoped>
  .renderDiv {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .renderHeader {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: rgba(204, 224, 234, 1);
  }

  .renderBody {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  .renderConfig {
    width: 250px;
    background-color: rgba(204, 224, 234, 0.517647058823529);
  }

  .renderMap {
    flex-grow: 1;
  }

  .renderSet {
    /*width: 350px;*/
    width: 0;
    overflow-y: scroll;
    background-color: rgba(204, 224, 234, 0.517647058823529);
  }
</style>
