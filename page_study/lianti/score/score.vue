<!-- 成绩页 -->
<template>
	<view>
		<view class="hd">
			<view class="share">
				<image :src="cdn+'/icon/share.svg'" mode="aspectFill"></image>
				<text>分享</text>
			</view>
			<view class="isPass">
				<image :src="cdn+'/image/mockExam/isPass.png'" mode="aspectFill"></image>
				<text>{{score>=90?'考试及格':'考试不及格'}}</text>
			</view>
			<image class="pic" :src="cdn+(score>=90?'/image/mockExam/Pass.png':'/image/mockExam/noPass.png')"
				mode="aspectFill"></image>
			<view class="score">
				<text>{{score}}</text>分
			</view>
			<view class="time">
				考试用时：{{min}}分{{second}}秒
			</view>
		</view>
		<view class="bd">
			<view class="son">
				<view>
					<view class="icon">
						<image :src="cdn+'/image/mockExam/seeErr.png'" mode="aspectFill"></image>
					</view>
					<view class="text">
						<text class="t1">查看错题</text>
						<text class="t2">
							做错<text style="color: #F93030;">{{ct}}</text>题&nbsp;&nbsp;未做<text
								style="color: #29C563;">{{wzt}}</text>题
						</text>
					</view>
				</view>
				<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFit"></image>
			</view>
			<view class="son">
				<view>
					<view class="icon">
						<image :src="cdn+'/image/mockExam/myScore.png'" mode="aspectFill"></image>
					</view>
					<view class="text">
						<text class="t1">我的成绩</text>
						<text class="t2">历史最好成绩99分</text>
					</view>
				</view>
				<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFit"></image>
			</view>
			<view class="son">
				<view>
					<view class="icon">
						<image :src="cdn+'/image/mockExam/reExam.png'" mode="aspectFill"></image>
					</view>
					<view class="text" @click="$win.back(2)">
						<text class="t1">重新考试</text>
						<text class="t2">状态不错，再考一次</text>
					</view>
				</view>
				<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				// isPass: true,
				examqk: null,
				time: null,
				min:null,
				second:null,
				ct:0,//错题
				score:0,//成绩
				courseCode:null,
			}
		},
		methods: {
			...mapActions({
				markScore_fun:'study/markScore',
			}),
			backStudy() {
				uni.switchTab({
					url: '/pages/study/study'
				});
			},
			
			async markScore(){
				let data={
					userId:this.$db.getSync('userId'),
					score:this.score,
					statu:this.score>=90?1:0,
					time:this.time,
					finishTime:new Date().getTime(),
					passesSum:100-this.wzt
				}
				let res=await this.markScore_fun(data)
			},
		},
		onLoad(e) {
			// console.log('score', e);
			this.examqk = JSON.parse(decodeURIComponent(e.examqk))
			this.time = e.timeStamp
			this.min=e.timeStamp/1000-(e.timeStamp/1000%60)
			this.second=(e.timeStamp/1000%60)
			this.wzt = e.wzt
			this.score = e.score
			this.courseCode=e.courseCode
			let errNum=0
			for(let i=0;i<this.examqk.length;i++){
				if(this.examqk[i].statu==2)
				errNum++
			}
			this.ct=errNum
			
			this.markScore()
		},

		onUnload() {
			uni.switchTab({
				url: '/pages/study/study'
			});
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #a0c595;
	// }

	page {
		background-color: #f2f3f5;
	}

	.hd {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		height: 672rpx;
		background: #ffffff;

		.share {
			display: flex;
			align-items: center;
			position: absolute;
			right: 0;
			top: 30rpx;
			width: 110rpx;
			height: 40rpx;
			background: #eff0f2;
			border-radius: 20rpx 0rpx 0rpx 20rpx;

			image {
				margin-left: 17rpx;
				width: 22rpx;
				height: 24rpx;
			}

			text {
				margin-left: 14rpx;
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
			}
		}

		.isPass {
			position: relative;
			width: 518rpx;
			height: 158rpx;
			margin-top: 52rpx;

			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 518rpx;
				height: 158rpx;
			}

			text {
				position: absolute;
				top: 45rpx;
				left: 177rpx;
				width: 164rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff;
				line-height: 25rpx;
				letter-spacing: 5.94rpx;
			}
		}

		.pic {
			margin-top: 22rpx;
			width: 481rpx;
			height: 203rpx;
		}

		.score {
			margin-top: 51rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;

			text {
				font-size: 64rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: left;
				color: #f93030;
			}
		}

		.time {
			margin: 25rpx 0 0 0;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #999999;
		}
	}

	.bd {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		width: 750rpx;

		.son {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			background-color: #fff;
			border-bottom: 2rpx solid #f2f3f5;

			view {
				display: flex;
				align-items: center;

				.icon {
					display: flex;
					align-items: center;
					height: 120rpx;
					margin-right: 30rpx;

					image {
						width: 38rpx;
						height: 42rpx;
					}
				}

				.text {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;
					height: 90rpx;

					.t1 {
						font-size: 28rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #333333;
					}

					.t2 {
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #999999;
					}
				}
			}

			image {
				width: 17rpx;
				height: 17rpx;
			}
		}
	}
</style>
