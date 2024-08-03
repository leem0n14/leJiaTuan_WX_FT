<!-- 图标管理 -->
<template>
	<view class="body">
		<view class="list" v-for="(item,index) in signList" :key="index"
			@click="$win.show('l1/l1?title='+item.text+`&parentId=${item.id}`)">
			<view class="title">
				<text>{{item.text}}</text>
				<view class="num">
					<!-- <text>{{item.num}}张</text> -->
					<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="content">
				<view class="son" v-for="(k,i) in signList[index].photoList" :key="i">
					<image :src="`${cdn}/sign/${k}`" :key="i" mode="aspectFill"></image>
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
				path: '/image/study/iconManagement',
				lists: [{
						title: '交通标志大全',
						num: 449,
						typeFile: '/trafficSign',
						pic: ['/1.png', '/2.png', '/3.png', '/4.png'],
					}, {
						title: '汽车仪表指示灯',
						num: 25,
						typeFile: '/indicatorLamp',
						pic: ['/1.png', '/2.png', '/3.png', '/4.png'],
					}, {
						title: '车内功能按键',
						num: 8,
						typeFile: '/carKey',
						pic: ['/1.png', '/2.png', '/3.png', '/4.png'],
					}, {
						title: '交警手势',
						num: 26,
						typeFile: '/gesture',
						pic: ['/1.png', '/2.png', '/3.png', '/4.png'],
					},
					{
						title: '交通事故详解',
						num: 26,
						typeFile: '/incident',
						pic: ['/1.png', '/2.png', '/3.png', '/4.png'],
					}
				],
				limit: 10,
				page: 1,
			}
		},
		computed: {
			...mapState({
				signList: state => state.study.signList_1,
			})
		},
		methods: {
			...mapActions({
				getSignList1_fun: 'study/getSignList1',
			}),
			async getSignList(parentId = null) {
				let data = {
					limit: this.limit,
					page: this.page,
					// userId: this.$db.getSync('userId'),
					// level: 1,
					// parentId,
				}
				await this.getSignList1_fun(data)
			}
		},
		onReachBottom() {
			this.page++
			this.getSignList()
		},
		onLoad() {
			this.getSignList()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.body {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;

		.list {
			display: flex;
			flex-direction: column;
			width: 750rpx;
			height: 210rpx;
			background: #ffffff;
			box-sizing: border-box;
			padding: 30rpx 24rpx;
			border: 2rpx solid #f2f3f5;

			.title {
				display: flex;
				justify-content: space-between;
				margin-bottom: 30rpx;

				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}

				;

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

					image {
						width: 17rpx;
						height: 17rpx;
					}
				}
			}

			;

			.content {
				display: flex;

				.son {
					margin-right: 60rpx;
					width: 90rpx;
					height: 90rpx;

					image {
						width: 90rpx;
						height: 90rpx;
					}
				}
			}
		}
	}
</style>