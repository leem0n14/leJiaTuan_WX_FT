<!-- 添加保险 -->
<template>
	<view>
		<view class="body">
			<view class="date input">
				<text class="text">生效日期</text>
				<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate"
					@change="bindDateChange">
					<view>{{startTime==''?'请选择生效日期':startTime}}</view>
				</picker>
			</view>
			<view class="date input">
				<text class="text">失效日期</text>
				<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate"
					@change="bindDateChange1">
					<view>{{endTime==''?'请选择失效日期':endTime}}</view>
				</picker>
			</view>
			<view class="company input">
				<text class="text">投保公司</text>
				<input v-model="company" type="text" placeholder="请输入投保公司" placeholder-style="color: #999999;">
			</view>
			<view class="sum input">
				<text class="text">投保金额</text>
				<input type="number" v-model="money" placeholder="请输入投保金额" placeholder-style="color: #999999;">
				<text class="yuan">元</text>
			</view>
			<view class="type checkbox">
				<view class="title">
					投保险种
				</view>
				<input type="text" v-model="text" placeholder="请输入投保险种" placeholder-style="color: #999999;">
				<!-- <checkbox-group class="checkbox-group">
					<label v-for="(k,i) in insureType" :key="i">
						<checkbox value="type" color="#29c563"/>
						<text>{{k}}</text>
					</label>
				</checkbox-group> -->
			</view>
		</view>
		<button class="save" @click="addInsure()" :disabled="!isAuth">保存</button>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: '请选择生效日期',
				insureType: ['交强险', '第三者责任险', '车辆损失险', '车上人员责任险-司机', '车上人员责任险-乘客'],
				text: '',
				company: '',
				startTime: '',
				endTime: '',
				carId: '',
				money: '',
			}
		},

		methods: {
			...mapActions({
				addInsure_fun: 'coachSection/addInsure',
				addMain_fun: 'coachSection/addMain',
				addAcc_fun: 'coachSection/addAcc',
				addFix_fun: 'coachSection/addFix',
			}),
			bindDateChange(e) {
				console.log(e, '??');
				this.startTime = e.detail.value
			},
			bindDateChange1(e) {
				this.endTime = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},

			async addInsure() {
				let data = {
					carId: this.carId,
					startTime: this.startTime,
					endTime: this.endTime,
					text: this.text,
					company: this.company,
					money: this.money,
				}
				let res = await this.addInsure_fun(data)
			}

		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			isAuth() {
				return (this.money && this.startTime && this.endTime && this.text && this.company)
			}
		},
		onLoad(e) {
			// console.log(e,'?');
			this.carId = e.carId
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
		justify-content: space-around;
		width: 750rpx;
		height: 924rpx;
		box-sizing: border-box;
		padding: 25rpx 30rpx 0;
		background: #ffffff;

		.input {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 15rpx 0;
			width: 690rpx;
			height: 90rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			background: #f2f2f2;
			border-radius: 8rpx;

			.text {
				margin-right: 30rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}

			input {
				width: 450rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.yuan {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #333333;
				}
			}

			.picker {
				width: 450rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}
		}

		.checkbox {
			display: flex;
			flex-direction: column;
			margin: 20rpx 0 40rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			width: 690rpx;
			height: 479rpx;
			background: #f2f2f2;
			border-radius: 8rpx;

			.title {
				padding: 30rpx 0 40rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}

			.checkbox-group {
				display: flex;
				flex-direction: column;

				label {
					display: flex;
					align-items: center;
					margin-bottom: 30rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}
		}
	}

	.save {
		margin-top: 110rpx;
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
