<!-- 教练端 -->
<template>
	<view>
		<image :src="cdn+'/coachSection/background/background.png'" mode="aspectFit" class="background"></image>
		<!-- 用户信息 -->
		<view class="userMsg">
			<view class="msg">
				<image :src="cdn+'/user/'+user.head" mode="aspectFill"></image>
				<view class="text">
					<text class="name">{{user.name}}</text>
					<text class="phone">{{user.phone}}</text>
				</view>
			</view>
			<view class="signIn" @click="$win.show('/page_my/signIn/signIn')">
				<image :src="cdn+'/icon/signIn/signIn.svg'" mode="aspectFill"></image>
				<text>签到</text>
			</view>
		</view>
		<!-- 功能 -->
		<view class="function">
			<view class="up">
				<view class="studentsMsg" @click="$win.show('studentManage/studentManage')">
					<image :src="cdn+'/coachSection/background/studentMsg.png'" mode="aspectFill" class="bg"></image>
					<text class="name">学员管理</text>
					<text class="num">{{msg.studentNum}}</text>
				</view>
				<view class="booking" @click="$win.show('studentsBooking/studentsBooking')">
					<image :src="cdn+'/coachSection/background/studentBooking.png'" mode="aspectFill" class="bg">
					</image>
					<text class="name">学员预约</text>
					<text class="num">{{msg.mpNum}}</text>
				</view>
			</view>
			<view class="down">
				<view class="son" v-for="(k,i) in functionList" :key="i"
					@click="k.link?$win.show(k.link):$win.nlog('该功能暂未开放')">
					<image :src="cdn+'/coachSection/image'+k.pic" mode="aspectFill"></image>
					<text>{{k.text}}</text>
				</view>
			</view>
		</view>
		<!-- 车辆管理 -->
		<view class="manage">
			<view class="title">
				<text class="text">车辆管理</text>
				<view class="addCar" @click="$win.show('/page_coachSection/addCar/addCar')">
					<text>添加车辆</text>
					<view class="addIcon">
						+
					</view>
				</view>
			</view>
			<view class="noCar" v-if="msg.cars&&msg.cars.length==0">
				<image :src="cdn+'/coachSection/background/noCar.png'" mode="aspectFill"></image>
				<text>暂无车辆</text>
			</view>
			<view class="carLists" v-else>
				<view class="son" v-for="(k,i) in msg.cars" :key="i"
					@click="$win.show('addCar/addCar?id='+k.id+'&carId='+k.carId)">
					<view class="up">
						<text class="name">{{k.carType}}</text>
						<text class="name">{{k.carForm}}</text>
						<view class="plate">
							<!-- <view class="province">{{k.carId[0]}}</view> -->
							<view class="num">{{k.carId}}</view>
						</view>
					</view>
					<!-- 					<view class="down">
						<view class="insurance item">
							<view class="data">
								<text class="num">{{0}}</text>
							</view>
							<text class="text">保险</text>
						</view>
						<view class="maintenance item">
							<view class="data">
								<text class="num">{{0}}</text><text class="uiti">元</text>
							</view>
							<text class="text">保养</text>
						</view>
						<view class="accident item">
							<view class="data">
								<text class="num">{{0}}</text><text class="uiti">次</text>
							</view>
							<text class="text">出险</text>
						</view>
						<view class="fix item">
							<view class="data">
								<text class="num">{{0}}</text><text class="uiti">万元</text>
							</view>
							<text class="text">维修</text>
						</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				// haveCar: false,
				functionList: [{
						pic: '/cheliangfenpei.png',
						text: '车辆分配',
						link: 'carDistribution/carDistribution',
					},
					{
						pic: '/dakai.png',
						text: '考勤打卡',
						link: 'checking/checking',
					},
					{
						pic: '/wodefenxiao.png',
						text: '我的分销',
						link: '',
					},
					{
						pic: '/wodepinche.png',
						text: '我的拼车',
						link: 'myPinche/myPinche',
					}
				],
				
			}
		},
		methods: {
			...mapActions({
				getCoachMsg_fun: 'coachSection/getCoachMsg',
				getUserMsg_fun: 'user/getPerson',
			}),
			async getCoachMsg() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getCoachMsg_fun(data)
			},
			async getUserMsg() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getUserMsg_fun(data)
			},
		},
		computed: {
			...mapState({
				msg: state => state.coachSection.coachMsg,
				user: state => state.user.getPersonRes,
				userForm: state => state.user.getPersonForm,
			})
		},
		onLoad() {
			
		},
		onShow() {
			this.getCoachMsg()
			this.getUserMsg()
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f2f3f5;
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -2;
		width: 750rpx;
		height: 300rpx;
		// background-color: #3bcc71;
	}


	.userMsg,
	.function,
	.manage {
		box-sizing: border-box;
	}


	.userMsg {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 690rpx;
		height: 170rpx;
		padding: 0 30rpx;
		margin-top: 40rpx;
		background: #ffffff;
		border-radius: 16rpx;

		.msg {
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				width: 100rpx;
				height: 100rpx;
				background: #f2f3f5;
				border-radius: 50%;
			}

			.text {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				margin-left: 30rpx;
				text-align: left;
				color: #111111;
				font-family: Source Han Sans CN, Source Han Sans CN-Bold;

				text {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					max-width: 300rpx;
				}

				.name {
					margin-bottom: 16rpx;
					font-size: 40rpx;
					font-weight: 700;
				}

				.phone {
					opacity: 0.8;
					font-size: 28rpx;
					font-weight: 400;
				}
			}
		}

		.signIn {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 130rpx;
			height: 55rpx;
			background: #ffffff;
			border: 1rpx solid #ffbb1e;
			box-sizing: border-box;
			border-radius: 29rpx;

			image {
				margin-right: 7rpx;
				width: 30rpx;
				height: 30rpx;
				// background: #FFBB1E;
			}

			text {
				font-size: 26rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #ffbb1e;
			}
		}
	}

	.function {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin-top: 20rpx;
		width: 690rpx;
		height: 344rpx;
		background: #ffffff;
		border-radius: 16rpx;

		view {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			width: 100%;
		}

		.up {
			view {
				position: relative;
				width: 310rpx;
				height: 140rpx;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 310rpx;
					height: 140rpx;
				}

				.name {
					position: absolute;
					top: 23rpx;
					left: 31rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #ffffff;
				}

				.num {
					position: absolute;
					top: 73rpx;
					left: 31rpx;
					font-size: 34rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: left;
					color: #ffffff;
				}
			}
		}

		.down {
			.son {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				image {
					margin-bottom: 16rpx;
					width: 70rpx;
					height: 70rpx;
				}

				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #333333;
				}
			}
		}
	}

	.manage {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20rpx;
		width: 690rpx;
		min-height: 470rpx;
		background: #ffffff;
		border-radius: 16rpx;

		.title {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 24rpx;

			.text {
				font-size: 34rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Bold;
				font-weight: 700;
				text-align: left;
				color: #333333;
			}

			.addCar {
				display: flex;
				flex-direction: row;
				align-items: center;

				.addIcon {
					margin-left: 8rpx;
					width: 30rpx;
					height: 30rpx;
					line-height: 25rpx;
					text-align: center;
					border-radius: 50%;
					color: #fff;
					font-size: 30rpx;
					// font-weight: 200;
					background-color: #29c563;
				}

				text {
					font-size: 26rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #333333;
				}
			}
		}

		.noCar {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 40rpx;

			image {
				margin-bottom: 30rpx;
				width: 326rpx;
				height: 196rpx;
				// background-color: skyblue;
			}

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #999999;
			}
		}

		.carLists {
			display: flex;
			flex-direction: column;
			align-items: center;

			.son {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 20rpx;
				margin-bottom: 30rpx;
				box-sizing: border-box;
				width: 642rpx;
				// min-height: 220rpx;
				background: #f2f3f5;
				border-radius: 8rpx;

				.up {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 28rpx 0;
					border-bottom: 2rpx solid #e3e3e3;
					width: 100%;

					.name {
						font-size: 34rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #333333;
					}

					.plate {
						display: flex;

						.province {
							width: 34rpx;
							height: 34rpx;
							background: #333333;
							border: 1rpx solid #333333;
							border-radius: 2rpx;
							line-height: 34rpx;
							font-size: 28rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: center;
							color: #f2f3f5;
						}

						.num {
							padding: 0 4rpx;
							height: 34rpx;
							line-height: 34rpx;
							background: #f2f3f5;
							border: 1rpx solid #333333;
							border-radius: 2rpx;
							font-size: 28rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: center;
							color: #333333;
						}
					}
				}

				.down {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					padding: 30rpx 0;
					width: 100%;

					.item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.text {
							margin-top: 16rpx;
							font-size: 24rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: center;
							color: #666666;
						}

						.data {
							.num {
								font-size: 30rpx;
								font-family: Source Han Sans CN, Source Han Sans CN-Regular;
								font-weight: 400;
								text-align: center;
								color: #f93030;
							}

							.uiti {
								font-size: 20rpx;
								font-family: Source Han Sans CN, Source Han Sans CN-Regular;
								font-weight: 400;
								text-align: center;
								color: #f55549;
							}
						}
					}
				}
			}
		}
	}
</style>