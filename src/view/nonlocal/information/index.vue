<template>
	<div class="information">
		<el-card class="box-card boxCard">
			<div class="header">
				<p>添加国内人员信息</p>
			</div>
			<el-divider />
			<el-alert title="请严格遵守相关法律进行填写个人信息,如果填写信息有误需要承担相应法律规则，疫情期间注意防护!" type="warning" show-icon />
			<el-form   style="margin-top: 20px;">
				<el-form-item label="姓名:">
					<el-input v-model.trim="message.name" placeholder="请输入姓名"/>
				</el-form-item>
				<el-form-item label="性别:">
					<el-select v-model="message.sex" placeholder="请输入姓别">
						<el-option label="男" value="男"/>
						<el-option label="女" value="女"/>
					</el-select>
				</el-form-item>
				<el-form-item label="年龄:">
					<el-input v-model.trim="message.age" placeholder="请输入年龄"/>
				</el-form-item>
				<el-form-item label="民族:">
					<el-input v-model.trim="message.race" placeholder="请输入名族"/>
				</el-form-item>
				<el-form-item label="联系方式:">
					<el-input v-model.trim="message.contact" placeholder="请输入联系方式"/>
				</el-form-item>
				<el-form-item label="身份证号码:">
					<el-input v-model.trim="message.idnumber" placeholder="请输入身份证号码"/>
				</el-form-item>
				<el-form-item label="家庭住址:">
					<el-input v-model.trim="message.address" placeholder="请输入家庭住址"/>
				</el-form-item>
				<el-form-item label="职业:">
					<el-input v-model.trim="message.work" placeholder="请输入职业"/>
				</el-form-item>
				<el-form-item label="本目的地:">
					<el-input v-model.trim="message.bourn" placeholder="请输入本地目的地"/>
				</el-form-item>
				<el-form-item label="是否核酸:">
					<el-select v-model="message.nucleic">
						<el-option label="是" value="是"/>
						<el-option label="否" value="否"/>
					</el-select>
				</el-form-item>
				<el-form-item label="是否接种:">
					<el-select v-model="message.vaccinate">
						<el-option label="是" value="是"/>
						<el-option label="否" value="否"/>
					</el-select>
				</el-form-item>
				<el-form-item label="是否发烧、感冒、咳嗽:">
					<el-select v-model="message.cold">
						<el-option label="否" value="否"/>
						<el-option label="是" value="是"/>
					</el-select>
				</el-form-item>
				<el-form-item label="体温:">
					<el-input v-model.trim="message.temperature" placeholder="请输入体温"/>
				</el-form-item>
				<el-form-item label="本地详细地址:">
					<el-input v-model.trim="message.addressdetaics" placeholder="请输入本地详细地址"/>
				</el-form-item>
			</el-form>
			<div class="confirmaddition">
				<el-button  @click="jump">返回上一页</el-button>
				<el-button  @click="confirmaddition">确定添加</el-button>
				<el-button  @click="empty">清空</el-button>
			</div>
		</el-card>
	</div>
</template>
<script scoped>
	import {reactive} from 'vue'
	import {useRouter} from 'vue-router';
	import {useStore} from 'vuex'
	import {ElMessage,ElMessageBox,ElLoading} from 'element-plus'
	import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
	import axios from '../../../axios/instance.js'
	import qs from 'qs'
	export default{
		name:"information",
		setup(){
			const message = reactive({
				name:"",
				sex:"",
				age:"",
				race:"",
				bourn:"",
				contact:"",
				idnumber:"",
				address:"",
				work:"",		
				addressdetaics:"",
				nucleic:"",
				vaccinate:"",
				cold:"",
				temperature:""
			})
			const router = useRouter()
			const store = useStore()
			const textempty = /\S/
			const idnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
			const temperature = /^[1-9][0-9]{0,3}$|^[1-9][0-9]{0,3}[\.][0-9]$/
			const age = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/
			const word = /^[\u4e00-\u9fa5]+$/
			const confirmaddition = ()=>{
			 if(!textempty.test(message.name,message.race,message.work,message.address,message.bourn,message.addressdetaics)){
			 	ElMessage.error('不能为空')
			 }else if(!contact.test(message.contact)){
			 	ElMessage.error('手机号码格式有误')
			 }else if(!idnumber.test(message.idnumber)){
			 	ElMessage.error('身份证号码格式有误')
			 }else if(!temperature.test(message.temperature)){
			 	ElMessage.error('温度填写有误')
			 }else if(!word.test(message.sex,message.nucleic,message.vaccinate,message.cold)){
			 	ElMessage.error('填写有误')
			 }else if(!age.test(message.age)){
			 	ElMessage.error('年龄有误')
			 }else{
			 	chinaData()
			 }
			}
			const chinaData = ()=>{
				const data = qs.stringify({
					name:message.name,
					sex:message.sex,
					age:message.age,
					race:message.race,
					contact:message.contact,
					idnumber:message.idnumber,
					address:message.address,
					work:message.work,
					addressdetaics:message.addressdetaics,
					nucleic:message.nucleic,
					vaccinate:message.vaccinate,
					cold:message.cold,
					bourn:message.bourn,
					temperature:message.temperature
				})
				axios({
					method:'post',
					url:'/adddata',
					data:data
				}).then((result)=>{
					if(result.data.status == 0){
						ElMessage({
							 type: 'success',
							 message: '添加成功',
						})
					}else{
						ElMessage.error('添加失败')
					}
				}).catch((err)=>{console.log(err)})
			}
			const empty = ()=>{
				message.name = ""
				message.sex = ""
				message.age = ""
				message.race = ""
				message.bourn = ""
				message.contact =  ""
				message.idnumber = ""
				message.address = ""
				message.work = ""	
				message.addressdetaics = ""
				message.nucleic = ""
				message.vaccinate = ""
				message.cold = ""
				message.temperature = ""
			}
			const jump = ()=>{
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
				setTimeout(() => {
					loading.close()
					router.push('/nonlocal')
				}, 50)
				
			}
			return{
				message,
				empty,
				jump,
				confirmaddition
			}
		}

	}
	
</script>
<style type="text/css" scoped>
	.boxCard{
		width: 1688px;
	}
	
	.confirmaddition{
		display: flex;
		justify-content: center;
	}
	.el-button{
		background: #10aeb5;
		color: #fff;
	}
	.el-button:hover{
		background: #10aeb5;
		color: #fff;
	}
</style>