import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store=new Vuex.Store({
	state:{
		name:'lk',
		songs:[]
	},
	mutations:{
		increment(state,res){
			state.songs=res
			uni.setStorageSync("songs",[res])
		}
	},
	actions:{
		
	},
	getters:{
		
	}
})
module.exports=store