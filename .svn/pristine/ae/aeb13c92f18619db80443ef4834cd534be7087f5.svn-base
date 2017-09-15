import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index.vue'
import formDesign from '@/components/formDesign/index.vue'
import chartDesign from '@/components/chartDesign/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/index' },
    {
      path: '/index',
      component: Index,
      children:[
        {
          path:'',
          name:'main',
          meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
          component:res => require(['@/components/main.vue'],res)
        },
        {
          path:'/datacenter',
          component: res => require(['@/components/dataCenter/DataCenter.vue'], res),
          meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
        },
        {
          path:'/datacenter/:dataid/edit',
          component: res => require(['@/components/dataCenter/edit/Edit.vue'], res),
          meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
        },
        {
          path:'/formdesign',
          name:'formDesign',
          component: formDesign,
          meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
        },
        {
          path:'/mapdesign',
          component: res => require(['@/components/mapDesign/UserMap.vue'], res),
          meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
        },
        {
          path:'/formdesign/init/:id',
          component: res => require(['@/components/formDesign/FormIndex.vue'], res),
          meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
        },
        {
          path:'/mapdesign/new',
          component: res => require(['@/components/mapDesign/render/Render.vue'], res),
          meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
        },
        {
          path:'/chartDesign',
          name:'chartDesign',
          component: chartDesign,
          meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
        }
//    		{
//    			   数据源中心
//    		}
      ]
    },
    { path: '/login', component: resolve => require(['../components/Login/Login.vue'], resolve) },
    { path: '/test',
      meta: {
        requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Index,
    },
  ]
})
