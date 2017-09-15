<template>
	<div class="datamodel">
		<div v-if="showList==true&&childData.data.length>0" class="dmodel_title">
			<div class="dmt_tabs">
				<a v-if="islist==false" @click="switchlist(false)" class="dmt_graph fa fa-th-large active"></a>
				<a v-else @click="switchlist(false)" class="dmt_graph fa fa-th-large"></a>
				<a v-if="islist==false" @click="switchlist(true)" class="dmt_list fa fa-list-ul"></a>
				<a v-else @click="switchlist(true)" class="dmt_list fa fa-list-ul active"></a>
			</div>
		</div>
		<div v-if="islist==false" class="dmodel_content dmodel_content1">
			<div v-for="item in childData.data" :key="item.id">
				<!--数据中心数据-->
				<div v-if="item.projecttype==18">
					<!--空间数据-->
					<div v-if="item.isgeom==true">
						<div v-if="item.type==2||item.type==3||item.type==4||item.type==5||item.type==6||item.type==7||item.type==9" class="new-form create_form">
							<div class="myf_img" @mouseenter="handleMousrOver" @mouseleave="handleMousrOut">
								<img v-if="(item.img==null||item.img=='')&&(item.type==2||item.type==7)" src="/static/Index/img/point.png">
								<img v-else-if="(item.img==null||item.img=='')&&(item.type==3||item.type==5)" src="/static/Index/img/line.png">
								<img v-else-if="(item.img==null||item.img=='')&&(item.type==4||item.type==6)" src="/static/Index/img/polygon.png">
								<img v-else :src="item.img">
								<div class="myf_inst_vo">

									<el-button type="info" @click="designItem(item.id)">设计</el-button>

									<el-button type="info" @click.prevent="toEdit(item.id)">编辑</el-button>
									<!--<el-button type="info">移动</el-button>-->
									<!--<el-button type="info">共享</el-button>-->
									<el-button type="danger" @click="deleteItem(item.id)">删除</el-button>
								</div>
							</div>
							<div class="myf_text">
								<p>
									<a class="detail_model" service_id="124">{{item.name}}({{item.id}})</a>
									<span class="myfs_type"></span>
								</p>
								<div class="myft_author">
									<span class="myft_au">{{item.author}}</span>
									<span class="myft_date">{{item.pubdate}}</span>
								</div>
							</div>
						</div>
					</div>
					<!--普通表格数据-->
					<div v-else>
						<div v-if="item.type==2||item.type==3||item.type==4||item.type==5||item.type==6||item.type==7||item.type==9" class="new-form create_form">
							<div class="myf_img" @mouseenter="handleMousrOver" @mouseleave="handleMousrOut">
								<img v-if="item.img==null||item.img==''" src="/static/Index/img/table.png">
								<img v-else :src="item.img">
								<div class="myf_inst_vo">

									<el-button type="info" @click="designItem(item.id)">设计</el-button>
									<el-button type="info" @click.prevent="toEdit(item.id)">编辑</el-button>
									<!--<el-button type="info">移动</el-button>-->
									<!--<el-button type="info">共享</el-button>-->
									<el-button type="danger" @click="deleteData(item.id)">删除</el-button>
								</div>
							</div>
							<div class="myf_text">
								<p>
									<a class="detail_model" service_id="124">{{item.name}}</a>
									<span class="myft_type"></span>
								</p>
								<div class="myft_author">
									<span class="myft_au">{{item.author}}</span>
									<span class="myft_date">{{item.pubdate}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--默认创建数据类型-->
				<div v-if="item.type==27" class="new-form create_form">
					<a class="add_dashboard" folder_id="" @click="addItem">
						<!--//createNewMap-->
						<img :src="item.img">
						<p class="mt10">{{item.name}}</p>
					</a>
				</div>
				<!--用户创建的数据-->
				<div v-if="item.type==28" class="new-form my_form">
					<!--<router-link :to='childData.url'>-->
					<div class="myf_img" @mouseenter="handleMousrOver" @mouseleave="handleMousrOut">
						<img :src="item.img">
						<div class="myf_inst_vo">
							<el-button @click="previewItem(item)" type="info">预览</el-button>
							<el-button @click="editItem(item.id)" type="info">编辑</el-button>
							<!--<el-button type="info">移动</el-button>-->
							<el-button @click="shareItem(item)" type="info">{{item.isshare?"已分享":"分享"}}</el-button>
							<el-button @click="deleteItem(item.id)" type="danger">删除</el-button>
						</div>
					</div>
					<div class="myf_text">
						<p>
							<a class="detail_model" service_id="124">{{item.name}}</a>
						</p>
						<div class="myft_author">
							<span class="myft_au">{{item.author}}</span>
							<span class="myft_date">{{item.pubdate}}</span>
						</div>
					</div>

					<!--</router-link>-->
				</div>
				<!--分享的数据-->
				<div v-if="item.type==29" class="new-form exchange_form">
					<!--<router-link :to='childData.url'>-->
					<div class="exf_img" @mouseenter="handleMousrOver" @mouseleave="handleMousrOut">
						<img :src="item.img">
						<div class="exf_inst_vo">
							<router-link :to="childData.url.preview+item.id">
								<el-button type="success">预览</el-button>
							</router-link>
							<el-button v-if="item.usable||item.price==0" type="info">使用</el-button>
							<el-button v-else type="info">购买</el-button>
						</div>
					</div>
					<div class="exf_text">
						<p>
							<a class="detail_model" service_id="124">{{item.name}}</a>
							<span v-if="item.usable&&item.price>0" class="s-fc4"> 已购买</span>
						</p>
						<div v-if="item.price==0" class="exft_price">免费</div>
						<div v-else class="exft_price">售价：{{item.price}}图道豆</div>
						<!--￥-->
						<div class="exft_author">
							<span class="exft_au">{{item.author}}</span>
							<span class="exft_date">{{item.pubdate}}</span>
						</div>
					</div>

					<!--</router-link>-->
				</div>
				<div v-if="item.type==30" class="new-form exchange_form">
					<div class="myc_img" @mouseenter="handleMousrOver" @mouseleave="handleMousrOut">
						<div class="myc_img_name">{{item.commentaries}}</div>
						<!--<img :src="item.img">-->
						<div class="myf_inst_vo">

							<router-link :to="childData.url.edit+item.id">
								<el-button type="info">编辑</el-button>
							</router-link>
							<!--<el-button type="info">移动</el-button>-->
							<el-button type="info">共享</el-button>
							<el-button @click="deleteItem(item.id)" type="danger">删除</el-button>

						</div>
					</div>
					<div class="myf_text">
						<p>
							<a class="detail_model" service_id="124">{{item.commentaries}}</a>
							<span class="myft_type"></span>
						</p>
						<div class="myft_author">
							<span class="myft_au">{{item.data_source}}</span>
							<span class="myft_date">{{item.data_update}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="dmodel_content dmodel_content2" style="margin:30px;">

			<el-table :data="childData.data" border style="width: 100%">
				<el-table-column sortable prop="name" label="名称" min-width="200">
				</el-table-column>
				<el-table-column prop="price" label="价格" min-width="100">
				</el-table-column>
				<el-table-column prop="author" label="市区" min-width="100">
				</el-table-column>
				<el-table-column prop="author" label="创建者" min-width="100">
				</el-table-column>
				<el-table-column label="更新时间" min-width="150">
					<template scope="scope">
						<el-icon name="time"></el-icon>
						<span style="margin-left: 10px">{{ scope.row.createdate }}</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" min-width="200">
					<template scope="scope">
						<el-tooltip effect="dark" placement="top" content="预览">
							<el-button class="fa fa-television" style="width: 30px;height: 30px;margin: 0 2px;" size="small" @click="handleEdit(scope.$index, scope.row)"></el-button>
						</el-tooltip>
						<el-tooltip effect="dark" placement="top" content="编辑">
							<el-button class="fa fa-edit" style="width: 30px;height: 30px;margin: 0 2px;" size="small" @click="handleEdit(scope.$index, scope.row)"></el-button>
						</el-tooltip>
						<el-tooltip effect="dark" placement="top" content="删除">
							<el-button class="fa fa-trash" style="width: 30px;height: 30px;margin: 0 2px;" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>
						</el-tooltip>

					</template>

				</el-table-column>
			</el-table>
		</div>

		<!-- 创建地图选择弹出框dialog -->
		<el-dialog title="创建地图" :visible.sync="dialogCreateMapVisible" :close-on-press-escape="false" :close-on-click-modal="false">
			<div class="data-map-main">
				<div class="edit-log">
					<el-row :gutter="10" v-if="!isDataView">
						<el-col :xs="24" :sm="24" :md="12" :lg="12">
							<el-input v-model="mapInfo.name" placeholder="请输入地图名称"></el-input>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12">
							<el-input v-model="mapInfo.description" placeholder="请输入地图描述"></el-input>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24">
							<el-input type="textarea" autosize placeholder="请输入地图标签(以逗号隔开)" v-model="mapInfo.tag" style="margin: 10px 0;">
							</el-input>
						</el-col>
					</el-row>
					<div v-if="isDataView">
						<!-- 数据列表 -->
						<div class="data-list" v-loading="datalistLoading">
							<ul>
								<li :class="[ item.checked ? 'data-checked' : '', 'data-item' ]" v-for="item in data_list" :key="item.name" @click="dataClick(item)">
									<i class="datatype" :class="item.layertype"></i>
									<span>{{item.name}}</span>
									<span>{{item.description}}</span>
								</li>
							</ul>

							<el-pagination @current-change="currentDataChange" :current-page.sync="dataCurrentPage" :page-size="10" layout="total,  prev, pager, next, jumper" :total="dataTotal" style="text-align: center">
							</el-pagination>
						</div>
						<!-- 数据列表结束 -->
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCreateMapVisible = false">取 消</el-button>
				<el-button type="primary" @click="showDataView" v-show="!isDataView">继 续</el-button>
				<el-button type="primary" @click="toRender" v-show="isDataView">创 建</el-button>
			</div>
		</el-dialog>

		<!--分享时的模态框-->
			<div class="tip" v-show="sharebox">
	  			 <div class="model-bg">
	  			 		<div class="model-box">
	  			 			<div class="model-header">
	  			 				<h3>请选择您需要分享的方式</h3>
	  			 				<span class="close-model" @click="closeShare">X</span>
	  			 			</div>
	  			 			<div class="model-content">
	  			 				<div class="c_top">
	  			 					<el-checkbox v-model="issecret">{{issecret? "加密" : "不加密"}}</el-checkbox>
	  			 				</div>

	  			 				<div class="c_body" v-show="issecret">
	  			 					<el-input v-model="sharePassword" placeholder="请输入您的分享密码"></el-input>
	  			 				</div>

	  			 			</div>
	  			 			<div class="model-footer">
	  			 				<el-button @click="closeShare">取消</el-button>
								<el-button type="primary" @click="goshare">分享</el-button>
	  			 			</div>
	  			 		</div>
	  			 </div>
	  		</div>


	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	export default {
		name: 'datamodel',
		data() {
			return {
				shareitem:{},
				sharePassword:'',
				issecret:false,
				sharebox:false,
				formPath: '/formDesign/init/',
				title: "文件夹",
				activeName: 'first',
				islist: false,

				/* 创建地图dialog */
				dialogCreateMapVisible: false,
				mapInfo: {
					name: '',
					description: '',
					tag: '',
				},
				isDataView: false,

				datalistLoading: false,
				data_list: null,
				data_url: '/mapdesign/maps/layers',
				dataCurrentPage: 1,
				dataTotal: null,
				/* 创建地图dialog */
			}
		},
		computed: {
			...mapGetters([
				'render',
			]),
		},
		props: {
			childData: {
				type: Object,
				default: function() {
					return {
						type: 27,
						data: [{
							formid: 1,
							name: "空白表单",
							img: "/static/Index/img/newform.png",
							url: "/formDesign/init/new",
							usable: true,
							price: 0,
							author: "管理员",
							createdate: "2017-08-08"
						}],
					} //这样可以指定默认的值
				}

			},
			showList: {
				type: Boolean,
				default: function() {
					return false //这样可以指定默认的值
				}

			}
		},
		methods: {
			...mapActions([
				'setNewMapInfo', // 保存下创建新地图的基础信息
				// 数据列表页，对用户勾选的数据进行id记录    添加， 删除， 重置
				'addDataIdChecked', 'removeDataIdChecked', 'resetDataIdChecked',
				'setCurrentDataId', 'setEditLog',
			]),

			/* 创建地图选择时选择数据 */
			createNewMap() {
				this.dialogCreateMapVisible = true;
			},

			/* 用户数据列表展示 */
			showDataView() {
				this.isDataView = true;
				this.resetDataIdChecked();
				console.log(this.render.dataIdChecked)
				this.fetchData();
			},

			/* 获取用户数据集 */
			fetchData() {
				this.datalistLoading = true;

				// var url = this.getLogin.userName + this.data_url; TODO
				var url = 'TBUSER000001' + this.data_url;
				this.$http.get(url).then((res) => {
					if(!res.data.data) {
						console.log('获取用户数据集: ' + res.data.data);
						return;
					}

					var list = [];
					res.data.data.forEach((item) => {
						item.checked = false;
						list.push(item);
					});
					this.data_list = list;
					this.dataTotal = this.data_list.length;
					this.datalistLoading = false;
				}).catch((err) => {
					console.log(err)
				});
			},

			/* 数据列表当前页数改变 */
			currentDataChange(val) {
				this.dataCurrentPage = val;
				this.fetchData(this.data_url, this.dataCurrentPage);
			},

			dataClick(item) {
				item.checked = !item.checked;
				if(item.checked) {
					this.addDataIdChecked(item.layerid);
				} else {
					this.removeDataIdChecked(item.layerid);
				}
				/*console.log(this.render.dataIdChecked);
				 debugger*/
			},

			/* 选择好数据后跳至地图渲染页面 */
			toRender() {
				if(this.render.dataIdChecked.length === 0) {
					this.$message({
						showClose: true,
						message: '请先选择图层',
						type: 'warning',
					});
					return;
				}

				/* 进入地图渲染页面之前，在vuex中先保存下新地图的基础信息 */
				for(let i in this.mapInfo) {
					let _temObj = {
						key: '',
						value: ''
					};
					_temObj.key = i;
					_temObj.value = this.mapInfo[i];
					this.setNewMapInfo(_temObj);
				}

				this.$router.push('/mapdesign/new');
			},
			/* 跳转至geo数据编辑界面 */
			toEdit(id) {
				this.setCurrentDataId(id); // 重置用户选择的数据id
				this.setEditLog(false); // 重置编辑界面右侧条的伸缩
				this.$router.push('/datacenter/edit/' + id);
			},
			deleteData() {


			},

			shareItem(item){
				// 分享表单部分
				console.log("share",item);
				if(item.isshare){
					 this.$confirm('内容已分享请勿重复分享！', '提示', {
				          confirmButtonText: '去看看',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				           // 跳转到。。。

				        }).catch(() => {});
				}else{
					this.sharebox = true;
					this.shareitem = item;
				}
			},
			goshare(){
				var url = "form/share",
					data = {
						userid :'TBUSER000002' , // 这里的userid 是登录之后的用户
						formid :this.shareitem.id ,
						issecret:this.issecret ,
						code:this.sharePassword
					},
			 		prams = encodeURI("data="+JSON.stringify(data));
				console.log(prams);

				this.$http.post(url,prams)
		      	.then((res) => {
		      		console.log(res);

		      	}).catch((error) => {
		      		console.log("出错了",error);
		      	});
			},
			closeShare(){
				this.sharebox = false;
				this.sharePassword = '';
				this.issecret = false;
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleEdit(tab, event) {
				console.log(tab, event);
			},
			handleDelete(tab, event) {
				console.log(tab, event);
			},
			handleMousrOver(event) {
				event.target.lastElementChild.style.display = "block";
			},
			handleMousrOut(event) {
				event.target.lastElementChild.style.display = "none";
			},
			switchlist(flag) {
				this.islist = flag;
			},

			deleteItem(id) {
				this.$emit("deleteItem", id);
			},
			designItem(id) {
				this.$emit("designItem", id);
			},
			editItem(id) {
				this.$emit("editItem", id);
			},
			previewItem(item) {
				this.$emit("previewItem", item);
			},
			addItem() {
				this.$emit("addItem");
			}
		},
		created() {
			//console.log(this.childData);
		},
		mounted() {
			console.log(this.childData);
		}
	}
</script>

<style lang="less">
	@base_img: '../../../static/Index/img/';

.model-bg{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.7);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999999999;
	text-align: center;
	.model-box{
		color: #333333;
		position: absolute;
		width: 600px;
		height: 420px;
		margin-left: -300px;
		top: 200px;
		left: 50%;
		background-color: #FFF;
		border-radius: 6px;
		.model-header{
			height: 30px;
			position: relative;
			border-bottom: 1px solid #E5E9ED;
			.close-model{
				display: inline-block;
				height: 16px;
				width: 16px;
				line-height: 16px;
				top:5px;
				right: 25px;
				position: absolute;
				cursor:pointer;
				&:hover{
					color: #66CCFF;
					background-color: #EEEEEE;
				}
			}
		}
		.model-content{
			padding-top: 30px;
			.c_top{

			}
			.c_body{
				width: 50%;
				margin: 0 auto;
				padding: 30px 0;
			}
		}
		.model-footer{
			position: absolute;
			bottom: 10%;
			left: 0;
			text-align: center;
			width: 100%;
		}
	}
}
	.new-form {
		width: 235px;
		border: 1px solid #ddd;
		margin: 15px;
		text-align: center;
		font-size: 14px;
		margin-top: 10px;
		float: left;
		&:hover {
			border: 1px solid #20a0ff;
			box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
			cursor: pointer;
		}
		img {
			width: 100px;
			height: 100px;
		}
		p {
			margin: 0;
			padding: 0;
			margin-top: 9px;
		}
	}

	.add_dashboard {
		color: #666;
		display: block;
		padding: 50px 0;
	}

	.exf_img {
		width: 100%;
		position: relative;
		background: #fcfeff;
	}

	.myf_img {
		width: 100%;
		position: relative;
		background: #fcfeff;
	}

	.myc_img {
		width: 100%;
		position: relative;
		background: #50bfff;
	}

	.exf_img img {
		width: 100%;
		height: 165px;
	}

	.myc_img img {
		width: 100%;
		height: 165px;
	}

	.myc_img .myc_img_name {
		width: 100%;
		height: 165px;
		line-height: 165px;
		font-size: 35px;
		font-weight: bold;
		color: white;
	}

	.myf_img img {
		width: 100%;
		height: 165px;
	}

	.exf_text p {
		font-size: 14px;
		padding: 0 10px;
		height: 35px;
		line-height: 35px;
		color: #333;
		overflow: hidden;
		word-wrap: normal;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 0;
		text-align: left;
	}

	.myf_text p {
		font-size: 14px;
		padding: 0 10px;
		height: 35px;
		line-height: 35px;
		color: #333;
		overflow: hidden;
		word-wrap: normal;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 0;
		text-align: left;
	}

	.s-fc4 {
		color: #f05050;
	}

	.exft_price {
		height: 30px;
		line-height: 30px;
		background: #50bfff;
		font-size: 14px;
		text-align: center;
		color: #fff;
		margin: 0 10px 10px 10px;
	}

	.exft_author,
	.myft_author {
		padding: 0 10px;
		color: #999;
		font-size: 12px;
		height: 30px;
	}

	.myf_text p .myfs_type {
		float: right;
		width: 25px;
		height: 25px;
		line-height: 35px;
		background: url("@{base_img}spatialdata.png") no-repeat;
		margin: 5px;
		background-size: 100% 100% !important;
	}

	.myf_text p .myft_type {
		float: right;
		width: 25px;
		height: 25px;
		line-height: 35px;
		margin: 5px;
		background-size: 100% 100% !important;
		background: url("@{base_img}tabledata.png") no-repeat;
	}

	.exft_au,
	.myft_au {
		float: left;
	}

	.exft_date,
	.myft_date {
		float: right;
	}

	.exf_inst_vo,
	.myf_inst_vo {
		width: 100%;
		height: 165px;
		background: rgba(0, 0, 0, 0.6);
		position: absolute;
		left: 0;
		top: 0;
		text-align: center;
		line-height: 165px;
		display: none;
	}

	.myf_inst_vo button {
		font-size: 12px;
		padding: 4px 6px;
		margin-left: 3px;
	}

	.el-button+.el-button {
		margin-left: 3px;
	}

	.dmt_tabs {
		text-align: right;
		line-height: 40px;
		margin: 10px;
		float: right;
		margin-right: 30px;
	}

	.dmt_tabs a {
		width: 32px;
		height: 32px;
		line-height: 32px;
		border-radius: 999em;
		border: 2px solid #eee;
		text-align: center;
		color: #666;
		font-size: 12px;
		float: right;
	}

	.dmt_tabs a:hover {
		cursor: pointer;
	}

	.dmt_tabs .active {
		background: #50bfff;
		color: white;
		float: right;
	}

	.el-button--small {
		padding: 7px 7px;
		border-radius: 999em;
	}

	.el-tooltip button {
		height: 30px;
		width: 30px;
	}

	.el-table__body-wrapper {
		min-height: 50px !important;
	}

	.dmodel_content1 .my_form {
		height: 235px;
	}

	.dmodel_title {
		width: 100%;
		float: left;
	}

	.datamodel {
		float: left;
		width: 100%;
		padding-left: 20px;
	}
	/* 创建地图弹出框开始 */

	.datatype {
		display: inline-block;
		height: 50px;
		width: 50px;
		font-style: normal;
		background-repeat: no-repeat;
		background-size: 50px 50px;
		vertical-align: bottom;
		border: 1px solid #66CCFF;
	}

	.btn-container {
		display: flex;
		justify-content: space-between;
		height: 50px;
		align-items: center;
	}

	.LineString,
	.MultiLineString {
		background-image: url(../../assets/mapDesign/img/esriGeometryPolyline.png);
	}

	.Point,
	.MultiPoint {
		background-image: url(../../assets/mapDesign/img/esriGeometryPoint.png);
	}

	.Polygon,
	.MultiPolygon {
		background-image: url(../../assets/mapDesign/img/esriGeometryPolygon.png);
	}

	.esriGeometryPolygon {
		background-image: url(../../assets/mapDesign/img/esriGeometryPolygon.png);
	}

	.esriGeometryPolyline {
		background-image: url(../../assets/mapDesign/img/esriGeometryPolyline.png);
	}

	.esriGeometryPoint {
		background-image: url(../../assets/mapDesign/img/esriGeometryPoint.png);
	}

	.data-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		width: 100%;
		padding: 10px 30px;
		line-height: 60px;
		margin-bottom: 10px;
		cursor: pointer;
		border: 1px solid #ECECEC;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.data-checked {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		width: 100%;
		padding: 10px 30px;
		line-height: 60px;
		margin-bottom: 10px;
		cursor: pointer;
		border: 1px solid #66CCFF;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.data-item:hover {
		border: 1px solid #66CCFF;
	}
	/* 创建地图弹出框结束 */
</style>
