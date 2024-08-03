# 乐驾团业务流程(前端)：

接口文档：[Swagger UI (lejiatuan.cn)](https://wx.lejiatuan.cn/data/lejiatuan/swagger-ui.html#/)

## 小程序uniapp：

### 	网络请求：

### 1.在根目录下api.js文件对后端的接口做了一个集成，在里面的apis的对象里面，用全大写的变量表示

```JavaScript
let apis = {
	//用户
	LOGIN: '/app/wxlogin', //小程序授权登录
	USERINFO: '/app/register/getuser', //获取用户信息
	WXPHONE: '/app/getPhone', //获取微信手机号
	GETQRCODE: '/app/qrcode/test', //二维码
	SAVEUSERMSG: '/app/register/registers', //注册信息保存
	USERSTATE: '/app/register/statu/', //检测用户状态
	GETUSERTIKU: '', //获取用户题库
	CHANGETIKU: '/app/register/setcity', //用户更改题库
	FEEDBACK: '/app/wxfankui/save', //反馈意见
	SAVESTATUS: '/app/register/process', //身份认证
}
```



### 2、在根目录下api的文件夹，里面分模块写了所有业务的网络请求方法，返回get或者post的方法

例如：coach.js的教练模块

```JavaScript
import config from '@/conf.js'//引入根目录的conf文件，用于创建一个url
import http from '@/system/core/nardy.http.js' //引入core里面的http文件，用于返回一个get或者post

//coach.js
//获取教练列表
export function getCoachList(params) {
	//post请求
	let url = config.apis.GETCOACHLIST
	// +'/'+this.$db.getSync('token')
	return http.post(url,params)
}

//获取该城市的驾校
export function getCitySchool(params){
	let url =config.apis.GETCITYSCHOOLS
	return http.post(url,params)
}

//get请求两中不同的写法：1，直接‘/’加上参数，2.?加key=value
//1.
// 教练端车辆列表
export function getListCar(params){
	let url=config.apis.GETLISTCAR+'/'+params.id
	return http.get(url,params)
}
//2.
// 教练所拥车辆列表
export function getFenListCar(params){
	let url=config.apis.GETFENLISTCAR+'?userId='+params.userId
	return http.get(url,params)
}

```

### 3.使用vuex(state保存状态，也就是请求回来的数据放state里面,action属性分发请求，mutation修改state)

在根目录下store文件夹里面的module文件夹里面分模块，和api文件夹的文件名一一对应

例如：coach.js

```javascript
"use strict";
import {
	getCoachList,
	getCitySchool,
	getCoachBySchool,
	getMyCoachMsg,
	coachDetail,
	beCoach,
} from '@/api/coach.js';//引入api/coach.js里面已经写好的方法
import db from "@/system/core/nardy.db.js";

//放数据(data)
const state = {
	coachList: [],
	schools: [],
	myCoach:{},
	coachDetail:{},
};
//getters(computed),没啥用
const getters = {};

//请求
//action(methods)主要处理异步的东西，比如网络请求
//例如:getCoachList方法：
//第一的形参,我也不知道是什么，我们只需要里面的commit方法，用来拿到请求数据之后交给mutation去修改state，第二个形参params就是页面传过来的请求参数
//commit("set_coachList", res.coachs.list)，调用commit方法，commit第一个形参就是mutation配置项里面的方法，第二个就是你要传给mutation的数据
const actions = {
	//获取综合查询的教练列表
	async getCoachList({
		commit
	}, params) {
		let res = await getCoachList(params)
		// console.log('CoachList',res)
		if (res && res.code == 0) {
            //这里有分页的参数、判断一下是否是第一页，是的话就直接赋值，不是就在原来的数组上进行拼接，具体看mutation里面的方法("set_coachList","push_coachList")
			if (params.page == 1) {
				// console.log('成功', res)
				commit("set_coachList", res.coachs.list)
				// console.log("set_coachList")
			} else {
				commit("push_coachList", res.coachs.list)
				// console.log("push_coachList")
			}
			return res
		} else {
			this.$win.nlog(res.detail)
		}
	},
	//获取该城市的驾校
	async getCitySchool({
		commit
	}, params) {
		let res = await getCitySchool(params);
		console.log('CitySchool', res)
		if (res && res.code == 0) {
			// console.log('成功', res)
			commit('get_schoolList', res.schools)
		} else {
			this.$win.nlog(res.detail)
		}
	},
	//根据驾校查询教练
	async getCoachBySchool({
		commit
	}, params) {
		let res = await getCoachBySchool(params);
		console.log('按驾校查询', res)
		commit('get_CoachListBySchool', res.coachs.list)
	},
	//获取我的教练的信息
	async getMyCoachMsg({
		commit
	}, params) {
		let res = await getMyCoachMsg(params)
		commit('get_MycoachMsg', res);
	},
	//详细
	async getCoachDetail({commit},params,id){
		console.log('nd',params.id);
		this.$win.loading('加载中...')
		let res=await coachDetail(params)
		this.$win.close('l')
		if(res.code==0){
			commit('set_CoachDetail',res)
		}else{
			this.$win.nlog(res.msg)
		}
	},
	//成为教练
	async beCoach({commit},params){
		this.$win.nlog("正在提交申请")
		let res=await beCoach(params)
		this.$win.close('l')
		if(res&&res.code===0){
			this.$win.nlog('提交成功')
			setTimeout(()=>{
				this.$win.back()
				// console.log('');
			},1000)
		}
	}
};
//操作数据
const mutations = {
	//获取该城市的驾校
	get_schoolList(state, data) {
		// console.log('get_schoolList',data)
		state.schools = ['所有驾校', ...data]
	},
    //这里面配置的方法，第一个形参就是上面写的state的东西，第二个就是action里面使用commit传过来的数据
	//获取综合查询的教练列表
	push_coachList(state, data) {
		// let arr = state.coachList.concat(data)
		// state.coachList = JSON.parse(JSON.stringify(arr))
		state.coachList = state.coachList.concat(data)
		console.log("push", data)
	},
    //不是第一页就直接赋值
	set_coachList(state, data) {
		// console.log(">>>", data)
		state.coachList = data
		console.log('set',data)
	},
	//按驾校查询
	get_CoachListBySchool(state, data) {
		state.coachList = data
	},
	//我的教练
	get_MycoachMsg(state,data){
		state.myCoach=data.coach
		console.log('我的教练',data);
	},
	//coach详细
	set_CoachDetail(state,data){
		console.log('coach详细',data);
		state.coachDetail=data.coach
	},
};

//上面的配置项暴露出去
export default {
	namespaced: true, //默认为false。默认情况下，模块的action，mutation和getter是注册在全局的命名空间的， 这里设置为true后，action,muation和getter等都以模块名称进行调用，
	state,
	getters,
	actions,
	mutations
}
```

### 4.页面映射action和state(使用mapState和mapAction,将写好的请求和拿到的数据或者数据的初始值给到页面)

```JavaScript
import {
	mapActions,
	mapState
} from 'vuex'//在vuex中引入这两个方法
//mapState要写在页面上的computed里面，mapAction要写在methods里面，
computed: {
	...mapState({
		coachList: state => state.coach.coachList,
		schools: state=>state.coach.schools,	
	})
},
methods: {
    //将vuex里面写的action里面的方法映射过来并改个名字，用的时候前面要加this
	...mapActions({
		getCoachList_fun: 'coach/getCoachList',
		getCitySchool_fun: 'coach/getCitySchool',
		getCoachBySchool_fun:'coach/getCoachBySchool',
		getDetail_fun:'coach/getCoachDetail',
	}),
  async getCoachList(pagePlus) {
		if(pagePlus){
			console.log('下一页');
			this.page++
		}
		else {
			this.page=1
		}
		let data = {
			city: this.cityPosition,
			page: this.page,
			token:this.$db.getSync('token')
		}
		let res = await this.getCoachList_fun(data)
		if(res && pagePlus &&res.coachs.list.length==0){
			this.page--
		}
	},
}
//页面滚动到底部触发
onReachBottom(){
	this.getCoachList(1)
},
```

##### 5.开发工具的调试

微信开发者工具：

Network就是网络回来的东西，里面的xhr选项就是网络接口的数据，

AppData就是页面(组件上的数据，data和computed的数据，命名别冲突)

上面两样搭配可以调试数据有无成功拿到页面上