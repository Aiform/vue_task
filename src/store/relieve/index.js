import {postrelievedata} from '../../axios'
import qs from 'qs'
export default{
	actions:{
		async Reactive({commit},data){
			let result = await postrelievedata(qs.stringify(data))
				if(result.data.status == 0){
					commit('REACTIVE',result.data.data)
				}
		}
	},
	mutations:{
		REACTIVE(state,Reactive){
			state.Reactive = Reactive
		}
	},
	state:{
		Reactive:[]
	}

}