import moment from "moment";

import Debounce from "./classes/Debounce.js";
import Throttle from "./classes/Throttle.js";

export default {
	defer() {
		let defer = {};
		defer.promise = new Promise((resolve, reject) => {
			defer.resolve = resolve;
			defer.reject = reject;
		})
		return defer;
	},
	delay(ms = 0) {
		ms = parseInt(ms) || 0;
		if(ms < 0) ms = 0;
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	},
	formatDate(ts, pattern = "YYYY-MM-DD HH:mm:ss") {
		return moment(+ts).format(pattern);
	},
	debounce(fn, options = {}) {
		let deb = new Debounce(fn, options);
		return function() {
			deb.run(this, arguments)
		};
	},
	throttle(fn, options = {}) {
		let throttle = new Throttle(fn, options);
		return function() {
			throttle.run(this, arguments);
		}
	}
};

function debounce(fn, options = {}) {
	let deb = new Debounce(fn, options);
	return function() {
		deb.run(this, arguments)
	};
}
function throttle(fn, options = {}) {
	let throttle = new Throttle(fn, options);
	return function() {
		throttle.run(this, arguments);
	}
}