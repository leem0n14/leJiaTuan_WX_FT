<!-- 各种记录 -->
<template>
	<view>
		<view class="empty" v-if="lists.length===0">
			无记录
		</view>
		<view class="ul" v-else>
			<view class="li" v-for="(k,i) in lists">
				<view class="title">
					<view class="time" v-if="type==0">
						{{k.startTime}}
					</view>
					<view class="time" v-if="type==1">
						{{k.time}}
					</view>
					<view class="time" v-if="type==2">
						{{k.cxTime}}
					</view>
					<view class="time" v-if="type==3">
						{{k.wxTime}}
					</view>
					<view class="lineDay" v-show="isShowDeadLine">
						<text>{{k.endTime}}</text>到期
					</view>
				</view>
				<view class="content">

					<!-- 保险 -->
					<view class="option" v-if="type==0">
						<view class="key">投保公司：</view>
						<view class="value" :style="{'maxWidth':i==0?'280rpx':'500rpx'}">
							<!-- 交强险、第三者责任险、车辆损失险、车上人员责任险-司机、车上人员责任险-乘客 -->
							{{k.company}}
						</view>
					</view>
					<view class="option" v-if="type==0">
						<view class="key">投保险种：</view>
						<view class="value" :style="{'maxWidth':i==0?'280rpx':'500rpx'}">
							<!-- 交强险、第三者责任险、车辆损失险、车上人员责任险-司机、车上人员责任险-乘客 -->
							{{k.text}}
						</view>
					</view>

					<!-- //保养 -->
					<view class="option" v-if="type==1">
						<view class="key">行驶里程：</view>
						<view class="value" :style="{'maxWidth':i==0?'280rpx':'500rpx'}">
							<!-- 交强险、第三者责任险、车辆损失险、车上人员责任险-司机、车上人员责任险-乘客 -->
							{{k.mile}}
						</view>
					</view>
					<view class="option" v-if="type==1">
						<view class="key">保养项目：</view>
						<view class="value" :style="{'maxWidth':i==0?'280rpx':'500rpx'}">
							<!-- 交强险、第三者责任险、车辆损失险、车上人员责任险-司机、车上人员责任险-乘客 -->
							{{k.projects}}
						</view>
					</view>


					<!-- 出险 -->
					<view class="option" v-if="type==2">
						<view class="key">出险地点：</view>
						<view class="value" :style="{'maxWidth':i==0?'280rpx':'500rpx'}">
							<!-- 交强险、第三者责任险、车辆损失险、车上人员责任险-司机、车上人员责任险-乘客 -->
							{{k.cxPlace}}
						</view>
						<view class="img">
							<image :src="`${cdn}/damage/${k.damagePicture}`" style="width: 600rpx;" mode="aspectFit"></image>
						</view>
					</view>

					<!-- 维修 -->
					<view class="option" v-if="type==3">
						<view class="key">维修商家：</view>
						<view class="value" :style="{'maxWidth':i==0?'280rpx':'500rpx'}">
							<!-- 交强险、第三者责任险、车辆损失险、车上人员责任险-司机、车上人员责任险-乘客 -->
							{{k.factory}}
						</view>
					</view>
					<view class="option" v-if="type==3">
						<view class="key">维修内容：</view>
						<view class="value" :style="{'maxWidth':i==0?'280rpx':'500rpx'}">
							<!-- 交强险、第三者责任险、车辆损失险、车上人员责任险-司机、车上人员责任险-乘客 -->
							{{k.wxBody}}
						</view>
					</view>

					<view class="money" v-if="isShowSum">
						金额：<view> <text>{{k.money?k.money:k.price}}</text>元 </view>
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
				title: '(标题)',
				isShowDeadLine: null,
				isShowSum: null,
				// money: null,
				carId: null,
				type: null,
			}
		},
		computed: {
			...mapState({
				lists: state => state.coachSection.lists
			})

		},
		methods: {
			...mapActions({
				getAcc_fun: 'coachSection/accList',
				getMain_fun: 'coachSection/mainList',
				getFix_fun: 'coachSection/fixList',
				getInsure_fun: 'coachSection/insureList',
			}),

			judgeType(key) {
				if (key === "保险") {
					this.isShowDeadLine = true
					this.isShowSum = true
				} else if (key === "保养") {
					this.isShowDeadLine = false
					this.isShowSum = true
				} else if (key === "出险") {
					this.isShowDeadLine = false
					this.isShowSum = false
				} else if (key === "维修") {
					this.isShowDeadLine = false
					this.isShowSum = true
				}
			},
			async getAllList(type) {
				let data = {
					carId: this.carId
				}
				if (type == 0) {
					let res4 = await this.getInsure_fun(data)
				} else if (type == 1) {
					let res2 = await this.getMain_fun(data)
				} else if (type == 2) {
					let res1 = await this.getAcc_fun(data)
				} else if (type == 3) {
					let res3 = await this.getFix_fun(data)
				} else {
					this.$win.nlog('未知错误6')
				}


			},
		},
		onLoad(option) {
			this.title = option.name + '记录'

			uni.setNavigationBarTitle({
				title: option.name + '记录'
			})

			this.judgeType(option.name)
			this.carId = option.carId
			console.log('op', option);
			this.type = option.type
			this.getAllList(option.type)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.empty {
		text-align: center;
		margin-top: 10rpx;
		color: #999999;
	}

	.d {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		.w {
			width: 750rpx;
			height: 40rpx;
			background-color: #fff;
		}

		.top {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			width: 750rpx;
			height: 88rpx;
			background-color: #fff;

			.back {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 88rpx;
				height: 88rpx;

				image {
					width: 18rpx;
					height: 33rpx;
				}
			}

			text {
				line-height: 88rpx;
				height: 88rpx;
				font-size: 34rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
			}
		}
	}

	.ul {
		display: flex;
		flex-direction: column;
		align-items: center;

		.li {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 30rpx;
			width: 690rpx;
			min-height: 164rpx;
			box-sizing: border-box;
			padding: 30rpx;
			background: #ffffff;
			border-radius: 16rpx;

			.title {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 42rpx;

				.time {
					font-size: 36rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: left;
					color: #333333;
				}

				.lineDay {
					font-size: 26rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #333333;

					text {
						font-size: 30rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: right;
						color: #f55549;
					}
				}
			}

			.content {
				position: relative;
				display: flex;
				flex-direction: column;
				width: 100%;

				.option {
					display: flex;
					flex-direction: column;
					font-size: 26rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
					margin-bottom: 24rpx;

					.key {
						min-width: 130rpx;
						color: #999999;
					}

					.value {
						overflow-wrap: normal;
						color: #333333;
					}
				}

				.money {
					position: absolute;
					right: 0;
					display: flex;
					font-size: 26rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;

					view {
						display: flex;
						color: #333333;

						text {
							display: flex;
							color: #f55549;
						}
					}
				}
			}
		}
	}
</style>