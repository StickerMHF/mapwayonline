<template>

	<div class="tb-chart">

		<div class="tbc_heading">
			<div class="tbch_title"><i class="fa fa-save"></i><span>统计图</span></div>
			<div class="tbch_icons tbch_boder_left" @click="hidecontent(id)">
				<i class="fa fa-chevron-up"></i>
			</div>
			<div class="tbch_icons tbch_boder_left" @click="loadchart">
				<i class="fa fa-rotate-right "></i>
			</div>
		</div>
		<div v-if="isshow" class="chartcontent">
			<div  :id="id" :option="option"></div>
		</div>
		
	</div>
	</div>
</template>

<script>
	import HighCharts from 'highcharts'
	export default {
		name: "tb-chart",
		data() {
			return {
				isshow: true
			}
		},
		// 验证类型
		props: {
			id: {
				type: String
			},
			option: {
				type: Object
			}
		},
		methods: {
			hidecontent() {
				if(this.isshow) {
					this.isshow = false;
				} else {
					this.isshow = true;
					this.loadchart();
				}

			},
			
			loadchart() {
				setTimeout(() => {
					HighCharts.chart(this.id, this.option);
				}, 100)

			}
		},
		created() {

		},
		mounted() {
			this.loadchart();
		}
	}
</script>

<style>
	.tb-chart {
		border-radius: 0px;
		border: 1px solid #d4d4d4;
		-webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.1);
		-moz-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.1);
	}
	
	.tbc_heading {
		font-size: 12px;
		line-height: 34px;
		min-height: 34px;
		-webkit-border-radius: 0px;
		-moz-border-radius: 0px;
		border-radius: 0px;
		position: relative;
		box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
		-moz-box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
		-webkit-box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
		color: #2b2b2b;
    background-color: #f5f5f5;
    border-color: #dddddd;
	}
	
	.tbch_title {
		float: left;
		margin-left: 10px;
	}
	
	.tbch_title i {
		width: 15px;
		height: 15px;
	}
	
	.tbch_title span {
		margin: 0 10px;
	}
	
	.tbch_icons {
		width: 35px;
		height: 34px;
		text-align: center;
		float: right;
	}
	
	.tbch_boder_left {
		border-left: 1px solid #ccc;
	}
	
	.tbch_boder_right {
		border-right: 1px solid #ccc;
	}
	
	.tbch_icons:hover {
		cursor: pointer;
		background: #cacaca;
	}
	
	.tbch_icons i {
		width: 15px;
		height: 15px;
	}
	.chartcontent{
		padding: 5px;
	}
</style>