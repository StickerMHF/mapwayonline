// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
Vue.config.productionTip = false

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// 导入font-awesome
import 'font-awesome/css/font-awesome.css'

// 导入vue2.0中ajax模块
import axios from './utils/http'
import Tools from './utils/utils'
Vue.prototype.$http = axios;
Vue.prototype.$Tools = Tools;

// 导入VueBus（事件总线）
import VueBus from 'vue-bus';
Vue.use(VueBus);

// 全局导航钩子
router.beforeEach((to, from, next) => {

  if (to.meta.requireAuth) {
  // console.log(isEmptyObject(store.state.user))
  if(store.getters.getLogin.user!=null&&!isEmptyObject(store.getters.getLogin.user.userinfo.username)) {
    next();
  }
  else {
    next({
      path: '/login',
      query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }
}
else {
  next();
}
})

function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
//判断object是否为空
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
