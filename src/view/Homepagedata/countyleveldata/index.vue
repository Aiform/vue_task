<template>
	<el-card class="box-card boxCard">
		<div class="header">
			<span>本月本市以及各县疫情确诊对比分析图</span>
			<el-tooltip class="box-item" effect="dark" content="指标说明" placement="top">
				<el-icon :size="20" class="item"><WarningFilled /></el-icon>
			</el-tooltip>
		</div>
		<div class="barchar"></div>
		<div class="hr"></div>
		<div class="footer">
			<span>每周新增数量:123</span>
			<span style="margin-left: 20px;">每日新增数量:13</span>
		</div>
	</el-card>

</template>
<script>
	import {onMounted,reactive,computed,ref,watchEffect,watch} from 'vue'
	import {useStore} from 'vuex'
	import * as echarts from 'echarts/core';
	import axios from '../../../axios/instance.js'
	export default{
		name:"countyleveldata",
		setup(){
			const setOptiondata = ref('')
			const store = useStore()
			onMounted(()=>{
				postcitydata()
			})
			let myChart; 
			const postcitydata = ()=>{
				axios.post("/countdata").then((result)=>{
					result.data.data.map((newValue,index,array)=>{
					const option = {
					tooltip: {
						trigger: 'item'
					},
					xAxis: {
						data:[array[0].name,array[1].name,array[2].name,array[3].name,array[4].name]
					},
					grid:{
						
						top:"5%",
						
						left:"15%",
						
						right:"20%",
						
						bottom:"13%"
						
					},
					yAxis: {},
					series: [
					{
						data:[array[0].value,array[1].value,array[2].value,array[3].value,array[4].value],
						type: 'bar',
						stack: 'x',
						itemStyle:{
							color:'#2ec7c9'
						}
					},
					{
						data:[array[0].surplus,array[1].surplus,array[2].surplus,array[3].surplus,array[4].surplus],
						type: 'bar',
						stack: 'x',
						itemStyle:{
							color:'#b6a2de'
						}
					}
					]
				}
					let history_state =  echarts.init(document.querySelector('.barchar'));
					history_state.setOption(option,true);
					})
				}).catch(errors => {console.log(errors)})
			}
		
			return{
				
			}
		}

	}
</script>
<style scoped>
	.boxCard{
		width: 410px !important;
		height: 250px !important;
		margin:5px ;
	}
	.header{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: stretch;
		justify-content: space-between;
	}
	.header>span{
		color: #303133;
		font-size: 14px;
	}
	.item{
		color: #97a8be !important;
		float: right;
		padding: 3px 0;
	}
	.barchar{
		width:100%;
		height:160px;
	}
	.hr{
		border-top: 1px solid #e8e8e8;
		margin: 0 0 10px 0;
	}
	.footer>span{
		font-size: 14px;
		line-height: 22px;
	}


</style>