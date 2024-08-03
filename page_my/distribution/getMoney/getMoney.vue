<!-- 提现 -->
<template>
	<view class="tx">
		<image :src="cdn+path+'/fenxiaoUserMsgBackground.png'" mode="aspectFill" class="background">
		</image>
		<view class="box">
			<image class="bg" :src="cdn+path+'/tixianBackground.png'" mode="aspectFit"></image>
			<image class="icon" :src="cdn+path+'/commissionIcon.png'" mode="aspectFill"></image>
			<view class="text">我的佣金</view>
			<view class="money">
				￥<text>{{myCommission.toFixed(2)}}</text>
			</view>
			<button class="txBtn" @click="$win.show('goTixian/goTixian')">提现</button>
		</view>
		<view class="recording">
			<view class="title">提现明细</view>
			<view class="body" v-if="haveRecording">
				<view class="son" v-for="(k,i) in recordingMsg">
					<view class="msg">
						<view class="text">
							<text style="color: #F93030;font-weight: 400;">提现</text>
							<text>￥{{k.num}}</text>
						</view>
						<view class="state" :style="{'color':stateColor[k.isSucceed]}">{{stateArr[k.isSucceed]}}</view>
					</view>
					<view class="time">
						{{k.time}}
					</view>
				</view>
			</view>
			<view class="noTixian" v-else>
				<image :src="cdn+'/image/noList'+'/noTixian.png'" mode="aspectFit"></image>
				<view class="text">暂无提现明细</view>
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
				haveRecording: true,
				stateArr: ['提现失败', '审核中', '提现成功'],
				stateColor: ['#f93030', '#4988f5', '#333333'],
				myCommission: 1000,
				recordingMsg: [{
						num: 200,
						time: '2018-12-23 15:45:56',
						isSucceed: 1, //是否提现成功：2成功，0失败，1审核中
						id: 1,
					}, {
						num: 300,
						time: '2018-12-23 15:45:56',
						isSucceed: 1, //是否提现成功
						id: 2,
					},
					{
						num: 400,
						time: '2018-12-23 15:45:56',
						isSucceed: 2, //是否提现成功
						id: 3,
					},
					{
						num: 200,
						time: '2018-12-23 15:45:56',
						isSucceed: 0, //是否提现成功
						id: 4,
					}
				]
			}
		},
		methods: {
			...mapActions({
				getMoneyList_fun:'fenxiao/getMoneyList'
			}),
			init() {
				if (this.recordingMsg.length == 0)
					this.haveRecording = false
				else
					this.haveRecording = true
			},
			async getMoneyList(){
				let data={}
				let res =await this.getMoneyList_fun(data)
			}
		},
		computed:{
			list:state=>state.fenxiao.getMoneyList
		},
		onShow() {
			
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #ecd09e;
	// }
	
	page {}

	.tx {
		position: relative;
		margin: 0;
		padding: 0;
	}

	/* 背景start */
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		z-index: -2;
	}

	/* 背景end */

	/* 我的佣金start */
	.box {
		position: fixed;
		width: 690rpx;
		height: 231rpx;
		top: 57rpx;
		left: 30rpx;
		z-index: 2;
	}

	.box .bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 690rpx;
		height: 231rpx;
		border-radius: 15rpx;
		z-index: -1;
	}

	.box .icon {
		position: absolute;
		top: 50rpx;
		left: 40rpx;
		width: 32rpx;
		height: 32rpx;
		opacity: 0.6;
	}

	.box .text {
		position: absolute;
		top: 52rpx;
		left: 82rpx;
		width: 112rpx;
		height: 28rpx;
		opacity: 0.6;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #60340a;
		line-height: 28rpx;
	}

	.box .money {
		position: absolute;
		left: 40rpx;
		bottom: 53rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #60340a;
	}

	.box .money text {
		font-size: 64rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #60340a;
	}

	.box button {
		position: absolute;
		top: 90rpx;
		right: 40rpx;
		width: 140rpx;
		height: 50rpx;
		line-height: 50rpx;
		background: #60340a;
		border-radius: 25rpx;
		border: 1px solid rgba(0, 0, 0, 0.00);
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: center;
		color: #ecd09e;
		
	}

	/* 我的佣金end */

	/* 提现记录start */
	.recording {
		position: absolute;
		top: 172rpx;
		left: 0;
		box-sizing: border-box;
		width: 750rpx;
		min-height: 500rpx;
		padding: 0 30rpx;
		background-color: #fff;
	}

	.recording .title {
		margin: 172rpx 0 20rpx 0;
		width: 136rpx;
		height: 34rpx;
		font-size: 34rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #111111;
		line-height: 34rpx;
	}

	.recording .body {
		height: 600rpx;
		width: 100%;
	}

	.recording .body .son {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 130rpx;
		background: #ffffff;
	}


	.recording .body .son .msg {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.recording .body .son .text {
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #444444;
		line-height: 32rpx;
	}

	.recording .body .son .time {
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 24rpx;
	}

	.recording .body .son .state {
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #4988f5;
		line-height: 32rpx;
	}

	/* 提现记录end */

	/* 无提现记录start */
	.recording .noTixian {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 161rpx auto 0;
		width: 326rpx;
		height: 196rpx;
	}

	.recording .noTixian image {
		width: 326rpx;
		height: 196rpx;
	}

	.recording .noTixian .text {
		margin-top: 30rpx;
		width: 168rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 28rpx;
	}

	/* 无提现记录end */
</style>
