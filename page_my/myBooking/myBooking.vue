<!-- 我的预约 -->
<template>
	<view>
		<!-- 导航栏 -->
		<view class="nav">
			<view v-for="(k,i) in navArr" class="son" @click="navChange(k)"
				:style="{'backgroundColor':k.isShow?'#29c563':'#ffffff','color':k.isShow?'#ffffff':'#333333'}">
				{{k.text}}
			</view>
		</view>


		<!-- 上半 -->
		<!-- 无预约记录 -->
		<view class="hd" v-if="true">
			<image :src="cdn+'/image/myBooking/practiceBooking.png'" mode="aspectFit" v-if="navArr[0].isShow"></image>
			<image :src="cdn+'/image/myBooking/examBooking.png'" mode="aspectFit" v-else></image>
			<button class="goBooking" @click="$win.show('/page_indexOperate/bookingPractice/bookingPractice')"
				v-if="navArr[0].isShow">立即预约</button>
			<button class="goBooking" @click="$win.show('bookingExam/bookingExam')" v-else>立即预约</button>
		</view>

		<view class="hd userMsg" v-else>
			<!-- 信息项 -->
			<!-- 练车 -->
			<view class="son l" v-if="navArr[0].isShow">
				<view v-for="(k,i) in practiceOptions" :key="i">
					{{k}}
				</view>
			</view>
			<!-- 考试 -->
			<view class="son l" v-else>
				<view v-for="(k,i) in examOptions" :key="i">
					{{k}}
				</view>
			</view>
			<!-- 信息项 -->
			<!-- 练车 -->
			<view class="son r" v-if="navArr[0].isShow">
				<view v-for="(val,key) in practiceMsg" :key="key">
					{{val}}
				</view>
			</view>
			<!-- 考试 -->
			<view class="son r" v-else>
				<view v-for="(val,key) in examMsg" :key="key">
					{{val}}
				</view>
			</view>
		</view>

		<!-- 下半 -->
		<view class="bd">
			<view class="bdTop">
				<text class="title">预约记录</text>
				<text class="rule" @click="seeRule">预约规则</text>
			</view>

			<view class="noBooking" v-if="Plist.length==0">
				<image :src="cdn+'/image/noList/noBooking.png'" mode="aspectFit"></image>
				<view class="text">暂无预约记录</view>
			</view>

			<view class="body" v-else>
				<view style="width: 690rpx;" v-if="navArr[0].isShow">
					<view class="son" v-for="(k,i) in Plist" :key="i">
						<view class="up">
							<view class="user">{{k.mpName}}&nbsp;{{k.phone}}</view>
							<view class="type">{{k.carTypes+k.object}}</view>
						</view>
						<view class="down">
							<view class="practiceTime">场地：{{k.site?k.site:'无'}}</view>
							<view class="address">接送地址：{{k.mpAdd?k.mpAdd:'无'}}</view>
							<view class="practiceTime">练车时间：{{k.carTime?k.carTime:'无'}}</view>
							<view class="practiceTime">添加时间：{{k.addTime?k.addTime.substr(0,10):'无'}}</view>
							<button class="pingjia1" @click="postCanel(k.id)" v-show="k.ifEvaluate==0">取消</button>
							<button class="pingjia1" v-show="k.statu==='已取消'&&k.ifEvaluate==0"
								:disabled="k.statu!='已取消'">已取消</button>
							<button class="pingjia" @click="$win.show('/page_my/myCoach/myCoach?id='+k.id)"
								:disabled="k.ifEvaluate==2"
								v-show="k.ifEvaluate!=0">{{k.ifEvaluate==1?'去评价':'已评价'}}</button>
							<!-- <view class="time">接送时间：{{}}</view> -->
						</view>
						<view class="done" style="margin: 0 0 20rpx;">
							<div v-show="k.carId">
								被分配到的车辆:{{k.carId}}
							</div>
							<div v-show="k.reason">
								预约失败(原因):{{k.reason}}
							</div>
						</view>
					</view>
				</view>

				<view style="width: 690rpx;" v-else>
					<view class="son" v-for="(k,i) in examRecordings" :key="i">
						<view class="up">
							<view class="user">{{k.name}}&nbsp;{{k.phone}}</view>
							<view class="course">{{k.course}}</view>
						</view>
						<view class="down">
							<view class="examAddress">考试地址：{{k.examAddress}}</view>
							<view class="examTime">考试时间：{{k.examTime}}</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				pageIndex: 1,
				pageSize: 10,
				navArr: [{
					text: '预约练车',
					isShow: true,
					isFirst: true,
				}, {
					text: '预约考试',
					isShow: false,
					isFirst: true,
				}],

				//是否有记录
				havePracticeRecordings: false,
				haveExamRecordings: false,

				// 预约练车信息项
				practiceOptions: ['姓名', '手机号码', '车型', '练车时间', '接送地址', '接送时间'],

				//预约考试信息项
				examOptions: ['姓名', '手机号码', '考试科目', '考试地址', '考试时间'],

				// 用户预约练车信息
				practiceMsg: {
					name: '张三',
					phone: '152****1645',
					carType: '手动挡',
					practicetime: '2019/06/12 15:00',
					address: '梅州市梅江区华侨城新中路2号',
					time: '2019/06/12 14:00 - 14:30',
				},

				// 用户预约考试信息
				examMsg: {
					name: '张三',
					phone: '152****1645',
					examCourse: '科目二',
					examAddress: '梅州市梅江区华侨城新中路2号',
					examTime: '2019/06/12 14:00 - 14:30',
				},


				//规则
				//练车预约规则
				practiceRuleStr: '规则string',
				//考试预约规则
				examRuleStr: `1、首次预约科目一考试的，以初次申领驾驶证、申请增驾业务时间为排序时间；档案送到车管所受理代办单成功，出流水号那一天算起。
				
				2、那科目二科目三排序规则是以你科目一合格的那一天开始排序，别人比你早考科目一合格一天，就比你排名靠前，注意：三年有效期。
				
				3、首次预约科目一考试的，以上次考试时间为排序时间；如果你科目一考挂了，再预约科目一的时候，是以考挂了的那天排队，不是再以受理成功的那一天算起了。科目三难约是短期情况，同理类推：科目二科目三各科挂了，以挂了的那一天开始排队，不及格十天后可以预约，但不一定能够预约成功。
				
				4、考试预约成功的用户因自身原因取消预约的，以取消预约时间为排序时间，非自身原因不能考试的，排序时间不变；如果你约成功了，又取消了，以你取消的那天排队，不再以受理的时间排序了。
				
				5、综合来说，系统以申请人的业务受理时间、上一次考试时间、上一次取消考试预约时间三者中最大时间的先后顺序作为排序规则，排名在前面的优先安排考试。
				
				预约时间结束后，系统将按照排序上述规则进行分配确认，并反馈公示预约结果。
				
				6、需要取消的话，申请人在本平台预约后，因故需取消预约的，必须在您申请的考试计划截止前提出。预约成功受理后，如因故无法参加考试的，请至少提前1天凭本人的身份证到考试中心取消考试。
				
				7、预约方法：申请预约的总人数跟你没有关系，你只看你的排名跟计划人数就行了，排名靠前就约，或者有马上截止报名的日期你排名在计划内就预约，这样预约成功的几率就会很大。
				`,
			}
		},

		methods: {
			...mapActions({
				getPlist_fun: 'booking/getPracticeList',
				getElist_fun: 'booking/getExamList',
				toBP_fun: 'booking/toPractice',
				toBE_fun: 'booking/toExam',
				postCanel_fun: 'booking/postCanel',
				getRule_fun: 'booking/getBookingRule',
			}),

			// 查看预约规则
			async seeRule() {
				await this.getRule_fun({
					way: 1
				})
				uni.showModal({
					title: '预约规则',
					content: this.navArr[0].isShow ? this.bookingRule.rule : this.examRuleStr,
					showCancel: false
				})
			},

			// 取消按钮
			canceBtnl(e) {
				this.postCanel(e)
				// this.getPracticeList()
			},
			//显示对应的记录
			showRecording() {
				if (this.navArr[0].isShow)
					return this.havePracticeRecordings
				else
					return this.haveExamRecordings
			},
			//关闭规则窗
			close() {
				this.actRule = false
			},
			navChange(k) {
				for (var a = 0; a < this.navArr.length; a++) {
					this.navArr[a].isShow = false
				}
				k.isShow = true
				if (k.isFirst) {
					this.seeRule()
					k.isFirst = false
				}
				console.log(k,"kkkkkkkkkkkkkkkkk")
			},
			async getPracticeList(i) {
				let data = {
					userId: this.$db.getSync('userId'),
					limit: this.pageSize,
					page: this.pageIndex,
					i, //判断是否拿第一页，没这个参数就是拿第一页
				}
				let res = await this.getPlist_fun(data)
			},
			async getExamList() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getElist_fun(data)
			},
			async postCanel(e) {
				let data = {
					id: e
				}
				let res = await this.postCanel_fun(data)
				this.getPracticeList()
			}

		},
		computed: {
			...mapState({
				Plist: state => state.booking.practiceRecordList,
				Elist: state => state.booking.examRecordList,
				bookingRule: state => state.booking.bookingRule,
			})
		},
		onReachBottom() {
			this.pageIndex++
			this.getPracticeList(1)
		},
		onShow() {
			this.getPracticeList()
		},
		onLoad() {


		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #29c563;
	// }

	page {
		position: relative;
	}

	/* 导航栏 */
	.nav {
		display: flex;
		margin: 24rpx auto;
		width: 440rpx;
		height: 64rpx;
		background: #ffffff;
		border: 2rpx solid #29c563;
		border-radius: 34rpx;
		overflow: hidden;
	}

	.nav .son {
		width: 220rpx;
		height: 64rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		line-height: 64rpx;
	}

	/* 头部start */
	.hd {
		position: absolute;
		top: 114rpx;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 690rpx;
		height: 396rpx;
		margin: 0rpx 30rpx 50rpx;
		border-radius: 16rpx;
		background: #f5f5f5;
	}

	.userMsg {
		box-sizing: border-box;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
	}


	.userMsg .son {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		position: absolute;
		height: 100%;

	}

	.userMsg .l {
		padding-left: 30rpx;
		left: 0;
		text-align: left;
	}

	.userMsg .r {
		padding-right: 30rpx;
		right: 0;
		text-align: right;
	}

	.l view,
	.r view {
		font-size: 28rpx;
		height: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		color: #ffffff;
		line-height: 28rpx;
	}

	.hd image {
		width: 475rpx;
		height: 173rpx;
		margin-top: 69rpx;
	}

	.hd .goBooking {
		width: 250rpx;
		height: 60rpx;
		margin-top: 40rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 30rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 60rpx;
	}

	/* 头部end */

	/* bd部分start */
	.bd {
		position: absolute;
		top: 566rpx;
		left: 0;
		width: 100%;
		height: 70%;
	}

	.bd .bdTop {
		display: flex;
		justify-content: space-between;
		padding: 15rpx 30rpx;
	}

	.bd .bdTop .title {
		height: 36rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #333333;
		line-height: 36rpx;
	}

	.bd .rule {
		height: 36rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #47d17b;
		line-height: 36rpx;
	}

	.box {
		position: fixed;
		box-sizing: border-box;
		top: 60rpx;
		left: 30rpx;
		width: 690rpx;
		height: 1000rpx;
		padding: 25rpx;
		border: 2rpx solid #999;
		border-radius: 16rpx;
		color: #333;
		background-color: #f2f3f5;
		z-index: 2;
		opacity: 0.8;
	}

	.box .title {
		font-size: 36rpx;
		color: #db2810;
		font-weight: 600;
		margin-bottom: 25rpx;
	}

	.box .close {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}

	/* .box:before {
		position: absolute;
		top: -30rpx;
		right: 60rpx;
		content: '';
		height: 0;
		width: 0;
		border-left: 30rpx solid transparent;
		border-right: 30rpx solid transparent;
		border-bottom: 30rpx solid #999;
	}

	.box:after {
		position: absolute;
		top: -28rpx;
		right: 60rpx;
		content: '';
		height: 0;
		width: 0;
		border-left: 30rpx solid transparent;
		border-right: 30rpx solid transparent;
		border-bottom: 30rpx solid #f2f3f5;
	} */

	.box .ruleText {
		margin-top: 10rpx;
		max-height: 875rpx;
		overflow-y: auto;
	}

	.bd .noBooking {
		margin: 132rpx auto 0;
		width: 326rpx;
		height: 163rpx;
	}

	.bd .noBooking image {
		width: 326rpx;
		height: 163rpx;
	}

	.bd .noBooking .text {
		width: 168rpx;
		height: 28rpx;
		margin: 30rpx auto;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 28rpx;
	}

	.bd .body {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 690rpx;
		// height: 540rpx;
		// height: 45vh;
		margin: 0 30rpx;
		overflow: auto;
	}

	.bd .body .son {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: 30rpx;
		border-bottom: 2rpx solid #eff0f2;
	}

	.bd .body .son .up {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 30rpx;
		width: 100%;
	}

	.bd .body .son .up .user {
		height: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 30rpx;
	}

	.bd .body .son .up .type,
	.bd .body .son .up .course {
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #333333;
		line-height: 28rpx;
	}

	.bd .body .son .down {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		padding: 15rpx 0;

		.pingjia {
			position: absolute;
			right: 0;
			// bottom: ;
			// display: inline-block;
			height: 60rpx;
			background: linear-gradient(134deg, #54d685, #29c563 99%);
			border-radius: 30rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
			line-height: 60rpx;
		}

		.pingjia1 {
			position: absolute;
			right: 8rpx;
			// bottom: ;
			// display: inline-block;
			height: 60rpx;
			background: linear-gradient(134deg, #F44336, #F44336 99%);
			border-radius: 30rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
			line-height: 60rpx;
		}

	}

	.bd .body .son .down view {
		margin-bottom: 16rpx;
		height: 26rpx;
		max-width: 500rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 26rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	/* bd部分end */
</style>