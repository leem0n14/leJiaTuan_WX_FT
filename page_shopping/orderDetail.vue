<!-- 订单详情 -->
<template>
	<div>
		<!-- <button @click="$win.show('/page_shopping/paySuccess?id='+orderMsg.id)">{{'支付成功页'}}</button> -->
		<div class="statu" :style="{'color':(isNewOrder? orderMsg.statu:paySuccessMsg.statu)==0?'#F93030':'#000'}">
			{{(isNewOrder? orderMsg.statu:paySuccessMsg.statu) ==2?'已取消':((isNewOrder? orderMsg.statu:paySuccessMsg.statu) ==0?'待付款':'已付款')}}
		</div>
		<div class="box userMsg">
			<div class="left">
				<image :src="cdn+'/user/'+( isNewOrder? userMsg.head:paySuccessMsg.user.head)" mode="aspectFill">
				</image>
			</div>
			<div class="right">
				<div class="nickName">{{isNewOrder?userMsg.name:paySuccessMsg.user.name}}</div>
				<div class="phone">{{'联系方式：'+(isNewOrder?userMsg.phone:paySuccessMsg.user.phone)}}</div>
			</div>
		</div>
		<div class="box goodsMsg">
			<div class="up">
				<div class="img">
					<image :src="cdn+'/goods/'+ (isNewOrder? goodMsg.photo:paySuccessMsg.goodsEntity.photo)"
						mode="aspectFill">
					</image>
				</div>
				<div class="msg">
					<div class="name">{{isNewOrder?goodMsg.goodName:paySuccessMsg.goodsEntity.goodName}}</div>
					<div class="price">{{'￥'+(isNewOrder?goodMsg.goodPrice:paySuccessMsg.goodsEntity.goodPrice)}}</div>
					<div class="title">{{isNewOrder?goodMsg.goodTitle:paySuccessMsg.goodsEntity.goodTitle}}</div>
				</div>
			</div>
			<div class="down">
				<div class="item">
					<div class="key">商品总价：</div>
					<div class="value">{{'￥'+(isNewOrder?goodMsg.goodPrice:paySuccessMsg.goodsEntity.goodPrice)}}</div>
				</div>
				<div class="item">
					<div class="key">优惠券：</div>
					<div class="value" style="color: #F93030;" @click="selectCoupon1()"
						v-if="orderMsg.price-orderMsg.realPrice==0">{{'请选择优惠劵'}}</div>
					<div class="value" style="color: #F93030;" @click="selectCoupon1()" v-else>
						￥{{(orderMsg.price-orderMsg.realPrice)}}</div>
				</div>
				<div class="item">
					<div class="key">实付金额：</div>
					<div class="value" style="color: #F93030;">
						<!-- {{'￥'+(isNewOrder? goodMsg.goodPrice:paySuccessMsg.realPrice)}}</div> -->
						{{'￥'+orderMsg.realPrice}}
					</div>
				</div>
			</div>
		</div>
		<div class="box orderMsg">
			<div class="code item">
				<div class="key">订单编号：</div>
				<div class="value">{{isNewOrder? orderMsg.id:paySuccessMsg.id}}</div>
				<div class="copy" @click="copyOrderId(orderMsg.id)">复制</div>
			</div>
			<div class="time item">
				<div class="key">下单时间：</div>
				<div class="value">{{isNewOrder? orderMsg.createTime:paySuccessMsg.createTime}}</div>
			</div>
		</div>
		<div class="box cancel" v-if="(isNewOrder? orderMsg.statu:paySuccessMsg.statu)==0">
			<!-- 取消订单 -->
			<div style="text-align: center;color: #F93030;margin: 10rpx 0;">未支付订单15分钟后取消</div>
			<button style="font-weight: 500;"
				@click="cancelOrder(isNewOrder? orderMsg.id:paySuccessMsg.id)">取消订单</button>
		</div>
		<button  class="toPintuan-btn" v-if="orderMsg.type==='拼团'"
			@click="this.$win.show('/page_my/pinTuan/pinTuan')">查看拼团进度</button>
		<div class="fixedPay">
			<div class="text">
				<div class="key">实付金额：</div>
				<!-- <div>{{'￥'+(isNewOrder? goodMsg.goodPrice:paySuccessMsg.realPrice)}}</div> -->
				<div>{{'￥'+orderMsg.realPrice}}</div>
			</div>
			<button class="btn" @click="wxPay(goodMsg.goodId)" :disabled="this.orderMsg.statu==1"
				v-if="(isNewOrder? orderMsg.statu:paySuccessMsg.statu)==0">{{(isNewOrder? orderMsg.statu:paySuccessMsg.statu)==1?'已支付':'去支付'}}</button>
		</div>
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
				status: 0,
				isNewOrder: false, //是否是新订单
				id: null,
			}
		},
		computed: {
			...mapState({
				orderMsg: state => state.pay.order,
				goodMsg: state => state.pay.good,
				userMsg: state => state.pay.user,
				paySuccessMsg: state => state.pay.paySuccess,
			})
		},
		methods: {
			...mapActions({
				cteateOrder_fun: 'pay/cteateOrder',
				pay_fun: 'pay/wxPay',
				getPaySuccess_fun: 'pay/paySuccess',
				cancelOrder_fun: 'order/cancelOrder',
			}),
			// 取消订单
			async cancelOrder(id) {
				this.$win.nlog('取消订单')
				let data = {
					statu: 2,
					id,
				}
				let res = await this.cancelOrder_fun(data)
			},
			//生成订单
			async cteateOrder(id) {
				let data = {
					userId: this.$db.getSync('userId'),
					// goodId: parseInt(id),
					goodId: id,
				}
				console.log('生成订单');
				let res = await this.cteateOrder_fun(data)
			},
			//支付
			async wxPay(id) {
				let params = {
					header: {
						userId: this.$db.getSync('userId'),
					},
					goodId: this.isNewOrder ? id : this.paySuccessMsg.goodsId,
					id: this.isNewOrder ? this.orderMsg.id : this.paySuccessMsg.id
				}
				let res = await this.pay_fun(params)
			},
			//复制订单号
			copyOrderId(text) {
				uni.setClipboardData({
					data: text.toString(),
					success: (res) => {
						this.$win.nlog('复制成功')
						// console.log(res);
					},
					fail: (res) => {
						this.$win.nlog('复制失败')
						console.log(res);
					}
				});
			},
			//拿订单支付信息
			async paySuccess(id) {
				console.log('订单信息');
				let data = {
					id,
				}
				let res = await this.getPaySuccess_fun(data)
			},
			selectCoupon1() {
				uni.navigateTo({
					url: '/page_my/selestCoupon/selestCoupon'
				});
				console.log('跳转')
			}
		},
		onShow(e) {
			// if (e.gid) {
			// 	//收到商品id,新订单
			// 	this.isNewOrder = true
			// 	//生成订单
			// 	console.log(e.gid, 'e.gid');
			// this.cteateOrder(this.id)
			// console.log("我来了喔")
			// }
			// console.log(this.orderMsg)
		},
		onLoad(e) {
			console.log('e', e);
			//商品id
			if (e.gid) {
				//收到商品id,新订单
				this.isNewOrder = true
				//生成订单
				this.id = e.gid
				console.log(e.gid, 'e.gid');
				this.cteateOrder(e.gid)
			} else if (e.id) {
				// 收到订单id,就订单
				this.isNewOrder = false,
					// console.log(e.id, 'eid');
					// 查看已有的订单
					//如果支付订单支付成功就直接。。，并提示支付成功（参数订单id）
					this.paySuccess(e.id).then(() => {
						if (this.paySuccessMsg.statu == 0) {
							this.$win.nlog('该订单未支付：' + this.paySuccessMsg.id)
						} else if (this.paySuccessMsg.statu == 1) {
							this.$win.nlog('该订单支付成功：' + this.paySuccessMsg.id)
						}
					})
			}
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

	.statu {
		margin: 30rpx 24rpx;
		font-size: 34rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #f93030;
	}

	.box {
		background: #ffffff;
		border-radius: 16rpx;
		padding: 30rpx 20rpx;
		margin: 0 24rpx 24rpx;
	}

	.userMsg {
		display: flex;
		align-items: center;

		.left {
			margin-right: 20rpx;

			image {
				width: 100rpx;
				height: 100rpx;
				background: #999;
				border: 2rpx solid #ffffff;
				border-radius: 50%;
			}
		}

		.right {
			display: flex;
			flex-direction: column;

			.nickName {
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: left;
				color: #000000;
			}

			.phone {
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}
		}
	}

	.goodsMsg {
		display: flex;
		flex-direction: column;

		.up {
			display: flex;

			.img {
				image {
					width: 180rpx;
					height: 180rpx;
					background-color: #999;
				}
			}

			.msg {
				display: flex;
				flex-direction: column;
				// justify-content: space-between;
				margin-left: 20rpx;

				.name {
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					font-weight: 500;
					text-align: left;
					color: #333333;
					margin-top: 10rpx;
				}

				.price {
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: left;
					color: #000000;
					margin-top: 50rpx;
				}

				.title {
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
					margin-top: 5rpx;
				}
			}
		}

		.down {
			display: flex;
			flex-direction: column;

			.item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 20rpx;

				.key {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
				}

				.value {
					font-size: 22rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					font-weight: 500;
					text-align: right;
					color: #333333;
				}
			}
		}
	}

	.orderMsg {
		// position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-around;



		.item {
			position: relative;
			display: flex;
			margin: 5rpx 0;

			.key {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}

			.value {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
			}

			.copy {
				position: absolute;
				top: 0rpx;
				right: 0rpx;
				width: 72rpx;
				height: 34rpx;
				background: #ffffff;
				border: 1rpx solid #cccccc;
				border-radius: 18rpx;
				font-size: 22rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #666666;
				line-height: 34rpx;
			}
		}
	}

	.fixedPay {
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 24rpx;
		box-sizing: border-box;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 104rpx;
		background: #ffffff;

		.text {
			display: flex;
			flex-direction: row;

			.key {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}

			.value {
				font-size: 40rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: left;
				color: #f93030;
			}
		}

		.btn {
			margin: 0;
			width: 180rpx;
			height: 72rpx;
			border: 1rpx solid #29c563;
			border-radius: 37rpx;
			font-size: 32rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #29c563;
			line-height: 72rpx;
		}
	}
</style>