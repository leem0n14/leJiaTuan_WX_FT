"use strict";

/**
 * 所有的API必须遵守声明规范
 */
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
	// GETPHONE:'/app/getPhone',//获取手机号码


	//教练端
	COACHMSG: '/app/coach/coach', //首页个人信息
	STUDENTMANAGE: '/app/wxstudent/select', //学员管理
	STUDENTBOOKING: '/app/wxmpdriver/list', //学员预约
	CARMANAGE: '', //车辆管理
	CHECK: '/app/wxcoachregister/save', //教练打卡
	GETCARS: '/app/wxcar/listCar/', //获取教练车辆
	GETCARMSG: '/app/wxcar/coachCar', //某车具体信息
	DELATECAR: '/app/wxcar/delete', //删除车辆
	ADDCAR: '/app/wxcar/insert', //添加车辆
	ADDINSURE: '/app/wxcar/saveBx', //添加车辆保险
	ADDFIX: '/app/wxcar/saveWx', //添加维修
	ADDMAIN: '/app/wxcar/saveBy', //添加保养
	ADDACC: '/app/wxcar/saveCx', //添加出险
	RECORDNUM: '/app/wxcar/count', //记录条数
	INSURELIST: '/app/wxcar/listBx', //保险记录列表
	FIXLIST: '/app/wxcar/listWx', //维修记录列表
	MAINLIST: '/app/wxcar/listBy', //保养记录列表
	ACCLIST: '/app/wxcar/listCx', //出险记录列表
	'GETSTUDETAIL': '/app/wxstudent/info', //获取学员具体信息

	//主页
	GETCAROUSEL: '/app/rotat/list', //获取轮播图
	GETANNOUNCEMENT: '/app/rotat/announcement', //获取轮播公告
	GETMIAOSHA: '/app/wxGoods/homePage1', //获取秒杀商品信息
	GETPINTUAN: '/app/wxGoods/homePage2', //获取拼团商品信息
	GETHOTGOODS: '/app/wxGoods/homePage0', //获取热门商品信息

	//教练团
	GETCOACHLIST: '/app/coach/selectAllCoach', //获取教练团列表
	GETCITYSCHOOLS: '/app/coach/school', //获取该城市的驾校
	SELECT: '/app/coach/select', //按驾校查询教练
	COACHDETAIL: '/app/coach/info', //教练详细
	BECOACH: "/app/wxcoachaudit/save", //成为教练
	//拼车
	COUNTPRICE: '/app/wxcarpool/price', //计算拼车价格
	PINCHELICOACH: '', //教练端拼车列表
	PINCHELI: '', //学员端拼车列表
	PCLIST: '/app/wxcarpool/list', //拼车列表
	PCLISTWC: '/app/wxcarpool/coachList', //拼车完成列表
	TOPINCHE: '/app/wxcarpool/save', //发起拼车
	PCJD: '/app/wxcarpool/update', //拼车接单


	//场地
	GETVENUELIST: '/app/wxschool/list', //获取附近场地列表
	GETVENUENAMELIST: '/app/wxsite/listName', //获取场地名字列表
	GETVENUEPHOTOLIST: '/app/wxsite/photo', //获取场地名字列表
	GETWXVENUELIST: '/app/wxschool/list', //附近场地功能
	GETSCHOOLDETAIL: '/app/wxschool/info', //获取某驾校的详细
	GETSCHOOLLIST: '/sys/school/getList', //拿驾校列表
	GETVENUEBYID: '/app/wxsite/ByUserId', //根据userid拿场地列表


	//学习
	GETQUETION: '/app/question/info', //获取题目(逐题获取)1
	GETQUETIONID: '/app/question/select', //获取做题进度1
	SAVEQUESTIONID: '/app/question/update', //保存更改做题id1
	SAVEMISTAKE: '/app/question/saveMistake', //保存错题1
	SEEMIS: '/app/question/selectMistake', //查看错题1
	MARKSCORE: '/app/question/mark', //记录模拟考试成绩
	BUTTERSCORE: '', //模拟考试最好成绩
	SCORELIST: '', //模拟考试成绩列表
	COLLECT: '/app/question/collect', //点击收藏
	GETCOLLECTBOOL: "", //拿题目收藏状态
	DELETECOLLECT: '/app/question/deleteCollect', //取消收藏
	COLLECTLIST: '/app/question/collect', //收藏列表
	GETEXAMRULE: '/app/subjectrule/get', //获取考规
	GETSIGNLIST1: '/app/sign1/list', //获取图标一级目录
	GETSIGNLIST2: '/app/sign2/list', //获取图标二级目录
	GETSIGN: '/app/sign/list', //获取图标
	GETINFORMATION: '/app/information/list', //驾考资料： 学车技巧2， 考试秘籍1，答题技巧3
	GETINFORMDETAIL1: '/app/information/info', //学车技巧拿详细
	GETINFORMDETAIL2: '/app/information/info', //考试秘籍拿详细



	//考试23视频
	GETVIDEO2: '/app/question/video2', //科目二视频
	GETVIDEO3: '/app/question/video3', //科目三视频

	//模拟考试
	EXAM1: '/app/question/moni', //科目一模拟考试拿题
	GETRATE: '', //考试算分

	//获取题库

	//分类
	GETTYPESLIST: '/app/wxGoods/returnTag', //获得种类
	GETLIST: '/app/wxGoods/select', //获取某类型的商品

	//我的
	GETSTUDYPROGRESS: '/app/rotat/list', //获取学习进度
	MYCOACH: '/app/coach/stuCoach', //我的教练
	// /app/coach/stuCoach
	// /app/wxtags/myCoach
	PINJIACOACH: '/app/wxtags/save', //教练评价提交
	CHANGECOACH: '', //更换教练
	SETPERSONMSG: '/app/register/updateuser', //设置的我个人信息
	GETPERSONMSG: '/app/register/getuser', //获取我的个人信息
	MYBAOMING: '/app/Wxsturegist/list', //我的报名列表
	SUBBAOMING: '/app/Wxsturegist/save', //提交报名信息

	//签到
	TOSIGN: '/app/wxsign/wxsignday', //签到
	GETSIGNDAYS: '/app/wxsign/wxsigndays', //签到天数
	ISSIGNIN: '/app/wxsign/statu', //当天是否签到
	GOODSSHOP: '', //积分商城
	SEERECORD: '/app/wxsign/sign', //查看积分明细

	//商品
	TYPES: '', //分类
	MYPINTUAN: '/app/wxpintuan/info', //我的拼团
	PINTUANLIST:'/app/wxpintuan/list',//拼团列表
	MYORDER: '', //我的订单
	GETGOODMSG: '/app/wxGoods/good', //商品具体信息
	PAYSUCCESS: '/app/wxorder/info', //支付成功后的页面信息
	PAYSUCCESS: '/app/wxorder/info', //支付成功后的页面信息

	GETCOUPON: '/app/couponbatch/list', //优惠券列表
	GETCOUPONDETAIL: '/app/couponbatch/info', //优惠劵具体信息
	POSTCOUPONSAVE: '/app/coupon/save', //用户领取优惠劵

	GETMYCOUPON: '/app/coupon/list', //用户的优惠劵列表
	GETMYCOUPONINFO: '/app/coupon/info', //用户优惠券具体信息

	//支付
	WXPAY: '/app/prePay/prePay', //微信支付

	//订单
	CTEATEORDER: '/app/wxorder/cteate', //生成订单
	ALLORDERLIST: '/app/wxorder/list', //获取全部订单列表
	PAYORDERLIST: '/app/wxorder/listPay', //获取已支付的订单列表
	NOPAYORDERLIST: '/app/wxorder/listNotPay', //未支付订单列表
	CANCELORDER: '/app/wxorder/update', //订单状态修改,取消订单
	SELSECTCONPOU: '/app/wxorder/useCoupon', //选择订单的优惠劵

	//预约
	PRACTICERECORDLIST: '/app/wxmpdriver/liststu', //预约练车记录(学员端)
	EXAMRECORDLIST: '', //预约考试记录(学员端)
	PRACTICEBOOKING: '/app/wxmpdriver/save', //学车预约
	PTIME: '/app/wxmpdriver/cartime', //获取练车时间
	EXAMBOOKING: '', //考试预约
	GETSITE: '/app/wxsite/getSite', //获取练车场地列表
	POSTUPDATE: '/app/wxmpdriver/update', //教练端修改预约完成
	GETLISTCAR: '/app/wxcar/listCar', //教练端车辆列表
	PINGJIACOACH: '/app/wxmpdriver/saveEvaluation', //练车后学员评价教练
	POSTCNANECEL: '/app/wxmpdriver/cancel', //取消预约
	BOOKINGRULE: '/app/wxmpdriver/time', // 预约规则

	//分销
	MYFENXIAOMSG: '', //我的分销信息
	HISTORYINCOME: '', //历史收益
	SHAREORDER: '', //分享订单
	SHARETUAN: '', //分享团队
	SOMEBODYORDER: '', //某人的详细订单
	GETMONEYLIST: '', //提现列表
	GETMONEY: '', //提现

	//分车功能
	GETFENLISTCAR: '/app/wxfenche/listcar', //教练所拥车辆列表
	POSTFENUPDATE: '/app/wxfenche/update', //练车完成

};

export default {
	create(base_host) {
		if (!base_host) {
			throw new Error("错误的主机地址");
		}
		let keys = Object.keys(apis);
		for (let key of keys) {
			apis[key] = base_host + apis[key];
		}
		return apis;
	}
}