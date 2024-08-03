import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'
import db from '@/system/core/nardy.db.js'

//获取预约规则
export function getBookingRule(params){     
	let url=config.apis.BOOKINGRULE
	console.log(params)
	return http.post(url,params)
}

//获取预约练车的记录
export function getPracticeRecord(params){
	let url=config.apis.PRACTICERECORDLIST+'/?token='+db.getSync('token')
	return http.post(url,params)
}

//获取预约考试的记录
export function getExamRecord(params){
	let url=config.apis.EXAMRECORDLIST
	return http.post(url,params)
}

//预约练车
export function toBookingPractice(params){
	let url=config.apis.PRACTICEBOOKING+'/?token='+db.getSync('token')
	return http.post(url,params)
}

//获取练车时间段
export function getPTime(params){
	let url =config.apis.PTIME
	return http.post(url,params)
}

//获取练车场地列表
export function getSite(params){
	let url =config.apis.GETSITE+'/'+params.userId
	return http.get(url,params)
}


//预约考试
export function toBookingExam(params){
	let url=config.apis.EXAMBOOKING
	return http.post(url,params)
}

//学员评价教练
export function pingjia(params){
	let url=config.apis.PINGJIACOACH
	return http.post(url,params)
}

//取消预约
export function postCanel(params){
	let url=config.apis.POSTCNANECEL
	return http.post(url,params)
}