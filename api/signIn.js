import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'
import db from '@/system/core/nardy.db.js'

//签到
export function toSignIn(params){
	let url =config.apis.TOSIGN+'/?token='+db.getSync('token')
	return http.post(url,params)
}
//签到天数
export function getSignInDays(params){
	let url =config.apis.GETSIGNDAYS+'/?token='+db.getSync('token')
	return http.post(url,params)
}

//当天是否签到
export function isSignIn(params){
	let url =config.apis.ISSIGNIN+'/?token='+db.getSync('token')
	return http.post(url,params)
}


//查看积分明细
export function seeRecord(params){
	let url =config.apis.SEERECORD+'/?token='+db.getSync('token')
	return http.post(url,params)
}

//获取积分商城的商品信息
export function getShop(params){
	let url =config.apis.GOODSSHOP
	return http.post(url,params)
}