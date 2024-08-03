import Vue from 'vue'
import App from './App'

import win from "@/system/core/nardy.win.js";
import db from "@/system/core/nardy.db.js";
import uView from '@/uni_modules/uview-ui';

import vuePlugin from "./system/vue.plugin";
import vuexPlugin from "./system/vuex.plugin";

//引入路线规划类
import util from "./util/publicUtil.js";
Vue.prototype.$util = util;



Vue.use(vuePlugin);
Vue.use(vuexPlugin);
Vue.use(uView)

// // 如此配置即可
// uni.$u.config.unit = 'rpx'

Vue.prototype.globalData = {
};
// ..
Vue.config.productionTip = false;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-QQ
uni.onMemoryWarning(level => {
	if(!level) return;
	// win.toast("检测到系统内存警告！！")
});
// #endif

//网络检测
uni.getNetworkType({
	success(res) {
		db.set("networkType", res.networkType)
	}
})
uni.onNetworkStatusChange(function (res) {
	// #ifndef MP-TOUTIAO
	if(!res.isConnected) {
		win.toast("网络连接出错!!")
		return;
	}
	// #endif
	db.set("networkType", res.networkType);
});


// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 15
		},
		// steps:{
		// 	fontSize:36
		// }
		// 其他组件属性配置
		// ......
	}
})