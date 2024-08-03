<!-- 具体页面后台传回,后天编辑 -->
<template>
	<view>
		<view class="shop">
			<!-- 商品信息 -->
			<view class="goodsMsg">
				<swiper class="goodPic" circular :indicator-dots="true" :autoplay="true">
					<swiper-item v-for="(k,i) in goodMsg.photos" :key="i">
						<image class="image" :src="cdn+'/goods/'+k" mode="aspectFit"></image>
					</swiper-item>
				</swiper>
				<!-- <image class="goodPic" :src="cdn+'/image/goods/common/goods_1.png'" mode="aspectFill"></image> -->
				<view class="miaosha" v-if="goodMsg.goodType=='秒杀'">
					<image :src="cdn+'/background/miaoshaBackground.png'" mode="aspectFill"></image>
					<view class="price">
						<text>抢购价</text>
						<view class="num">
							￥<text>{{goodMsg.goodPrice}}</text>
						</view>
					</view>
					<view class="countdown">
						<text class="text">距离结束</text>
						<uni-countdown :fontSize="16*px" :show-day="timeStamp(goodMsg.endTime).d!=0"
							:day="timeStamp(goodMsg.endTime).d" :hour="timeStamp(goodMsg.endTime).h" :minute="timeStamp(goodMsg.endTime).m"
							:second="timeStamp(goodMsg.endTime).s" color="#fff" background-color="#111"></uni-countdown>
						<!-- <view class="time">
							
						</view> -->
					</view>
				</view>
				<view class="msg">
					<view class="share" >
						<image :src="cdn+'/icon/'+'share.svg'" mode="aspectFill"></image>
						<!-- <text>分享</text> -->
						<button open-type="share">分享</button>
					</view>

					<view class="price">
						<text class="t1" v-if="goodMsg.goodType=='普通'">￥<text>{{goodMsg.goodPrice}}</text> </text>
						<!-- <text class="t2">{{goodMsg.title}}</text> -->
					</view>
					<view class="name">
						<text class="t1">{{goodMsg.goodName}}</text>
						<text class="t2">{{goodMsg.goodTitle}}</text>
					</view>
				</view>
			</view>
			<!-- 拼团列表 -->
			<view class="pintuanList" v-if="false">
				<view class="hd">
					<text>10人正在拼团</text>
					<view class="more" @click="isShowMore=true">
						<text>查看更多</text>
						<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="bd">
					<view class="list" v-for="(k,i) in 2">
						<view class="left">
							<image src="" mode="aspectFill"></image>
							<text>(name)</text>
						</view>
						<view class="right">
							<view class="state">
								<view class="num">
									还差<text>1人</text>拼成
								</view>
								<view class="time">
									剩余01:52:23
								</view>
							</view>
							<view class="go">去拼团</view>
							<!-- <button class="go"></button> -->
						</view>
					</view>
				</view>
			</view>
			<!-- 更多拼团 -->
			<view class="morePintuan" v-if="false">
				<view class="mask"></view>
				<view class="content">
					<view class="title">10人正在拼团</view>
					<view class="ul">
						<view class="list" v-for="(k,i) in 15">
							<view class="left">
								<image src="" mode="aspectFill"></image>
								<view class="text">
									<view class="up">
										<view class="name">(name)</view>
										<view class="num">还差1人</view>
									</view>
									<view class="down">剩余01:52:23</view>
								</view>
							</view>
							<view class="right">
								去拼团
							</view>
						</view>
					</view>
				</view>
				<icon class="close" type="cancel" color="#fff" size="54rpx" @click="isShowMore=false" />
			</view>

			<!-- 详情 -->
			<view class="detailed">
				<view class="title">
					<view>
						<text>详细</text>
					</view>
				</view>
				<view class="richText" v-html="goodMsg.goodDescribe">
					<!-- 富文本区域 -->
				</view>
			</view>

			<!-- 固定栏 -->
			<view class="footer">
				<button class="option" @click="toIndex()">
					<image :src="cdn+'/icon/'+'index.svg'" mode="aspectFill"></image>
					<text>首页</text>
				</button>
				<button class="option" open-type="contact">
					<image :src="cdn+'/icon/'+'service.svg'" mode="aspectFill"></image>
					<text>客服</text>
				</button>

				<button class="btn" v-if="true" @click="$win.show('/page_shopping/orderDetail?gid='+goodMsg.goodId)"
					:disabled="goodMsg.goodNum===0">{{goodMsg.goodNum===0?'已售空':'立即报名'}}</button>
				<view class="pintuanPay" v-else>
					<view class="single">
						<text class="price">￥12000.00</text>
						<text class="text">单独购买</text>
					</view>
					<view class="pt">
						<text class="price">￥9000.00</text>
						<text class="text">发起拼团</text>
					</view>
				</view>
			</view>

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
				cdn: this.$conf.CDN_HOST,
				isMiaosha: false,
				title: '商品页',
				isShowMore: false,
			}
		},
		computed: {
			...mapState({
				goodMsg: state => state.goods.goodMsg
			}),
			px() {
				return uni.getWindowInfo().screenWidth / 750
			}
		},
		methods: {
			...mapActions({
				getGoodMsg_fun: 'goods/getGoodMsg',
				pay_fun: 'pay/wxPay',
			}),
			//秒杀时间转换
			timeStamp(timestamp) {
				let now = new Date().getTime()
				// console.log(now,now-timestamp);
				let t = new Date(timestamp).getTime()  - now
				const d = Math.floor(t / (1000 * 60 * 60 * 24));
				const h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
				const s = Math.floor((t % (1000 * 60)) / 1000);
				return {
					d,
					h,
					m,
					s
				}
			},
			async getGoodMsg(id) {
				let params = {
					goodId: id
				}
				let res = await this.getGoodMsg_fun(params)
			},
			async wxPay() {

				let params = {
					header: {
						userId: this.$db.getSync('userId'),
					}
				}

				let res = await this.pay_fun(params)
			},


			toIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		onShow() {

		},
		onLoad(e) {
			this.getGoodMsg(e.id)
			// this.wxPay()
		}
	}
</script>

<style lang="scss">
	.shop {
		background-color: #f2f3f5;
		height: 85vh;
		padding-bottom: 100rpx;
		overflow-y: auto;
	}

	.goodsMsg {
		display: flex;
		flex-direction: column;
		// height: 644rpx;
		width: 750rpx;

		.goodPic {
			width: 750rpx;
			height: 320rpx;
			.image{
				width: 100%;
				height: 100%;
			}
		}

		.miaosha {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			position: relative;
			width: 750rpx;
			height: 108rpx;
			padding: 0 27rpx;

			// background-color: pink;
			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 750rpx;
				height: 108rpx;
			}

			.price {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 17rpx 0;
				height: 100%;
				z-index: 2;

				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #ffffff;
				}

				.num {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #ffffff;

					text {
						font-size: 40rpx;
						font-weight: 500;
						color: #ffffff;
					}
				}
			}

			.countdown {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;
				align-items: center;
				padding: 17rpx 0;
				height: 100%;
				z-index: 2;

				.text {
					width: 116rpx;
					height: 30rpx;
					line-height: 30rpx;
					background: #f93030;
					border-radius: 15rpx;
					font-size: 22rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
				}

				.time {
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #f93030;
				}
			}
		}

		.msg {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			position: relative;
			width: 750rpx;
			// height: 250rpx;
			background: #ffffff;
			box-sizing: border-box;

			// padding: 30rpx 24rpx;
			.share {
				position: absolute;
				right: 0;
				bottom: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 110rpx;
				height: 40rpx;
				background: #eff0f2;
				border-radius: 20rpx 0rpx 0rpx 20rpx;
				box-sizing: border-box;

				image {
					width: 22rpx;
					height: 24rpx;
					margin-right: 14rpx;
				}

				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}

				button {
					background-color: #eff0f2;
					padding: 0;
					margin: 0;
					width: 52rpx;
					height: 28rpx;
					line-height: 28rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}



			.price {
				position: relative;
				display: flex;
				flex-direction: column;
				margin: 15rpx 24rpx;

				text {
					color: #f93030;
				}

				.t1 {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #f93030;

					text {
						// margin-left: ;
						font-size: 40rpx;
						font-weight: 500;
					}
				}

				.t2 {
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
				}
			}

			.name {
				display: flex;
				flex-direction: column;
				margin: 15rpx 24rpx;

				.t1 {
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					font-weight: 500;
					text-align: left;
					color: #333333;
				}

				.t2 {
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}
			}
		}
	}

	.pintuanList {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		margin-top: 20rpx;
		background-color: #fff;

		.hd {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 750rpx;
			height: 86rpx;
			background: #ffffff;
			box-sizing: border-box;
			padding: 0 30rpx;

			text {
				font-size: 30rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
			}

			.more {
				display: flex;
				flex-direction: row;
				align-items: center;

				text {
					color: #c7c7c7;
				}

				image {
					width: 17rpx;
					height: 17rpx;
				}
			}
		}

		.bd {
			display: flex;
			flex-direction: column;
			align-items: center;

			.list {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 750rpx;
				padding: 30rpx;
				box-sizing: border-box;

				// border-top: 2rpx solid #f2f3f5;
				.left,
				.right {
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.left {
					image {
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
						background-color: #f2f3f5;
						margin-right: 20rpx;
					}

					text {
						max-width: 210rpx;
						font-size: 30rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.right {
					.state {
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-right: 40rpx;

						.num {
							font-size: 26rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: right;
							color: #333333;
							margin-bottom: 20rpx;

							text {
								color: #F93030;
							}

						}

						.time {
							font-size: 22rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: right;
							color: #666666;
						}
					}

					.go {
						width: 118rpx;
						height: 50rpx;
						line-height: 50rpx;
						background: #f93030;
						border-radius: 25rpx;
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #fff;
						margin-right: 10rpx;
					}
				}

			}
		}
	}

	.morePintuan {
		position: fixed;
		top: 12vh;
		left: 55rpx;
		display: flex;
		flex-direction: column;
		width: 640rpx;
		height: 802rpx;
		background: #ffffff;
		z-index: 99;
		border-radius: 25rpx;

		.mask {
			position: absolute;
			top: -12vh;
			left: -55rpx;
			width: 100vw;
			height: 100vh;
			opacity: 0.5;
			background: #000000;
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			width: 640rpx;
			height: 802rpx;

			padding: 0 30rpx;
			box-sizing: border-box;
			background: #ffffff;
			border-radius: 25rpx;

			.title {
				width: 580rpx;
				padding: 30rpx 0;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
				border-bottom: 2rpx solid #f5f5f5;
			}

			.ul {
				display: flex;
				flex-direction: column;
				width: 100%;
				max-height: 620rpx;
				margin-bottom: 10rpx;
				overflow-y: auto;

				.list {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					padding: 20rpx 0;

					.left {
						display: flex;
						flex-direction: row;
						align-items: center;

						image {
							width: 70rpx;
							height: 70rpx;
							border-radius: 50%;
						}

						.text {
							display: flex;
							flex-direction: column;
							margin-left: 20rpx;

							.up {
								display: flex;
								flex-direction: row;
								align-items: flex-end;

								.name {
									max-width: 146rpx;
									font-size: 30rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Regular;
									font-weight: 400;
									text-align: left;
									color: #333333;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}

								.num {
									margin-top: 10rpx;
									font-size: 22rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Regular;
									font-weight: 400;
									text-align: left;
									color: #666666;
								}
							}

							.down {
								margin-top: 10rpx;
								font-size: 22rpx;
								font-family: Source Han Sans CN, Source Han Sans CN-Regular;
								font-weight: 400;
								text-align: left;
								color: #333333;
							}
						}
					}

					.right {
						width: 118rpx;
						height: 50rpx;
						line-height: 50rpx;
						background: #f93030;
						border-radius: 25rpx;
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
					}
				}
			}
		}

		.close {
			position: absolute;
			bottom: -100rpx;
			left: 293rpx;
		}
	}

	.detailed {
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {

			display: flex;
			align-items: center;
			justify-content: center;
			height: 74rpx;
			width: 750rpx;

			view {
				position: relative;
				height: 24rpx;
				width: 48rpx;

				text {
					height: 24rpx;
					line-height: 24rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #666666;
				}

				&:after {
					position: absolute;
					right: -57rpx;
					top: 19rpx;
					content: '';
					width: 50rpx;
					height: 2rpx;
					background: #c7c7c7;
				}

				&:before {
					position: absolute;
					left: -57rpx;
					top: 19rpx;
					content: '';
					width: 50rpx;
					height: 2rpx;
					background: #c7c7c7;
				}
			}


		}

		.richText {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 750rpx;
			// height: 80rpx;
			background-color: #ffffff;
		}
	}


	/* footer部分start */
	.footer {
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 98rpx;
		box-sizing: border-box;
		padding: 0 24rpx;
		background: #ffffff;

		.option {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			margin: 0;
			padding: 0;
			height: 98rpx;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			text {
				height: 36rpx;
				// margin-top: 6rpx;
				font-size: 24rpx;
				line-height: 36rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}
		}

		.btn {
			margin: 0;
			width: 440rpx;
			height: 68rpx;
			line-height: 68rpx;
			background: linear-gradient(134deg, #54d685, #29c563 99%);
			border-radius: 34rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
		}

		.pintuanPay {
			display: flex;
			flex-direction: row;
			width: 440rpx;
			height: 68rpx;
			border-radius: 34rpx;
			// border: 1rpx solid #f93030;
			box-sizing: border-box;

			.single,
			.pt {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 50%;
				height: 100%;

				text {
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
				}

				.text {
					font-size: 20rpx;
				}

				.price {
					font-size: 22rpx;
				}
			}

			.single {
				background-color: #ffffff;
				border: 1rpx solid #f93030;
				border-radius: 34rpx 0rpx 0rpx 34rpx;

				.text {
					color: #ff8b8b;
				}

				.price {
					color: #f93030;
				}
			}

			.pt {
				background-color: #f93030;
				border: 1rpx solid #f93030;
				border-radius: 0rpx 34rpx 34rpx 0rpx;

				.text {
					color: #ffcccc;
				}

				.price {
					color: #ffffff;
				}
			}
		}
	}

	/* footer部分end */
</style>