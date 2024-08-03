<!-- 添加保养 -->
<template>
	<view>
		<view class="body">
			<view class="input date">
				<text>保养日期</text>
				<picker mode="date" @change="bindDateChange" >
					<view>{{date==''?'请选择保养日期':date}}</view>
				</picker>
			</view>
			<view class="input mileage">
				<text>行驶里程</text>
				<input type="number" placeholder="请输入行驶里程" v-model="mile">
				<view class="unit">公里</view>
			</view>
			<view class="input sum">
				<text>保养金额</text>
				<input type="number" placeholder="请输入保养金额" v-model="price">
				<view class="unit">元</view>
			</view>
			<view class="input obj">
				<text>保养项目</text>
				<input type="text" placeholder="请输入保养项目" v-model="projects">
			</view>
		</view>
		<button class="save" @click="addMain()">保存</button>
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
				mile:'',
				price:'',
				
				projects:'',
			}
		},
		methods: {
			...mapActions({
				addMain_fun:'coachSection/addMain',
			}), 
			bindDateChange(e) {
				this.date = e.detail.value
			},
			async addMain(){
				let data={
					carId:this.carId,
					time:this.date,
					mile:parseInt(this.mile),
					price:this.price,
					projects:this.projects,
				}
				let res=await this.addMain_fun(data)
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
		width: 750rpx;
		height: 530rpx;
		padding: 40rpx 10rpx;
		box-sizing: border-box;
		background: #ffffff;

		.input {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 690rpx;
			height: 90rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			background: #f2f2f2;
			border-radius: 8rpx;
			margin-bottom: 30rpx;

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
				margin-right: 30rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: right;
				color: #666666;
			}

			input {
				width: 430rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}

			.unit {
				position: absolute;
				right: 30rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: right;
				color: #333333;
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
