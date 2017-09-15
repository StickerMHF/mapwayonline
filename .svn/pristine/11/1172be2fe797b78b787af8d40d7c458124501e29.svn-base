<template>
	<div class="mapwaydialog-manager">
		<MapwayDialog :base-data="dialogdata">
			<div :is="model.name"></div>
		</MapwayDialog>
	</div>
</template>
<script>
	import MapwayDialog from './MapwayDialog.vue';
	import DBTableCreate from '../dataCenter/DBTable/Create.vue';
	import DBModelCreate from '../dataCenter/DBModel/Create.vue';
	export default {
		name: 'mapwaydialog-manager',
		data() {
			return {
				dialogdata: {
					title: "Title",
					description: "Description"
				},
				model:{
					name:"DBTableCreate",
					data:{
						tableid:null
					}
				}
			}
		},
		components: {
			MapwayDialog,
			DBTableCreate,
			DBModelCreate
		},
		computed: {

		},
		methods: {

			initEvent() {
				var that=this;
				this.$bus.on('init_mwdialog', (dialogdata,model) => {
					if(dialogdata!=null){
						this.dialogdata = dialogdata;
					}
					if(model!=null){
						this.model = model;
					}
					this.$bus.$emit('show_mwdialog');
					setTimeout(function(){
						switch(model.name){
						case "DBTableCreate":
						that.$bus.$emit('initDBTableCreate',model.data.tableid);
						break;
						case "DBModelCreate":
						that.$bus.$emit('initDBModelCreate',model.data.tableid);
						break;
						default:
						break;
					}
					},100);


				});

			},
			hidemwdialog() {

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

</style>
