<template>
  <div class="first"></div>
</template>
<script type="text/javascript">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useStore } from "vuex";
import * as echarts from "echarts";
import axios from "../../../axios/instance.js";
export default {
  setup() {
    const timer = ref(null);
    onMounted(() => {
      existingdiagnosis();
      timer.value = setInterval(() => {
        setTimeout(existingdiagnosis(), 0);
      }, 400);
    });
    const store = useStore();
    const existingdiagnosis = () => {
      store.state.epidemicriskranking.Gettable.map((value, index, array) => {
        var chartDom = document.querySelector(".first");
        var myChart = echarts.init(chartDom);
        var option;
        option = {
          title: {
            text: "新增本土数据实时监控",
            subtext: "新增数据",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            // prettier-ignore
            data:[
													array[0].address,
													array[1].address,
													array[2].address,
													array[3].address,
													array[4].address,
												
													],
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} 人数",
            },
            axisPointer: {
              snap: true,
            },
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [
              {
                lte: 6,
                color: "green",
              },
              {
                gt: 6,
                lte: 8,
                color: "red",
              },
              {
                gt: 8,
                lte: 14,
                color: "green",
              },
              {
                gt: 14,
                lte: 17,
                color: "red",
              },
              {
                gt: 17,
                color: "green",
              },
            ],
          },
          series: [
            {
              name: "新增数据",
              type: "line",
              smooth: true,
              // prettier-ignore
              data:  [
													array[0].newlocal,
													array[1].newlocal,
													array[2].newlocal,
													array[3].newlocal,
													array[4].newlocal,
													
													
													],

              markArea: {
                itemStyle: {
                  color: "rgba(255, 173, 177, 0.4)",
                },
                data: [
                  [
                    {
                      xAxis: "07:30",
                    },
                    {
                      xAxis: "10:00",
                    },
                  ],
                  [
                    {
                      xAxis: "17:30",
                    },
                    {
                      xAxis: "21:15",
                    },
                  ],
                ],
              },
            },
          ],
        };
        option && myChart.setOption(option);
      });
    };
    onBeforeUnmount(() => {
      clearInterval(timer.value);
    });
  },
};
</script>
<style type="text/css" scoped>
.first {
  width: 1685px;
  height: 500px;
}
</style>
