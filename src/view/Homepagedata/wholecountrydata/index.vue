<template>
  <el-card class="box-card boxCard">
    <div class="header">
      <span>本月全国疫情确诊数量</span>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="指标说明"
        placement="top"
      >
        <el-icon :size="20" class="item"><WarningFilled /></el-icon>
      </el-tooltip>
    </div>
    <div class="total">205,354</div>
    <div class="trends">
      <span
        >周同比12%<el-icon :size="13" style="color: red"><CaretTop /></el-icon>
      </span>
      <span style="margin-left: 20px"
        >日同比10%<el-icon :size="13" style="color: green"
          ><CaretBottom
        /></el-icon>
      </span>
    </div>
    <div class="hr"></div>
    <div class="footer">
      <span>每周新增数量:123</span>
      <span style="margin-left: 20px">每日新增数量:13</span>
    </div>
  </el-card>
</template>
<script></script>
<style type="text/css" scoped>
.boxCard {
  width: 410px !important;
  height: 250px !important;
  margin: 5px;
}
.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: space-between;
}
.header > span {
  color: #303133;
  font-size: 14px;
}
.total {
  font-size: 30px;
  height: 140px;
  line-height: 140px;
  padding-left: 20px;
}
.item {
  color: #97a8be !important;
  float: right;
  padding: 3px 0;
}
.trends {
  height: 22px;
  font-size: 14px;
}
.trends > span {
  display: inline;
}
.hr {
  border-top: 1px solid #e8e8e8;
  margin: 0 0 10px 0;
}
.footer > span {
  font-size: 14px;
  line-height: 22px;
}
</style>
