"use strict";
import fns from "./nardy.fns";

let isMqRunning = Symbol("isMqRunning");
let toasts = Symbol("toasts");
let toastRunner = Symbol("toastRunner");
let addToast = Symbol("addToast");

export default {
	[isMqRunning]: false,
	[toasts]: [],
	[toastRunner]() {
		//toast消息执行队列
		let tips = this[toasts].shift();
		if (!tips) {
			this[isMqRunning] = false;
			return;
		}
		uni.showToast(tips);
		setTimeout(() => {
			this[toastRunner]();
		}, 500);
	},
	[addToast](tips) {
		if (!tips || !tips.title) return;
		this[toasts].push(tips);
		if (!this[isMqRunning]) {
			this[isMqRunning] = true;
			this[toastRunner]();
		}
	},
	info(title, opts = {}) {
		opts.title = title;
		this[addToast](opts);
	},
	nlog(title) {
		this[addToast]({
			title,
			position: "bottom",
			icon: "none"
		})
	},
	toast(title) {
		this[addToast]({
			title,
			icon: "none"
		})
	},
	loading(title, showMask = true) {
		return uni.showLoading({
			title,
			mask: showMask
		});
	},
	alert(title, content, opts = {}) {
		return this.confirm(title, content, {
			showCancel: false,
			...opts
		});
	},
	confirm(title, content, opts = {}) {
		opts.title = title;
		opts.content = content;
		return uni.showModal(opts);
	},
	close(type = "all") {
		if (type == 'all') {
			uni.hideToast();
			uni.hideLoading();
		} else if (type == "l") {
			uni.hideLoading();
		} else if (type == "t") {
			uni.hideToast();
		}
	},
	//关掉当前页面，然后打开一个新页面，不可以使用uni.navigateBack返回原页面
	async go(url = "", opts = {}) {
		if (!url) return;
		let defer = fns.defer();
		setTimeout(() => {
			defer.resolve(false);
		}, 100)
		uni.redirectTo({
			...opts,
			url,
			success() {
				defer.resolve(true);
			},
			fail() {
				defer.resolve(false);
			}
		});
		return defer.promise;
	},
	//打开一个新页面，可以使用uni.navigateBack返回原页面
	show(url = "", aniType = "pop-in", options = {}) {
		options.animationType = aniType;
		if (!url) return;
		uni.navigateTo({
			...options,
			url
		})
	},
	//返回前delta个页面
	back(delta = 1) {
		uni.navigateBack({
			delta
		});
	}
};