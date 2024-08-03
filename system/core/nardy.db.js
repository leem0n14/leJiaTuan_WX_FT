"use strict";
import fns from "./nardy.fns.js";

// #ifdef APP-NVUE || APP-PLUS || APP-PLUS-NVUE || APP-VUE
import clipboard from "../libs/clipboard/clipboard.js"
// #endif

export default {
	async set(key, val) {
		let defer = fns.defer();
		uni.setStorage({
			key, data: val,
			success() {
				defer.resolve();
			},
			fail() {
				defer.resolve(new Error("DB set error!"));
			}
		});
		return defer.promise;
	},
	async get(key) {
		let defer = fns.defer();
		uni.getStorage({
			key,
			success(res) {
				if(res.errMsg === "getStorage:ok"){
					defer.resolve(res.data);
				}else{
					defer.resolve(null);
				}
			},
			fail() {
				defer.resolve(null);
			}
		})
		return defer.promise;
	},
	async remove(key) {
		let defer = fns.defer();
		uni.removeStorage({
			key,
			success() {
				defer.resolve();
			},
			fail() {
				defer.resolve(new Error("DB remove error"));
			}
		})
		return defer.promise;
	},
	async clear(excludeKeys = []) {
		if(excludeKeys.length) {	//部分删除
			let {keys} = await this.info();
			keys = keys.filter(k => !excludeKeys.includes(k))
			for(let key of keys) {
				await this.remove(key);
			}
			return
		}
		uni.clearStorage()
	},
	async info() {
		let defer = fns.defer();
		uni.getStorageInfo({
			success(res) {
				defer.resolve(defer);
			},
			fail() {
				defer.resolve(null);
			}
		});
		return defer.promise;
	},
	setSync(key, val) {
		try {
			uni.setStorageSync(key, val)
		} catch(e) {}
	},
	getSync(key) {
		return uni.getStorageSync(key)
	},
	removeSync(key) {
		uni.removeStorageSync(key)
	},
	clearSync() {
		uni.clearStorageSync()
	},
	infoSync() {
		return uni.getStorageInfoSync();
	},
	clipboard: {
		async get() {
			const [err, res] = await uni.getClipboardData({});
			return err ? null : res.data;
		},
		/**
		 * 设置粘贴板
		 * @param {String} 数据
		 * @param {Boolean}  是否屏蔽轻提示
		 */
		async set(data, no_tips = false) {
			// #ifdef APP-NVUE || APP-PLUS || APP-PLUS-NVUE || APP-VUE
			if(no_tips) {
				clipboard.setText(data);
				return true;
			}
			// #endif
			let [err] = await uni.setClipboardData({
				data
			});
			return !err;
		}
	}
};