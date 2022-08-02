<template>
	<div class="PersonalCenter">
		<el-card  >	
			<div class="infor">
				<div class="awatr">
					<img :src="UserPic" width="100" height="100" style="border-radius:50%;">
				</div>
				<div class="text">
					<h4>超级管理员</h4>
					<p>注册日期:2022-7-1</p>
				</div>
				<div class="ModifyAvatar">
					<el-upload
					v-model="fileList"
					class="upload-demo"
					action="http://localhost:3008/uploads/"
					multiple
					:limit="3"
					@change="getFile($event)"
					>
					<el-button type="primary" v-if="show" @click="Modification"><el-icon><EditPen /></el-icon>修改头像</el-button>
					
				</el-upload>
				<el-button type="primary" v-if="isShow" @click="ConfirmModification"><el-icon><EditPen /></el-icon>确认修改</el-button>
			</div>
			<div class="diver">
				<el-divider content-position="center">信息绑定</el-divider>
				<div class="word">
					<div class="wordinfor">
						<p>手机:{{Phones}}</p>
						<el-button type="primary" @click="visible = true"><el-icon><Iphone /></el-icon>修改手机</el-button>
					</div>
					<div class="Email">
						<p>邮箱:{{Emails}}</p>
						<el-button type="primary" @click="visibleEmail = true"><el-icon><Message /></el-icon>绑定邮箱</el-button>
					</div>
				</div>
			</div>
			<el-divider />
			<div class="ChangePassword">
				<el-button type="danger" @click="visiblePassword = true"><el-icon><Lock /></el-icon>修改密码</el-button>
			</div>
		</div>
		<div class="Dividingline"></div>
		<div class="form">
			<el-divider content-position="center">个人信息</el-divider>
			<el-form  label-width="120px">
				<el-form-item label="管理员名称：">
					{{AdminNames}}
				</el-form-item>
				<el-form-item label="管理员角色：">
					{{Roles}}
				</el-form-item>
				<el-form-item label="真实姓名：">
					<el-input :value="Names"/>
				</el-form-item>
				<el-form-item label="地址：">
					<el-input :value="Addresss"/>
				</el-form-item>
				<el-form-item label="姓别：">
					<el-input :value="Sexs"/>
				</el-form-item>
				<el-form-item label="备注：">
					<el-input  type="textarea"  :value="Remarkss"/>
				</el-form-item>
				<el-button @click="visibleInfor = true"><el-icon><Check /></el-icon>修改个人信息</el-button>
			</el-form>
		</div>
		<!-- 弹出框内容 -->
		<el-dialog v-model="visible" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<div class="header">
					<h4>修改个人手机号</h4>
				</div>
			</template>
			<el-form>
				<el-form-item label="新手机号:">
					<el-input v-model.trim="newPhone"  placeholder="请输入新手机号"/>
				</el-form-item>
			</el-form>
			<div class="but">
				<el-button @click="ModifyMobileNumber">确定修改</el-button>
				<el-button @click="visible = false">退出</el-button>
			</div>
		</el-dialog>
		<!-- 修改个人邮箱 -->
		<el-dialog v-model="visibleEmail" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<div class="header">
					<h4>修改个人邮箱地址</h4>
				</div>
			</template>
			<el-form>
				<el-form-item label="邮箱地址:">
					<el-input v-model.trim="newEmail"  placeholder="请输入新邮箱地址"/>
				</el-form-item>
			</el-form>
			<div class="but">
				<el-button @click="MyEmail">确定修改</el-button>
				<el-button @click="visibleEmail = false">退出</el-button>
			</div>
		</el-dialog>
		<!-- 修改密码 -->
		<el-dialog v-model="visiblePassword" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<div class="header">
					<h4>修改个人密码</h4>
				</div>
			</template>
			<el-form>
				<el-form-item label="新密码:">
					<el-input v-model.trim="newPassword"  placeholder="请输入新密码"/>
				</el-form-item>
			</el-form>
			<div class="but">
				<el-button @click="MyPassword">确定修改</el-button>
				<el-button @click="visiblePassword = false">退出</el-button>
			</div>
		</el-dialog>
		<!-- 修改个人信息 -->
		<el-dialog v-model="visibleInfor" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<div class="header">
					<h4>修改个人信息</h4>
				</div>
			</template>
			<el-form-item label="管理员身份:">
				<el-select v-model="AdminNames" placeholder="请选择" >
				  <el-option label="普通管理员" value="普通管理员" />
				  <el-option label="中级管理员" value="中级管理员" />
				  <el-option label="高级管理员" value="高级管理员" />
				  <el-option label="超级管理员" value="超级管理员" />
				</el-select>
			</el-form-item>
			 <el-form-item label="管理员角色:">
			    <el-select v-model="Roles" placeholder="请选择" >
			      <el-option label="员工" value="员工" />
			      <el-option label="干部" value="干部" />
			      <el-option label="老板" value="老板" />
			    </el-select>
			  </el-form-item>
			   <el-form-item label="选择性别:">
				<el-select v-model="Sexs" placeholder="请选择" >
				  <el-option label="男" value="男" />
				  <el-option label="女" value="女" />
				</el-select>
			</el-form-item>
			  <el-form-item label="真实姓名:">
					<el-input v-model.trim="Names"  placeholder="请输入新姓名"/>
			</el-form-item>
			 <el-form-item label="家庭地址:">
					<el-input v-model.trim="Addresss"  placeholder="请输入家庭地址"/>
			</el-form-item>
			 <el-form-item label="填写备注:">
					<el-input v-model.trim="Remarkss"  placeholder="请输入新备注"/>
			</el-form-item>
			<div class="but">
				<el-button @click="MyInfor">确定修改</el-button>
				<el-button @click="visibleInfor = false">退出</el-button>
			</div>
		</el-dialog>
	</el-card>
</div>
</template>
<script type="text/javascript">
	import {onMounted,ref,inject,onBeforeUnmount} from 'vue'
	import axios from '../../axios/instance.js'
	import {userPic,Phone,Email,Remarks,Sex,Address,Role,Name,adminName} from '@/token'
	import {useRouter} from 'vue-router'
	import { ElMessage, ElMessageBox ,ElLoading } from 'element-plus'
	import qs from 'qs'
	export default{
		setup(){
			// 原生数据
			const AdminNames = ref('')
			const Phones = ref('')
			const Emails = ref('')
			const Names = ref('')
			const Addresss = ref('')
			const Roles = ref('')
			const Sexs = ref('')
			const Remarkss = ref('')
			const UserPic = ref('')
			const ID = ref('')
			// 修改头像
			const fileList = ref('')
			// 修改过后新数据
			const newPhone = ref('')
			const newEmail = ref('')
			const newPassword = ref('')
			// 弹出框
			const isShow = ref(false)
			const show = ref(true)
			const isInforShow  = ref(true)
			const visible = ref(false)
			const visibleEmail = ref(false)
			const visiblePassword = ref(false)
			const visibleInfor = ref(false)
			const timer =  ref(null)
			const router  = useRouter()
			// 无痕刷新
			const myFn = inject("reload");
			// 初始化展示数据
			onMounted(()=>{
				timer.value = setInterval(()=>{
					Phones.value = localStorage.getItem('PHONE')
					Emails.value = localStorage.getItem('EMAIL')
					UserPic.value = localStorage.getItem('USERPIC')
				},50)
					AdminNames.value = localStorage.getItem('ADMINNAME')
					Names.value = localStorage.getItem('NAME')
					Addresss.value = localStorage.getItem('ADDRESS')
					Roles.value = localStorage.getItem('ROLE')
					Remarkss.value = localStorage.getItem('REMARKS')
					Sexs.value = localStorage.getItem('SEX')
					ID.value = localStorage.getItem('ID')
			})
			// 修改头像的功能
			const getFile = (event)=>{
				fileList.value = event.raw
			}
			const Modification = ()=>{
				show.value = false
				isShow.value = true
			}
			const ConfirmModification = ()=>{
				if(fileList.value == ''){
					ElMessage.error('必须上传头像')
					show.value = true
					isShow.value = false
				}else{
					const fromData = new FormData()
					fromData.append('id',ID.value)
					fromData.append('filename',fileList.value)
					axios({
						method:'post',
						url: '/modifyavatar',
						data:fromData,
						headers:{
							"Content-Type": "multipart/form-data"
						}
					}).then((result)=>{
						if(result.data.status == 0){
							userPic(result.data.data.user_pic)
							show.value = true
							isShow.value = false
							ElMessage({
									type: 'success',
									message: '修改成功',
							})
						}else{
							ElMessage.error('修改失败')
						}

					})
				}

			}
			// 修改手机号的功能
			const my_phone = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
			const ModifyMobileNumber = ()=>{
				if(my_phone.test(newPhone.value) == false){
					ElMessage.error('手机号码格式不对')

				}else{
					const data = qs.stringify({
						id:ID.value,
						phone:newPhone.value
					})
					axios({
						method:'post',
						url: '/modifyphone',
						data:data,
					}).then((result)=>{
						if(result.data.status == 0){
							Phone(result.data.data.phone)
							visible.value = false
							ElMessage({
									type: 'success',
									message: '修改成功',
							})
						}else{
							ElMessage.error('修改失败')
						}
						
					})
				}
			}
			// 修改邮箱
			// 邮箱的验证规则
			const My_email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/
			const MyEmail = ()=>{
				if(My_email.test(newEmail.value) == false){
					ElMessage.error('邮箱地址格式不对')

				}else{
					const data = qs.stringify({
						id:ID.value,
						email:newEmail.value
					})
					axios({
						method:'post',
						url: '/modifyemail',
						data:data,
					}).then((result)=>{
						if(result.data.status == 0){
							Email(result.data.data.email)
							visibleEmail.value = false
							ElMessage({
									type: 'success',
									message: '修改成功',
							})
						}else{
							ElMessage.error('修改失败')
						}
						
					})
				}
			}
			// 修改密码
			const password = /^.*(?=.{5,10})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
			const MyPassword = ()=>{
				if(password.test(newPassword.value) == false){
						ElMessage.error('密码格式不对')
				}else{
					const data = qs.stringify({
						id:ID.value,
						password:newPassword.value
					})
					axios({
						method:'post',
						url: '/mpdifypassword',
						data:data,
					}).then((result)=>{
						if(result.data.status == 0){
							visiblePassword.value = false
							ElMessage({
									type: 'success',
									message: '修改成功',
							})
						}else{
							ElMessage.error('修改失败')
						}
						
					})

				}
			}
			// 修改个人信息
			const empty = /\S/
			const MyInfor = ()=>{
				if(!empty.test(Names.value,Addresss.value,Remarkss.value)){
					ElMessage.error('不可以为空')
				}else{
					AdminInfor()
				}
			}
			const AdminInfor = ()=>{
				const data = qs.stringify({
						id:ID.value,
						adminname:AdminNames.value,
						role:Roles.value,
						name:Names.value,
						address:Addresss.value,
						sex:Sexs.value,
						remarks:Remarkss.value
					})
					axios({
						method:'post',
						url: '/admininfor',
						data:data,
					}).then((result)=>{
						if(result.data.status == 0){
							adminName(result.data.data.adminname)
							Name(result.data.data.name)
							Role(result.data.data.role)
							Sex(result.data.data.sex)
							Remarks(result.data.data.remarks)
							Address(result.data.data.address)
							myFn()
							ElMessage({
									type: 'success',
									message: '修改成功',
							})
						}else{
							ElMessage.error('修改失败')
						}
					})
			}
			onBeforeUnmount(()=>{
				clearInterval(timer.value)
			})
			return{
				AdminNames,
				Phones,
				Emails,
				Names,
				Addresss,
				Roles,
				Sexs,
				Remarkss,
				UserPic,
				fileList,
				isShow,
				show,
				isInforShow,
				newPhone,
				newEmail,
				newPassword,
				ConfirmModification,
				getFile,
				Modification,
				visible,
				ModifyMobileNumber,
				visibleEmail,
				MyPassword,
				visiblePassword,
				visibleInfor,
				MyInfor,
				MyEmail
			}

		}

	}

</script>
<style type="text/css" scoped>
	.PersonalCenter{
		width: 1200px;
		margin: auto;
	}
	/deep/ .el-card__body{
		display: flex;
	}
	.infor{
		width: 450px;

	}
	.awatr{
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: auto;
	}
	.text{
		text-align: center;
		line-height: 33px;
	}
	.text p {
		font-size: 13px;
	}
	.ModifyAvatar{
		margin-top: 10px;
	}
	.ModifyAvatar .el-button{
		background: #10aeb5;
	}
	/deep/ .upload-demo{
		display: flex;
		justify-content: center;
	}
	.diver{
		margin-top: 34px;
	}
	/deep/ .el-divider__text {
		font-size: 19px;
	}
	.word{
		text-indent: 10px;
		line-height: 40px;
		font-size: 14px;
		letter-spacing: 2px;
	}
	.wordinfor{
		display: flex;
		justify-content: space-between;
	}
	.wordinfor  .el-button{
		height: 28px !important;
		background: #10aeb5;
	}
	.el-icon{
		margin-right: 5px;
	}
	.ChangePassword .el-button{
		width: 400px;
		height: 35px;
	}
	.form{
		width: 100%;
		height: auto;
		margin-left: 10px;

	}
	.form .el-button{
		width: 600px;
		height: 35px;
		margin-left: 126px;
		margin-top: 27px;	
		background: #10aeb5;
		color: #fff;

	}
	.Dividingline{
		height: 500px;
		width: 1px;
		background: #dcdfe6;
		margin-left: 10px;
	}
	.Email{
		    display: flex;
    justify-content: space-between;
	}
	.Email  .el-button{
		height: 28px !important;
		
		background: #10aeb5;
	}
	.header{
		margin: -20px;
		width: 960px;
		height: 50px;
		background: #10aeb5;
	}
	.header h4{
		text-align: center;
		color: #fff;
		line-height: 46px;
		font-size: 20px;
		letter-spacing: 5px;
	}
	.but{
		display: flex;
		justify-content: space-between;
	}
	.but .el-button{
		background: #10aeb5;
		color: #fff;
	}
</style>