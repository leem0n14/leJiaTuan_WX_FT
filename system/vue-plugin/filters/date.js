import moment from "moment";
/**
 * 日期类操作过滤器
 */
export default {
	formatDate(value, pattern = "YYYY-MM-DD HH:mm:ss") {
		return moment(+value).format(pattern);
	}
};