"use strict";
import {
	wxPay,
	cteateOrder,
	paySuccess,
	changePrice,
	postCouponSave,
} from '@/api/pay.js'

import {
	postSelectCoupon,
} from '@/api/goods.js';

import db from "@/system/core/nardy.db.js";


const state = {
	wxPayRes: {},
	order: {},
	good: {},
	user: {},
	paySuccess: {},
	selectCoupon:{},
	price:0
}

const getters = {

}

const actions = {
	//微信支付
	async wxPay({
		commit
	}, params) {
		let res = await wxPay(params)
		commit('wxpay', res)
		if (res && res.code == 0) {
			commit('wxRequestPay', {
				res: res.data,
				params
			})
		} else if(res.code===220) {
			//价格为零的商品
			this.$win.nlog('购买成功')
			this.$win.go('/page_shopping/paySuccess?id=' + params.id)
		}else{
			this.$win.nlog(res.code + res.msg)
		}
	},
	//生成订单
	async cteateOrder({
		commit
	}, params) {
		let res = await cteateOrder(params)
		if(res.msg==='商品已售空'){
			this.$win.back()
			this.$win.nlog(res.msg)
			return
		}
		commit('cteateOrder', res)
	},
	//支付成功订单页面
	async paySuccess({
		commit
	}, params) {
		this.$win.loading('数据请求中')
		let res = await paySuccess(params)
		this.$win.close('l')
		if (res.code == 0 && res)
			commit('set_paySuccess', res)
		else {
			this.$win.nlog(res.msg)
		}
	},
	
	async postSelectCoupon({commit},params){
		// console.log('进入')
		let res=await postSelectCoupon(params)
		// console.log(res)
		// console.log("上面是选择优惠卷的pay")
		commit('post_postSelectCoupon',res)
	},
}

const mutations = {
	wxpay(state, data) {
		console.log('微信支付', data);
	},

	//微信支付接口
	wxRequestPay(state, data) {
		// console.log(data);
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: data.res.timeStamp,
			nonceStr: data.res.nonceStr,
			package: data.res.package,
			signType: data.res.signType,
			paySign: data.res.paySign,
			// partnerid: '',      // 微信支付商户号
			// prepayid: data.prepay_id,
			appid: data.res.appId,
			success: (res) => {
				// console.log(res, '支付成功');
				this.$win.nlog('支付成功')
				//带订单号跳转支付成功页面
				this.$win.go('/page_shopping/paySuccess?id=' + data.params.id)
			},
			fail: (err) => {
				// console.log(err, '支付失败');
				this.$win.nlog('支付失败：' + err.errMsg)
			}
		})
	},

	//生成订单
	cteateOrder(state, data) {
		// console.log('生成订单', data);
		state.order = data.data.order
		state.user = data.data.user
		state.good = data.data.good
		state.selectCoupon = data.data.coupon
		// this.set_paySuccess()
	},
	set_cteateOrder(state,data){
		state.selectCoupon=data
		state.order = data.data.order
		// console.log(state.order);
	},
	//支付成功页面信息
	set_paySuccess(state, data) {
		// console.log('');
		state.paySuccess = data.order
		// state.order = data.data.order
		state.order = data.order
	},

	changePrice(state,data){
			// if(data.amount)
			
			state.price=data
			console.log(data)
	},
	
	set_postSelectCoupon(state,data){
		state.selectCoupon=data
		console.log(state.selectCoupon);
	},
	post_postSelectCoupon(state,data){
		console.log(data,'选择优惠劵');
		if(data&& data.code==0){
			
			state.order.realPrice=data.data.order.realPrice
			// console.log(data.data.order)
			console.log(state.order.realPrice)
			console.log('pay我是选择订单后生成的信息')
			this.$win.nlog('使用成功')
		}else{
			this.$win.nlog(data.msg+data.code)
		}
	},
}

export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}