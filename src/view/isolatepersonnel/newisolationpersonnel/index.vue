<template>
  <div class="New_isolation_personnel">
    <el-card>
      <div class="header">
        <p>添加隔离人员信息</p>
      </div>
      <el-divider />
      <el-alert
        title="请严格遵守相关法律进行填写个人信息,如果填写信息有误需要承担相应法律规则，疫情期间注意防护!"
        type="warning"
        show-icon
      />
      <el-form style="margin-top: 30px">
        <el-form-item label="姓名:">
          <el-input v-model.trim="form.name" placeholder="请输入你的姓名" />
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model.trim="form.sex">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄:">
          <el-input
            v-model.number.trim="form.age"
            placeholder="请输入你的年龄"
          />
        </el-form-item>
        <el-form-item label="联系方式:">
          <el-input
            v-model.number.trim="form.contact"
            placeholder="请输入你的联系方式"
          />
        </el-form-item>
        <el-form-item label="身份证号码:">
          <el-input
            v-model.trim="form.idnumber"
            placeholder="请输入你的身份证号码"
          />
        </el-form-item>
        <el-form-item label="家庭住址:">
          <el-input
            v-model.trim="form.address"
            placeholder="请输入你的家庭住址"
          />
        </el-form-item>
        <el-form-item label="隔离地点:">
          <el-input
            v-model.trim="form.Isolationaddress"
            placeholder="请输入你的隔离地点"
          />
        </el-form-item>
        <el-form-item label="隔离时间是否满14天:">
          <el-select v-model.trim="form.isolationtime">
            <el-option label="是" value="是" />
            <el-option label="否" value="否" />
          </el-select>
        </el-form-item>
        <el-form-item label="体温:">
          <el-input
            v-model.trim="form.temperature"
            placeholder="请输入你的体温"
          />
        </el-form-item>
      </el-form>
      <div class="but">
        <el-button @click="jump">返回上一页</el-button>
        <el-button @click="confirmaddition">确定添加</el-button>
        <el-button @click="empty">清空</el-button>
      </div>
    </el-card>
  </div>
</template>
<script type="text/javascript">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "../../../axios/instance.js";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
import qs from "qs";
export default {
  name: "newisolationpersonnel",
  setup() {
    const form = reactive({
      name: "",
      sex: "",
      age: "",
      contact: "",
      idnumber: "",
      address: "",
      Isolationaddress: "",
      isolationtime: "",
      temperature: "",
    });
    const router = useRouter();
    const jump = () => {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        router.push("/isolatepersonnel");
      }, 100);
    };
    const textempty = /\S/;
    const age = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/;
    const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
    const temperature = /^[1-9][0-9]{0,3}$|^[1-9][0-9]{0,3}[\.][0-9]$/;
    const word = /^[\u4e00-\u9fa5]+$/;
    const idnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    const confirmaddition = () => {
      if (!textempty.test(form.name, form.address, form.Isolationaddress)) {
        ElMessage.error("不可以为空");
      } else if (!temperature.test(form.temperature)) {
        ElMessage.error("温度填写有误");
      } else if (!contact.test(form.contact)) {
        ElMessage.error("手机号格式有误");
      } else if (!idnumber.test(form.idnumber)) {
        ElMessage.error("身份证格式有误");
      } else if (!word.test(form.sex, form.isolationtime)) {
        ElMessage.error("填写有误");
      } else {
        addquarantinepersonnel();
      }
    };
    const addquarantinepersonnel = () => {
      const data = qs.stringify({
        name: form.name,
        sex: form.sex,
        age: form.age,
        contact: form.contact,
        idnumber: form.idnumber,
        address: form.address,
        Isolationaddress: form.Isolationaddress,
        isolationtime: form.isolationtime,
        temperature: form.temperature,
      });
      axios({
        method: "post",
        url: "/addquarantinepersonnel",
        data: data,
      })
        .then((result) => {
          if (result.data.status == 0) {
            ElMessage({
              type: "success",
              message: "添加成功",
            });
            myFn();
          } else {
            ElMessage.error("添加失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const empty = () => {
      form.name = "";
      form.sex = "";
      form.age = "";
      form.contact = "";
      form.idnumber = "";
      form.address = "";
      form.Isolationaddress = "";
      form.isolationtime = "";
      form.temperature = "";
    };
    return {
      form,
      jump,
      confirmaddition,
      empty,
    };
  },
};
</script>
<style type="text/css" scoped>
.el-form-item {
  margin-bottom: 30px;
}
.but {
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
</style>
