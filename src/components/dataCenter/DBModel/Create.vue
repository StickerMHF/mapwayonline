<template>
	<div class="dbmodel-create" id="dbmodel-create">
		<div class="dbtc_top">
			<div class="dbtct_title">
				<input class="dbtc_name" v-model="model.name">
				<el-button type="primary" class="dbtc_save">保存</el-button>
			</div>
			<div class="dbtct_date">
				<button v-if="datas.type=='UPDATE'" class="dbtc_pub" style="background: #ffb308;border: 1px solid #ffb308;">UPDATE</button>
				<button v-else class="dbtc_pub">CREATE</button>
				<span class="dbtc_time">时间</span>
			</div>
		</div>
		<el-row style="height: 100%;">
			<el-tabs v-model="activeName" @tab-click="handleClick" style="height: 100%;">
				<el-tab-pane label="SQL" name="first" style="height: 100%;">
					<div class="dbtc_sqlhead">
						<span @click="clearsql"><i class="fa fa-eraser"></i></span>
						<span @click="runsql"><i class="fa fa-caret-right"></i></span>
					</div>
					<div class="dbtc_sqltext">
						<div id="sql_text" class="dbtc_sqltext_content sql_text" @blur="sqlValidation" contenteditable="true">{{dbmodeldata.textareasql}}</div>
						<!--	<el-input style="height: 100%;" class="sql_text"  type="textarea" placeholder="select * from table" v-model="textareasql">-->
						<!--</el-input>-->
					</div>
					<div class="dbtc_sqlresult" style="height: 100%">
						<TableList :tabledata="tabledata"></TableList>
					</div>
				</el-tab-pane>
				<el-tab-pane label="建模" name="second" style="height: 100%;">
					<el-col :span="4" style="height: 100%;">
						<div class="dbmodel_left">
							<div class="dbml_top">
								<h5>我的数据表</h5>
							</div>
							<draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="dragStart" @end="dragEnd">
								<transition-group type="transition" :name="'flip-list'">
									<li class="list-group-item" v-for="element in list" :key="element.id" :id="element.id">
										<i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i> {{element.name}}
									</li>
								</transition-group>
							</draggable>
						</div>
					</el-col>
					<el-col :span="20" style="height: 100%;">
						<div class="dbmodel_content">
							<draggable element="span" v-model="dbmodeldata.list2" :options="dragOptions" :move="onMove" @start="dragStart" @end="dragEnd" style="width: 100%;height: 100%;">
								<transition-group name="no" class="list-group" tag="div" style="width: 100%;height: 100%;">
									<div class="dbm_table" v-for="element in dbmodeldata.list2" :key="element.id" :id="element.id">
										<!--<i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i> {{element.name}}-->
										<SQLBuilder :sqldata="element"></SQLBuilder>
									</div>
								</transition-group>
							</draggable>
						</div>
					</el-col>
					
				</el-tab-pane>
			</el-tabs>

		</el-row>
	</div>
</template>
<script>
	import draggable from 'vuedraggable'
	import TableList from '../../common/TableList.vue';
	import SQLBuilder from '../../common/SQLBuilder.vue';
	const message = ['vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based', 'on', 'Sortablejs']
	export default {
		name: 'dbmodel-create',
		components: {
			draggable,
			TableList,
			SQLBuilder
		},
		data() {
			return {
				listtest: message.map((name, index) => {
					return {
						name: name,
						index: index + 1,
						id: ""
					};
				}),
				model: {
					name: "名称"
				},
				datas: {
					tableid: null,
					type: "add"
				},
				dbmodeldata: {
					textareasql: 'select * from [tbdata000003] where 1=1',
					list2: [{
						"id": "TBDATA000010",
						"name": "信息表",
						"img": null,
						"pubdate": "2017-08-24 18:08:46",
						"modifydate": "2017-08-25 15:24:30",
						"usable": null,
						"price": null,
						"isshare": false,
						"projecttype": 18,
						"isgeom": true,
						"author": "管理员",
						"type": 4,
						"fields": [{
							"aliasname": "日期",
							"type": "timestamp without time zone",
							"name": "date_5",
							"notnull": false,
							"typename": "Date",
							"typecnname": "日期"
						}, {
							"aliasname": "浮点型_",
							"type": "numeric",
							"name": "double_1",
							"notnull": false,
							"typename": "Double",
							"typecnname": "浮点型"
						}]
					}]
				},
				list: [],

				editable: true,
				isDragging: false,
				delayedDragging: false,
				activeName: 'second',
				tabledata: {
					data: [],
					fields: []
				},
				tablenum: 0

			}
		},
		computed: {
			dragOptions() {
				return {
					animation: 0,
					group: 'description',
					disabled: !this.editable,
					ghostClass: 'ghost'
				};
			},
			listString() {
				return JSON.stringify(this.list, null, 2);
			},
			list2String() {
				return JSON.stringify(this.dbmodeldata.list2, null, 2);
			}
		},
		methods: {

			initEvent() {
				var that = this;
				this.$bus.on('initDBModelCreate', (obj) => {

				});
			},
			orderList() {
				this.list = this.list.sort((one, two) => {
					return one.order - two.order;
				})
			},
			onMove({
				relatedContext,
				draggedContext
			}) {
				const relatedElement = relatedContext.element;
				const draggedElement = draggedContext.element;
				return(!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
			},
			dragEnd(e) {
				if(this.dbmodeldata.list2.length > this.tablenum) {
					//this.getFieldsById(e.item.id);
					this.$message('添加表' + e.item.id);
				} else if(this.dbmodeldata.list2.length < this.tablenum) {
					this.$message('删除表' + e.item.id);
				}
				this.isDragging = false;
			},
			//开始拖拽
			dragStart() {
				this.tablenum = this.$Tools.cloneObj(this.dbmodeldata.list2).length;
				this.isDragging = true
			},
			//根据表名获取所有字段
			getFieldsById(tid) {
				var that = this;
				var url = this.$http.defaults.baseURL + 'TBUSER000001/datacenter/datas/' + tid + '/field';
				that.$http.get(url).then((r) => {
					if(r.data.result) {
						that.addFieldsToList(tid, r.data.data);
					}
				});
			},
			//将查询的表字段添加到tablelist中
			addFieldsToList(tid, fields) {
				var that = this;
				this.dbmodeldata.list2.map((item, index) => {
					if(item.id === tid) {
						item.fields = fields;
					} else {
						item.fields = [];
					}
					return item
				});
			},
			init() {
				var that = this;
				var url = this.$http.defaults.baseURL + 'TBUSER000001/datacenter/datas';
				that.$http.get(url).then((r) => {
					if(r.data.result) {
						that.list = r.data.data;
					}
				});

			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			sqlValidation(event) {
				this.dbmodeldata.textareasql = event.target.innerText;
				var flag = this.$Tools.AntiSqlValid(event.target.innerText);
				if(flag) {

				} else {
					this.$message({
						message: '请您不要在参数中输入特殊字符和SQL关键字',
						type: 'error',
						duration: 3000
					});
					event.target.focus();
				}

			},
			clearsql() {
				document.getElementById("sql_text").innerHTML = "";
				this.dbmodeldata.textareasql = document.getElementById("sql_text").innerText;
			},
			runsql() {
				var that = this;
				var params = "data=" + JSON.stringify({
					sql: this.dbmodeldata.textareasql
				});
				var url = this.$http.defaults.baseURL + 'TBUSER000001/datamodel/runsql';
				that.$http.post(url, params).then((r) => {
					if(r.data.result) {
						that.tabledata = r.data.data;
					} else {
						this.$message.error(r.data.message);
					}
				});
			}
		},
		watch: {
			isDragging(newValue) {
				if(newValue) {
					this.delayedDragging = true
					return
				}
				this.$nextTick(() => {
					this.delayedDragging = false
				})
			}
		},
		updated(evt, data, event) {
			//console.log("updated" + this.datas.tableid);
		},
		activated() {
			console.log("activated");
		},
		destroyed() {
			//console.log("destroyed" + this.datas.tableid);
		},
		created() {
			this.initEvent();
			this.init();
			console.log("created");
		},
		mounted() {
			console.log("mounted");
		}
	}
</script>

<style>
	.dbmodel-create {
		width: 100%;
		margin: 0 auto;
		height: 100%;
	}
	
	.dbmodel_left {
		height: 100%;
		border-right: 1px solid #ddd;
	}
	
	.dbml_top {
		background: #d1dbe5;
		height: 35px;
		line-height: 35px;
		text-align: center;
	}
	
	.dbml_top h5 {
		margin: 0px;
		padding: 0px;
	}
	
	.dbmodel_content {
		height: 100%;
	}
	
	.dbmodel-create .el-tabs__content {
		height: 100%;
	}
	
	.sql_text {
		height: 100%;
		border: 1px solid #000000;
		background: #080808;
		border-radius: 0;
		color: white;
	}
	
	.sql_text:hover {
		border: 1px solid #000000;
	}
	
	.sql_text textarea {
		height: 100% !important;
		border: 1px solid #000000;
		color: white;
		background: black;
	}
	
	.sql_text textarea:hover {
		border: 1px solid #000000;
	}
	
	.dbtc_sqlhead {
		height: 30px;
		padding: 0 20px;
	}
	
	.dbtc_sqltext {
		height: 150px;
	}
	
	.dbtc_sqltext_content {
		outline: none;
	}
	
	.dbtc_sqlhead span {
		width: 30px;
		height: 30px;
		display: inline-block;
		text-align: center;
		line-height: 30px;
	}
	
	.dbtc_sqlhead span:hover {
		cursor: pointer;
		background: #ccc;
	}
	
	.list-group-item {
		height: 35px;
		line-height: 35px;
		padding: 0 10px;
	}
	
	.list-group-item:hover {
		cursor: pointer;
		background: #d7e2ec;
	}
</style>