<!-- 场地详细 -->
<template>
	<view>
		<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" changing-class="swiper">
			<swiper-item v-for="(k,i) in msg.schoolPhoto" :key="i">
				<view class="swiper-item" :style="{'background':color[i]}" style="height: 100%;width: 100%;">
					<image :src="cdn+'/school/'+k" mode="aspectFill" style="height: 100%;width: 100%;">
					</image>
				</view>
			</swiper-item>
		</swiper>

		<view class="body">
			<view class="venueName">{{msg.schoolName}}</view>
			<view class="labels">
				<view class="son label1">{{msg.coachNum}}位教练</view>
				<view class="son label2">{{msg.carNum}}辆教练车</view>
			</view>
			<view class="address">
				<view class="right">
					<text style="color: #666666;font-size: 26rpx;">地址：</text>
					<text style="color: #333333;font-size: 28rpx;">{{msg.schoolPlace}}</text>
				</view>
				<view class="left" v-if="false">
					<image :src="cdn+'/image/venue/locationIcon.png'" mode="aspectFill"></image>
					<text style="color: #666666;font-size: 26rpx;text-align: center;">3.64km</text>
				</view>
			</view>
			<view class="box introduction">
				<view class="block"></view>
				<text class="title">简介</text>
				<text class="content" v-text="msg.introduction?msg.introduction:'(暂无)'"></text>
			</view>

		</view>
		<view class="box " style="background: #f0f1f5;">
			<view class="nav">
				<view class="son" v-for="k in nav" @click="navAct(k)">
					<view class="text" :class="k.isAct?'act':'nAct'">{{k.text}}</view>
					<view class="block" v-show="k.isAct"></view>
				</view>
			</view>
			<view class="msgList" v-if="nav[0].isAct">
				<view class="list" v-for="(k,i) in coachs" :key="k.userId">
					<image class="userPic" :src="cdn+'/coach/'+k.coachPhoto" mode="aspectFill"></image>
					<view class="msg">
						<view class="up">
							<view class="name">{{k.coachName}}</view>
							<view class="score">
								<uni-rate :value="k.evaluation" size="23rpx"></uni-rate>
								<view class="num">
									{{k.evaluation}}
								</view>
							</view>
						</view>
						<view class="down">
							<view class="label" v-for="(k,i) in 3" :key="i" :class="labelStyle[i]">
								不抽烟
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="msgList" v-else>
				<!-- <view class="list"></view> -->
				<view class="list" v-for="(k) in sites" :key="k.id">
					<image :src="cdn+'/site/'+k.sitePhoto" mode="" style="background-color: #e0e2ee;" class="schoolPhoto"></image>
					<view class="text">
						<view class="schoolName">{{k.siteName}}</view>
						<view class="address">{{k.place}}</view>
					</view>
				</view>
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
				color: ['#fc011a', '#fed700', '#0883d8'],
				labelStyle: ['label1', 'label2', 'label3'],
				listKey: 0,
				location:null,
				nav: [{
					text: '驾校教练',
					isAct: true,
				}, {
					text: '驾校场地',
					isAct: false,
				}]
			}
		},
		methods: {
			...mapActions({
				getDetail_fun:'venue/getSchoolDetail',
				getVenuePhotoList_fun: 'venue/getVenuePhotoList',
			}),
			navAct(k) {
				for (let i = 0; i < this.nav.length; i++) {
					this.nav[i].isAct = false
				}
				k.isAct = true
			},
			async getDetail(id){
				let data={
					id,
				}
				let res=await this.getDetail_fun(data)
			},
			async getVenuePhotoList(id) {
				let data = {
					id,
				}
				let res = await this.getVenuePhotoList_fun(data)
			},
			//获取当前位置
			async getLocation() {
				uni.getLocation({
					type: 'wgs84',
					altitude: true,
					success: (res) => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude,
							// longitude: res.latitude,
							// latitude: res.longitude,
						}
						console.log('经度：'+res.longitude)
						console.log('纬度：'+res.latitude)
						console.log(JSON.stringify(this.location))
					},
				})
				
			},
		},
		computed:{
			...mapState({
				msg:state=>state.venue.detail,
				sites:state=>state.venue.sites,
				coachs:state=>state.venue.coachs,
				// venuePhotoList: state => state.venue.venuePhotoList,
			})
		},
		onLoad(op) {
			console.log(op);
			this.getDetail(op.id)
			// this.getVenuePhotoList(op.id)
		},
		onShow() {
			// this.getLocation()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.label1 {
		color: #f17516;
		background: #ffecd9;
	}

	.label2 {
		color: #29c563;
		background: #dff9dc;
	}

	.label3 {
		color: #4988f5;
		background: #e1ecff;
	}

	.swpier {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 560rpx;
		// background-color: #000;
	}

	.body {
		display: flex;
		flex-direction: column;
		position: relative;
		top: -30rpx;
		width: 750rpx;
		// height: 2000rpx;
		box-sizing: border-box;
		padding: 50rpx 24rpx;
		// margin: 0 24rpx;
		min-height: 500rpx;
		background: #ffffff;
		border-radius: 30rpx 30rpx 0rpx 0rpx;



		.venueName {
			font-size: 36rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Bold;
			font-weight: 700;
			text-align: left;
			color: #000000;
		}

		.labels {
			display: flex;
			flex-direction: row;
			margin-top: 24rpx;



			.son {
				margin-right: 16rpx;
				// width: 133rpx;
				height: 42rpx;
				line-height: 42rpx;
				padding: 8rpx 14rpx;
				// background: #ffecd9;
				border-radius: 2rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
			}
		}

		.address {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 30rpx 0 60rpx;
			width: 702rpx;
			height: 130rpx;
			box-sizing: border-box;
			padding: 30rpx 24rpx;
			background: #f7f8fa;
			border-radius: 8rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: left;

			.right {
				display: flex;
				flex-direction: column;
				// align-items: center;
				justify-content: space-between;
				height: 100%;
				width: 80vw;

				// background-color: #29c563;
				text {
					max-width: 458rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.left {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				height: 100%;
				width: 20vw;
				border-left: 2rpx solid #e3e3e3;

				// background-color: #f17516;
				image {
					width: 37rpx;
					height: 40rpx;
				}
			}
		}

		.introduction {
			.title {
				margin: 16rpx 0 30rpx;
				width: 64rpx;
				height: 32rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Bold;
				font-weight: 700;
				text-align: left;
				color: #333333;
				line-height: 32rpx;
			}

			.block {
				width: 36rpx;
				height: 6rpx;
				background: #29c563;
			}
		}

	}

	.box {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 30rpx 24rpx;
		border-top: 2rpx solid #f0f1f5;

		.nav {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 702rpx;

			.son {
				display: flex;
				flex-direction: column;
				// justify-content: center;
				align-items: center;
				width: 50%;

				.text {
					text-align: center;
					color: #000000;
				}

				.act {
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					font-weight: 500;
				}

				.nAct {
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					color: #666666;
				}

				.block {
					margin: 12rpx 0 24rpx;
					width: 36rpx;
					height: 6rpx;
					background: #29c563;
				}
			}
		}

		// .content {
		// 	font-size: 30rpx;
		// 	font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		// 	font-weight: 400;
		// 	text-align: left;
		// 	color: #666666;
		// }


		.msgList {
			display: flex;
			flex-direction: column;

			.list {
				display: flex;
				flex-direction: row;
				width: 702rpx;
				// height: 160rpx;
				// padding: 24rpx 0;
				min-height: 160rpx;
				box-sizing: border-box;
				padding: 24rpx;
				background: #ffffff;
				border: 1rpx solid #f0f1f5;
				border-radius: 16rpx;
				margin-bottom: 24rpx;

				.userPic {
					width: 100rpx;
					height: 100rpx;
					background: rgba(0, 0, 0, 0.00);
					border-radius: 50%;
					margin-right: 24rpx;
				}

				.msg {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;

					.up {
						display: flex;
						flex-direction: row;
						justify-content: flex-end;
						margin-bottom: 24rpx;

						.name {
							margin-right: 22rpx;
							font-size: 28rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Medium;
							font-weight: 500;
							text-align: left;
							color: #333333;
						}

						.score {
							display: flex;
							flex-direction: row;
							// justify-content: flex-end;
							align-items: center;

							.num {
								margin-left: 14rpx;
								height: 20rpx;
								line-height: 20rpx;
								font-size: 20rpx;
								font-family: Source Han Sans CN, Source Han Sans CN-Regular;
								font-weight: 400;
								text-align: left;
								color: #666666;
							}
						}
					}

					.down {
						display: flex;
						flex-direction: row;

						.label {
							margin-right: 16rpx;
							width: 97rpx;
							height: 36rpx;
							line-height: 36rpx;
							font-size: 20rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: center;
							// color: #f17516;
							// background: #ffecd9;
							border-radius: 2rpx;
						}
					}
				}

				.schoolPhoto {
					width: 180rpx;
					height: 130rpx;
					border: 1rpx solid #f0f1f5;
					border-radius: 8rpx;
				}

				.text {
					display: flex;
					flex-direction: column;
					justify-content: center;
					height: 130rpx;
					margin-left: 20rpx;

					.schoolName {
						width: 308rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Medium;
						font-weight: 500;
						text-align: left;
						color: #333333;
						line-height: 29rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-bottom: 20rpx;
					}

					.address {
						width: 251rpx;
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #666666;
						line-height: 45rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
</style>
