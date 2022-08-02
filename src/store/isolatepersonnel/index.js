import {postallpersonnel} from '../../axios'
import qs from 'qs'
export default{
	actions:{
		async Allpersonnel({commit},data){
			let result = await postallpersonnel(qs.stringify(data))
			if(result.data.status == 0){
					commit('ALLPERSONNEL',result.data.data)
			}
		}

	},
	mutations:{
		ALLPERSONNEL(state,Allpersonnel){
			state.Allpersonnel = Allpersonnel
		}


	},
	state:{
		Allpersonnel:[]

	}

}

