import conf from "@/conf.js";
/**
 * 字符串类操作过滤器
 */
export default {
	padStart(value, length, padding = "") {
		value = value + "";
		length = parseInt(length) || value.length;
		return value.padStart(length, padding);
	},
	trim(value, chars = "") {
		if(typeof value !== 'string') {
			return value + "";
		}
		if(!chars) return value.trim();
		let regx = new RegExp(`^${chars}{1,}(.*?)${chars}{1,}$`)
		return value.replace(regx, "$1");
	},
};
