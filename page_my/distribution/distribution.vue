<!-- 分销 -->
<template>
	<view>
		<image :src="cdn+path+'/fenxiaoUserMsgBackground.png'" mode="aspectFit" class="background">
		</image>
		<view class="content">
			<view class="userMsg">
				<image :src="cdn+'/user'+userMsg.pic" mode="aspectFill"></image>
				<view class="name">{{userMsg.name}}</view>
				<view class="phone">{{userMsg.phone}}</view>
				<view class="Recommender">推荐人：{{userMsg.Recommender}}</view>
			</view>
			<view class="money">
				<image :src="cdn+path+'/commissionBackground.png'" mode="aspectFit"></image>
				<div>
					<image :src="cdn+path+'/commissionIcon.png'" mode="aspectFill" class="icon">
					</image>
					<view class="text">我的佣金：</view>
					<view class="num">￥{{userMsg.commission.toFixed(2)}}</view>
					<button class="txBtn" @click="$win.show('getMoney/getMoney')">提现</button>
				</div>
			</view>
			<view class="lastBox">
				<view class="msg">
					<view class="son" v-for="(k,i) in msg" :key="k.id" @click="$win.show(k.link)">
						<image :src="cdn+path+k.bg" mode="aspectFit"></image>
						<view class="text">{{k.name}}</view>
						<view class="num">{{k.num}}</view>
					</view>
				</view>
				<view class="share">
					<image :src="cdn+path+'/RQcodeImg.png'" mode="aspectFit" style="background-color: #fff;"></image>
					<view class="text">邀请好友学车 赚取福利</view>
					<button>分享二维码</button>
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
				path: '/background/fenxiao',
				//静态
				msg: [{
					name: '历史收益(元)',
					bg: '/historyBackground.png',
					link: 'history/history',
					num: '',
					id: 1
				}, {
					name: '分享订单(单)',
					bg: '/shareOrderBackground.png',
					link: 'shareOrders/shareOrders',
					num: '',
					id: 2
				}, {
					name: '分享团队(人)',
					bg: '/shareTeamBackground.png',
					link: 'shareTeam/shareTeam',
					num: '',
					id: 3
				}],
				//返回信息
				userMsg: {
					name: '卢先生',
					pic: '/touxiang.png',
					phone: '152****6455',
					Recommender: '张三',
					commission: 1000, //佣金
					historyIncome: 1600, //历史收入
					ordersNum: 10, //订单数
					peopleNum: 26, //团队人数

				},

			}
		},
		methods: {
			...mapActions({
				getMyFenxiaoMsg_fun: 'fenxiao/getMyFenxiaoMsg'
			}),
			getNum() {
				this.msg[0].num = this.userMsg.historyIncome.toFixed(2)
				this.msg[1].num = this.userMsg.ordersNum
				this.msg[2].num = this.userMsg.peopleNum
			},
			async getMyFenxiaoMsg(){
				let data={}
				let res =await this.getMyFenxiaoMsg_fun(data)
			},
		},
		computed: {
			...mapState({
				myFenxiaoMsg: state => state.fenxiao.myFenxiaoMsg
			})
		},
		onLoad() {
			this.getNum()
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #f2f3f5;
	// }

	/* 背景start */
	.background {
		width: 750rpx;
		height: 379rpx;
		z-index: -3;
	}

	/* 背景end */


	/* 内容大盒子start */
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		top: -379rpx;
		width: 750rpx;
		height: 1000rpx;
	}

	/* 用户信息start */
	.userMsg {
		position: relative;
		height: 212rpx;
		width: 100%;
	}

	.userMsg image {
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
		line-height: 28px;
	}

	/* 用户信息end */


	/* 佣金start */
	.money {
		position: relative;

		width: 692rpx;
		height: 128rpx;
	}

	.money image {
		width: 692rpx;
		height: 128rpx;
		z-index: -1;
	}

	.money div {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		width: 692rpx;
		height: 128rpx;
		z-index: 1;
	}

	.money div .icon {
		position: absolute;
		left: 30rpx;
		width: 32rpx;
		height: 32rpx;
	}

	.money div .text {
		position: absolute;
		left: 72rpx;
		height: 28rpx;
		opacity: 0.6;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #60340a;
		line-height: 28rpx;
	}

	.money div .num {
		position: absolute;
		left: 212rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #60340a;
		line-height: 28rpx;
	}

	.money div .txBtn {
		position: absolute;
		right: 31rpx;
		width: 140rpx;
		height: 50rpx;
		border: 1px solid rgba(0, 0, 0, 0.00);
		background: #60340a;
		border-radius: 25rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: center;
		color: #ecd09e;
		line-height: 50rpx;
	}

	/* 佣金end */

	/* 底部白盒子start */
	.lastBox {
		display: flex;
		flex-direction: column;
		width: 750rpx;

		border-radius: 16rpx 16rpx 0rpx 0rpx;
	}

	.msg {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 750rpx;
		height: 200rpx;
		background: #ffffff;
		border-radius: 16px 16px 0px 0px;
	}

	.msg view {
		position: relative;
		width: 218rpx;
		height: 116rpx;

	}


	.msg view image {
		width: 218rpx;
		height: 116rpx;
		z-index: -1;
	}

	.msg .son .text {
		position: absolute;
		top: 21rpx;
		height: 24rpx;
		opacity: 0.9;
		font-size: 22rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 24rpx;
	}

	.msg .son .num {
		position: absolute;
		top: 60rpx;
		height: 36rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 36rpx;
	}

	/* 二维码分享start */

	.share {
		position: relative;
		margin: 2rpx auto;
		width: 690rpx;
		height: 287rpx;
		background: #ffffff;
		border: 2px solid #ededed;
		border-radius: 16rpx;
	}

	.share image {
		position: absolute;
		top: 29rpx;
		left: 28rpx;
		width: 317rpx;
		height: 229rpx;
	}

	.share .text {
		position: absolute;
		top: 67rpx;
		right: 71rpx;
		width: 192rpx;
		height: 77rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 45rpx;
	}

	.share button {
		position: absolute;
		top: 175rpx;
		right: 42rpx;
		width: 250rpx;
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

	/* 二维码分享end */

	/* 底部白盒子end */

	/* 内容大盒子end */
</style>
