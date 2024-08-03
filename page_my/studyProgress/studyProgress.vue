<!-- 学车进度 -->
<template>
	<view>
		<view class="studentMsg" v-show="isCoach">
			<view class="left">
				<image :src="cdn+'/user/touxiang.png'" mode="aspectFill"></image>
				<view class="text">
					<text class="name">李四</text>
					<text class="phone">15219784824</text>
				</view>
			</view>
			<view class="right">
				<view class="change" @click="$win.show('/pages/my/myCoach/changeCoach/changeCoach')">
					<image :src="cdn+'/icon/changeCoach/change.svg'" mode="aspectFill"></image>
					<text>更换教练</text>
				</view>
				<view class="progressText">
					<text style="color: #333333;">考试进度：科目二</text>
					<text style="color: #FFBB1E;">(待考)</text>
				</view>
			</view>
		</view>
		<view class="progressContent">
			<view class="background">
				<view class="progress">
					<view class="course" v-for="(k,i) in chartData" @click="isShow(k)">
						<view style="height: 100%;width: 100%;" v-if="(k.series[0].data<1)&&(k.series[0].data>=0)">
							<qiun-data-charts type="arcbar" :opts="opts" :chartData="k" />
							<text class="num">{{k.series[0].data*100+'%'}}</text>
						</view>
						<view style="height: 100%;width: 100%;" v-else>
							<view class="finished" v-if="k.series[0].data==1">
								<icon type="success" size="68rpx" color="#FFFFFF" class="icon" />
							</view>
							<view class="noOpen" v-else></view>
						</view>
						<text class="courseName" style="color: #FFFFFF;font-size: 24rpx;">{{k.series[0].name}}</text>
					</view>
				</view>
			</view>
			<view class="body" v-for="(k,i) in chartData" v-show="k.isShow">
				<view class="title">
					<view></view>
					<text>{{k.series[0].name}}</text>
					<view></view>
				</view>
				<view class="content">
					<view class="onPic" v-if="k.series[0].name!='科目二'">
						<image :src="cdn+((i==2)?pic[1]:pic[0])" mode="aspectFill"></image>
						<text v-show="(k.series[0].data>=0&&k.series[0].data<1)?true:false">正在练习中...</text>
					</view>
					<view class="step" v-else>
						<view class="son" v-for="(item,index) in courseTwoList">
							<view class="circle" v-if="item.state!=1"
								:style="{'color':(item.state==0)?'':'#C7C7C7','borderColor':(item.state==0)?'':'#C7C7C7'}">
								{{index+1}}
							</view>
							<icon type="success" size="36rpx" class="icon" v-else />
							<view class="name">{{item.title}}</view>
							<view class="text">{{item.desc}}</view>
							<view class="state"
								:style="{'color':(item.state==1)?'':'#999999','borderColor':(item.state==1)?'':'#E3E3E3'}">
								{{backText(item.state)}}
							</view>
							<view class="line" v-show="index!=(courseTwoList.length-1)"
								:style="{'background':item.isFinited?'#29c563':''}">
							</view>
						</view>
					</view>
				</view>
				<view class="bottom"
					:style="{'color':(k.series[0].data==1)?'':'#666666','background':(k.series[0].data==1)?'':'#E3E3E3'}">
					{{backBottomText(k.series[0].data)}}
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
				isCoach:false,
				isFinished: true,
				px: null,
				pic: ['/image/studyProgress/course14.png', '/image/studyProgress/course23.png'],
				// pic: ['/static/images/background/my/bishi.png', '/static/images/background/my/shicao.png'],
				// 进度条数据
				chartData: [{
						series: [{
							name: "科目一",
							color: '#e6f8ed',
							data: 1,
						}],
						isShow: true,
					},
					{
						series: [{
							name: "科目二",
							color: '#e6f8ed',
							data: 0.25,
						}],
						isShow: false,
					},
					{
						series: [{
							name: "科目三",
							color: '#e6f8ed',
							data: -1,
						}],
						isShow: false,
					},
					{
						series: [{
							name: "科目四",
							color: '#e6f8ed',
							data: -1,
						}],
						isShow: false,
					}
				],
				// 进度条样式
				opts: {
					extra: {
						arcbar: {
							type: "circle",
							backgroundColor: '#8de2ad',
							width: null, //进度条宽度
						}
					},
				},
				courseTwoList: [{
						title: '倒车入库',
						desc: '先是从右面倒入车库，完毕后从左面倒车入库，完成后从右面驾驶出库。',
						state: 1, //状态
					},
					{
						title: '直角转弯',
						desc: '先是从右面倒入车库，完毕后从左面倒车入库，完成后从右面驾驶出库。',
						state: 1,
					},
					{
						title: '曲线行驶',
						desc: '先是从右面倒入车库，完毕后从左面倒车入库，完成后从右面驾驶出库。',
						state: 0,
					},
					{
						title: '陡坡定点停车和起步',
						desc: '先是从右面倒入车库，完毕后从左面倒车入库，完成后从右面驾驶出库。',
						state: -1,
					},
					{
						title: '侧方位停车',
						desc: '先是从右面倒入车库，完毕后从左面倒车入库，完成后从右面驾驶出库。',
						state: -1,
					}
				]
			}
		},
		methods: {
			toPX() {
				//根据用户设备屏幕大小设置宽度
				this.px = uni.getWindowInfo().screenWidth / 750
				console.log('lwlsb', this.px)
				this.opts.extra.arcbar.width = 6 * this.px
			},

			//标题返回
			returnTitle() {
				for (var a = 0; a < 4; a++) {
					if (this.chartData[a].series[0].data != 1)
						return this.chartData[a].series[0].name
				}
			},
			//点击科目进度，显示该科目盒子
			isShow(k) {
				for (var a = 0; a < 4; a++) {
					this.chartData[a].isShow = false
				}
				k.isShow = true
				console.log('111')
			},
			//返回状态内容
			backText(key) {
				if (key == 1)
					return '已完成'
				else if (key == 0)
					return '未完成'
				else
					return '未开始'
			},
			//返回bottom内容
			backBottomText(n) {
				if (n < 1 && n >= 0)
					return '未完成'
				else if (n == 1)
					return '已完成'
				else
					return '未开始'

			}
		},
		onReady() {
			
		},
		onLoad(option) {
			this.toPX()
			if(option.type==1)
			{
				this.isCoach=true
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;

	}

	.studentMsg {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 176rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		background: #ffffff;

		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			image {
				width: 96rpx;
				height: 96rpx;
				background: #f2f3f5;
				border-radius: 50%;
			}

			.text {
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;

				.name {
					font-size: 34rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: left;
					color: #333333;
				}

				.phone {
					margin-top: 25rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.change {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 28rpx;

				image {
					margin-right: 10rpx;
					width: 33rpx;
					height: 28rpx;
					// background: #999999;
				}

				text {
					line-height: 28rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}
			}

			.progressText {
				display: flex;
				align-items: center;

				text {
					font-size: 26rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
				}

			}
		}
	}

	.progressContent {
		position: relative;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 750rpx;
		height: 300rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
	}

	.progress {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0 auto;
		width: 690rpx;
		height: 226rpx;
	}

	.course {
		position: relative;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		width: 100rpx;
		height: 100rpx;
	}

	.course:nth-child(-n+3)::after {
		position: absolute;
		top: 48rpx;
		right: -66rpx;
		content: '';
		width: 60rpx;
		height: 4rpx;
		opacity: 0.4;
		background: #ffffff;
		border-radius: 2rpx;
	}

	.course .num {
		position: absolute;
		top: 32rpx;
		left: 15rpx;
		height: 40rpx;
		width: 70rpx;
		line-height: 40rpx;
		text-align: center;
		color: #FFFFFF;
	}

	.course .courseName {
		position: absolute;
		width: 100rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 29rpx;
	}

	.course .finished {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		width: 80rpx;
		height: 80rpx;
		box-sizing: border-box;
		border: 4rpx solid #b5ebc5;
		border-radius: 50%;
	}

	.course .noOpen {
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		width: 80rpx;
		height: 80rpx;
		box-sizing: border-box;
		border: 4rpx solid #ededed;
		border-radius: 50%;
	}



	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 226rpx;
		left: 30rpx;
		width: 690rpx;
		height: 940rpx;
		background: #ffffff;
		border-radius: 16rpx;
	}

	.body .title {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690rpx;
		padding-top: 58rpx;
	}

	.body .title text {
		margin: 0 14rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: Bold;
		text-align: center;
		color: #333333;
	}

	.body .title view {
		width: 60rpx;
		height: 4rpx;
		background: #e3e3e3;
		border-radius: 2rpx;
	}

	.body .content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 690rpx;
		height: 690rpx;
	}

	.body .content .onPic {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 690rpx;
		height: 690rpx;
	}

	.body .content .onPic image {
		margin-top: 47rpx;
		width: 405rpx;
		height: 416rpx;
		// background-color: skyblue;
	}

	.body .content .onPic text {
		margin-top: 52rpx;
		width: 164rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 28rpx;
	}

	.body .content .step {
		display: flex;
		flex-direction: column;
		width: 598rpx;
		height: 554rpx;
	}


	.body .content .step .son {
		position: relative;
		height: 110rpx;
		width: 100%;
	}

	.body .content .step .son .icon {
		position: absolute;
		top: 6rpx;
		left: 0;
	}

	.body .content .step .son .circle {
		position: absolute;
		top: 6rpx;
		left: 0;
		width: 36rpx;
		height: 36rpx;
		background: #ffffff;
		box-sizing: border-box;
		border: 3rpx solid #29c563;
		border-radius: 50%;
		font-weight: 500;
		font-size: 24rpx;
		color: #29c563;
		line-height: 30rpx;
		text-align: center;
	}

	.body .content .step .son .line {
		position: absolute;
		left: 18rpx;
		top: 48rpx;
		width: 4rpx;
		height: 60rpx;
		background: #e3e3e3;
		border-radius: 2rpx;
	}


	.body .content .step .son .name {
		position: absolute;
		top: 11rpx;
		left: 56rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 28rpx;
	}

	.body .content .step .son .text {
		position: absolute;
		bottom: 0;
		left: 56rpx;
		width: 341rpx;
		font-size: 20rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
	}

	.body .content .step .son .state {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #29c563;
		line-height: 50rpx;
		width: 160rpx;
		height: 50rpx;
		background: #ffffff;
		border: 1rpx solid #29c563;
		border-radius: 26rpx;
	}

	.body .bottom {
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
</style>
