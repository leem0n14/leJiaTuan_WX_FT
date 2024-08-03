"use strict";
import {
	getListByType,
	getTypeList
} from '@/api/category.js';
import db from "@/system/core/nardy.db.js";

const state = {
	list: [],
	typeList: [],
	title: null,
	//分页
	pageSize:10,
	pageIndex:1,
}

const getters = {

}

const actions = {
	async getTypeList({
		commit
	}, params) {
		let res = await getTypeList(params)
		commit('get_TypeList', res)
	},
	async getListByType({
		commit
	}, params) {
		let res = await getListByType(params)
		if(params.i==1){
			commit('pust_list', res)
		}else{
			commit('get_list', res)
		}
	}
}

const mutations = {
	get_list(state, data) {
		console.log('get某类', data)
		if(data.code==0){
			state.list=data.goods.list
		}else{
			this.$win.nlog('获取失败')
		}
	},
	pust_list(state,data){
		console.log('post某类', data)
		if(data.code==0){
			if(data.goods.list.length==0){
				this.$win.nlog('暂无更多数据')
			}else{
				state.list=state.list.concat(data.goods.list)
			}
			
		}else{
			this.$win.nlog('获取失败')
		}
	},
	get_TypeList(state, data) {
		console.log('类型列表', data)
		state.title=data.tags[0]
		let arr = []
		for (let i = 0; i < data.tags.length; i++) {
			let item = {
				name: data.tags[i],
				isAct: null,
			}
			if (i == 0) {
				item.isAct = true
			} else {
				item.isAct = false
			}
			arr.push(item)
		}
		state.typeList=arr
	},
	//点击方法
	navClick(event,index) {
		for (let a = 0; a < state.typeList.length; a++) {
			state.typeList[a].isAct = false
		}
		state.typeList[index].isAct = true
		state.title = state.typeList[index].name
	},
	//页码自增
	addIndex(state){
		console.log('add');
		state.pageIndex++
	},
	//清零页码和数据
	clearIndex(state){
		console.log('clear');
		state.pageIndex=1
		state.list=[]
	}
}

export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}
