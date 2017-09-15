<template>
	<div id="content-left">
		<div class="cl_head clearfix">
			<!--<h2 @click="backToDataList">数据</h2>-->
			<!--<div class="cl_header_menu dropdown" @click="createtable">-->
				<!--<i class="fa fa-plus-circle"></i>-->
			<!--</div>-->
		</div>
		<div class="folder_box">
			<div :class="myDataclass" >
				<!--<ul>-->
					<!--<li>-->
						<!--<span :class="myDatatext">-->
							<!--<div></div>-->
							<!--<p>我的数据</p>-->
							<!--<font class="form_count">({{datacount}})</font>-->
						<!--</span>-->
					<!--</li>-->
				<!--</ul>-->
          <TreeFolder @getByTreeId="getByTree" @updateTreeList="updateTreeList" @getDataByCondition="getDataByCondition"  ></TreeFolder>
			</div>

			<div :class="publicClass" @click="getDataByCondition(1,'公共数据')">
				<ul>
					<li>
						<span :class="publicText">
							<div></div>
							<p>公共数据</p>
						</span>
					</li>
				</ul>
			</div>
			<!--<div class="tree">
				<ul>
					<li>
						<span class="view_allform">
							<div></div>
							<p>已购买的数据</p>
						</span>
					</li>
				</ul>
			</div>-->
			<!--<div :class="shareClass" @click="getDataByCondition(2,'已分享的数据')">-->
				<!--<ul>-->
					<!--<li>-->
						<!--<span :class="shareText">-->
							<!--<div></div>-->
							<!--<p>已分享的数据</p>-->
						<!--</span>-->
					<!--</li>-->
				<!--</ul>-->
			<!--</div>-->
      <div :class="modelClass" @click="getDataByCondition(3,'数据模型')">
        <ul>
          <li>
						<span :class="modelText">
							<div></div>
							<p>数据模型</p>
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
				formPath: '/formDesign/init/',
				treelistid: null,
				datacount: 0,
        myDataclass:{
          tree:true,
          isClick:false,
          folder_list:true
        },
        publicClass:{
          tree:true,
          isClick:false,
        },
        shareClass:{
          tree:true,
          isClick:false
        },
        modelClass:{
          tree:true,
          isClick:false
        },
        myDatatext:{
          view_allform:true,
          isWhite:false,
        },
        publicText:{
          view_allform:true,
          isWhite:false,
        },
        shareText:{
          view_allform:true,
          isWhite:false,
        },
        modelText:{
          view_allform:true,
          isWhite:false,
        }
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
			initEvent() {
				this.$bus.on('gettreedata', () => {
					this.gettreedata();
				});
			},
			getByTree(node, store, data, childids) {
				this.$emit("getByTree", node, store, data, childids);
			},
			backToDataList(evt) {
				this.$emit("backToDataList", evt);
			},
			updateTreeList(tdata) {

				var that = this;
				var params = "data=" + JSON.stringify({
					"id": this.treelistid,
					"subitem": tdata
				});

				var url = 'datacenter/folder/update';
				that.$http.post(url, params).then((r) => {
					if(r.data.result) {
						this.$message({
							message: r.data.message,
							type: 'success'
						});
					} else {
						this.$message.error(r.data.message);
					}
				});
				//this.$emit("updateTreeList", tdata);
			},
			gettreedata() {
				var that = this;
				var url = 'datacenter/folder';
				that.$http.get(url).then((r) => {
					that.datacount = r.data.datacount;

					if(r.data.treedata.length === 0) {
						let arr = [{
							id: 999,
							name: '未命名文件夹',
							children: []
						}];
						that.$bus.$emit("initTreeList", arr);
					} else {
						that.treelistid = r.data.treedata[0].id;
						var tree = JSON.parse(r.data.treedata[0].subitem);
						that.$bus.$emit("initTreeList", tree);
					}

				});
			},
			getDataByCondition(type, name) {

//        var createTable=document.getElementById("mapway-dialog");
//        createTable.style.display="none";
        if(name=="我的数据"){
          this.myDataclass.isClick=true;
          this.publicClass.isClick=false;
          this.shareClass.isClick=false;
          this.modelClass.isClick=false;
          this.myDatatext.isWhite=true;
          this.publicText.isWhite=false;
          this.shareText.isWhite=false;
          this.modelText.isWhite=false;
          this.$parent.activeName="first"
//          var treeNname =document.getElementsByClassName("treename");
//          for(var i=0;i<treeNname.length;i++){
//            treeNname[i].style.color="#5a5a5a";
//          }
//          var nodeContent =document.getElementsByClassName("el-tree-node__content");
//          for(var i=0;i<nodeContent.length;i++){
//            nodeContent[i].style.background="#fff";
//          }
//          var nodeContent2 =document.getElementsByClassName("el-tree-node__children");
//          for(var i=0;i<nodeContent2.length;i++){
//            nodeContent2[i].style.background="#fff";
//          }
        }
        else if(name=="公共数据"){
          this.myDataclass.isClick=false;
          this.publicClass.isClick=true;
          this.shareClass.isClick=false;
          this.modelClass.isClick=false;
          this.myDatatext.isWhite=false;
          this.publicText.isWhite=true;
          this.shareText.isWhite=false;
          this.modelText.isWhite=false;
          this.$parent.activeName="third"
          var treeNname =document.getElementsByClassName("treename");
          for(var i=0;i<treeNname.length;i++){
            treeNname[i].style.color="#5a5a5a";
          }
          var nodeContent =document.getElementsByClassName("el-tree-node__content");
          for(var i=0;i<nodeContent.length;i++){
            nodeContent[i].style.background="#fff";
          }
          var nodeContent2 =document.getElementsByClassName("el-tree-node__children");
          for(var i=0;i<nodeContent2.length;i++){
            nodeContent2[i].style.background="#fff";
          }
        }
        else if(name=="已分享的数据"){
          this.myDataclass.isClick=false;
          this.publicClass.isClick=false;
          this.shareClass.isClick=true;
          this.modelClass.isClick=false;
          this.myDatatext.isWhite=false;
          this.publicText.isWhite=false;
          this.shareText.isWhite=true;
          this.modelText.isWhite=false;
          this.$parent.activeName="fourth"
          var treeNname =document.getElementsByClassName("treename");
          for(var i=0;i<treeNname.length;i++){
            treeNname[i].style.color="#5a5a5a";
          }
          var nodeContent =document.getElementsByClassName("el-tree-node__content");
          for(var i=0;i<nodeContent.length;i++){
            nodeContent[i].style.background="#fff";
          }
          var nodeContent2 =document.getElementsByClassName("el-tree-node__children");
          for(var i=0;i<nodeContent2.length;i++){
            nodeContent2[i].style.background="#fff";
          }
        }
        else if(name=="数据模型"){
          this.myDataclass.isClick=false;
          this.publicClass.isClick=false;
          this.shareClass.isClick=false;
          this.modelClass.isClick=true;
          this.myDatatext.isWhite=false;
          this.publicText.isWhite=false;
          this.shareText.isWhite=false;
          this.modelText.isWhite=true;
          this.$parent.activeName="fifth"
          var treeNname =document.getElementsByClassName("treename");
          for(var i=0;i<treeNname.length;i++){
            treeNname[i].style.color="#5a5a5a";
          }
          var nodeContent =document.getElementsByClassName("el-tree-node__content");
          for(var i=0;i<nodeContent.length;i++){
            nodeContent[i].style.background="#fff";
          }
          var nodeContent2 =document.getElementsByClassName("el-tree-node__children");
          for(var i=0;i<nodeContent2.length;i++){
            nodeContent2[i].style.background="#fff";
          }
        }

        this.$emit("getDataByCondition", type, name);
			},
			createtable() {

			}
		},
		created() {
			this.initEvent();
		},
		mounted() {
			this.$bus.$emit("gettreedata");
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
		background: #fff !important;
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
		padding: 7px 18px 19px 18px;
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
		font-size: 14px;
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
  .isClick{
    background-color: #009688 !important;
    border-radius: 4px;
  }
  .folder_box{
    padding:0 10px;
  }
  .isWhite{
    color:#fff !important;
  }
  ul li{
    font-size: 14px !important;
  }
  .el-tree{
    border:none;
  }
</style>
