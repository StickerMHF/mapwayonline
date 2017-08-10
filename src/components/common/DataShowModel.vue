<template>
	<div class="datamodel">
		<div v-if="childData.type==2||childData.type==3||childData.type==4||childData.type==9" class="new-form create_form">
			<div class="myf_img" @mouseenter="handleMousrOver" @mouseleave="handleMousrOut">
					<img v-if="childData.img==null&&childData.type==2" src="/static/Index/img/point.png">
					<img v-else-if="childData.img==null&&childData.type==3" src="/static/Index/img/line.png">
					<img v-else-if="childData.img==null&&childData.type==4" src="/static/Index/img/polygon.png">
					<img v-else-if="childData.img==null&&childData.type==9" src="/static/Index/img/table.png">
					<img v-else :src="childData.img">
					<div class="myf_inst_vo">
						<el-button type="info"><a>预览</a></el-button>
						<el-button type="info">编辑</el-button>
						<el-button type="info">移动</el-button>
						<el-button type="info">共享</el-button>
						<el-button type="danger">删除</el-button>
					</div>
				</div>
				<div class="myf_text">
					<p>
						<a class="detail_model" service_id="124">{{childData.name}}</a>
					</p>
					<div class="myft_author">
						<span class="myft_au">{{childData.author}}</span>
						<span class="myft_date">{{childData.createdate}}</span>
					</div>
				</div>
		</div>
		
		<div v-if="childData.type==26" class="new-form create_form">
			<router-link :to='childData.url'>
				<a class="add_dashboard" folder_id=""> 
					<img :src="childData.img">
					<p class="mt10">{{childData.name}}</p>
				</a>
			</router-link>
		</div>
		<div v-if="childData.type==27" class="new-form my_form">
			<!--<router-link :to='childData.url'>-->
				<div class="myf_img" @mouseenter="handleMousrOver" @mouseleave="handleMousrOut">
					<img :src="childData.img">
					<div class="myf_inst_vo">
						<el-button type="info"><a>预览</a></el-button>
						<el-button type="info">编辑</el-button>
						<el-button type="info">移动</el-button>
						<el-button type="info">共享</el-button>
						<el-button type="danger">删除</el-button>
					</div>
				</div>
				<div class="myf_text">
					<p>
						<a class="detail_model" service_id="124">{{childData.name}}</a>
					</p>
					<div class="myft_author">
						<span class="myft_au">{{childData.author}}</span>
						<span class="myft_date">{{childData.createdate}}</span>
					</div>
				</div>

			<!--</router-link>-->
		</div>
		<div v-if="childData.type==28" class="new-form exchange_form">
			<!--<router-link :to='childData.url'>-->
				<div class="exf_img" @mouseenter="handleMousrOver" @mouseleave="handleMousrOut">
					<img :src="childData.img">
					<div class="exf_inst_vo">
						<el-button type="success">预览</el-button>
						<el-button v-if="childData.usable||childData.price==0" type="info">使用</el-button>
						<el-button v-else type="info">购买</el-button>
					</div>
				</div>
				<div class="exf_text">
					<p>
						<a class="detail_model" service_id="124">{{childData.name}}</a>
						<span v-if="childData.usable&&childData.price>0" class="s-fc4"> 已购买</span>
					</p>
					<div v-if="childData.price==0" class="exft_price">免费</div>
					<div v-else class="exft_price">售价：{{childData.price}}图道豆</div><!--￥-->
					<div class="exft_author">
						<span class="exft_au">{{childData.author}}</span>
						<span class="exft_date">{{childData.createdate}}</span>
					</div>
				</div>

			<!--</router-link>-->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'datamodel',
		data() {
			return {
				formPath: '/formDesign/init/',
				title: "文件夹",
				activeName: 'first'

			}
		},
		props: {
			childData: {
				type: Object,
				default: function() {
					return {
						name: "空白表单",
						img: "",
						url: "",
						type: 26
					} //这样可以指定默认的值
				}

			}
		},
		methods: {

			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleMousrOver(event){
				event.target.lastElementChild.style.display="block";
			},
			handleMousrOut(event){
				event.target.lastElementChild.style.display="none";
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

<style>
	.new-form {
		width: 250px;
		border: 1px solid #ddd;
		margin: 15px;
		text-align: center;
		font-size: 14px;
		margin-top: 10px;
		float: left;
		
	}
	
	.new-form:hover {
		border: 1px solid #20a0ff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
		cursor: pointer;
	}
	
	.add_dashboard {
		color: #666;
		display: block;
		padding: 50px 0;
	}
	
	.new-form img {
		width: 100px;
		height: 100px;
	}
	
	.new-form p {
		margin: 0;
		padding: 0;
		margin-top: 9px;
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
	
	.exf_img img {
		width: 100%;
		height: 165px;
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
		font-size: 16px;
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
		height: 100%;
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
</style>