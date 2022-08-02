<template>
	<div class="newaddress">
		<el-card>
			<div class="header">
				<p>新增地区疫情数据</p>
			</div>
			<el-divider />
			<el-alert title="疫情期间请勿前往高中风险地区!" type="warning" show-icon />
			  <el-form label-width="120px">
				    <el-form-item label="城市:">
				      <el-input placeholder="请输入省会与市区--例如:郑州（河南省）只能输入省会城市" @focus="focus" @change="change" v-model.trim="address.provincial"/> 
				    </el-form-item>
				   	<div v-if="isshow" class="words">
				   			<p>{{words}}</p>
				   	</div>
				  	<el-form-item label="新增本地:">
				      <el-input placeholder="请输入新增本地数据" v-model.trim.Number="address.localdata"/>
				    </el-form-item>
				    <el-form-item label="新增无症状:">
				       <el-input placeholder="请输入新增无症状数据" v-model.trim.Number="address.asymptomaticdata"/>
				    </el-form-item>
				    <el-form-item label="风险区域:">
				      <el-input placeholder="请输入风险区域数据" v-model.trim.Number="address.risk"/>
				    </el-form-item>
				    <div class="but">
				     <el-button  @click="next">返回上一页</el-button>
				      <el-button  @click="ConfirmAddition">确认添加</el-button>
				       <el-button  @click="empty">清空</el-button>
				    </div>
			</el-form>
			 
		</el-card>
	</div>

</template>
<script type="text/javascript">
	import {reactive,ref} from 'vue'
	import {useRouter} from 'vue-router'
	import {ElMessage,ElMessageBox,ElLoading} from 'element-plus'
	import axios from '../../../axios/instance.js'
	import qs from 'qs'
	export default{
		setup(){
			const router = useRouter()
			 const isshow = ref(true)
			const address = reactive({
					provincial:"",
					localdata:"",
					asymptomaticdata:"",
					risk:""
				})
			const words = ref('')
			const change = ()=>{
				if(address.provincial == ''){
					ElMessage.error('不可以为空')
				}else{
					axios.post('/epidemicriskprompt',qs.stringify({provincial:address.provincial})).then((result)=>{
								if(result.data.status == 0){
									 isshow.value = true
									 words.value = result.data.data

								}
					})
				}	
			}
			const focus = ()=>{
				isshow.value = false
			}
			// 添加
			const sum = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/
			const textempty = /\S/
			const ConfirmAddition = ()=>{
				if(!textempty.test(address.provincial)){
					ElMessage.error('不可以为空')
				}else if(!sum.test(address.localdata,address.asymptomaticdata,address.risk)){
					ElMessage.error('数据格式不对')
				}else{
					addConfirm()
				}
			}
			const addConfirm = ()=>{
				const data = qs.stringify({
					address:address.provincial,
					newlocal:address.localdata,
					newasymptomatic:address.asymptomaticdata,
					riskarea:address.risk
				})
				axios({
					method:"post",
					url:'/epidemicdataaddition',
					data:data
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
			// 清空
			const empty =()=>{
					address.provincial = "" 
					address.localdata = "" 
					address.asymptomaticdata = ""
					address.risk = ""
					isshow.value = false
			}
			const next = ()=>{
				  const loading = ElLoading.service({
						    lock: true,
						    text: 'Loading',
						    background: 'rgba(0, 0, 0, 0.7)',
						  })
						  setTimeout(() => {
						    loading.close()
						    router.push('/epidemicriskranking')
						  }, 500)
				
			}
		
			return{
				next,
				address,
				change,
				words,
				focus,
				isshow,
				ConfirmAddition,
				empty,
			
			}

		}
	}

</script>
<style type="text/css" scoped>
	.newaddress{
		width: 1685px;
	}
	.but{
		display: flex;
		justify-content: center;
	}
	.el-form {
		margin-top: 30px;
	}
	.el-button{
		background: #10aeb5;
		color: #fff;
	}
	.el-button:hover{
		background: #10aeb5;
		color: #fff;
	}

	.words{
		margin-left: 50px;
		margin-bottom: 15px;
		font-size: 15px;
		color: red;
	}
</style>