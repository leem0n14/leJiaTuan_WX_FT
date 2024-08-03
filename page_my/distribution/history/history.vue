<!-- 历史收入 -->
<template>
	<view>
		<view class="hd">
			<image :src="cdn+path+'/historyIncome.png'" mode="aspectFit"></image>
			<view class="text">
				历史收益：<text style="color: #F93030;font-weight: bold;">1600.00元</text>
			</view>
		</view>
		<view class="bd">
			<view class="title">
				<view></view>
				资产明细
				<view></view>
			</view>
			<view class="box">
				<view class="son" v-for="(k,i) in list">
					<view class="up">
						<text>{{k.name}}</text>
						<text style="color: #F93030;font-weight: Medium;">＋{{k.income.toFixed(2)}}元</text>
					</view>
					<view class="down">
						<text>{{levelArr[k.level-1]}}</text>
						<text>{{k.time}}</text>
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
				path: '/background/fenxiao',
				levelArr: ['一级分销金', '二级分销金', '三级分销金'],
				list: [{
					name: '李先生',
					income: 10,
					level: 3,
					time: '2018-12-21',
				}, {
					name: '李先生',
					income: 58,
					level: 3,
					time: '2018-12-21',
				}, {
					name: '李先生',
					income: 144,
					level: 2,
					time: '2018-12-21',
				}, {
					name: '李先生',
					income: 10,
					level: 1,
					time: '2018-12-21',
				}, ]
			}
		},
		methods: {
			...mapActions({
				getHistory_fun: 'fenxiao/getHistory'
			}),
			async getHistory() {
				let data = {}
				let res = await this.getHistory_fun(data)
			}
		},
		computed: {
			...mapState({
				historyList: state => state.fenxiao.historyList
			})
		},
		onShow() {

		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #3c9cff;
	// }


	/* 上半start */
	.hd {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 300rpx;
		background: #ffffff;
		border-bottom: 20rpx solid #f2f3f5;
	}

	.hd image {
		width: 161rpx;
		height: 141rpx;
	}

	.hd .text {
		margin-top: 24rpx;
		height: 34rpx;
		font-size: 34rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 34rpx;
	}

	/* 上半end */

	/* 下半start */
	.bd {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bd .title {
		display: flex;
		align-items: center;
		margin: 22rpx 0;
		height: 26rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 26rpx;
	}

	.bd .title view {
		margin: 0 10rpx;
		width: 130rpx;
		height: 2rpx;
		background: #c7c7c7;
	}

	.bd .box {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		max-height: 720rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		overflow-y: auto;
	}

	.bd .box .son {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 690rpx;
		height: 120rpx;
		min-height: 120rpx;
		background: #ffffff;
		border-bottom: 2rpx solid #ededed;
	}

	.bd .box .son .up,
	.bd .box .son .down {
		display: flex;
		justify-content: space-between;
	}

	.bd .box .son .up {
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 28rpx;
	}

	.bd .box .son .down {
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #999999;
		line-height: 24rpx;
	}

	/* 下半end */
</style>
