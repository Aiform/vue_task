import {postepidemicdataranking} from '../../axios'
import qs from 'qs'
export default{
actions:{
		async Gettable({commit},data){
			let result = await postepidemicdataranking(qs.stringify(data))
			if(result.data.status == 0){
					commit('GETTABLE',result.data.data)
			}
		}

	},
	mutations:{
		GETTABLE(state,Gettable){
			state.Gettable = Gettable
		}


	},
	state:{
		Gettable:[]

	}

}