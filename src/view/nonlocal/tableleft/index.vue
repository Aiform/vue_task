<template>
	<el-table  style="width:100%" :data="tableData">
		<el-table-column fixed prop="name" label="姓名" width="80" /> 
		<el-table-column  prop="sex" label="性别" width="80" />
		<el-table-column prop="age" label="年龄" width="80" />
		<el-table-column prop="race" label="民族" width="120" />
		<el-table-column prop="contact" label="联系方式" width="120" />
		<el-table-column prop="idnumber" label="身份证号码" width="200" />
		<el-table-column prop="address" label="家庭地址" width="450" />
		<el-table-column prop="work" label="职业" width="180" />
		<el-table-column prop="bourn" label="本地目的的" width="450" />
		<el-table-column prop="nucleic" label="是否核酸" width="60" />
		<el-table-column prop="vaccinate" label="是否接种" width="60" />
		<el-table-column prop="temperature" label="体温" width="60" />
		<el-table-column prop="addressdetaics" label="本地详细地址" width="450" />
		<el-table-column fixed="right" label="操作" width="200">
			<template #default="scope">
				<el-button link type="primary" size="small"
				v-loading.fullscreen.lock="fullscreenLoading"
				@click="preview(scope.$index, scope.row)"
				>预览</el-button
				>
				<el-button link type="primary" size="small"
				@click="modifyfieldpersonnel(scope.$index, scope.row)"
				>修改</el-button
				>
				<el-button link  type="primary" size="small"
				@click="deletefieldpersonnel(scope.$index, scope.row)"
				>删除</el-button>
			</template>
		</el-table-column>
	</el-table> 
	<el-dialog v-model="dialogVisible" width="49%" :show-close="false" id="printContainer" custom-class="my-info-dialog" v-for="(p,index) in previewData" :key="p.id">
		<template  #header="{ close, titleId, titleClass }">
			<div class="My_infot_header">
				<h4>外地人员个人信息表</h4>
			</div>
		</template>
		<el-form  >
			<el-form-item label="姓名:">
				<el-input v-model.trim="p.name"/>
			</el-form-item>
			<el-form-item label="性别:">
				<el-input v-model.trim="p.sex"/>
			</el-form-item>
			<el-form-item label="年龄:">
				<el-input  v-model.trim="p.age"/>
			</el-form-item>
			<el-form-item label="民族:">
				<el-input v-model.trim="p.race"/>
			</el-form-item>
			<el-form-item label="联系方式:">
				<el-input v-model.trim="p.contact"/>
			</el-form-item>
			<el-form-item label="身份证号码:">
				<el-input v-model.trim="p.idnumber"/>
			</el-form-item>
			<el-form-item label="家庭住址:">
				<el-input v-model.trim="p.address"/>
			</el-form-item>
			<el-form-item label="职业:">
				<el-input v-model.trim="p.work"/>
			</el-form-item>
			<el-form-item label="本地目的地:">
				<el-input v-model.trim="p.bourn"/>
			</el-form-item>	
			<el-form-item label="本地详细地址:">
				<el-input v-model.trim="p.nucleic"/>
			</el-form-item>	
			<el-form-item label="是否接种:">
				<el-input v-model.trim="p.vaccinate"/>
			</el-form-item>	
			<el-form-item label="是否发热、感冒:">
				<el-input v-model.trim="p.cold"/>
			</el-form-item>	
			<el-form-item label="体温:">
				<el-input v-model.trim="p.temperature"/>
			</el-form-item>
			<el-form-item label="本地详细地址:">
				<el-input v-model.trim="p.addressdetaics"/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button  v-print="print">打印本表</el-button>
				<el-button  v-if="amend" @click="SaveChanges">保存修改</el-button>
				<el-button  @click="dialogVisible = false">退出</el-button>
			</span>
		</template>
	</el-dialog>
	<el-pagination layout="prev, pager, next" 
	:total="total" 
	:page-size="page_size"  
	:current-page.sync="num"
	@current-change="padingdevicedata"
	/>

</template>
<script type="text/javascript">
	import {reactive,computed,onMounted,ref,inject} from 'vue'
	import {useRouter} from 'vue-router';
	import {useStore} from 'vuex'
	import {ElMessage,ElMessageBox,ElLoading} from 'element-plus'
	import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
	import axios from '../../../axios/instance.js'
	import qs from 'qs'
	export default{
		name:'tableleft',
		setup(){
			const num = ref('')
			const page_size = ref(10) 
			const total = ref(1000)
			const amend = ref(false)
			const dialogVisible = ref(false)
			const fullscreenLoading = ref(false)
			const myFn = inject("reload");
			const router = useRouter()
			
			const previewData = ref([])
			const store = useStore()
			onMounted(()=>{
				padingdevicedata()
			})
			// 分页功能
			const padingdevicedata = (num)=>{
				store.dispatch('Padingdevice',{num:num})
			}
			const tableData = computed(()=>{
					return store.state.nonlocal.Padingdevice
			})
			// 预览功能
			const viewData = (row)=>{
				axios.post('/preview',qs.stringify({id:row})).then((result)=>{
					if(result.data.status == 0){
						previewData.value = result.data.data
					}
				})
			}
			const preview = (index,row)=>{
				viewData(row.id)
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
				setTimeout(() => {
					loading.close()
					amend.value = false
					dialogVisible.value =  true
				}, 500)
				
			}
			// 修改功能
			const textempty = /\S/
			const idnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
			const temperature = /^[1-9][0-9]{0,3}$|^[1-9][0-9]{0,3}[\.][0-9]$/
			const age = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/
			const word = /^[\u4e00-\u9fa5]+$/
			const SaveChanges = ()=>{
				previewData.value.map((value,index,array)=>{
					if(!textempty.test(value.name,value.race,value.work,value.address,value.bourn,value.addressdetaics)){
						ElMessage.error('不能为空')
					}else if(!contact.test(value.contact)){
						ElMessage.error('手机号码格式有误')
					}else if(!idnumber.test(value.idnumber)){
						ElMessage.error('身份证号码格式有误')
					}else if(!temperature.test(value.temperature)){
						ElMessage.error('温度填写有误')
					}else if(!word.test(value.sex,value.nucleic,value.vaccinate,value.cold)){
						ElMessage.error('填写有误')
					}else if(!age.test(value.age)){
						ElMessage.error('年龄有误')
					}else{
						modifyfield(value)
					}
				})
			}
			const modifyfield = (value)=>{
				const data = qs.stringify({
					id:value.id,
					name:value.name,
					sex:value.sex,
					age:value.age,
					race:value.race,
					contact:value.contact,
					idnumber:value.idnumber,
					address:value.address,
					work:value.work,
					addressdetaics:value.addressdetaics,
					nucleic:value.nucleic,
					vaccinate:value.vaccinate,
					cold:value.cold,
					bourn:value.bourn,
					temperature:value.temperature
				})
				axios({
					method:'post',
					url:'/modifyfieldpersonnel',
					data:data
				}).then((result)=>{
					if(result.data.status == 0){
						ElMessage({
							type: 'success',
							message: '修改成功',
						})
						myFn()
					}else{
						ElMessage.error('修改失败')
					}
				}).catch((err)=>{console.log(err)})
			}
			const modifyfieldpersonnel = (index,row)=>{
				viewData(row.id)
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
				setTimeout(() => {
					loading.close()
					amend.value = true
					dialogVisible.value =  true
				}, 500)
			}
			const deletefieldpersonnel = (index,row)=>{
				ElMessageBox.confirm(
					'此操作将永久删除',
					'警告',
					{
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
					}

					)
				.then(() => {
					ElMessage({
						type: 'success',
						message: '删除成功',
					})
					axios.post('/deletefieldpersonnel',qs.stringify({id:row.id}))
					myFn()
				})
				.catch(() => {
					ElMessage({
						type: 'info',
						message: '已取消删除',
					})
				})
			}
			return{
				computed,
				num,
				page_size,
				total,
				dialogVisible,
				tableData,
				previewData,
				preview,
				SaveChanges,
				amend,
				modifyfieldpersonnel,
				padingdevicedata,
				deletefieldpersonnel,
				fullscreenLoading,
			}


		}


	}

</script>

<style type="text/css">
	.nonlocalAddress{
		width: 1675px;
	}
	.el-select{
		width:200px ;
		margin-left: 50px;
	}
	.el-upload--picture-card{
		width:80px !important;
		height:80px !important;
		margin-left: 20px;
	}
	.el-pagination{
		margin:10px;
		margin-left: auto;
		display: flex;
		justify-content: flex-end;
	}
	.dialog-footer .el-button{
		background: #10aeb5;
		color: #fff;
	}

	.my-info-dialog{
	    position: fixed ;
		top:-100px ;
		right: 0 ;
		bottom: 0  ;
		left: 0 ;
		overflow: auto ;
	}
	.My_infot_header{
		margin: -20px;
		width: 933px;
		height: 50px;
		background: #10aeb5;
	}
	.My_infot_header h4{
		text-align: center;
		color: #fff;
		line-height: 46px;
		font-size: 20px;
		letter-spacing: 5px;
	}


</style>