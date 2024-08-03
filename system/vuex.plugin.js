"use strict";
import Vuex from "vuex";
import store from "./store";
import conf from "@/conf";

//挂载core里面的方法
function mountCore(key, irequire, Vuex, Vue) {
	let moduleName = key.replace(/^\.\/nardy\.(.*)\.\w+$/, '$1');
	moduleName = "$" + moduleName;
	if(Vuex.Store.prototype[moduleName] !== undefined) {
		return;
	}
	let value = Vue.prototype[moduleName];
	if(value === undefined) {
		value = irequire(key);
		if(value.default && value.__esModule) {
			value = value.default;
		}
	}
	Object.defineProperty(Vuex.Store.prototype, moduleName, {
		value
	})
}

export default {
	install(Vue, options = {}) {
		Vue.use(Vuex);
		const coreFiles = require.context('./core', true, /\.js$/)
		
		for(let key of coreFiles.keys()) {
			mountCore(key, coreFiles, Vuex, Vue);
		}
		if(conf.apis) {
			Vuex.Store.prototype.$apis = conf.apis;
		}
		if(conf.shopApis) {
			Vuex.Store.prototype.$shopApis = conf.shopApis;
		}
		Vuex.Store.prototype.$uni = Vue.prototype.$uni;
		Vue.prototype.$store = new Vuex.Store({
			strict: true,
			...store
		});
	}
};