<!-- 模拟科目三考试页 -->
<template>
	<view>
		<!-- 头部 -->
		<view class="hd">
			<view class="up">
				<view class="l">
					<text>灯光模拟</text>
					<switch checked="true" @change="" color="#31c869" style="transform:scale(0.7);" />
				</view>
				<view class="r">
					<text>选择学员</text>
					<text style="margin: 0 50rpx;">预览</text>
					<text>编辑</text>
				</view>
			</view>
			<view class="down">
				<view class="step">
					<view class="circle" v-for="k in 6">
						<view></view><!-- 未开始的进度点 -->
						<icon class="icon" type="success" color="#4988f5" size="20rpx" v-if="false" />
						<view class="current" v-else></view>
					</view>
				</view>
				<view class="icons">
					<view class="icon" v-for="(k,i) in step">
						<image :src="cdn+'/image/study/sourse3/voice/'+(i+1)+'.png'" mode="aspectFill"></image>
						<text>{{k}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 中间 -->
		<view class="mid">
			<view class="time">
				用时<text style="margin-left: 10rpx;">00:07</text>
			</view>
			<view class="score">
				得分<text style="color: #F93030;margin-left: 10rpx;">100分</text>
			</view>
		</view>
		<!-- 主体 -->
		<view class="bd">
			<view class="list" v-for="k in 16">
				<text class="t1">不按考试员指令驾驶</text>
				<text class="t2">综合不合格</text>
				<text class="t3">-100分</text>
			</view>
		</view>

		<!-- 手动评判 -->
		<view class="manual" v-show="isShowManual">
			<view class="mask" @click="isShowManual=false"></view>
			<view class="title">
				手动评判
			</view>
			<view class="box">
				<view class="nav">
					<view class="option" v-for="(k,i) in manualNavList" :key="i"
						:style="{'backgroundColor':k.isAct?'#ffffff':'#f5f5f5'}" @click="manualNavClick(k)">
						<image :src="cdn+'/image/study/sourse3/voice/'+(i+1)+'.png'" mode="aspectFill"></image>
						<text>{{k.text}}</text>
					</view>
				</view>
				<view class="content">
					<view class="list" v-for="(k,i) in 16" :key="i">
						<text class="t1">不按考试员指令驾驶</text>
						<text class="t2">- 100分</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 指令 -->
		<view class="instruction" v-show="isShowInstruction">
			<view class="mask" @click="isShowInstruction=false"></view>
			<view class="title">人工指令</view>
			<view class="box">
				<view class="nav">
					<view class="option" v-for="(k,i) in instructionNavList" :key="i"
						:style="{'backgroundColor':k.isAct?'#ffffff':''}" @click="instructionNavClick(k)">
						<view v-show="k.isAct"></view>
						<text :style="{'color':k.isAct?'#29C563':''}">{{k.text}}</text>
					</view>
				</view>
				<view class="content">
					<view class="son" v-for="(k,i) in 13" :key="i">
						<image src="" mode="aspectFill"></image>
						<text>上车准备</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="bottom">
			<view class="son scoreBtn" @click="isShowManual=true">手动评判</view>
			<view class="son endBtn">考试结束</view>
			<view class="son manualBtn" @click="isShowInstruction=true">人工指令</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST, 
				step:['上车准备','起步提示','直线行驶','加减档位','直线行驶','加减档位'],
				// 是否显示手动评判
				isShowManual: false,
				// 手动评判nav
				manualNavList: [{
						pic: '',
						text: '综合不合格',
						isAct: true,
					},
					{
						pic: '',
						text: '综合扣十分',
						isAct: false,
					},
					{
						pic: '',
						text: '上车起步',
						isAct: false,
					},
					{
						pic: '',
						text: '起步',
						isAct: false,
					},
					{
						pic: '',
						text: '直线行驶',
						isAct: false,
					},
					{
						pic: '',
						text: '加减档',
						isAct: false,
					},
					{
						pic: '',
						text: '直线行驶',
						isAct: false,
					}
				],
				// 是否显示人工指令
				isShowInstruction: false,
				instructionNavList: [{
						text: '行驶指令',
						isAct: true,
					},
					{
						text: '灯光指令',
						isAct: false,
					}
				]
			}
		},
		methods: {
			manualNavClick(k) {
				for (var a = 0; a < this.manualNavList.length; a++) {
					this.manualNavList[a].isAct = false
				}
				k.isAct = true
			},
			instructionNavClick(k) {
				for (var a = 0; a < this.instructionNavList.length; a++) {
					this.instructionNavList[a].isAct = false
				}
				k.isAct = true
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}


	.hd {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 290rpx;
		background: #ffffff;

		.up {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 750rpx;
			height: 80rpx;
			background: #ffffff;
			box-sizing: border-box;
			padding: 0 30rpx;

			.r {
				display: flex;
				align-items: center;

				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #29c563;

				}
			}

			.l {
				display: flex;
				align-items: center;

				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #333333;
					margin-right: 20rpx;
				}
			}
		}

		.down {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			width: 750rpx;
			height: 210rpx;
			// background: #ffffff;
			// background-color: #29c563;

			.step {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 690rpx;

				.circle {
					position: relative;
					width: 20rpx;
					height: 20rpx;
					background: #e3e3e3;
					border-radius: 50%;

					.icon {
						position: absolute;
						top: 0;
						left: 0;
					}

					.current {
						width: 20rpx;
						height: 20rpx;
						border: 6rpx solid #4988f5;
						border-radius: 50%;
						box-sizing: border-box;
					}
				}

				.circle:nth-child(-n+5) {
					position: relative;

					&:after {
						position: absolute;
						right: -100rpx;
						top: 8rpx;
						content: ' ';
						width: 100rpx;
						height: 4rpx;
						background-color: #e3e3e3;
					}
				}
			}

			.icons {
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: row;
				width: 690rpx;

				.icon {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					image {
						background-color: skyblue;

						width: 60rpx;
						height: 60rpx;
					}

					text {
						margin-top: 10rpx;
						font-size: 20rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #333333;
					}
				}
			}
		}
	}

	.mid {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 750rpx;
		height: 50rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #f2f3f5;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
	}

	.bd {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		height: 814rpx;
		max-height: 814rpx;
		overflow-y: auto;
		box-sizing: border-box;
		padding: 0 30rpx 50rpx;
		background: #ffffff;

		.list {
			position: relative;
			width: 690rpx;
			height: 114rpx;
			min-height: 114rpx;
			border-bottom: 2rpx solid #f2f3f5;

			.t1 {
				position: absolute;
				top: 24rpx;
				left: 0;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
			}

			.t2 {
				position: absolute;
				top: 66rpx;
				left: 0;
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}

			.t3 {
				position: absolute;
				top: 24rpx;
				right: 0;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #F93030;
			}
		}
	}

	.manual {
		position: fixed;
		bottom: 0;
		height: 1126rpx;
		width: 750rpx;
		background-color: #ffffff;
		z-index: 99;

		.mask {
			position: absolute;
			top: -80rpx;
			width: 750rpx;
			height: 80rpx;
			background: #000;
			opacity: 0.5;
		}

		.title {
			width: 750rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #ffffff;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Medium;
			font-weight: 500;
			text-align: center;
			color: #333333;
		}

		.box {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 1045rpx;
			width: 750rpx;

			.nav {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 160rpx;
				height: 1045rpx;
				max-height: 100%;
				overflow-y: auto;
				// background-color: #f5f5f5;

				.option {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 160rpx;
					height: 149rpx;
					min-height: 149rpx;
					// background: #ffffff;

					image {
						width: 60rpx;
						height: 60rpx;
						background-color: skyblue;
						margin-bottom: 10rpx;
					}

					text {
						font-size: 20rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #333333;
					}
				}
			}

			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 590rpx;
				max-height: 100%;
				height: 1045rpx;
				overflow-y: auto;
				background-color: #ffffff;

				.list {
					position: relative;
					width: 550rpx;
					height: 120rpx;
					min-height: 120rpx;
					border-bottom: 2rpx solid #f5f5f5;

					.t1 {
						position: absolute;
						top: 27rpx;
						left: 0;
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #666666;
					}

					.t2 {
						position: absolute;
						top: 69rpx;
						left: 0;
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #333333;
					}
				}
			}
		}
	}

	.instruction {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		width: 750rpx;
		height: 832rpx;
		z-index: 99;
		background-color: #f2f3f5;

		.mask {
			position: absolute;
			top: -374rpx;
			left: 0;
			height: 374rpx;
			width: 750rpx;
			background-color: #000;
			opacity: 0.5;
		}

		.title {
			// margin-bottom: 2rpx;
			width: 750rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #ffffff;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Medium;
			font-weight: 500;
			text-align: center;
			color: #333333;
		}

		.box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 750rpx;
			height: 752rpx;
			background-color: #f2f3f5;

			.nav {
				display: flex;
				flex-direction: column;
				width: 186rpx;
				height: 100%;
				max-height: 100%;
				box-sizing: border-box;
				padding: 2rpx 0;

				// background-color:skyblue;
				.option {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					position: relative;
					width: 186rpx;
					height: 108rpx;
					min-height: 108rpx;

					view {
						position: absolute;
						left: 0;
						top: 0;
						width: 6rpx;
						height: 108rpx;
						background: #29c563;
					}

					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #333333;
					}
				}
			}

			.content {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				width: 564rpx;
				height: 100%;
				max-height: 100%;
				overflow-y: auto;
				background-color: #f2f3f5;
				border-top: 2rpx solid #ededed;
				border-left: 2rpx solid #ededed;
				.son {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 186rpx;
					height: 186rpx;
					min-height: 186rpx;
					border-right: 2rpx solid #ededed;
					border-bottom: 2rpx solid #ededed;
					box-sizing: border-box;
					background-color: #ffffff;
					image{
						width: 90rpx;
						height: 90rpx;
						background-color: skyblue;
					}
					text{
						margin-top: 12rpx;
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}

	.bottom {
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 98rpx;
		box-sizing: border-box;
		background: #ffffff;
		border-top: 2rpx solid #ededed;

		.son {
			width: 210rpx;
			height: 68rpx;
			line-height: 68rpx;
			border: 1rpx solid #29c563;
			border-radius: 35rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
		}

		.scoreBtn,
		.manualBtn {
			background: linear-gradient(134deg, #54d685, #29c563 99%);
			color: #ffffff
		}

		.endBtn {
			background: #ffffff;
			color: #29c563;
		}
	}
</style>
