<template>
	<div class="Epidemic_situation_inquiry">
		<el-card>
			<div class="header">
				<el-icon style="color: #10aeb5;font-size: 20px" ><Search /></el-icon><h4>疫情信息查询页</h4>
			</div>
			<el-divider />
			<el-alert show-icon  title="温馨提示：本页面信息仅供参考，数据来源官方，可能存在滞后性或缺漏，具体情况以政府发布信息为准。 点击查询" type="warning" />
			<div class="search">
				<el-form >
					<el-form-item label="省级:">
						<el-select  placeholder="请选择" v-model="province">
							<el-option :label="item.province" :value="item.province" v-for="(item,index) in RegionalEpidemicData" :key="item.id" />
						</el-select>
					</el-form-item>
					<el-form-item label="市级:">
						<el-select  placeholder="请选择" v-model="city">
							<el-option :label="item.city" :value="item.city" v-for="(item,index) in RegionalEpidemicData" :key="item.id" />
						</el-select>
					</el-form-item>
					<el-form-item label="区级:">
						<el-select  placeholder="请选择" v-model="area">
							<el-option  :label="item.area" :value="item.area" v-for="(item,index) in RegionalEpidemicData" :key="item.id" />
						</el-select>
					</el-form-item> 
					<div>
						<el-button type="primary" @click="empty">清空</el-button>
						<el-button type="primary" @click="query">查询</el-button>
						<el-button type="primary" @click="escquery" v-if="isshow">结束查询</el-button>
					</div>
				</el-form>
			</div>
			<el-tabs
			v-model="activeName"
			type="card"
			class="demo-tabs"
			@tab-click="handleClick"
			v-for="(item,index) in QueryOfprovinceScitiesAndCountiesd" :key="item.id"
			>
			<el-tab-pane :label="item.sealingcontrol" name="first">
				<div>
					<h3>{{item.regionone}}</h3>
					<ul>
						<li>淮上村四队5号</li>
						<li>淮上村四队5号</li>
						<li>淮上村四队5号</li>
						<li>淮上村四队5号</li>
					</ul>
				</div>
			</el-tab-pane>
			<el-tab-pane :label="item.control" name="second">
				<div>
					<h3>
						{{item.controladdressone}}
					</h3>
					<ul>
						<li>淮上村四队5号</li>
						<li>淮上村四队5号</li>
						<li>淮上村四队5号</li>
						<li>淮上村四队5号</li>
					</ul>
				</div>
			</el-tab-pane>
			<el-tab-pane :label="item. control" name="third">
				<div>
					<h3>
						{{item.againstadressone}}
					</h3>
					<ul>
						<li>淮上村四队5号</li>
						<li>淮上村四队5号</li>
						<li>淮上村四队5号</li>
						<li>淮上村四队5号</li>
					</ul>
				</div>

			</el-tab-pane>
			
		</el-tabs>
	</el-card>
</div>
</template>
<script type="text/javascript">
	import { Search } from '@element-plus/icons-vue'
	import axios from '../../axios/instance.js'
	import {ref,onMounted} from 'vue'
	import qs from 'qs'
	import { ElNotification ,ElDialog ,ElLoading,ElMessage,ElMessageBox} from 'element-plus'
	export default{
		setup(){
			const activeName = ref('first')
			const RegionalEpidemicData = ref([])
			const QueryOfprovinceScitiesAndCountiesd = ref([])
			const isshow = ref(false)
			const province = ref('')
			const city = ref('')
			const area = ref('')
			onMounted(()=>{
				citydata()
			})
			const citydata = ()=>{
				axios.post('/epidemicsituationinquiry').then((result)=>{
					if(result.data.status == 0){
						RegionalEpidemicData.value = result.data.data
					}
				})
			}
			const query = ()=>{
				if(province.value == '' ||  city.value == ''){
					ElMessage.error('不可以为空')
				}else{
					const loading = ElLoading.service({
						lock: true,
						text: 'Loading',
						background: 'rgba(0, 0, 0, 0.7)',
					})
					setTimeout(() => {
						loading.close()
						axios.post('/queryofprovincescitiesandcounties',qs.stringify({province:province.value,city:city.value,area:area.value})).then((result)=>{
							if(result.data.status == 0){
								QueryOfprovinceScitiesAndCountiesd.value = result.data.data
								isshow.value = true
							}
						})

					}, 500)

				}

			}
			const empty = ()=>{
				province.value = ''
				city.value = ''
				area.value = ''
			}
			const escquery = ()=>{
				citydata()
				empty()
				isshow.value = false
				QueryOfprovinceScitiesAndCountiesd.value = ''
			}
			return{
				activeName,
				RegionalEpidemicData,
				province,
				city,
				area,
				query,
				QueryOfprovinceScitiesAndCountiesd,
				isshow,
				escquery,
				empty
			}
		}
	}
</script>
<style type="text/css" scoped>
	.Epidemic_situation_inquiry{
		width: 1685px;
	}
	.header{
		display: flex;
	}
	h4{
		margin-left: 10px;
	}
	.el-form{
		display: flex;
		justify-content: space-between;
	}
	.search{
		margin-top: 30px;
	}
	.el-button{
		background: #10aeb5;
		margin-left: 60px;
	}
	.el-tabs{
		margin-top: 30px;
	}
	h3{
		margin: 30px;
	}
	.el-tab-pane ul li {
		margin: 30px;
		margin-left: 40px;
	}
	.el-tab-pane ul   li:before {
		content: "";
		width: 6px;
		height: 6px;
		display: inline-block;
		border-radius: 50%;
		background: #10aeb5;
		vertical-align: middle;
		margin-right: 14px;
	}

</style>
