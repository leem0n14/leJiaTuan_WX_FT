<template>
	<view class="index">
		<!-- 定位 -->
		<view class="position">
			<view class="position_left">
				<image :src="cdn+'/icon/location.svg'"></image>
				<view class="content">
					学车城市
				</view>
			</view>

			<view class="position_right">
				<view class="content">
					<picker mode="region" @change="changeCity">
						<view>
							<text>{{myregion}}</text>
							<image src="/static/images/icon/arrow-right-bold.png"></image>
						</view>
					</picker>
				</view>
			</view>
		</view>

		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper-item">
			<block v-for="(k,i) in carousel" :key="k.id">
				<swiper-item>
					<image :src="cdn+'/rotat/'+k.photo" class="pic_size" style="background-color: #e1e1e1;"
						@click="Jump(k.id)"></image>
				</swiper-item>
			</block>
		</swiper>

		<!-- 操作栏operate -->
		<view class="operate">
			<view class="operate_son" v-for="(k,i) in operate_icon" :key="k.id" @click="router(k.id,k.url)">
				<image :src="cdn+k.pic"></image>
				<text>{{k.name}}</text>
			</view>
		</view>

		<!-- 公告栏announcement -->
		<view class="announcement">
			<image :src="cdn+'/icon/announcement.svg'"></image>
			<swiper :autoplay="true" :interval="3000" :duration="1000" :circular="true" vertical="true">
				<swiper-item v-for="(k,i) in announcement" :key="k.id">
					<view>
						<text class="announcement_type">{{k.type}}</text>
						<text class="announcement_content">{{k.announcement}}</text>
					</view>
				</swiper-item>
			</swiper>

			<!-- 	<image :src="cdn+'/icon/announcement.svg'"></image>
			<swiper :autoplay="true" :interval="3000" :duration="1000" :circular="true" vertical="true">
				<swiper-item v-for="(k,i) in announcement" :key="k.id">
					<!-- 		<view>
				<text class="announcement_type">{{k.type}}</text>
				<text class="announcement_content">{{k.announcement}}</text>
			</view>		 -->
			<!-- 成功跳转 -->
			<!-- 		<view>
						<text class="announcement_content" @click="Jump()">篮球赛投票</text>
					</view> -->

			</swiper-item>
			</swiper> -->

		</view>

		<!-- 优惠劵列表 -->

		<view class="coupons">
			<view class="coupons_top">
				<view class="coupons_top_left">
					领劵中心
				</view>
				<view class="coupons_top_right" @tap="toCoupous">
					查看更多>
				</view>
			</view>
			<view class="coupons-wrap">
				<swiper class="swiper1" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item class="swiper_item" v-for="(k,i) in goodList" :key="i">
						<view class="smallBorer">
						</view>
						<view class="smallBorer1">
						</view>
						<!-- 轮播图左半部分 -->

						<view class="swiper-item-left">
							<view class="swiper-item-left-background">
								<view class="swiper-item-left-price">
									<view class="qq">
										￥
									</view>
									<view class="swiper-item-left-price-top">

										{{k.amount}}
									</view>
									<view class="swiper-item-left-price-bottom">
										满{{k.threshold}}可用
									</view>
								</view>
								<view class="swiper-item-left-name">
									<view class="swiper-item-left-name-top">
										{{k.batchName}}
									</view>
									<view class="swiper-item-left-name-bottom">
										{{k.useEndedAt}} 到期
									</view>
								</view>
							</view>
						</view>


						<!-- 轮播图右半部分 -->
						<view class="swiper-item-right-background">
							<view class="swiper-item-right">
								<button class="swiper-item-right-button"
									@click="handleCouponClick(k.batchId)">立即领取</button>
							</view>
						</view>

						<!-- <view class="swiper-item-right" v-else >
							<button 
							class="received" 
							:disabled="isReceived"
							 @click="handleCouponClick()">已领取</button>
						</view> -->

					</swiper-item>

				</swiper>
			</view>
		</view>


		<!-- 特价秒杀purchase -->
		<view class="purchase">
			<view class="pintuan">
				<text class="title">拼团</text>
				<view class="empty-list" v-if="pintuanGoods.length===0">
					暂无拼团
				</view>
				<swiper v-else :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000"
					class="swiper">
					<swiper-item v-for="k in pintuanGoods" :key="k.goodId">
						<view class="swiper-item" @click="$win.show('/page_shopping/shopping?id='+k.goodId)">
							<image :src="cdn+'/goods/'+k.photo" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<view class="miaosha">
				<text class="title">秒杀</text>
				<!-- 倒计时 -->
				<view class="empty-list" v-if="miaoshaGoods.length===0">
					暂无秒杀
				</view>
				<swiper :current="miaoshaTimeIndex" class="countdown" :duration="1000" v-if="miaoshaGoods.length!==0">
					<swiper-item v-for="k in miaoshaGoods" :key="k.goodId">
						<view>
							<uni-countdown :fontSize="16*px" :show-day="timeStamp(k.etime).d!=0"
								:day="timeStamp(k.etime).d" :hour="timeStamp(k.etime).h" :minute="timeStamp(k.etime).m"
								:second="timeStamp(k.etime).s" color="#fff" background-color="#111"></uni-countdown>
						</view>
					</swiper-item>
				</swiper>
				<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" class="swiper"
					@change="miaoshaChange" v-if="miaoshaGoods.length!==0">
					<swiper-item v-for="k in miaoshaGoods" :key="k.goodId">
						<view class="swiper-item" @click="$win.show('/page_shopping/shopping?id='+k.goodId)">
							<image :src="cdn+'/goods/'+k.photo" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 热门模块 -->
		<view class="hot">
			<view class="title">
				<view class="long"></view>
				<view class="content">热门班型</view>
				<view class="long"></view>
			</view>
			<view class="hot_content">
				<view class="hot_son" v-for="(k,i) in hotGoods" :key="k.goodId"
					@click="$win.show('/page_shopping/shopping?id='+k.goodId)">
					<image :src="cdn+'/goods/'+k.photo" mode="aspectFit"></image>
					<view class="price">
						<text>{{k.goodName}}</text>
						<button>立即报名</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 关于乐驾团 -->
		<view class="about">
			<view class="title">
				<view class="long"></view>
				<view class="content">关于乐驾团</view>
				<view class="long"></view>
			</view>
			<navigator url="https://www.lejiatuan.cn">
				<image :src="cdn+'/image/index/aboutLjt/aboutLjt.png'" mode="aspectFit"></image>
			</navigator>
		</view>
	</view>
</template>


<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import QQMapWx from '@/qqmap-wx-jssdk.js'
	import moment from 'moment'
	import {
		login
	} from '../../api/user'
	const qqmapSdk = new QQMapWx({
		key: 'RBNBZ-5QRKD-ZZD42-PEYZU-25XGV-56BIK' // 在腾讯地图上申请的key
	})
	export default {
		data() {
			return {
				miaoshaTimeIndex: 0,
				cdn: this.$conf.CDN_HOST, //图片服务器域名
				//定位
				myregion: '选择省市',
				//秒杀倒计时

				// 功能栏
				operate_icon: [{
						pic: '/image/index/function/invite.svg',
						name: '邀请好友',
						url: '/page_indexOperate/invite/invite',
						id: 1
					},
					{
						pic: '/image/index/function/coach.svg',
						name: '教练团',
						url: '/page_indexOperate/coach/coach',
						id: 2
					},
					{
						pic: '/image/index/function/venue.svg' + '?city=' + this.myregion,
						name: '附近场地',
						url: '/page_indexOperate/venue/venue',
						id: 3
					},
					{
						pic: '/image/index/function/mockExam.svg',
						name: '模拟考试',
						// url: '/page_study/monikaoshi/monikaoshi',
						url: '/pages/study/study',
						id: 4
					},
					{
						pic: '/image/index/function/booking.svg',
						name: '预约练车',
						url: '/page_indexOperate/bookingPractice/bookingPractice',
						id: 5
					},
					{
						pic: '/image/index/function/guide.svg',
						name: '学车指南',
						// url: '/page_indexOperate/guide/guide',
						id: 6
					},
				],
				//优惠劵轮播图

				aa: [{
						bb: 1
					},
					{
						bb: 2
					}
				],
				isReceived: false
			};
		},
		methods: {
			// 
			Jump(Id) {
				console.log(Id, "idssssss")
				if (Id == 8) {
					wx.navigateToMiniProgram({
						shortLink: '#小程序://火投票/QIP63bLfBJfpCOE',
						envVersion: 'release',
						success(res) {
							// 打开成功
							console.log("跳转小程序成功！", res);
						}
					})
				}


			},

			...mapActions({
				getCarousel_fun: 'index/getCarousel',
				getTannouncement_fun: 'index/getTannouncement',
				getMiaosha_fun: 'index/getMiaosha',
				getPintuan_fun: 'index/getPintuan',
				getHotGoods_fun: 'index/getHotGoods',
				getPersonMsg_fun: 'user/getPerson',
			}),
			miaoshaChange(e) {
				// console.log(e.detail.current);	
				this.miaoshaTimeIndex = e.detail.current
			},
			//功能栏跳转
			router(id, url) {
				if (id == 4 && url) {
					uni.switchTab({
						url,
					})
				} else {
					url ? this.$win.show(url) : this.$win.nlog('该功能暂未开放')
				}

			},
			//页面交互和功能
			//城市切串
			changeCity(e) {
				this.myregion = e.detail.value[1].replace('市', '');
			},
			//获取微信定位授权方法
			getAuthorize() {
				uni.authorize({
					scope: 'scope.userLocation',
					success: (res) => {
						this.getLocation()
					},
					fail: (err) => {
						uni.showModal({
							content: '需要授权位置信息',
							confirmText: '确认授权'
						}).then(res => {
							if (res['confirm']) {
								uni.openSetting({
									success: res => {
										if (res.authSetting['scope.userLocation']) {
											uni.showToast({
												title: '授权成功',
												icon: 'none'
											})
										} else {
											uni.showToast({
												title: '授权失败',
												icon: 'none'
											})
										}
										this.getLocation()
									}
								})
							}
							if (res['cancel']) {
								// 取消授权
								this.getLocation()
							}
						})
					}
				})
			},
			//开始获取定位方法(逆解析)
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						//console.log('getFL');
						const {
							latitude,
							longitude
						} = res
						qqmapSdk.reverseGeocoder({
							location: latitude ? `${latitude},${longitude }` : '',
							sig: 'gfOfdUfdyWmTa5FMeFl6AXhXKEUSSYVo', // 这个sig就是上面要准备的第二项SK
							success: (val) => {
								//	console.log('这就是要获取的当前所在城市的相关信息', val)
								this.myregion = val.result.address_component.city.replace('市', '');
								this.$db.setSync('city', this.myregion)
							},
							fail: (err) => {
								this.$win.nlog('获取城市失败')
								//	console.log('获取城市失败')
							}
						})
					},
					fail: (err) => {
						if (err.errMsg === 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF' || err
							.errMsg === 'getLocation:fail system permission denied') {
							uni.showModal({
								content: '请开启手机定位服务',
								showCancel: false
							})
						} else if (err.errMsg === 'getLocation:fail:system permission denied') {
							uni.showModal({
								content: '请给微信开启定位权限',
								showCancel: false
							})
						}
					}
				})
			},
			//秒杀时间转换
			timeStamp(timestamp) {
				let now = new Date().getTime()
				// console.log(now,now-timestamp);
				let t = new Date(timestamp).getTime() - now
				const d = Math.floor(t / (1000 * 60 * 60 * 24));
				const h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
				const s = Math.floor((t % (1000 * 60)) / 1000);
				return {
					d,
					h,
					m,
					s
				}
			},

			//请求
			//获取轮播图
			async getCarousel() {
				let data = {}
				let res = await this.getCarousel_fun(data)
				console.log(data.photo, "resss")
			},
			//获取轮播公告
			async getTannouncement() {
				let data = {}
				let res = await this.getTannouncement_fun(data)
			},
			//获取首页秒杀信息
			async getMiaosha() {
				let data = {}
				let res = await this.getMiaosha_fun(data)
				// this.getCountdown(this.miaoshaGoods.time)
			},
			//获取首页拼团信息
			async getPintuan() {
				let data = {}
				let res = await this.getPintuan_fun(data)
			},
			//获取首页热门商品
			async getHotGoods() {
				let data = {}
				let res = await this.getHotGoods_fun(data)
			},

			// 查看更多跳转
			toCoupous() {
				uni.navigateTo({
					url: '/page_my/coupon/coupon'
				});
				console.log('跳转')
			},

			changeShow(index) {
				// console.log(index);
				this.cou[index].onShow = !this.cou[index].onShow;
				console.log(index + this.goodList[index])
				this.get_GetCouponDetail(this.goodList[index].batchId);
			},
			...mapActions({
				get_GetCoupon_fun: 'goods/getGetCoupon',
				get_GetCouponDetail_fun: 'goods/getGetCouponDetail',
				get_postCouponSave_fun: 'goods/postCouponSave',
			}),
			async get_GetCoupon() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.get_GetCoupon_fun(data)

			},
			async get_postCouponSave(batchId) {
				let data = {
					userId: this.$db.getSync('userId'),
					batchId: batchId
				}
				let res = await this.get_postCouponSave_fun(data)
			},
			handleCouponClick(batchId) {
				// console.log(batchId)
				this.get_postCouponSave(batchId)
			},
			//拿个人信息
			async getPersonMsg() {
				let params = {
					userId: this.$db.getSync('userId'),
				}
				let res = await this.getPersonMsg_fun(params).then(() => {
					// this.name=this.name1
				})

			}
		},
		computed: {
			...mapState({
				carousel: state => state.index.carousel,
				announcement: state => state.index.announcement,
				miaoshaGoods: state => state.index.miaoshaGoods,
				pintuanGoods: state => state.index.pintuanGoods,
				hotGoods: state => state.index.hotGoods,
				goodList: state => state.goods.goodList,
				goodListDetail: state => state.goods.goodListDetail,
				mygoodListReturn: state => state.goods.mygoodListReturn,

			}),
			px() {
				return uni.getWindowInfo().screenWidth / 750
			}
		},

		watch: {},
		onLoad(e) {
			this.$db.setSync('scene', decodeURIComponent(e.scene))
		},

		onShow() {
			this.getAuthorize()
			this.getLocation()
			this.getCarousel()
			this.getTannouncement()
			this.getHotGoods()
			this.getMiaosha()
			this.getPintuan()
			this.get_GetCoupon()
			this.getPersonMsg()
		},

	}
</script>

},

}
</script>

<style lang="scss">
	//轮播图start
	.pic_size {
		width: 750rpx;
		height: 280rpx;
	}

	.swiper-item {
		width: 750rpx;
		height: 280rpx;
	}

	//轮播图end


	//定位start
	.position {
		display: flex;
		align-items: center;
		height: 80rpx;
		background-color: #fff;
		justify-content: space-between;
		padding: 0 24rpx;
	}

	.position_left {
		display: flex;
		align-items: center;
	}

	.position_left .content {
		margin-left: 10rpx;
	}

	.position_left image {
		width: 26rpx;
		height: 34rpx;
	}

	.position_right {
		display: flex;
		align-items: center;

	}

	.position_right picker view {
		display: flex;
		align-items: center;
	}

	.position_right picker image {
		height: 40rpx;
		width: 40rpx;
	}

	.position_right .content {
		font-size: 28rpx;
		color: #29C563;
	}



	//定位end

	//操作栏start
	.operate {
		display: flex;
		flex-wrap: wrap;
		height: 340rpx;
		width: 750rpx;
		background-color: #fff;
	}

	.operate_son {
		display: flex;
		flex-direction: column;
		margin: 30rpx 77rpx 0;
		width: 96rpx;
		height: 120rpx;

	}

	.operate_son image {
		margin: 0 8rpx 8rpx;
		width: 80rpx;
		height: 80rpx;
		background-color: #e1e1e1;
		border-radius: 50%;
		// background-color: orange;
	}

	.operate_son text {
		font-size: 24rpx;
		text-align: center;
	}

	//操作栏end

	// 公告栏start
	.announcement {
		display: flex;
		align-items: center;
		width: 702rpx;
		height: 80rpx;
		background: #f5f5f5;
		border-radius: 16rpx;
		margin: 20rpx 24rpx;
	}

	.announcement swiper {
		margin: 20rpx;
		line-height: 80rpx;
		height: 100%;
		width: 100%;
	}

	.announcement image {
		margin-left: 20rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.announcement swiper text {
		font-size: 28rpx;
		font-family: Alibaba PuHuiTi, Alibaba PuHuiTi-Medium;
		font-weight: 500;
		text-align: left;
	}

	.announcement .announcement_type {}

	.announcement .announcement_content {
		padding: 10rpx;
	}

	//公告栏end




	//优惠劵列表




	.coupons {

		// display: flex;
		// align-items: ;
		// justify-content: center;
		margin: 20rpx 24rpx;

		height: 290rpx;
		// background-color: #29C563;
		background: linear-gradient(133deg, #ec8244 2%, #f55549 99%);

		border-radius: 16rpx;



		.coupons_top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.coupons_top_left {
				margin-top: 24rpx;
				margin-left: 24rpx;
				width: 112rpx;
				// height: 14px;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Bold;
				font-weight: 700;
				// text-align: left;
				color: #ffffff;
				line-height: 20rpx;
			}

			.coupons_top_right {
				margin-top: 24rpx;
				margin-right: 24rpx;
				color: #ffffff;
			}
		}

		.coupons-wrap {

			// background-color: #c7c7c7;
			width: 650rpx;
			height: 170rpx;
			margin: 16rpx 24rpx;


			// border-radius: 8px;
			.swiper1 {
				width: 650rpx;
				height: 172rpx;

				.swiper_item {

					position: relative;

					display: flex;
					align-items: center;
					justify-content: space-between;


					border-radius: 16rpx;
					width: 702rpx;
					background-color: #c7c7c7;
					height: 250rpx;
					// background: url(/static/images/background/index/1.png) no-repeat;

					// 小圆框
					.smallBorer {
						position: absolute;
						top: -20rpx;
						left: 72%;

						height: 41rpx;
						width: 44rpx;

						border-radius: 100%;
						background-color: #c7c7c7;
						;
						z-index: 999;
					}

					.smallBorer1 {
						position: absolute;
						top: 149rpx;
						left: 72%;

						height: 41rpx;
						width: 44rpx;

						border-radius: 100%;
						background-color: #c7c7c7;
						;
						z-index: 999;
					}


					.swiper-item-left {
						background-color: #ffffff;
						width: 75%;
						height: 100%;
						display: flex;
						align-items: center;

						// border-radius:-50%;
						.swiper-item-left-background {
							// background-color: while;
							width: 265rpx;
							height: 87rpx;
							display: flex;
							justify-content: space-between;


							.swiper-item-left-price {
								margin-left: 28rpx;

								.qq {
									display: inline-block;
									color: #f93030;
									// text-align: center;
									margin-top: 30rpx;
									// line-height: 14.5px;
								}

								.swiper-item-left-price-top {
									display: inline-block;
									font-size: 60rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Medium;
									font-weight: 500;
									// text-align: center;
									color: #f93030;
									line-height: 29rpx;


								}

								.swiper-item-left-price-bottom {
									width: 100rpx;
									font-size: 20rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Regular;
									font-weight: 400;
									// text-align: center;
									color: #f93030;
									line-height: 29rpx;
								}
							}

							.swiper-item-left-name {
								// display: flex;
								// align-items: center;
								margin-left: 10rpx;
								margin-top: 10rpx;

								.swiper-item-left-name-top {
									display: inline-block;
									width: 200rpx;
									height: 32rpx;
									font-size: 32rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Medium;
									font-weight: 500;
									text-align: center;
									color: #000000;
									line-height: 29rpx;
								}

								.swiper-item-left-name-bottom {
									margin-top: 17rpx;
									margin-bottom: 17rpx;
									font-size: 20rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Regular;
									font-weight: 400;
									text-align: left;
									color: #999999;
									line-height: 29rpx;
								}
							}
						}

					}

					.swiper-item-right-background {
						display: flex;
						align-items: center;
						width: 25%;
						height: 100%;
						background-color: #ffffff;
						border-left: 1px dashed #c7c7c7;
						box-sizing: border-box;

						// border-radius: 28rpx;
						.swiper-item-right {
							// display: inline-block;



							// margin-top: 25px;
							margin-right: 4rpx;
							margin-top: 20rpx;

							// margin-left: 50;
							// display: flex;
							// align-items: center;
							.swiper-item-right-button {
								display: inline-block;
								width: 145rpx;
								height: 56rpx;

								border-radius: 28rpx;
								background: #EC6744;
								font-size: 20rpx;
								font-family: Source Han Sans CN, Source Han Sans CN-Regular;
								font-weight: 400;
								text-align: center;
								color: #ffffff;
								margin-left: 15rpx;
								// line-height: 10px;
							}
						}

					}

				}

			}
		}

		// .swiper {
		// 	height: 300rpx;
		// }


	}




	// 拼团&秒杀start
	.purchase {
		display: flex;
		justify-content: space-between;
		margin: 0 24rpx 32rpx;
		// background-color: pink;
	}

	.purchase .pintuan,
	.miaosha {
		display: flex;
		flex-direction: column;
		// align-items: center;
		justify-content: space-between;
		position: relative;
		width: 340rpx;
		min-height: 250rpx;
		background: #f5f5f5;
		border-radius: 16rpx;
		box-sizing: border-box;
		padding: 30rpx 24rpx;


		.empty-list {
			border-radius: 10rpx;
			border: 1rpx dashed red;
			box-sizing: border-box;
			background-color: #fff;
			width: 292rpx;
			height: 146rpx;
			line-height: 146rpx;
			text-align: center;
			color: red;
		}

		.swiper {
			width: 292rpx;
			height: 146rpx;
			background-color: pink;
			// swiper-item{
			// 	border-radius: 10rpx;
			// }
		}
	}


	.purchase .pintuan .title,
	.miaosha .title {
		// position: absolute;
		// top: 31rpx;
		// left: 24rpx;
		width: 56rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #111111;
		line-height: 20rpx;
	}

	.purchase .miaosha .countdown {
		// background-color: #29c563;
		position: absolute;
		right: 20rpx;
		z-index: 2;
		display: inline;
		width: 150rpx;
		height: 30rpx;

		.swiper-item {
			display: inline;
		}

		// top: 31rpx;

	}

	.purchase .pintuan image,
	.miaosha image {
		width: 292rpx;
		height: 146rpx;
		// background-color: #54d685;
	}


	// 拼团&秒杀end


	//热门start
	.hot {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 702rpx;
		margin: 0 24rpx 8rpx;
		// background-color: pink;

	}

	.hot .title {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hot .title .content {
		margin: 40rpx 20rpx;
		width: 128rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: center;
		color: #fc6624;
		line-height: 32rpx;
	}


	.hot .title .long {
		width: 125rpx;
		height: 4rpx;
		background: #c7c7c7;
	}

	.hot .hot_content .hot_son {
		// position: relative;
		display: flex;
		flex-direction: column;
		width: 702rpx;
		height: 365rpx;
		// background-color: yellowgreen;
		border-radius: 16px;
		margin-bottom: 40rpx;
	}

	.hot .hot_content .hot_son image {
		width: 702rpx;
		// height: 100%;
		// z-index: -1;
		// background-color: lightgreen;
		border-radius: 16px;
	}

	.hot .hot_content .hot_son .price {
		display: flex;
		justify-content: space-between;
		// position: absolute;
		z-index: 2;
		background-color: #f4f5f7;
		width: 100%;
		height: 120rpx;
		padding: 20rpx;
		box-sizing: border-box;
		bottom: 0rpx;
	}

	.hot .hot_content .hot_son .price text {
		// position: absolute;
		// top: 22rpx;
		// left: 19rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #f93030;
		// background-color: skyblue;
	}

	.hot .hot_content .hot_son .price button {
		margin: 0;
		width: 184rpx;
		height: 60rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 30rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #fff;
	}

	//热门end


	//关于start
	.about {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 702rpx;
		margin: 0 24rpx;
		padding-bottom: 50rpx;
	}

	.about .title {
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.about .title .content {
		margin: 40rpx 20rpx;
		width: 160rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: center;
		color: #111111;
		line-height: 32rpx;
	}

	.about .title .long {
		width: 125rpx;
		height: 4rpx;
		background: #c7c7c7;
	}

	.about image {
		width: 702rpx;
		height: 250rpx;
		// background-color: #29C563;
	}

	.received {
		display: inline-block;
		width: 68px;
		height: 28px;

		border-radius: 14px;
		// background: #EC6744;
		font-size: 10px;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		margin-left: 20px;
		background-color: gray;
		cursor: not-allowed;
	}

	//关于end
</style>