//订单
import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'
import db from '@/system/core/nardy.db.js'

//全部订单列表
export function allOrderList(params){
	let url = config.apis.ALLORDERLIST+'?userId='+db.getSync('userId')+'&limit='+params.limit+'&page='+params.page
	return http.get(url,params)
}

//已支付订单列表
export function payOrderList(params){
	let url = config.apis.PAYORDERLIST+'?userId='+db.getSync('userId')+'&limit='+params.limit+'&page='+params.page
	return http.get(url,params)
}

//未支付订单列表
export function nopayOrderList(params){
	let url = config.apis.NOPAYORDERLIST+'?userId='+db.getSync('userId')+'&limit='+params.limit+'&page='+params.page
	return http.get(url,params)
}

//取消订单
export function cancelOrder(params){
	let url = config.apis.CANCELORDER
	return http.post(url,params)
}