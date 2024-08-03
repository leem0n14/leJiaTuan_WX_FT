<!-- 科目三模拟考试 -->
<template>
	<view>
		<view class="nav">
			<view class="son" v-for="(k,i) in navList" :key="i" @click="navAct(k)">
				<text
					:style="{'color':k.isAct?'':'#999999','fontSize':k.isAct?'':'28rpx','border':k.isAct?'':'none'}">{{k.text}}</text>
			</view>
		</view>
		<!-- 我的路线 -->
		<view class="body" v-if="navList[0].isAct?true:false">
			<view class="son" @click="$win.show('/pages/study/monikaoshi2/mockExam3/mockExam3')">
				<view class="up">

				</view>
				<view class="down">
					<view class="l">
						<text class="name">扶大3号路线</text>
						<view class="msg">
							<text class="length">全长30m</text>
							<text class="num">19条指令</text>
							<text class="usedNum">2人使用过</text>
						</view>
					</view>
					<view class="r">
						<view class="son" v-for="k in 3"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 附近路线 -->
		<view class="routeList" v-else>
			<view class="son" v-for="(k,i) in 4" :key="i">
				<image src="" mode="aspectFill" style="background-color: skyblue;"></image>
				<text class="routeName">扶大3号路线</text>
				<view class="msg">
					<text>刘小姐</text>
					<text>梅州驾校</text>
					<text>2人使用</text>
				</view>
				<view class="distance">距离3.42km</view>
				<view class="detailed">
					<view v-for="k in 3"></view>
				</view>
			</view>
		</view>
		<view class="bottom" @click="$win.show('newRoute/newRoute')">
			新建模拟考试路线
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [{
						text: '我的路线',
						isAct: true,
					},
					{
						text: '附近路线',
						isAct: false,
					}
				]
			}
		},
		methods: {
			navAct(item) {
				for (var a = 0; a < this.navList.length; a++) {
					this.navList[a].isAct = false
				}
				item.isAct = true
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 90rpx;
		background: #ffffff;

		.son {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 50%;

			text {
				line-height: 90rpx;
				height: 90rpx;
				border-bottom: 6rpx solid #111111;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #111111;
			}
		}
	}

	// 我的路线
	.body {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		max-height: 1000rpx;
		overflow-y: auto;

		.son {
			box-sizing: border-box;
			width: 690rpx;
			height: 360rpx;
			background: #ffffff;
			border-radius: 16rpx;
			margin: 15rpx 0;

			.up {
				height: 244rpx;
				width: 690rpx;
				background-color: skyblue;
			}

			.down {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0rpx 30rpx;
				box-sizing: border-box;
				height: 116rpx;
				width: 690rpx;

				.l {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 116rpx;

					.name {
						font-size: 32rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Medium;
						font-weight: 500;
						text-align: left;
						color: #111111;
					}

					.msg {
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #999999;

						text {
							margin-right: 20rpx;
						}
					}
				}

				.r {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 42rpx;
					height: 42rpx;

					// background-color: #29c563;
					.son {
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						background-color: #333333;
					}
				}
			}
		}
	}

	// 附近路线列表
	.routeList {
		display: flex;
		flex-direction: column;
		margin-top: 10rpx;
		width: 750rpx;

		.son {
			position: relative;
			width: 750rpx;
			height: 140rpx;
			background: #ffffff;
			margin-bottom: 2rpx;

			image {
				position: absolute;
				top: 30rpx;
				left: 30rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.routeName {
				position: absolute;
				top: 32rpx;
				left: 130rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: left;
				color: #111111;
			}

			.msg {
				position: absolute;
				bottom: 32rpx;
				left: 130rpx;
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;

				text {
					margin-right: 20rpx;
				}
			}
			.distance{
				position: absolute;
				top: 58rpx;
				right: 102rpx;
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: right;
				color: #4988f5;
			}
			
			.detailed{
				position: absolute;
				right: 30rpx;
				top: 52rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 42rpx;
				height: 42rpx;
				// background-color: #29c563;
				view{
					border-radius: 50%;
					height: 8rpx;
					width: 8rpx;
					background-color: #333333;
				}
			}
		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 104rpx;
		line-height: 104rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}
</style>
