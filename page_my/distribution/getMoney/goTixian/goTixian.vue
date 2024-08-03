<!-- 用户提现信息 -->
<template>
	<view>
		<!-- 上半 -->
		<view class="hd">
			<view class="available">可提现余额：
				<text style="color: #60340A;font-weight: 600;">{{msg.available.toFixed(2)}}</text><text
					style="color:#111111;font-weight: 600;">元</text>
			</view>
			<view class="history">历史收益：{{msg.historyIncome.toFixed(2)}}元</view>
			<view class="tips">注：提现时间为3个工作日</view>

			<view class="num input">
				<view class="text">提现金额</view>
				<input type="number" placeholder="请输入提现金额,最少200.00元" v-model="useMsg.getNum"
					@blur="numTips();isFinish()">
				<view class="all" @click="getAll">全部</view>
			</view>
		</view>
		<!-- 下半 -->
		<view class="bd">
			<view class="name input">
				<view class="text">支付宝姓名</view>
				<input type="text" placeholder="请输入支付宝姓名" v-model="useMsg.userName" @blur="isFinish">
			</view>
			<view class="account input">
				<view class="text">支付宝账号</view>
				<input type="text" placeholder="请输入支付宝账号" v-model="useMsg.account" @blur="isFinish">
			</view>
			<view class="phone input">
				<view class="text">手机号码</view>
				<input type="number" placeholder="请输入手机号码" v-model="useMsg.phone" maxlength="11" @blur="isFinish()">
			</view>
			<button class="btn" :disabled="!isFall" @click="getMsg();phoneNum()">确定</button>
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
			//！！！！记得把触发条件改为@confirm
			return {
				isFall: false,
				//提现金额信息  静态
				msg: {
					available: 0,
					historyIncome: 0,
				},
				//表单  
				useMsg: {
					getNum: '',
					userName: '',
					account: '',
					phone: '',
				}
			}
		},
		methods: {
			...mapActions({
				toGetM_fun:'fenxiao/toGetMoney'
			}),
			getData() {
				setInterval(() => {
					let serverData = {
						available: 800,
						historyIncome: 1600,
					}
					this.msg = serverData
				}, 500);
				console.log(this.msg)
			},
			// 全部提现
			getAll() {
				this.useMsg.getNum = this.msg.available
			},
			//提现数额不合要求提示
			numTips() {
				if (this.useMsg.getNum) {
					if (this.useMsg.getNum < 200) {
						uni.showModal({
							title: '每次提现额度至少为200',
							content: '您当前输入的额度为：' + this.useMsg.getNum + '元’',
							showCancel: false
						})
						this.useMsg.getNum = ''
					} else if (this.useMsg.getNum > this.msg.available) {
						uni.showModal({
							title: '超出最大可提现的额度！！！',
							content: '您当前可提现的最大额度为：' + this.msg.available,
							showCancel: false
						})
						this.useMsg.getNum = ''
					}
				}
			},
			//判断表单是否填完
			isFinish() {
				if (this.useMsg.account != '' && this.useMsg.phone != '' && this.useMsg.userName != '' && this.useMsg
					.getNum != '')
					this.isFall = true
				else
					this.isFall = false
			},
			getMsg() {
				console.log(this.useMsg)
			},
			//判断手机号位数
			phoneNum() {
				if (this.useMsg.phone.length < 11) {
					uni.showModal({
						title: '手机号码不足11位',
						content: '您输入的号码为：' + this.useMsg.phone
					})
					this.useMsg.phone=''
				}
			}
		},
		computed:{
			...mapState({
				
			})
		},
		onShow() {
			
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style>
	page {}

	/* 上半start */
	.hd {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 750rpx;
		height: 320rpx;
		padding: 30rpx;
		background: #ffffff;
		border-bottom: 22rpx solid #f2f3f5;
	}

	.hd .available {
		height: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 22rpx;
	}

	.hd .history {
		height: 26rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 26rpx;
	}

	.hd .tips {
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 24rpx;
	}

	/* 上半end */



	/* 下半start */
	.bd {
		display: flex;
		flex-direction: column;
		padding: 40rpx 30rpx 0;
		width: 750rpx;
		background: #ffffff;
	}

	.bd .btn {
		margin: 70rpx 55rpx 0;
		width: 580rpx;
		height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 90rpx;
	}

	/* 下半end */

	/* 输入框样式 */
	.input {
		display: flex;
		justify-content: left;
		align-items: center;
		width: 690rpx;
		height: 90rpx;
		box-sizing: border-box;
		padding: 0 29rpx;
		background: #f2f2f2;
		border-radius: 8rpx;
		margin-bottom: 30rpx;
	}


	.input input {
		height: 90rpx;
		width: 394rpx;
		text-align: left;
		line-height: 90rpx;

	}

	.input .text {
		width: 160rpx;
		height: 30rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 30rpx;
	}

	.input .all {
		height: 90rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #29c563;
		line-height: 90rpx;
	}
</style>
