(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page_my/pinche/toPinche/toPinche"],{"2a84":function(t,e,n){"use strict";n.r(e);var i=n("fb9b"),u=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=u.a},"8a6a":function(t,e,n){"use strict";var i=n("e3c3"),u=n.n(i);u.a},"954a":function(t,e,n){"use strict";n.r(e);var i=n("b584"),u=n("2a84");for(var r in u)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(r);n("8a6a");var a=n("f0c5"),o=Object(a["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=o.exports},b584:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){}));var i=function(){var t=this.$createElement;this._self._c},u=[]},bcac:function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("106e");i(n("66fd"));var u=i(n("954a"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(u.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},e3c3:function(t,e,n){},fb9b:function(t,e,n){"use strict";(function(t){var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=i(n("2eee")),r=i(n("c973")),a=i(n("9523")),o=n("26cb");i(n("3604"));function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){(0,a.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var d={data:function(){return{cdn:this.$conf.CDN_HOST,longitude:null,latitude:null,startLongitude:null,startLatitude:null,endLongitude:null,endLatitude:null,name:null,phone:null,time:null,date:null,startAddress:null,endAddress:null,isBanBtn:!1}},computed:c({},(0,o.mapState)({price:function(t){return t.pinche.price}})),watch:{startAddress:function(){this.startAddress&&this.endAddress?this.getPrice():this.$win.nlog("请选择出发地或目的地")},endAddress:function(){this.startAddress&&this.endAddress?this.getPrice():this.$win.nlog("请选择出发地或目的地")}},methods:c(c({},(0,o.mapActions)({getPrice_fun:"pinche/countPrice",subFrom_fun:"pinche/toPinche"})),{},{bindTimeChange:function(t){this.time=t.detail.value},bindDateChange:function(t){this.date=t.detail.value},chooseLocation:function(e){var n=this;t.chooseLocation({longitude:this.longitude,latitude:this.latitude,success:function(t){console.log("位置名称："+t.name),console.log("详细地址："+t.address),console.log("纬度："+t.latitude),console.log("经度："+t.longitude),0==e?(n.startAddress=t.name,n.startLatitude=t.latitude,n.startLongitude=t.longitude):1==e&&(n.endAddress=t.name,n.endLatitude=t.latitude,n.endLongitude=t.longitude)}})},getLocation:function(){var e=this;t.getLocation({type:"gcj02",success:function(t){console.log("当前位置的经度："+t.longitude),console.log("当前位置的纬度："+t.latitude),console.log("\n"),e.latitude=t.latitude,e.longitude=t.longitude},fail:function(e){t.showToast({title:"获取位置失败",icon:"error"})}})},countPrice:function(){t.request({url:"http://192.168.1.136:8080/renren-fast/app/wxcarpool/price",method:"POST",data:{stLongitude:this.startLongitude,stLatitude:this.startLatitude,edLongitude:this.endLongitude,edLatitude:this.endLatitude},success:function(t){console.log(t)},fail:function(e){t.showToast({title:"错误",icon:"error"})}})},getPrice:function(){var t=this;return(0,r.default)(u.default.mark((function e(){var n;return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(null!=t.startLongitude&&null!=t.startLatitude){e.next=5;break}return t.$win.nlog("请选择出发点"),e.abrupt("return",0);case 5:if(null!=t.endLongitude&&null!=t.endLatitude){e.next=8;break}return t.$win.nlog("请选择目的地"),e.abrupt("return",0);case 8:return n={stLongitude:t.startLongitude,stLatitude:t.startLatitude,edLongitude:t.endLongitude,edLatitude:t.endLatitude},e.next=11,t.getPrice_fun(n);case 11:e.sent;case 12:case"end":return e.stop()}}),e)})))()},subPinche:function(t){var e=this;return(0,r.default)(u.default.mark((function n(){var i;return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=c({fqUserid:e.$db.getSync("userId")},t),n.next=3,e.subFrom_fun(i);case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()},Pay:function(){return(0,r.default)(u.default.mark((function e(){return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getProvider({service:"payment",success:function(t){console.log("s",t)},fail:function(t){console.log("f",res)}});case 1:case"end":return e.stop()}}),e)})))()},sub:function(){var t={fqName:this.name,fqPhone:this.phone,time:this.date+"/"+this.time,startPlace:this.startAddress,endPlace:this.endAddress,price:this.price,statu:0};this.subPinche(t)}}),onLoad:function(){this.getLocation(),this.datetimesingle=Date.now()-1728e5}};e.default=d}).call(this,n("543d")["default"])}},[["bcac","common/runtime","common/vendor"]]]);