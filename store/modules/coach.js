"use strict";
import {
	getCoachList,
	getCitySchool,
	getCoachBySchool,
	getMyCoachMsg,
	coachDetail,
	beCoach,
} from '@/api/coach.js';
import db from "@/system/core/nardy.db.js";


//放数据
const state = {
	coachList: [],
	schools: [],
	myCoach:{},
	coachDetail:{},
};

const getters = {

};
//请求
const actions = {
	//获取综合查询的教练列表
	async getCoachList({
		commit
	}, params) {
		let res = await getCoachList(params)
		// console.log('CoachList',res)
		if (res && res.code == 0) {
			if (params.page == 1) {
				// console.log('成功', res)
				commit("set_coachList", res.coachs.list)
				// console.log("set_coachList")
			} else {
				commit("push_coachList", res.coachs.list)
				// console.log("push_coachList")
			}
			return res
		} else {
			this.$win.nlog(res.detail)
		}
	},
	//获取该城市的驾校
	async getCitySchool({
		commit
	}, params) {
		let res = await getCitySchool(params);
		console.log('CitySchool', res)
		if (res && res.code == 0) {
			// console.log('成功', res)
			commit('get_schoolList', res.schools)
		} else {
			this.$win.nlog(res.detail)
		}
	},
	//根据驾校查询教练
	async getCoachBySchool({
		commit
	}, params) {
		let res = await getCoachBySchool(params);
		console.log('按驾校查询', res)
		commit('get_CoachListBySchool', res.coachs.list)
	},
	//获取我的教练的信息
	async getMyCoachMsg({
		commit
	}, params) {
		let res = await getMyCoachMsg(params)
		commit('get_MycoachMsg', res);
	},
	//详细
	async getCoachDetail({commit},params,id){
		console.log('nd',params.id);
		this.$win.loading('加载中...')
		let res=await coachDetail(params)
		this.$win.close('l')
		if(res.code==0){
			commit('set_CoachDetail',res)
			
		}else{
			this.$win.nlog(res.msg)
		}
	},
	//成为教练
	async beCoach({commit},params){
		this.$win.nlog("正在提交申请")
		let res=await beCoach(params)
		this.$win.close('l')
		if(res&&res.code===0){
			this.$win.nlog('提交成功')
			setTimeout(()=>{
				this.$win.back()
				// console.log('');
			},1000)
		}
	}
};
//操作数据
const mutations = {
	//获取该城市的驾校
	get_schoolList(state, data) {
		// console.log('get_schoolList',data)
		state.schools = ['所有驾校', ...data]
	},
	//获取综合查询的教练列表
	push_coachList(state, data) {
		// let arr = state.coachList.concat(data)
		// state.coachList = JSON.parse(JSON.stringify(arr))
		state.coachList = state.coachList.concat(data)
		console.log("push", data)
	},
	set_coachList(state, data) {
		// console.log(">>>", data)
		state.coachList = data
		console.log('set',data)
	},
	//按驾校查询
	get_CoachListBySchool(state, data) {
		state.coachList = data
	},
	//我的教练
	get_MycoachMsg(state,data){
		state.myCoach=data.coach
		console.log('我的教练',data);
	},
	//coach详细
	set_CoachDetail(state,data){
		console.log('coach详细',data);
		state.coachDetail=data.coach
	},
};


export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}
