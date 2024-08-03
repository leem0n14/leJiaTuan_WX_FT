<!-- 模拟考试 -->
<template>
	<view>
		<image class="background" :src="cdn+'/background/mockExamBackground.png'" mode="aspectFit"></image>
		<view class="box">
			<view class="title">
				<view></view>
				<text>试题信息</text>
				<view></view>
			</view>
			<view class="body">
				<view>
					<text class="l">考试科目</text>
					<text class="r">{{courseCode==1?'科目一小车C1/C2C3':'科目四小车C1/C2C3'}}</text>
				</view>
				<view>
					<text class="l">考题数量</text>
					<text class="r">100题</text>
				</view>
				<view>
					<text class="l">考试时间</text>
					<text class="r">45分钟</text>
				</view>
				<view>
					<text class="l">合格标准</text>
					<text class="r">满分100分，90分及格</text>
				</view>
				<text class="tips">出题规则按公安部规定比例随机抽取</text>
			</view>
			<button class="btn" @click="$win.show('../lianti/lianti?type='+'模拟考试'+'&courseCode='+courseCode)">全真模拟考试</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				courseCode: null,
			}
		},
		methods: {

		},
		onLoad(e) {
			// console.log(e);
			this.courseCode=e.courseCode
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #29c563;
	// }
	page {
		background-color: #f2f3f5;
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 453rpx;
		z-index: -1;
	}

	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 690rpx;
		height: 752rpx;
		margin: 344rpx 30rpx 0;
		background: #ffffff;
		border-radius: 16rpx;

		.title {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 80rpx;

			view {
				width: 58rpx;
				height: 6rpx;
				background: #ededed;
				border-radius: 1rpx;
			}

			;

			text {
				margin: 0 26rpx;
				font-size: 40rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #333333;
			}
		}

		;

		.body {
			display: flex;
			flex-direction: column;
			align-items: center;

			view {
				width: 482rpx;
				display: flex;
				flex-direction: row;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				padding: 20rpx 0;

				.l {
					margin-right: 40rpx;
					color: #999999;
				}

				;

				.r {
					color: #333333;
				}

				;

			}

			.tips {
				margin-top: 20rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}
		}
	}

	.btn {
		margin-top: 81rpx;
		width: 580rpx;
		height: 90rpx;
		background: linear-gradient(134deg, #49aaf5, #4988f5 99%);
		border-radius: 45rpx;
		font-size: 32rpx;
		line-height: 90rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;

	}
</style>
