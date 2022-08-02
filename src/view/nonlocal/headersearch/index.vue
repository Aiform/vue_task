<template>
	<div class="newlyAdded">
		<el-button @click="information"><el-icon style="margin-right: 5px;"><EditPen/></el-icon>新增国内人员信息</el-button>
		<el-button  @click="newlyaddedoverseas"><el-icon style="margin-right: 5px;"><EditPen/></el-icon>新增境外人员信息</el-button>
	</div>
	<div class="header">
		<el-form  style="display: flex; flex-wrap: wrap;">
			<el-form-item label="姓名:">
				<el-input placeholder="请输入姓名" v-model.trim="keyword"/>
			</el-form-item>
			
			<div class="but">
				<el-button @click="fromemity" >清空</el-button>
				<el-button  @click="search">查询</el-button>
				<el-button  v-if="isshow" @click="escSearch">结束查询</el-button>
			</div>
		</el-form>

	</div>	
	<el-alert title="目前只支持姓名查询,不支持其他信息查询" type="info" show-icon/>
	<el-divider />
</template>
<script type="text/javascript">
	import {ref} from 'vue'
	import {useRouter} from 'vue-router'
	import {useStore} from 'vuex'
	import {ElMessage} from 'element-plus'
	export default{
		setup(){
			const keyword = ref('')
			const router = useRouter()
			const store = useStore()
			const isshow = ref(false)
			const num = ref('')
			const information = ()=>{
				router.push('/information')
			}
			const fromemity =()=>{
				keyword.value = ''
			}
			const search =()=>{
				if(keyword.value == ''){
					ElMessage.error('姓名不能为空')
				}else{
					store.dispatch('Padingdevice',{num:num,keyword:keyword.value})
					isshow.value = true
				}
			}
			const newlyaddedoverseas = ()=>{
				router.push('/newlyaddedoverseas')
			}
			const escSearch = ()=>{
				store.dispatch('Padingdevice',{num:num})
				isshow.value = false
			}
			return{
				information,
				fromemity,
				search,
				keyword,
				newlyaddedoverseas,
				escSearch,
				isshow
			}

		}

	}

</script>
<style type="text/css" scoped>
	.newlyAdded{
		display: flex;
		    justify-content: space-between;
		    margin-bottom: 20px;
		
	}
	.header{
		width: 100%;
		display:flex;
	}
	.header .el-input{
		width: 230px !important;
	} 
	.but{
		display: flex;
		justify-content: flex-end;
		margin-left: 60px;
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