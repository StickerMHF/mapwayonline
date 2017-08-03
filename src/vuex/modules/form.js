export default {
	state:{
		widgetList: {},
		formConfig:{
			name:'',
	  		description:'',
	  		isApp:true,
	  		bindData:'4',
	  		dataId:'',
	  		layout:'wide',
	  		style:{
	  			backgroundColor:'#FFFFFF',
	  			backgroundImage:'',
	  			backgroundPosition:'over',
	  			backgroundRepeat:'no-repeat',
	  		}
		},
		
	},
	mutations:{
		UPDATA(state,obj) {
			state[obj.name]= obj.data;
		},
		ADD_WIDGET (state, widget) {
			let oid = 'widget'+ widget.id;
			state.widgetList[oid] = widget;
		},
		REMOVE_WIDGET (state,oid) {
			delete state.widgetList[oid];
		},
		CHANGE_STYLE(state,obj){	
			state.widgetList['widget'+ obj.oid].style[obj.attr] = obj.value;
		},
		SET_WIDGET(state,obj){	
			state.widgetList['widget'+ obj.oid][obj.attr] = obj.value;	
		},
		SET_DRAG(state,obj){
			state.formConfig[obj.attr] = obj.value;
		},
		SET_DRAGSTYLE(state,obj){
			state.formConfig.style[obj.attr] = obj.value;
		}
	},
	actions:{
		_addWidget ({commit}, widget) {
			commit('ADD_WIDGET', widget);
		},
		_removeWidget({commit}, oid){
			commit('REMOVE_WIDGET',oid);
		},
		_changeStyle({commit},obj){
			commit('CHANGE_STYLE',obj);
		},
		_setWidget({commit},obj){
			commit('SET_WIDGET',obj);
		},
		_setDrag({commit},obj){
			commit('SET_DRAG',obj);	
		},
		_setDragStyle({commit},obj){
			commit('SET_DRAGSTYLE',obj);	
		},
		_upData({commit},obj){
			commit('UPDATA',obj);	
		},
	}
}
