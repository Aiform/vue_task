<template>
	<div class="prepareGraphQuery">
		<el-card class="box-card boxCard">
			<div class="header">
				<el-form label-width="120px" style="display: flex;flex-wrap: wrap;">
					<el-button  @click="infordata"><el-icon style="margin-right: 5px;"><EditPen/></el-icon>
						添加本地人员信息
					</el-button>
					<el-form-item label="姓名:">
						<el-input placeholder="请输入你的姓名" v-model.trim="presen.keyword"/>
					</el-form-item>
					<el-form-item label="性别:">
						<el-input placeholder="请输入你的性别"/>
					</el-form-item>

					<el-form-item label="身份证号码:">
						<el-input placeholder="请输入你的身份证号码"/>
					</el-form-item>
					<div class="but" style="margin-left: 80px;">
						<el-button  @click="formemptying">清空</el-button>
						<el-button  @click="search">查询</el-button>
						<el-button  v-if="isshow" @click="escsearch">结束查询</el-button>
					</div>
				</el-form>
			</div>
			<el-alert title="由于数据较少现在只开放对姓名进行查询" type="info" show-icon/>
			<el-divider />
			<div class="forms-label-hidden-accessible" id="printContainer">
				<el-table :data="filterTableData" style="width: 100%">
					<el-table-column fixed label="姓名" prop="name" width="80" />
					<el-table-column  label="性别" prop="sex" width="80" />
					<el-table-column  label="年龄" prop="age" width="80" />
					<el-table-column  label="民族" prop="race" width="100" />
					<el-table-column  label="身份证号码" prop="idnumber" width="200"  />
					<el-table-column  label="联系方式" prop="contact" width="150" />
					<el-table-column  label="家庭地址" prop="address" width="400" />
					<el-table-column  label="工作" 		prop="work" width="100" />
					<el-table-column  label="核酸检测报告" prop="report" width="150"  />
					<el-table-column  label="近14天是否外出" prop="sally" width="150" />
					<el-table-column  label="是否感冒、发烧" prop="cold" width="150" />
					<el-table-column  label="体温" prop="temperature" width="80" />

					<el-table-column fixed="right" label="操作" width="200">
						<template #default="scope">
							<el-button   circle @click="preview(scope.$index, scope.row)"><el-icon><View /></el-icon></el-button>

							<el-button circle @click="handleEdit(scope.$index, scope.row)"
							><el-icon><EditPen /></el-icon></el-button
							>
							<el-button  type="danger"  circle @click="handleDelete(scope.$index, scope.row)"><el-icon><DeleteFilled /></el-icon></el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
				small
				background
				layout="prev, pager, next"
				:total="total"
				:page-size="page_size"  
				:current-page.sync="num"
				@current-change="getTableData"
				class="mt-4"
				/>
			</div>
			<el-dialog v-model="dialogVisible"  id="printContainer" :show-close="false"  v-for="(form,index) in tabledata" :key="form.id">
				 <template #header="{ close, titleId, titleClass }">
				      <div class="My_header">
				        	<h4>本地人员个人信息表</h4>
				      </div>
    			</template>
					<el-form label-width="120px">
					<el-form-item label="姓名:" >
						<el-input v-model="form.name"  />
					</el-form-item>
					<el-form-item label="姓别:" >
						<el-input v-model="form.sex"  />
					</el-form-item>
					<el-form-item label="年龄:" >
						<el-input v-model="form.age"  />
					</el-form-item>
					<el-form-item label="民族:" >
						<el-input v-model="form.race"  />
					</el-form-item>
					<el-form-item label="身份证号码:" >
						<el-input v-model="form.idnumber"  />
					</el-form-item>
					<el-form-item label="联系方式:" >
						<el-input v-model="form.contact"  />
					</el-form-item>
					<el-form-item label="家庭地址:" >
						<el-input v-model="form.address"  />
					</el-form-item>
					<el-form-item label="工作:" >
						<el-input v-model="form.work"  />
					</el-form-item>
					<el-form-item label="核酸检测报告:" >
						<el-input v-model="form.report"  />
					</el-form-item>
					<el-form-item label="近14天是否外出:" >
						<el-input v-model="form.sally"  />
					</el-form-item>
					<el-form-item label="是否感冒、发烧:" >
						<el-input v-model="form.cold"  />
					</el-form-item>
					<el-form-item label="体温:" >
						<el-input v-model="form.temperature"  />
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button   v-print="printContainer">打印本表</el-button>
						<el-button v-if="determineShow" @click="determine">保存修改</el-button>
						<el-button   @click="dialogVisible = false">退出</el-button>
					</span>
				</template>
	
	</el-dialog>
		</el-card>
	</div>
</template>
<script>
	import {reactive,computed,onMounted,ref,inject} from 'vue'
	import {useStore} from 'vuex'
	import {useRouter} from 'vue-router';
	import {ElMessage,ElMessageBox,ElLoading } from 'element-plus'
	import { Delete, Download, Plus, ZoomIn,Check ,Edit} from '@element-plus/icons-vue'
	import axios from '../../axios/instance.js'
	import qs from 'qs'
	export default{
		name:"Native",
		setup(){
			const num = ref('1')
			const page_size = ref(10) 
			const total = ref(1000)
			const dialogVisible = ref(false)
			const isshow = ref(false)
			const determineShow = ref(false)
			const tabledata = ref([])
			const myFn = inject("reload");
			const store = useStore()
			const router = useRouter()
			const filterTableData = ref([])
			const presen = reactive({
				keyword:"",
			})  
			onMounted(()=>{
					getTableData()
			})
			const getTableData = (num)=>{
				axios.post('/pading',qs.stringify({num:num})).then((result)=>{
					filterTableData.value = result.data.data

				})
			
			}
			// 搜索功能
			const search = ()=>{
				if(presen.keyword == ''){
					 ElMessage.error('搜索内容不可以为空')
				}else{
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
				setTimeout(() => {
					loading.close()
					axios.post('/pading',qs.stringify({num:num,keyword:presen.keyword})).then((result)=>{
						if(result.data.status == 0){
							filterTableData.value = result.data.data
						}

					})
					isshow.value = true
				}, 500)	
			}
				
			}
			const escsearch = ()=>{
				getTableData()
				isshow.value = false
				formemptying()
			}
			const formemptying = ()=>{
				presen.keyword = ''
			}
			// 预览功能
			const preview = (index,row)=>{
				axios.post('/modify',qs.stringify({id:row.id})).then((result)=>{
					tabledata.value = result.data.data
				})
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
				setTimeout(() => {
					loading.close()
					dialogVisible.value = true
				}, 500)	
				
			}
			// 修改功能
			const handleEdit = (index, row) => {
				axios.post('/modify',qs.stringify({id:row.id})).then((result)=>{
					tabledata.value = result.data.data
				})
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
				setTimeout(() => {
					loading.close()
					dialogVisible.value = true
					determineShow.value = true
				}, 500)	
			}
			const idnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
			const temperature = /^[1-9][0-9]{0,3}$|^[1-9][0-9]{0,3}[\.][0-9]$/
			const age = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/
			const word = /^[\u4e00-\u9fa5]+$/
			const textempty = /\S/
			const determine = ()=>{
				tabledata.value.map((value)=>{
					if(!textempty.test(value.name,value.race,value.address,value.work)){
							ElMessage.error('不能为空')
						}else if(!idnumber.test(value.idnumber)){
							ElMessage.error('身份证号码格式有误')
						}else if(!contact.test(value.contact)){
							ElMessage.error('手机号码格式有误')
						}else if(!age.test(value.age)){
							ElMessage.error('年龄有误')
						}else if(!word.test(value.sally,value.cold,value.report,value.sex)){
							ElMessage.error('填写有误')
						}else if(!temperature.test(value.temperature)){
							ElMessage.error('温度填写有误')
						}else{
							updatemodify(value)
						}
				})
			}
			const updatemodify = (value)=>{
					  const data = qs.stringify({
							id:value.id,
							name:value.name,
							sex:value.sex,
							age:value.age,
							race:value.race,
							idnumber:value.idnumber,
							contact:value.contact,
							address:value.address,
							work:value.work,
							report:value.report,
							sally:value.sally,
							cold:value.cold,
							temperature:value.temperature
						})
						axios({
							method:'post',
							url:'/updatemodify',
							data:data
						}).then((result)=>{
							if(result.data.status == 0){
								ElMessage({
									type: 'success',
									message: '修改成功',
								})
								myFn()
							}
						})

			}
			// 删除功能
			const handleDelete = (index,row) => {
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
					axios.post('/deleteinfor',qs.stringify({id:row.id}))
					myFn()
				})
				.catch(() => {
					ElMessage({
						type: 'info',
						message: '已取消删除',
					})
				})
			}
			const infordata = ()=>{
				router.push('/localinfordata')
			}
			return{
				presen,
				page_size,
				total,
				search,
				num,
				getTableData,
				filterTableData,
				handleDelete,
				handleEdit,
				formemptying,
				infordata,
				escsearch,
				isshow,
				preview,
				dialogVisible,
				tabledata,
				determineShow,
				determine
			}
		}
	}
</script>
<style type="text/css" scoped>
	.prepareGraphQuery{
		width: 1675px;
	}
	.header{
		width:1688px;
		height:auto;
		margin: 20px;
	}
	.el-pagination{
		margin-top: 15px;
		margin-right: 50px;
		display: flex;
		justify-content: flex-end;
	}
	.header .el-button{
		background: #10aeb5;
		color: #fff;
	}
	.dialog-footer .el-button{
		background: #10aeb5;
		color: #fff;
	}
	.My_header{
		margin: -20px;
		width:960px;
		height: 50px;
		background: #10aeb5;
	}
	.My_header h4{
		text-align: center;
		color: #fff;
		line-height: 46px;
		font-size: 20px;
		letter-spacing: 5px;
	}
</style>