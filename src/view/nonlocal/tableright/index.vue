<template>
	<el-table  style="width:100%" :data="tableData">
		<el-table-column fixed prop="name" label="姓名" width="150" />
		<el-table-column prop="passport" label="证件号码" width="200" />
		<el-table-column prop="contact" label="联系方式" width="150" />
		<el-table-column prop="pore" label="入境口岸" width="150" />
		<el-table-column prop="time" label="入境时间" width="250" />
		<el-table-column prop="area" label="入境前14天是否去过其他地区或国家" width="280" />
		<el-table-column prop="fight" label="航班" width="150" />
		<el-table-column prop="city" label="入境第一城市" width="150" />
		<el-table-column prop="borune" label="本地地址" width="450" />
		<el-table-column prop="nucleics" label="核酸检测证明" width="250">
			<template v-slot:default="scope">
				<el-image  slot="reference" :src="scope.row.nucleics" style="width: 80px;height: 100px; cursor:pointer" />
			</template>
		</el-table-column>
		<el-table-column prop="serum" label="血清证明" width="250" >
			<template  v-slot:default="scope">
				<el-image  slot="reference" :src="scope.row.serum" style="width: 80px;height: 100px; cursor:pointer" />
			</template>
		</el-table-column>
		<el-table-column  prop="remove" label="解除隔离证明证明" width="250">
			<template v-slot:default="scope">
				<el-image :src="scope.row.remove" style="width: 80px;height: 100px; cursor:pointer"/>
			</template>
		</el-table-column>
		<el-table-column prop="addressdetaics" label="本地详细地址" width="450" />
		<el-table-column fixed="right" label="操作" width="200">
			<template #default="scope">
				<el-button link type="primary" size="small"
				@click="previewTatle(scope.$index, scope.row)"
				>预览</el-button
				>
				<el-button link type="primary" size="small"
				@click="outiseld(scope.$index, scope.row)"
				>修改</el-button
				>
				<el-button link type="primary" size="small"
				@click="Deletionofoverseaspersonnel(scope.$index, scope.row)"
				>删除</el-button>
			</template>
		</el-table-column>
	</el-table> 
	<el-dialog v-model="oversearData"  :show-close="false"   id="previewTatle" custom-class="my-dialog"  v-for="(item,index) in overseaspreviewdata" :key="item.id" >	
		<template #header="{ close, titleId, titleClass }">
			<div class="My_header">
				<h4>境外人员个人信息表</h4>
			</div>
		</template>
		<el-form label-width="120px" >
			<el-form-item label="姓名">
				<el-input v-model.trim="item.name"/>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model.trim="item.contact"/>
			</el-form-item>
			<el-form-item label="国内护照号码">
				<el-input v-model.trim="item.passport"/>
			</el-form-item>
			<el-form-item label="入境口岸">
				<el-input v-model.trim="item.pore"/>
			</el-form-item>
			<el-form-item label="入境时间">
				<el-input v-model.trim="item.time"/>
			</el-form-item>
			<el-form-item label="入境前14天是否去过其他国家">
				<el-input v-model.trim="item.area"/>
			</el-form-item>	
			<el-form-item label="航班">
				<el-input v-model.trim="item.fight"/>
			</el-form-item>	
			<el-form-item label="入境第一城市">
				<el-input v-model.trim="item.city"/>
			</el-form-item>	
			<el-form-item label="本地地址">
				<el-input v-model.trim="item.borune"/>
			</el-form-item>
			<el-form-item label="核酸检测证明">
				<el-image
					style="width: 80px; height: 80px;"
					:src="item.nucleics"
					:preview-src-list="srcList"
					:initial-index="4"
					fit="cover"
				/>
				<el-upload
					v-model="file"
					v-if="isshow"
				    class="upload-demo"
				    action="http://124.220.165.99:3008/uploads/"
				    :limit="1"
				    @change="getFile($event)"
				  >
				    <template #trigger>
				      <el-button>选择文件</el-button>
				    </template>
				     <el-button @click="ConfirmModificationOnce" >确认修改</el-button>
				  </el-upload>
			</el-form-item>
			<el-form-item label="血清证明">
				<el-image
						style="width: 80px; height: 80px;"
						:src="item.serum"
						:preview-src-list="srcList"
						:initial-index="4"
						fit="cover"
				/>
				<el-upload
					v-model="fileTwo"
					v-if="isshow"
				    class="upload-demo"
				    action="http://124.220.165.99:3008/uploads/"
				    :limit="1"
				    @change="getFileTwo($event)"
				  >
				    <template #trigger>
				      <el-button >选择文件</el-button>
				    </template>
				    <el-button  @click="ConfirmModificationTwo">确认修改</el-button>
				  </el-upload>
			</el-form-item>
			<el-form-item label="解除隔离证明">
				<el-image
				style="width: 80px; height: 80px;"
				:src="item.remove"
				:preview-src-list="srcList"
				:initial-index="4"
				fit="cover"
				/>
				<el-upload
					v-model="fileThree"
					v-if="isshow"
				    class="upload-demo"
				    action="http://124.220.165.99:3008/uploads/"
				    :limit="1"
				    @change="getFileThree($event)"
				  >
				    <template #trigger>
				      <el-button >选择文件</el-button>
				    </template>
				      <el-button  @click="ConfirmModificationThree">确认修改</el-button>
				  </el-upload>
			</el-form-item>
			<el-form-item label="本地详细地址">
				<el-input v-model.trim="item.addressdetaics"/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button style="background: #10aeb5;color: #fff;" v-print="previewTatle">打印本表</el-button>
				<el-button style="background: #10aeb5;color: #fff;" v-if="ctrlsShow" @click="Modification">保存修改</el-button>
				<el-button style="background: #10aeb5;color: #fff;" @click="oversearData = false" >退出</el-button>
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
<script type="text/javascript" >
	import {computed,onMounted,ref,inject} from 'vue'
	import {useStore} from 'vuex'
	import {useRouter} from 'vue-router';
	import {ElMessage,ElLoading,ElMessageBox} from 'element-plus'
	import axios from '../../../axios/instance.js'
	import qs from 'qs'
	export default{
		name:'tableright',
		setup(){
			const num = ref('')
			const file = ref('')
			const fileTwo = ref('')
			const fileThree = ref('')
			const total = ref(1000)
			const page_size = ref(10)
			const tableData = ref([])
			const overseaspreviewdata = ref([])
			const oversearData = ref(false)
			const ctrlsShow = ref(false)
			const id = ref()
			const myFn = inject('reload')
			const isshow = ref(false)
			onMounted(()=>{
					padingdevicedata()
			})
			// 分页功能
			const padingdevicedata = (num)=>{
				axios.post('/queryoverseaspersonnel',qs.stringify({num:num})).then((result)=>{
					if(result.data.status == 0){
						tableData.value = result.data.data
					}
				})
			}
			// 预览功能
			const overseaspreview = (row)=>{
				axios.post('/overseaspreview',qs.stringify({id:row})).then((result)=>{
					if(result.data.status == 0){
					  overseaspreviewdata.value = result.data.data
					}
				})
			}
			const previewTatle = (index,row)=>{
				 overseaspreview(row.id)
				 id.value = row.id
				 const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    oversearData.value = true
				    isshow.value = false
				  }, 2000)
			}
			// 修改功能
			const passport = /^([a-zA-z]|[0-9]){5,17}$/
			const contact = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
			const textempty = /\S/
			const Modification  = ()=>{
						overseaspreviewdata.value.map((value)=>{
									if(!textempty.test(value.name,value.time,value.area,value.fight,value.city,value.borune,value.addressdetaics)){
											ElMessage.error('不能为空')
										}else if(!contact.test(value.contact)){
											ElMessage.error('联系方式格式有误')
										}else if(!passport.test(value.passport)){
											ElMessage.error('护照号码格式有误')
										}else{
											ModifAxios(value)
										}

						})
			}
			const ModifAxios = (value)=>{
				const data = qs.stringify({
								id:value.id,
								name:value.name,
								passport:value.passport,
								contact:value.contact,
								pore:value.pore,
								time:value.time,
								area:value.area,
								fight:value.fight,
								city:value.city,
								borune:value.borune,
								addressdetaics:value.addressdetaics
							})
							axios({
								method:'post',
								url:'/modificationfunctionofoverseaspersonnel',
								data:data
							}).then((result)=>{
								if(result.data.status == 0){
									ElMessage({
										message: '修改成功',
										type: 'success',
									})
									padingdevicedata()
								}else{
									ElMessage.error('修改失败')
								}
								
							})
			}
			const outiseld = (index,row)=>{
				 overseaspreview(row.id)
				 id.value = row.id
				 const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    oversearData.value = true
				    isshow.value = true
				    ctrlsShow.value = true
				  }, 2000)
			}
			// 修改文件功能
			const getFile = (event)=>{
				file.value = event.raw
			}
			const getFileTwo = (event)=>{
				fileTwo.value = event.raw
			}
			const getFileThree = (event)=>{
				fileThree.value = event.raw
			}
			const ConfirmModificationOnce = ()=>{
				const formData = new FormData();
				formData.append('id',id.value)
				formData.append('filename',file.value)
				axios({
					method:'post',
					url:'/confirmModificationonce',
					data:formData,
					headers:{
							"Content-Type": "multipart/form-data"
						}
				}).then((result)=>{
						if(result.data.status == 0){
							overseaspreviewdata.value = result.data.data
						}
				})
			}
			const ConfirmModificationTwo = ()=>{
				const formData = new FormData();
				formData.append('id',id.value)
				formData.append('filename',fileTwo.value)
				axios({
					method:'post',
					url:'/confirmmodificationtwo',
					data:formData,
					headers:{
							"Content-Type": "multipart/form-data"
						}
				}).then((result)=>{
						if(result.data.status == 0){
							overseaspreviewdata.value = result.data.data
						}
				})

			}
			const ConfirmModificationThree = ()=>{
				const formData = new FormData();
				formData.append('id',id.value)
				formData.append('filename',fileThree.value)
				axios({
					method:'post',
					url:'/confirmmodificationthree',
					data:formData,
					headers:{
							"Content-Type": "multipart/form-data"
						}
				}).then((result)=>{
						if(result.data.status == 0){
							overseaspreviewdata.value = result.data.data
						}
				})
			}
			const Deletionofoverseaspersonnel = (index,row)=>{
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
					axios.post('/Deletionofoverseaspersonnel',qs.stringify({id:row.id}))
					padingdevicedata()
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
				padingdevicedata,
				total,
				total,
				tableData,
				previewTatle,
				oversearData,
				overseaspreviewdata,
				outiseld,
				ctrlsShow,
				Modification,
				page_size,
				getFile,
				getFileTwo,
				getFileThree,
				Modification,
				file,
				fileTwo,
				fileThree,
				ConfirmModificationOnce,
				ConfirmModificationTwo,
				ConfirmModificationThree,
				isshow,
				Deletionofoverseaspersonnel
			}	
		}
	}

</script>
<style type="text/css" >
	.nonlocalAddress{
		width: 1675px;
	}
	.el-select{
		width:200px ;
		margin-left: 50px;
	}

	.el-dialog--center {
		text-align: center;
		position: absolute;
		top: 35%;
		left: 25%;
		transform: translate(-50%, -50%);
	}
	.el-upload--picture-card{
		width:80px !important;
		height:80px !!important;
		margin-left: 20px;
	}
	.el-pagination{
		margin:10px;
		margin-left: auto;
		display: flex;
		justify-content: flex-end;
	}
	.upload-demo{
		display: flex;
	}
	.upload-demo .el-button{
		margin-left: 30px;
		background: #10aeb5;
		color: #fff;

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
	.my-dialog{
		position: fixed;
		top:-130px;
		right: 0;
		bottom: 0 ;
		left: 0 ;
		overflow: auto;
	}
	

</style>