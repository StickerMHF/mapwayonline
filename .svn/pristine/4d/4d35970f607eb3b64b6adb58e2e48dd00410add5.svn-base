<template>
	<div class="shapefilebox">


		<!--选择shapefile文件界面-->
		<div class="shapefilechoose" v-show="mapshow" >
			<div >
				<h2 style="font-weight: 400;">上传shpfile文件</h2>
				<p style="color: #979ea1;">上传本地的shpfile类型的.zip格式的压缩文件</p>
			</div>
			<div
				@click="clickinput"
				id="inputBox"
				@dragenter="handleDragover"
				@dragover="handleDragover"
				@drop="ondropboxDown"
				>
				<i class="el-icon-upload uploadicon" ></i>
				<p style="text-align: center;color: #D3D4D6;font-size: 14px;">点击上传或者拖动文件到此处</p>
			</div>
			<input type="file" @change="handleFile" name="shapefile" id="shapefile" style="display: none;"/>
		</div>

		<!--预览shapefile所渲染的地图-->
		<div class="mapbox" v-show="!mapshow"  style="text-align: left;">
			<div class="mapboxheader" style="display: flex;justify-content: space-between;align-items: center;padding: 0 20px;">
				<el-button type='text' @click = 'backshpfile'>返回</el-button>
				<el-button type='text' @click = "submitshapefile">提交</el-button>
			</div>
			<div class="showShape" id="shapeFileBox" ></div>
		</div>




	</div>
</template>

<script>
	import Leaflet from 'leaflet';

  	require('../../../../node_modules/leaflet/dist/leaflet.css');
  	require('./leaflet.shpfile.js');
  	require('./shp.js');



	 export default {
	 	name: 'shapefilebox',
	 	data(){
	 		return {
	 			shapeMap:null,
	 			templateLayer:null,
	 			mapshow:true,
	 			maplayers: [],
				filedata:null,
	 		}
	 	},
	 	methods: {
		     showmap(file){
		     	console.log(file,'showmap')
		     	var that = this;
		     	that.mapshow =  !that.mapshow;
		     	setTimeout(function(){
		     		if(that.shapeMap == null){
		     			that.initMap();
		     		}
		     		that.templateLayer.clearLayers();
					let reader = new FileReader();
					reader.onload = function(e) {
				    	var fu = e.target.result;
				    	var shpfile = new L.Shapefile(fu,{getgeojson:function(data){
				    		console.log('图层数据：',data);
				    		that.filedata = data;

				    	}});
						shpfile.addTo(that.templateLayer);
						console.log(shpfile)

				    };
				    reader.readAsArrayBuffer(file);
		     	},500)
			},
			submitshapefile(){
				// 上传shapefile文件中的数据
				var that = this;
				let data = that.fitterdata(that.filedata);
				let prams = 'data='+JSON.stringify(data);
		      	console.log('用户提交数据',data)
		     /*
				this.$http.post('http://192.168.0.222:8082/mapwayonline/TBUSER000001/mapdesign/datas/add/ShapeFile',prams)
		      	.then(
		      		(res) => {
						console.log(res)
		      		}
		      	).catch(() => {console.log('请求失败');});
		     */

			},
			fitterdata(data){ // 过滤shapefile文件数据 用于上传
				let that = this;
				let subList=[];
				if(Object.prototype.toString.call(data) == '[object Object]' ){
					let a = {};
		      		a.url = '';
		      		a.type = data.features[0].geometry.type;
		      		a.dataname = data.fileName || 'filename';
		      		a.inputsr = 4326;
		      		a.editor = true;
		      		a.datadescribe = data.fileName || 'filedescription';
		      		a.datalable = data.fileName || 'filelable';
		      		a.datatype = 10 ;
		      		a.pubdate = that.getToday();
		      		a.size = 0;
		      		a.folder = 'folder';
		      		a.features =  data.features
		      		subList.push(a);
				}else if(Object.prototype.toString.call(data) == '[object Array]' ){
					for(var index in data){
						let a = {};
			      		a.url = '';
			      		a.type = data[index].features[0].geometry.type;
			      		a.dataname = data[index].fileName || 'filename';
			      		a.inputsr = 4326;
			      		a.editor = true;
			      		a.datadescribe = data[index].fileName || 'filedescription';
			      		a.datalable = data[index].fileName || 'filelable';
			      		a.datatype = 10 ;
			      		a.pubdate = that.getToday();
			      		a.size = 0;
			      		a.folder = 'folder';
			      		a.features =  data[index].features
			      		subList.push(a);
					}
				}else{
					console.log('不是数组也不是对象，有问题。。')
				}

				return {layers:subList};

			},
			clickinput(){
	 			document.getElementById('shapefile').click();
	 		},
	 		backshpfile(){
	 			this.mapshow = !this.mapshow ;
	 		},
	 		handleDragover(e) {
			    e.stopPropagation();
			    e.preventDefault();
			    e.dataTransfer.dropboxEffect = 'copy';
			},
		   ondropboxDown(e) {
			    e.stopPropagation();
			    e.preventDefault();
			    var files = e.dataTransfer.files;
			    console.log('ondropboxDown',e)
			    var f = files[0];
			    this.showmap(f);
			},
			handleFile(e) {
			    var files = e.target.files;
			    var f = files[0];
			    this.showmap(f);
			},
			getToday(){
    		// 获取 2017-6-23 格式的时间字符串
    		var date = new Date();
			var mon = date.getMonth() + 1;
			var day = date.getDate();
			var nowDay = date.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
			return nowDay;
    		},
	 		initMap(){
		      	// 初始化一个地图实例
		      	this.shapeMap = L.map('shapeFileBox',{
		      		zoom: 3,
		          	center: [34, 108],
		          	minZoom: 2,
		          	maxZoom: 18
		      	});

		      	L.tileLayer('http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}')
		      	.addTo(this.shapeMap);
		      	this.templateLayer=L.layerGroup();
		      	this.templateLayer.addTo(this.shapeMap);
		      	this.shapeMap.invalidateSize();

		     },


	 	},
	    mounted () {
	//    console.log('数据列表初始化成功');


	    }



	 }


</script>

<style>
	.shapefilebox{
		background-color: #fff;
		padding-top: 40px;
		position: relative;
	}
	#inputBox{
		margin-top: 30px;
		border: 1px dashed #D3D4D6;
		display: inline-block;
		background-color: #FFFFFF;
		padding-top: 30px;
		width: 350px;
		height: 180px;
	}
	 .uploadicon{
	 	width: 60px;
	 	height: 60px;
	 	line-height: 60px;
	 	font-size: 60px;
	 	border: none;
	 	border-radius: 3px;
	 	margin: 0 auto;
	 }
	 .showShape{
	 	height: 550px;
	 	width: 100%;
	 	border: 1px solid #C0CCDA;
	 	margin: 20px 0;
	 }

</style>
