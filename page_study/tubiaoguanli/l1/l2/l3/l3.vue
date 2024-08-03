<!-- 图标三级页面 -->
<template>
	<view>
		<view class="body">
			<image :src="`${cdn}/sign/${photo}`" mode="aspectFill"></image>
			<text class="name">{{title}}</text>
			<!-- <text class="content">表示禁止车辆驶入。此标志设在禁止驶入的路段入口处。</text> -->
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				// path:'/image/study/iconManagement/trafficSign',
				title: '',
				photo: '',
			}
		},
		methods: {
			setTitle(){
				uni.setNavigationBarTitle({
					title:this.title
				})
			}
		},
		onLoad(option) {
			this.title = option.title
			this.photo = option.photo
			this.setTitle()
		}
	}
</script>

<style lang="scss">
	// image {
	// 	background-color: chartreuse;
	// }



	page {
		background-color: #f2f3f5;
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 50rpx 45rpx 0;
		padding: 50rpx 36rpx;
		box-sizing: border-box;
		width: 660rpx;
		height: 1055rpx;
		background: #ffffff;
		border-radius: 16px;

		image {
			width: 369rpx;
			height: 369rpx;
		}

		;

		.name {
			font-size: 40rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Medium;
			font-weight: 500;
			text-align: center;
			color: #111111;
			margin: 38rpx 0 24rpx;
		}

		.content {
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
		}
	}
</style>
