"use strict";
import {
	getStudyProgress,
	getBaomingList,
	subBaoming,
} from '@/api/my.js';
import db from "@/system/core/nardy.db.js";

const state = {
	study: null,
	baomingList: [],
}

const getters = {

}

const actions = {
	async getStudyProgress({
		commit
	}, params) {
		let res = await getStudyProgress(params)
		commit('get_studyProgress', res)
	},
	async getBaomingList({
		commit
	}, params) {
		let res = await getBaomingList(params)
		if (params.i)
			commit('set_baomingList', res.page.list)
		else
			commit('get_baomingList', res.page.list)
	},
	async subBaoming({commit},params) {
		let res =await subBaoming(params)
		if(res&&res.code===0){
			// commit('',res)
			this.$win.back()
			this.$win.nlog('提交成功')
			
		}else{
			this.$win.nlog('error')
		}
	}

}

const mutations = {
	get_studyProgress(state, data) {
		console.log('进度', data)
	},
	get_baomingList(state, data) {
		state.baomingList = data
	},
	set_baomingList(state, data) {
		state.baomingList = state.baomingList.concat(data)
	}
}

export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}