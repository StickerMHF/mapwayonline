<template>
  <div class="preview" v-loading="previewLoading" element-loading-text="数据加载中">
    <preview-map :layers="layersData" v-if="hasData"></preview-map>
  </div>
</template>

<script>
  import PreviewMap from '@/components/mapDesign/preview/PreviewMap.vue'

  export default {
    name: 'preview',
    components: {
      'preview-map': PreviewMap,
    },
    data () {
      return {
        previewLoading: false,
        hasData: false, //  数据是否请求回来
        layersData: {}, // 传递给子组件的数据
      };
    },
    created () {
      this.initEvent();
    },
    mounted () {
      this.fetchData();
    },
    beforeDestroy () {
      this.destroyEvent();
    },
    methods: {
      initEvent () {
        this.$bus.on('hide-preview-loading', () => {
            this.previewLoading = false;
        });
      },

      destroyEvent () {
        this.$bus.off('hide-preview-loading');
      },

      fetchData () {
        this.previewLoading = true;
        var mapid = this.$route.params.mapid;
        var url = 'TBUSER000001/mapdesign/maps/'+ mapid;

        this.$http.get(url).then((res) => {
          if (!res.data.data) {
            console.log('ajax 有问题, res.data: ', res.data);
            return;
          }

          let layers = JSON.parse(res.data.data.data.layers);
          this.hasData = true;  // 显示PreviewMap组件
          this.layersData = layers;
        }).catch((err) => { console.log(err) });
      },
    },
  }
</script>

<style scoped>
  .preview {
    width: 100%;
    height: 100%;
  }
</style>
