(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/study/study"],{2968:function(e,t,n){"use strict";n.r(t);var i=n("f40c"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=o.a},"471c":function(e,t,n){"use strict";n.r(t);var i=n("eb53"),o=n("2968");for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("f1c7");var s=n("f0c5"),a=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);t["default"]=a.exports},"67eb":function(e,t,n){"use strict";(function(e,t){var i=n("4ea4");n("106e");i(n("66fd"));var o=i(n("471c"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},ae93:function(e,t,n){},eb53:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.otherNavText()),i=e.navList[0].isAct||e.navList[3].isAct||2!==e.courseCode?null:e.video2&&0!==e.video2.length,o=e.navList[0].isAct||e.navList[3].isAct||3!==e.courseCode?null:e.video3&&0!==e.video3.length;e._isMounted||(e.e0=function(t,n){var i=arguments[arguments.length-1].currentTarget.dataset,o=i.eventParams||i["event-params"];n=o.k;n.link?e.$win.show(n.link+"?courseCode="+e.courseCode):e.$win.nlog("暂未开放该功能")},e.e1=function(t,n){var i=arguments[arguments.length-1].currentTarget.dataset,o=i.eventParams||i["event-params"];n=o.k;n.link?e.$win.show(n.link+"?courseCode="+e.courseCode):e.$win.nlog("该功能暂未开放")},e.e2=function(t){return e.$win.show("/page_study/lianti/lianti?type=顺序练题&courseCode="+e.courseCode)},e.e3=function(t,n){var i=arguments[arguments.length-1].currentTarget.dataset,o=i.eventParams||i["event-params"];n=o.k;n.link?e.$win.show(n.link):e.$win.nlog("该功能暂未开放")},e.e4=function(t,n){var i=arguments[arguments.length-1].currentTarget.dataset,o=i.eventParams||i["event-params"];n=o.k;n.link?e.$win.show(n.link+"?courseCode="+e.courseCode):e.$win.nlog("该功能暂未开放")},e.e5=function(t){e.$win.show("/page_study/monikaoshi/monikaoshi?courseCode="+e.courseCode)},e.e6=function(t,n){var i=arguments[arguments.length-1].currentTarget.dataset,o=i.eventParams||i["event-params"];n=o.k;n.link?e.$win.show(n.link):e.$win.nlog("该功能暂未开放")},e.e7=function(t){return e.$win.show("/page_login/index_2?code=1")},e.e8=function(e){return this.$win.show("/page_study/yuyinbobao/yuyinbobao?title=科目二")},e.e9=function(e){this.$win.show("/page_study/monikaoshi2/monikaoshi2")},e.e10=function(e,t){var n=arguments[arguments.length-1].currentTarget.dataset,i=n.eventParams||n["event-params"];t=i.k;return this.$win.show(t.link+"?title=科目三")}),e.$mp.data=Object.assign({},{$root:{m0:n,g0:i,g1:o}})},o=[]},f1c7:function(e,t,n){"use strict";var i=n("ae93"),o=n.n(i);o.a},f40c:function(e,t,n){"use strict";(function(e){var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("2eee")),r=i(n("c973")),s=i(n("9523")),a=n("26cb");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){(0,s.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d={data:function(){return{cdn:this.$conf.CDN_HOST,tikuMsg:"未选择题库",courseCode:1,navList:[{name:"科目一",isAct:!0},{name:"科目二",isAct:!1},{name:"科目三",isAct:!1},{name:"科目四",isAct:!1}],otherNav:[{style:"st",link:"/page_study/kaogui/kaogui"},{style:"nd",link:"/page_study/datijiqiao/datijiqiao"},{style:"rd",link:"/page_study/tubiaoguanli/tubiaoguanli"}],option:[{pic:"/icon/study/lightMock.svg",text:"灯光模拟",link:"/page_study/dengguangmoni/dengguangmoni"},{pic:"/icon/study/voice.svg",text:"语音播报",link:"/page_study/yuyinbobao/yuyinbobao"}],practiceL:[{pic:"/image/study/cuoti.png",text:"我的错题",link:"/page_study/cuoti/cuoti"}],practiceR:[{pic:"/image/study/VIP.png",text:"VIP课程"},{pic:"/image/study/weizuoti.png",text:"未做题"}],mockExamL:[{pic:"/image/study/suijilianxi.png",text:"随机练习"},{pic:"/image/study/shoucang.png",text:"我的收藏",link:"/page_study/shoucang/shoucang"}],mockExamR:[{pic:"/image/study/wodechengji.png",text:"我的成绩"}]}},methods:c(c({screenChange:function(t){this.video=e.createVideoContext("video_play"),this.video.play(),console.log("全屏",t)},playVideo:function(t){console.log("播放",t),this.videoContext=e.createVideoContext("video_play"),this.videoContext.requestFullScreen({direction:90})}},(0,a.mapActions)({getUserTikuMsg_fun:"user/getUserTikuMsg",getUserInfo_fun:"user/getUserInfo",getPro_fun:"study/getQuetionId",getVideo2_fun:"study/getVideo2",getVideo3_fun:"study/getVideo3"})),{},{navAct:function(e,t){for(var n=0;n<this.navList.length;n++)this.navList[n].isAct=!1;e.isAct=!0,this.courseCode=t+1,t+1!=1&&t+1!=4||this.getPro(t+1),2==this.courseCode?this.getVideo2():3==this.courseCode&&this.getVideo3(),this.getLink()},otherNavText:function(){for(var e=0;e<this.navList.length;e++)if(this.navList[e].isAct){var t="";return 0===e||3===e?(t=0===e?"科一考规":"科四考规",[t,"答题技巧","图标管理"]):(t=1===e?"科二考规":"科三考规",[t,"考试秘籍","学车技巧"])}},getLink:function(){this.navList[0].isAct||this.navList[3].isAct?(this.otherNav[1].link="/page_study/datijiqiao/datijiqiao",this.otherNav[2].link="/page_study/tubiaoguanli/tubiaoguanli"):(this.otherNav[1].link="/page_study/kaoshimiji/kaoshimiji",this.otherNav[2].link="/page_study/xuechejiqiao/xuechejiqiao")},dispVideo:function(){var e=this.navList[2].isAct?this.video3:this.video2;return e},toDetail:function(e){var t=e.richText.replace(/<font color="(.*?)">(.*?)<\/font>/g,'<span style="color:$1">$2</span>');console.log(t,"lll"),this.$db.setSync("_richText",t),this.$win.show("/page_study/videoView/videoView?video="+e.video+"&name="+e.name+"&richText=".concat(encodeURIComponent(t),"&content=").concat(e.content))},getMyTiku:function(){var e=this;return(0,r.default)(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={userId:e.$db.getSync("userId")},t.next=3,e.getUserTikuMsg_fun(n);case 3:t.sent;case 4:case"end":return t.stop()}}),t)})))()},getUserInfo:function(){var e=this;return(0,r.default)(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={userId:e.$db.getSync("userId")},t.next=3,e.getUserInfo_fun(n);case 3:t.sent;case 4:case"end":return t.stop()}}),t)})))()},getPro:function(e){var t=this;return(0,r.default)(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i={userId:t.$db.getSync("userId"),courseCode:e},console.log("pro’",t.$db.getSync("userId")),n.next=4,t.getPro_fun(i);case 4:n.sent;case 5:case"end":return n.stop()}}),n)})))()},getVideo2:function(){var e=this;return(0,r.default)(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={userId:e.$db.getSync("userId")},t.next=3,e.getVideo2_fun(n);case 3:t.sent;case 4:case"end":return t.stop()}}),t)})))()},getVideo3:function(){var e=this;return(0,r.default)(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={userId:e.$db.getSync("userId")},t.next=3,e.getVideo3_fun(n);case 3:t.sent;case 4:case"end":return t.stop()}}),t)})))()}}),computed:c({},(0,a.mapState)({myTiku:function(e){return e.user.tikuType},pro:function(e){return e.study.id},sum:function(e){return e.study.sum},video2:function(e){return e.study.video2},video3:function(e){return e.study.video3}})),onShow:function(){this.getUserInfo(),1!=this.courseCode&&4!=this.courseCode||this.getPro(this.courseCode)},onLoad:function(){}};t.default=d}).call(this,n("543d")["default"])}},[["67eb","common/runtime","common/vendor"]]]);