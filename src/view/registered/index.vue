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
            <div class="but">
              <el-button @click="registered">立即注册</el-button>
              <el-button @click="login">已有账号 返回登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { reactive, ref, } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, } from "element-plus";
import axios from "../../axios/instance.js";
import qs from 'qs'
import {
  setToken
} from "@/token";
export default {
  name: "registered",
  setup() {
    const fileList = ref('');
    const router = useRouter();
    const infor = reactive({
      username: "",
      password: "",
      repassword: "",
    
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

    const registered = () => {
      if (username.test(infor.username) == false) {
        ElMessage.error("账号格式不对");
      } else if (password.test(infor.password) == false) {
        ElMessage.error("密码格式不对");
      } else if (repassword.test(infor.repassword) == false) {
        ElMessage.error("确认密码格式不对");
      } else if(infor.password !== infor.repassword){
          ElMessage.error("确认密码错误");
      }else {
          const data = qs.stringify({
          username:infor.username,
          password:infor.password
          })
        axios({
          method: "post",
          url: "/reguser",
          data: data,
        }).then((result) => {
          console.log(result)
          if (result.data.status == 0) {
            // 后端返回来的头像
            setToken(result.data.token)
        
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
  top: 230px;
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
 justify-content: space-between;
}
.el-button {
  background: #409eff;
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
