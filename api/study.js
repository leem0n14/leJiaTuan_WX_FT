import config from '@/conf.js'
import http from '@/system/core/nardy.http.js'

//逐题获取
export function getQuetion(params){
	console.log(params);
	let url
	if(params.courseCode==1){
		url = config.apis.GETQUETION+'/'+params.id+'/'+params.userId
	}
	else{
		 url = config.apis.GETQUETION+params.courseCode+'/'+params.id+'/'+params.userId
	}
	console.log('科目题库',params.courseCode);
	return http.get(url,params)
}


//获取题目进度
export function getQuestionId_1(params){
	let url =config.apis.GETQUETIONID+params.courseCode+'/'+params.userId
	console.log('科目进度',params.courseCode)
	return http.get(url,params)
}

//保存进度
export function saveQuestionPro(params){
	let url =config.apis.SAVEQUESTIONID+params.courseCode
	return http.post(url,params)
}

//保存错题
export function saveMistake(params){
	let url =config.apis.SAVEMISTAKE+params.courseCode
	return http.post(url,params)
}

//查看错题(列表)
export function seeMis(params){
	let url =config.apis.SEEMIS+params.courseCode+'/'+params.userId
	return http.get(url,params)
}

//科一考试拿题
export function getExam1(params){
	let url =config.apis.EXAM1
	return http.post(url,params)
}

//考试算分ideo
export function getRate(params){
	let url =config.apis.GETRATE
	return http.post(url,params)
}

//科目二三视频列表
export function getVideo2(params){
	let url =config.apis.GETVIDEO2
	return http.post(url,params)
}

export function getVideo3(params){
	let url =config.apis.GETVIDEO3
	return http.post(url,params)
}

//记录模拟考试成绩
export function markScore(params){
	let url =config.apis.MARKSCORE
	return http.post(url,params)
}



//收藏/取消收藏
export function collect(params) {
 
 if(!params.bool){
  //收藏
  let url = config.apis.COLLECT + params.course
  //course(1||4)
  return http.post(url, params)
 }else{
  //取消收藏
  let url=config.apis.DELETECOLLECT+params.course+'/'+params.id+'/'+params.userId
  return http.get(url,params)
 }
 
}

//获取收藏列表
export function collectList(params) {
 
  let url=config.apis.COLLECTLIST+params.course+'List'
  return http.post(url,params)

}

//获取考试规则
export function getExamRule(params){
	let url =config.apis.GETEXAMRULE+`?subject=${params.subject}`
	return http.get(url,params)
}

//图标管理目录一级
export function getSignList1(params){
	let url=config .apis.GETSIGNLIST1+`?limit=${params.limit}&page=${params.page}`
	// +`?parentId=${params.parentId}`
	return http.get(url,params)
}
//图标管理目录二级
export function getSignList2(params){
	let url=config .apis.GETSIGNLIST2+`?id=${params.parentId}&limit=${params.limit}&page=${params.page}`
	return http.get(url,params)
}
//获取图标
export function getSign(params){
	let url=config .apis.GETSIGN+`?id=${params.id}&limit=${params.limit}&page=${params.page}`
	return http.get(url,params)
}

//驾考资料：学车技巧，考试秘籍、答题技巧
export function getInformation(params){
	let url=config.apis.GETINFORMATION+`?type=${params.type}&subject=${params.subject}`
	return http.get(url,params)
}

//学车技巧详细
export function getInformDetail2(params){
	let url=config.apis.GETINFORMDETAIL2+`/${params.id}`
	return http.get(url,params)
}
//考试秘籍详细
export function getInformDetail1(params){
	let url=config.apis.GETINFORMDETAIL1+`/${params.id}`
	return http.get(url,params)
}
//答题技巧详细
export function getInformDetail3(params){
	let url=config.apis.GETINFORMDETAIL2+`/${params.id}`
	return http.get(url,params)
}