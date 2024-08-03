import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'
import db from '@/system/core/nardy.db.js'

//授权登陆
export function login(params) {
	let url = config.apis.LOGIN
	//url = /app/wxlogin
	return http.post(url,params)
}

//获取手机号
export function getPhone(params){
	let url =config.apis.WXPHONE
	return http.post(url,params)
}

//获取用户注册状态
export function getUserState(params){
	let url =config.apis.USERSTATE+db.getSync('userId')+'/?token='+db.getSync('token')
	return http.get(url,params)
}

//注册信息保存
export function saveUserMsg(params){
	let url =config.apis.SAVEUSERMSG+'/?token='+db.getSync('token')
	return http.post(url,params)
}

//获取用户题库信息
export function getUserTikuMsg(params){
	let url =config.apis.GETUSERTIKU
	return http.post(url,params)
}

//更改题库
export function changeTiku(params){
	let url=config.apis.CHANGETIKU
	return http.post(url,params)
} 

//意见反馈
export function feedBack(params){
	let url =config.apis.FEEDBACK+'/?token='+db.getSync('token')
	return http.post(url,params)
}



//获取用户的基本信息
export function getUserInfo(params){
	let url =config.apis.USERINFO
	return http.post(url,params)
}

// 获取二维码
export function getQRcode(params){
	let url =config.apis.GETQRCODE
	return http.post(url,params)
}


//身份认证
export function saveStatus(params){
	let url =config.apis.SAVESTATUS
	return http.post(url,params)
}

//获取个人信息
export function getPersonMsg(params){
	let url =config.apis.GETPERSONMSG
	return http.post(url,params)
}

//设置or修改个人信息
export function setPersonMsg(params){
	let url =config.apis.SETPERSONMSG
	return http.post(url,params)
}

