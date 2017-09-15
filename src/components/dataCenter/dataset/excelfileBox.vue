<template>
	<div class="excelfilebox" >
		<!--选择excel文件-->
		<div class="excelfilechoose" v-show="!excelshow">
			<div>
				<h2 style="font-weight: 400;">上传Excel文件</h2>
				<p style="color: #979ea1;">上传本地的Excel类型文件</p>
			</div>
			<div
				id="drop"
				@click="inputclick"
				@dragenter="handleDragover"
				@dragover="handleDragover"
				@drop="onDropDown">
				<i class="el-icon-upload uploadicon" ></i>
				<p style="text-align: center;color: #D3D4D6;font-size: 14px;">点击上传或者拖动文件到此处</p>
			</div>
		    <p><input type="file" @change="handleFile" name="xlfile" id="xlf" style="display: none;"/></p>
		</div>
		<!--预览excel文件列表-->
		<div class="excelshowbox" v-show="excelshow">
			<p>excel预览</p>
			<div style="display: flex;justify-content: space-between;align-items: center;padding: 0 20px;">
				<el-button type='text' @click='backlist'>返回</el-button>
				<el-button type='text' @click='submitExcel'>保存并提交</el-button>
			</div>
			<div id="excellist">
				<el-table
			      :data="jsonexl"
			      :fit='true'
			      border
			      style="width: 100%;text-align: left;text-indent: 20;">
			      <el-table-column
			      	v-for='item in exllistheader'
			      	:key='item'
			        :prop="item"
			        :label="item">
			      </el-table-column>
			    </el-table>

			</div>
		</div>
	</div>
</template>

<script>
import XLSX from "xlsx"

export default {
	  	name: 'excelfilebox',
	  	data(){
	  		return {
	  			excelshow:false,
	  			jsonexl:[],
	  			exllistheader:[],
	  			exlfile:{},
	  			filename:''
	  		}
	  	},
	  	methods:{
	  		goDataSet(tabname){
	    		this.$emit('refreshdata',tabname)
	    	},
	    	getToday(){
	    		// 获取 2017-6-23 格式的时间字符串
	    		var date = new Date();
				var mon = date.getMonth() + 1;
				var day = date.getDate();
				var nowDay = date.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
				return nowDay;
	    	},
	  		inputclick(){
	  			document.getElementById('xlf').click();
	  		},
	  		backlist(){
	  			this.excelshow = !this.excelshow;
	  			this.jsonexl = [];
	  			this.exllistheader = [];
	  		},
		   handleDragover(e) {
			    e.stopPropagation();
			    e.preventDefault();
			    e.dataTransfer.dropEffect = 'copy';
			},
		   onDropDown(e) {
			    e.stopPropagation();
			    e.preventDefault();
			    var files = e.dataTransfer.files;
			    var f = files[0];
			    this.filename = f.name.split('.')[0]
			    this.showexcel(f);
			},
			handleFile(e) {
			    var files = e.target.files;
			    var f = files[0];
			     this.filename = f.name.split('.')[0]
			    this.showexcel(f);
			},
			showexcel(file) {
		//		    var name = file.name;
					let that = this;
					this.jsonexl = [];
					that.excelshow = !that.excelshow;
				    let reader = new FileReader();
				    reader.onload = function (e) {
				        var data = e.target.result;
				        var wb = XLSX.read(data, { type: "binary" });
				        // console.log(wb); // 解析的整个文件对象
				        that.jsonexl = XLSX.utils.sheet_to_json(wb.Sheets.Sheet1);// 解析的文件对象转化为json对象
				        let a = that.jsonexl[0];
				        for (var key in a){ // 拿到字段名
				        	that.exllistheader.push(key);
				        }
				        console.log(that.exllistheader,that.jsonexl)
				        reader=null;
				    };
				    reader.readAsBinaryString(file);
			},
			submitExcel(){
				// 提交excel数据

//				console.log(this.jsonexl,this.exllistheader);
				// 需要让其选择关键字段，如地址和geomtry等



				let header = [];

				for (let index in this.exllistheader) {
					let a = {}
					if(this.exllistheader[index] == 'the_geom'){
						a.type = 'geomtry';
					}else{
						a.type = 'string';
					}
					a.name=this.exllistheader[index];
					header.push(a)
				}
				let exl = {
					url : '',
					type : 'geomtry',
					dataname: this.filename,
					inputsr: 4326,
					editor: true,
					datadescribe: this.filename,
					datalable: this.filename,
					datatype: 9,
					pubdate: this.getToday(),
					size: 0,
					folder: 'folder',
					fields: header,
					featrues: this.jsonexl
				}
				console.log(exl);



				this.goDataSet('myDataSets'); // 跳转到数据页


			}
		},
		mounted(){

		}
}

</script>

<style>
	.excelfilebox{
  	padding-top: 40px;
  	background-color: #fff;
  	position: relative;
    padding-bottom:75px;
  	}
  	.excelfilebox .cell{
		text-align: left;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	#drop{
		margin-top: 30px;
		border: 1px dashed #D3D4D6;
		display: inline-block;
		background-color: #eee;
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
    color: #009688;
	}
	.excelshowbox{

	}

</style>
