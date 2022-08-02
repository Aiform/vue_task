<template>
	<div class="epidemictrendanalysis">
		<el-card>
			<div class="header">
			<el-icon style="color: #10aeb5;font-size: 20px" ><Rank /></el-icon><h4>疫情趋势分析</h4>
			</div>
			<el-divider />
			<el-alert show-icon  title="温馨提示：本页面信息仅供参考，数据来源官方，可能存在滞后性或缺漏，具体情况以政府发布信息为准。 点击查询" type="warning" />
			<div class="Domestic_epidemic">
				  <el-tabs v-model="activeName" class="demo-tabs">
			    <el-tab-pane label="全国疫情趋势" name="first">
			    	<nationwideepidemic/>
			    </el-tab-pane>
			    <el-tab-pane label="世界疫情趋势" name="second">
			    	<worldepidemic/>
			    </el-tab-pane>
			  </el-tabs>

			</div>
		</el-card>
	</div>

</template>
<script type="text/javascript">
	import nationwideepidemic from './nationwideepidemic'
	import worldepidemic from './worldepidemic'
	import {ref} from 'vue'
	export default{
		name:"epidemictrendanalysis",
		components:{
			nationwideepidemic,
			worldepidemic
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
	.epidemictrendanalysis{
		width: 1685px;
	}
	.header{
		display: flex;
	}
	h4{
		margin-left: 5px;
	}
	.Domestic_epidemic{
		margin-top: 30px;
	}
</style>