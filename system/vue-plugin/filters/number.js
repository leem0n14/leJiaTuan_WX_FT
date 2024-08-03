
export default {
	toFixed(value, length = 2) {
		if(isNaN(value)) return "";
		return parseFloat(value).toFixed(length);
	}
}