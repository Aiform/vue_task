<template>
	<div class="rowtwo">
		<el-card class="box-card boxCardTwo" >
			<div class="tables">
				<el-tabs  class="demo-tabs" v-model="activeName">
					<el-tab-pane label="全国疫情分析图" name="first">
						<nationalepidemicstatistics/>
					</el-tab-pane>
					<el-tab-pane label="本省疫情分析图" name="second">
						<epidemicstatisticsofthewholeprovince/>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-card>
	</div>
	
</template>
<script>
	import nationalepidemicstatistics from './nationalepidemicstatistics'
	import epidemicstatisticsofthewholeprovince from './epidemicstatisticsofthewholeprovince'
	import {ref} from 'vue'
	export default{
		name:'Epidemicstatisticsdata',
		components:{
			nationalepidemicstatistics,
			epidemicstatisticsofthewholeprovince
		},
		setup(){
			 const activeName = ref('first')
			 return{
			 	activeName
			 }
		}
	}
</script>
<style type="text/css" scoped>
		.rowtwo{
			margin-top: 30px;
			width: 1688px;
		}

</style>