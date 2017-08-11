<template>
	<div id="content-left">
		<div class="cl_head clearfix">
			<h2 @click="backToDataList">数据</h2>
			<div class="cl_header_menu dropdown">
				<i class="fa fa-plus-circle"></i>
			</div>
		</div>
		<div class="folder_box">
			<div class="tree">
				<ul>
					<li>
						<span class="view_allform">
							<div></div>
							<p>我的数据</p>
							<font class="form_count">(0)</font>
						</span>
					</li>
				</ul>
			</div>
			<div class="folder_list">
				<TreeFolder @getByTreeId="getByTree"></TreeFolder>
			</div>
			<div class="tree">
				<ul>
					<li>
						<span class="view_allform">
							<div></div>
							<p>公共数据</p>
						</span>
					</li>
				</ul>
			</div>
			<div class="tree">
				<ul>
					<li>
						<span class="view_allform">
							<div></div>
							<p>已购买的数据</p>
						</span>
					</li>
				</ul>
			</div>
			<div class="tree">
				<ul>
					<li>
						<span class="view_allform">
							<div></div>
							<p>已分享的数据</p>
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import TreeFolder from '../common/TreeFolder.vue';
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	let id = 1000;
	export default {
		name: 'content-left',
		components: {
			TreeFolder
		},
		data() {
			return {
				formPath: '/formDesign/init/'
			}
		},
		computed: {
			...mapGetters([
				'getFormList'
			])
		},
		methods: {
			...mapActions([
				'_setTreeData'
			]),
			getByTree(node, store, data, childids) {
				this.$emit("getByTree", node, store, data, childids);
			},
			backToDataList(evt) {
				this.$emit("backToDataList", evt);
			},
			gettreedata() {
				let arr = [{
					id: 999,
					name: '未命名文件夹',
					children: [{
						id: 1000,
						name: '未命名文件夹1',
						children: [{
							id: 1001,
							name: '未命名文件夹11',
							children: []
						}]
					}]
				}];
				var that = this;
				var url = this.$http.defaults.baseURL + 'TBUSER000001/datacenter/treefolder';
				that.$http.get(url).then((r) => {
					if(r.data.length == 0) {
						let arr = [{
							id: 999,
							name: '未命名文件夹',
							children: []
						}];
						this.$bus.$emit("initTreeList", arr);
					} else {
						var tree = JSON.parse(r.data[0].subitem);
					this.$bus.$emit("initTreeList", tree);
					}
					
				});
			}
		},
		created() {
			this.gettreedata();
		},
		mounted() {

		}
	}
</script>

<style scoped>
	#content-left {
		position: absolute;
		width: 260px;
		left: 0;
		top: 0;
		bottom: 0;
		overflow-y: auto;
		background: #f9f9f9;
		border-right: 1px solid #e5e9ed;
	}
	
	.clearfix:after {
		display: block;
		clear: both;
		visibility: hidden;
		height: 0;
		overflow: hidden;
		content: ".";
	}
	
	.cl_head {
		padding: 20px 18px 19px 18px;
		line-height: 22px;
		right: 0;
		left: 0;
	}
	
	.cl_head h2 {
		float: left;
		font-size: 14px;
		margin-right: 10px;
		font-weight: bold;
		color: #333;
		margin: 0;
		padding: 0;
		cursor: pointer;
		min-width: 100px;
	}
	
	.cl_header_menu {
		float: right;
		position: relative;
		line-height: 16px;
	}
	
	.cl_header_menu i {
		font-size: 14px;
		line-height: 22px;
		color: #2093ef;
	}
	
	.cl_header_menu i:hover {
		cursor: pointer;
	}
	
	.view_allform {
		text-align: left;
	}
	
	.tree {
		background: transparent;
		border: none;
		padding: 0;
		box-shadow: none;
		-webkit-box-shadow: none;
	}
	
	.tree li {
		list-style-type: none;
		margin: 0;
		position: relative;
		font-size: 13px;
		line-height: 32px;
		color: #333;
	}
	
	.tree li span i {
		margin-right: 5px;
		color: #ccc;
	}
	
	.tree li span {
		padding: 3px 35px 3px 12px;
		text-decoration: none;
		display: block;
		color: #5a5a5a;
		overflow: hidden;
		word-wrap: normal;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 12px;
	}
	
	.tree:hover {
		background: #E4E8F1;
		cursor: pointer;
	}
	
	.folder_list {
		color: #5a5a5a;
	}
	
	.view_allform div {
		width: 16px;
		height: 16px;
		background: url(/static/Login/img/login_ico.png) no-repeat;
		background-size: 250px 160px;
		background-position: -181px -6px;
		float: left;
		box-sizing: border-box;
		margin-top: 8px;
	}
	
	.view_allform p {
		margin: 0;
		padding: 0;
		float: left;
		margin-left: 8px;
	}
</style>