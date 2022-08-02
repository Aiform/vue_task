import { createApp } from 'vue'
import { createStore } from 'vuex'
import nonlocal from './nonlocal'
import isolatepersonnel from './isolatepersonnel'
import relieve from './relieve'
import aside from './aside'
import epidemicriskranking from './epidemicriskranking'
export default createStore({
	modules:{
		nonlocal,
		isolatepersonnel,
		relieve,
		aside,
		epidemicriskranking
	}
})