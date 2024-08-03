import win from "./nardy.win";
import http from "./nardy.http";
import config from "../../conf.js";

/**
 * 内置一些功能函数,如升级,分享等
 */
export default {
	/**
	 * 应用更新
	 * @param {Boolean} isInternalUpdate 是否内部更新,默认为false,
	 * 	如果为true, 则会跳转到浏览器
	 */
	async update(isInternalUpdate = false) {
		// #ifdef MP-ALIPAY || MP-BAIDU || MP-QQ || MP-TOUTIAO || MP-WEIXIN
		let updateMgr = uni.getUpdateManager();
		updateMgr.onCheckForUpdate(res => {
			if (res.hasUpdate) {
				return;
			}
		});
		updateMgr.onUpdateReady(async () => {
			win.close("l");
			let [err, res] = await win.confirm("更新提示", "新版本已准备就绪，是否立刻更新？");
			if (!err && res.confirm) {
				updateMgr.applyUpdate();
			}
		});
		updateMgr.onUpdateFailed(function(res) {
			win.close("l");
			win.confirm("更新提示", "小程序更新失败，请检查您的网络连接！");
		});
		// #endif
		// #ifdef APP-NVUE || APP-PLUS || APP-PLUS-NVUE || APP-VUE
		//这里APP更新,后续完善
		const updateHost = config.UPDATE_HOST
			|| (config.BASE_HOST + "/?_act=app.update");
		if(!updateHost || !/^http[s]?:/.test(updateHost)) {
			return win.confirm("更新失败", "未设置更新路径")
		}
		let result = await http.post(updateHost, {
			appid: plus.runtime.appid,
			version: plus.runtime.version
		});
		/**
		 * 返回的字段如下:
		 {
			 status: 0,	//更新状态,0为没有更新,1为有更新
			 note: "更新描述",
			 url: "https://www.xxx.com/app/to/download/url"
		 }
		 */
		if(result.data.status !== 1) {
			return;
		}
		let [err, res] = await win.confirm(
			"更新提示",
			result.data.note|| "有可用更新!"
		);
		if(err || !res.confirm) {
			return;
		}
		if(!isInternalUpdate) {
			//如果不是APP内部安装,则跳转浏览器下载
			plus.runtime.openURL(result.data.url);
			return;
		}
		//APP内部安装
		let task = plus.downloader.createDownload(result.data.url, {
		}, function(d, status) {
			if(status == 200) {
				const fsUrl = plus.io.convertLocalFileSystemURL(d.name);
				plus.runtime.install(fsUrl, {}, {}, function(err) {
					if(err) {
						win.toast("安装失败!")
					}
				})
				return;
			}
			win.toast("更新失败!")
		});
		task.start();
		// #endif
	}
}