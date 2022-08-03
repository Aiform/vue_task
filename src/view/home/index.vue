<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <headerNav />
        </el-header>
        <el-main>
          <router-view v-if="isRouterShow" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import headerNav from "../../components/Header";
import Aside from "../../components/Aside";
import { useStore } from "vuex";
import { computed, ref, nextTick, provide } from "vue";
export default {
  name: "home",
  components: {
    headerNav,
    Aside,
  },
  setup() {
    const isRouterShow = ref(true);
    const store = useStore();
    const isCollapse = computed(() => {
      return store.state.aside.isCollapse;
    });
    const reload = () => {
      isRouterShow.value = false;
      nextTick(() => {
        isRouterShow.value = true;
      });
    };
    provide("reload", reload);
    return {
      isCollapse,
      isRouterShow,
    };
  },
};
</script>
<style type="text/css" scoped>
.el-header {
  margin-left: -21px;
}
.el-main {
  margin-top: 40px;
  background: rgb(240 242 245);
  min-height: 100%;
  background-size: 100% 100%;
}
</style>
