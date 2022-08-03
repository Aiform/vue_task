<template>
  <div class="voidsbp_targ_dealloc_login">
    <el-card class="box-card">
      <div class="header">
        <el-icon style="font-size: 25px; margin-right: 5px"><Avatar /></el-icon>
        <h3>疫情人员信息与数据后台管理系统注册页面</h3>
      </div>
      <el-divider />
      <div class="infor">
        <div class="inforAvatr">
          <el-form class="demo-form-inline">
            <el-form-item label="管理员身份:">
              <el-select v-model="infor.adminname" placeholder="请选择">
                <el-option label="普通管理员" value="普通管理员" />
                <el-option label="中级管理员" value="中级管理员" />
                <el-option label="高级管理员" value="高级管理员" />
                <el-option label="超级管理员" value="超级管理员" />
              </el-select>
            </el-form-item>
            <el-form-item label="管理员角色:">
              <el-select v-model="infor.role" placeholder="请选择">
                <el-option label="员工" value="员工" />
                <el-option label="干部" value="干部" />
                <el-option label="老板" value="老板" />
              </el-select>
            </el-form-item>
            <el-form-item label="管理员性别:">
              <el-select v-model="infor.sex" placeholder="请选择">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
            <el-form-item label="注册账号:">
              <el-input
                v-model.trim="infor.username"
                placeholder="请输入注册账号"
              />
              <p>最少5位，最多10位,包括至少个大小写字母数字</p>
            </el-form-item>
            <el-form-item label="注册密码:">
              <el-input
                v-model.trim="infor.password"
                type="password"
                show-password
                placeholder="请输入注册密码"
              />
              <p>
                最少5位,最多10位,包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符。
              </p>
            </el-form-item>

            <el-form-item label="确认密码:">
              <el-input
                v-model.trim="infor.repassword"
                type="password"
                show-password
                placeholder="请输入确认密码"
              />
              <p>
                最少5位,最多10位,包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符。
              </p>
            </el-form-item>
            <el-form-item label="手机号码:">
              <el-input v-model.trim="infor.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="邮箱地址:">
              <el-input
                v-model.trim="infor.email"
                type="email"
                placeholder="请输入邮箱地址"
              />
            </el-form-item>
            <el-form-item label="真实姓名:">
              <el-input v-model.trim="infor.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="家庭地址:">
              <el-input
                v-model.trim="infor.address"
                placeholder="请输入家庭地址"
              />
            </el-form-item>
            <el-form-item label="留言备注:">
              <el-input v-model.trim="infor.remarks" type="textarea" />
            </el-form-item>
            <div class="but">
              <el-button @click="registered">立即注册</el-button>
              <el-button @click="login">已有账号 返回登录</el-button>
            </div>
          </el-form>
          <div class="Avatar">
            <div class="AvataruserPic">
              <img
                src="http://124.220.165.99:3008/uploads/2022.png"
                width="70"
                height="70"
                style="border-radius: 50%"
              />
            </div>
            <el-upload
              v-model="fileList"
              class="upload-demo"
              action="http://124.220.165.99:3008/uploads/"
              multiple
              :limit="3"
              @change="getFile($event)"
            >
              <el-button type="primary">上传头像</el-button>
            </el-upload>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "../../axios/instance.js";
import {
  userPic,
  adminName,
  Phone,
  Email,
  Name,
  Role,
  Address,
  Sex,
  Remarks,
  Id,
  setToken
} from "@/token";
export default {
  name: "registered",
  setup() {
    const fileList = ref('');
    const isEmpty = ref(true);
    const router = useRouter();
    const infor = reactive({
      adminname: "",
      role: "",
      sex: "",
      username: "",
      password: "",
      repassword: "",
      phone: "",
      email: "",
      name: "",
      address: "",
      remarks: "",
    });
    const getFile = (event) => {
      fileList.value = event.raw;
    };
    // 账号的正则
    const username = /^[a-zA-Z0-9_-]{5,10}$/;
    // 密码的正则
    const password =
      /^.*(?=.{5,10})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    // 确认密码的正则 //验证规则：最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符。
    const repassword =
      /^.*(?=.{5,10})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    // 手机号的验证规则
    const phone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    // 邮箱的验证规则
    const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
    const registered = () => {
      if (
        infor.adminname == "" ||
        infor.role == "" ||
        infor.sex == "" ||
        infor.name == "" ||
        infor.address == "" ||
        infor.remarks == ""
      ) {
        ElMessage.error("输入不可以为空");
      } else if (username.test(infor.username) == false) {
        ElMessage.error("账号格式不对");
      } else if (password.test(infor.password) == false) {
        ElMessage.error("密码格式不对");
      } else if (repassword.test(infor.repassword) == false) {
        ElMessage.error("确认密码格式不对");
      } else if (phone.test(infor.phone) == false) {
        ElMessage.error("手机格式不对");
      } else if (email.test(infor.email) == false) {
        ElMessage.error("邮箱格式不对");
      } else if (infor.password != infor.repassword) {
        ElMessage.error("密码确认有误");
      } else {
        const fromData = new FormData();
        fromData.append("adminname", infor.adminname);
        fromData.append("role", infor.role);
        fromData.append("sex", infor.sex);
        fromData.append("username", infor.username);
        fromData.append("password", infor.password);
        fromData.append("phone", infor.phone);
        fromData.append("email", infor.email);
        fromData.append("name", infor.name);
        fromData.append("address", infor.address);
        fromData.append("remarks", infor.remarks);
        fromData.append("filename", fileList.value);
        axios({
          method: "post",
          url: "/reguser",
          data: fromData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((result) => {
          if (result.data.status == 0) {
            // 后端返回来的头像
            setToken(result.data.token)
            userPic(result.data.data.user_pic);
            adminName(result.data.data.adminname);
            Phone(result.data.data.phone);
            Email(result.data.data.email);
            Name(result.data.data.name);
            Role(result.data.data.role);
            Address(result.data.data.address);
            Sex(result.data.data.sex);
            Remarks(result.data.data.remarks);
            Id(result.data.data.id);
            router.push("/home");
            ElMessage({
              type: "success",
              message: "注册成功",
            });
          }else{
            ElMessage.error("用户名被占用");
          }
        });
      }
    };
    const login = () => {
      router.push("/login");
    };
    return {
      infor,
      getFile,
      fileList,
      registered,
      login,
    };
  },
};
</script>
<style scoped>
.voidsbp_targ_dealloc_login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/19321.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.box-card {
  width: 600px;
  height: auto;
  position: absolute;
  top: 80px;
  left: 300px;
}
.header {
  text-align: center;
  letter-spacing: 3px;
  display: flex;
  justify-content: center;
}
.inforAvatr {
  position: relative;
}
.but {
  display: flex;
  justify-content: center;
}
.el-button {
  background: #10aeb5;
  color: #fff;
}
.Avatar {
  position: absolute;
  top: 0;
  left: 400px;
}
.AvataruserPic {
  width: 70px;
  height: 70px;
  background: #c0c4cc;
  border-radius: 50%;
}
.upload-demo {
  margin-left: -7px;
  margin-top: 10px;
}
p {
  font-size: 10px;
}
</style>
