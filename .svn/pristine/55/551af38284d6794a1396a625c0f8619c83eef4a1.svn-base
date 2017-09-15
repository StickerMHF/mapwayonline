<template>
	
	<div class="customdatabox">			
		<h3 style="text-align: left;padding-left: 30px;font-weight: 400;"><span>表名：</span> <el-input style='max-width: 180px;' size='mini' v-model='customdata.table_name'></el-input> </h3>
		<div style="text-align: right;">
			<el-button type='text' @click='clearall'>清空</el-button>
			<el-button type='text' @click='addRow'>添加行(Row)</el-button>
			<el-button type='text' @click='addColumn'>添加列(Column)</el-button>
			<el-button type='text' @click='submitdata'>保存并提交</el-button>
		</div>
		<div >
			<el-table
				:data='customdata.table_data'
				border
				@cell-dblclick= 'editcell'
				@header-click='setCol'
				style='width: 100%;font-size: 12px;min-height: 450px;text-align: center;'
				>
				<el-table-column
				      fixed="left"
				      label="操作"
				      width="80	"
				      prop = 'setrow'
				      style='text-align: center;'
				      >
				      <template scope="scope">
				        <el-button @click.native.prevent="deleteRow(scope.$index, customdata.table_data)" type="text" size="small">删除</el-button>
				      </template>
				</el-table-column>
				<el-table-column
					v-for='item in customdata.table_header'	
					:key='item.prop'
					:label='item.label'
					:prop='item.prop'
					:width = 'item.width'					
					>	
					
				</el-table-column>	
				
			</el-table>
			
			<!--编辑单元格的盒子-->
			<div id="editerbox" style="display: none;"> 
				<el-input
				  id='inputcell'
				  type="textarea"
				  :autosize="{ minRows: 4}"
				  v-model="celltext"
				  @blur='leavebox'
					
				  >
				</el-input>
			</div>
			<!--编辑表头的盒子-->
			<div class="tableheaderEdit" id="headerbox">
				 <ul>
				 	<li class="editheader" @click="editheader"> <span>编辑</span>
				 		<div id="headerlabelbox">
				 			<el-input type='textarea' v-model='headerlabel' id='headerlabelinput' @blur = 'saveheaderlabel'>				 				
				 			</el-input>				 			
				 		</div>
				 	</li>
				 	<li class="delheader" @click='delCol'><span>删除</span></li>
				 	<li @click="closebox"><span>关闭</span></li>
				 </ul>			
			</div>			
		</div>	
	
		<div id="tipsbox" style="">
			<div class="boxmark"></div>
			<div class="boxcontent">
				<div>
					<p>请输出新建表的名称：</p>	
					<el-input type='text'  v-model='customdata.table_name'></el-input> 
					<p>选择数据的图层类型：</p>
					<el-select v-model="geomtype" placeholder="请选择">
					    <el-option
					      v-for="item in geomtypelist"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					      <span style="float: left">{{ item.label }}</span>
					      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
					    </el-option>
					</el-select>
					
				</div>
				<br /><br /><br />
				<el-button type='primary' @click='createtable'>创建表</el-button>
			</div>
		</div>
		
		
	</div>

</template>

<script>
	
	export default{
		name: 'customdatabox',
		data(){
			return{
				address:'',
				customdata:{
					table_name:'table_' + new Date().getTime(),
					table_data:[
											
					],
					table_header:[
						{'prop':'data_id','label':'data_id','type':'number','width':100}
					]
				},
				celltext:'',
				headerlabel: '',
				activecell:{},
				activeheader:{},
				geomtype:'none',
				geomtypelist:[
						{
				          value: 'none',
				          label: '无类型'
				        }, {
				          value: 'StringLine',
				          label: '线'
				        }, {
				          value: 'Point',
				          label: '点'
				        },{
				          value: 'Poly',
				          label: '面'
				        }
				    ]
			}			
		},
		methods: {
			goDataSet(tabname){
	    		this.$emit('refreshdata',tabname)
	    	},
			createtable(){ // 用户选择创建的几何数据类型 并创建表单
			
				if(this.tablename != ''){
					
					if(this.geomtype != 'none'){
						this.customdata.table_header.push({'prop':'the_geom','label':'the_geom','type':'string','width':120})					
					}
					
					document.getElementById('tipsbox').style.display='none'
					this.customdata.table_header.push({'prop':'name','label':'name','type':'string','width':120});
					
				}else{				
					this.$message.error('错了哦，表名不能为空！');
				}			
			},
			clearall(){ // 清空表单 
				 this.$confirm('此操作将清空您之前写入的数据, 是否继续?', '警告', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          this.$message({
			            type: 'success',
			            message: '清空成功!'
			          });
			          this.customdata = {
			          		table_name:'table_' + new Date().getTime(),
							table_data:[
								
							],
							table_header:[
								{'prop':'data_id','label':'data_id','type':'number','width':100}
							]
						};
						this.celltext = '';
						this.headerlabel = '';
						this.activecell={};
						this.activeheader={};
						this.address = '';
						document.getElementById('tipsbox').style.display='block';
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消清空！'
			          });          
			        });
				
			},
			hasProp(i,arr,prop){ // 判断数组中某一对象的prop属性是否与修改的重复 i表示修改的值  arr表示匹配的数组 prop表示匹配的属性名
				for(let index in arr){
					if(arr[index][prop] == i){
						return true;
					}
				}
				return false	
			},
			saveheaderlabel(){ // 保存修改后的字段名
				let headerlabelbox = document.getElementById('headerlabelbox');
				let box = document.getElementById('headerbox');
				let h = this.customdata.table_header;// 表头数组
				let b = this.customdata.table_data; // 数据数组
				let index = this.activeheader.index; // 待修改元素的index
				let prop = this.activeheader.prop; // 待修改元素的属性值或字段名
				let la = this.headerlabel; // 修改的值
				if(la != '' && h[index].prop != la ){						 
					let re = new RegExp('^[A-Za-z][A-Za-z0-9_]*$');// 这是判断标识符的正则							
					if(re.test(la) && !this.hasProp(la,h,'prop')){ // 需要匹配正确的标识符，还需要判断是否和其他字段名相同
						// 修改tableheader中的prop和label
						h[index].prop = la;
						h[index].label = la ;
						// 修改data中的prop属性名 （对象的属性名修改容易造成内存泄漏，不建议修改，这里没办法 (；′⌒`)）
						b.forEach(function(item){
							let c = item[prop];
							item[la] = c;
							delete item[prop];
						})
						headerlabelbox.style.display = 'none';					
						box.style.display = 'none';
						this.headerlabel ='';		
					}else{
						this.$notify.error({
				          title: '错误',
				          message: '字段名不符合标识符要求或与已有字段的冲突！请重新填写！',
				          duration: 1500
				      });		
					}	
				}else{
					this.$notify.error({
			          title: '错误',
			          message: '字段名不能为空或并未修改！',
			          duration: 1500
			       });	
				}			
			},
			closebox(){				
				let box = document.getElementById('headerbox');
				box.style.display = 'none';
				document.getElementById('headerlabelbox').style.display='none'
			},
			setCol(column,event){ // 列设置
				
//				console.log('deleteCol')
//				console.log(column,event)
				let h = this.customdata.table_header;
				let b = this.customdata.table_data;
				let box = document.getElementById('headerbox');
				let oprop = column.property;				
				if(oprop!= 'data_id' && oprop!= 'the_geom' && oprop!= 'setrow'){
					box.style.display = 'inline-block'
					box.style.left = event.clientX-60+'px';
		  			box.style.top = event.clientY+5+'px'; 
					for (let index in h){
						if(h[index].prop == oprop){
							this.activeheader.index = index ;
							this.activeheader.prop = oprop;
						}				
					}				
				}			
			},
			editheader(){ // 列头编辑
//				console.log('编辑',this.activeheader);
				let headerlabelbox = document.getElementById('headerlabelbox');
				headerlabelbox.style.display = 'inline-block';			
			},
			delCol(){ // 删除列
//				console.log('删除',this.activeheader);
				let index = this.activeheader.index;
				let prop = this.activeheader.prop;
				let h = this.customdata.table_header;
				let b = this.customdata.table_data;
				let box = document.getElementById('headerbox');
				document.getElementById('headerlabelbox').style.display='none'
				box.style.display = 'none'
				h.splice(index, 1);
				b.forEach(function(item){					
					delete item[prop]
				})				
			},
			deleteRow(index, rows) { // 删除行
		        rows.splice(index, 1);
		        // 更新data_id 
		        let b = this.customdata.table_data;
		        b.forEach(function(item,index){
		        	item.data_id = index+1;
		        })	        
		     },
			submitdata(){ //提交并保存数据
				console.log('提交数据！')
				console.log(this.customdata.table_data);
				this.goDataSet('myDataSets');
			},
			addColumn(){ // 添加列
				let n = new Date().getTime();
				let h = this.customdata.table_header;
				let b = this.customdata.table_data;
				let col = {
					'prop': 'column_'+ n,
					'label': 'column_'+ n,
					'type': 'string',
					'width': 178
				}
				h.push(col);			
				// 设置默认值
				let x = col.prop;
				for( let index in b){
					let a = b[index];
					a[x]=''
				}				
			},
			addRow(){ // 添加行
				let h = this.customdata.table_header;
				let b = this.customdata.table_data;
				let row ={}
				// 设置默认值
				for (var index in h){
					let a = h[index].prop; 
					if(a == 'the_geom' ){
						row[a] = this.geomtype;
					}else{
						row[a] = ''	
					}
									
				}
				b.push(row);
				row['data_id'] = b.indexOf(row) + 1;
//				console.log(b);
			},
			leavebox(event){
//				console.log(event);				
				let index = this.activecell.index ;
				let prop = this.activecell.prop;
				let arr = this.customdata.table_data[index];
				arr[prop] = this.celltext;
				this.$set(this.customdata.table_data,index,arr); // 使用$set操作数组才能立即刷新DOM 
//				this.customdata.table_data[index][prop] = this.celltext;
				let editbox = document.getElementById('editerbox');
				let editinput = document.getElementById('inputcell'); 
				editbox.style.display = 'none';				
			},
			editcell(row, column, cell, event){
//	  			console.log(row, column,cell, event);
	  			let index = row.data_id - 1; // 取到点击cell的index 
	  			let prop = column.property; // 取到点击cell的字段名
	  			if(prop != 'data_id' && prop!= 'setrow' && prop!= 'the_geom'){
	  				let i = this.customdata.table_data[index];
		  			let v = i[prop];
		  		  	this.celltext = v;
		  		  	this.activecell.index = index ;
		  		  	this.activecell.prop = prop;
		  			let editbox = document.getElementById('editerbox');
		  			let editinput = document.getElementById('inputcell'); 
		  			editinput.value = event.target.innerText;	  			
		  			editbox.style.display = 'block';
		  			editbox.style.left = event.clientX+5+'px';
		  			editbox.style.top = event.clientY+10+'px'; 
		  			editbox.focus()
	  			}			 	
	  		}
			
		},
		mounted(){
			
		}
	}
	
	
</script>

<style>
	#tipsbox{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		
	}
	.boxmark{
		z-index: 100;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;left: 0;bottom: 0;right: 0;
		background-color: #666;
		
	}
	.boxcontent{
		position: absolute;
		width: 500px;
		height: 300px;
		padding: 20px;
		z-index: 111;
		background-color: white;
		opacity: 1;
		margin-left: -270px;
		margin-top: -170px;
		left: 50%;	
		top: 50%;
		border: 1px solid #666666;
		border-radius: 5px;
		box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.16);
	}
	#editerbox{
		padding: 5px;
		z-index: 99;
		border: 1px #DDDDDD solid;
		display: inline-block;
		background-color: white;
		position: fixed;
		border-radius: 5px;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.16);
	}
	#inputcell{
		min-width: 250px;
	}
	.customdatabox .cell{
		text-align: left;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.el-table__body-wrapper{
		min-height: 500px;
	}
	.el-table__header-wrapper{
		background-color: #EEF1F6;
	}
	.tableheaderEdit{
		width:120px;
		position: fixed;
		display: none;
		z-index: 500;
	}
	.customdatabox .el-table__fixed{
		box-shadow: none;
	}
	.tableheaderEdit ul{
		list-style: none;
		border-radius: 4px;
		width: 100%;
		padding: 5px;
		border: 1px solid #DDDDDD;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.16);
		background-color: #FFFFFF;
	}
	.tableheaderEdit li{
		list-style: none;
		padding: 6px;
		box-sizing: border-box;
		border-radius: 5px;
		border: 1px solid #DDDDDD;		
		display: inline-block;
		width: 100%;
		line-height: 16px;
		margin-bottom:4px;
		position: relative;
	}
	.tableheaderEdit li:hover{
		border-color: #66CCFF;
	}
	#headerlabelbox{
		position: absolute;
		display: none;
		width: 150%;
		top: -5px;
		left: 125px;
		padding: 4px;
		border-radius: 4px;
		border: 1px solid #DDDDDD;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.16);
	
	}
	#headerlabelinput{
		
	}
	
</style>