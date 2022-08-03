<template>
  <div class="Allpersonnel">
    <el-table style="width: 100%" :data="tabledata">
      <el-table-column fixed prop="name" label="姓名" width="80" />
      <el-table-column prop="sex" label="性别" width="80" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="contact" label="联系方式" width="200" />
      <el-table-column prop="idnumber" label="身份证号码" width="200" />
      <el-table-column prop="address" label="家庭地址" width="300" />
      <el-table-column prop="Isolationaddress" label="隔离地点" width="300" />
      <el-table-column
        prop="isolationtime"
        label="隔离时间是否满14天"
        width="120"
      />
      <el-table-column prop="temperature" label="体温" width="80" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="priew(scope.$index, scope.row)"
            >预览</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="relieve(scope.$index, scope.row)"
            >解除</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="updatedata(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="deleteinfor(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogTableVisible"
      :show-close="false"
      v-for="(form, index) in formdata"
      :key="form.id"
      id="printContainer"
    >
      <template>
        <div class="My_header">
          <h4>隔离人员个人信息表</h4>
        </div>
      </template>
      <el-form label-width="120px">
        <el-form-item label="姓名:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别:">
          <el-input v-model="form.sex" />
        </el-form-item>
        <el-form-item label="年龄:">
          <el-input v-model="form.age" />
        </el-form-item>
        <el-form-item label="联系方式:">
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item label="身份证号码:">
          <el-input v-model="form.idnumber" />
        </el-form-item>
        <el-form-item label="家庭地址:">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="隔离地点:">
          <el-input v-model="form.Isolationaddress" />
        </el-form-item>
        <el-form-item label="隔离时间是否满14天:">
          <el-input v-model="form.isolationtime" />
        </el-form-item>
        <el-form-item label="体温:">
          <el-input v-model="form.temperature" />
        </el-form-item>
      </el-form>
      <div id="but">
        <el-button v-print="printContainer">打印本表</el-button>
        <el-button v-if="isshow" @click="preservation">保存修改</el-button>
        <el-button @click="dialogTableVisible = false">退出</el-button>
      </div>
    </el-dialog>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      class="mt-4"
    />
  </div>
</template>
<script>
import { onMounted, ref, computed, inject } from "vue";
import { useStore } from "vuex";
import axios from "../../../axios/instance.js";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
import qs from "qs";
export default {
  name: "Allpersonnel",
  setup() {
    const num = ref("");
    const total = ref(1000);
    const dialogTableVisible = ref(false);
    const formdata = ref([]);
    const myFn = inject("reload");
    const isshow = ref(false);
    const store = useStore();
    onMounted(() => {
      handleCurrentChange();
    });
    // 分页
    const handleCurrentChange = (num) => {
      store.dispatch("Allpersonnel", { num: num });
    };
    const tabledata = computed(() => {
      return store.state.isolatepersonnel.Allpersonnel;
    });
    // 预览
    const previewofisolationpersonnel = (row) => {
      axios
        .post("/previewofisolationpersonnel", qs.stringify({ id: row }))
        .then((result) => {
          if (result.data.status == 0) {
            formdata.value = result.data.data;
          }
        });
    };
    const priew = (index, row) => {
      previewofisolationpersonnel(row.id);
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        dialogTableVisible.value = true;
      }, 600);
    };
    // 解除功能
    const relieve = (index, row) => {
      ElMessageBox.confirm("此操作将永久解除", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "解除成功",
          });
          const data = qs.stringify({
            id: row.id,
            name: row.name,
            sex: row.sex,
            age: row.age,
            contact: row.contact,
            idnumber: row.idnumber,
            address: row.address,
            Isolationaddress: row.Isolationaddress,
            isolationtime: row.isolationtime,
            temperature: row.temperature,
          });
          axios({
            method: "post",
            url: "/relieve",
            data: data,
          }).then((result) => {
            myFn();
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消解除",
          });
        });
    };
    // 修改功能
    const textempty = /\S/;
    const age = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/;
    const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
    const temperature = /^[1-9][0-9]{0,3}$|^[1-9][0-9]{0,3}[\.][0-9]$/;
    const word = /^[\u4e00-\u9fa5]+$/;
    const idnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    const updatedata = (index, row) => {
      previewofisolationpersonnel(row.id);
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        isshow.value = true;
        dialogTableVisible.value = true;
      }, 600);
    };
    const preservation = () => {
      formdata.value.map((value, index, array) => {
        if (
          !textempty.test(value.name, value.address, value.Isolationaddress)
        ) {
          ElMessage.error("不可以为空");
        } else if (!temperature.test(value.temperature)) {
          ElMessage.error("温度填写有误");
        } else if (!contact.test(value.contact)) {
          ElMessage.error("手机号格式有误");
        } else if (!idnumber.test(value.idnumber)) {
          ElMessage.error("身份证格式有误");
        } else if (!word.test(value.sex, value.isolationtime)) {
          ElMessage.error("填写有误");
        } else if (!age.test(value.age)) {
          ElMessage.error("年龄填写有误");
        } else {
          ModifyPreses(value);
        }
      });
    };
    const ModifyPreses = (value) => {
      const data = qs.stringify({
        id: value.id,
        name: value.name,
        sex: value.sex,
        age: value.age,
        contact: value.contact,
        idnumber: value.idnumber,
        address: value.address,
        address: value.address,
        Isolationaddress: value.Isolationaddress,
        isolationtime: value.isolationtime,
        temperature: value.temperature,
      });
      axios({
        method: "post",
        url: "/modifyinformation",
        data: data,
      }).then((result) => {
        if (result.data.status == 0) {
          myFn();
          ElMessage({
            message: "修改成功",
            type: "success",
          });
        } else {
          ElMessage.error("修改失败");
        }
      });
    };
    // 删除功能
    const deleteinfor = (index, row) => {
      ElMessageBox.confirm("此操作将永久删除", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          axios
            .post(
              "/isolationpersonneldeletionfunction",
              qs.stringify({ id: row.id })
            )
            .then((result) => {
              if (result.data.status == 0) {
                myFn();
              }
            });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    };
    return {
      num,
      tabledata,
      total,
      handleCurrentChange,
      dialogTableVisible,
      priew,
      formdata,
      relieve,
      updatedata,
      isshow,
      preservation,
      deleteinfor,
    };
  },
};
</script>
<style type="text/css" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}
#but {
  display: flex;
  justify-content: center;
}
.el-button {
  background: #10aeb5;
  color: #fff;
}
.el-button:hover {
  background: #10aeb5;
  color: #fff;
}
.My_header {
  margin: -20px;
  width: 961px;
  height: 50px;
  background: #10aeb5;
}
.My_header h4 {
  text-align: center;
  color: #fff;
  line-height: 46px;
  font-size: 20px;
  letter-spacing: 5px;
}
</style>
