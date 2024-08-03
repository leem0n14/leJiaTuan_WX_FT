"use strict";
import {
	getExamRecord,
	getPracticeRecord,
	toBookingExam,
	toBookingPractice,
	getPTime,
	getSite,
	pingjia,
	postCanel,
	getBookingRule
} from '@/api/booking.js';
import db from "@/system/core/nardy.db.js";

const state = {
	examRecordList: [],
	practiceRecordList: [],
	pRes: {},
	eRes: {},
	timeList: {},
	site: [],
	bookingRule: {},
}

const getters = {

}

const actions = {
	async pingjia({
		commit
	}, params) {
		let res = await pingjia(params)
		if (res && res.code == 0) {
			this.$win.back()
			this.$win.nlog('提交成功')

		} else {
			this.$win.nlog(res.code + res.msg)
		}
	},
	async getPracticeList({
		commit
	}, params) {
		let res = await getPracticeRecord(params)
		if (params.i) {
			// set_Plist
			commit('set_Plist', res)
		} else {
			commit('get_Plist', res)
		}

	},
	async getExamList({
		commit
	}, params) {
		let res = await getExamRecord(params)
		commit('get_Elist', res)
	},
	async toPractice({
		commit
	}, params) {
		let res = await toBookingPractice(params)
		// this.$win.loading('提交中')
		commit('toP', res)
		// this.$win.close('l')//关闭加载动画
	},
	async toExam({
		commit
	}, params) {
		let res = await toBookingExam(params)
		commit('toE', res)
	},
	async getPTime({
		commit
	}, params) {
		let res = await getPTime(params)
		commit('set_Ptime', res)
	},
	//获取练车场地
	async getSite({
		commit
	}, params) {
		this.$win.loading('正在获取场地信息')
		let res = await getSite(params)
		this.$win.close('l')
		commit('get_Site', res.sites)
		if (res.code == 0) {
			this.$win.nlog('获取场地信息成功')
		} else {
			this.$win.nlog(res.msg)
		}
	},

	// 取消预约

	async postCanel({
		commit
	}, params) {
		this.$win.loading('正在获取场地信息')
		let res = await postCanel(params)
		this.$win.close('l')
		commit('post_Canel', res)
		if (res.code == 0) {
			this.$win.nlog('已取消')
		} else {
			this.$win.nlog(res.msg)
		}
	},

	async getBookingRule({
		commit
	}, params) {
		this.$win.loading('正在获取规则信息')
		let res = await getBookingRule(params)
		this.$win.close('l')
		if (res.code == 0) {
			// this.$win.nlog('获取成功')
			commit('set_rule', res)
		} else {
			this.$win.nlog(res.msg)
		}
	}
}

const mutations = {
	get_Plist(state, data) {
		// console.log('p预约列表', data);
		state.practiceRecordList = data.page.list
	},
	set_Plist(state, data) {
		state.practiceRecordList = state.practiceRecordList.concat(data.page.list)
	},
	get_Elist(state, data) {
		// console.log('e预约列表', data);
	},
	toP(state, data) {
		// console.log('p预约', data);
		state.pRes = data
		if (data.code == 0) {
			this.$win.nlog('提交成功')
			setTimeout(() => {
				this.$win.back()
			}, 1000)
		} else this.$win.nlog('提交失败:' + data.msg)
	},
	toE(state, data) {
		// console.log('e预约', data);
	},
	set_Ptime(state, data) {
		// console.log('预约时间', data);
		state.timeList = data.carTimes
	},

	get_Site(state, data) {
		state.site = data
	},
	post_Canel(state, data) {
		// state.site=data
	},
	set_rule(state, data) {
		state.bookingRule = data.setting
	}
}

export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}