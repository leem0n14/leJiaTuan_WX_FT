<!-- 购买成功 -->
<template>
	<div>
		<div class="goodsMsg box">
			<div class="icon">
				<icon :type="backStatuIcon(orderMsg.statu)?'success':'warn'" size="155rpx" />
				<text>{{backStatu(orderMsg.statu)}}</text>
			</div>
			<div class="msg">
				<div class="left">
					<image :src="cdn+'/goods/'+orderMsg.goodsEntity.photo" mode=""></image>
				</div>
				<div class="right">
					<div class="name">{{orderMsg.goodName}}</div>
					<div class="price">￥{{ backPrice(orderMsg.realPrice) }}</div>
					<!-- <div class="title">分三期（零手续费），￥4000.00/期</div> -->
				</div>
			</div>
		</div>
		<!-- 		<div class="fenqi box">
			<div class="title">
				分期
			</div>
			<div class="detail">
				<div class="item">
					<div class="key">售价：</div>
					<div class="value">￥12000.00</div>
				</div>
				<div class="item">
					<div class="key">首付：</div>
					<div class="value">￥0.00</div>
				</div>
				<div class="item">
					<div class="key">分期：</div>
					<div class="value">3期</div>
				</div>
				<div class="item">
					<div class="key">月供：</div>
					<div class="value">￥4000.00</div>
				</div>
			</div>
		</div> -->
		<button orderMsg.type==='拼团' class="toPintuan-btn" v-if="true" @click="this.$win.show('/page_my/pinTuan/pinTuan')">查看拼团进度</button>
		<button @click="backIndex" class="backIndex">返回首页</button>
	</div>
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
			}
		},
		computed: {
			...mapState({
				orderMsg: state => state.pay.paySuccess
			}),
		},
		methods: {
			...mapActions({
				getPaySuccess_fun: 'pay/paySuccess'
			}),
			backIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			backPrice(price) {
				if (typeof price !== 'number')
					return 'error'
				else
					return price.toFixed(2)
			},
			backStatu(statu) {
				// 0 未付款 1交易完成 2 付款取消 3申请退款 4已退款  5 拼团中 6拼团成功 7退款失败
				switch (statu) {
					case 0:
						return '未付款';
					case 1:
						return '交易完成';
					case 2:
						return '付款取消';
					case 3:
						return '申请退款';
					case 4:
						return '退款成功';
					case 5:
						return '拼团中';
					case 6:
						return '拼团成功';
					case 7:
						return '退款失败';
					default:
						return '数据错误';
				}
			},
			backStatuIcon(statu) {
				let s = statu
				if (s === 1 || s === 6 || s === 5) return true
				return false
			},
			async getPaySuccess(id) {
				let data = {
					id,
				}
				let res = await this.getPaySuccess_fun(data)
			},

		},
		onLoad(e) {
			console.log(e);
			this.getPaySuccess(e.id).then(() => {
				let char = this.orderMsg.statu == 1 ? '支付成功' : '支付失败'
				uni.setNavigationBarTitle({
					title: char
				});
			})
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.toPintuan-btn {
		margin-top: 30rpx;
		width: 580rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}

	.backIndex {
		margin-top: 30rpx;
		width: 580rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}

	.box {
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;
	}

	.goodsMsg {
		margin-bottom: 20rpx;

		.icon {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 76rpx 0;

			text {
				margin-top: 20rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: left;
				color: #333333;
				line-height: 32rpx;
			}
		}

		.msg {
			display: flex;
			align-items: center;
			// justify-content: space-between;
			padding-top: 30rpx;

			.left {
				margin-right: 30rpx;

				image {
					width: 180rpx;
					height: 180rpx;
					background-color: #333;
				}
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.name {
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					font-weight: 500;
					text-align: left;
					color: #333333;
				}

				.price {
					font-size: 36rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: left;
					color: #f93030;
				}

				.title {
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
				}
			}
		}
	}

	.fenqi {
		display: flex;
		flex-direction: column;

		.title {
			width: 100%;
			font-size: 32rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Medium;
			font-weight: 500;
			text-align: left;
			color: #111111;
		}

		.detail {
			display: flex;
			flex-direction: column;
			width: 100%;

			.item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;

				.key {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}

				.value {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #333333;
				}
			}
		}
	}
</style>