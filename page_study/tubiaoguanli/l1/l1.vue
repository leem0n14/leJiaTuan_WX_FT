<!-- 图标二级页面 -->
<template>
	<view>
		<view class="body">
			<view class="list" v-for="(item,index) in signList" :key="index" @click="$win.show('l2/l2?id='+item.id)">
				<view class="content">
					<image :src="cdn+`/sign/`+item.photo" mode="aspectFit"></image>
					<text>{{item.text}}</text>
				</view>
				<view class="num">
					<text>{{item.num}}</text>
					<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFill"></image>
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
				// title: '',
				// path:'/image/study/iconManagement/trafficSign',
				lists: [{
						text: '禁止标志',
						num: 50,
						pic: '/2.png',
					},
					{
						text: '警告标志',
						num: 50,
						pic: '/3.png',
					},
					{
						text: '指示标志',
						num: 50,
						pic: '/1.png',
					},
					{
						text: '指路标志',
						num: 63,
						pic: '/5.png',
					},
					{
						text: '旅游区标志',
						num: 78,
						pic: '/7.png',
					},
					{
						text: '道路施工安全标志',
						num: 59,
						pic: '/6.png',
					},
				],
				limit:10,
				page:1,
			}
		},
		computed: {
			...mapState({
				signList: state => state.study.signList_2,
			})
		},
		methods: {
			...mapActions({
				getSignList_fun: 'study/getSignList2',
			}),
			async getSignList(parentId=null) {
				let data = {
					limit:this.limit,
					page:this.page,
					parentId,
				}
				await this.getSignList_fun(data)
			}
		
		},
		onReachBottom() {
			this.page++
			this.getSignList()
		},
		onLoad(option) {
			// console.log(option);
			uni.setNavigationBarTitle({
				title:option.title
			})
			this.getSignList(option.parentId)
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: chartreuse;
	// }
	
	page {
		background-color: #f2f3f5;
	}


	.body {
		display: flex;
		flex-direction: column;
		width: 750rpx;

		.list {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 750rpx;
			height: 140rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			background: #ffffff;

			.content {
				display: flex;
				flex-direction: row;
				align-items: center;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				;

				text {
					margin-left: 20rpx;
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}

			;

			.num {
				display: flex;
				flex-direction: row;
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
					width: 17rpx;
					height: 17rpx;
				}
			}
		}
	}
</style>
