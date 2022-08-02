<template>
	<div class="nationwideepidemic">
		

	</div>
</template>
<script type="text/javascript">
	import {onMounted} from 'vue'
	import * as echarts from 'echarts';
	export default{
		setup(){
			onMounted(()=>{
				nationwideepidemic()
			})
			const nationwideepidemic = ()=>{

				var chartDom = document.querySelector('.nationwideepidemic');
				var myChart = echarts.init(chartDom);
				var option;
					      
                    option = {
  title: {
    text: '每月新增无症状感染者',
    subtext: '新增数据'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // prettier-ignore
    data: ['2020-12-4', '2021-1-1', '2021-3-1', '2021-6-1', '2021-9-1', '2021-12-1', '2022-1-1', '2022-3-1', '2022-6-1']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 人'
    },
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0,
    pieces: [
      {
        lte: 6,
        color: 'green'
      },
      {
        gt: 6,
        lte: 8,
        color: 'red'
      },
      {
        gt: 8,
        lte: 14,
        color: 'green'
      },
      {
        gt: 14,
        lte: 17,
        color: 'red'
      },
      {
        gt: 17,
        color: 'green'
      }
    ]
  },
  series: [
    {
      name: '新增人数',
      type: 'line',
      smooth: true,
      // prettier-ignore
      data: [3000, 2800, 2500, 2600, 2700, 3000, 5500, 5000, 4000],
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        },
      }
    }
  ]
};


option && myChart.setOption(option);

}

}
}

</script>
<style type="text/css" scoped>
	.nationwideepidemic{
		width: 1685px;
		height: 600px;
	}


</style>