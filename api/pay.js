import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

//微信支付
export function wxPay(params) {
	let url = config.apis.WXPAY
	return http.post(url,params)
}


//生成订单
export function cteateOrder(params){
	let url = config.apis.CTEATEORDER
	return http.post(url,params)
}

//支付成功后的订单信息
export function paySuccess(params){
	let url = config.apis.PAYSUCCESS+'/'+params.id
	return http.get(url,params)
}