"use strict";
import {
	getQuetion,
	getQuestionId_1,
	saveQuestionPro,
	saveMistake,
	seeMis,
	getExam1,
	getRate,
	getVideo2,
	getVideo3,
	markScore,
	// getCtList,
	collect,
	collectList,
	getExamRule,
	getSign,
	getSignList1,
	getSignList2,
	getInformation,
	getInformDetail1,
	getInformDetail2,
	getInformDetail3,
} from '@/api/study.js';
import db from "@/system/core/nardy.db.js";


//放数据
const state = {
	questionMsg: {},
	answer: [],
	option: [],
	mistakeMsg: {},
	id: 0,
	// pro:0,
	sum: 0,
	examList: [], //模拟考试题目列表
	video2: [], //科目二视频列表
	video3: [], //科目三视频列表
	ctList: [],
	collectBool: '',
	collect_List: {},
	examRule: {}, //考试规则
	signList_1: [], //图标目录列表一级
	signList_2: [], //图标目录列表二级
	signList_3: [], //图标目录列表三级
	informationList1: [], //考试秘籍
	informationList2: [], //学车技巧
	informationList3: [], //答题技巧
	detail1: {}, //考试秘籍详细
	datail2: {}, //学车技巧详细
	datail3: {}, //答题技巧详细
};

const getters = {

};
//请求
const actions = {
	//拿题
	async getQuetion({
		commit
	}, params) {
		let res = await getQuetion(params)
		if (params.courseCode == 1) {
			commit('set_QuetionMsg_1', res)
		} else if (params.courseCode == 4) {
			commit('set_QuetionMsg_4', res)
		}
	},
	//拿做题进度
	async getQuetionId({
		commit
	}, params) {
		let res = await getQuestionId_1(params)
		commit('set_quePro', res)
	},
	async savePro({
		commit
	}, params) {
		let res = await saveQuestionPro(params)
		commit('save_Pro', res)
	},
	//保存错题
	async saveMistake({
		commit
	}, params) {
		let res = await saveMistake(params)
		commit('save_Mis', res)
	},
	//查看错题
	async seeMis({
		commit
	}, params) {
		let res = await seeMis(params)
		commit('get_Mis', res)
	},

	//科一四模拟拿题
	async getExam1({
		commit
	}, params) {
		let res = await getExam1(params)
		if (res.code == 0) {
			commit('set_examList', res.arr)
		} else {
			this.$win.nlog(res.msg)
		}

	},

	//模拟算分
	async getRate({
		commit
	}, params) {
		let res = await getRate(params)
		// commit('',res)
	},

	//模拟考试视频23
	async getVideo2({
		commit
	}, params) {
		let res = await getVideo2(params)
		if (res && res.code == 0)
			commit('video2List', res)
		else {
			this.$win.nlog('数据错误')
		}
	},
	async getVideo3({
		commit
	}, params) {
		let res = await getVideo3(params)
		if (res && res.code == 0)
			commit('video3List', res)
		else {
			this.$win.nlog('数据错误')
		}
	},
	//模拟考试记录成绩
	async markScore({
		commit
	}, params) {
		this.$win.loading('正在记录成绩...')
		let res = await markScore(params)
		if (res) {
			this.$win.close('l')
			if (res.code == 0) {
				this.$win.nlog('成绩已记录')
			} else {
				this.$win.nlog(res.msg)
			}
		}
		// commit('',res),
	},
	// async ctList({commit},params){
	// 	let res=await getCtList(params)
	// 	// commit('',res)
	// },
	//收藏/取消收藏
	async collect({
		commit
	}, params) {
		this.$win.loading('正在收藏')
		let res = await collect(params)
		if (res && res.code == 0) {
			this.$win.close('l')
			this.$win.nlog(params.bool ? '收藏成功' : '已取消收藏')
		} else {
			this.$win.close('l')
			this.$win.nlog(res.msg)
		}
	},

	//收藏列表
	async collectList({
		commit
	}, params) {
		// this.$win.loading('正在收藏')
		let res = await collectList(params)
		if (res && res.code == 0) {
			commit('postCollectList', res)
			// this.$win.close('l')
			// this.$win.nlog(params.bool?'收藏成功':'已取消收藏')
		} else {
			this.$win.close('l')
			this.$win.nlog(res.msg)
		}
	},
	async getExamRule({
		commit
	}, params) {
		this.$win.loading('正在获取规则')
		let res = await getExamRule(params)
		this.$win.close('l')
		if (res && res.code === 0) {
			commit('set_ExamRule', res)
		} else {
			this.$win.nlog("获取规则失败")
		}
	},
	//获取图标列表一级
	async getSignList1({
		commit
	}, params) {
		this.$win.loading("正在获取列表")
		let res = await getSignList1(params)
		this.$win.close('l')
		if (res && res.code === 0) {
			if (params.page === 1) {
				commit('set_SignList_1', res)
			} else {
				commit('push_SignList_1', res)
			}
		} else {
			this.$win.nlog('获取失败')
		}
	},
	//获取图标列表二级
	async getSignList2({
		commit
	}, params) {
		this.$win.loading("正在获取列表")
		let res = await getSignList2(params)
		this.$win.close('l')
		if (params.page === 1) {
			commit('set_SignList_2', res)
		} else {
			commit('push_SignList_2', res)
		}
	},

	////获取图标
	async getSign({
		commit
	}, params) {
		this.$win.loading("正在获取图标")
		let res = await getSign(params)
		this.$win.close('l')
		if (res && res.code === 0) {
			if (params.page === 1) {
				commit('set_SignList_3', res)
			} else {
				commit('push_SignList_3', res)
			}
		} else {
			this.$win.nlog('获取失败')
		}
	},
	//获取驾考资料
	async getInformation({
		commit
	}, params) {
		// console.log('getInformDetail1被调用了')
		// console.log("params:",params)
		this.$win.loading('正在获取')
		let res = await getInformation(params)
		console.log("res:", res)
		this.$win.close('l')
		if (res && res.code === 0) {
			if (params.type === 1) {
				// console.log('?1');
				commit('set_informationList1', res)
				// console.log("res",res)
			} else if (params.type === 2) {
				// console.log('?2');
				commit('set_informationList2', res)
			} else if (params.type === 3) {
				commit('set_informationList3', res)
			}
		} else {
			this.$win.nlog('获取失败')
		}
	},
	//学车技巧详细
	async getInformDetail2({
		commit
	}, params) {
		// console.log('getInformDetail2被调用了')
		// console.log("params:",params)
		this.$win.loading('正在获取')
		let res = await getInformDetail1(params)
		this.$win.close('l')
		if (res && res.code === 0) {
			commit('set_detail1', res)
		}
	},
	//考试秘籍详细
	async getInformDetail1({
		commit
	}, params) {
		this.$win.loading('正在获取')
		let res = await getInformDetail2(params)

		this.$win.close('l')
		if (res && res.code === 0) {
			commit('set_detail2', res)
		}
	},
	//考试秘籍详细
	async getInformDetail3({
		commit
	}, params) {
		this.$win.loading('正在获取')
		let res = await getInformDetail3(params)
		this.$win.close('l')
		if (res && res.code === 0) {
			commit('set_detail3', res)
		}
	},
};
//操作数据
const mutations = {
	set_QuetionMsg_1(state, data) {
		console.log('拿题目1', data);
		if (state.id == state.sum) {
			state.id = 0
		}
		state.questionMsg = data.question
		let arr = []
		for (let i = 0; i < data.question.answers.length; i++) {
			arr.push({
				isAct: false,
			})
		}
		state.option = arr
		state.collectBool = data.collect
	},
	set_QuetionMsg_4(state, data) {
		if (state.id == state.sum) {
			state.id = 0
		}
		console.log('拿题目4', data);
		state.questionMsg = data.subject
		let arr = []
		for (let i = 0; i < data.subject.answers.length; i++) {
			arr.push({
				isAct: false,
			})
		}
		state.option = arr
	},
	set_quePro(state, data) {
		console.log('拿进度', data);
		state.id = data.result.id
		state.sum = data.result.sum
	},
	save_Pro(state, data) {
		console.log('保存进度', data);
	},
	idAdd(state, data) {
		state.id++
	},
	save_Mis(state, data) {
		console.log('保存错题', data);
	},
	get_Mis(state, data) {
		console.log('查看错题', data);
		state.mistakeMsg = data
		// state.ctList=data
	},
	//模拟考试题目列表
	set_examList(state, data) {
		state.examList = data
	},
	video2List(state, data) {
		state.video2 = data.video
	},
	video3List(state, data) {
		state.video3 = data.video
	},
	postCollectList(state, data) {
		state.collect_List = data.collect1List
	},
	set_ExamRule(state, data) {
		// console.log('?',data);
		state.examRule = data.subjectRule
	},
	//图标列表start
	set_SignList_1(state, data) {
		// console.log(data);
		state.signList_1 = data.page.list
	},
	set_SignList_2(state, data) {
		state.signList_2 = data.page.list
	},
	set_SignList_3(state, data) {
		// console.log(data,'?./');
		state.signList_3 = data.page.list
	},
	push_SignList_1(state, data) {
		// console.log(data);
		state.signList_1 = [...state.signList_1, ...data.page.list]
	},
	push_SignList_2(state, data) {
		state.signList_2 = [...state.signList_2, ...data.page.list]
	},
	push_SignList_3(state, data) {
		// console.log(data,'?./');
		state.signList_3 = [...state.signList_3, ...data.page.list]
	},
	//图标列表end
	set_informationList1(state, data) {
		console.log("data.page.list", data.page)
		state.informationList1 = data.page
		// console.log(state.informationList1);
	},
	set_informationList2(state, data) {
		state.informationList2 = data.page
		// console.log(state.informationList2);
	},
	set_informationList3(state, data) {
		state.informationList3 = data.page
	},
	set_detail1(state, data) {
		// console.log();
		state.datail1 = data.information
		console.log(data.information,'11111111111111111111');
		
		// console.log(state.datail1,'11111111111111111111');
	},
	set_detail2(state, data) {
		state.datail2 = data.information
		console.log(data.information,'1111121111111111');
		
		// console.log(state.datail2,'2');
	},
	set_detail3(state, data) {
		console.log(data.information,'1111311111111111');
		
		state.datail3 = data.information
	}
};


export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}