<template>
	<div id="new-form">
		<router-link :to='childData.url'>
		<a class="add_dashboard" folder_id=""> <img src="../../../../static/Index/img/newform.png">
			<p class="mt10">{{childData.name}}</p>
		</a>
		</router-link>
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
						url:""
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
	#new-form {
		width: 250px;
		border: 1px solid #ddd;
		margin: 15px;
		text-align: center;
		font-size: 14px;
		margin-top: 0;
		float: left;
	}
	
	#new-form:hover {
		border: 1px solid #20a0ff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);
		cursor: pointer;
	}
	
	#new-form a {
		color: #666;
		display: block;
		padding: 40px 0;
	}
	
	#new-form img {
		width: 75px;
		height: 75px;
	}
	
	#new-form p {
		margin: 0;
		padding: 0;
		margin-top: 10px;
	}
</style>