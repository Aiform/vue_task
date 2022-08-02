<template>
	<div class="epidemicriskranking">
		<el-card>
			<div class="header">
				<div class="Promotion">
					<h4><el-icon style="color: #10aeb5;font-size: 20px"><Promotion /></el-icon>疫情速报</h4>
					<div style="display: flex;">
					<el-form-item  label-width="120px" style="margin-right: 10px;">
						<el-input  v-model.trim="keyword" @change="serch" placeholder="请输入你要搜索的地区"/>
					</el-form-item>
					<el-button style="background: #10aeb5;color: #fff;" @click="newaddress"><el-icon style="margin-right: 5px;"><EditPen /></el-icon>新增地区数据</el-button>
					</div>
				</div>
				<el-divider />
				<el-alert show-icon  title="该数据为31省（自治区、直辖市）本土新增，及港澳台新增确诊数据。每天上午7：00-10：00更新数据" type="warning" />
			</div>
			<div class="tableData">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column  prop="address" label="地区"  />
					<el-table-column prop="newlocal" sortable label="新增本土" />
					<el-table-column  prop="newasymptomatic" sortable label="新增无症状" />
					<el-table-column prop="riskarea"  sortable label="风险区域"  />
					<el-table-column label="操作数据" align="right" >
						<template #default="scope">
							<el-button size="small" id="butOne" @click="handleEdit(scope.$index, scope.row)"
							>更新</el-button
							>
							<el-button
							size="small"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)"
							>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
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
			<el-alert show-icon  title="数据分析统计图，以下数据会根据上面修改的数据，自动更新" type="warning" class="warning" />
			<div class="ExistingDiagnosis"  :key="once">
				<el-tabs
				v-model="activeName"
				type="card"
				class="demo-tabs"
				>
				<el-tab-pane label="新增本土" name="first">
					<existingdiagnosis  />
				</el-tab-pane>
				<el-tab-pane label="新增无症状" name="second">
					<newdiagnosis />
				</el-tab-pane> 
			</el-tabs>
		</div>

		<el-dialog v-model="visible" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<div class="my-header">
					<h3>疫情地区数据更新</h3>
				</div>
			</template>
			<el-form  label-width="120px" v-for="(item,index) in handleEditArray" :key="item.id">
				<el-form-item label="地区名称:">
					<el-input v-model="item.address" disabled />
				</el-form-item>
				<el-form-item label="新增本土:" placeholder="请输入">
					<el-input v-model="item.newlocal"/>
				</el-form-item>
				<el-form-item label="新增无症状:" placeholder="请输入">
					<el-input v-model="item.newasymptomatic"/>
				</el-form-item>
				<el-form-item label="风险区域:" placeholder="请输入">
					<el-input v-model="item.riskarea" />
				</el-form-item>
			</el-form>
			<div class="but">
				<el-button style="background: #10aeb5;color: #fff;" @click="ConfirmUpdate">确定更新</el-button>
				<el-button style="background: #10aeb5;color: #fff;"  @click="esc">退出更新</el-button>
			</div>
		</el-dialog>
	</el-card>
</div>
</template>
<script type="text/javascript">
	import {onMounted,ref ,onUnmounted,inject,computed} from 'vue'
	import axios from '../../axios/instance.js'
	import existingdiagnosis from './existingdiagnosis'
	import newdiagnosis from './newdiagnosis'
	import {useStore} from 'vuex'
	import { ElNotification ,ElDialog ,ElLoading,ElMessage,ElMessageBox} from 'element-plus'
	
	import {useRouter,useRoute} from 'vue-router'
	import qs from 'qs'
	export default{
		name:"epidemicriskranking",
		components:{
			existingdiagnosis,
			newdiagnosis
		},
		setup(){
			const activeName = ref('first')
			const once = ref(0)
			const total = ref(1000)
			const visible = ref(false)
			const page_size = ref(10)
			const keyword = ref('')
			const num = ref()
			const router = useRouter()
			const route = useRoute()
			const myFn = inject("reload");
			const handleEditArray = ref([])
			const store = useStore()
			onMounted(()=>{
				getTableData()
			})
		// 数据分页
		const getTableData = (num)=>{
			store.dispatch('Gettable',{num:num})
		}
		const tableData =  computed(()=>{
			return store.state.epidemicriskranking.Gettable
		})
		// 查询数据
		const serch = ()=>{
		
				store.dispatch('Gettable',{num:num,keyword:keyword.value})
			
		}
		// 更新数据
		const sum = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/
		const ModifHaleEdit = (row)=>{
			axios.post('/updateofepidemicareadataprev',qs.stringify({id:row})).then((result)=>{
				if(result.data.status == 0){
					handleEditArray.value = result.data.data
				}
			})
		}
		const handleEdit =(index,row)=>{
			ModifHaleEdit(row.id)
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			setTimeout(() => {
				loading.close()
				visible.value = true
			}, 500)
			
		}
		const ConfirmUpdate = ()=>{
			handleEditArray.value.map((value)=>{
				if(!sum.test(value.newlocal,value.newasymptomatic,value.riskarea)){
					ElMessage.error('数据格式不对')
				}else{
					updateModify(value)
				}
			})	

		}
		const updateModify = (value)=>{
			const data = qs.stringify({
				id:value.id,
				address:value.address,
				newlocal:value.newlocal,
				newasymptomatic:value.newasymptomatic,
				riskarea:value.riskarea
			})
			axios({
				method:'post',
				url:'/updateofepidemicareadata',
				data:data
			}).then((result)=>{
				if(result.data.status == 0){
					ElMessage({
						message: '修改成功',
						type: 'success',
					})
					myFn()
				}else{
					ElMessage.error('修改失败')
				}
			})
			
		}
		const esc = ()=>{
			visible.value = false
		}
		const handleDelete =(index,row)=>{
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
				axios.post('/datadeletioninepidemicareas',qs.stringify({id:row.id})).then((result)=>{
					if(result.data.status == 0){
						myFn()
					}
				})
				update()
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '已取消删除',
				})
			})
		}
		const newaddress =()=>{
			router.push('/newaddress')
		}
		const notification = setTimeout(()=>{
			ElNotification({
				title: '警告',
				message: '当前风险地区最高的是甘肃省兰州市',
				showClose: false,
				type: 'warning',
			})
		},500)
		onUnmounted(()=>{
			clearTimeout(notification)
		})
		return {
			tableData,
			activeName,
			newaddress,
			visible,
			handleEdit,
			esc,
			handleEditArray,
			ConfirmUpdate,
			handleDelete,
			once,
			getTableData,
			page_size,
			num,
			total,
			serch,
			keyword

		}
	}
}
</script>
<style type="text/css" scoped>
	.epidemicriskranking{
		width: 1685px;
	}
	.tableData{
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
	}
	.el-tab-pane{
		width: 200px;
	}
	.ExistingDiagnosis{
		margin-top: 30px;
	}
	.warning{
		margin-top: 30px;
	}
	/deep/ #tab-first {
		width: 820px;
		text-align: center;
		font-size: 16px;
		letter-spacing: 2px;
	}
	/deep/ #tab-second {
		width: 820px;
		text-align: center;
		font-size: 16px;
		letter-spacing: 2px;
	}
	.Promotion{
		display: flex;
		justify-content: space-between;
	}
	#butOne{
		background:#10aeb5;
		color: #fff;
	}
	.my-header{
		width: 960px;
		margin: -20px;
		height: 50px;
		background:#10aeb5 ;
	}
	.my-header > h3 {
		text-align: center;
		letter-spacing: 10px;
		color: #fff;
		line-height: 50px;
	}
	.but{
		display: flex;
		justify-content: center;
	}
	.el-pagination{
		margin: 20px;
		display: flex;
		justify-content: end;
	}
</style>