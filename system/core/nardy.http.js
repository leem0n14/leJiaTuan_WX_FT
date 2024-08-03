import conf from "../../conf";

let config = {
	before: function() {},
	after: function(res) {
		return res;
	}
};
Object.assign(config, conf.http || {});

export default {
	async request(opts = {}, callback) {
		if(!opts.data) {opts.data = {}};
		// #ifdef APP-NVUE
		opts.data.__device = "app-nvue";
		// #endif
		// #ifdef APP-PLUS-NVUE
		opts.data.__device = "app-plus-nvue";
		// #endif
		// #ifdef APP-PLUS
		opts.data.__device = "plus";
		// #endif
		// #ifdef H5
		opts.data.__device = "h5";
		// #endif
		// #ifdef MP-WEIXIN
		opts.data.__device = "wechat";
		// #endif
		// #ifdef MP-ALIPAY
		opts.data.__device = "alipay";
		// #endif
		// #ifdef MP-BAIDU
		opts.data.__device = "baidu";
		// #endif
		// #ifdef MP-TOUTIAO
		opts.data.__device = "toutiao";
		// #endif
		if(!opts.header) {opts.header = {}};
		if(typeof config.before === 'function') {
			await Promise.resolve(config.before(opts, this));
		}
		return new Promise((resolve) => {
			let task = uni.request({
				...opts,
				success: res => {
					if(typeof config.after === 'function') {
						Promise
							.resolve(config.after(res, opts, this))
							.then((result) => resolve(result && result.data));
					} else {
						resolve(res.data);
					}
				},
				fail: err => {
					let res = {}
					res.data = {
						errcode: 20000,
						errmsg: err.code || "NETWORK_EERROR",
						description: err.message || "网络请求失败"
					}
					if(typeof config.after === 'function') {
						Promise
							.resolve(config.after(res, opts, this))
							.then((result) => resolve(result && result.data));
					} else {
						resolve(res.data);
					}
				}
			});
			if(typeof callback === 'function') {
				callback(task);
			}
		});
	},
	async get(opts = {}) {
		if(typeof opts === 'string') {
			opts = {
				url: opts
			}
		}
		opts.method = "GET";
		let result = await this.request(opts);
		return result;
	},
	async post(opts = {}, data = {}) {
		if(typeof opts == "string") {
			opts = {
				url: opts,
				header:data.header||null,
				data,
			};
		} else {
			opts.data = data || opts.data;
		}
		opts.method = "POST";
		let result = await this.request(opts);
		return result;
	},
	upload(opts = {}) {
		opts.header = opts.header || {};
		config.before(opts, true)
		let result = uni.uploadFile(opts);
		let onProgressUpdate = opts.onProgressUpdate || (() => {});
		let onHeadersReceived = opts.onHeaderReceived || (() => {});
		result.onProgressUpdate(onProgressUpdate);
		result.onHeadersReceived(onHeadersReceived);
		return result;
	},
	async download(url, opts = {}) {
		opts = Object.assign(opts, {
			url
		});
		opts.header = opts.header || {};
		config.before(opts);
		return await uni.downloadFile(opts);
	},
	parse(obj = {}) {
		let str = [];
		let keys = Object.keys(obj);
		for(let key of keys) {
			let val = obj[key];
			if(typeof val !== "object") {
				str.push(key + "=" + encodeURIComponent(val))
			} else {
				str.push(key + "=" + encodeURIComponent(JSON.stringify(val)))
			}
		}
		return str.join("&")
	}
};