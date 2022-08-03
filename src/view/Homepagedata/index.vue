<template>
  <div class="homepage" :key="once">
    <el-alert
      title="以下展示数据分别为全国最高风险数据,全国风险某省排名第一地区,全国风险某省里面某市区和某县排名第一地区,全国风险某省某市区里面某乡排名第一地区。疫情期间注意个人防护！"
      type="warning"
      show-icon
    />
    <div class="row" >
      <wholecountrydata  />
      <Citydata />
      <countyleveldata />
      <ruraldata />
    </div>
    <Epidemicstatisticsdata />
    <div class="footerTitle">
      <el-icon :size="20" style="color: #303133; font-size: 13px"
        ><Avatar
      /></el-icon>
      <h5>Copyright@2022</h5>
    </div>
  </div>
</template>
<script>
import wholecountrydata from "./wholecountrydata";
import Citydata from "./Citydata";
import countyleveldata from "./countyleveldata";
import ruraldata from "./ruraldata";
import Epidemicstatisticsdata from "./Epidemicstatisticsdata";
import { onMounted, ref ,inject} from "vue";
export default {
  name: "Homepagedata",
  components: {
    wholecountrydata,
    Citydata,
    countyleveldata,
    ruraldata,
    Epidemicstatisticsdata,
  },
  setup(){
    const once = ref(1)
    onMounted(()=>{
      once.value += 2
    })
    return{
      once
    }
  }
};
</script>
<style type="text/css" scoped>
.homepage {
  margin: 1px;
  display: flex;
  width: 1688px;
  flex-wrap: wrap;
  margin-left: -10px;
}
.row {
  display: flex;
  margin-top: 10px;
}
.footerTitle {
  margin: auto;
  text-align: center;
  display: block;
  margin-top: 30px;
}
.footerTitle > h5 {
  color: #303133;
  font-weight: 500;
}
</style>
