<template>
		 <el-table style="width: 100%" :data="tabledata">
		    <el-table-column fixed prop="name" label="姓名" width="80" />
		    <el-table-column prop="sex" label="性别" width="80" />
		    <el-table-column prop="age" label="年龄" width="80" />
		    <el-table-column prop="contact" label="联系方式" width="200" />
		    <el-table-column prop="idnumber" label="身份证号码" width="200" />
		    <el-table-column prop="address" label="家庭地址" width="300" />
		    <el-table-column prop="Isolationaddress" label="隔离地点" width="300" />
		    <el-table-column prop="isolationtime" label="隔离时间是否满14天" width="120" />
		    <el-table-column prop="temperature" label="体温" width="80" />
		    <el-table-column fixed="right" label="操作" width="200">
		      <template #default="scope">
		        <el-button link type="primary" size="small" @click="deleteinfor(scope.$index,scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  	<el-pagination
				small
				background
				:page-size="page_size"
				layout="prev, pager, next"
				:total="total"
				@current-change="handleCurrentChange"
				class="mt-4"
		/>

</template>
<script type="text/javascript" scoped>
	import {onMounted,ref,reactive,computed,inject} from 'vue'
	import {ElMessage,ElMessageBox,ElLoading} from 'element-plus'
	import {useStore} from 'vuex'
	import axios from '../../../axios/instance.js'
	import qs  from 'qs'
	export default{
		name:"relieve",
		setup(){
				const total = ref(1000)
				const page_size = ref(10)
				const num = ref('1')
				const store = useStore()
				const myFn = inject("reload");
				onMounted(()=>{
					store.dispatch('Reactive',{num:num.value})
				})
				const tabledata = computed(()=>{
					return store.state.relieve.Reactive
				})
				const handleCurrentChange = (num)=>{
					store.dispatch('Reactive',{num:num})
				}
				const deleteinfor = (index,row)=>{
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
					axios.post('/personneldeletionfunctionhasbeencancelled',qs.stringify({id:row.id}))
				handleCurrentChange()
				})
				.catch(() => {
					ElMessage({
						type: 'info',
						message: '已取消删除',
					})
				})
				}
			return{
				tabledata,
				handleCurrentChange,
				page_size,
				total,
				deleteinfor
			}



		}


	}


</script>
<style type="text/css" scoped>
	.el-pagination{
		display: flex;
		justify-content: flex-end;
	}



</style>