/**
 * Created by hs on 2017/6/14.
 */
export default {
  state: {
  	user:null,
    userName: null
  },

  mutations: {
    SET_USER_NAME (state, name) {
      state.userName = name;
    },
    SET_USER_INFO(state,user){
    	state.user = user;
    },
    isLogin (state,user) {
    state.user = user
  }
  },

  actions: {
    setUserName ({commit}, name) {
      commit('SET_USER_NAME', name);
    },
    setUserInfo ({commit}, user) {
      commit('SET_USER_INFO', user);
    }
  }
}
