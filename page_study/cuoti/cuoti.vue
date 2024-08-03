<!-- 我的错题 -->
<template>
	<view>
		<view class="hd">
			<view class="box">
				<image class="bg" :src="cdn+'/background/mistakeBackground.png'" mode="aspectFill"></image>
				<view class="msg">
					<view class="title">
						<image :src="cdn+'/icon/study/myCuoti.svg'" mode="aspectFill"></image>
						<text>我的错题{{courseCode==1?'(科目一)':'(科目四)'}}</text>
					</view>
					<text>{{msg.result.sum}}</text>
				</view>
			</view>
		</view>
		<view class="bd">
			<view class="list" v-for="(k,i) in msg.result.mistake1Entities" @click="toDetail(k.qusetionId)">
				<text>{{k.qusetionId}}</text>
				<text class="list-content">
					{{k.titleInformation}}
				</text>
				<view class="num">
					<text>{{k.num}}</text>
					<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="bottom" v-show="false">
			<text>答对后自动移除错题集</text>
			<switch checked="true" @change="move" color="#29c563" style="transform:scale(0.7)" />
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
				courseCode: null,
				
				//总数
				// sum: 0,
				//是否移出错题
				isMove: true,
				lists: [{
						text: '道路交通安全法律、法规和规章',
						num: 23,
					},
					{
						text: '安全行车、文明驾驶基础知识',
						num: 0,
					},
					{
						text: '机动车驾驶操作相关基础知识',
						num: 3,
					},
					{
						text: '交通信号',
						num: 12,
					}
				]
			}
		},
		methods: {
			...mapActions({
				getMis_fun: 'study/seeMis'
			}),
			move() {
				this.isMove = !this.isMove
				console.log('111')
			},

			async getMis() {
				let data = {
					userId: this.$db.getSync('userId'),
					courseCode:this.courseCode
				}
				let res = await this.getMis_fun(data)
			},
			toDetail(e) {
				console.log(e, 'lll');
				this.$win.show('/page_study/lianti/lianti?questionId=' + e + '&type=' + '我的错题'+'&courseCode='+this.courseCode)
				// encodeURIComponent(JSON.stringify(this.examqk)))
			}
		},
		computed: {
			...mapState({
				msg: state => state.study.mistakeMsg
			})
		},
		onLoad(e) {
			// console.log(e,'/');
			this.courseCode = e.courseCode
		},
		onShow() {
			this.getMis()
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #d1894e;
	// }
	page {
		background-color: #f2f3f5;
	}

	.hd {
		width: 750rpx;
		padding: 30rpx 24rpx;
		background-color: #ffffff;

		.box {
			position: relative;
			width: 702rpx;
			height: 271rpx;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 702rpx;
				height: 271rpx;
			}

			;

			.msg {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				position: absolute;
				left: 0;
				right: 0;
				width: 702rpx;
				height: 271rpx;
				z-index: 2;

				.title {
					display: flex;
					align-items: center;
					margin-left: 40rpx;

					image {
						width: 33rpx;
						height: 35rpx;
						opacity: 0.58;
					}

					;

					text {
						margin-left: 20rpx;
						font-size: 32rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #ffffff;
					}
				}

				;

				text {
					margin-left: 93rpx;
					font-size: 91rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: left;
					color: #ffffff;
				}
			}

		}
	}

	.bd {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ffffff;
		width: 750rpx;
		padding: 26rpx 0;
		box-sizing: border-box;

		.list {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 90rpx;
			width: 704rpx;
			box-sizing: border-box;
			margin: 0 5rpx;

			// line-height: 5rpx;
			text {
				max-width: 500rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				overflow: hiddden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 20rpx;
			}

			.list-content {
				// max-width: 501rpx;
				overflow: hidden;
				white-space: nowrap;
				// line-height: 10rpx;
				// background-color: #f2f3f5;
				text-overflow: ellipsis;
				min-width: 589rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
			}

			.num {
				display: flex;
				align-items: center;

				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #c1c1c1;
				}

				;

				image {
					margin: 0 0 0 10rpx;
					width: 17rpx;
					height: 17rpx;
				}
			}
		}
	}

	.bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 100rpx;
		margin-top: 20rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		background: #ffffff;

		text {
			font-size: 32rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
		}

		;

	}
</style>