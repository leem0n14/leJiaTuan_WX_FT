<template>
	<view class="list-view">
		<view class="empty" v-if="false">
			<image :src="cdn+'/image/noList/noPintuan.png'" mode="aspectFit"></image>
			<view class="text">
				暂无拼团
			</view>
		</view>
		<view class="container" v-else>
			<view class="item" @click="$win.show(`../pinTuan?id=${1}`)">
				<image class="good-image" src="" mode=""></image>
				<view class="msg">
					<view class="left">
						<view class="name">商品名</view>
						<view class="id">订单号：{{`订单号`}}</view>
					</view>
					<view class="user">
						<image class="user-img" src="" mode="aspectFill"></image>
						<text>拼主</text>
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
				page: 1,
				limit: 10,
			}
		},
		computed:{
			...mapState({
				list:state=>state.goods.pintuanList
			})
		},
		methods: {
			...mapActions({
				getPintuanList_fun: 'goods/getPintuanList'
			}),
			async getPintuanList() {
				let data = {
					page: this.page,
					limit: this.limit,
					userId: this.$db.getSync('userId'),
				}
				await this.getPintuanList_fun(data)
			}
		},
		onReachBottom() {
			this.limit++
			this.getPintuanList()
		},
		onShow() {
			this.getPintuanList()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.list-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.empty {
			margin-top: 200rpx;

			image {
				width: 326rpx;
				height: 174rpx;
			}

			.text {
				margin: 30rpx auto 0;
				width: 112rpx;
				height: 28rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #999999;
				line-height: 28rpx;
			}
		}

		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 702rpx;
			padding: 20px;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10rpx 0;
				width: 690rpx;
				padding: 20rpx 20rpx;
				border-radius: 15rpx;
				box-sizing: border-box;
				background-color: #fff;

				.good-image {
					width: 120rpx;
					height: 120rpx;
					background-color: #999;
				}

				.msg {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					width: 75%;

					.left {
						display: flex;
						flex-direction: column;
						justify-content: space-around;

						.name {
							color: #111;
							font-size: 32rpx;
							font-weight: 600;
							// width: ;
						}

						.id {
							color: #999;
						}
					}

					.user {
						display: flex;
						flex-direction: column;
						align-items: center;

						.user-img {
							background-color: #786733;
							width: 75rpx;
							height: 75rpx;
							border-radius: 50%;
						}

						text {
							text-align: center;
							width: 100rpx;
							font-size: 24rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}


				}
			}
		}
	}
</style>