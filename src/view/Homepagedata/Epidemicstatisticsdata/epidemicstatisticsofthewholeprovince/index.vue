<template>
  <div class="province">
    <div class="provinceMap"></div>
    <div class="nationwideAmong">
      <div class="title">
        <h4>本省地区疫情确诊排行榜</h4>
        <ul>
          <li>
            <div
              class="elrow"
              v-for="(item, index) in rankingdata"
              :key="item.id"
            >
              <el-icon :size="20" style="color: red; margin-left: 10px"
                ><Histogram
              /></el-icon>
              <div>{{ item.name }}</div>
              <div>{{ item.number }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref ,nextTick} from "vue";
import * as echarts from "echarts/core";
import axios from "../../../../axios/instance.js";
export default {
  name: "epidemicstatisticsofthewholeprovince",
  setup() {
    const rankingdata = ref([]);
    onMounted(() => {
      nextTick(()=>{
            echartsdata();
           ranking();
      })
    });
    const echartsdata = () => {
      let chartDom = document.querySelector(".provinceMap");
      let myChart = echarts.init(chartDom);
      const colors = ["#5470C6", "#EE6666"];
      let option = {
        color: colors,
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {},
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1],
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "Precipitation  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            // 累计死亡
            data: [
              "2019-12",
              "2020-1",
              "2020-3",
              "2020-6",
              "2020-9",
              "2020-12",
              "2021-1",
              "2021-3",
              "2021-6",
              "2021-9",
              "2021-12",
              "2022-1",
              "2022-3",
              "2022-6",
            ],
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0],
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "Precipitation  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            // 累计确诊
            data: [
              "2019-12",
              "2020-1",
              "2020-3",
              "2020-6",
              "2020-9",
              "2020-12",
              "2021-1",
              "2021-3",
              "2021-6",
              "2021-9",
              "2021-12",
              "2022-1",
              "2022-3",
              "2022-6",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "累计确诊病例(2019年12月)",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            emphasis: {
              focus: "series",
            },
            data: [
              1, 80, 120, 320, 450, 512, 555, 621, 670, 712, 752, 812, 852, 880,
            ],
          },
          {
            name: "累计死亡病例(2019年12月)",
            type: "line",
            smooth: true,
            emphasis: {
              focus: "series",
            },
            data: [1, 20, 34, 50, 52, 60, 66, 69, 82, 87, 92, 102, 134, 234],
          },
        ],
      };
      option && myChart.setOption(option);
    };
    const ranking = () => {
      axios.post("/provincialepidemicranking").then((res) => {
          rankingdata.value = res.data.data;
        }).catch((err) => {
          console.log(err);
        });
    };

    return {
      rankingdata,
    };
  },
};
</script>
<style type="text/css" scoped>
.rowtwo {
  margin: 5px;
  margin-top: 30px;
}
.boxCardTwo {
  width: 1676px;
}
.nationwide {
  width: 1676px;
  height: 300px;
  display: flex;
}
.nationwideMap {
  width: 1000px;
  height: 300px;
}
.nationwideAmong {
  width: 560px;
  height: 300px;
}
.province {
  width: 1676px;
  height: 300px;
  display: flex;
}
.provinceMap {
  width: 1000px;
  height: 300px;
}
.title > h4 {
  color: #303133;
  font-weight: 500;
  text-align: center;
}
.title > ul > li > .elrow {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  margin-top: 23px;
}
</style>
