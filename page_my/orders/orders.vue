<!-- 订单 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="topNav" v-if="haveOrder">
			<view class="son" v-for="(k,i) in nav" :class="k.isAct?'act':''" @click="act(k,i)">
				{{k.name}}
			</view>
		</view>
		<!-- 无订单样式 -->
		<view class="noOrder" v-if="orderList&&orderList.length==0">
			<image :src="cdn+'/image/noList/noOrder.png'" mode="aspectFit"></image>
			<view class="text">暂无订单</view>
		</view>
		<!-- 内容 -->
		<view class="content">
			<!-- v-for="(k,i) in nav" v-if="haveOrder" :key="i" -->
			<!-- {{k.name}} -->
			<view class="son" v-for="(k,i) in orderList" :key="i">
				<view class="orderNum">订单号：{{k.id}}</view>
				<view class="state" v-html="orderStatu(k.statu)" :style="{'color':k.statu==1?'':'#333333'}"></view>
				<!-- 订单状态 -->
				<view class="msg" @click="$win.show('/page_shopping/orderDetail?id='+k.id)">
					<image :src="cdn+'/image/goods/common/goods_2.png'" mode="aspectFill"></image>
					<view class="name">{{k.goodName}}</view>
					<view class="price"><text style="font-size: 28rpx;font-weight: 400;">￥</text> {{k.realPrice}}</view>
					<!-- .toFixed(2) -->
				</view>
				<view class="time">{{k.createTime}}</view>
				<!-- <text v-if="k.statu==0" class="cancel" @click="cancelOrder()">取消订单</text> -->
				<button v-if="k.statu==0" @click="$win.show('/page_shopping/orderDetail?id='+k.id)">去支付</button>
				<button v-else-if="k.statu==1" @click="showWin(k.id)">申请退款</button>
				<button v-else-if="k.statu==7">退款失败(点击查看原因)</button>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" :title="'输入退款理由'" :duration="0" :placeholder="'输入退款理由'" :before-close="true"
				@close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
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
				show: true,
				cdn: this.$conf.CDN_HOST,
				haveOrder: true, //是否有订单
				nav: [{ //导航栏
					name: '全部',
					isAct: true,
				}, {
					name: '待付款',
					isAct: false,
				}, {
					name: '已付款',
					isAct: false,
				}],
				pageSize: 10,
				pageIndex: 1,
				navIndex: 0, //导航栏坐标
				refundReason: '',
				id: null, //暂存id
			}

		},
		computed: {
			...mapState({
				allOrderList: state => state.order.allOrder,
				payOrderList: state => state.order.payOrder,
				nopayOrderList: state => state.order.nopayOrder,
				orderList: state => state.order.orderList
			}),

		},
		methods: {
			...mapActions({
				getAllOrderList_fun: 'order/allOrderList',
				getPayOrderList_fun: 'order/payOrderList',
				getNoPayOrderList_fun: 'order/nopayOrderList',
				refund_fun: 'order/cancelOrder',
			}),
			close() {
				// this.show=false;
				this.$refs.popup.close()
				this.id = null
				this.refundReason = ''
			},
			confirm(val) {
				if (!val) {
					this.$win.nlog('请输入退款理由')
				} else {
					this.refundReason = val
					if (this.id) {
						this.refund(this.id).then(() => {
							this.id = null
							this.refundReason = ''
							this.$refs.popup.close()
						})
					} else {
						this.id = null
						this.refundReason = ''
						this.$refs.popup.close()
						this.$win.nlog('系统bug请重试')
					}
				}

			},
			showWin(id) {
				this.$refs.popup.open()
				this.id = id
			},
			async refund(id) {
				let data = {
					refundReason: this.refundReason,
					id,
					i: 2,
					statu: 3,
				}
				let res = await this.refund_fun(data)
			},
			act(k, i) {
				for (var a = 0; a < this.nav.length; a++) {
					this.nav[a].isAct = false
				}
				k.isAct = true
				this.navIndex = i
				this.pageIndex = 1
				if (i == 0) {
					this.getAllOrderList()
				} else if (i == 1) {
					this.getNoPayOrderList()
				} else if (i == 2) {
					this.getPayOrderList()
				}
			},
			// 取消订单
			async cancelOrder() {
				this.$win.nlog('取消订单')
			},
			//判断订单状态
			orderStatu(statu) {
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
			async getAllOrderList() {
				let data = {
					userId: this.$db.getSync('userId'),
					limit: this.pageSize,
					page: this.pageIndex
				}
				let res = await this.getAllOrderList_fun(data)
			},
			async getPayOrderList() {
				let data = {
					userId: this.$db.getSync('userId'),
					limit: this.pageSize,
					page: this.pageIndex
				}
				let res = await this.getPayOrderList_fun(data)
			},
			async getNoPayOrderList() {
				let data = {
					userId: this.$db.getSync('userId'),
					limit: this.pageSize,
					page: this.pageIndex
				}
				let res = await this.getNoPayOrderList_fun(data)
			},
		},
		// onLoad() {
		// 	// this.getAllOrderList()
		// 	// this.getPayOrderList()
		// 	// this.getNoPayOrderList()
		// },
		onShow() {
			if (this.navIndex == 0) {
				this.getAllOrderList()
			} else if (this.navIndex == 1) {
				this.getNoPayOrderList()
			} else if (this.navIndex == 2) {
				this.getPayOrderList()
			} else {
				this.$win.nlog('错误')
			}
		},
		onReachBottom() {
			console.log('滚动到底部');
			this.pageIndex++
			if (this.navIndex == 0) {
				this.getAllOrderList()
			} else if (this.navIndex == 1) {
				this.getPayOrderList()
			} else if (this.navIndex == 2) {
				this.getNoPayOrderList()
			}
		},
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #999999;
	// }


	page {
		background-color: #F2F3F5;
	}

	/* 无订单start */
	.noOrder {
		position: relative;
		left: 212rpx;
		top: 268rpx;
		width: 326rpx;
		height: 196rpx;
	}

	.noOrder image {
		width: 326rpx;
		height: 196rpx;
	}



	.noOrder .text {
		margin: 30rpx auto 0;
		width: 112rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 28rpx;
	}

	/* 无订单end */

	/* 顶部导航栏start */
	.topNav {
		display: flex;
		justify-content: space-around;
		width: 750rpx;
		height: 88rpx;
		background: #fff;
	}

	.topNav .son {
		box-sizing: border-box;
		height: 88rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 88rpx;
	}

	.topNav .act {
		color: #29c563;
		border-bottom: 6rpx solid #29c563;
	}

	/* 顶部导航栏end */

	/* 内容start */
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content .son {
		position: relative;
		margin-top: 24rpx;
		width: 702rpx;
		height: 348rpx;
		background: #ffffff;
		border-radius: 16rpx;
	}

	.son .orderNum {
		position: absolute;
		top: 30rpx;
		left: 20rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 28rpx;
	}

	.son .cancel {
		position: absolute;
		right: 200rpx;
		bottom: 20rpx;
		color: red;
		height: 50rpx;
		line-height: 50rpx;
	}

	.son button {
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
		// width: 160rpx;
		height: 50rpx;
		border: 1rpx solid #29c563;
		border-radius: 26rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #29c563;
		line-height: 50rpx;
	}

	.son .state {
		position: absolute;
		top: 30rpx;
		right: 20rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #f93030;
		line-height: 28rpx;
	}

	/* 订单班类start */
	.son .msg {
		position: absolute;
		top: 88rpx;
		left: 20rpx;
		width: 662rpx;
		height: 170rpx;
		background: #f5f5f5;
	}


	.msg image {
		position: absolute;
		top: 20rpx;
		left: 28rpx;
		width: 130rpx;
		height: 130rpx;
	}

	.msg .name {
		position: absolute;
		left: 178rpx;
		top: 30rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #333333;
		line-height: 32rpx;
	}

	.msg .price {
		position: absolute;
		top: 82rpx;
		left: 178rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #111111;
		line-height: 40rpx;
	}

	/* 订单班类end */

	.son .time {
		position: absolute;
		left: 26rpx;
		bottom: 31rpx;
		height: 26rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #c7c7c7;
		line-height: 26rpx;
	}

	/* 内容end */
</style>