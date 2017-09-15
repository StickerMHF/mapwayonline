/**
 * Created by hs on 2017/6/12.
 */
export default {
  state: {
    /******************************************************/
    /*地图视图*/

    // 是否展开右侧的编辑记录
    showEditLog: false,

    /******************************************************/
    /*数据视图*/
    dViewProperties: null,

    /******************************************************/
    /*公共的*/
    // 用于检测当前正在的编辑的feature是否保存
    isSave: false,
    submitFeature:{}, // arcgis json
    /*{
       "geometry" : {"x" : -118.15, "y" : 33.80},
       "attributes" : {
         "OWNER" : "Joe Smith",
         "VALUE" : 94820.37,
         "APPROVED" : true,
         "LASTUPDATE" : 1227663551096
       }
     },*/
    schema: null,

    currentId: null,

    // 记录是更新还是添加
    editType: ''
  },

  mutations: {
    /*地图视图*/
    SET_EDITLOG (state, boolean) {
      state.showEditLog = boolean;
    },

    /*数据视图*/
    SET_DVIEW_ROPERTIES (state, properties) {
      state.dViewProperties = properties;
    },

    /*地图视图和数据视图共有*/
    SET_IS_SAVE (state, isSave) {
      state.isSave = isSave;
    },

    SET_SUBMIT_FEATURE (state, arcFeature) {
      state.submitFeature = arcFeature;
    },

    SET_SCHEMA (state, field) {
      state.schema = field;
      console.log('Huoqu de schema', state.schema)
    },

    SET_CURRENT_ID (state, id) {
      state.currentId = id;
    },

    RESET_CURRENT_ID (state) {
      state.currentId = null;
    },

    SET_EDIT_TYPE (state, type) {
      state.editType = type;
    },
  },

  actions: {
    /*
     *  地图视图
     */

    //控制右侧的editSet显示和隐藏
    setEditLog ({commit}, boolean) {
      commit('SET_EDITLOG', boolean);
    },

    /*
     *  数据视图
     */
    setDViewProperties ({commit}, properties) {
      commit('SET_DVIEW_ROPERTIES', properties);
    },

    /*
     *  地图视图和数据视图共有
     */
    setIsSave ({commit}, isSave) {
      commit('SET_IS_SAVE', isSave);
    },

    setSubmitFeature ({commit}, arcFeature) {
      commit('SET_SUBMIT_FEATURE', arcFeature);
    },

    setSchema ({commit}, field) {
      commit('SET_SCHEMA', field);
    },

    setCurrentId ({commit}, id) {
      commit('SET_CURRENT_ID', id);
    },

    resetCurrentId ({commit}) {
      commit('RESET_CURRENT_ID');
    },

    setEditType ({commit}, type) {
      commit('SET_EDIT_TYPE', type)
    },
  }
}
