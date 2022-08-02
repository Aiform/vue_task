<template>
	<div class="headerNav">
		<div class="headerNavBox">
			<div class="headerword">
				<div class="headericon">
					<el-icon @click="isCollapse"><Expand /></el-icon>
				</div>
				<div class="bread">
					<el-breadcrumb>
						<el-breadcrumb-item :to="{ path: '/homepagedata' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item v-for="(item,index) in list" :key="item.id">
							><router-link :to="{ path: item.path }"  style="color: #fff">{{ item.meta.title }}</router-link>
						</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="inforadmin">
					<div class="FullScreen">
						<el-tooltip
						class="box-item"
						effect="dark"
						content="全屏显示"
						placement="bottom"
						>
						<el-icon @click="toggleFullscreen"><FullScreen /></el-icon>
					</el-tooltip>

				</div>
				<div>
					<el-dropdown >
						<span class="el-dropdown-link">
							<el-avatar :size="50"    :src="pic"/>
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="homepagedata">首页</el-dropdown-item>
								<el-dropdown-item @click="personalcenter">个人中心</el-dropdown-item>
								<el-dropdown-item @click="esclogo">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>

				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	import { computed ,onMounted,ref,onBeforeUnmount} from 'vue'
	import { useRouter , useRoute} from 'vue-router'
	import screenfull from "screenfull"
	import {useStore} from 'vuex'
	import {ElMessage,ElMessageBox} from 'element-plus'
	export default{
		name:"Header",
		setup(){
			const router = useRouter()
			const route = useRoute()
			const store = useStore()
			const pic = ref()
			const time = ref(null)
			onMounted(()=>{
				time.value = setInterval(()=>{
					pic.value = localStorage.getItem('USERPIC')
				},50)
			})
			const list = computed(() => {
				return route.matched
			})

			const toggleFullscreen = ()=>{
				  if (screenfull.isEnabled) {
			        screenfull.toggle()
			      }
			}
			const isCollapse = ()=>{
				  if (store.state.aside.isCollapse == false) {
				        store.state.aside.isCollapse = true;
				      } else if (store.state.aside.isCollapse == true) {
				        store.state.aside.isCollapse = false;
				      }
			}
			const homepagedata = ()=>{
				router.push('/homepagedata')
			}
			const esclogo = ()=>{
					ElMessageBox.confirm(
					'此操作请谨慎',
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
						message: '退出成功',
					})
					localStorage.removeItem('TOKEN')
					localStorage.removeItem('PHONE')
					localStorage.removeItem('EMAIL')
					localStorage.removeItem('NAME')
					localStorage.removeItem('ROLE')
					localStorage.removeItem('ADDRESS')
					localStorage.removeItem('SEX')
					localStorage.removeItem('REMARKS')
					localStorage.removeItem('USERPIC')
					localStorage.removeItem('ADMINNAME')
					localStorage.removeItem('ID')
  					router.push('/login')
				})
				.catch(() => {
					ElMessage({
						type: 'info',
						message: '退出失败',
					})
				})
  					
			}
			const personalcenter =()=>{
				router.push('/personalcenter')
			}
			onBeforeUnmount(()=>{
				clearInterval(time.value)
			})
			return{
				list,
				toggleFullscreen,
				isCollapse,
				homepagedata,
				esclogo,
				personalcenter,
				pic
				
			}


		}
	}
</script>
<style type="text/css" scoped>
	.headerNav{
		position: fixed;
		z-index: 999;
		width: 100%;
		height: 100px;
		line-height: 70px;
		border-radius: 0!important;
		background: #fff;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
		border-bottom: 1px solid #d8dce5;
	}
	.headerNavBox{
		position: fixed;
		z-index: 999;
		width: 100%;
		height: 70px;
		line-height: 70px;
		border-radius: 0!important;
		background-color: #10aeb5;
	}
	.headerword{
		display: flex;
		width: 1685px;
	}
	/deep/ .el-breadcrumb__inner{
		color: #fff  !important;
	}
	.bread{
		margin-left: 30px;
		margin-top: 30px;
	}
	/deep/ .el-breadcrumb__separator{
		display: none;
	}
	.headericon{
		margin-left: 10px;
		font-size: 25px;
		color: #fff;
		margin-top: 5px;
	}
	.inforadmin{
		margin-top: 10px;
		display: flex;
		margin-left: auto;
	}
	.FullScreen{
		font-size: 25px;
		color: #fff;
		margin-top: -5px;
		margin-right: 20px;
	}

</style>
