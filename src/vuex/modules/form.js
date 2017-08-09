export default {
	state:{
		widgetList:[
			{
				tagname:'input',
				type:'text',
				label:'label',
				description:'输入框',
				bindFiled:'',
				layout:{
					x:150,y:150,w:300,h:40						
				},
				style:{
					backgroundColor : "",
					lineHeight: '',
					fontSize: '16px',
					color:'#333',
					borderStyle : 'solid',
					borderWidth : '1px',
					borderColor : '#233333',
					borderRadius : '0'
				}
			},
			{
				tagname:'input',
				type:'password',
				label:'label',
				description:'密码框',
				bindFiled:'',
				layout:{
					x:400,y:300,w:300,h:40						
				},
				style:{
					backgroundColor : '',
					lineHeight: '',
					fontSize: '16px',
					color:'#333',
					borderStyle : 'solid',
					borderWidth : '1px',
					borderColor : '#233333',
					borderRadius : '0'
				}
			}
		],
		formConfig:{
			name:'',
			description:'',
			bindTable:'',
			manner:'wide',
			style:{
				width:'960px',
				minHeight:'540px',
				backgroundColor : '#FFF',
				backgroundImage : 'url(none)',
				backgroundPosition : '0 0',
				backgroundSize : "100% 100%"
			}
		}
		
	},
	mutations:{
		ADD_WIDGET (state, widget) {
			state.widgetList.push(widget);
		},
		REMOVE_WIDGET (state,oid) {
	
			state.widgetList.splice(oid, 1);
		},
		SET_WIDGET(state,obj){		
			state.widgetList[obj.oid][obj.attr] = obj.value;				
		},
		SET_WIDGETSTYLE(state,obj){
			console.log(obj)
			state.widgetList[obj.oid].style[obj.attr] = obj.value;
		},
		SAVE_POSITION(state,obj){
			state.widgetList[obj.oid].layout = obj.option;
		},
		SET_CANVAS(state,obj){
			state.formConfig[obj.attr] = obj.value;
			if(obj.value === 'wide'){
				state.formConfig.style.width = '960px';
				state.formConfig.style.minHeight = '540px';
				state.widgetList = [];
			}
			if(obj.value === 'vertical'){
				state.formConfig.style.width = '540px';
				state.formConfig.style.minHeight = '960px';
				state.widgetList = [];
			}
		},
		SET_CANVASSTYLE(state,obj){
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
		_setWidget({commit},obj){
			commit('SET_WIDGET',obj);
		},
		_setWidgetStyle({commit},obj){
			commit('SET_WIDGETSTYLE',obj);
		},
		_savePosition({commit},obj){
			commit('SAVE_POSITION',obj);
		},
		_setCanvas({commit},obj){
			commit('SET_CANVAS',obj);
		},
		_setCanvasStyle({commit},obj){
			commit('SET_CANVASSTYLE',obj);
		},
	}
}
