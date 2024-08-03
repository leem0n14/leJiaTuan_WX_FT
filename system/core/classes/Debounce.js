"use strict";

const InternalHandler = Symbol();
const RunHandler = Symbol();

export default class Debounce {
	
	#timerid = null;
	#func = null;
	#opts = {
		wait: 1000
	};
	
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
		if(this.#timerid) {
			clearTimeout(this.#timerid);
			this.#timerid = null;
		}
		this.#timerid = setTimeout(() => {
			this.#func.apply(context, args)
		}, this.#opts.wait);
	}
	
}