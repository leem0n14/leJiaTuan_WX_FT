"use strict";

export default {
	getType(object) {
		let t = toString.call(object).split(" ")[1];
		return t.substr(0, t.length - 1);
	},
	isArray(obj) {
		return Array.isArray(obj);
	},
	isBuffer(obj) {
		return Buffer.isBuffer(obj);
	},
	isString(obj) {
		return this.getType(obj) === "String";
	},
	isObject(obj) {
		return this.getType(obj) === "Object";
	},
	isUndefined(obj) {
		return this.getType(obj) === "Undefined";
	},
	isNull(obj) {
		return this.getType(obj) === "Null";
	},
	isDate(obj) {
		return this.getType(obj) === "Date";
	},
	isRegExp(obj) {
		return this.getType(obj) === "RegExp";
	},
	isNumber(obj) {
		return !isNaN(obj) && this.getType(obj) === "Number";
	},
	isFunction(obj) {
		return this.getType(obj) === "Function";
	},
	isEmpty(obj) {
		if(!obj) return true;
		if(this.isObject(obj)) {
			return Object.keys(obj).length;
		}
		if(this.isArray(obj)) {
			return obj.length;
		}
		if(this.isDate(obj)) {
			return isNaN(obj.valueOf());
		}
	}
}