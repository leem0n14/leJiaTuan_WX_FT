import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

//商品分类
export function getTypes(params){
	let url =config.apis.TYPES
	return http.post(url,params)
}

//拼团列表
export function getPintuanList(params){
	let url=config.apis.PINTUANLIST+`?userId=${params.userId}&page=${params.page}&limit=${params.limit}`
	return http.get(url,params)
}

//获取我的拼团
export function getPintuan(params){
	let url =config.apis.MYPINTUAN+`/${params.id}`
	return http.get(url,params)
}


//获取商品具体信息
export function getGoodMsg(params){
	let url=config.apis.GETGOODMSG
	return http.post(url,params)
}

//获取优惠劵列表
export function getGetCoupon(params){
	let url=config.apis.GETCOUPON
	return http.get(url,params)
}

//获取优惠劵具体信息
export function getGetCouponDetail(params){
	let url=config.apis.GETCOUPONDETAIL+'/'+params.batchId
	return http.get(url,params)
}

//发优惠券的id
export function postCouponSave(params){
	let url=config.apis.POSTCOUPONSAVE+"?userId="+params.userId+"&batchId="+params.batchId
	return http.post(url,params)
}

//获取用户的的优惠劵
export function getGetMyCoupon(params){
	let url=config.apis.GETMYCOUPON+"?userId="+params.userId
	return http.get(url,params)
}

//获取用户的优惠劵具体信息
// export function getGetCouponDetail(params){
// 	let url=config.apis.GETMYCOUPONINFO+'/'+params.batchId
// 	return http.get(url,params)
// }

//选择订单的优惠劵
export function postSelectCoupon(params){
	let url=config.apis.SELSECTCONPOU+"?couponId="+params.couponId+"&id="+params.id+"&amount="+params.amount
	return http.post(url,params)
}