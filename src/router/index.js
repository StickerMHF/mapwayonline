import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index.vue'
import formDesign from '@/components/formDesign/index.vue'
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
			    	path:'/formDesign',
			    	name:'formDesign',
			    	component: formDesign,
			    	meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
			    },
			    {
	    			path:'/formDesign/init/:id',
	    			component:res => require(['@/components/formDesign/FormIndex.vue'],res),
	    			meta: {requireAuth: false,}, // 添加该字段，表示进入这个路由是需要登录的
	    		}
//			    {
//			    	 mapDesign
//			    },
//			    {
//			    	chartDesign
//			    },
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
