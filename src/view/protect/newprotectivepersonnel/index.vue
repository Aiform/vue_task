<template>
	<div class="New_protective_personnel">
		<el-card>
			<div class="header">
				<p>添加防护人员信息</p>
			</div>
			<el-divider />
			<el-alert title="请严格遵守相关法律进行填写个人信息,如果填写信息有误需要承担相应法律规则，疫情期间注意防护!" type="warning" show-icon />
			<el-form style="margin-top: 20px;">
				<el-form-item label="姓名:">
					<el-input  size="large" placeholder="请输入姓名" v-model.trim="message.name"/>
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model.trim="message.sex">
						<el-option label="男" value="男" />
						<el-option label="女" value="女" />
					</el-select>
				</el-form-item>
				<el-form-item label="年龄:">
					<el-input  size="large" placeholder="请输入年龄" v-model.trim="message.age"/>
				</el-form-item>
				<el-form-item label="联系方式:">
					<el-input  size="large" placeholder="请输入联系方式" v-model.trim="message.contact" />
				</el-form-item>
				<el-form-item label="毕业学校名称:">
					<el-input  size="large" placeholder="毕业学校名称" v-model.trim="message.schoolname"/>
				</el-form-item>
				<el-form-item label="所在医院名称:">
					<el-input  size="large" placeholder="所在医院名称" v-model.trim="message.hospitalname"/>
				</el-form-item>
				<el-form-item label="所在医院部门:">
					<el-input  size="large" placeholder="所在医院部门" v-model.trim="message.hospitaldepartment" />
				</el-form-item>
				<el-form-item label="本地目的的:">
					<el-input size="large" placeholder="本地目的地" v-model.trim="message.localaddress"/>
				</el-form-item>
				<el-form-item label="健康码颜色:">
					<el-input size="large" placeholder="本地目的地" v-model.trim="message.healthcode"/>
				</el-form-item>
				<el-form-item label="上传健康码图片:">
					<input type="file" @change="getFile($event)"/>
				</el-form-item>
				<el-form-item label="体温:">
					<el-input size="large" placeholder="体温" v-model.trim="message.temperature" />
				</el-form-item>
				<el-form-item label="是否为支援">
					<el-select v-model.trim="message.support">
						<el-option label="是" value="是" />
						<el-option label="否" value="否" />
					</el-select>
				</el-form-item>
			</el-form>
			<div class="confirmaddition">
				<el-button @click="jump">返回上一页</el-button>
				<el-button  @click="determine($event)">确认保存</el-button>
				<el-button  @click="empty">清空</el-button>
			</div>
		</el-card>
	</div>

</template>
<script>
	import {ref,reactive} from 'vue'
	import {useRouter} from 'vue-router'
	import {ElMessage,ElMessageBox,ElLoading} from 'element-plus'
	import axios from '../../../axios/instance.js'
	export default{
		name:"newprotectivepersonnel",
		setup(){
			const file = ref('')
			const message = reactive({
				name:"",
				sex:"",
				age:"",
				contact:"",
				schoolname:"",
				hospitalname:"",
				hospitaldepartment:"",
				localaddress:"",
				healthcode:"",
				temperature:"",
				support:""
			})
			const router = useRouter()
			const getFile = (event)=>{
				file.value = event.target.files[0];
			}
			const textempty = /\S/
			const age = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/
			const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
			const temperature = /^[1-9][0-9]{0,3}$|^[1-9][0-9]{0,3}[\.][0-9]$/
			const word = /^[\u4e00-\u9fa5]+$/
			const determine = (event)=>{
				if(!textempty.test(message.name,message.sex,file.value,message.schoolname,message.hospitalname,message.hospitaldepartment,message.localaddress,message.healthcode)){
					ElMessage.error('不能为空')
				}else if(!age.test(message.age)){
					ElMessage.error('年龄填写有误')
				}else if(!contact.test(message.contact)){
					ElMessage.error('手机号码格式有误')
				}else if(!temperature.test(message.temperature)){
					ElMessage.error('体温填写有误')
				}else if(!word.test(message.support)){
					ElMessage.error('输入有误')
				}else{
					nurseAxios()
				}
			}
			const nurseAxios = ()=>{
				const formData = new FormData();
					formData.append('name',message.name)
					formData.append('sex',message.sex)
					formData.append('age',message.age)
					formData.append('contact',message.contact)
					formData.append('schoolname',message.schoolname)
					formData.append('hospitalname',message.hospitalname)
					formData.append('hospitaldepartment',message.hospitaldepartment)
					formData.append('localaddress',message.localaddress)
					formData.append('healthcode',message.healthcode)
					formData.append('filename',file.value);
					formData.append('temperature',message.temperature);
					formData.append('support',message.support);
					axios({
						method: 'post',
			            url: '/addprotectionpersonnelinformation',//写入地址
			            data: formData,
			            headers: {
			            	"Content-Type": "multipart/form-data"
			            }
			        }).then((result)=>{
			        	if(result.data.status == 0){
			        		ElMessage({
			        			message: '添加成功',
			        			type: 'success',
			        		})
			        	}else{
			        		ElMessage.error('添加失败')
			        	}
			        })
			}
			const  jump = ()=>{
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
				setTimeout(() => {
					loading.close()
					router.push('/protect')
				}, 100)

			}
			const empty = ()=>{
				message.name = ""
				message.sex = ""
				message.age = ""
				message.contact = ""
				message.schoolname = ""
				message.hospitalname = ""
				message.hospitaldepartment = ""
				message.localaddress = ""
				message.healthcode = ""
				message.temperature = ""
				message.support = ""
			}
			return{
				jump,
				message,
				determine,
				getFile,
				empty			
			}

		}
	}
</script>
<style type="text/css" scoped>
	.New_protective_personnel{
		width: 1675px;
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