
export default {
	/**
	 * 兼容getSetting
	 * 	注:微信小程序在2.10.1里面加入了withSubscriptions参数, 参考:https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html
	 */
	getSetting(opts = {}) {
		// #ifdef MP-WEIXIN
		return wx.getSetting(opts)
		// #endif
		// #ifndef MP-WEIXIN
		return uni.getSetting(opts)
		// #endif
	}
};