<!-- 学员管理 -->
<template>
	<view>
		<!-- <button >学员详细</button> -->
		<!-- 头部 -->
		<view class="hd">
			<image :src="cdn+'/coachSection/background/studentNum.png'" mode="aspectFill" class="bg"></image>
			<view class="studentNum">
				<text class="text" style="opacity: 0.6;">学员数量</text>
				<text class="num"
					style="font-size: 60rpx;margin-top: 20rpx;font-weight: 700;">{{stuList.totalCount? stuList.totalCount:''}}</text>
			</view>
			<view class="historyStudent">
				<image :src="cdn+'/icon/countdown.svg'" mode="aspectFill"></image>
				<text>历史学员</text>
			</view>
		</view>
		<!-- 主体 -->
		<view class="bd">
			<view class="searchBar">
				<uni-search-bar v-model="studentName" placeholder="搜索学员姓名" @confirm="searchStudent" />

			</view>
			<view class="nav">
				<view class="son" v-for="(k,i) in navList" :key="i" @click="navAct(k)">
					<text
						:style="{'color':k.isAct?'#111111':'#999999','fontSize':k.isAct?'34rpx':'30rpx','fontWeight':k.isAct?'700':'400'}">{{k.text}}
					</text>
					<view class="redCircle" v-show="i!=0&&haveNew"></view>
					<view class="bottom" v-show="k.isAct"></view>
				</view>
			</view>
			<view class="ul" v-if="stuList.list&&stuList.list.length!=0">
				<view class="list" v-for="(item,index) in stuList.list" :key="index">
					<view class="box1">
						<view class="left">
							<image class="userPic" :src="cdn+'/student/'+item.photo" mode="aspectFill"></image>
							<view class="text">
								<text class="name">{{item.stuName}}</text>
								<text class="phone">{{item.stuPhone}}</text>
							</view>
						</view>
						<view class="right">
							<!-- <view class="change">
								<image :src="cdn+'/icon/changeCoach'+(isChanging?'/changing.svg':'/change.svg')"
									mode="aspectFill"></image>
								<text :style="{'color':isChanging?'#4988F5':''}">更换教练</text>
							</view> -->
							<view class="progress">
								<text class="course"
									style="color: #333333;">考试进度：{{backProgress(item.progress,0)?backProgress(item.progress,0):'无进度'}}</text>
								<text class="state" style="color: #FFBB1E;"
									v-if="backProgress(item.progress,0)">{{backProgress(item.progress,1)}}</text>
							</view>
						</view>
					</view>

					<!-- @click="$win.show('/pages/my/studyProgress/studyProgress?type=1')" -->
					<view class="box2">
						<view class="title">
							<view>学车进度</view>
							<view class="getDetail"
								@click="this.$win.show('studentDetail/studentDetail?stuId='+item.stuId)">
								查看
							</view>
						</view>
						<view class="progressBars">
							<view class="son" v-for="(k,i) in 4" :key="i"
								@click="i==1? detail(stuList.list[index].driveProjectList):''">
								<view class="bar" v-if="(i+1)*10>=stuList.list[index].progress">
									<!-- <qiun-data-charts type="arcbar" :opts="opts" :chartData="k" :reshow="true" /> -->
									<!-- <text>{{stuList.list[index].progress}}</text> -->
									<view class="circle">
										<text class="num">{{stuList.list[index].progress/10===(i+1)?'学习中':'未开启'}}</text>
									</view>

								</view>
								<view class="finished" v-else>
									<view class="border">
										<icon type="success" size="62rpx" color="#38cb6f" class="icon" />
									</view>
								</view>
								<text>{{backProgress((i+1)*10,0)}}</text>
								<view class="line" v-show="i!=3"
									:style="{'background':stuList.list[index].progress/10>(i+1)?'linear-gradient(134deg,#54d685, #29c563 99%)':''}">
								</view>
							</view>
						</view>
					</view>
					<view class="box3" v-if="false">
						<button class="reject" @click="alert()">拒绝接收</button>
						<button class="accept" @click="alert()">接收学员</button>
					</view>
				</view>
				<uni-pagination :current="pageIndex" :total="stuList.totalCount" title="标题文字" :show-icon="true"
					@change="changePage" />
			</view>
			<view class="noStudents" v-else>
				<image :src="cdn+'/image/noList/noStudent.png'" mode="aspectFill"></image>
				<text>暂无学员</text>
			</view>


		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				haveStudents: false,
				haveNew: true,
				queryType: 0, //0普通，1新
				isChanging: false,
				navList: [{
						text: '我的学员',
						isAct: true,
					},
					{
						text: '新学员',
						isAct: false,
					}
				],
				// 进度条数据
				chartData: [{
						series: [{
							name: "科目一",
							data: 1,
						}]
					},
					{
						series: [{
							name: "科目二",
							data: 0.26,
						}]
					},
					{
						series: [{
							name: "科目三",
							data: -1,
						}]
					},
					{
						series: [{
							name: "科目四",
							data: -1,
						}]
					}
				],
				// 进度条样式
				opts: {
					extra: {
						arcbar: {
							type: "circle",
							width: null, //进度条宽度
						}
					},
				},
				totalCount: 0,
				pageIndex: 1,
				studentName: '',
			}
		},
		methods: {
			...mapActions({
				getList_fun: 'coachSection/studentManage',
			}),
			detail(e) {
				let char = ''

				if (e) {
					for (let i = 0; i < e.length; i++) {
						char += e[i].project + "\n"
					}
					console.log(char);
					this.$win.nlog(char)
				}
			},
			searchStudent() {
				console.log(this.studentName)
				this.getStudentList(this.studentName)
			},
			backProgress(e, type) {
				// type(0,1),类型：0科目，1（待考或依靠）
				let val1 = e / 10
				let val2 = e % 10
				let c = null //返回的字符
				if (type) {
					if (val2 == 0) {
						c = '(待考)'
					} else if (val2 == 1) {
						c = '(完成)'
					} else {
						c = '(数据错误)'
					}
				} else {
					if (val1 == 1) {
						c = '科目一'
					} else if (val1 == 2) {
						c = '科目二'
					} else if (val1 == 3) {
						c = '科目三'
					} else if (val1 == 4) {
						c = '科目四'
					}
				}


				return c
			},
			async getStudentList(name) {
				console.log(this.pageIndex, "page")
				let data = {
					userId: this.$db.getSync('userId'),
					page: this.pageIndex.toString(),
					limit: '10',
					searchKey: name
				}
				console.log(data)
				let res = await this.getList_fun(data)
			},
			navAct(k) {
				for (let a = 0; a < this.navList.length; a++) {
					this.navList[a].isAct = false
				}
				k.isAct = true
			},
			changePage(e) {
				this.pageIndex = e.current
				this.getStudentList()
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},

			toPX() {
				//根据用户设备屏幕大小设置宽度
				this.px = uni.getWindowInfo().screenWidth / 750
				this.opts.extra.arcbar.width = 6 * this.px
			},
			show() {
				uni.navigateTo({
					url: ''
				})
			},
			alert() {
				this.$win.nlog('信息..')
			}
		},
		computed: {
			...mapState({
				stuList: state => state.coachSection.stuList,
			})
		},
		onLoad() {
			this.toPX()

		},
		onShow(option) {
			this.getStudentList()
			console.log(this.stuList, stuList.totalCount, "222222222222222222")
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.hd {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		position: relative;
		width: 750rpx;
		height: 210rpx;
		padding: 45rpx 30rpx;
		box-sizing: border-box;

		.bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 750rpx;
			height: 210rpx;
			// background: #3dcd73;
			z-index: -2;
		}

		text {
			color: #fff;
			font-size: 30rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: left;
		}

		.studentNum {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.historyStudent {
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				margin-right: 5rpx;
				width: 30rpx;
				height: 30rpx;
				// background: #ffffff;
			}
		}
	}

	.bd {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;

		.searchBar {
			height: 120rpx;
			width: 100%;
			background-color: white;
		}

		.nav {
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			width: 100%;
			height: 120rpx;

			.son {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin: 0 30rpx;

				.redCircle {
					position: absolute;
					top: 0rpx;
					right: -8rpx;
					width: 12rpx;
					height: 12rpx;
					background: #f93030;
					border-radius: 50%;
				}

				.bottom {
					position: absolute;
					bottom: -16rpx;
					width: 62rpx;
					height: 6rpx;
					background: #29c563;
				}


			}
		}

		.ul {
			display: flex;
			flex-direction: column;
			align-items: center;

			.list {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 750rpx;
				max-height: 450rpx;
				background: #ffffff;
				margin-bottom: 20rpx;
				box-sizing: border-box;
				padding: 30rpx;

				.box1 {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					width: 100%;

					.left {
						display: flex;
						flex-direction: row;

						image {
							width: 96rpx;
							height: 96rpx;
							background: skyblue;
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

						.progress {
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

				.box2 {
					display: flex;
					flex-direction: column;
					width: 690rpx;
					height: 250rpx;
					margin: 30rpx 0;
					background: #ffffff;
					border: 2rpx solid #f2f3f5;
					border-radius: 16rpx;

					.title {
						display: flex;
						align-items: center;
						justify-content: space-between;
						box-sizing: border-box;
						padding: 30rpx;
						width: 100%;
						font-size: 30rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #333333;

						.getDetail {
							color: #2dc666;
						}
					}

					.progressBars {
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						height: 150rpx;

						// background-color: skyblue;
						.son {
							position: relative;
							display: flex;
							flex-direction: column;
							align-items: center;
							// justify-content: center;

							.bar {
								position: relative;
								// top: 14rpx;
								// left: 0rpx;
								width: 100rpx;
								height: 100rpx;
								display: flex;
								align-items: center;

								.circle {
									position: relative;
									top: 0rpx;
									left: 11rpx;
									width: 84rpx;
									height: 84rpx;
									box-sizing: border-box;
									border: 6rpx solid #b5ebc5;
									border-radius: 50%;
								}

								// background-color: #ffffff;
								text {
									position: absolute;
									top: 23rpx;
									left: 0;
									width: 100%;
									font-size: 24rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Bold;
									font-weight: 400;
									text-align: center;
									color: #29c563;
								}
							}

							.finished {
								display: flex;
								align-items: center;
								justify-content: center;
								width: 100rpx;
								height: 100rpx;
								background-color: #fff;

								.border {
									display: flex;
									align-items: center;
									justify-content: center;
									width: 84rpx;
									height: 84rpx;
									box-sizing: border-box;
									border: 6rpx solid #b5ebc5;
									border-radius: 50%;
								}
							}

							.text {
								font-size: 24rpx;
								font-family: Source Han Sans CN, Source Han Sans CN-Regular;
								font-weight: 400;
								text-align: center;
								color: #333333;
							}

							.line {
								position: absolute;
								top: 49rpx;
								right: -68rpx;
								width: 60rpx;
								height: 4rpx;
								background: #ededed;
								border-radius: 2rpx;
							}
						}
					}
				}

				.box3 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					margin-top: 10rpx;

					button {
						height: 64rpx;
						line-height: 64rpx;
						border-radius: 34rpx;
						font-size: 26rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
					}

					.accept {
						width: 390rpx;
						background: #ffffff;
						border: 2rpx solid #29c563;
						color: #29c563;
					}

					.reject {
						width: 280rpx;
						background: #ffffff;
						border: 2rpx solid #e3e3e3;
						color: #666666;
					}
				}
			}

		}

		.noStudents {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 247rpx;

			image {
				margin-bottom: 30rpx;
				width: 326rpx;
				height: 167rpx;
				// background-color: pink;
			}

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #999999;
			}
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 99;
	}
</style>