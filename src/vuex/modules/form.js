export default {
	state: {
		widgetList: [{
				tagname: "input",
				type: "text",
				label: "用户名",
				description: "输入框",
				bindFiled: "mapwayid",
				layout: {
					x: 124,
					y: 67,
					w: 300,
					h: 40
				},
				style: {
					backgroundColor: "",
					lineHeight: "",
					fontSize: "16px",
					color: "#333",
					borderStyle: "solid",
					borderWidth: "1px",
					borderColor: "#233333",
					borderRadius: "0"
				}
			},
			{
				tagname: "input",
				type: "password",
				label: "密码",
				description: "密码框",
				bindFiled: "the_geom",
				layout: {
					x: 122,
					y: 137,
					w: 300,
					h: 40
				},
				style: {
					backgroundColor: "",
					lineHeight: "",
					fontSize: "16px",
					color: "#333",
					borderStyle: "solid",
					borderWidth: "1px",
					borderColor: "#233333",
					borderRadius: "0"
				}
			},
			{
				tagname: "input",
				type: "radio",
				description: "单选框",
				label: "性别",
				bindFiled: "cartodb_id",
				layout: {
					x: 127,
					y: 199,
					w: 300,
					h: 80
				},
				style: {
					backgroundColor: "#FFF",
					lineHeight: "",
					fontSize: "16px",
					color: "#333",
					borderStyle: "solid",
					borderWidth: "1px",
					borderColor: "#233333",
					borderRadius: "0"
				},
				option: "男,女"
			},
			{
				tagname: "input",
				type: "checkbox",
				description: "复选框",
				label: "兴趣爱好",
				bindFiled: "scalerank",
				layout: {
					x: 126,
					y: 305,
					w: 300,
					h: 80
				},
				style: {
					backgroundColor: "#FFF",
					lineHeight: "",
					fontSize: "16px",
					color: "#333",
					borderStyle: "solid",
					borderWidth: "1px",
					borderColor: "#233333",
					borderRadius: "0"
				},
				option: "篮球,足球,排球"
			},
			{
				tagname: "select",
				type: "",
				description: "下拉选择框",
				label: "班级",
				bindFiled: "featurecla",
				layout: {
					x: 534,
					y: 73,
					w: 250,
					h: 40
				},
				style: {
					backgroundColor: "#FFF",
					lineHeight: "",
					fontSize: "16px",
					color: "#333",
					borderStyle: "solid",
					borderWidth: "1px",
					borderColor: "#233333",
					borderRadius: "0"
				},
				option: "一班,二班,三班"
			},
			{
				tagname: "textarea",
				type: "",
				description: "文本域",
				label: "备注",
				bindFiled: "name",
				layout: {
					x: 531,
					y: 220,
					w: 300,
					h: 150
				},
				style: {
					backgroundColor: "",
					lineHeight: "",
					fontSize: "16px",
					color: "#333",
					borderStyle: "solid",
					borderWidth: "1px",
					borderColor: "#233333",
					borderRadius: "0"
				}
			},
			{
				tagname: "button",
				type: "submit",
				description: "提交",
				label: "提交",
				bindFiled: "",
				layout: {
					x: 540,
					y: 417,
					w: 120,
					h: 50
				},
				style: {
					backgroundColor: "",
					lineHeight: "",
					fontSize: "16px",
					color: "#333",
					borderStyle: "solid",
					borderWidth: "1px",
					borderColor: "#233333",
					borderRadius: "0"
				}
			},
			{
				tagname: "button",
				type: "reset",
				description: "重置",
				label: "重置",
				bindFiled: "",
				layout: {
					x: 345,
					y: 419,
					w: 120,
					h: 50
				},
				style: {
					backgroundColor: "",
					lineHeight: "",
					fontSize: "16px",
					color: "#333",
					borderStyle: "solid",
					borderWidth: "1px",
					borderColor: "#233333",
					borderRadius: "0"
				}
			}
		],
		formConfig: {
			name: "班级信息表",
			description: "班级信息表",
			bindTable: "tbdata000001",
			manner: "wide", // 画布风格
			remark:'备注',
			style: {
				width: "960px",
				minHeight: "540px",
				backgroundColor: "rgba(115, 135, 135, 0.5)",
				backgroundImage: "url(none)",
				backgroundPosition: "0 0",
				backgroundSize: "100% 100%"
			}
		}

	},
	mutations: {
		ADD_WIDGET(state, widget) {
			state.widgetList.push(widget);
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
		},
		SET_CANVASSTYLE(state, obj) {
			state.formConfig.style[obj.attr] = obj.value;
		}
	},
	actions: {
		_addWidget({
			commit
		}, widget) {
			commit('ADD_WIDGET', widget);
		},
		_removeWidget({
			commit
		}, oid) {
			commit('REMOVE_WIDGET', oid);
		},
		_setWidget({
			commit
		}, obj) {
			commit('SET_WIDGET', obj);
		},
		_setWidgetStyle({
			commit
		}, obj) {
			commit('SET_WIDGETSTYLE', obj);
		},
		_savePosition({
			commit
		}, obj) {
			commit('SAVE_POSITION', obj);
		},
		_setCanvas({
			commit
		}, obj) {
			commit('SET_CANVAS', obj);
		},
		_setCanvasStyle({
			commit
		}, obj) {
			commit('SET_CANVASSTYLE', obj);
		},
	}
}