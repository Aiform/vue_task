<template>
	<div class="aside">
		<div>
			<el-menu 
			class="el-menu-vertical-demo" 
			:collapse="isCollapse"
			>
			<div class="navigation-hash-processing">
			<h3>{{isCollapse ? '疫情': '疫情人员信息与数据'}}</h3>
			</div>
			<el-menu-item index="2" @click="Homepagedata">
				<el-icon><HomeFilled /></el-icon>
				<span>{{dynamicdata.outbreak}}</span>
			</el-menu-item>
			<el-sub-menu index="1"> 
				<template #title>
					<el-icon><Avatar /></el-icon>
					<span>{{dynamicdata.staff}}</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="1-1" @click="native">
						<span>{{dynamicdata.local}}</span>
					</el-menu-item>
					<el-menu-item index="1-2" @click="nonlocal">
						<span>{{dynamicdata.nonlocal}}</span>
					</el-menu-item>
					<el-menu-item index="1-3" @click="protect">
						<span>{{dynamicdata.guard}}</span>
					</el-menu-item>
					<el-menu-item index="1-4" @click="isolatepersonnel">
						<span>{{dynamicdata.iosal}}</span>
					</el-menu-item>
				</el-menu-item-group>  
			</el-sub-menu> 
			<el-menu-item index="3" @click="epidemicriskranking">
				<el-icon><Histogram /></el-icon>
				<span >{{dynamicdata.among}}</span>
			</el-menu-item>
			<el-menu-item index="5" @click="epidemicsituationinquiry">
				<el-icon><LocationFilled /></el-icon>	
				<span >{{dynamicdata.query}}</span>
			</el-menu-item>
			<el-menu-item index="4" @click="distributionofepidemicareas">
				<el-icon><Flag /></el-icon>
				<span >{{dynamicdata.reqion}}</span>
			</el-menu-item>
			<el-menu-item index="6" @click="epidemictrendanalysis">
				<el-icon><TrendCharts /></el-icon>
				<span >{{dynamicdata.trend}}</span>
			</el-menu-item>
		</el-menu> 
	</div>
</div>
</template>
<script>
	import { reactive ,computed} from 'vue'
	import { useRouter } from 'vue-router';
	import { ElLoading } from 'element-plus'
	import {useStore} from 'vuex'
	export default {
		name:'Aside',
		setup(){
			const store = useStore()
			const isCollapse = computed(()=>{
				return store.state.aside.isCollapse
			})
			const dynamicdata = reactive({
				outbreak:'疫情数据',
				staff:'疫情人员管理',
				local:'本地人员信息管理',
				nonlocal:'外地人员信息管理',
				guard:'防护人员信息管理',
				iosal:'隔离人员信息管理',
				among:'疫情数据排行',
				query:'疫情信息查询',
				reqion:'疫情区域分布',
				trend:'疫情趋势分析' // 定义的数据
			})
			const router = useRouter()
			function Homepagedata(){
				 const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    router.push('/homepagedata')
				  }, 500)
			}
			function native(){
				 const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    router.push('/native')
				  }, 500)
			}
			function nonlocal(){
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    router.push('/nonlocal')
				  }, 500)

			}
			function protect(){
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    router.push('/protect')
				  }, 500)
			}
			function isolatepersonnel(){
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    router.push('/isolatepersonnel')
				  }, 500)
			}
			const epidemicriskranking = ()=>{
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
			const epidemicsituationinquiry = ()=>{
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    router.push('/epidemicsituationinquiry')
				  }, 500)
			}
			const distributionofepidemicareas = ()=>{
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    router.push('/distributionofepidemicareas')
				  }, 500)

			}
			const epidemictrendanalysis = ()=>{
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  setTimeout(() => {
				    loading.close()
				    router.push('/epidemictrendanalysis')
				  }, 500)

			}
			return{
				Homepagedata,
				dynamicdata,
				native,
				nonlocal,
				protect,
				isolatepersonnel,
				isCollapse,
				epidemicriskranking,
				epidemicsituationinquiry,
				distributionofepidemicareas,
				epidemictrendanalysis
				
			}
		}
	}
</script>

<style type="text/css" scoped>
	.aside{  
		box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
		background-color: #fff;
		width: inherit;
		height: 100%;
		position: fixed;
		top: 0px;
		bottom: 0;
		left: 0;
		z-index: 1001;	
	}
	.navigation-hash-processing{
		width: 100%;
		height: 70px;
		line-height: 70px;
		background-color: #10aeb5;
	}

	/deep/ .el-menu-item:hover{	
		background-color: #10aeb5;
		color: #fff;
	}
	/deep/ .el-sub-menu__title:hover{
		background-color: #10aeb5;
		color: #fff;
	}
	h3 {
		  text-align: center;
		  color: #fff;
		  letter-spacing: 2px;
		  font-size: 18px;
		}

</style>