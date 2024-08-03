"use strict";

let base_modules = [];
let plugins = [];

if(process.env.NODE_ENV === 'development') {
	const vuex = require('vuex')
	let logger = vuex.createLogger({
		collapsed: false,	//自动展开
	});
	plugins.push(logger);
}

//遍历目录,仅在webpack支持下使用
try {
	const modulesFile = require.context('../store/modules', true, /\.js$/)
	base_modules = modulesFile.keys().reduce((modules, modulePath) => {
		const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
		const value = modulesFile(modulePath)
		modules[moduleName] = value.default
		 return modules
	}, {});
} catch(e) {
	base_modules = [];
}
try {
	const pluginsFile = require.context('../store/plugins', true, /\.js$/)
	const base_plugins = pluginsFile.keys().map((pluginPath) => {
		 return pluginsFile(pluginPath)
	});
	plugins = plugins.concat(base_plugins);
} catch(e) {
	plugins = [];
}

export default {
	modules: base_modules,
	plugins
};
