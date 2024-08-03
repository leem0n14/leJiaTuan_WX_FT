<!-- 更换教练 -->
<template>
	<view>
		<view class="hd">
			<view class="up">
				<view class="ring" v-for="(k,i) in process" :style="{'borderColor':ringStyle(i)?'':'#c1c1c1'}">
				</view>
			</view>
			<view class="down">
				<view class="text son">
					<text v-for="(k,i) in process">{{k}}</text>
				</view>
				<view class="time son">
					<text v-for="(k,i) in timeArr" style="width: 164px;height: 22px;">{{k}}</text>
				</view>
			</view>
		</view>
		<view class="bd">
			<view class="box">
				<textarea placeholder="请输入您的更换教练的理由" name="reason" id="reason" cols="30" rows="10" maxlength="100"
					v-model="reasonText" v-if="!isSubmit"></textarea>
				<view class="shenheState" v-else>
					<image :src="cdn+path+picArr[state]" mode="aspectFit"></image>
					<text>{{stateTextArr[state]}}</text>
				</view>
			</view>
			<view class="num" v-if="!isSubmit">{{reasonText.length}}/100</view>
			<button v-if="!isSubmit" @click="submit()">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				path:'/image/changeCoach',
				timeArr: ['2019/06/13 16:46', '', ''], //时间数组
				timeBool: [true, false, false],
				isSubmit: false, //是否提交
				control: 1, //控制圆点样式和显示审核阶段对应的时间
				state: 0, //0正在审核,1审核通过,2不通过
				process: ['提交申请', '正在审核', '审核结果'],
				stateTextArr: ['正在审核...', '审核通过', '审核失败'],
				picArr: ['/auditing.png',
					'/succeed.png',
					'/fail.png'
				],
				reasonText: '', //理由


			}
		},
		methods: {
			ringStyle(i) {
				console.log(this.state + this.control - i)
				if (this.state + this.control - i > 0) {
					return true
				} else
					return false
			},
			dispTime() {
				if (this.state > 0) {
					this.timeBool[1] = true
					this.timeBool[2] = true
				}
			},
			submit() {
				this.isSubmit = true
				this.control = 2
			},

		},
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #29c563;
	// }
	
	page {}

	/* 上半start */
	.hd {
		margin: 0 auto;
		padding-top: 27rpx;
		height: 254rpx;
		width: 690rpx;
	}

	.up {
		display: flex;
		width: 690rpx;
		flex-direction: row;
		justify-content: space-around;
		padding: 36rpx 0;
	}

	.up .ring {
		position: relative;
		box-sizing: border-box;
		width: 28rpx;
		height: 28rpx;
		background: #ffffff;
		border: 6rpx solid #29c563;
		border-radius: 50%;
	}

	.up .ring:nth-child(-n+2):after {
		position: absolute;
		top: 8rpx;
		left: 22rpx;
		content: '';
		width: 204rpx;
		height: 4rpx;
		background: #e3e3e3;
	}

	.down {
		display: flex;
		flex-direction: column;
		width: 690rpx;
		height: 100rpx;
	}

	.down .son {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}

	.down .text {
		height: 28rpx;
		margin-bottom: 16rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 28rpx;
	}

	.down .time {
		height: 22rpx;
		font-size: 20rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #c1c1c1;
		line-height: 22rpx;
	}





	/* 上半end */

	/* 下半start*/
	.bd {
		margin: 0 auto;
		height: 800rpx;
		width: 690rpx;
	}



	.bd .box {
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		padding: 30rpx;
		width: 690rpx;
		height: 509rpx;
		background: #f5f5f5;
		border-radius: 16rpx;
	}

	.bd .box textarea {
		width: 690rpx;
		height: 509rpx;
	}

	.bd .box .shenheState {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bd .box .shenheState image {
		margin-top: 138rpx;
		width: 185rpx;
		height: 201rpx;
	}

	.bd .box .shenheState text {
		margin-top: 32rpx;
		width: 156rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 32rpx;
	}

	.bd .num {
		margin-top: 16rpx;
		height: 26rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #c1c1c1;
		line-height: 26rpx;
	}


	.bd button {
		margin-top: 58rpx;
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
</style>
