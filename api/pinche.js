import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

//计算拼车价格
export function countPrice(params) {
	let url = config.apis.COUNTPRICE
	return http.post(url,params)
}

//拼车列表coach
export function PcLiCoach(params) {
	// if(params.type)
	let url = config.apis.PINCHELICOACH
	return http.post(url,params)
}

//拼车列表stu
export function PcLiStu(params) {
	let url = config.apis.PINCHELISTU
	return http.post(url,params)
}

//拼车列表
export function pcLi(params) {
	console.log('传入',params.type);
	let url
	if(params.type>=0){
		 // url = config.apis.PCLIST+params.type
		 url =config.apis.PCLISTWC
	}
	else{
		url = config.apis.PCLIST
	}
	return http.post(url,params)
}

//发起拼车
export function toPc(params) {
	let url = config.apis.TOPINCHE
	return http.post(url,params)
}

//接单
export function jiedan(params){
	let url=config.apis.PCJD
	return http.post(url,params)
}