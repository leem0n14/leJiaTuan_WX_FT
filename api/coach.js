import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

//获取教练列表
export function getCoachList(params) {
	//post请求
	let url = config.apis.GETCOACHLIST
	// +'/'+this.$db.getSync('token')
	return http.post(url,params)
}

//获取该城市的驾校
export function getCitySchool(params){
	let url =config.apis.GETCITYSCHOOLS
	return http.post(url,params)
}

//按驾校查询教练
export function getCoachBySchool(params){
	let url =config.apis.SELECT
	return http.post(url,params)
}

//查看某教练的具体信息
export function coachDetail(params){
	console.log('rd',params.id);
	let url =config.apis.COACHDETAIL+'/'+params.id
	return http.get(url,params)
}

//获取我的教练信息
export function getMyCoachMsg(params){
	let url =config.apis.MYCOACH
	// +'/'+params.userId
	return http.post(url,params)
}

//成为教练
export function beCoach(params){
	let url =config.apis.BECOACH
	return http.post(url,params)
}
