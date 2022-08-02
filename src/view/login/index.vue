<template>
	<div class="voidsbp_targ_dealloc_login">
			<el-card class="box-card"> 
					<div class="header">
		  			<el-icon style="font-size:25px; margin-right: 5px"><Avatar /></el-icon><h3>疫情人员信息与数据后台管理系统登录页面</h3>
		  		</div>
		  		<el-divider />
		  		<el-form >
				    <el-form-item label="账号:">
				      <el-input  placeholder="请输入账号" v-model.trim="username"/>
				    </el-form-item>
				    <el-form-item label="密码:">
				      <el-input type="password" placeholder="请输入密码" show-password v-model="password" />
				    </el-form-item>
				    <div class="but">
				    	 <el-button type="primary" @click="Confirmlogin">确定登录</el-button>
				    	 <el-button type="primary" @click="registered">立即注册</el-button>
				    </div>
				 </el-form>
			</el-card>
	</div>
</template>
<script>
import { reactive, ref ,onMounted} from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from '../../axios/instance.js'
import {setToken,userPic,adminName,Phone,Email,Name,Role,Address,Sex,Remarks,Id} from '@/token'
import qs from 'qs'
export default{
	name:'login',
	setup(){
		const username  = ref('')
		const password  = ref('')
		const inforData = ref({})
		const router = useRouter()
	
		// 账号的正则
		const  name = /^[a-zA-Z0-9_-]{5,10}$/
		// 密码的正则
		const pwd = /^.*(?=.{5,10})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
		const Confirmlogin = ()=>{
			if(name.test(username.value) == false){
				ElMessage.error('账号格式不对')
			}else if(pwd.test(password.value) == false){
					ElMessage.error('密码格式不对')
			}else{
				axios.post('/login',qs.stringify({username:username.value,password:password.value})).then((result)=>{
					if(result.data.status == 0){
						setToken(result.data.token)
						userPic(result.data.data.user_pic)
						adminName(result.data.data.adminname)
						Phone(result.data.data.phone)
						Email(result.data.data.email)
						Name(result.data.data.name)
						Role(result.data.data.role)
						Address(result.data.data.address)
						Sex(result.data.data.sex)
						Remarks(result.data.data.remarks)
						Id(result.data.data.id)
						router.replace('/home')
						ElMessage({
						  type: 'success',
						  message: '登录成功',
						})
						
					}else{
						ElMessage.error('登录失败')
					}

			})

			}
		}
		const registered = ()=>{
			router.push('/registered')
		}

		return{
			username,
			password,
			Confirmlogin,
			registered
		}
	}
}
</script>
<style  scoped>
	.voidsbp_targ_dealloc_login{
			position:fixed;
			width: 100%;
			height: 100%;
			background-image: url('../../assets/19322.jpg');
			background-size: 100% 100%;
   			background-repeat: no-repeat;
   	}
   	.box-card{
   		width: 600px;
   		margin-left: auto;
   		margin-right: 340px;
   		margin-top: 300px;
   	}
   		.header{
   		text-align: center;
   		letter-spacing: 3px;
   		display: flex;
   		justify-content: center;
   	}
   	.but{
   		display: flex;
    justify-content: space-around;
   	}
</style>