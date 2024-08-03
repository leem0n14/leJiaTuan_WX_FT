import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

//获取我的学习进度
export function getStudyProgress(params){
	let url =config.apis.GETSTUDYPROGRESS
	return http.post(url,params)
}

//获取报名信息列表
export function getBaomingList(params){
	let url=config.apis.MYBAOMING+`?userId=${params.userId}`
	return http.get(url,params)
}

//修改报名信息
export function subBaoming(params){
	let url=config.apis.SUBBAOMING
	return http.post(url,params)
}

