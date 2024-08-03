"use strict";
import {
	getVenueList,
	getVenueNameList,
	getVenuePhotoList,
	getSchoolDetail,
	getSchool,
	getVenueListById,
} from '@/api/venue.js';
import db from "@/system/core/nardy.db.js";

const state = {
	venueList: [],
	venueNameList: [],
	venuePhotoList: [],
	detail:{},
	sites:[],
	coachs:[],
	schoolList:[],
	venueListById:[],
}

const getters = {

}



const actions = {
	async getVenueList({
		commit
	}, params) {
		let res = await getVenueList(params)
		console.log(res)
		if(params.page==1){
			commit('get_venueList', res.schools.list)
		}else{
			commit('push_venueList', res.schools.list)
		}
		
		
	},
	async getVenueNameList({
		commit
	}, params) {
		let res = await getVenueList(params)
		commit('get_venueNameList', res)
	},
	async getVenuePhotoList({
		commit
	}, params) {
		let res = await getVenuePhotoList(params)
		commit('get_venuePhotoList', res)
	},
	
	
	async getSchoolDetail({commit},params){
		this.$win.loading('...')
		let res=await getSchoolDetail(params)
		this.$win.close('l')
		if(res&&res.code==0){
			commit('Set_schoolDetail',res)
		}else{
			this.$win.nlog(res.msg+res.code)
		}
		
	},
	async getSchoolList({commit},params){
		this.$win.loading('...')
		let res =await getSchool(params)
		this.$win.close('l')
		if(res&&res.code==0){
			commit('setSchoolList',res)
		}else{
			this.$win.nlog(res.msg+res.code)
		}
	},
	async getVenueListById({commit},params){
		this.$win.loading('正在获取场地列表')
		let res=await getVenueListById(params)
		this.$win.close('l')
		if(res&&res.code===0){
			commit("setVenueListById",res)
		}else{
			this.$win.nlog(res.msg)
		}
	}
}


const mutations = {
	get_venueList(state, data) {
		state.venueList = data
		console.log('驾校列表',data)
	},
	push_venueList(state,data){
		state.venueList=state.venueList.concat(data)
	},
	get_venueNameList(state, data) {
		state.venueNameList = data
	},
	get_venuePhotoList(state, data) {
		state.venuePhotoList = data
		console.log('图片列表',data);
	},
	Set_schoolDetail(state,data){
		console.log('驾校详细',data);
		state.detail=data.resultMap.school
		state.sites=data.resultMap.sites
		state.coachs=data.resultMap.coachEntityList
	},
	setSchoolList(state,data){
		state.schoolList=data.schoolEntities
	},
	setVenueListById(state,data){
		state.venueListById=data.sites
	}
	
}

export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}
