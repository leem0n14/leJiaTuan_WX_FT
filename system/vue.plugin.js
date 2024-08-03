"use strict";
import fns from "./core/nardy.fns";
import http from "./core/nardy.http";
import win from "./core/nardy.win";
import db from "./core/nardy.db";
import types from "./core/nardy.types";
import app from "./core/nardy.app";
import validators from "./core/nardy.validators";
import conf from "@/conf";

import entry from "./vue-plugin/entry";


//加载兼容特性
//以兼容uniapp中还没有的,但其他平台已经出现了的特性
// 调用方式为: this.$uni.xxx
const compateFile = require.context('./compate', true, /\.js$/)
const coms = compateFile.keys().reduce((coms, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	let value = compateFile(modulePath)
	if(value.default && value.__esModule) {
		value = value.default;
	}
	 return Object.assign(coms, value);
}, {});

//挂载core里面的方法
function mountCore(key, irequire, Vue) {
	let moduleName = key.replace(/^\.\/nardy\.(.*)\.\w+$/, '$1');
	let value = irequire(key);
	if(value.default && value.__esModule) {
		value = value.default;
	}
	moduleName = "$" + moduleName;
	if(Vue.prototype[moduleName] === undefined) {
		Object.defineProperty(Vue.prototype, moduleName, {
			value
		})
	}
}

export default {
	install(Vue, options = {}) {
		const coreFiles = require.context('./core', true, /\.js$/)
		for(let key of coreFiles.keys()) {
			mountCore(key, coreFiles, Vue);
		}
		Vue.prototype.$conf = conf;
		Vue.prototype.$uni = coms;
		if(conf.apis) {
			Vue.prototype.$apis = conf.apis;
		}
		if(conf.shopApis) {
			Vue.prototype.$shopApis = conf.shopApis;
		}
		Vue.use(entry);
	}
};