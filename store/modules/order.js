//订单
"use strict";
import {
	allOrderList,
	payOrderList,
	nopayOrderList,
	cancelOrder,
} from '@/api/order.js'

const state = {
	orderList: [],
	allOrder: [],
	payOrder: [],
	nopayOrder: [],
	pageSize: 10,
	pageIndex: 1,
}

const getters = {

}


const actions = {
	//获取全部订单
	async allOrderList({
		commit
	}, params) {
		this.$win.loading('正在获取订单信息')
		let res = await allOrderList(params)
		this.$win.close('l')
		if (res && res.code === 0){
			if (params.page == 1) {
				commit('allOrder', res)
			} else {
				commit('pushPage', res)
			}
		}
		

	},
	//获取已支付的订单
	async payOrderList({
		commit
	}, params) {
		this.$win.loading('正在获取订单信息')
		let res = await payOrderList(params)
		this.$win.close('l')
		// console.log('。。', params.page);
		if (res && res.code === 0){
			if (params.page == 1) {
				commit('payOrder', res)
			} else {
				commit('pushPage', res)
			}
		}
		

	},
	//获取未支付的订单
	async nopayOrderList({
		commit
	}, params) {
		this.$win.loading('正在获取订单信息')
		let res = await nopayOrderList(params)
		this.$win.close('l')
		if (res && res.code === 0) {
			if (params.page == 1) {
				commit('nopayOrder', res)
			} else {
				commit('pushPage', res)
				// console.log('>?>');
			}
		}

	},

	//取消订单
	async cancelOrder({
		commit
	}, params) {
		if(params.i===2){
			this.$win.loading('正在申请退款')
			let res = await cancelOrder(params)
			this.$win.close('l')
			if (res.code == 0) {
				// this.$win.back()
				this.$win.nlog('申请成功')
			}
		}else{
			this.$win.loading('正在取消订单')
			let res = await cancelOrder(params)
			this.$win.close('l')
			if (res.code == 0) {
				this.$win.back()
				this.$win.nlog('取消成功')
			}
		}
		
		// commit('',res)
	}
}


const mutations = {
	//全部订单
	allOrder(state, data) {
		// console.log('全部订单', data);
		// state.allOrder=data.page.list
		state.orderList = data.page.list
	},
	//未支付或已支付订单
	payOrder(state, data) {
		console.log('已支付订单', data);
		// state.payOrder=data.page.list
		state.orderList = data.page.list
	},
	//未支付订单
	nopayOrder(state, data) {
		// console.log('未支付订单', data);
		// state.nopayOrder=data.page.list
		state.orderList = data.page.list
	},
	//拼接下一页
	pushPage(state, data) {
		if (data.code == 0) {
			if (data.page.list.length == 0) {
				this.$win.nlog('暂无更多数据')
			} else {
				state.orderList = state.orderList.concat(data.page.list)
			}

		} else {
			this.$win.nlog('获取失败')
		}


	},
	//清除页数
	clearPage(state) {

		state.pageIndex = 1
	}
}


export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}