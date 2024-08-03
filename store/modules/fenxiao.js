"use strict";
import {
	getMyFenxiaoMsg,
	historyIn,
	shareOrder,
	shareTeam,
	getSomeBodyOrder,
	getMoney,
	getMoneyList
} from '@/api/fenxiao.js';
import db from "@/system/core/nardy.db.js";

const state = {
	myFenxiaoMsg: {},
	historyList:[],
	orderList:[],
	teamList:[],
	someBodyOrder:{},
	getMoneyList:{},
};

const getters = {

};

const actions = {
	async getMyFenxiaoMsg({
		commit
	}, params) {
		let res = await getMyFenxiaoMsg(params)
		commit('set_myFenxiaoMsg', res)
	},
	async getHistory({
		commit
	},params){
		let res =await historyIn(params)
		commit('set_history',res)
	},
	async getShareOrder({commit},params){
		let res=await shareOrder(params)
		commit('set_OrderList',res)
	},
	async getShareTeam({commit},params){
		let res=await shareTeam(params)
		commit('set_TeamList',res)
	},
	async getSomeBodyOrder({commit},params){
		let res =await getSomeBodyOrder(params)
		commit('set_SomeBodyOrder',res)
	},
	async getMoneyList({commit},params){
		let res =await getMoneyList(params)
		commit('set_GetMoneyList',res)
	},
	async toGetMoney({commit},params){
		let res =await getMoney(params)
		commit('toGetMoney',res)
	}
};

const mutations = {
	set_myFenxiaoMsg(state, data) {
		state.myFenxiaoMsg = data
		console.log('我的',data);
	},
	set_history(state,data){
		console.log('历史',data)
	},
	pust_history(state,data){
		console.log(data);
	},
	set_OrderList(state,data){
		console.log('订单',data)
	},
	push_OrderList(state,data){
		console.log(data)
	},
	set_TeamList(state,data){
		console.log('团队',data)
	},
	push_TeamList(state,data){
		console.log(data)
	},
	set_SomeBodyOrder(state,data){
		console.log('某人的订单',data)
	},
	set_GetMoneyList(state,data){
		console.log('提现记录',data)
	},
	toGetMoney(state,data){
		console.log('提现信息',data)
	}
};


export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}
