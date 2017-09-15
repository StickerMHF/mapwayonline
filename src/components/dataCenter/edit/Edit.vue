<template>
  <div>
    <div class="view-change">
      <el-button-group>
        <el-button type="primary" @click="toMapView">地图视图</el-button>
        <el-button type="primary" @click="toDataView">数据视图</el-button>
      </el-button-group>
    </div>
    <div class="edit-main">
      <div id="mapView" class="map-view"  v-if="mapViewShow">
        <div :class="[animate, edit.showEditLog ? edit_map_showlog : edit_map_noshowlog ]">
          <edit-map></edit-map>
        </div>
        <div :class="[animate, edit.showEditLog ? edit_set_showlog : edit_set_noshowlog ]">
          <edit-set></edit-set>
        </div>
      </div>
      <div id="dataView" class="data-view" v-if="dataViewShow">
        <div class="data-view-container">
          <data-grid ></data-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EditMap from  './EditMap'
  import EditSet from  './EditSet'
  import DataGrid from  './dataview/DataGrid'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'edit',
    components: { EditMap, EditSet, DataGrid },
    data: function () {
      return {
        // 视图切换初始值
        mapViewShow: true,
        dataViewShow: false,
        // class类名变量
        animate: 'animate',
        edit_map_noshowlog: 'edit-map-noshowlog',
        edit_map_showlog: 'edit-map-showlog',
        edit_set_noshowlog: 'edit-set-noshowlog',
        edit_set_showlog: 'edit-set-showlog'
      }
    },
    computed: {
      ...mapGetters([
        'edit'
      ])
    },
    mounted: function () {

    },
    methods: {
      ...mapActions([
        'setEditLog',
      ]),
      toMapView: function () {
        if (!!this.edit.editType) {
          return;
        }
        this.setEditLog(false);
        this.mapViewShow = true;
        this.dataViewShow = false;
      },

      toDataView: function () {
        if (!!this.edit.editType) {
          return;
        }
        this.setEditLog(false);
        this.mapViewShow = false;
        this.dataViewShow = true;
      }
    }
  }
</script>

<style scoped>
  .view-change {
    padding: 5px 0;
    text-align: center;
    background: #181f24;
  }

  .animate {
    float: left;
    height: 100%;
    overflow-y: auto;
    -webkit-transition: width 0.5s;
    -moz-transition: width 0.5s;
    -ms-transition: width 0.5s;
    -o-transition: width 0.5s;
    transition: width 0.5s;
  }

  .edit-main {
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 0;
    top: 40px;
  }

  .map-view {
    width: 100%;
  }

  .data-view {
    width: 100%;
  }

  .data-view-container {
    width: 100%;
  }

  /*不显示编辑记录*/
  .edit-map-noshowlog {
    width: 100%;
  }
  .edit-set-noshowlog {
    width: 0;
    display: none;
  }
  /*显示编辑记录*/
  .edit-map-showlog {
    width: 75%;
  }
  .edit-set-showlog {
    width: 25%;
    display: block;
  }
</style>
