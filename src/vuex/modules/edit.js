/**
 * Created by hs on 2017/6/12.
 */
export default {
  state: {
    /******************************************************/
    /*地图视图*/
    mViewProperties: null,
    // 是否展开右侧的编辑记录
    showEditLog: false,

    /******************************************************/
    /*数据视图*/
    dViewProperties: null,

    /******************************************************/
    /*公共的*/
    // 用于检测当前正在的编辑的feature是否保存
    isSave: false,
    submitFeature: null,
    schema: null,
    currentDataId: null,

    // 记录是更新还是添加
    editType: ''
  },

  mutations: {
    /*地图视图*/
    SET_MVIEW_ROPERTIES (state, properties) {
      state.mViewProperties = properties;
    },

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

    SET_CURRENT_DATA_ID (state, id) {
      state.currentDataId = id;
    },

    RESET_CURRENT_DATA_ID (state) {
      state.currentDataId = null;
    },

    SET_EDIT_TYPE (state, type) {
      state.editType = type;
    },
  },

  actions: {
    /*
     *  地图视图
     */
    //记录当前正在编辑feature的属性
    setMViewProperties ({commit}, properties) {
      commit('SET_MVIEW_ROPERTIES', properties);
    },

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

    setCurrentDataId ({commit}, id) {
      commit('SET_CURRENT_DATA_ID', id);
    },

    resetCurrentDataId ({commit}) {
      commit('RESET_CURRENT_DATA_ID');
    },

    setEditType ({commit}, type) {
      commit('SET_EDIT_TYPE', type)
    },
  }
}
