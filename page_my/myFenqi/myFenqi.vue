<!-- 我的分期 -->
<template>
	<view>
		<view class="noFenqi" v-if="!haveFenqi">
			<image :src="cdn+'/image/noList/noFen.png'" mode="aspectFill"></image>
			<view class="text">暂无分期</view>
		</view>
		<!-- 分期内容 -->
		<view class="content" v-if="haveFenqi">
			<image :src="cdn+path+fenqiData.pic" mode="aspectFill"></image>
			<view class="name">{{fenqiData.name}}</view>
			<view class="price">￥{{fenqiData.price}}</view>
			<view class="stages">{{fenqiData.stagesMsg}}</view>
		</view>
		<!-- 分期记录 -->
		<view class="record"  v-if="haveFenqi">
			<view class="text">
				还款记录
			</view>
			<view class="lastTime msg">{{record.lastTime}}</view>
			<view class="once msg">每期应还：{{record.once}}</view>
			<view class="returned msg">已经还{{record.returned}}期</view>
			<view class="remaining msg">剩余{{record.remaining}}期</view>
		</view>
		<button class="hkBtn"  v-if="haveFenqi">还款</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				haveFenqi: false,
				path:'/image/goods/common',
				fenqiData:{
					pic:'/goods_2.png',
					name:'专车空调全包班',
					price:12000,
					stagesMsg:'分3期（0手续费）,￥4000.00/期',
					id:1
				},
				record:{
					lastTime:'每月1号',
					once:'￥4000.00',
					returned:0,
					remaining:6,
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	
	// image{
	// 	background-color: #29c563;
	// }
	page {
		background-color: #f2f3f5;
	}

	/* 没有分期时显示start */
	.noFenqi {
		position: relative;
		top: 290rpx;
		left: 212rpx;
		width: 326rpx;
		height: 174rpx;
	}

	.noFenqi image {
		width: 326rpx;
		height: 174rpx;
	}

	.noFenqi .text {
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

	/* 没有分期时显示end */


	/* 分期内容start */
	.content {
		position: relative;
		width: 750rpx;
		height: 240rpx;
		background: #ffffff;
	}

	.content image {
		position: absolute;
		width: 180rpx;
		height: 180rpx;
		top: 30rpx;
		left: 30rpx;
		background-color: pink;
	}

	.content .name {
		position: absolute;
		top: 50rpx;
		left: 240rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #333333;
		line-height: 32rpx;
	}

	.content .price {
		position: absolute;
		top: 99rpx;
		left: 240rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #f93030;
		line-height: 40rpx;
	}

	.content .stages {
		position: absolute;
		top: 165rpx;
		left: 240rpx;
		height: 26rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 24rpx;
	}

	/* 还款记录start */
	.record {
		position: relative;
		
		margin-top: 20rpx;
		width: 750rpx;
		height: 220rpx;
		background: #ffffff;
	}

	.record .text {
		position: absolute;
		top: 43rpx;
		left: 30rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #333333;
		line-height: 28rpx;
	}


	.msg {
		position: absolute;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 28rpx;
	}

	.record .lastTime {
		top: 101rpx;
		left: 30rpx;
	}

	.record .once {
		top: 101rpx;
		left: 395rpx;
	}

	.record .returned {
		top: 153rpx;
		left: 30rpx;
	}

	.record .remaining {
		top: 153rpx;
		left: 395rpx;
		color: #F93030;
	}

	/* 还款记录end */

	/* 分期内容end */
	/* 还款按钮start */
	.hkBtn {
		margin-top: 100rpx;
		width: 580rpx;
		height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 90rpx;
	}

	/* 还款按钮end */
</style>
