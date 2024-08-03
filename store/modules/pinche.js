"use strict";
import {
	countPrice,
	PcLiCoach,
	PcLiStu,
	pcLi,
	toPc,
	jiedan
} from "@/api/pinche.js";
import db from "@/system/core/nardy.db.js";

const state = {
	price: null,
	pincheList:[],
	jiedanStatu:null,//拼车接单状态
	
}

const getters = {

}
//请求
const actions = {
	//计算价格
	async countPrice({
		commit
	}, params) {
		let res = await countPrice(params)
		if (res && res.code == 0) {
			commit('ToCountPrice', res.price)
		} else {
			this.$win.nlog(res.detail)
		}
	},
	//拼车列表coach
	async getPcListC({commit},params){
		let res=await PcLiCoach(params)
		commit('set_PcLiC',res)
	},
	//拼车列表stu
	async getPcListS({commit},params){
		let res =await PcLiStu(params)
		commit('set_PcLiS',res)
	},
	
	//拼车列表
	async getPcList({commit},params){
		let res=await pcLi(params)
		commit('set_pcli',res)
	},
	
	
	//发起拼车
	async toPinche({commit},params){
		let res=await toPc(params)
		if(res.code==0){
			// this.state.price=null
			this.$win.back()
			this.$win.nlog('发起成功')
			
		}
		commit('toPc',res)
	},
	
	//教练接单
	async jiedan({commit},params){
		let res=await jiedan(params)
		commit('jiedan_msg',res)
	}
}
//操作数据
const mutations = {
	ToCountPrice(state, data) {
		state.price = data 
		// state.price=data
	},
	set_PcLiC(state,data){
		console.log('教练端拼车列表',data);
	},
	set_PcLiS(state,data){
		console.log('学员端拼车列表',data);
	},
	toPc(state,data){
		console.log('发起拼车',data);
		state.price=null
	},
	set_pcli(state,data){
		console.log('拼车列表',data);
		state.pincheList=data.page.list;
	},
	jiedan_msg(state,data){
		console.log('接单信息',data);
		
		if(data.code==0){
			this.$win.nlog('接单成功')
			state.jiedanStatu=data.code
		}else{
			this.$win.nlog(data.msg)
		}
	}
}


export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}
