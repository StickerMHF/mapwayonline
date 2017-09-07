<template>
	<div class="tablelist" style="height: 100%">
		<el-table :data="tabledata.data" border stripe style="width: 100%;height: 100%">

			<el-table-column v-for="(field,index) in tabledata.fields" :prop="field.name" :key="index" :label="field.aliasname" >
			</el-table-column>

		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'tablelist',
		props: {
			tabledata: {
				type: Object,
				default: function() {
					return {
						data: [],
						fields: []
					}
				}
			}
		},
		data() {
			return {
				time: 0
			}
		},
		methods: {

		},
		computed: {

		},

		created() {

		},
		mounted() {

		}
	}
</script>

<style scoped>

</style>