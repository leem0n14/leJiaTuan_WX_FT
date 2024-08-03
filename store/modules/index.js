"use strict";
import {
	getCarousel,
	getTannouncement,
	getMiaosha,
	getPintuan,
	getHotGoods,
} from '@/api/index.js';
import db from "@/system/core/nardy.db.js";

const state = {
	carousel:[],//轮播图
	announcement:[],
	miaoshaGoods:{},
	pintuanGoods:{},
	hotGoods:{},
}

const getters = {

}


const actions = {
	//轮播图
	async getCarousel({
		commit
	}, params) {
		let res = await getCarousel(params)
		commit('get_Carousel', res)

	},
	//轮播公告
	async getTannouncement({
		commit
	}, params) {
		let res = await getTannouncement(params)
		commit('get_Tannouncement', res)
	
	},
	//秒杀
	async getMiaosha({
		commit
	}, params) {
		let res = await getMiaosha(params)
		commit('get_miaosha', res)
	
	},
	//拼团
	async getPintuan({
		commit
	}, params) {
		let res = await getPintuan(params)
		commit('get_pintuan', res)
	
	},
	//热门
	async getHotGoods({
		commit
	}, params) {
		let res = await getHotGoods(params)
		commit('get_hot', res)
	
	},
}


const mutations = {
	get_Carousel(state, data) {
		//console.log('轮播图',data)
		state.carousel=data.rotate
	},
	// push_Carousel(state, data) {
	// 	console.log(data)
	// },
	
	get_Tannouncement(state,data){
		//console.log('公告',data)
		state.announcement=data.announcement
	},
	get_miaosha(state,data){
		//console.log('秒杀',data)
		state.miaoshaGoods=data.goods
	},
	get_pintuan(state,data){
	//	console.log('拼团',data)
		state.pintuanGoods=data.goods
	},
	get_hot(state,data){
		//console.log('热门',data)
		state.hotGoods=data.goods
	},
}

export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}
