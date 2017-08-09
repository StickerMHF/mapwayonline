<template>
  <div class="FormIndex">
  		
  		<div>
	   		<div class="form-header">
	   			<form-header :oid = 'oid'></form-header>
	   		</div>
	   
	   		<div class="form-main">
	   			<div class="form-side">
							<form-side :oid = 'oid'></form-side>
	   			</div>
	   		
	   					<div class="form-content" id="form-content">			
			   					<form-content :oid = 'oid'></form-content>
			   			</div>
			   			
			   				<div class="form-set" > 
			   						<form-set :oid = 'oid'></form-set>		   						
			   				</div>  				 			
	   		</div>
   		</div>
  </div>
</template>

<script>

	import formHeader from './formtemp/formheader.vue';
	import formContent from './formtemp/formcontent.vue';
	import formSide from './formtemp/formside.vue';
	import formSet from './formtemp/formset.vue';
	import _Bus_ from './formtemp/formcontral.js';  

	
export default {
  name: 'FormIndex',
  components:{
  	'formHeader':formHeader,
  	'formContent':formContent,
  	'formSide':formSide,
  	'formSet':formSet,
  
  },
  data () {
    return {     
      open:true,
      oid:''
 
    }
  },
  methods:{
  		
			initEvent(){
				var that = this;
				
				
			}
	},
	created(){
			this.initEvent();		

			this.oid = this.$route.params.id;		
	},
	mounted(){
			
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

	.FormIndex{		
		font: "微软雅黑";
		color: #333333;
		text-align: center;
		overflow: hidden;
		margin:2px;
		flex-grow: 1;
		position: relative;
		.form-header{
			padding-left:240px;
			border-bottom: 1px solid #BFCBD9;
			height: 100px;
			overflow: hidden;
		}
		.form-main{
			display: flex;
			overflow: hidden;
			justify-content: space-between;
			align-items: flex-start;
			.form-side{
				min-width: 200px;
				height: 700px;
				
			}			
			#form-content{			
				flex-grow: 1;
				overflow-y: scroll;	
				overflow-x: hidden;	
				height: 700px;	
				padding-bottom: 40px;
				background-color: rgba(128,128,128,0.3);		
				box-sizing: border-box;		
				min-height: 800px;
			}
			.form-set{
					min-width: 240px;					
					border: 1px solid #66ccff;
					min-height: 700px;
					position: relative;
					.opensetbox{
						display: inline-block;
						height: 35px;
						width: 25px;
						position: absolute;
						top: 0;
						left: -14px;
						box-sizing: border-box;
						border: 1px solid #BBBBBB;
						.ar{
							display: inline-block;
							height: 100%;
							width: 100%;
							font-size: 20px;
							line-height: 30px;
							text-align: center;
							position: absolute;
							left: 0;
							top: 0;
							background-color:#fff;
						}
					}
				}

		}
		
		
	}


</style>
