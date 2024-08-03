<!-- 添加维修 -->
<template>
	<view>
		<view class="body">
			<view class="input">
				<text>维修日期</text>
				<picker mode="date" @change="bindDateChange">
					<view>{{date==''?'请选择维修日期':date}}</view>
				</picker>
				<!-- <image src="" mode="aspectFill"></image> -->
			</view>
			<view class="input">
				<text>维修商家</text>
				<input v-model="factory" type="text" placeholder="请输入维修商家名称" placeholder-style="color: color: #999999;">
			</view>
			<view class="input">
				<text>维修金额</text>
				<input v-model="wxPrice" type="number" placeholder="请输入维修金额" placeholder-style="color: color: #999999;">
			</view>
			<view class="input">
				<text>维修内容</text>
				<input v-model="content" type="text" placeholder="请输入维修内容" placeholder-style="color: color: #999999;">
			</view>
		</view>
		<button class="save" @click="addFix()">保存</button>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				date: '',
				carId:'',
				factory:'',
				content:'',//维修内容
				wxPrice:'',
				time:'',
			}
		},
		methods: {
			...mapActions({
				addFix_fun:'coachSection/addFix',
			}), 
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			async addFix(){
				let data={
					carId:this.carId,
					factory:this.factory,
					wxBody:this.content,
					wxPrice:this.wxPrice,
					wxTime:this.date,
				}
				let res=await this.addFix_fun(data)
			}
		},
		onLoad(e) {
			this.carId=e.carId
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
		align-items: center;
		padding: 40rpx 0 10rpx;
		width: 750rpx;
		height: 530rpx;
		box-sizing: border-box;
		background: #ffffff;

		.input {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 690rpx;
			height: 90rpx;
			margin-bottom: 30rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			background: #f2f2f2;
			border-radius: 8rpx;

			picker {
				view {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}
			}

			text {
				line-height: 28rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
				margin-right: 30rpx;
			}

			image {
				position: absolute;
				right: 30rpx;
				width: 25rpx;
				height: 18rpx;
				background-color: #29c563;
			}

			input {
				height: 90rpx;
				line-height: 90rpx;
				width: 430rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}
		}
	}

	.save {
		margin-top: 100rpx;
		width: 580rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}
</style>
