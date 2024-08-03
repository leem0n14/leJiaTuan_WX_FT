import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'
import db from '@/system/core/nardy.db.js'
// import conf from '@/conf.js'

//教练端用户信息获取
export function coachGetMsg(params){
	let url=config.apis.COACHMSG+'/?token='+db.getSync('token')
	return http.post(url,params)
}

//学员管理
export function studentManage(params){
	let url=config.apis.STUDENTMANAGE
	return http.post(url,params)
}

//学员预约
export function studentBooking(params){
	let url=config.apis.STUDENTBOOKING
	return http.post(url,params)
}

//车辆管理
export function carManage(params){
	let url=config.apis.CARMANAGE
	return http.post(url,params)
}



//打卡
export function check(params){
	let url =config.apis.CHECK
	return http.post(url,params)
}

//获取教练车辆
export function getCars(params){
	let url =config.apis.GETCARS+params.userId
	return http.get(url,params)
}

//添加车辆
export function addCar(params){
	let url=config.apis.ADDCAR
	return http.post(url,params)
}

//添加车辆保险
export function addInsure(params){
	let url=config.apis.ADDINSURE
	return http.post(url,params)
}

//添加车辆保养
export function addMain(params){
	let url=config.apis.ADDMAIN
	return http.post(url,params)
}

//添加车辆维修
export function addFix(params){
	let url=config.apis.ADDFIX
	return http.post(url,params)
}

//添加车辆出险
export function addAcc(params){
	let url=config.apis.ADDACC
	return http.post(url,params)
}

//获取某车具体信息
export function getCarMsg(params){
	let url=config.apis.GETCARMSG+'/'+params.id
	return http.get(url,params)
}

//获取某车记录条数
export function getRecordNum(params){
	let url =config.apis.RECORDNUM
	return http.post(url,params)
}

//保险列表
export function insureList(params){
	let url=config.apis.INSURELIST+'?carId='+params.carId
	return http.get(url,params)
}
//保养列表
export function mainList(params){
	let url=config.apis.MAINLIST+'?carId='+params.carId
	return http.get(url,params)
}
//出险列表
export function accList(params){
	let url=config.apis.ACCLIST+'?carId='+params.carId
	return http.get(url,params)
}
//维修列表
export function fixList(params){
	let url=config.apis.FIXLIST+'?carId='+params.carId
	return http.get(url,params)
}

//教练端修改预约完成
export function postcoachUpdate(params){
	let url=config.apis.POSTUPDATE+'?carId='+params.carId+'&userId='+params.userId+'&id='+params.id
	return http.post(url,params)
}

// 教练端车辆列表
export function getListCar(params){
	let url=config.apis.GETLISTCAR+'/'+params.id
	return http.get(url,params)
}

// 教练所拥车辆列表
export function getFenListCar(params){
	let url=config.apis.GETFENLISTCAR+'?userId='+params.userId
	return http.get(url,params)
}

//练车完成
export function getFenUpdate(params){
	let url=config.apis.POSTFENUPDATE
	return http.post(url,params)
}

//车辆删除
export function postCoachDelate(params){
	let url=config.apis.DELATECAR
	return http.post(url,params)
}

//获取学员具体信息
export function getStuDetail(params){
	let url =config.apis.GETSTUDETAIL+`/${params.stuId}`
	return http.get(url,params)
}