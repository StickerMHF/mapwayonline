<template>
	<div v-show="showdialog" class="mapway-dialog" id="mapway-dialog">
		<button class="mwdialog_close el-icon-close" @click="hidemwdialog"></button>
		<div class="mwdialog_header">
			<div class="mwd_h_content">
				<div class="mwd_hc_icon">
					<i class="mwdicon el-icon-upload2"></i>
				</div>
				<h2 class="mwd_hc_title">{{baseData.title}}</h2>
				<h3 class="mwd_hc_desc">{{baseData.description}}</h3>
			</div>
		</div>
		<div class="mwdialog_content">
			<slot></slot>
		</div>

	</div>
</template>
<script>
	let id = 1000;
	export default {
		name: 'mapway-dialog',
		data() {
			return {
				showdialog: false
			}
		},
		props: {
			baseData: {
				type: Object,
				default: function() {
					return {
						title: "Title",
						description: "Description"
					} //这样可以指定默认的值
				}

			}
		},
		computed: {

		},
		methods: {

			initEvent() {
				this.$bus.on('show_mwdialog', (obj) => {
					this.showdialog = true;
				});
				this.$bus.on('hide_mwdialog', (obj) => {
					this.showdialog = false;
				});
			},
			hidemwdialog() {
				this.showdialog = false;
			}

		},

		created() {
			this.initEvent();
		},
		mounted() {

		}
	}
</script>

<style>
	.mapway-dialog {
		width: 100%;
		height: 100%;
		z-index: 2000;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.9) 100%);
	}
	
	.mwdialog_header {
		border-bottom: 1px solid #ddd;
		text-align: center;
		padding: 28px 0;
		max-height: 100px;
		min-height: 100px !important;
	}
	
	.mwdialog_close {
		width: 16px;
		height: 16px;
		text-align: center;
		position: fixed;
		top: 28px;
		right: 40px;
		z-index: 2;
		padding: 0;
		border: none;
		background: transparent;
		box-sizing: border-box;
		outline: none;
		color: #1181FB;
	}
	
	.mwdialog_close:hover {
		cursor: pointer;
	}
	
	.mwd_h_content {
		margin-right: 0;
		display: inline-block;
		width: auto;
		min-width: 130px;
	}
	
	.mwd_hc_icon {
		border-color: #666;
		position: relative;
		width: 40px;
		height: 40px;
		border: 1px solid rgba(0, 0, 0, 0.36);
		border-radius: 3px;
		margin-left: auto;
		margin-right: auto;
		font-size: 22px;
		line-height: 44px;
		justify-content: center;
		-ms-flex-pack: center;
		-webkit-align-items: center;
		-moz-align-items: center;
		-ms-align-items: center;
		align-items: center;
		-ms-flex-align: center;
		margin-bottom: 12px;
		display: flex;
	}
	
	.mwdicon {
		color: #666;
	}
	
	.mwd_hc_title {
		font-size: 16px;
		line-height: 22px;
		font-family: 'Open Sans';
		color: #2E3C43;
		margin-bottom: 4px;
		margin: 0;
		padding: 0;
		font-weight: bold;
	}
	
	.mwd_hc_desc {
		font-size: 12px;
		line-height: 16px;
		font-family: 'Open Sans';
		color: #979EA1;
		margin: 0;
		padding: 0;
	}
	
	.mwdialog_content {
		background: #f9f9f9;
		position: relative;
		height: 100%;
	}
</style>