import {poststranger} from '../../axios'
import qs from 'qs'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
	actions:{
		async Padingdevice({commit},data){
			let result = await poststranger(qs.stringify(data))
				if(result.data.status == 0){
					commit('PADINGDEVICE',result.data.data)
				}
		},
	
	

},
	mutations:{
		PADINGDEVICE(state,Padingdevice){
			state.Padingdevice  = Padingdevice
		},
		
	},
	state:{
		Padingdevice:[],
		
	}
}