import Vue from 'vue'
import Vuex from 'vuex'
import form from './modules/form'
import * as getters from './getters'
import login from './modules/login'
import render from './modules/render'
import edit from './modules/edit'

Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
	getters,
	modules: {
		form,
		login,
    render,
    edit,
	},
	strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
})
