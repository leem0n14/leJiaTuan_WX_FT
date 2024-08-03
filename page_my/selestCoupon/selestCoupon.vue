<template>
	<div class="coupon-list" to="back">
		<!-- <button @click="get_GetCoupon">获取列表</button> -->
		<!-- <button @click="get_GetCouponDetail">获取列表具体信息</button> -->
		<div v-if="mygoodList&&mygoodList.length===0" style="text-align: center;">(暂无优惠券)</div>
		<div v-else>
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
							{{item.couponBatch.useEndedAt}} 结束
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
				<div class="coupon-buttom"  v-if="!cou[i].onShow">
					<!-- 左内容 -->
					<div class="coupon-buttom-left" @click="changeShow(i)">
						{{item.couponBatch.ruleContent}}</div>
					<!-- 右内容 -->
					<div class="coupon-buttom-right"><button class="coupon-buttom-right" @click="toSwitch(item.couponId,item.couponBatch.amount)">去使用</button></div>
				</div>
				
				<div class="coupon-buttom" v-else>
					<!-- 左内容 -->
					<div class="coupon-buttom-left1" @click="changeShow(i)">
						{{item.couponBatch.ruleContent}}</div>
					<!-- 右内容 -->
					<div class="coupon-buttom-right"><button class="coupon-buttom-right" @click="toSwitch(item.couponId,item.couponBatch.amount)">去使用</button></div>
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
			// this.get_GetCoupon();
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
				postSelectCoupon_fun: 'pay/postSelectCoupon',
			
			}),
			...mapMutations({
				changePrice: 'goods/changePrice',
			
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
			async postSelectCoupon(d,e) {
				let data = {
					couponId:d,
					id:this.order.id,
					amount:e
	
				}
				
				let res = await this.postSelectCoupon_fun(data)
			},
			toSwitch(c,g){
				let d=c
				let gg=String(g)
				//uni.switchTab({ url: '/pages/category/category' });
				this.postSelectCoupon(d,gg)
				// console.log(gg)
				// console.log("上面是couponId和id")
				
			}
		},
		computed: {
			...mapState({
				goodList: state => state.goods.goodList,
				goodListDetail: state => state.goods.goodListDetail,
				mygoodList: state => state.goods.mygoodList,
				selectCoupon: state => state.pay.selectCoupon,
				order: state => state.pay.order,
				price: state => state.pay.price,
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

			margin: 0 20px;
			min-height: 99px;
			border-radius: 8px;
			margin: 12px;
			background-color: #ffffff;
			padding: 19px 10px;

			.coupon-top {
				display: flex;
				flex-direction: row;
				// 横向布局
				justify-content: space-between;

				.coupon-left {

					.coupon-title {

						// height: 18px;
						font-size: 18px;
						font-weight: 500;
						font-family: Source Han Sans CN, Source Han Sans CN-Medium;

					}

					.coupon-time {
						margin-top: 8.5px;
						margin-bottom: 8.5px;
						font-size: 12px;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
					}
				}

				.coupon-right {
					.coupon-sum {
						display: flex;
						color: red;
						margin-top: 10px;
						margin-bottom: 15px;

						// text-align: center;
						.coupon-sum-price {
							font-size: 30px;
							font-family: Source Han Sans CN, Source Han Sans CN-Medium;
							font-weight: 500;
							text-align: center;
							color: #f93030;
							line-height: 14.5px;
						}

					}

					.coupon-contion {
						font-size: 12px;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #f93030;
						line-height: 14.5px;
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
					font-size: 11px;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					color: #999999;
					font-weight: 400;
					line-height: 18px;
					padding-right: 10px;
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
					font-size: 11px;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					color: #999999;
					font-weight: 400;
					line-height: 18px;
					padding-right: 2px;
					 word-wrap:break-word;
				}

				.coupon-buttom-right {
					
					width: 65px;
					height: 26px;
					background: linear-gradient(134deg, #54d685, #29c563 99%);
					border-radius: 13px;

					// width: 65px;
					// height: 26px;

					// text-align: center;
					// font-size: 12px;
					// font-family: Source Han Sans CN, Source Han Sans CN-Regular;

					.coupon-buttom-right {
						// width: 36px;
						// height: 12px;
						padding-top: 5px;
						font-size: 12px;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 14.5px;
					}
				}
			}

			.list-datil {
				display: block;
				font-size: 11px;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				color: #999999;
				font-weight: 400;
				line-height: 18px;
				padding-right: 10px;
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
