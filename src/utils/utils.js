import Vue from 'vue'
//import html2canvas from './html2image/html2canvas.min.js'
require('./html2image/html2canvas.js');
var Tools = {
	data: {
		message: 'Hello Vue!'
	},
	html2images(source, callback) {
		console.log("html2images:" + source);
		html2canvas(source, {
			onrendered: function(canvas) {
				if(typeof callback === "function") {
					callback(canvas);
				}
			}
		});

	},
	cloneObj(obj) { // 深拷贝
		var str, newobj = obj.constructor === Array ? [] : {};
		if(typeof obj !== 'object') {
			return;
		} else if(window.JSON) {
			str = JSON.stringify(obj), //系列化对象
				newobj = JSON.parse(str); //还原
		} else {
			for(var i in obj) {
				newobj[i] = typeof obj[i] === 'object' ?
					this.cloneObj(obj[i]) : obj[i];
			}
		}
		return newobj;
	}
}

export default Tools;