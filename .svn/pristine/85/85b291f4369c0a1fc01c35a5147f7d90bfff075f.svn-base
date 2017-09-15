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
		

	}
}

export default Tools;