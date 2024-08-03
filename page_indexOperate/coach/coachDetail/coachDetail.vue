<!-- //教练团详细 -->
<template>
	<view>
		<view class="pic">
			<image :src="cdn+'/image/coach/coachMsg.png'" mode="aspectFill" style="height: 100%;width: 100%;"></image>
		</view>
		<view class="coachMsg">
			<view class="msg1">
				<image :src="cdn+'/coach/'+msg.coachPhoto" mode="aspectFill" class="coachPic"></image>
				<text class="name">{{msg.coachName}}</text>
				<view class="score">
					<uni-rate :value="msg.evaluation" size="60rpx"></uni-rate>
					<text class="num" v-text="msg.evaluation.toFixed(1)"></text>
				</view>
				<view class="labels">
					<view class="son" v-for="(k,i) in msg.tags" :class="'label'+(i+1)">{{k}}</view>
				</view>
			</view>
			<view class="msg2 box">
				<view class="block"></view>
				<view class="title">基本信息</view>
				<view class="content">
					<text class="key">驾校</text><text class="value">{{msg.school}}</text>
				</view>
				<view class="content">
					<text class="key">教龄</text><text class="value">{{msg.age}}年</text>
				</view>
				<view class="content">
					<text class="key">手机号</text><text class="value" v-text="msg.coachPhone?msg.coachPhone:'暂无'"></text>
				</view>
				<view class="content">
					<text class="key">车牌号</text><text class="value" v-text="(msg.cars.length==0)?'暂无':msg.cars[0].carId"></text>
				</view>
			</view>
			<view class="msg3 box">
				<view class="block"></view>
				<view class="title">简介</view>
				<view class="content2" v-text="msg.introduction?msg.introduction:'暂无简介'"></view>
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
				id: null,
			}
		},
		methods: {
			...mapActions({
				getDetail_fun: 'coach/getCoachDetail',
			}),
			//获得教练详细
			async getCoachDetail(id) {
				let data = {
					id: this.id,
				}
				let res = await this.getDetail_fun(data)
			}
		},
		computed: {
			...mapState({
				msg: state => state.coach.coachDetail,
			})
		},
		onLoad(op) {
			this.id = op.id
		},
		onShow() {
			this.getCoachDetail()
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(134deg, #54d685, #29c563 99%);
	}

	.pic {
		width: 702rpx;
		height: 224rpx;
		margin: 0 auto;
	}

	.coachMsg {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		width: 702rpx;
		height: 1235rpx;
		background: #ffffff;
		border-radius: 0rpx 0rpx 16rpx 16rpx;

		.msg1 {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-bottom: 60rpx;

			.coachPic {
				margin-top: 40rpx;
				width: 160rpx;
				height: 160rpx;
				background: rgba(0, 0, 0, 0.00);
				border: 2rpx solid #f0f1f5;
				border-radius: 50%;
				background-color: #f0f1f5;
			}

			.name {
				margin: 20rpx 0;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Bold;
				font-weight: 700;
				text-align: center;
				color: #333333;
			}

			.score {
				display: flex;
				flex-direction: row;
				align-items: center;

				.num {
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
				}
			}

			.labels {
				display: flex;
				flex-direction: row;
				margin-top: 20rpx;

				.son {
					margin: 0 8rpx;
					width: 115rpx;
					height: 42rpx;
					line-height: 42rpx;
					border-radius: 2rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
				}
				.label1{
					color: #f17516;
					background: #ffecd9;
				}
				
				.label2 {
					color: #29c563;
					background: #dff9dc;
				}
				
				.label3{
					color: #4988f5;
					background: #c5daff;
				}
			}
		}

		.msg2 {}

		.msg3 {}

		.box {
			display: flex;
			flex-direction: column;
			margin: 0 60rpx;
			border-top: 2rpx solid #f0f1f5;
			padding: 40rpx 0 20rpx;

			.block {
				width: 36rpx;
				height: 6rpx;
				background: #29c563;
			}

			.title {
				margin: 15rpx 0;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Bold;
				font-weight: 700;
				text-align: left;
				color: #333333;
			}

			.content {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: 15rpx 0;

				.key {
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
				}

				.value {
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #333333;
				}
			}

			.content2 {
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
				line-height: 45rpx;
			}
		}
	}
</style>
