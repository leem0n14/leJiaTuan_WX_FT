<!-- 我的拼车 -->
<template>
	<view>
		<!-- 导航栏 -->
		<view class="nav">
			<view class="son" v-for="(k,i) in navArr" @click="navClick(k);getPclist(i)">
				<text
					:style="{'color':k.isAct?'#333333':'','fontWeight':k.isAct?'700':'','fontSize':k.isAct?'34rpx':''}">{{k.text}}</text>
				<view v-show="k.isAct"></view>
			</view>
		</view>
		<!-- 拼车列表 -->
		<view class="ul">
			<view class="noPinche" v-if="list.length==0">
				<image :src="cdn+'/image/noList/noPinche.png'" mode="aspectFill"></image>
				<text>暂无拼车，快去发起吧！</text>
			</view>
			<view class="list" v-for="(k,i) in list" :key="i" v-else>
				<view class="userMsg">
					<image :src="cdn+'/background/pincheUserMsgBackground.png'" mode="aspectFill"></image>
					<image class="pic" :src="''" mode="aspectFill" style="background-color: aqua;"></image>
					<text class="name">{{k.fqName}}</text>
					<text class="phone">{{k.fqPhone}}</text>
				</view>
				<text class="time">{{k.startTime}}</text>
				<view class="box">
					<view class="route">
						<view class="start">
							<view style="background: #29c563;">
								<view class="line">

								</view>
							</view>
							<text>{{k.startPlace}}</text>
						</view>
						<view class="end">
							<view style="background: #ffbb1e;"></view>
							<text>{{k.endPlace}}</text>
						</view>
					</view>
					<text class="price">
						<text>{{k.price}}</text>元
					</text>

				</view>
				<view class="state" v-if="k.statu!=2">
					<image :src="cdn+'/icon/pinche'+((k.statu==0)?'/succeed.svg':'/pincheingIcon.svg')"
						mode="aspectFill">
					</image>
					<text>{{(k.statu==0)?'拼车完成，请耐心等待出发':'已发起拼车，请等待教练接送'}}</text>
				</view>
				<view class="coachMsg" v-if="k.statu!=0">
					<view class="msg">
						<view>接送教练：<text>{{k.jdName}}</text> </view>
						<view>联系方式：<text>{{k.jdPhone}}</text> </view>
						<view>接送车辆：<text>{{k.carType}} | {{k.carId}}</text> </view>
					</view>
					<view class="call">
						<image :src="cdn+'/icon/pinche'+'/call.svg'" mode="aspectFill"></image>
					</view>
				</view>
			</view>

		</view>
		<!-- 发起拼车 -->
		<view class="toPincheBtn" @click="$win.show('toPinche/toPinche')">发起拼车</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import moment from 'moment'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				//是否有拼车
				havePinche: true,
				// 是否成功拼车
				isSucceed: true,
				//是否完成拼车
				isFinished: false,
				navArr: [{
						text: '我发起的',
						isAct: true,
					},
					// {
					// 	text: '车队',
					// 	isAct: false,
					// },

					{
						text: '拼车完成',
						isAct: false,
					},
					{
						text: '已结束',
						isAct: false,
					}
				],
			}
		},
		methods: {
			...mapActions({
				getPcList_fun: 'pinche/getPcListS',
				getList_fun: 'pinche/getPcList'
			}),
			navClick(k) {
				for (var a = 0; a < this.navArr.length; a++) {
					this.navArr[a].isAct = false
				}
				k.isAct = true
			},
			//状态码判断
			status(code) {
				if (code == 0) {

				}
			},
			async getPcList() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getPcList_fun(data)
			},
			async getPclist(type) {
				console.log(type);
				let data = {
					userId: this.$db.getSync('userId'),
					type: type,
				}
				let res = await this.getList_fun(data)
			},

		},
		computed: {
			...mapState({
				list: state => state.pinche.pincheList
			}),
		},
		onLoad() {

		},
		onShow() {
			this.getPclist(0)
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #29c563;
	// }


	page {
		background-color: #f2f3f5;
		// padding-bottom: 100rpx;
	}

	/* 导航栏start */
	.nav {
		display: flex;
		flex-direction: row;
		height: 82rpx;
		width: 750rpx;
	}

	.nav .son {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 25%;
	}

	.nav .son text {
		font-size: 30rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 30rpx;
	}

	.nav .son view {
		position: absolute;
		bottom: 0rpx;
		width: 62rpx;
		height: 6rpx;
		background: #29c563;
	}

	/* 导航栏end */

	// 拼车列表start
	.ul {
		display: flex;
		flex-direction: column;
		margin: 10rpx auto 0;
		width: 690rpx;
		// height: 1000rpx;
		padding: 0 0 100rpx 0;
		// max-height: 1000rpx;

		.noPinche {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 690rpx;
			margin-top: 182rpx;

			image {
				width: 326rpx;
				height: 196rpx;
				margin-bottom: 30rpx;
			}

			;

			text {
				height: 28rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #999999;
			}
		}

		;


		.list {
			margin: 10rpx 0;
			width: 690rpx;
			box-sizing: border-box;
			padding: 30rpx;
			background: #ffffff;
			border-radius: 16rpx;

			.userMsg {
				position: relative;
				margin-bottom: 30rpx;
				width: 630rpx;
				height: 150rpx;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 630rpx;
					height: 150rpx;
				}

				;

				.pic {
					position: absolute;
					top: 30rpx;
					left: 30rpx;
					width: 102rpx;
					height: 102rpx;
					border-radius: 50%;
				}

				;

				.name {
					position: absolute;
					top: 36rpx;
					left: 146rpx;
					height: 30rpx;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: left;
					color: #ffffff;
					line-height: 30rpx;
				}

				;

				.phone {
					position: absolute;
					bottom: 36rpx;
					left: 146rpx;
					width: 184rpx;
					height: 30rpx;
					opacity: 0.5;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #ffffff;
					line-height: 30rpx;
				}
			}

			;

			.time {
				margin-bottom: 30rpx;
				height: 30rpx;
				font-size: 30rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				line-height: 30rpx;
			}

			;

			.box {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-end;
				height: 80rpx;
				margin-top: 30rpx;

				.route {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 450rpx;
					height: 100%;

					.start,
					.end {
						display: flex;
						align-items: center;

						text {
							font-size: 30rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: left;
							color: #333333;
							overflow: hiddden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						;

						view {
							position: relative;
							margin-right: 8rpx;
							width: 14rpx;
							height: 14rpx;
							border-radius: 50%;

							.line {
								position: absolute;
								top: 14rpx;
								left: 6rpx;
								width: 2rpx;
								height: 30rpx;
								background: #f2f3f5;

							}
						}

						;
					}
				}

				;

				.price {
					font-size: 26rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #111111;

					text {
						font-size: 36rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Bold;
						font-weight: 700;
						text-align: right;
						color: #f55549;
					}
				}
			}

			;

			.state {
				display: flex;
				align-items: center;
				margin-top: 45rpx;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 6rpx;
				}

				;

				text {
					font-size: 26rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
				}

				;

			}

			;

			.coachMsg {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 169rpx;
				margin-top: 30rpx;
				border-top: 2rpx solid #e4e4e4;

				.msg {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 100%;
					box-sizing: border-box;
					padding-top: 30rpx;

					view {
						font-size: 30rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #999999;

						text {
							color: #666666;
						}
					}
				}

				;

				image {
					margin-top: 40rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}


	// 拼车列表end

	/* 发起拼车start */
	.toPincheBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 104rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		text-align: center;
		line-height: 104rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}

	/* 发起拼车end */
</style>
