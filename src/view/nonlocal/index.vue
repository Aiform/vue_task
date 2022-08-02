<template>
	<div class="nonlocalAddress">
		<el-card class="box-card">
			<headersearch/>
			<el-tabs
			    v-model="activeName"
			    type="card"
			    class="demo-tabs"
			    @tab-click="handleClick"
			  >
			    <el-tab-pane label="国内反本地人员信息" name="first">
			    	<tableleft/>
			    </el-tab-pane>
			    <el-tab-pane label="境外人员反本地信息" name="second">
			    	<tableright/>
			    </el-tab-pane>
			  </el-tabs>
		</el-card>	
	</div></template>
<script>

	import headersearch from './headersearch'
	import tableleft from './tableleft'
	import tableright from './tableright'
	import {ref} from 'vue'
	import {ElLoading} from 'element-plus'
	export default{
		name:'nonlocal',
		components:{
			headersearch,
			tableright,
			tableleft
		},
		setup(){
			const activeName = ref('first')
			const handleClick = ()=>{
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
				setTimeout(() => {
					loading.close()
				}, 600)
			}
			return{
				activeName,
				handleClick
			}
		}
		
	}
</script>
<style type="less" scoped>

</style>
