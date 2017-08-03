<template>
	<div class="folder_list" id="tree-folder">
				<div class="sub_ui_title">
					<h3>分类目录</h3></div>
				<el-tree :data="treedata" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
				</el-tree>
			</div>
</template>

<script>
	let id = 1000;
	export default {
		name: 'tree-folder',
		data() {
			return {
				treedata: [{
					id: 999,
					label: '文件夹',
				}]
			}
		},
		methods: {
			append(store, data) {
				var that = this;
				this.createname(function(name) {
					store.append({
						id: id++,
						label: '文件夹' + id,
						children: []
					}, data);
					debugger
					console.log(that);
				})
			},
			createname(callback) {
				const h = this.$createElement;
				this.$msgbox({
					title: '消息',
					customClass: 'messagestyle',
					message: h('p', {
						style: 'height:32px;padding: 0 50px;'
					}, [
						h('div', {
							style: 'line-hight:32px;display: inline-block;color: #999;'
						}, '目录名称： '),
						h('div', {
							style: 'color: teal;display: inline-block;width:265px;'
						}, [
							h('input', {
								style: 'width: 100%;line-height: 28px;border: 1px solid #ddd;'
							}, '22')
						])
					]),
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(action => {
					if(typeof callback === "function") {
						callback("是");
					}
				}).catch(() => {
					if(typeof callback === "function") {
						callback("是");
					}
				});
			},
			remove(store, data) {
				store.remove(data);
			},
			renderContent(h, {
				node,
				data,
				store
			}) {
				return( 
					 <span>
                         <span>
                             <span>未命名文件夹</span>
                         </span>
                         <span style="float: right; margin-right: 20px">
                             <i class="fa fa-plus" on-click={ () => this.append(store, data) }></i>
                             <i class="el-icon-delete" on-click={ () => this.remove(store, data) }></i>
                         </span>
                      </span>
				);

			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style scoped>
	.el-tree {
		cursor: default;
		background: #f9f9f9;
		border: 0px;
	}
	
	.sub_ui_title {
		border-bottom: 1px solid #e5e9ed;
		height: 35px;
		padding: 0 15px;
		margin-bottom: 10px;
	}
	
	.sub_ui_title h3 {
		display: inline-block;
		line-height: 33px;
		border-bottom: 3px solid #333;
		font-size: 12px;
		font-weight: bold;
		color: #333;
		margin: 0;
	}
</style>