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
	dealImage(path, callback) {
		var img = new Image();
		img.src = path;
		img.onload = function() {
			//默认按比例压缩    
			var w = 235,
				h = 165; //w * (this.height / this.width);//this.height;
			var quality = 0.7; // 默认图片质量为0.7    

			//生成canvas    
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			// 创建属性节点    
			canvas.setAttribute("width", w);
			canvas.setAttribute("height", h);

			ctx.drawImage(this, 0, 0, w, h);
			// quality值越小，所绘制出的图像越模糊    
			var base64 = canvas.toDataURL('image/png', quality);
			// 回调函数返回base64的值    
			callback(base64);
		};
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
	},
	compileStr(code) { //对字符串进行加密         
		var c = String.fromCharCode(code.charCodeAt(0) + code.length);
		for(var i = 1; i < code.length; i++) {
			c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
		}
		return escape(c);
	},
	uncompileStr(code) {
		code = unescape(code);
		var c = String.fromCharCode(code.charCodeAt(0) - code.length);
		for(var i = 1; i < code.length; i++) {
			c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
		}
		return c;
	},
	//验证sql注入
	AntiSqlValid(sql) {
		var result = true;
		var re = /update|delete|create|truncate|exec|insert|drop|-/i;
		if(re.test(sql)) {
			//alert("请您不要在参数中输入特殊字符和SQL关键字！"); //注意中文乱码
			result = false;
		}
		return result;
	},
	//获取兄弟元素
	siblings(elm) {
		var a = [];
		var p = elm.parentNode.children;
		for(var i = 0, pl = p.length; i < pl; i++) {
			if(p[i] !== elm) a.push(p[i]);
		}
		return a;
	},
	//获取当前时间
	getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
			" " + date.getHours() + seperator2 + date.getMinutes() +
			seperator2 + date.getSeconds();
		return currentdate;
	},
	//生成随机数
	MathRand(number) {
		var Num = "";
		if(number != null || number != "") {
			for(var i = 0; i < number; i++) {
				Num += Math.floor(Math.random() * 10);
			}

		} else {
			Num += "0";
		}
		return Num;
	}

}

export default Tools;