"use strict";
import {
	coachGetMsg,
	studentManage,
	studentBooking,
	carManage,
	addCar,
	check,
	getCars,

	addAcc,
	addFix,
	addInsure,
	addMain,

	insureList,
	mainList,
	fixList,
	accList,

	getCarMsg,
	getRecordNum,

	postcoachUpdate,
	getListCar,
	getFenListCar,
	getFenUpdate,
	postCoachDelate,
	getStuDetail
} from '@/api/coachSection.js'
import db from "@/system/core/nardy.db.js"

const state = {
	coachMsg: {},
	stuList: [],
	newStuList: [],
	bookingList: [],
	checkCode: null,
	address: null,
	time: null,
	carsList: [],
	cars: null,
	carMsg: {},
	lists: [],
	recordNum: {},
	// lists:{
	// 	acc:[],
	// 	main:[],
	// 	fix:[],
	// 	insure:[],
	// }
	listCar: [],
	fenListCar: {},
	delateCar: {},
	stuDetailMsg:{},
	
}

const getters = {

}

const actions = {
	async getCoachMsg({
		commit
	}, params) {
		this.$win.loading('正在获取数据')
		let res = await coachGetMsg(params)
		this.$win.close('l')
		commit('set_coachMsg', res)
	},
	async studentManage({
		commit
	}, params) {
		let res = await studentManage(params)
		commit('set_StudentList', res)
	},
	async studentBooking({
		commit
	}, params) {
		let res = await studentBooking(params)

		if (params.i) {
			commit('set_BookingList', res)
		} else {
			commit('get_BookingList', res)
		}

	},
	async addCar({
		commit
	}, params) {
		let res = await addCar(params)
		if (res.code == 0) {
			commit('add_car', res)
			this.$win.nlog(res.msg + '添加成功')
			setTimeout(() => {
				this.$win.back()
			}, 600)
			// this.$win.show('/pages/coachSection/coachSection')

		} else {
			this.$win.nlog(res.msg + '添加失败')
		}
	},
	//打卡
	async check({
		commit
	}, params) {
		let res = await check(params)
		commit('check_Msg', res)
	},
	//获取我的车辆
	async getCars({
		commit
	}, params) {
		let res = await getCars(params)
		commit('set_CarList', res)
	},

	//添加保险
	async addInsure({
		commit
	}, params) {
		let res = await addInsure(params)
		// this.$win.nlog(res.msg)
		if (res && res.code == 0) {
			this.$win.nlog('保存成功')
			setTimeout(() => {
				this.$win.back()
			}, 300)

		} else if (res && res.code != 0) {
			this.$win.nlog(res.msg)
		} else {
			this.$win.nlog('未知错误')
		}
	},
	//添加保养
	async addMain({
		commit
	}, params) {
		let res = await addMain(params)
		if (res && res.code == 0) {
			this.$win.nlog('保存成功')
			setTimeout(() => {
				this.$win.back()
			}, 300)
		} else if (res && res.code != 0) {
			this.$win.nlog(res.msg)
		} else {
			this.$win.nlog('未知错误')
		}
	},
	//添加出险
	async addAcc({
		commit
	}, params) {
		let res = await addAcc(params)
		if (res && res.code == 0) {
			this.$win.nlog('保存成功')
			setTimeout(() => {
				this.$win.back()
			}, 300)
		} else if (res && res.code != 0) {
			this.$win.nlog(res.msg)
		} else {
			this.$win.nlog('未知错误')
		}
	},
	//添加维修
	async addFix({
		commit
	}, params) {
		let res = await addFix(params)
		if (res && res.code == 0) {
			this.$win.nlog('保存成功')
			setTimeout(() => {
				this.$win.back()
			}, 300)
		} else if (res && res.code != 0) {
			this.$win.nlog(res.msg)
		} else {
			this.$win.nlog('未知错误')
		}
	},

	//获取某车具体信息
	async getCarMsg({
		commit
	}, params) {
		let res = await getCarMsg(params)
		commit('set_CarMsg', res.car)
	},

	//保险列表
	async insureList({
		commit
	}, params) {
		let res = await insureList(params)
		commit('set_insureList', res.page.list)
	},
	//保养列表
	async mainList({
		commit
	}, params) {
		let res = await mainList(params)
		commit('set_mainList', res.page.list)
	},
	//维修列表
	async fixList({
		commit
	}, params) {
		let res = await fixList(params)
		commit('set_fixList', res.page.list)
	},
	//出险列表
	async accList({
		commit
	}, params) {
		let res = await accList(params)
		commit('set_accList', res.page.list)
	},


	//某车记录条数
	async recordNum({
		commit
	}, params) {
		let res = await getRecordNum(params)
		commit('set_recordNum', res.data)
	},

	//教练端修改预约完成
	async postcoachUpdate({
		commit
	}, params) {
		let res = await postcoachUpdate(params)
		commit('post_coachUpdate', res)
	},

	//教练端选择车辆
	async getListCar({
		commit
	}, params) {
		let res = await getListCar(params)
		commit('get_ListCar', res)
	},

	//教练所拥车辆列表
	async getFenListCar({
		commit
	}, params) {
		let res = await getFenListCar(params)

		commit('get_FenListCar', res)


	},

	//练车完成
	async getFenUpdate({
		commit
	}, params) {
		let res = await getFenUpdate(params)
		commit('get_FenUpdate', res)
	},

	//删除车辆
	async postCoachDelate({
		commit
	}, params) {
		let res = await postCoachDelate(params)
		commit('post_CoachDelate', res)
	},
	//获取学员详细信息
	async getStuDetail({
		commit
	},params){
		let res=await getStuDetail(params)
		commit('set_stuDetailMsg',res.student)
	}
}

const mutations = {
	set_coachMsg(state, data) {
		console.log('教练端用户信息', data)
		state.coachMsg = data.coach
	},
	set_StudentList(state, data) {
		console.log('学员管理', data);
		state.stuList = data.page
	},
	get_BookingList(state, data) {
		// console.log('预约列表', data);
		state.bookingList = data.page.list
		console.log(state.bookingList,"llllllllllll")
	},

	set_BookingList(state, data) {
		// console.log('预约列表', data);
		state.bookingList = state.bookingList.concat(data.page.list)
		
	},
	add_car(state, data) {
		console.log('添加车辆', data);
	},
	check_Msg(state, data) {
		console.log('打卡', data);
		this.$win.nlog(data.msg)
		state.checkCode = data.code
		state.time = data.result.time
		state.address = data.result.siteName
	},
	set_CarList(state, data) {
		state.cars = data
		console.log('获取车辆列表', data);
		let carsArr = []
		for (let i = 0; i < data.cars.length; i++) {
			let item = data.cars[i].carType + '(' + data.cars[i].carId + ')'
			carsArr.push(item)
		}
		state.carsList = carsArr
		// console.log('??',state.carsList);
	},

	set_CarMsg(state, data) {
		state.carMsg = data
	},

	set_insureList(state, data) {
		// state.lists.insure=data
		state.lists = data
	},
	set_accList(state, data) {
		// state.lists.acc=data
		state.lists = data
	},
	set_mainList(state, data) {
		// state.lists.main=data
		state.lists = data
	},
	set_fixList(state, data) {
		// state.lists.fix=data
		state.lists = data
	},
	set_recordNum(state, data) {
		state.recordNum = data
	},
	post_coachUpdate(state, data) {
		// state.coachUpdate = data
		if (data.code == 0) {
			this.$win.nlog('预约成功')
		} else {
			this.$win.nlog(data.msg + data.code)
		}
		console.log(data);
		// console.log('上面是修改预约完成')
	},
	get_ListCar(state, data) {
		state.listCar = data.cars
		// console.log(data);
		// console.log('上面是你选择的选择的车辆')
	},
	get_FenListCar(state, data) {
		state.fenListCar = data
		// console.log(data);
		// console.log('上面是你车辆分配的返回值')
	},
	get_FenUpdate(state, data) {
		// state.fenListCar = data
		// console.log(data);
		// console.log('上面是你车辆分配完成的返回值')
	},
	post_CoachDelate(state, data) {
		// console.log("劲来了")
		state.delateCar = data
		// console.log(data);
		// console.log('上面是你车辆分配完成的返回值')
		if (state.delateCar.code == 0) {
			this.$win.nlog('删除成功')
		} else {
			this.$win.nlog(data.msg + data.code)
		}
	},
	set_stuDetailMsg(state,data){
		state.stuDetailMsg=data
	}
}

export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}