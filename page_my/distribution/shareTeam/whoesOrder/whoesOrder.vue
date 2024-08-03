<!-- 某人的订单 -->
<template>
	<view>
		<view class="hd">
			<image :src="cdn+'/user/touxiang2.png'" mode="aspectFill" style="background-color: #f2f3f5;"></image>
			<view class="name">卢先生</view>
			<view class="registeredTime">注册时间：2018/12/21</view>
			<view class="shareNum">分享13人</view>
		</view>
		<view class="bd">
			<view class="text">
				Ta的订单
			</view>
			<view class="box">
				<view class="son" v-for="(k,i) in ordersMsg">
					<view class="up"> 
						<text>订单号：{{k.orderNum}}</text>
					</view>
					<view class="down">
						<image :src="cdn+'/image/goods/common/goods_2.png'" mode="aspectFit"></image>
						<view class="goodsName">{{k.name}}</view>
						<view class="price">￥{{k.price}}</view>
						<view class="income">收益：<text style="color: #f93030;">￥</text>{{k.income.toFixed(2)}} </view>
						<view class="time">{{k.time}}</view>
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
				ordersMsg: [{
					orderNum:'14521444555687455',
					pic: '',
					name: '专车空调全包班',
					price: 12000,
					income: 10,
					time: '2018/12/21',
				},{
					orderNum:'14521444555687455',
					pic: '',
					name: '专车空调全包班',
					price: 12000,
					income: 10,
					time: '2018/12/21',
				},{
					orderNum:'14521444555687455',
					pic: '',
					name: '专车空调全包班',
					price: 12000,
					income: 10,
					time: '2018/12/21',
				}]
			}
		},
		methods: {
			...mapActions({
				getSomeBodyOrder_fun:'fenxiao/getSomeBodyOrder'
			}),
			async getSomeBodyOrder(){
				let data={}
				let res =await this.getSomeBodyOrder_fun(data)
			}
		},
		computed:{
			...mapState({
				msg:state=>state.fenxiao.someBodyOrder
			})
		},
		onShow() {
			
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	image{
		background-color: #29c563;
	}
	
	
	page {}

	/* 上半start */
	.hd {
		position: relative;
		width: 750rpx;
		height: 160rpx;
		background: #29c563;
	}

	.hd image {
		position: absolute;
		top: 40rpx;
		left: 30rpx;
		width: 80rpx;
		height: 80rpx;
		background: rgba(0, 0, 0, 0.00);
		border-radius: 50%;
	}

	.hd .name {
		position: absolute;
		left: 127rpx;
		top: 48rpx;
		height: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 30rpx;
	}

	.hd .registeredTime {
		position: absolute;
		top: 90rpx;
		left: 127rpx;
		height: 23rpx;
		font-size: 22rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 23rpx;
	}

	.hd .shareNum {
		position: absolute;
		right: 0;
		top: 52rpx;
		width: 184rpx;
		height: 57rpx;
		box-sizing: border-box;
		padding-left: 16rpx;
		background: #ffffff;
		border-radius: 29rpx 0rpx 0rpx 29rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #29c563;
		line-height: 57rpx;
	}

	/* 上半end */

	/* 下半start */
	.bd {
		display: flex;
		flex-direction: column;
	}

	.bd .text {
		margin: 44rpx 0 20rpx 30rpx;
		height: 34rpx;
		font-size: 34rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 34rpx;
	}

	.bd .son {
		box-sizing: border-box;
		margin-top: 3rpx;
		padding: 0 30rpx;
		width: 750rpx;
		height: 200rpx;
	}


	.bd .son .up {
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 60rpx;
	}

	.bd .son .up text {
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 24rpx;
	}

	.bd .son .down {
		position: relative;
		width: 690rpx;
		height: 140rpx;
		border-bottom: 2rpx solid #ededed;
	}

	.bd .son .down image {
		position: absolute;
		top: 27rpx;
		left: 0;
		width: 86rpx;
		height: 86rpx;
	}

	.bd .son .down .goodsName {
		position: absolute;
		top: 30rpx;
		left: 106rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #333333;
		line-height: 28rpx;
	}

	.bd .son .down .price {
		position: absolute;
		bottom: 28rpx;
		left: 106rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 28rpx;
	}

	.bd .son .down .income {
		position: absolute;
		top: 30rpx;
		right: 0;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: right;
		color: #333333;
		line-height: 28rpx;
	}

	.bd .son .down .time {
		position: absolute;
		bottom: 29rpx;
		right: 0;
		height: 26rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 26rpx;
	}

	/* 下半end */
</style>
