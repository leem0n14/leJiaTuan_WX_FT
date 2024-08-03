"use strict";
import {
	// getOrder,
	getPintuan,
	getGoodMsg,
	getGetCoupon,
	getGetCouponDetail,
	getGetMyCoupon,
	postCouponSave,
	postSelectCoupon,
	getPintuanList,
} from '@/api/goods.js';
import db from "@/system/core/nardy.db.js";
// import pay from "@/store/modules/pay.js"

const state={
	pintuanMsg:{},
	// orderMsg:[],
	goodMsg:{},
	goodList:{},
	goodListDetail:{},
	mygoodList:{},
	mygoodListReturn:{},
	selectCoupon:{},
	pintuanList:[],
}

const getters={
	
}

const actions={
	async getPintuan({commit},params){
		let res =await getPintuan(params);
		commit('set_PintuanMsg',res)
	},
	// async getOrder({commit},params){
	// 	let res =await getOrder(params);
	// 	commit('set_orderMsg',res)
	// },
	async getGoodMsg({commit},params){
		let res=await getGoodMsg(params)
		commit('get_GoodMsg',res)
	},
	async getGetCoupon({commit},params){
		let res=await getGetCoupon(params)
		console.log(res)
		// console.log(666)
		console.log(res.list)
		// commit('get_getcoupon',res)
		commit('get_GetCoupon',res)
	},
	async getGetCouponDetail({commit},params){
		let res=await getGetCouponDetail(params)
		console.log(res)
		// console.log(789)
		// commit('get_getcoupon',res)
		// commit('get_GetCouponDetail',res)
	},
	async getGetMyCoupon({commit},params){
		let res=await getGetMyCoupon(params)
		console.log(res)
		console.log("上面是我的优惠卷的界面")
		commit('get_getMyCoupon',res)
	},
	async postCouponSave({commit},params){
		let res=await postCouponSave(params)
		console.log(res)
		console.log("上面是优惠券领取返回的id")
		commit('get_postCouponSave',res)
	},
	async postSelectCoupon({commit},params){
		let res=await postSelectCoupon(params)
		// console.log(res)
		// console.log("上面是选择优惠卷的")
		commit('post_postSelectCoupon',res)
	},
	async getPintuanList({commit},params){
		this.$win.loading('正在获取列表')
		let res=await getPintuanList(params)
		this.$win.close('l')
		if(params.page!==1){
			commit('push_pintuanList',res.page.list)
		}else{
			commit('set_pintuanList',res.page.list)
		}
	}
}

const mutations ={
	set_PintuanMsg(state,data){
		state.pintuanMsg=data
		console.log(state.pintuanMsg);
	},
	set_GoodMsg(state,data){
		state.goodList=data
		console.log(state.goodList);
	},
	set_getMyCoupon(state,data){
		state.mygoodList=data
		console.log(state.mygoodList);
	},
	set_postCouponSave(state,data){
		state.mygoodListReturn=data
		console.log(state.mygoodListReturn);
	},
	set_postSelectCoupon(state,data){
		state.selectCoupon=data
		console.log(state.selectCoupon);
	},
	// set_orderMsg(state,data){
	// 	state.orderMsg=data
	// 	console.log(state.orderMsg);
	// },
	get_GoodMsg(state,data){
		console.log(data,'商品具体信息');
		if(data&&data.code==0){
			state.goodMsg=data.good
		}else{
			this.$win.nlog(data.msg+data.code)
		}
	},
	get_GetCoupon(state,data){
		console.log(data,'优惠券列表');
		if(data&&data.code==0){
			state.goodList=data.page.list
		}else{
			this.$win.nlog(data.msg+data.code)
		}
	},
	get_getMyCoupon(state,data){
		console.log(data,'我的优惠券列表');
		if(data&&data.code==0){
			// state.mygoodList=data.page.list
			let arr=data.page.list
			if(data.page.list.length)
			{
				
				for(let i=0;i<data.page.list.length;i++)
				{
					arr[i].bool=false
				}
			}
			state.mygoodList=arr
		}else{
			this.$win.nlog(data.msg+data.code)
		}
	},
	changeBool(state,index){
		state.mygoodList[index].bool=!state.mygoodList[index].bool
	},
	get_postCouponSave(state,data){
		console.log(data,'发送优惠劵的id');
		if(data&& data.code==0){
			state.mygoodListReturn=data.page.list
			this.$win.nlog('领取成功')
		}
		else if(data&& data.code==306){
			this.$win.nlog('该优惠卷已经领过了')
		}
		else if(data&& data.code==302){
			this.$win.nlog('还未到领取的时间')
		}
		else if(data&& data.code==303){
			this.$win.nlog('领取的时间已经过了')
		}
	},
	post_postSelectCoupon(state,data){
		console.log(data,'选择优惠劵');
		if(data&& data.code==0){
			state.selectCoupon=data.data.order
			// state.selectCoupon=data.page
			// state.selectCoupon
			// state.order=data.data.order.realPrice
			// console.log(data.data.order)
			console.log(state.selectCoupon)
			
			console.log('goods我是选择订单后生成的信息')
		}else{
			this.$win.nlog(data.msg+data.code)
		}
	},
	set_pintuanList(state,data){
		state.pintuanList=data
	},
	push_pintuanList(state,data){
		state.pintuanList=state.pintuanList.concat(data)
	}
}

export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}