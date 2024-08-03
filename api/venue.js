// import conf from '@/conf.js'
import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

// 获取场地列表
export function getVenueList(params){
	let url =config.apis.GETVENUELIST
	return http.post(url,params)
}

// 获取场地名字列表
export function getVenueNameList(params){
	let url =config.apis.GETVENUENAMELIST
	return http.post(url,params)
}

// 获取场地图片列表
export function getVenuePhotoList(params){
	let url =config.apis.GETVENUEPHOTOLIST+'/'+params.id
	return http.get(url,params)
}

//获取某驾校的详细
export function getSchoolDetail(params){
	console.log('??',params.id);
	let url=config.apis.GETSCHOOLDETAIL+'/'+params.id
	return http.get(url,params)
}

//获取驾校列表
export function getSchool(params){
	let url=config.apis.GETSCHOOLLIST
	return http.get(url,params)
}

//根据id拿场地列表
export function getVenueListById(params){
	let url=config.apis.GETVENUEBYID
	// +'/'+params.userId
	return http.post(url,params)
}
