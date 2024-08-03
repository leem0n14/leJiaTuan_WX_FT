"use strict";

export default class Throttle {
	
	#timerid = null;
	#func = null;
	#opts = {
		wait: 1000
	};
	
	#prev = Date.now();
	
	constructor(func, options = {}) {
	    if(typeof func !== "function") {
			throw new Error("func必须为一个函数!");
		}
		this.#func = func;
		if(toString.call(options) === "[object Object]") {
			Object.assign(this.#opts, options);
		} else if(typeof options === "number" && options > 0) {
			this.#opts.wait = options;
		}
	}
	
	run(context, args) {
		const now = Date.now();
		if(now - this.#prev >= this.#opts.wait) {
			Promise.resolve(this.#func.apply(context, args))
				.then(ret => {
				this.#prev = Date.now();	//等待结果返回后，再进行记录时间
			}).catch(e => {
				this.#prev = Date.now();
				throw e;
			})
		}
	}
}