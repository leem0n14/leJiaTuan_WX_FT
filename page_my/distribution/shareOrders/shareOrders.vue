<!-- 分享订单 -->
<template>
	<view>
		<!-- 头部 -->
		<view class="hd">
			<image :src="cdn+path+'/fenxiaoUserMsgBackground.png'" mode="aspectFill" class="background">
			</image>
			<view class="userMsg">
				<image :src="cdn+'/user/touxiang.png'" mode="aspectFit" class="pic"></image>
				<view class="name">卢先生</view>
				<view class="phone">152****6455</view>
				<view class="Recommender">
					推荐人：张三
				</view>
			</view>
		</view>
		<!-- 主体 -->
		<view class="bd">
			<view class="nav">
				<view class="son" v-for="(k,i) in navArr" @click="isAct(k)">
					<text :style="{'color':k.isAct?'':'#333333'}">{{k.name+'('+k.num+')'}}</text>
					<view class="border" v-show="k.isAct"></view>
				</view>
			</view>
			<view class="body">
				<view class="noOrders" v-if="!haveOrder">
					<image :src="cdn+'/image/noList/noOrder.png'" mode="aspectFit" ></image>
					<text>暂无订单</text>
				</view>
				<view class="box" v-else>
					<view class="son" v-for="(k,i) in orderMsg">
						<view class="orderNum">订单号：{{k.orderNum}}</view>
						<view class="nextLevel">{{k.nextLevel}}</view>
						<image :src="cdn+'/image/goods/common/goods_2.png'" mode="aspectFit"></image>
						<view class="goodsName">{{k.goodsName}}</view>
						<view class="price">￥{{k.price}}</view>
						<view class="income">
							<text>收益：</text>
							<text style="color: #F93030;">￥{{k.income}}</text>
						</view>
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
				path:'/background/fenxiao',
				// 是否有订单
				haveOrder: false, //默认false
				navArr: [{
					name: '一级分销',
					num: 2,
					isAct: true,
				}, {
					name: '二级分销',
					num: 20,
					isAct: false,
				}, {
					name: '三级分销',
					num: 36,
					isAct: false,
				}],
				orderMsg: []
			}
		},
		methods: {
			...mapActions({
				getOrderList_fun:'fenxiao/getShareOrder'
			}),
			isAct(k) {
				for (var a = 0; a < this.navArr.length; a++) {
					this.navArr[a].isAct = false
				}
				k.isAct = true
			},
			init() {
				if (this.orderMsg.length == 0)
					this.haveOrder = false
				else
					this.haveOrder = true
			},
			mockGetData() {
				setInterval(() => {
					let arr = [{
						orderNum: 14521444555687455,
						nextLevel: '刘先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 12000,
						income: 10,
						time: '2018/12/21',
					}, {
						orderNum: 14521444555687455,
						nextLevel: '卢先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 12000,
						income: 10,
						time: '2018/12/21',
					}, {
						orderNum: 14521444555687455,
						nextLevel: '刘先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 12000,
						income: 10,
						time: '2018/12/12',
					}, {
						orderNum: 14521444555687455,
						nextLevel: '马先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 4000,
						income: 10,
						time: '2021/12/21',
					}, {
						orderNum: 14521444555687455,
						nextLevel: '卢先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 12000,
						income: 10,
						time: '2018/12/21',
					}, {
						orderNum: 14521444555687455,
						nextLevel: '刘先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 12000,
						income: 10,
						time: '2018/12/12',
					}, {
						orderNum: 14521444555687455,
						nextLevel: '马先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 4000,
						income: 10,
						time: '2021/12/21',
					}, {
						orderNum: 14521444555687455,
						nextLevel: '卢先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 12000,
						income: 10,
						time: '2018/12/21',
					}, {
						orderNum: 14521444555687455,
						nextLevel: '刘先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 12000,
						income: 10,
						time: '2018/12/12',
					}, {
						orderNum: 14521444555687455,
						nextLevel: '马先生',
						pic: '',
						goodsName: '专车空调全包班',
						price: 4000,
						income: 10,
						time: '2021/12/21',
					}]
					this.orderMsg = arr
				}, 1000)
			},
			async getOrderList(){
				let data={}
				let res=await this.getOrderList_fun(data)
			}
		},
		computed:{
			...mapState({
				shareOrderList:state=>state.fenxiao.orderList
			})
		},
		onLoad() {
			this.init()
			this.mockGetData()
			
		},
		updated() {
			this.init()
		}
		
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #4988f5;
	// }
	
	page {}

	/* 头部start */
	/* 背景 */
	.hd {
		position: relative;
		width: 750rpx;
		height: 214rpx;
	}

	.hd .background {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 214rpx;
		z-index: -1;
	}

	.hd .userMsg {
		position: relative;
		width: 750rpx;
		height: 214rpx;
	}

	.userMsg .pic {
		position: absolute;
		top: 47rpx;
		left: 30rpx;
		width: 120rpx;
		height: 120rpx;
		background: rgba(0, 0, 0, 0.00);
		border-radius: 50%;
	}

	.userMsg .name {
		position: absolute;
		top: 67rpx;
		left: 170rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #ffffff;
		line-height: 32rpx;
	}

	.userMsg .phone {
		position: absolute;
		top: 119rpx;
		left: 170rpx;
		height: 28rpx;
		opacity: 0.6;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 28rpx;
	}

	.userMsg .Recommender {
		position: absolute;
		top: 69rpx;
		right: 30rpx;
		height: 28rpx;
		opacity: 0.8;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #ffffff;
		line-height: 28rpx;
	}

	/* 头部end */

	/* 主体start */
	.bd {

		width: 750rpx;
	}

	.bd .nav {
		display: flex;
		width: 100%;
		height: 70rpx;
		border-bottom: 10rpx solid #f2f3f5;
	}

	.bd .nav .son {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 250rpx;
		height: 70rpx;
	}

	.bd .nav .son text {
		text-align: center;
		height: 29rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #0b2e6d;
		line-height: 29rpx;
		margin-top: 22rpx;
	}

	.bd .nav .son .border {
		width: 100rpx;
		height: 4rpx;
		background: #0b2e6d;
		margin-top: 14rpx;
	}

	.bd .body {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.bd .body .noOrders {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 179rpx;
	}

	.bd .body .noOrders image {
		width: 326rpx;
		height: 174rpx;
	}

	.bd .body .noOrders text {
		margin-top: 30rpx;
		width: 112rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 40rpx;
	}

	/* 订单样式start */

	.bd .body .box {
		display: flex;
		flex-direction: column;
		max-height: 850rpx;
		overflow-y: auto;
	}

	.bd .body .box .son {
		position: relative;
		height: 200rpx;
		min-height: 200rpx;
		width: 690rpx;
		border-bottom: 3rpx solid #ededed;
	}

	.bd .body .box .son .orderNum {
		position: absolute;
		top: 17rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #999999;
		line-height: 24rpx;
	}

	.bd .body .box .son .nextLevel {
		position: absolute;
		top: 19rpx;
		right: 0;
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #4988f5;
		line-height: 24rpx;
	}

	.bd .body .box .son image {
		position: absolute;
		bottom: 27rpx;
		width: 86rpx;
		height: 86rpx;
	}

	.bd .body .box .son .goodsName {
		position: absolute;
		left: 106rpx;
		bottom: 82rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #333333;
		line-height: 28rpx;
	}

	.bd .body .box .son .price {
		position: absolute;
		left: 106rpx;
		bottom: 30rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 28rpx;
	}

	.bd .body .box .son .income {
		position: absolute;
		right: 0;
		bottom: 82rpx;
	}

	.bd .body .box .son .income text {
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: right;
		color: #333333;
		line-height: 40rpx;
	}

	.bd .body .box .son .time {
		position: absolute;
		right: 0;
		bottom: 29rpx;
		height: 26rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 26rpx;
	}

	/* 订单样式end */

	/* 主体end */
</style>
