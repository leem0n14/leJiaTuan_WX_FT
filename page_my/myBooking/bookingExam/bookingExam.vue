<!-- 预约考试 -->
<template>
	<view>
		<view class="box">
			<view class="userMsg son" v-for="(k,i) in userMsgText">
				<view class="text">{{k}}</view>
				<input :type="userMsgType[i]" :placeholder="placeholderArr[i]">
			</view>
			<view class="course son">
				<view class="text">考试科目</view>
				<picker mode="selector" :range="course.option" @change="chooseCourse">
					<view style="color: #999999;font-size: 28rpx;">{{course.content}}</view>
				</picker>
				<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
			</view>
			<view class="address son">
				<view class="text">考试地点</view>
				<picker mode="selector" :range="address.option" @change="chooseAddress">
					<view style="color: #999999;font-size: 28rpx;">{{address.content}}</view>
				</picker>
				<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
			</view>
			<view class="time son">
				<view class="text">考试时间</view>
				<picker mode="selector" :range="time.option" @change="chooseTime">
					<view style="color: #999999;font-size: 28rpx;">{{time.content}}</view>
				</picker>
				<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
			</view>
		</view>
		<button>确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				userMsgText: ['姓名', '手机号码'],
				userMsgType: ['text', 'number'],
				placeholderArr: ['请输入姓名', '请输入手机号码'],
				course: {
					option: ['科目一', '科目二', '科目三', '科目四'],
					content: '请选择考试科目',
				},
				address: {
					option: ['地点一', '地点二', '地点三', '地点四'],
					content: '请选择考试地点',
				},
				time: {
					option: ['时间一', '时间二'],
					content: '请选择考试时间',
				},
			}
		},
		methods: {
			chooseCourse(e) {
				this.course.content = this.course.option[e.detail.value]
			},
			chooseAddress(e) {
				this.address.content = this.address.option[e.detail.value]
			},
			chooseTime(e) {
				this.time.content = this.time.option[e.detail.value]
			}
		}
	}
</script>

<style>
	page {
		background-color: #f2f3f5;
	}

	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ffffff;
		padding: 25rpx 0;
	}

	.box .son {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 690rpx;
		height: 90rpx;
		margin: 15rpx 0;
		background: #f2f2f2;
		border-radius: 8rpx;
	}

	.box .son .text {
		box-sizing: border-box;
		padding-left: 30rpx;
		width: 172rpx;
		height: 90rpx;
		text-align: left;
		line-height: 90rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		color: #666666;
	}


	button {
		margin-top: 100rpx;
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
	
	.triangle{
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		width: 25rpx;
		height: 18rpx;
	}
</style>
