<template>
	<div class="Protective_personnel">
		<el-card class="box-card">
			<div class="newlyAdded">
				<el-form style="display: flex; flex-wrap: wrap;">
					<el-form-item label="姓名:">
						<el-input placeholder="请输入姓名" v-model.trim="keyword"/>
					</el-form-item>
					<div class="but">
						<el-button @click="fromemity">清空</el-button>
						<el-button  @click="search">查询</el-button>
						<el-button  v-if="endqueryIsshow" @click="endquery">结束查询</el-button>
					</div>
				</el-form>
				<el-button  @click="newdata"><el-icon style="margin-right: 5px;"><EditPen/></el-icon>新增防护人员信息</el-button>
			</div>
			<el-alert title="由于数据较少暂时只支持姓名查询" type="info" show-icon />
			<el-divider />
			<el-table style="width: 100%" :data="tabledata">
				<el-table-column fixed prop="name" label="姓名" width="80" />
				<el-table-column prop="sex" label="性别" width="80" />
				<el-table-column prop="age" label="年龄" width="80" />
				<el-table-column prop="contact" label="联系方式" width="150" />
				<el-table-column prop="schoolname" label="毕业学校" width="200" />
				<el-table-column prop="hospitalname" label="所在医院名称" width="250" />
				<el-table-column prop="hospitaldepartment" label="所在医院部门" width="200"/>
				<el-table-column prop="localaddress" label="本地目的地" width="400"/>
				<el-table-column prop="healthcode" label="健康码" width="80"/>
				<el-table-column label="健康码证明" width="150">
					<template v-slot:default="scope">
						<el-image  :src="scope.row.qrcode" slot="reference" style="width: 100px;height: 100px; cursor:pointer" />
					</template>
				</el-table-column>
				<el-table-column prop="temperature" label="体温" width="80" />
				<el-table-column prop="support" label="是否为支援" width="100" />
				<el-table-column fixed="right" label="操作" width="200">
					<template #default="scope">
						<el-button link type="primary" size="small"
						@click="preview(scope.$index, scope.row)"
						>预览</el-button
						>
						<el-button link type="primary" size="small" @click="medicalstaffmodificationfunction(scope.$index, scope.row)">修改</el-button>
						<el-button link type="primary" size="small" @click="deleteinfor(scope.$index,scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog v-model="dialogTableVisible" id="printContainer" :show-close="false" v-for="(item,index) in previewdata" :key="item.id">
				<template #header="{ close, titleId, titleClass }">
					<div class="My_header">
						<h4>外地人员个人信息表</h4>
					</div>
				</template>
				<el-form  label-width="120px">
					<el-form-item label="姓名:">
						<el-input  v-model="item.name" />
					</el-form-item>
					<el-form-item label="性别:">
						<el-input  v-model="item.sex" />
					</el-form-item>
					<el-form-item label="年龄:">
						<el-input  v-model="item.age"  />
					</el-form-item>
					<el-form-item label="联系方式:">
						<el-input  v-model="item.contact" />
					</el-form-item>
					<el-form-item label="毕业学校:">
						<el-input  v-model="item.schoolname" />
					</el-form-item>
					<el-form-item label="所在医院名称:">
						<el-input  v-model="item.hospitalname"/>
					</el-form-item>
					<el-form-item label="所在医院部门:">
						<el-input  v-model="item.hospitaldepartment" />
					</el-form-item>
					<el-form-item label="本地目的地:">
						<el-input  v-model="item.localaddress"/>
					</el-form-item>
					<el-form-item label="健康码:">
						<el-input  v-model="item.healthcode"/>
					</el-form-item>
					<el-form-item label="健康码证明:">
						<el-image
							style="width: 80px; height: 80px;margin: 5px;"
							:src="item.qrcode"
							:initial-index="4"
							fit="cover"
						/>
						<el-upload
								v-model="file"
								v-if="isshowfile"
							    class="upload-demo"
							    action="http://localhost:3008/uploads/"
							    :limit="1"
							    @change="getFile($event)"
							  >
							    <template #trigger>
							      <el-button type="primary">选择文件</el-button>
							    </template>
							      <el-button type="primary" @click="ConfirmModification">确认修改</el-button>
							  </el-upload>
					</el-form-item>
				
					<el-form-item label="体温:">
						<el-input  v-model="item.temperature"/>
					</el-form-item>
					<el-form-item label="是否为支援:">
						<el-input  v-model="item.support"/>
					</el-form-item>
				</el-form>  
				<div class="button">
					<el-button  v-print="printContainer">打印本表</el-button>
					<el-button  v-if="isshow" @click="inset">保存修改</el-button>
					<el-button @click="dialogTableVisible = false">退出</el-button>
				</div>
			</el-dialog>
			<el-pagination
				:page-size="page_size"
				layout="total, prev, pager, next"
				:total="total"
				:current-page.sync="num"
				@current-change="handleCurrentChange"
			/>
		</el-card>
	</div>
</template>
<script>
	import {onMounted,ref,computed,inject} from 'vue'
	import {useStore} from 'vuex'
	import {useRouter} from 'vue-router'
	import axios from '../../axios/instance.js'
	import qs from 'qs'
	import {ElMessage,ElMessageBox,ElLoading} from 'element-plus'
	export default{
		name:"protect",
		setup(){
			const num = ref('1')
			const page_size = ref(10) 
			const total = ref(1000)
			const keyword = ref('')
			const dialogTableVisible = ref(false)
			const isshow = ref(false)
			const endqueryIsshow = ref(false)
			const previewdata = ref([])
			const myFn = inject("reload");
			const file = ref('')
			const id = ref()
			const store = useStore()
			const router = useRouter()
			const isshowfile = ref(false)
			const tabledata = ref([])
			onMounted(()=>{
				handleCurrentChange()
			})
			
		// 分页功能
		const handleCurrentChange = (num)=>{
			axios.post('/protectivepersonnel',qs.stringify({num:num})).then((result)=>{
				if(result.data.status == 0){
					tabledata.value = result.data.data
				}
			})
		}
		// 添加功能
		const newdata = ()=>{
			router.push('/newprotectivepersonnel')
		}
		// 搜索功能
		const search = ()=>{
			if(keyword.value  == ''){
				ElMessage.error('搜索内容不可以为空')
			}else{
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
				setTimeout(() => {
					loading.close()
					axios.post('/protectivepersonnel',qs.stringify({num:num,keyword:keyword.value})).then((result)=>{
						if(result.data.status == 0){
							tabledata.value = result.data.data
						}
					})
					endqueryIsshow.value = true
				}, 500)	
			}
			
		}
		// 结束搜索
		const endquery = ()=>{
			myFn()
			keyword.value = ''
			endqueryIsshow.value = false
		}
		// 预览功能
		const preview = (index,row)=>{
			axios.post("/previewfunctionofmedicalstaff",qs.stringify({id:row.id})).then((result)=>{
				previewdata.value = result.data.data
			})
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			setTimeout(() => {
				loading.close()
				dialogTableVisible.value = true
				isshowfile.value = false
			}, 600)
		}
		// 修改功能
		const medicalstaffmodificationfunction = (index,row)=>{
			id.value = row.id
			axios.post("/previewfunctionofmedicalstaff",qs.stringify({id:id.value})).then((result)=>{
				previewdata.value = result.data.data
			})
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			setTimeout(() => {
				loading.close()
				isshow.value = true
				dialogTableVisible.value = true
				isshowfile.value = true

			}, 600)

		}
		//  保存修改
		const textempty = /\S/
		const age = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/
		const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
		const temperature = /^[1-9][0-9]{0,3}$|^[1-9][0-9]{0,3}[\.][0-9]$/
		const word = /^[\u4e00-\u9fa5]+$/
		const inset = ()=>{
			previewdata.value.map((value,index,array)=>{
				if(!textempty.test(value.name,value.sex,file.value,value.schoolname,value.hospitalname,value.hospitaldepartment,value.localaddress,value.healthcode)){
					ElMessage.error('不能为空')
				}else if(!age.test(value.age)){
					ElMessage.error('年龄填写有误')
				}else if(!contact.test(value.contact)){
					ElMessage.error('手机号码格式有误')
				}else if(!temperature.test(value.temperature)){
					ElMessage.error('体温填写有误')
				}else if(!word.test(value.support)){
					ElMessage.error('输入有误')
				}else{
					ModifyNuser(value)
				}
					
			})
		}
		const ModifyNuser = (value)=>{
			const data = qs.stringify({
						id:value.id,
						name:value.name,
						sex:value.sex,
						age:value.age,
						contact:value.contact,
						schoolname:value.schoolname,
						hospitalname:value.hospitalname,
						hospitaldepartment:value.hospitaldepartment,
						localaddress:value.localaddress,
						temperature:value.temperature,
						support:value.support
					})
					axios({
						method:"post",
						url:'/medicalstaffmodificationfunction',
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
		// 修改文件
		const getFile =(event)=>{
			file.value = event.raw
		}
		const ConfirmModification = ()=>{
				const formData = new FormData();
				formData.append('id',id.value)
				formData.append('filename',file.value)
				axios({
					method:'post',
					url:'/medicaldocuments',
					data:formData,
					headers:{
							"Content-Type": "multipart/form-data"
						}
				}).then((result)=>{
					if(result.data.status == 0){
						previewdata.value = result.data.data
						ElMessage({
								message: '修改成功',
								type: 'success',
						})
					}

				})
		}
		// 删除 功能
		const deleteinfor =(index,row)=>{
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
				axios.post('/deletepersonalinformation',qs.stringify({id:row.id}))
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
			num,
			page_size,
			tabledata,
			total,
			newdata,
			keyword,
			handleCurrentChange,
			search,
			preview,
			dialogTableVisible,
			previewdata,
			isshow,
			medicalstaffmodificationfunction,
			inset,
			deleteinfor,
			endqueryIsshow,
			endquery,
			getFile,
			file,
			ConfirmModification,
			isshowfile
		}
	}
}
</script>
<style type="text/css" scoped>
	.Protective_personnel{
		width: 1675px;
	}
	.newlyAdded{
		display: flex;
		justify-content: space-between;
	}
	.but{
		margin-left: 30px;
	}
	.el-pagination{
		display: flex;
		justify-content: flex-end;
	}
	.button{
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
	.upload-demo{
		display: flex;
	}
	.upload-demo .el-button{
		background: #10aeb5;
		color: #fff;
		margin-left: 30px;
	}
	.My_header{
		margin: -20px;
		width:951px;
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