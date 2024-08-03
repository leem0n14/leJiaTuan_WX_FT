"use strict";
import win from "./system/core/nardy.win";
import db from "./system/core/nardy.db";
import fns from "./system/core/nardy.fns"
import apis from "./apis.js";

let BASE_HOST = "https://wx.lejiatuan.cn/data/lejiatuan";  //这里配置全局域名
// http://119.91.194.65:8080/renren-fast/
let CDN_HOST = 'https://wx.lejiatuan.cn/data/lejiatuan/super';	//全局图片、资源的域名
let UPDATE_HOST = "";

let miniProgram = null;
// #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ
miniProgram = uni.getAccountInfoSync().miniProgram;
// #endif
export default {
	BASE_HOST, CDN_HOST, UPDATE_HOST,
	apis: apis.create(BASE_HOST), //创建apis
	// http请求配置
	http: {
		// 请求前拦截器
		before(opts) {
			//Authorization
			if (miniProgram) {
				opts.header.appid = miniProgram.appId;
			}
			opts.header.Authorization = opts.header.Authorization || db.getSync("token")
			opts.header.token = opts.header.token || db.getSync("token")
			// opts.header.userId = opts.header.userId || db.getSync("userId")
		},
		// 返回后拦截器
		async after(res, error, http) {
			// console.log(res);
				//10005，后端定义的未登录返回码
			if (res.data.code == 401 && !getApp().globalData.loginNow) { //统一规范,跳转登录页面
				await db.removeSync("token")
				await db.removeSync('userId')
				// await db.removeSync('avatarUrl')
				// await db.removeSync('nickName')
				// win.show("/page_login/login");
				// console.log('token过期')
				return false
			}
			/*
			if (res.data.errcode !== 0) {
				win.toast(res.data.description?res.data.description:'请求接口有误');
				return false
			}
			*/
			return res
		}
	}
};
