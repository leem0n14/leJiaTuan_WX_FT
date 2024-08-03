<template>
	<view class="my">
		<view class="background">
			<image :src="cdn+'/coachSection/background/background.png'" mode="aspectFill"></image>
		</view>
		<view class="content">
			<!-- 用户信息 -->
			<view class="userMsg">
				<div class="editable" @click="editMyMsg">
					<image class="pic"
						:src="(personMsg.head!=null)?cdn+'/user/'+personMsg.head:(cdn+'/image/user/noLogin.png')"
						style="background-color: #f2f3f5;"></image>
					<div>
						<view class="name">{{personMsg.name==null?'微信用户':personMsg.name}}</view>
						<!-- <view class="phone">(手机号码)</view> -->
						<div class="edit">
							<div>{{'设置个人信息'}}</div>
							<uni-icons type="gear-filled" color="#fff"></uni-icons>
						</div>
					</div>
				</div>
				<view class="signIn" @click="$win.show('/page_my/signIn/signIn')">
					<image :src="cdn+'/icon/signIn/signIn.svg'" mode="aspectFit"></image>
					<text>签到</text>
				</view>
			</view>
			<!-- 进度 -->
			<view class="plan" @click="$win.show('/page_study/studyProgress/studyProgress?type=0')" v-show="false">
				<view class="text">学车进度</view>
				<view class="probar">
					<view class="course" v-for="(k,i) in chartData.data" :key="i">
						<view style="height: 100%;width: 100%;" v-if="(k.series[0].data<1)&&(k.series[0].data>=0)">
							<qiun-data-charts type="arcbar" :opts="opts" :chartData="k" :reshow="true" />
							<text class="num">{{k.series[0].data*100+'%'}}</text>
						</view>
						<view style="height: 100%;width: 100%;" v-else>
							<view class="finished" v-if="k.series[0].data==1">
								<icon type="success" size="68rpx" color="#38cb6f" class="icon" />
							</view>
							<view class="noOpen" v-else></view>
						</view>
						<text class="courseName">{{k.series[0].name}}</text>
					</view>
				</view>

			</view>
			<!-- 我的功能 -->
			<view class="function">
				<view class="son" v-for="(k,i) in box_nd" @click="(k.link)?$win.show(k.link):$win.nlog('该功能暂未开放')">
					<image :src="cdn+k.pic" mode="aspectFill">
					</image>
					<view class="text">{{k.name}}</view>
					<!-- <view class="red" v-if="k.isNew">
						
					</view> -->
				</view>
			</view>
			<!-- 最后一个盒子 -->
			<view class="last">
				<view class="son" v-for="(k,i) in box_rd" @click="$win.show(k.link)">
					<image :src="cdn+k.pic" mode="aspectFit"></image>
					<view class="text">{{k.name}}</view>
					<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFit" class="right"></image>
				</view>
			</view>

			<!-- //教练端入口 -->
			<view class="coachIO" v-if="$db.getSync('identity')==2" @click="$win.go('/page_coachSection/coachSection')">
				教练端入口
			</view>

			<!-- 固定定位客服 -->
			<view class="fixed">
				<image :src="cdn+'/image/my/kefu.png'" mode="aspectFit"></image>
				<button open-type="contact">1111</button>
			</view>
			<!-- 固定身份认证 -->
			<view class="status" @click="$win.show('/page_login/status/status')">
				身份认证
			</view>
			<!-- <div>{{$db.getSync('scene')+e}}</div> -->
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				e: 'e',
				scene: 'ngm',
				avatarUrl: '',
				nickName: '',
				token: '',
				px: null,
				proWidth: this.px * 6,
				style: {
					open: '#aee9c4',
					close: '#ededed',
				},
				cdn: this.$conf.CDN_HOST,
				course: ['科目一', '科目二', '科目三', '科目四'],
				// 进度条数据
				chartData: {},
				// 进度条样式
				opts: {
					extra: {
						arcbar: {
							type: "circle",
							width: this.proWidth, //进度条宽度
						}
					},
				},
				// 二号盒子功能栏
				box_nd: [{
						pic: '/image/my/pintuanIcon.png',
						name: '我的拼团',
						link: '/page_my/pinTuan/pintuanList/pintuanList',
						isNew: true,
					},
					{
						pic: '/image/my/dingdanIcon.png',
						name: '我的订单',
						link: '/page_my/orders/orders',
						isNew: false,
					},
					{
						pic: '/image/my/myCoachIcon.png',
						name: '我的报名',
						link: '/page_my/myBaoming/myBaoming',
						isNew: true,
					},
					{
						pic: '/image/my/myBookingIcon.png',
						name: '我的预约',
						link: '/page_my/myBooking/myBooking',
						isNew: false,
					},
					{
						pic: '/image/my/myFenqiIcon.png',
						name: '我的分期',
						// link: '/page_my/myFenqi/myFenqi',
						isNew: false,
					},
					{
						pic: '/image/my/youhuiquanIcon.png',
						name: '优惠券',
						link: '/page_my/myCoupon/myCoupon',
						isNew: false,
					},
					{
						pic: '/image/my/myFenxiaoIcon.png',
						name: '我的分销',
						// link: '/page_my/distribution/distribution',
						isNew: false,
					},
					{
						pic: '/image/my/myPincheIcon.png',
						name: '我的拼车',
						link: '/page_my/pinche/pinche',
						isNew: false,
					},
				],
				//三号盒子功能栏
				box_rd: [{
					pic: '/image/my/fankui.png',
					name: '意见反馈',
					link: '/page_my/returnOpinion/returnOpinion',
				}]
			};
		},
		methods: {
			toPX() {
				//根据用户设备屏幕大小设置宽度
				this.px = uni.getWindowInfo().screenWidth / 750
				console.log('lwlsb', this.px)
				// this.opts.extra.arcbar.width = 6 * this.px
			},
			getServerData() {
				setTimeout(() => {
					let res = {
						data: [{
								series: [{
									name: "科目一",
									data: 1,
								}]
							},
							{
								series: [{
									name: "科目二",
									data: 0.26,
								}]
							},
							{
								series: [{
									name: "科目三",
									data: -1,
								}]
							},
							{
								series: [{
									name: "科目四",
									data: -1,
								}]
							}
						],
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			...mapActions({
				getStudyProgress_fun: 'my/getStudyProgress',
				getPersonMsg_fun: 'user/getPerson',
			}),
			async getStudyProgress() {
				let data = {}
				let res = await this.getStudyProgress_fun(data)
			},
			statusRoute() {
				let status = this.$db.getSync('identity')
				console.log('身份', status);
				if (status == 2) {
					this.$win.go('/page_coachSection/coachSection')
				}
			},
			//编辑个人信息
			editMyMsg() {
				console.log('edit');
				this.$win.show('/page_my/myMsg/myMsg')
			},
			//拿个人信息
			async getPersonMsg() {
				let params = {
					userId: this.$db.getSync('userId'),
				}
				let res = await this.getPersonMsg_fun(params)

			}
		},
		computed: {
			...mapState({
				study: state => state.my.study,
				personMsg: state => state.user.getPersonRes,
			})
		},
		onLoad(e) {
			this.toPX()
			this.avatarUrl = this.$db.getSync('avatarUrl')
			this.nickName = this.$db.getSync('nickName')
			this.token = this.$db.getSync('token')
			
			

				},
				onShow() {
					console.log(this.chartData)
					this.getStudyProgress()
					this.getPersonMsg()
					// this.statusRoute()
				},

				onReady() {
					this.getServerData();


				},

		}
</script>

<style lang="scss">
	// image{
	// 	background-color: #29C563;
	// }

	page {
		background-color: #f2f3f5;
	}

	// 背景start

	.background {
		position: relative;

		// background-color: pink;
		image {
			width: 750rpx;
			height: 337rpx;
			z-index: -3;
		}
	}


	// 背景end

	// 内容大盒子start
	.content {
		position: relative;
		top: -287rpx;
		width: 690rpx;
		// height: 600rpx;
		margin: 0 auto;

	}

	//内容大盒子end

	// 用户信息start
	.userMsg {
		position: relative;
		// background-color: skyblue;
		height: 100rpx;
		width: 100%;
	}

	.userMsg .pic {
		position: absolute;
		left: 30rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
	}

	.userMsg .name {
		position: absolute;
		top: 8rpx;
		left: 170rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #ffffff;
		line-height: 40rpx;
	}

	.userMsg .edit {
		display: flex;
		position: absolute;
		left: 170rpx;
		bottom: 16rpx;
		height: 28rpx;
		opacity: 0.8;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 28rpx;
	}

	.userMsg .noLogin {
		position: absolute;
		left: 170rpx;
		top: 30rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 40rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #ffffff;
	}

	.userMsg .signIn {
		position: absolute;
		right: 30rpx;
		top: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 130rpx;
		height: 55rpx;
		background: #ffffff;
		border-radius: 28rpx;
	}



	.userMsg .signIn image {
		margin-right: 7rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.userMsg .signIn text {
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffbb1e;
	}

	// 用户信息end

	// 学车进度start
	.plan {
		display: flex;
		position: relative;
		margin-top: 30rpx;
		width: 690rpx;
		height: 250rpx;
		background: #ffffff;
		border-radius: 16rpx;
	}

	.plan .text {
		position: absolute;
		top: 40rpx;
		left: 30rpx;
		width: 112rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #333333;
		line-height: 28rpx;
	}


	// 进度条start
	.probar {
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 200rpx;
		// background-color: pink;
	}

	.course {
		position: relative;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		width: 100rpx;
		height: 100rpx;
	}

	.course:nth-child(-n+3)::after {
		position: absolute;
		top: 48rpx;
		right: -66rpx;
		content: '';
		width: 60rpx;
		height: 4rpx;
		opacity: 0.4;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 2rpx;
	}

	.course .num {
		position: absolute;
		top: 32rpx;
		left: 15rpx;
		height: 40rpx;
		width: 70rpx;
		line-height: 40rpx;
		text-align: center;
		color: #29C563;
	}

	.course .courseName {
		position: absolute;
		width: 100rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 29rpx;
	}

	.course .finished {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		width: 80rpx;
		height: 80rpx;
		box-sizing: border-box;
		border: 4rpx solid #b5ebc5;
		border-radius: 50%;
	}

	.course .noOpen {
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		width: 80rpx;
		height: 80rpx;
		box-sizing: border-box;
		border: 4rpx solid #ededed;
		border-radius: 50%;
	}

	// 进度条end
	//学车进度end

	// 我的功能start
	.function {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		max-width: 690rpx;
		min-height: 180rpx;
		padding: 15rpx 0;
		background: #ffffff;
		border-radius: 16rpx;
		margin-top: 20rpx;
		overflow-x: scroll;
	}

	.function .son {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 110rpx;
		width: 96rpx;
		margin: 25rpx 38rpx;
	}

	.function .son image {
		width: 70rpx;
		height: 70rpx;

	}

	.function .son .red {
		position: absolute;
		top: -6rpx;
		right: 8rpx;
		width: 12rpx;
		height: 12rpx;
		background: #f93030;
		border-radius: 50%;
	}


	.function .son .text {
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 24rpx;
	}

	// 我的功能end

	// 最后一个盒子start
	.last {
		margin-top: 20rpx;
		width: 690rpx;
		background-color: #fff;
		border-radius: 16rpx;
		max-height: 440rpx;
		overflow-y: scroll;
	}

	.last .son {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: left;
		height: 88rpx;
	}

	.last .son image {
		margin: 0 30rpx;
		height: 45rpx;
		width: 45rpx;
	}

	.last .son .right {
		position: absolute;
		right: 30rpx;
		width: 17rpx;
		height: 17rpx;
	}

	.last .son .text {
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 28rpx;
	}

	// 最后一个盒子end
	// 固定定位客服start
	.fixed {
		position: fixed;
		bottom: 50rpx;
		right: 0;
		width: 160rpx;
		height: 160rpx;
		// background-color: pink;
	}

	.fixed image {
		position: absolute;
		width: 160rpx;
		height: 160rpx;
	}

	.fixed button {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		opacity: 0;
		width: 120rpx;
		height: 120rpx;
		z-index: 2;
	}

	//教练端入口
	.coachIO {
		margin: 20rpx auto 0;
		text-align: center;
		margin-top: 20rpx;
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #34cd6d;
		border-radius: 16rpx;
		color: #fff;
		font-size: 32rpx;
	}



	//固定定位客服end

	.status {
		margin: 20rpx auto 0;
		text-align: center;
		margin-top: 20rpx;
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		// background-color: #34cd6d;
		border-radius: 16rpx;
		color: #fff;
		font-size: 32rpx;
		background: linear-gradient(180deg, #49ccf5, #4988f5);
	}
</style>