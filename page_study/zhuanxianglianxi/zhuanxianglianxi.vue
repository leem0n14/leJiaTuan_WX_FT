<!-- 专项练习 -->
<template>
	<view>
		<view class="box1 box">
			<view class="text">
				<image :src="cdn+'/icon/study/practice/sequence.svg'" mode="aspectFill"></image>
				<text>按章节练习</text>
			</view>
			<image src="/static/iconfont/right.webp" mode="aspectFill"></image>
		</view>
		<view class="box2 box">
			<view class="list" v-for="(item,index) in box2List">
				<view class="text">
					<image :src="cdn+item.pic" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
				<view class="num">
					{{item.num}}
				</view>
			</view>
		</view>
		<view class="box3 box">
			<view class="list" v-for="(item,index) in 12">
				<view class="text">
					<view class="circle">{{index+1}}</view>
					<text>警告标志</text>
				</view>
				<view class="num">
					16
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				box2List: [{
						name: '争议题',
						pic: '/icon/study/practice/dispute.svg',
						num: 16,
					},
					{
						name: '易错题',
						pic: '/icon/study/practice/fallibility.svg',
						num: 5
					},
					{
						name: '未做题',
						pic: '/icon/study/practice/unfinished.svg',
						num: 9
					}, {
						name: '强化题',
						pic: '/icon/study/practice/strengthen.svg',
						num: 25
					}
				]
			}
		},
		methods: {

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

	.box {
		display: flex;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 750rpx;
		box-sizing: border-box;
		background: #ffffff;
		margin-bottom: 20rpx;

		.list {
			position: relative;
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			width: 50%;
			height: 88rpx;
			padding: 24rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #f2f3f5;

			.text {
				display: flex;
				align-items: center;
				flex-direction: row;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				;

				.circle {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: #29c563;
					border: 1rpx solid #a2e899;
					font-size: 22rpx;
					line-height: 40rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
				}

				;

				text {
					margin-left: 16rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}

			;

			.num {
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #c1c1c1;
			}
		}

		;

		.list:nth-child(2n):before {
			position: absolute;
			left: 0;
			content: '';
			background-color: #ededed;
			width: 2rpx;
			height: 61rpx;
		}
	}

	.box1 {
		padding: 24rpx;
		height: 88rpx;

		.text {
			display: flex;
			align-items: center;
			flex-direction: row;

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
			}

			;

			image {
				margin-right: 16rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}

		image {
			width: 17rpx;
			height: 17rpx;
		}
	}

	.box2 {}

	.box3 {}
</style>
