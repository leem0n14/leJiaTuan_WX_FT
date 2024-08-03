import moment from "moment";

export default {
	/** 手机号
	 * @param {string || number} value
	 * @returns {Boolean}
	 */
	isPhone(value) {
	  if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
	    return false
	  }
	  return true
	},
	
	/** 身份证（18位）
	 * @param {string || number} value
	 * @returns {Boolean}
	 */
	isIDCard(value) {
	  if (!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value))) {
		return false
	  }
	  return true
	},
	
	/** 身份证（18位）
	 * @param {string || number} value
	 * @returns {Boolean}
	 */
	isCarNumber(value) {
	  if (!(/(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(value))) {
		return false
	  }
	  return true
	}
	
};
