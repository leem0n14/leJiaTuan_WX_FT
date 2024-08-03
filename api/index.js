import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

// 获取轮播图
export function getCarousel(params){
	let url =config.apis.GETCAROUSEL
	return http.post(url,params)
}

// 获取轮播公告
export function getTannouncement(params){
	let url =config.apis.GETANNOUNCEMENT
	return http.post(url,params)
}

// 获取秒杀
export function getMiaosha(params){
	let url =config.apis.GETMIAOSHA
	return http.post(url,params)
}

// 获取拼团
export function getPintuan(params){
	let url =config.apis.GETPINTUAN
	return http.post(url,params)
}

// 获取热门商品
export function getHotGoods(params){
	let url =config.apis.GETHOTGOODS
	return http.post(url,params)
}