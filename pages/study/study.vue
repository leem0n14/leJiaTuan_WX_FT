<!-- 学习 -->
<template>
	<view>
		<!-- 主导航 -->
		<view class="nav">
			<view class="list" v-for="(k,i) in navList" @click="navAct(k,i)">
				<text :style="{'color':k.isAct?'#29c563':''}">{{k.name}}</text>
				<view v-show="k.isAct"></view>
			</view>
		</view>
		<!-- 副导航 -->
		<view class="otherNav">
			<view class="son" v-for="(k,i) in otherNav" :class="k.style"
				@click="(k.link)?$win.show(k.link+`?courseCode=${courseCode}`):$win.nlog('暂未开放该功能')">
				{{otherNavText()[i]}}
			</view>
		</view>
		<!-- 科目一四 -->
		<view class="course14" v-if="navList[0].isAct||navList[3].isAct">
			<!-- 顺序练题 -->
			<view class="box">
				<view class="left">
					<view class="son" v-for="(k,i) in practiceL"
						@click="(k.link)?$win.show(k.link+'?courseCode='+courseCode):$win.nlog('该功能暂未开放')">
						<image :src="cdn+k.pic" mode="aspectFill"></image>
						<text>{{k.text}}</text>
					</view>
				</view>
				<view class="practice center">
					<view class="inside"
						@click="$win.show('/page_study/lianti/lianti?type='+'顺序练题'+'&courseCode='+courseCode)">
						<text>顺序练题</text>
						<text
							style="font-size: 34rpx;opacity: 0.9;font-weight: 400;margin-top: 22rpx;">{{pro}}/{{sum}}</text>
					</view>
				</view>
				<view class="right">
					<view class="son" v-for="(k,i) in practiceR"
						@click="(k.link)?$win.show(k.link):$win.nlog('该功能暂未开放')">
						<image :src="cdn+k.pic" mode="aspectFill"></image>
						<text>{{k.text}}</text>
					</view>
				</view>
			</view>
			<!-- 模拟考试 -->
			<view class="box">
				<view class="left">
					<view class="son" v-for="(k,i) in mockExamL"
						@click="(k.link)?$win.show(k.link+'?courseCode='+courseCode):$win.nlog('该功能暂未开放')">
						<image :src="cdn+k.pic" mode="aspectFill"></image>
						<text>{{k.text}}</text>
					</view>
				</view>
				<view class="mockExam center">
					<view class="inside"
						@click="true?$win.show('/page_study/monikaoshi/monikaoshi?courseCode='+courseCode):$win.nlog('该功能暂未开放')">
						<text>模拟考试</text>
					</view>
				</view>
				<view class="right">
					<view class="son" v-for="(k,i) in mockExamR"
						@click="(k.link)?$win.show(k.link):$win.nlog('该功能暂未开放')">
						<image :src="cdn+k.pic" mode="aspectFill"></image>
						<text>{{k.text}}</text>
					</view>
				</view>
			</view>
			<!-- 题库 -->
			<view class="questionBank" @click="$win.show('/page_login/index_2?code=1')">
				<view class="left">
					<image :src="cdn+'/icon/study/tiku_Icon.svg'" mode="aspectFill"></image>
					<text>我的题库</text>
				</view>
				<view class="right">
					<text>{{myTiku}}</text>
					<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFill"></image>
				</view>
			</view>

		</view>
		<!-- 科目二三 -->
		<view class="course23" v-else>
			<view class="box2" v-if="navList[1].isAct"
				@click="this.$win.show('/page_study/yuyinbobao/yuyinbobao?title='+'科目二')">
				<view>
					<image :src="cdn+'/icon/study/voice.svg'" mode="aspectFill"></image>
					<text>语音播报</text>
				</view>
				<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFit"></image>
			</view>
			<view class="box3" v-else>
				<view class="mockExam">
					<view class="out">
						<view class="in"
							@click="true?this.$win.show('/page_study/monikaoshi2/monikaoshi2'):this.$win.nlog('该功能暂未开放')">
							模拟考试
						</view>
					</view>
				</view>
				<view class="option" v-for="(k,i) in option" :key="i" @click="this.$win.show(k.link+'?title='+'科目三')">
					<image :src="cdn+k.pic" mode="aspectFill"></image>
					<text>{{k.text}}</text>
				</view>
			</view>
			<view class="videos">
				<view class="title">
					<image :src="cdn+'/icon/study/video.svg'" mode="aspectFill"></image>
					<text>学车视频</text>
				</view>
				<view class="" v-if="courseCode===2">
					<view v-if="video2&&video2.length!==0">
						<view class="son" v-for="(k,i) in video2 " :key="k.id" :id="'myVideo'" @click="toDetail(k)">
							<image :src="cdn + '/subject23/'+k.photo" mode="aspectFit" class="son-image"></image>
							<text class="name">{{k.name}}</text>
							<text class="text">{{(k.content==null)?'暂无描述':k.content}}</text>
							<!-- <view class="difficulty">
								<text class="t">难度：</text>
								<uni-rate value="4" readonly="true" size="24rpx"></uni-rate>
							</view> -->
						</view>
					</view>
				</view>
				<view class="" v-if="courseCode===3">
					<view class="" v-if="video3&&video3.length!==0">
						<view class="son" v-for="(k,i) in video3" :key="k.id" :id="'myVideo'" @click="toDetail(k)">
							<image :src="cdn + '/subject23/'+k.photo" mode="aspectFit" class="son-image"></image>
							<text class="name">{{k.name}}</text>
							<text class="text">{{(k.content==null)?'暂无描述':k.content}}</text>
							<!-- <view class="difficulty">
								<text class="t">难度：</text>
								<uni-rate value="4" readonly="true" size="24rpx"></uni-rate>
							</view> -->
						</view>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				tikuMsg: '未选择题库',
				courseCode: 1,
				navList: [{
					name: '科目一',
					isAct: true,
				}, {
					name: '科目二',
					isAct: false,
				}, {
					name: '科目三',
					isAct: false,
				}, {
					name: '科目四',
					isAct: false,
				}],
				// otherNavStyle: ['st', 'nd', 'rd'],
				otherNav: [{
						style: 'st',
						link: '/page_study/kaogui/kaogui',
					},
					{
						style: 'nd',
						link: '/page_study/datijiqiao/datijiqiao',
					},
					{
						style: 'rd',
						link: '/page_study/tubiaoguanli/tubiaoguanli',
					},
				],
				option: [{
						pic: '/icon/study/lightMock.svg',
						text: '灯光模拟',
						link: '/page_study/dengguangmoni/dengguangmoni',
					},
					{
						pic: '/icon/study/voice.svg',
						text: '语音播报',
						link: '/page_study/yuyinbobao/yuyinbobao',
					}
				],
				practiceL: [
					// {
					// 	pic: '/image/study/zhuanxianglianxi.png',
					// 	text: '专项练习',
					// 	// link: '/page_study/zhuanxianglianxi/zhuanxianglianxi',
					// },
					{
						pic: '/image/study/cuoti.png',
						text: '我的错题',
						link: '/page_study/cuoti/cuoti',
					},
				],
				practiceR: [{
						pic: '/image/study/VIP.png',
						text: 'VIP课程',
						// link: '/page_study/vipCourse/vipCourse',
					},
					{
						pic: '/image/study/weizuoti.png',
						text: '未做题',
						// link: '/page_study/weizuoti/weizuoti',
					},
				],

				mockExamL: [{
						pic: '/image/study/suijilianxi.png',
						text: '随机练习',
						// link: '/page_study/suijilianxi/suijilianxi',
					},
					{
						pic: '/image/study/shoucang.png',
						text: '我的收藏',
						link: '/page_study/shoucang/shoucang',
					},
				],
				mockExamR: [{
					pic: '/image/study/wodechengji.png',
					text: '我的成绩',
					// link: '/page_study/wodechengji/wodechengji',
				}],
			}
		},
		methods: {
			screenChange(e) {
				this.video = uni.createVideoContext('video_play');
				this.video.play()
				console.log('全屏', e);
			},
			playVideo(e) {
				// 获取 video 上下文 videoContext 对象
				console.log('播放', e);
				this.videoContext = uni.createVideoContext('video_play');
				// 进入全屏状态
				this.videoContext.requestFullScreen({
					direction: 90
				});
			},
			...mapActions({
				getUserTikuMsg_fun: 'user/getUserTikuMsg',
				getUserInfo_fun: 'user/getUserInfo',
				getPro_fun: 'study/getQuetionId',
				getVideo2_fun: 'study/getVideo2',
				getVideo3_fun: 'study/getVideo3',
			}),
			//nav点击逻辑
			navAct(item, index) {
				for (let a = 0; a < this.navList.length; a++) {
					this.navList[a].isAct = false
				}
				item.isAct = true
				this.courseCode = index + 1
				if ((index + 1) == 1 || (index + 1) == 4) {
					this.getPro(index + 1)
				}
				if (this.courseCode == 2) {
					this.getVideo2()
				} else if (this.courseCode == 3) {
					this.getVideo3()
				}
				this.getLink()
			},
			// 副导航栏内容返回
			otherNavText() {
				for (var a = 0; a < this.navList.length; a++) {
					if (this.navList[a].isAct) {
						var string = ''
						if (a === 0 || a === 3) {
							string = (a === 0 ? '科一考规' : '科四考规')
							return [string, '答题技巧', '图标管理']
						} else {
							string = (a === 1 ? '科二考规' : '科三考规')
							return [string, '考试秘籍', '学车技巧']
						}
					}
				}
			},
			//判断跳转链接
			getLink() {
				if (this.navList[0].isAct || this.navList[3].isAct) {
					this.otherNav[1].link = '/page_study/datijiqiao/datijiqiao'
					this.otherNav[2].link = '/page_study/tubiaoguanli/tubiaoguanli'
				} else {
					this.otherNav[1].link = '/page_study/kaoshimiji/kaoshimiji'
					this.otherNav[2].link = '/page_study/xuechejiqiao/xuechejiqiao'
				}
			},
			dispVideo() {
				// if(this.navList[1].isAct){
				// 	return 'video2'
				// }
				// else if(this.navList[2].isAct){
				// 	return 'video3'
				// }
				let list = this.navList[2].isAct ? this.video3 : this.video2
				return list
			},
			toDetail(e) {
				// console.log(e, 'lll');
				// const processedRichText = e.richText.replace(/<font color="(.*?)">(.*?)<\/font>/g,
				// 	'<span style="color:$1">$2</span>');
				// 预处理
				// this.$db.setSync('_richText', processedRichText)
				// this.$win.show('/page_study/videoView/videoView?video=' + e.video + '&name=' + e.name +
				// 	`&richText=${e.richText}&content=${e.content}`)

				const processedRichText = e.richText.replace(/<font color="(.*?)">(.*?)<\/font>/g,
					'<span style="color:$1">$2</span>');
		

				console.log(processedRichText, 'lll');
				this.$db.setSync('_richText', processedRichText);
				this.$win.show('/page_study/videoView/videoView?video=' + e.video + '&name=' + e.name +
					`&richText=${encodeURIComponent(processedRichText)}&content=${e.content}`);


			},
			//获取我的题库设置
			async getMyTiku() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getUserTikuMsg_fun(data)
			},
			async getUserInfo() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getUserInfo_fun(data)
			},
			//拿进度
			async getPro(courseCode) {
				let data = {
					userId: this.$db.getSync('userId'),
					courseCode,
				}
				console.log('pro’', this.$db.getSync('userId'));
				let res = await this.getPro_fun(data)
			},
			//拿视频列表
			async getVideo2() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getVideo2_fun(data)
			},
			async getVideo3() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getVideo3_fun(data)
			},
		},
		computed: {
			...mapState({
				myTiku: state => state.user.tikuType,
				pro: state => state.study.id,
				sum: state => state.study.sum,
				video2: state => state.study.video2,
				video3: state => state.study.video3,
			})
		},
		onShow() {
			// this.getMyTiku()
			this.getUserInfo()
			if (this.courseCode == 1 || this.courseCode == 4) {
				this.getPro(this.courseCode)
			}
		},
		onLoad() {

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

	//无视频样式
	.noVideo {
		// margin-top: 50rpx;
		padding-top: 80rpx;
		background-color: #f2f3f5;
		color: #999;
		text-align: center;
	}

	// 导航栏
	.nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 88rpx;
		margin-bottom: 4rpx;
		background: #ffffff;

		.list {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 25%;
			height: 100%;

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #999999;
			}

			;

			view {
				position: absolute;
				bottom: 0;
				width: 98rpx;
				height: 4rpx;
				background: #29c563;
			}
		}
	}

	// 副导航栏
	.otherNav {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 100rpx;
		background: #ffffff;

		.son {
			margin: 0 3rpx;
			width: 230rpx;
			height: 60rpx;
			border-radius: 2rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #f55549;
			line-height: 60rpx;
		}

		;

		.st {
			color: #f55549;
			background: #ffe5e4;
		}

		;

		.nd {
			color: #f59211;
			background: #ffedc5;
		}

		;

		.rd {
			background: #b8f2c6;
			color: #4bb23d;
		}
	}

	//两个主盒子
	.box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 380rpx;
		background: #ffffff;

		.center {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 248rpx;
			height: 248rpx;
			box-sizing: border-box;
			border-radius: 50%;

			.inside {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 214rpx;
				height: 214rpx;
				border-radius: 50%;

				text {
					font-size: 36rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					font-weight: 500;
					text-align: center;
					color: #ffffff;
				}
			}
		}

		;

		.mockExam {
			border: 6rpx solid rgba(73, 194, 245, .2);

			.inside {
				background: linear-gradient(180deg, #49ccf5, #4988f5);
			}
		}

		;

		.practice {
			border: 6rpx solid rgba(66, 206, 80, 0.2);

			.inside {
				background: linear-gradient(134deg, #54d685, #29c563 99%);
			}
		}

		;

		.left,
		.right {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 208rpx;
			height: 320rpx;

			.son {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 160rpx;
				// height: 50%;
				width: 100%;

				image {
					width: 56rpx;
					height: 56rpx;
				}

				;

				text {
					margin-top: 20rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #333333;
				}

				;
			}
		}

		;
	}

	//题库
	.questionBank {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		width: 750rpx;
		height: 100rpx;
		box-sizing: border-box;
		padding: 0 24rpx;
		background: #ffffff;

		.left,
		.right {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		;

		.left {
			text {
				margin-left: 10rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
			}

			;

			image {
				width: 34rpx;
				height: 31rpx;
			}

			;
		}

		;

		.right {
			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: right;
				color: #999999;
			}

			image {
				margin-top: 4rpx;
				width: 20rpx;
				height: 20rpx;
			}

			;
		}
	}

	//科目二三
	.course23 {
		.box2 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 750rpx;
			height: 100rpx;
			background: #ffffff;
			padding: 24rpx;
			box-sizing: border-box;

			view {
				display: flex;
				align-items: center;

				image {
					width: 34rpx;
					height: 34rpx;
				}

				text {
					margin-left: 14rpx;
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}

			image {
				width: 17rpx;
				height: 17rpx;
			}
		}

		.box3 {
			position: relative;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			width: 750rpx;
			background: #ffffff;

			.mockExam {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 750rpx;
				height: 380rpx;
				background: #ffffff;
				border-bottom: 2rpx solid #ededed;

				.out {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 248rpx;
					height: 248rpx;
					border: 6rpx solid rgba(73, 194, 245, 0.2);
					border-radius: 50%;
					box-sizing: border-box;

					.in {
						width: 214rpx;
						height: 214rpx;
						background: linear-gradient(180deg, #49ccf5, #4988f5);
						border-radius: 50%;
						font-size: 36rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 214rpx;
					}
				}
			}

			.option {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 50%;
				height: 60rpx;
				box-sizing: border-box;
				margin: 10rpx 0;
				border-left: 1rpx solid #ededed;
				border-right: 1rpx solid #ededed;

				image {
					margin-right: 14rpx;
					width: 34rpx;
					height: 34rpx;
				}

				text {
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}

			// &:nth-child(even)::after{
			// 	width: 2rpx;
			// 	height: 60rpx;
			// 	background: #000;
			// }
		}





		.videos {
			display: flex;
			flex-direction: column;
			width: 750rpx;
			margin-top: 20rpx;
			background: #ffffff;

			.title {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 750rpx;
				height: 100rpx;
				padding: 33rpx 24rpx;
				box-sizing: border-box;
				background: #ffffff;

				image {
					margin-right: 14rpx;
					width: 34rpx;
					height: 34rpx;
				}

				text {
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}

			.son {
				position: relative;
				margin-left: 24rpx;
				background-color: #fff;
				// width: 50%;
				height: 140rpx;
				padding: 15rpx 0;
				display: flex;


				.video {
					position: absolute;
					left: 0;
					top: 0;
					width: 250rpx;
					height: 140rpx;
				}

				.son-image {
					position: absolute;
					left: 0;
					top: 0;
					width: 250rpx;
					height: 140rpx;
					background-color: #333333;
				}

				.name {
					position: absolute;
					top: 5rpx;
					left: 270rpx;
					line-height: 28rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}

				.text {
					position: absolute;
					top: 51rpx;
					left: 270rpx;
					line-height: 24rpx;
					font-size: 24rpx;
					width: 380rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;

				}

				.difficulty {
					position: absolute;
					bottom: 35rpx;
					left: 270rpx;
					display: flex;
					align-items: center;

					.t {
						font-size: 20rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #c1c1c1;

					}
				}
			}

		}
	}
</style>