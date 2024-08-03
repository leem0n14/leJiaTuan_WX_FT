"use strict";
import {
	toSignIn,
	getSignInDays,
	seeRecord,
	getShop,
	isSignIn
} from '@/api/signIn.js';
import db from "@/system/core/nardy.db.js";


//放数据
const state = {
	signInDays: null,
	point:null,
	shopList:[],
	isSignIn:null,
	record:[],
	signMsg:null,//签到返回的信息
};

const getters = {

};
//请求
const actions = {
	async toSignIn({
		commit
	}, params) {
		let res = await toSignIn(params)
		commit('to_signIn', res)
	},
	async getSignInDays({
		commit
	}, params) {
		let res = await getSignInDays(params)
		commit('get_signInDays', res.data)
	},
	async isSignIn({commit},params){
		let res =await isSignIn(params)
		commit('isSign',res)
	},
	async seeRecord({
		commit
	}, params) {
		let res = await seeRecord(params)
		commit('see_record', res)
	},
	async getShop({
		commit
	},params){
		let res =await getShop(params)
		commit('get_shopList',res)
		// if(res.page==1){
		// 	commit('get_shopList',res)
		// }
			
		// else {
		// 	commit('set_shopList',res)
		// }
	}
};
//操作数据
const mutations = {
	to_signIn(state, data) {
		console.log('签到',data);
		state.signMsg=data
	},
	get_signInDays(state, data) {
		console.log('签到天数',data);
		state.signInDays=data.sum
		state.point=data.point
	},

	isSign(state,data){
		console.log('是否签到',data);
		state.isSignIn=data.state
	},

	see_record(state, data) {
		console.log('查看积分明细',data)
		state.record=data.signData
	},
	get_shopList(state,data){
		console.log('获得积分商城的商品',data)
		// state.shopList=data
	},
	set_shopList(state,data){
		console.log(data)
		// state.shopList=state.shopList.concat(data)
	}
};


export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}
