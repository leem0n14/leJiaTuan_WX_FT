"use strict";
let initFilters = Symbol("INIT_FILTERS");

export default {
	install(Vue, options = {}) {
		this[initFilters](Vue, options);
	},
	[initFilters](Vue, options) {
		const filtersFile = require.context('./filters', true, /\.js$/)
		for(let file of filtersFile.keys()) {
			const fileName = file.replace(/^\.\/(.*)\.\w+$/, '$1')
			let filters = filtersFile(file)
			filters = filters.default || filters;
			let keys = Object.keys(filters);
			for(let key of keys) {
				let fn = filters[key];
				if(typeof fn !== 'function') {
					continue;
				}
				Vue.filter(key, fn);
			}
		}
	}
};
