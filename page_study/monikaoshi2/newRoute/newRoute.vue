<!-- 新建考试路线 -->
<template>
	<view>
		<view class="msg">
			<view class="name">
				<text>路线名称</text>
				<view class="input">
					<input type="text" placeholder="请输入路线名称" placeholder-style="color:#999999" v-model="routeName">
					<view class="zidong">自动命名</view>
				</view>
			</view>
			<view class="voice">
				<view class="text">
					<text style="color: #111111;font-size: 36rpx;font-weight: 500;margin-bottom:20rpx ;">灯光语音</text>
					<text style="color: #999999;font-size: 24rpx;font-weight: 400;">选择是否在线路开始时增加灯光语音</text>
				</view>
				<radio-group>
					<label class="radio no">
						<text>不需要灯光语音</text>
						<radio value="no" color="#42cf77" />
					</label>
					<label class="radio random">
						<text>随机选择一个灯光语音 <text>注意:每次自动播放随机选择不同灯光语音</text> </text>
						<radio value="random" color="#42cf77" />
					</label>

					<label class="radio manual">
						<text>手动选择灯光语音</text>
						<radio value="manual" color="#42cf77" />
						<!-- <view class="lightList">
							<label class="radio">
								<radio value="" /><text></text>
							</label>
						</view> -->
					</label>
				</radio-group>
			</view>
		</view>
		<view class="tips">
			<view class="title">
				<icon type="warn" size="32rpx"/>
				<text>关于定位的注意问题</text>
			</view>
			<text v-for="(k,i) in tipsList" :key="i">{{k}}</text>
		</view>
		<view class="next" @click="$win.show('markerMap/markerMap')">下一步</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				routeName: '',
				lightList: ['灯光01', '灯光02', '灯光03', '灯光04', '灯光05', '灯光06', '灯光07', '灯光08'],
				tipsList:[
					'1、请在相对空旷的地方进行定位,确保您的上方没有被较大物体遮挡;' ,
					'2、通过较窄的车道,尽量不要走往返路线; ',
					'3、定位时请打开手机网络,开启手机GPS定位可以使定位更快更准; ',
					'4、创建线路时,请尽量以真实考试时的速度驾驶,保证信号稳定。',
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.msg {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #ffffff;

		.name {
			display: flex;
			flex-direction: column;
			margin: 30rpx 0;

			text {
				font-size: 36rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: left;
				color: #111111;
				margin: 20rpx 0;
			}

			.input {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: 702rpx;
				height: 98rpx;
				padding: 0 22rpx;
				box-sizing: border-box;
				background: #f2f2f2;
				border-radius: 8rpx;

				input {
					width: 500rpx;
					height: 98rpx;
					line-height: 98rpx;
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}

				.zidong {
					height: 98rpx;
					line-height: 98rpx;
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #4988f5;
				}
			}

		}

		.voice {
			.text {
				display: flex;
				flex-direction: column;

				text {
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					text-align: left;
				}
			}

			.radio {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: 702rpx;
				padding: 44rpx 0;
				border-bottom: 2rpx solid #f2f3f5;

				text {
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #111111;

					text {
						margin-top: 20rpx;
						font-size: 20rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #c7c7c7;
					}
				}
			}

			.lightList {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				width: 702rpx;
				padding: 44rpx 0;

			}
		}
	}
		.tips{
			display: flex;
			flex-direction: column;
			padding: 40rpx 24rpx;
			height: 30vh;
			max-height: 30vh;
			overflow-y: scroll;
			.title{
				display: flex;
				flex-direction: row;
				align-items: center;
				text{
					margin-left: 16rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}
			text{
				margin: 10rpx 0;
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
				line-height: 32rpx;
			}
		}

	.next {
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		width: 750rpx;
		height: 104rpx;
		line-height: 104rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
	}
</style>
