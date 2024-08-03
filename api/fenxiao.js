import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

//获取我的分销信息
export function getMyFenxiaoMsg(params) {
let url=config.apis.MYFENXIAOMSG
return http.post(url,params)
}

//历史收益
export function historyIn(params){
	let url=config.apis.HISTORYINCOME
	return http.post(url,params)
}

//分享订单
export function shareOrder(params){
	let url=config.apis.SHAREORDER
	return http.post(url,params)
}

//分享团队
export function shareTeam(params){
	let url=config.apis.SHARETUAN
	return http.post(url,params)
}

//某人的订单
export function getSomeBodyOrder(params){
	let url =config.apis.SOMEBODYORDER
	return http.post(url,params)
}

//提现列表
export function getMoneyList(params){
	let url =config.apis.GETMONEYLIST
	return http.post(url,params)
}

//提现
export function getMoney(params){
	let url =config.apis.GETMONEY
	return http.post(url,params)
}