<template>
	<div class="main">

	</div>

</template>
<script type="text/javascript">
	import * as echarts from 'echarts';
	import {onMounted} from 'vue'
	export default{
		name:"worldepidemic",
		setup(){
			onMounted(()=>{
				worldepidemic()
			})
			const worldepidemic = ()=>{

				var chartDom = document.querySelector('.main');
				var myChart = echarts.init(chartDom);
				var option;

				option = {
  title: {
    text: '每月新增无症状数据',
    subtext: 'Living Expenses in Shenzhen'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      var tar = params[1];
      return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: { show: false },
    data: ['美国', '印度', '澳大利亚', '日本', '菲律宾', '德国']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Placeholder',
      type: 'bar',
      stack: 'Total',
      itemStyle: {
        borderColor: 'transparent',
        color: 'transparent'
      },
      emphasis: {
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        }
      },
      data: [0, 1700, 1400, 1200, 300, 0]
    },
    {
      name: '新增数据',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'inside'
      },
      data: [290000, 120000, 30000, 200000, 90000, 300000]
    }
  ]
};
					
				

				option && myChart.setOption(option);


			}

		}
	}

</script>
<style type="text/css" scoped>
	.main{
		width: 1600px;
		height: 600px;
	}

</style>