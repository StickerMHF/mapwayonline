<template>
	<div id="new-form">
		<div v-if="childData.status==27" class="data-form new-form ">
			<router-link :to='childData.url'>
				<a class="add_dashboard" folder_id="">
					<img src="../../../../static/Index/img/newform.png">
					<p class="mt10">{{childData.name}}</p>
				</a>
			</router-link>
		</div>
		<div v-if="childData.status==28" class="data-form my-form">
			<router-link :to='childData.url'>
				<img src="../../../../static/Index/canvas_5977_tpl.png">
				<a class="add_dashboard" folder_id="">

					<p class="mt10">{{childData.name}}</p>
				</a>
			</router-link>
		</div>
		<div v-if="childData.status==29" class="data-form exchange-form">
			<router-link :to='childData.url'>
				<div class="exf_img">
					<img src="../../../../static/Index/canvas_5977_tpl.png">
					<div class="inst_vo">
						<a class="btn btn-green btn-sm preview" dashboard_id="538" type="tpl" is_select="0">预览</a>
						<a class="btn btn-orange btn-sm freeused_datamodel" dashboard_id="538" _buy_init="1" services_id="123" status="touse">使用</a>
					</div>
				</div>

				<div class="exf_text">
					<p>
						<a class="detail_model" service_id="123">生意参谋分析模型</a>
						<span class="s-fc4"> 已购买</span>
					</p>
					<div class="exf_price">免费</div>
					<div class="exf_author">
						<span class="exfau">毛海锋</span><span class="exfdate">2017-08-08</span></div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'new-form',
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
						url: ""
					} //这样可以指定默认的值
				}

			}
		},
		methods: {

			handleClick(tab, event) {
				console.log(tab, event);
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
	.data-form {
		width: 250px;
		border: 1px solid #ddd;
		margin: 15px;
		text-align: center;
		font-size: 14px;
		margin-top: 0;
		float: left;
	}
	
	.data-form:hover {
		border: 1px solid #20a0ff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);
		cursor: pointer;
	}
	
	.add_dashboard {
		color: #666;
		display: block;
		padding: 40px 0;
	}
	
	.data-form img {
		width: 75px;
		height: 75px;
	}
	
	.data-form p {
		margin: 0;
		padding: 0;
		margin-top: 10px;
	}
	
	.exf_img {
		width: 100%;
		height: 165px;
		position: relative;
	}
	
	.exf_img img {
		width: 100%;
		height: 100%;
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
	
	.s-fc4 {
		color: #f05050;
	}
	
	.exf_price {
		height: 30px;
		line-height: 30px;
		background: #2093ef;
		font-size: 16px;
		text-align: center;
		color: #fff;
		margin: 0 10px 10px 10px;
	}
	
	.exf_author {
		padding: 0 10px;
		color: #999;
		font-size: 12px;
		height: 30px;
	}
	
	.exfau {
		float: left;
	}
	
	.exfdate {
		float: right;
	}
	.exf_img .inst_vo {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 165px;
    /*display: none;*/
}
</style>