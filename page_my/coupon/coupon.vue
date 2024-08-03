<template>
	<!-- 优惠劵列表 -->
	<view class="_root">
		<view class="coupons-wrap" v-for="(k,i) in goodList" :key="i">
			<view class="swiper1">
				<view class="swiper_item">
					<view class="smallBorer">
					</view>
					<view class="smallBorer1">
					</view>
					<view class="swiper-item-left-backround">
						<view class="swiper-item-left">
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
					<view class="swiper-item-right-backround">
						<view class="swiper-item-right">
							<button class="swiper-item-right-button" @click="handleCouponClick(k.batchId)">立即领取</button>
						</view>
						
					</view>
					<!-- <view class="swiper-item-right" v-else >
							<button 
							class="received" 
							:disabled="isReceived"
							 @click="handleCouponClick(k.batchId)">已领取</button>
						</view> -->
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
				cou: [{
						id: 4
					},
					{
						id: 5
					}
				],
				coupons: [{
						id: 1,
						name: '优惠券1',
						isReceived: false
					},
					{
						id: 2,
						name: '优惠券2',
						isReceived: true
					},
					{
						id: 3,
						name: '优惠券3',
						isReceived: false
					},
				],
				isReceived: false
			}

		},
		onShow() {
			this.get_GetCoupon();
		},
		methods: {
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
			async get_GetCouponDetail(batchId) {
				let data = {
					batchId,
				}
				let res = await this.get_GetCouponDetail_fun(data)
			},
			async get_postCouponSave(batchId) {
				let data = {
					userId: this.$db.getSync('userId'),
					batchId
				}
				let res = await this.get_postCouponSave_fun(data)
			},
			handleCouponClick(batchId) {
				//   if (this.isReceived) {
				// console.log(this.isReceived)
				//     return;
				//   }
				// console.log(this.isReceived)
				// this.isReceived = true;
				this.get_postCouponSave(batchId)
			},
		},
		computed: {
			...mapState({
				goodList: state => state.goods.goodList,
				goodListDetail: state => state.goods.goodListDetail,
				mygoodListReturn: state => state.goods.mygoodListReturn,
			})
		},
	}
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}





	//优惠劵列表


	._root {
		.coupons-wrap {
			// display: flex;
			// background-color: #c7c7c7;
			// height: 100%;
			margin: 16rpx 20rpx;

			// margin-right: 0px;
			// border-radius: 8px;
			.swiper1 {
				// display: flex;
				width: 600rpx;
				height: 180rpx;

				.swiper_item {
					display: flex;
					margin: 16rpx;
					margin-bottom: 16rpx;
					// display: flex;
					align-items: center;
					justify-content: space-between;

					width: 686rpx;
					height: 173rpx;
					border-radius: 8rpx;
					// width: 351px;
					background-color: #c7c7c7;
					// height: 125px;
					// background: url(/static/images/background/index/1.png) no-repeat;
					position: relative;
					overflow: hidden;

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

					.swiper-item-left-backround {
						display: flex;
						align-items: center;
						width: 75%;
						height: 100%;
						background-color: #ffffff;

						.swiper-item-left {
							width: 265rpx;
							height: 87rpx;
							display: flex;
							justify-content: space-between;

							.swiper-item-left-price {
								margin-left: 20rpx;

								.qq {
									display: inline-block;
									color: #f93030;
									// text-align: center;
									margin-top: 25rpx;
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
								margin-left: 5rpx;
								margin-top: 5rpx;

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
									width: 238px;
									margin-top: 17rpx;
									margin-bottom: 17rpx;
									font-size: 24rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Regular;
									font-weight: 400;
									text-align: left;
									color: #999999;
									line-height: 29rpx;
								}
							}
						}

					}

					.swiper-item-right-backround {
						display: flex;
						align-items: center;
						width: 25%;
						height: 100%;
						background-color: #ffffff;
						border-left:1px dashed #c7c7c7;
						.swiper-item-right {

							// display: inline-block;



							// margin-top: 25px;
							margin-right: 30rpx;
							margin-top: 20rpx;

							// margin-left: 50;
							// display: flex;
							// align-items: center;
							.swiper-item-right-button {
								display: inline-block;
								width: 153rpx;
								height: 56rpx;

								border-radius: 28rpx;
								background: #EC6744;
								font-size: 24rpx;
								font-family: Source Han Sans CN, Source Han Sans CN-Regular;
								font-weight: 400;
								text-align: center;
								color: #ffffff;
								margin-left: 17rpx;
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
</style>