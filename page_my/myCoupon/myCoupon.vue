<template>
	<div class="coupon-list" to="back">
		<!-- <button @click="get_GetCoupon">获取列表</button> -->
		<!-- <button @click="get_GetCouponDetail">获取列表具体信息</button> -->
		<div v-for="(item,i) in  mygoodList" :key="i" class="list">

			<!-- 上内容 -->
			<div class="coupon-top">
				<!-- 左内容 -->
				<div class="coupon-left">
					<!-- 标题 -->
					<div class="coupon-title">
						{{item.couponBatch.batchName}}
					</div>
					<!-- 时间 -->
					<div class="coupon-time">
						{{item.couponBatch.useStartedAt}} 开始
					</div>
					<div class="coupon-time">
						{{item.couponBatch.useEndedAt}} 到期
					</div>
				</div>

				<div class="coupon-right">

					<div class="coupon-sum">
						<!-- 优惠金额 -->
						￥
						<div class="coupon-sum-price">
							{{item.couponBatch.amount}}
						</div>
					</div>

					<!--  -->
					<div class="coupon-contion">
						满{{item.couponBatch.threshold}}可用
					</div>


				</div>

			</div>

			<!-- 分割线 -->
			<o-divider />


			<!-- 下内容 -->
			<div class="coupon-buttom"  v-if="item.bool">
				<!-- 左内容 -->
				<div class="coupon-buttom-left" @click="changeBool(i)">
					{{item.couponBatch.ruleContent}}</div>
				<!-- 右内容 -->
				<div class="coupon-buttom-right"><button class="coupon-buttom-right" @click="toSwitch()">去使用</button></div>
			</div>
			
			<div class="coupon-buttom" v-else>
				<!-- 左内容 -->
				<div class="coupon-buttom-left1" @click="changeBool(i)">
					{{item.couponBatch.ruleContent}}</div>
				<!-- 右内容 -->
				<div class="coupon-buttom-right"><button class="coupon-buttom-right" @click="toSwitch()">去使用</button></div>
			</div>
			
			
			<!-- 详细页面 -->
			<div class="list-datil" v-if="cou[i].onShow">
				<!-- <div></div> -->
				<!-- <div>{{item.list.ruleContent}}</div> -->
				<!-- <div>限部分参商品</div>
				<div>限登录和收餐手机号使用</div> -->
			</div>
		</div>


	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
import {
		mapActions,mapState
		} from 'vuex'
	export default {
		data() {
			return {
				cou: [{
						title: "9元优惠卷",
						onShow:false
					},
					{
						title: "10元优惠卷",
						onShow:false
					},
					{
						title: "11元优惠卷",
						onShow:false
					},
				],
				
			}
		},
		onShow() {
			this.get_GetCoupon();
			this.get_GetMyCoupon();
			
		},
		methods:{
			 changeShow(index) {
				// console.log(index);
				this.cou[index].onShow=!this.cou[index].onShow;
				console.log(index+this.goodList[index])
				 this.get_GetCouponDetail(this.goodList[index].batchId);
			},
			...mapActions({
				get_GetCoupon_fun: 'goods/getGetCoupon',
				get_GetCouponDetail_fun: 'goods/getGetCouponDetail',
				get_GetMyCoupon_fun: 'goods/getGetMyCoupon',
			}),
			...mapMutations({
				changeBool: 'goods/changeBool',
			}),
			async get_GetCoupon() {
				let data = {
					userId:this.$db.getSync('userId')
				}
				
				let res = await this.get_GetCoupon_fun(data)
				
			},
			async get_GetCouponDetail(batchId) {
				let data = {
					batchId,
				}
				let res = await this.get_GetCouponDetail_fun(data)
			},
			async get_GetMyCoupon() {
				let data = {
					userId:this.$db.getSync('userId')
				}
				
				let res = await this.get_GetMyCoupon_fun(data)
			},
			toSwitch(){
				uni.switchTab({ url: '/pages/category/category' });
			}
		},
		computed: {
			...mapState({
				goodList: state => state.goods.goodList,
				goodListDetail: state => state.goods.goodListDetail,
				mygoodList: state => state.goods.mygoodList,
			})
		},
	}
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}





	.coupon-list {
		.list {
			display: flex;
			// 纵向布局
			flex-direction: column;

			margin: 0 40rpx;
			min-height: 198rpx;
			border-radius: 16rpx;
			margin: 24rpx;
			background-color: #ffffff;
			    padding: 20rpx 30rpx;

			.coupon-top {
				display: flex;
				flex-direction: row;
				// 横向布局
				justify-content: space-between;

				.coupon-left {

					.coupon-title {

						// height: 18px;
						    font-size: 41rpx;
						font-weight: 500;
						font-family: Source Han Sans CN, Source Han Sans CN-Medium;

					}

					.coupon-time {
						margin-top: 17rpx;
						margin-bottom: 17rpx;
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
					}
				}

				.coupon-right {
					.coupon-sum {
						display: flex;
						color: red;
						margin-top: 20rpx;
						margin-bottom: 30rpx;

						// text-align: center;
						.coupon-sum-price {
							    font-size: 72rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Medium;
							font-weight: 500;
							text-align: center;
							color: #f93030;
							line-height: 29rpx;
						}

					}

					.coupon-contion {
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #f93030;
						line-height: 29rpx;
					}
				}
			}

			// .list-fenge
			// {
			// 	// border-width:1px;
			// 	height: 1px;
			// 	border:10px soild #0000FF;
			// 	background-color: black;
			// }


			.coupon-buttom {
				display: flex;
				justify-content: space-between;
				// align-items: center;

				.coupon-buttom-left {
					font-size: 22rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					color: #999999;
					font-weight: 400;
					line-height: 36rpx;
					padding-right: 20rpx;
					// text-align: center;
					// （不换行）
					white-space: nowrap;
					// (省略号）
					text-overflow: ellipsis;
					// （多余部分隐藏）
					overflow: hidden;
				}

				.coupon-buttom-left1 {
					// width: 63%;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					color: #999999;
					font-weight: 400;
					line-height: 36rpx;
					padding-right: 4rpx;
					 word-wrap:break-word;
				}

				.coupon-buttom-right {
					
					width: 146rpx;
					height: 52rpx;
					background: linear-gradient(134deg, #54d685, #29c563 99%);
					border-radius: 26rpx;

					// width: 65px;
					// height: 26px;

					// text-align: center;
					// font-size: 12px;
					// font-family: Source Han Sans CN, Source Han Sans CN-Regular;

					.coupon-buttom-right {
						// width: 36px;
						// height: 12px;
						padding-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 29rpx;
					}
				}
			}

			.list-datil {
				display: block;
				font-size: 22rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				color: #999999;
				font-weight: 400;
				line-height: 36rpx;
				padding-right: 20rpx;
				// text-align: center;
				// // （不换行）
				// white-space: nowrap;
				// // (省略号）
				// text-overflow: ellipsis;
				// // （多余部分隐藏）
				// overflow: hidden;
			}
		}

	}
</style>
