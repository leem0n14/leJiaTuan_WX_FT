import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

//获得某类型的列表
export function getListByType(params) {
	let url = config.apis.GETLIST
	return http.post(url,params)
}

//获得类型列表
export function getTypeList(params){
	let url = config.apis.GETTYPESLIST
	return http.post(url,params)
}