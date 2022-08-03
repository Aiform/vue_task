<template>
<div class="information">
	<el-card class="box-card boxCard">
		<div class="header">
			<p>添加境外人员信息</p>
		</div>
		<el-divider />
		<el-alert title="请严格遵守相关法律进行填写个人信息,如果填写信息有误需要承担相应法律规则，疫情期间注意防护!" type="warning" show-icon />
		<el-form style="margin-top: 20px;">
			<el-form-item label="姓名:">
				<el-input v-model.trim="message.name" placeholder="请输入国内姓名"/>
			</el-form-item>
			<el-form-item label="护照号码:">
				<el-input v-model.trim="message.passport" placeholder="请输入国内护照号码"/>
			</el-form-item>
			<el-form-item label="联系方式:">
				<el-input v-model.trim="message.contact" placeholder="请输入国内联系方式"/>
			</el-form-item>
			<el-form-item label="入境口岸:">
				<el-input v-model.trim="message.pore" placeholder="请输入国内入境口岸"/>
			</el-form-item>
			<el-form-item label="入境日期:">
				<el-input v-model.trim="message.time" placeholder="请输入国内入境日期 例如(2022-02-12)"/>
			</el-form-item>
			<el-form-item label="入境前14天是否去过其他国家和地区:">
				<el-select v-model.trim="message.area">
						<el-option label="否" value="否"/>
						<el-option label="是" value="是"/>
				</el-select>
			</el-form-item>
			<el-form-item label="航班:">
				<el-input v-model.trim="message.fight" placeholder="请输入国内/国外航班"/>
			</el-form-item>
			<el-form-item label="入境第一城市:">
				<el-input v-model.trim="message.city" placeholder="请输入国内城市"/>
			</el-form-item>
			<el-form-item label="本地目的地:">
				<el-input v-model.trim="message.borune" placeholder="请输入国内目的地"/>
			</el-form-item>
			<el-form-item label="上传核酸检测证明:">
				<input type="file" @change="getFile($event)"/>
			</el-form-item>
			<el-form-item label="上传血清证明:">
				<input type="file" @change="getFile1($event)"/>

			</el-form-item>
			<el-form-item label="上传解除隔离证明:">
				<input type="file" @change="getFile2($event)"/>
			</el-form-item>
			<el-form-item label="本地详细地址">
				<el-input v-model.trim="message.addressdetaics" placeholder="请输入国内详细地址"/>
			</el-form-item>
		</el-form>
		<div class="confirmaddition">
			<el-button @click="jump"  >返回上一页</el-button>
			<el-button @click="confirmaddition($event)">确定添加</el-button>
			<el-button @click="empty">清空</el-button>
		</div>
	</el-card>
</div>
</template>
<script scoped>
import {reactive,ref} from 'vue'
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'
import {ElMessage,ElMessageBox,ElLoading} from 'element-plus'
import {Delete, Download, Plus, ZoomIn} from '@element-plus/icons-vue'
import axios from '../../../axios/instance.js'
import qs from 'qs'
export default{
	name:"newlyaddedoverseas",
	setup(){
		const file = ref('')
		const file1 = ref('')
		const file2 = ref('')
		const message = reactive({
			name:"",
			passport:"",
			contact:"",
			pore:"",
			time:"",
			area:"",
			fight:"",
			city:"",
			borune:"",
			addressdetaics:"",
		})
		const router = useRouter()
		const store = useStore()
		const passport = /^([a-zA-z]|[0-9]){5,17}$/
		const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
		const textempty = /\S/
		const confirmaddition = (event)=>{
				if(!textempty.test(message.name,file.value,file1.value,file2.value,message.time,message.area,message.fight,message.city,message.borune,message.addressdetaics)){
					ElMessage.error('不能为空')
				}else if(!contact.test(message.contact)){
					ElMessage.error('联系方式格式有误')
				}else if(!passport.test(message.passport)){
					ElMessage.error('护照号码格式有误')
				}else{
					updataFile()
				}
		 	}
		 const updataFile = ()=>{
		    		const formData = new FormData();
					formData.append('name',message.name)
					formData.append('passport',message.passport)
					formData.append('contact',message.contact)
					formData.append('pore',message.pore)
					formData.append('time',message.time)
					formData.append('area',message.area)
					formData.append('fight',message.fight)
					formData.append('city',message.city)
					formData.append('borune',message.borune)
	       			formData.append('filename',file.value);//设置参数
	       			formData.append('filename',file1.value);
	       			formData.append('filename',file2.value);
	       			formData.append('addressdetaics',message.addressdetaics);
	       		 	axios({
	       		 	  	method: 'post',
		   		 	        url: '/uploadfile',//写入地址
		   		 	        data: formData,
		   		 	        headers: {
		   		 	        	"Content-Type": "multipart/form-data"
		   		 	        }
		   		 	    }).then((result)=>{
		   		 	    	console.log(result)
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
		    const getFile = (event) =>{
		    	file.value=event.target.files[0];
		    }
		    const getFile1 = (event) =>{
		    	file1.value=event.target.files[0];
		    }
		    const getFile2 = (event) =>{
		    	file2.value=event.target.files[0];
		    }
		    const empty = ()=>{
		    	message.name = ""
		    	message.passport = ""
		    	message.contact = ""
		    	message.pore = ""
		    	message.time = ""
		    	message.area = ""
		    	message.fight = ""
		    	message.city = ""
		    	message.borune = ""
		    	message.addressdetaics = ""
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
		    	confirmaddition,
		    	file,
		    	file1,
		    	file2,
		    	getFile1,
		    	getFile2,
		    	getFile
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
</style>