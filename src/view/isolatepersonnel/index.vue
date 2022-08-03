<template>
  <div class="isolatepersonnel">
    <el-card>
      <div class="header">
        <el-form label-width="120px" style="display: flex; flex-wrap: wrap">
          <el-button style="background: #10aeb5" @click="newisolationpersonnel"
            ><el-icon style="margin-right: 5px"><EditPen /></el-icon
            >新增隔离人员信息</el-button
          >
          <el-form-item label="姓名:">
            <el-input placeholder="请输入姓名" v-model.trim="keyword" />
          </el-form-item>
          <el-form-item label="性别:">
            <el-input placeholder="请输入性别" />
          </el-form-item>
          <el-form-item label="身份证号码:">
            <el-input placeholder="请输入身份证号码" />
          </el-form-item>
          <div class="but">
            <el-button @click="fromemity">清空</el-button>
            <el-button @click="search">查询</el-button>
            <el-button v-if="endsearch" @click="escsearch">结束查询</el-button>
          </div>
        </el-form>
      </div>
      <el-alert title="目前暂时只对姓名开放进行搜索" type="info" show-icon />
      <el-divider />
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="全部人员" name="first">
          <Allpersonnel />
        </el-tab-pane>
        <el-tab-pane label="未解除人员" name="second">
          <Allpersonnel />
        </el-tab-pane>
        <el-tab-pane label="已解除人员" name="third">
          <relieve />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script scoped>
import { ref, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Allpersonnel from "./Allpersonnel";
import relieve from "./relieve";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
export default {
  name: "isolatepersonnel",
  components: {
    Allpersonnel,
    relieve,
  },
  setup() {
    const activeName = ref("first");
    const router = useRouter();
    const store = useStore();
    const keyword = ref("");
    const endsearch = ref(false);
    const myFn = inject("reload");
    const num = ref("1");
    const handleClick = () => {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 200);
    };
    const search = () => {
      if (keyword.value == "") {
        ElMessage.error("搜索内容不可以为空");
      } else {
        const loading = ElLoading.service({
          lock: true,
          text: "Loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          loading.close();
          store.dispatch("Allpersonnel", {
            num: num.value,
            keyword: keyword.value,
          });
          endsearch.value = true;
        }, 500);
      }
    };
    const newisolationpersonnel = () => {
      router.push("/newisolationpersonnel");
    };
    const escsearch = () => {
      endsearch.value = false;
      keyword.value = "";
      myFn();
    };
    return {
      activeName,
      handleClick,
      search,
      keyword,
      num,
      newisolationpersonnel,
      endsearch,
      escsearch,
    };
  },
};
</script>
<style type="text/css" scoped>
.isolatepersonnel {
  width: 1675px;
}
.newlyAdded {
  display: flex;
  justify-content: flex-end;
}
.but {
  margin-left: 130px;
}
.el-button {
  background: #10aeb5;
  color: #fff;
}
.el-button:hover {
  background: #10aeb5;
  color: #fff;
}
</style>
