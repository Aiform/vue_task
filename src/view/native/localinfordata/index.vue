<template>
  <div class="infor">
    <el-card class="box-card">
      <div>
        <p>添加本地人员信息</p>
      </div>
      <el-divider />
      <el-alert
        title="请严格遵守相关法律进行填写个人信息,如果填写信息有误需要承担相应法律规则，疫情期间注意防护!"
        type="warning"
        show-icon
      />
      <el-form style="margin-top: 20px">
        <el-form-item label="姓名:">
          <el-input
            size="large"
            placeholder="请输入姓名"
            v-model.trim="presen.name"
          />
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="presen.sex">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄:">
          <el-input
            size="large"
            placeholder="请输入年龄"
            v-model.trim="presen.age"
          />
        </el-form-item>
        <el-form-item label="民族:">
          <el-input
            size="large"
            placeholder="请输入民族"
            v-model.trim="presen.race"
          />
        </el-form-item>
        <el-form-item label="身份证号码:">
          <el-input
            size="large"
            placeholder="请输入身份证号"
            v-model.trim="presen.idnumber"
          />
        </el-form-item>
        <el-form-item label="联系方式:">
          <el-input
            size="large"
            placeholder="请输入联系方式"
            v-model.number.trim="presen.contact"
          />
        </el-form-item>
        <el-form-item label="家庭地址:">
          <el-input
            size="large"
            placeholder="请输入家庭地址"
            v-model.trim="presen.address"
          />
        </el-form-item>
        <el-form-item label="职业:">
          <el-input
            size="large"
            placeholder="请输入你的职业"
            v-model.trim="presen.work"
          />
        </el-form-item>
        <el-form-item label="核酸检测报告:">
          <el-select v-model="presen.report">
            <el-option label="阴性" value="阴性" />
            <el-option label="阴性" value="阴性" />
          </el-select>
        </el-form-item>
        <el-form-item label="近14天是否外出:">
          <el-select v-model="presen.sally">
            <el-option label="否" value="否" />
            <el-option label="是" value="是" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否发烧、感冒、咳嗽:">
          <el-select v-model="presen.cold">
            <el-option label="否" value="否" />
            <el-option label="是" value="是" />
          </el-select>
        </el-form-item>
        <el-form-item label="体温:">
          <el-input
            class="w-50 m-2"
            size="large"
            placeholder="请输入你的体温"
            v-model="presen.temperature"
          />
        </el-form-item>
      </el-form>
      <div class="confirmaddition">
        <el-button style="background: #10aeb5" type="success" @click="jump"
          >返回上一页</el-button
        >
        <el-button style="background: #10aeb5" type="success" @click="additive"
          >确定添加</el-button
        >
        <el-button style="background: #10aeb5" type="success" @click="empty"
          >清空</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script scoped>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage, ElLoading } from "element-plus";
import axios from "../../../axios/instance.js";
import qs from "qs";
export default {
  name: "localaddition",
  setup() {
    const presen = reactive({
      name: "",
      sex: "",
      race: "",
      age: "",
      idnumber: "",
      contact: "",
      address: "",
      work: "",
      report: "",
      sally: "",
      cold: "",
      temperature: "",
    });
    const store = useStore();
    const router = useRouter();
    // 添加功能
    const idnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
    const temperature = /^[1-9][0-9]{0,3}$|^[1-9][0-9]{0,3}[\.][0-9]$/;
    const age = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/;
    const word = /^[\u4e00-\u9fa5]+$/;
    const textempty = /\S/;
    const additive = () => {
      if (
        !textempty.test(presen.name, presen.race, presen.address, presen.work)
      ) {
        ElMessage.error("不能为空");
      } else if (!idnumber.test(presen.idnumber)) {
        ElMessage.error("身份证号码格式有误");
      } else if (!contact.test(presen.contact)) {
        ElMessage.error("手机号码格式有误");
      } else if (!age.test(presen.age)) {
        ElMessage.error("年龄有误");
      } else if (
        !word.test(presen.sally, presen.cold, presen.report, presen.sex)
      ) {
        ElMessage.error("填写有误");
      } else if (!temperature.test(presen.temperature)) {
        ElMessage.error("温度填写有误");
      } else {
        Addloactive();
      }
    };
    const Addloactive = () => {
      const data = qs.stringify({
        name: presen.name,
        sex: presen.sex,
        age: presen.age,
        race: presen.race,
        idnumber: presen.idnumber,
        contact: presen.contact,
        address: presen.address,
        work: presen.work,
        report: presen.report,
        sally: presen.sally,
        cold: presen.cold,
        temperature: presen.temperature,
      });
      axios({
        method: "post",
        url: "/additive",
        data: data,
      })
        .then((result) => {
          if (result.data.status == 0) {
            ElMessage({
              type: "success",
              message: "添加成功",
            });
          } else {
            ElMessage.error("添加失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 清空表单内容
    const empty = () => {
      presen.name = "";
      presen.sex = "";
      presen.age = "";
      presen.race = "";
      presen.idnumber = "";
      presen.contact = "";
      presen.address = "";
      presen.report = "";
      presen.sally = "";
      presen.cold = "";
      presen.temperature = "";
      presen.work = "";
    };
    const jump = () => {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        router.push("/native");
      }, 50);
    };
    return {
      presen,
      additive,
      empty,
      jump,
    };
  },
};
</script>
<style type="text/css" scoped>
.infor {
  width: 1688px;
}
.confirmaddition {
  display: flex;
  justify-content: center;
}
</style>
