<!-- 我的成绩 -->
<template>
	<view>
		<view class="hd">
			<view class="title">
				<image :src="cdn+'/icon/study/myScore.svg'" mode="aspectFill"></image>
				<text>历史最高成绩</text>
			</view>
			<view class="highest">
				95
			</view>
			<view class="bottom">
				<view class="son" v-for="(k,i) in sumList">
					<view class="num">{{k.num}}</view>
					<text>{{k.text}}</text>
				</view>
			</view>
		</view>
		<view class="bd">
			<view class="title">
				<view></view>
				<text>历史成绩</text>
			</view>
			<view class="noHistory" v-if="true">
				<image :src="cdn+'/image/noList/noScore.png'" mode="aspectFill"></image>
			<text>暂无成绩</text>
			</view>
			<view class="ul" v-else>
				<view class="li" v-for="(k,i) in historyList">
					<view class="num">
						<text style="font-size: 32rpx;font-weight: 500;">{{k.num}}</text>分
					</view>
					<view class="time">{{k.time}}</view>
					<view class="date">{{k.date}}</view>
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
				sum: 0,
				sumList: [{
						text: '累计考试',
						num: 16,
					},
					{
						text: '合格次数',
						num: 15,
					},
					{
						text: '累计答题',
						num: 1560,
					}
				],
				historyList:[
					{
						num:95,
						time:'10分16秒',
						date:'2019/03/16 16:46',
					},
					{
						num:95,
						time:'9分16秒',
						date:'2019/03/16 16:46',
					},
					{
						num:93,
						time:'8分01秒',
						date:'2019/03/16 16:46',
					},
					{
						num:95,
						time:'10分26秒',
						date:'2019/03/16 16:46',
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f3f5;
	}
	.hd {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 750rpx;
		height: 397rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);

		.title {
			display: flex;
			align-items: center;

			text {
				margin-left: 10rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #ffffff;
			}

			image {
				width: 26rpx;
				height: 32rpx;
				opacity: 0.6;
			}
		}

		;

		.highest {
			font-size: 91rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Bold;
			font-weight: 700;
			text-align: left;
			color: #ffffff;
		}

		;

		.bottom {
			display: flex;
			justify-content: center;
			width: 750rpx;
			height: 127rpx;
			background: linear-gradient(134deg, #54d685, #29c563 99%);

			.son {
				display: flex;
				flex-direction: column;
				align-content: center;
				justify-content: center;
				height: 100%;
				width: 33%;

				.num {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: center;
					color: #ffffff;
				}

				;

				text {
					margin-top: 17rpx;
					opacity: 0.8;
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
				}
			}
		}
	}

	.bd {
		display: flex;
		flex-direction: column;
		align-items: center;
		.title{
			display: flex;
			align-items: center;
			width: 750rpx;
			height: 102rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			background: #ffffff;
			view{
				width: 6rpx;
				height: 29rpx;
				background: #29c563;
			};
			text{
				margin-left: 14rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
			}
		};
	.ul{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		background-color: #ffffff;
		.li{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 690rpx;
			height: 90rpx;
			background: #ffffff;
			.num{
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #f93030;
			};
			.time{
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
			};
			.date{
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #c1c1c1;
			}
		}
	};
	.noHistory{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top:182rpx ;
		image{
			width: 326rpx;
			height: 167rpx;
		};
		text{
			margin-top: 30rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #999999;
		}
	}
	}
</style>
