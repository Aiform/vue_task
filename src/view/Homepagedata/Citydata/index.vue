<template>
	<el-card class="box-card boxCard">
		<div class="header">
			<span>本月本省疫情确诊数量分析图</span>
			<el-tooltip class="box-item" effect="dark" content="指标说明" placement="top">
				<el-icon :size="20" class="item"><WarningFilled /></el-icon>
			</el-tooltip>
		</div>
		<div class="middle"></div>
		<div class="hr"></div>
		<div class="footer">
			<span>每周新增数量:123</span>
			<span style="margin-left: 20px;">每日新增数量:13</span>
		</div>
	</el-card>
</template>
<script>
	import {onMounted} from 'vue'
	import * as echarts from 'echarts/core';
	import axios from '../../../axios/instance.js'
	export default{
		name:'Citydata',
		setup(){
			onMounted(()=>{ 
				Citydataecharts()
			})
			const Citydataecharts = ()=>{
				axios.post("/cityechartsdata").then((response) => {
					response.data.data.map((value,index,array)=>{
						let  myChart =  echarts.init(document.querySelector('.middle'));
						const  commonColorList = ['#2ec7c9', '#b6a2de', '#5ab1ef','#ffb980','#d87a80'];
						const	option = {
							tooltip: {
								trigger: 'item'
							},
							legend: {
								top: '1%',
								left: 'center'
							},
							series: [
							{
								name: 'Access From',
								type: 'pie',
								radius: ['40%', '70%'],
								avoidLabelOverlap: false,
								label: {
									show: false,
									position: 'center'
								},
								itemStyle: {
									normal: {
										color: function (params) {
											return commonColorList[params.dataIndex]
										}
									}
								},
								emphasis: {
									label: {
										show: true,
										fontSize: '20',
										fontWeight: 'bold'
									}
								},
								labelLine: {
									show: false
								},
								data:[
								{
									value:array[0].value,
									name: array[0].name
								},
								{
									value: array[1].value,
									name: array[1].name
								},
								{
									value: array[2].value,
									name: array[2].name
								},
								{
									value: array[3].value,
									name: array[3].name
								},
								{
									value: array[4].value,
									name: array[4].name
								}]
							}
							]
						};	
						option && myChart.setOption(option);

					})

				}).catch(errors => {console.log(errors)})	

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
	.middle{
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