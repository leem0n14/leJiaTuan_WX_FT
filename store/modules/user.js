"use strict";
import {
	login,
	getUserInfo,
	getMobile,
	getQRcode,
	saveUserMsg,
	getUserState,
	getUserTikuMsg,
	changeTiku,
	coachGetMsg,
	feedBack,
	saveStatus,
	setPersonMsg,
	getPersonMsg,
	getPhone,
} from '@/api/user.js'
import db from "@/system/core/nardy.db.js";
const state = {
	name:null,
	phone:null,
	userInfo: {},
	userState: {},
	userMsgSub: {},
	order_count: {},
	tikuType: '未选择题库',
	TikuRes: {},
	QRcode: {}, //二维码
	feedBackRes: {}, //反馈
	setPersonRes: null, //设置个人信息响应
	getPersonRes: null,
	getPersonForm: {
		nickName: '',
		phone: '',
		photo: '',
	}, //获取个人信息响应
	
	getPhoneRes:null//获取手机号码的响应
};

const getters = {

};

const actions = {
	async getUserInfo({
		commit
	}, params) {
		// this.$win.loading("加载中")
		let res = await getUserInfo(params);
		if (res && res.code == 0) {
			
			commit("set_user", res.user)
			commit('get_tikuMsg', res.user)
			// this.$win.close("l")
			return res
		} else {
			this.$win.nlog(res)
		}
	},
	async getQRcode({
		commit
	}, params) {
		this.$win.loading('正在获取二维码')
		let res = await getQRcode(params)
		this.$win.close("l")
		if (res && res.code == 0) {
			commit('createQRcode', res)
			// this.$win.close("l")
		} else {
			this.$win.nlog(res)
		}

	},
	//保存注册信息
	async saveUserMsg({
		commit
	}, params) {
		this.$win.nlog('保存中...')
		let res = await saveUserMsg(params)
		if (res.code == 0) {
			this.$win.close("l")
			this.$win.nlog('保存成功')
			commit('saveMsg', res)
		} else {
			this.$win.nlog('保存失败')
		}
	},
	//检测用户状态
	async getUserState({
		commit
	}, params) {
		let res = await getUserState(params)
		console.log(res);
		commit('userState', res)
	},
	//获取题库信息
	async getUserTikuMsg({
		commit
	}, params) {
		let res = await getUserTikuMsg(params)
		commit('get_tikuMsg', res)
	},
	//更改题库
	async changeTiku({
		commit
	}, params) {
		let res = await changeTiku(params)
		commit('changeTiku', res)
	},
	//反馈
	async feedBack({
		commit
	}, params) {
		let res = await feedBack(params)
		commit('isSubSucceed', res)
	},
	//身份认证
	async saveStatus({
		commit
	}, params) {
		let res = await saveStatus(params)
		commit('save_Status', res)
	},
	//设置个人信息
	async setPerson({
		commit
	}, params) {
		let res = await setPersonMsg(params)
		// console.log('设置个人信息',res);
		if (res.code == 0) {
			commit('setPerson_Msg', res)
			this.$win.nlog('提交成功')
			if (params.new == 1) {
				return
			} else {
				setTimeout(() => {
					this.$win.back()
				}, 300)
			}

		} else {
			this.$win.nlog(res.code + res.msg)
		}
	},
	//获取个人信息
	async getPerson({
		commit
	}, params) {
		this.$win.loading('正在获取数据')
		let res = await getPersonMsg(params)
		this.$win.close('l')
		// console.log('获取个人信息',res);
		if (res.code == 0) {
			this.$db.set('identity',res.user.identity)
			commit('getPerson_Msg', res)
		}
	},
	async getPhone({commit},params) {
		let res=await getPhone(params)
		if(res.code==0){
			commit('getPhone_Res',res)
		}else{
			this.$win.nlog(res.msg)
		}
	}

};

const mutations = {
	set_user(state, data) {
		state.userInfo = data
	},
	// set_token(state,data){
	// 	state.token = data
	// },
	// order_count(state,data){
	// 	state.order_count = data
	// },
	createQRcode(state, data) {
		console.log('二维码数据', data)
		state.QRcode = data
	},
	saveMsg(state, data) {
		console.log(data);
		state.userMsgSub = data
	},
	userState(state, data) {
		console.log("用户状态", data);
		state.userState = data.resultMap
	},
	get_tikuMsg(state, data) {
		console.log('我的题库', data)
		state.tikuType = data.address + '-' + data.driverType
	},
	isSubSucceed(state, data) {
		console.log('提交', data)
		state.feedBackRes = data
		if (data.code == 0) {
			if (data.msg == 'success')
				this.$win.nlog('提交成功！')
			else
				this.$win.nlog('提交失败！')
		} else {
			this.$win.nlog('网络错误')
		}
	},
	changeTiku(state, data) {
		console.log('设置题库', data);
		if (data.code == 0) {
			this.$win.nlog('修改成功')
			// console.log(6);
			setTimeout(() => {
				this.$win.back()
			}, 300)
			state.TikuRes = data;
		} else {
			this.$win.nlog(data.msg)
			console.log(data.code, '错误');
			this.$win.nlog('错误')
		}
	},
	save_Status(state, data) {
		console.log('保存身份', data);
		this.$win.nlog(data.msg)
		if (data.code == 0) {
			setTimeout(() => {
				this.$win.back()
			}, 300)
		}
	},
	getPerson_Msg(state, data) {
		state.getPersonRes = data.user
		state.name=data.user.name
		state.phone=data.user.phone
		state.getPersonForm.nickName = data.user.nickName
		state.getPersonForm.phone = data.user.phone
		state.getPersonForm.photo = data.user.photo
	},
	setPerson_Msg(state, data) {
		state.setPersonRes = data
	},
	
	//拿手机号响应
	getPhone_Res(state,data){
		state.getPhoneRes=data.phone
	}
};

export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}