"use strict";
import types from "./core/nardy.types";

export default {
	extend(lopts = {}, ropts = {}) {
		for(let key in ropts) {
			let val = ropts[key];
			if(types.isUndefined(lopts[key])) {
				lopts[key] = val;
				continue;
			}
			if(types.isObject(lopts[key])
				&& types.isObject(val)) {
				this.extend(lopts[key], val);
				continue;
			}
			//分类处理
			if(types.isFunction(val)
				&& types.isFunction(lopts[key])) {
				(function(target, k, fn) {
					let _fn = target[k];
					target[k] = function() {
						let lres = _fn.apply(this, arguments) || {};
						let rres = fn.apply(this, arguments) || {};
						return {
							...lres,
							...rres
						}
					}
				})(lopts, key, val);
				continue;
			}
		}
		return lopts;
	}
};