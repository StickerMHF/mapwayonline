export default {
	state: {
		widgetList: [],
		formConfig: {
			formname: "",
			description: "",
			tablename: "",
			manner: "wide", // 画布风格
			mark:"备注",
			maxid:0,
			img:'', // base64的缩略图
			isinputform:true, // 判断创建的是否为录入
			selectfiled:'mapwayid', // 根据具体的某一个字段展示数据
			style: {
				width: "960px",
				height:'540px',
				minHeight: "540px",
				backgroundColor: "none",
				backgroundImage: "url(none)",
				backgroundPosition: "0 0",
				backgroundSize: "100% 100%"
			}
		},
		editState:{
			currentOid:'new', // 当前编辑的数据id
			isSaveInPreview:false, // 判断进入预览界面之前是否点了保存
			hasData:false,  // 预览界面 用来判断数据是否已经获取了
		}

	},
	mutations: {
		CLEAN_UP(state){
			state.widgetList = [];
			state.formConfig = {
				formname: "",
				description: "",
				tablename: "",
				manner: "wide", // 画布风格
				mark:"备注",
				maxid:0,
				isinputform:true, // 判断创建的是否为录入
				selectfiled:'mapwayid', // 根据具体的某一个字段展示数据
				img:'', // base64的缩略图
				style: {
					width: "960px",
					height:'540px',
					minHeight: "540px",
					backgroundColor: "none",
					backgroundImage: "url(none)",
					backgroundPosition: "0 0",
					backgroundSize: "100% 100%"
				}
			};
			state.editState = {
				currentOid:'new', // 当前编辑的数据id
				isSaveInPreview:false, // 判断进入预览界面之前是否点了保存
				hasData:false,  // 预览界面 用来判断数据是否已经获取了
			}

		},
		SET_CURRENT(state, obj){
			state.editState[obj.attr]= obj.value;
		},
		UP_DATA(state, obj){
			state.widgetList = obj.data.widgetList;
			state.formConfig = obj.data.formConfig;

		},
		ADD_WIDGET(state, widget) {
			state.widgetList.push(widget);
			state.formConfig.maxid ++ ;
		},
		REMOVE_WIDGET(state, oid) {
			state.widgetList.splice(oid, 1);
		},
		SET_WIDGET(state, obj) {
			state.widgetList[obj.oid][obj.attr] = obj.value;
		},
		SET_WIDGETSTYLE(state, obj) {
			state.widgetList[obj.oid].style[obj.attr] = obj.value;
		},
		SAVE_POSITION(state, obj) {
			state.widgetList[obj.oid].layout = obj.option;
		},
		SET_CANVAS(state, obj) {
			state.formConfig[obj.attr] = obj.value;
			// 设置画布时
			if(obj.attr === "manner"){
				if(obj.value === 'wide') {
					state.formConfig.style.width = '960px';
					state.formConfig.style.minHeight = '540px';
					state.widgetList = [];
				}
				if(obj.value === 'vertical') {
					state.formConfig.style.width = '540px';
					state.formConfig.style.minHeight = '960px';
					state.widgetList = [];
				}
				if(obj.value === ''){
					// 自适应时的操作
				}
			}

			// 设置表名时
			if(obj.attr === "tablename" && obj.value !== state.formConfig.tablename){
				 state.widgetList.forEach(function(item){
				 	item.bindFiled = "" ;
				 })
			}

		},
		SET_CANVASSTYLE(state, obj) {
			state.formConfig.style[obj.attr] = obj.value;
		}
	},
	actions: {
		_setCurrent({commit},obj){
			commit('SET_CURRENT', obj);
		},

		_cleanUp({commit}){
			commit('CLEAN_UP');
		},
		_upData({commit},obj){
			commit('UP_DATA', obj);
		},
		_addWidget({commit}, widget) {
			commit('ADD_WIDGET', widget);
		},
		_removeWidget({commit}, oid) {
			commit('REMOVE_WIDGET', oid);
		},
		_setWidget({commit}, obj) {
			commit('SET_WIDGET', obj);
		},
		_setWidgetStyle({commit}, obj) {
			commit('SET_WIDGETSTYLE', obj);
		},
		_savePosition({commit}, obj) {
			commit('SAVE_POSITION', obj);
		},
		_setCanvas({commit}, obj) {
			commit('SET_CANVAS', obj);
		},
		_setCanvasStyle({commit}, obj) {
			commit('SET_CANVASSTYLE', obj);
		},
	}
}
