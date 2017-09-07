export default {
  state: {
    // 存储用户添加的数据  geoJsons: [{  id: 1, data: {}, }]
    geoJsons: [],
    layer: [],
    currentLayerId:　null,
    renderType: 'simple',
    gradients: {
      a: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#08589e"],
      b: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"],
      c: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#005a32"],
      d: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#4a1486"],
      e: ["#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#e0e0e0", "#bababa", "#878787", "#4d4d4d"],
      f: ["#8dd3c7", "#ffffc5", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"],
      g: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf"],
      h: ["#fbb4ae", "#c5cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec"],
      i: ["#c51b7d", "#f177ae", "#f1b6da", "#fde0ef", "#e6fed0", "#b8e186", "#7fbc41", "#4d9221"],
      j: ["#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac"],
      k: ["#0000ff", "#0082ff", "#00ffff", "#00ff00", "#73ff00", "#ffff00", "#ff9600", "#ff0000"]
    },
    colorIndex: ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i', 'j', 'k'],
    colorImgs: {
      a: ['/static/mapDesign/img/gradient/gradient1.png'],
      b: ['/static/mapDesign/img/gradient/gradient2.png'],
      c: ['/static/mapDesign/img/gradient/gradient3.png'],
      d: ['/static/mapDesign/img/gradient/gradient4.png'],
      e: ['/static/mapDesign/img/gradient/gradient5.png'],
      f: ['/static/mapDesign/img/gradient/gradient6.png'],
      g: ['/static/mapDesign/img/gradient/gradient7.png'],
      h: ['/static/mapDesign/img/gradient/gradient8.png'],
      i: ['/static/mapDesign/img/gradient/gradient9.png'],
      j: ['/static/mapDesign/img/gradient/gradient10.png'],
      k: ['/static/mapDesign/img/gradient/gradient11.png']
    },
    // 向服务器提交的数据
    savedLayers: {
      base_layer: null,
      over_layer: [
        /*{
          data_id: null,
          gtype: null,
          new: {
            rtype: null,
            rule: {
              field: null,
              field_zone: null,
            },
            label: {
              layerId: null,
              field: null,
              style: {
                color: null,
                fontSize: null
              }
            },
          }
        }*/
      ],
    },
    newMapInfo: {
      name: '',
      description: '',
      tag: '',
    },
    currentStyle: null,

    // 创建地图选择的数据id集合
    dataIdChecked: [],

    isFirstRender: true, // 是否是第一次渲染
    currentMapId: '', // 当前选中的mapid

  },

  mutations: {
    SET_LAYERS (state, layers) {
      state.layers = layers;
    },

    SET_CURRENT_LAYER_ID (state, id) {
      state.currentLayerId = id;
    },

    /* 记录下当前渲染方式
     * @param {String}
     */
    SET_RENDER_TYPE (state, type) {
      state.renderType = type;
    },

    /* 将图层数据id和data 存入 state.geoJsons数组中
     * @param {Object}
     */
    ADD_GEO_JSON (state, obj) {
      var exit = false;
      state.geoJsons.some((item) => {
        if (obj.id === item.id) {
          exit = true;
          return;
        }
      });

      if (!exit) {
        state.geoJsons.push(obj);
      }
      /*console.log(state.geoJsons)
       debugger*/
    },

    /* 重置state.geoJsons数组 */
    RESET_GEO_JSON (state) {
      state.geoJsons = [];
    },

    // 向服务器提交的数据中
    SET_BASE_LAYER (state, url) {
      state.savedLayers.base_layer = url;
    },

    // 更新每个叠加图层的样式
    UPDATE_OVER_LAYER (state, obj) {
      if (!!obj) {
        state.savedLayers.over_layer.some((item) => {
          if (state.currentLayerId === item.data_id) {
            item.render = obj;
          }
        });
      }

      console.log(state.savedLayers.over_layer);

      return;
    },

    // 更新每个叠加图层的样式
    UPDATE_OVER_LAYER_LABEL (state, obj) {
      if (!!obj) {
        state.savedLayers.over_layer.some((item) => {
          if (state.currentLayerId === item.data_id) {
            item.label = obj;
          }
          return;
        });
      }
      //console.log(state.savedLayers.over_layer);
      return;
    },

    ADD_OVER_LAYER_STYLE (state, obj) {
      state.savedLayers.over_layer.push(obj);
    },

    SET_NEW_MAP_INFO (state, obj) {
      state.newMapInfo[obj.key] = obj.value;
    },

    SET_CURRENT_STYLE (state, style) {
      state.currentStyle = style;
    },

    ADD_DATA_ID_CHECKED (state, id) {
      var index = state.dataIdChecked.indexOf(id);
      if (index < 0) {
        state.dataIdChecked.push(id);
      }
    },

    REMOVE_DATA_ID_CHECKED (state, id) {
      state.dataIdChecked.some((item, index) => {
        if (id === item) {
          state.dataIdChecked.splice(index, 1);
        }
      });
    },

    RESET_DATA_ID_CHECKED (state) {
      state.dataIdChecked = [];
    },

    SET_NOT_FRIST_RENDER (state) {
      state.isFirstRender = false;
    },

    SET_FRIST_RENDER (state) {
      state.isFirstRender = true;
    },

    SET_CURRENT_MAP_ID (state, id) {
      state.currentMapId = id;
    },
  },

  actions: {
    addGeoJsons ({commit}, obj) {
      commit('ADD_GEO_JSON', obj);
    },

    resetGeoJsons ({commit}) {
      commit('RESET_GEO_JSON');
    },

    setRenderType ({commit}, type) {
      commit('SET_RENDER_TYPE', type);
    },


    setLayers ({commit}, layers) {
      commit('SET_LAYERS', layers);
    },

    setCurrentLayerId ({commit}, id) {
      commit('SET_CURRENT_LAYER_ID', id);
    },

    setBaseLayer ({commit}, url) {
      commit('SET_BASE_LAYER', url);
    },

    updateOverLayer ({commit}, obj) {
      commit('UPDATE_OVER_LAYER', obj);
    },

    updateOverLayerLabel ({commit}, obj) {
      commit('UPDATE_OVER_LAYER_LABEL', obj);
    },

    addOverlayerStyle ({commit}, obj) {
      commit('ADD_OVER_LAYER_STYLE', obj);
    },

    setNewMapInfo ( {commit}, obj ) {
      commit('SET_NEW_MAP_INFO', obj);
    },

    setCurrentStyle ({commit}, style) {
      commit('SET_CURRENT_STYLE', style);
    },

    addDataIdChecked ({commit}, id) {
      commit('ADD_DATA_ID_CHECKED', id);
    },

    removeDataIdChecked({commit}, id) {
      commit('REMOVE_DATA_ID_CHECKED', id);
    },

    resetDataIdChecked ({commit}) {
      commit('RESET_DATA_ID_CHECKED');
    },

    setNotFirstRender ({commit}) {
      commit('SET_NOT_FRIST_RENDER');
    },

    setFirstRender ({commit}) {
      commit('SET_FRIST_RENDER');
    },

    setCurrentMapId ({commit}, id) {
      commit('SET_CURRENT_MAP_ID', id);
    },
  }
}
