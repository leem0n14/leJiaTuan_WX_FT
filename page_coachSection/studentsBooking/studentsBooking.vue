<!-- 学员预约 -->
<template>
	<view>

		<!-- 按时间查询 -->

		<view class="picker">
			<view class="all" @click="getAll()">
				查看全部
			</view>
			<picker mode="date" @change="handleDate">
				<view>{{date+'(选择时间)'}}</view>
			</picker>
		</view>


		<view class="ul" v-if="list&&list.length!=0">
			<view class="li" v-for="(k,i) in list" :key="i">
				<view class="up">
					<view class="left">

						<view class="msg" style="margin-bottom: 20rpx;">
							<text>{{k.mpName}}</text>
							<text>{{k.phone}}</text>
						</view>
						<view class="time" @click="changText(i)">
							<text>练车时间：{{k.carTime}}</text>
							<div>
								<text>练车日期：{{k.addTime.substr(0,10)}}</text>
							</div>
							<div>
								<text>练车项目:{{k.typeText?k.typeText:'无'}}</text>
							</div>
							<div class="time-text1" v-if="isShowText[i].isShow">
								{{k.evaluateText==null?'练车反馈:无':('练车反馈:'+k.evaluateText)}}
							</div>
							<div class="time-text" v-else>
								{{k.evaluateText==null?'练车反馈:无':('练车反馈:'+k.evaluateText)}}
							</div>
							<div>
								<text>练车类型:{{k.carTypes?k.carTypes:'无'}}</text>
							</div>
						</view>
					</view>
					<view class="right">
						<view class="right-type">

						</view>
						<view class="right-success">
							<button class="right-success-button" @click="selectCart(k.userId,k.id)"
								v-if="k.statu==='审核中'|| k.statu==='同意'">完成{{k.carTypes}}</button>
							<button class="right-success-button1" disabled
								v-else-if="k.statu==='已完成'">{{k.statu}}</button>
							<button class="right-success-button2" style="background-color: red;" disabled
								v-else-if="k.statu==='已取消'">{{k.statu}}</button>
						</view>
					</view>
				</view>
				<view class="down" @click="$util.openMap(k.addName,k.latitude,k.longitude)"
					v-if="(k.addName&&k.latitude&&k.longitude)">
					<view class="left">
						<text class="address" style="margin-bottom: 16rpx;">{{k.mpAdd}}</text>
						<!-- <text class="time">接送时间：2019/06/12 15:00</text> -->
					</view>
					<view class="right">
						<image :src="cdn+'/image/venue/locationIcon.png'" mode="aspectFill"></image>
					</view>
				</view>
				<view v-else>
					（无需接送）
				</view>
			</view>
		</view>
		<view class="noBooking" v-else>
			<image :src="cdn+'/image/noList/noBooking.png'" mode="aspectFill"></image>
			<text>暂无预约</text>
		</view>

		<!-- 选择接送车辆 -->
		<view class="chooseCar" v-show="isShowChoose">
			<view class="mask" @click="isShowChoose=false;orderId=null"></view>
			<view class="content">
				<view class="title">
					接送车辆
				</view>
				<view class="choose">
					<picker mode="selector" :range="listCar" range-key="carId" @change="bindPickerChange"
						:value="index">
						<view>{{choosedCar}}</view>
					</picker>
					<image :src="cdn+'/icon/triangle.svg'" mode="aspectFill"></image>
				</view>
				<view class="queren" @click="jiedan(id,userId)">
					确认车辆
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
	} from 'vuex'
	import list from '../../uni_modules/uview-ui/libs/config/props/list'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				isShowChoose: false,
				pageIndex: 1,
				show: false,
				orderId: null, //订单id
				choosedCar: '请选择车辆',
				selectCarId: null,
				date: '全部',

				userId: null,
				id: null,
				isShowText: []
			}
		},
		methods: {
			...mapActions({
				getBookingList_fun: 'coachSection/studentBooking',
				postcoachUpdate_fun: 'coachSection/postcoachUpdate',
				getListCar_fun: 'coachSection/getListCar',
			}),

			getAll() {
				this.date = '全部'
				this.getList()
			},
			handleDate(e) {
				console.log('handleDate', e);
				this.date = e.detail.value
				this.getList()
			},
			changText(e) {
				console.log(this.isShowText[e].isShow)
				this.isShowText[e].isShow = !this.isShowText[e].isShow
			},
			async getList(i) {
				// console.log('getList，coach');
				let data = {
					userId: this.$db.getSync('userId'),
					page: this.pageIndex.toString(),
					limit: '10',
					time: this.date,
					i,
				}
				let res = await this.getBookingList_fun(data)
				console.log(res)
			},
			async postcoachUpdate(id, userId) {
				let data = {
					id,
					userId,
					carId: this.selectCarId
				}
				let res = await this.postcoachUpdate_fun(data).then((data) => {
					console.log('postcoachUpdate_fun', data);
					this.getList()
					// console.log('>?');
					this.userId = null
					this.id = null
				})

			},
			async getListCar(userId) {
				let data = {
					id: userId,
				}
				let res = await this.getListCar_fun(data)
			},
			selectCart(userId, id) {
				this.userId = userId
				this.id = id
				// console.log(this.list)
				// console.log(this.list.list[g].id, this.list.list[g].userId)
				this.getListCar(userId)
				this.isShowChoose = true;
			},
			selectCart1(g) {
				// console.log(this.list)
				// console.log(this.list.list[g].id, this.list.list[g].userId)
				this.getListCar(g)
				// this.isShowChoose = true;
			},
			jiedan(id, userId) {
				console.log('这是jiedan', id, userId)
				this.selectCart1(userId)
				this.postcoachUpdate(id, userId)
				this.isShowChoose = false
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
				this.choosedCar = this.listCar[e.detail.value].carId
				this.selectCarId = this.listCar[e.detail.value].carId
				console.log(this.selectCarId)
			},
		},
		computed: {
			...mapState({
				list: state => state.coachSection.bookingList,
				listCar: state => state.coachSection.listCar,
			})
		},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			this.pageIndex++
			this.getList(1)
		},
		mounted() {
			var len = this.list.list ? this.list.list.length : 0
			console.log(len, "x")
			for (var i = 0; i < len; i++) {
				this.isShowText.push({
					isShow: false
				})
				console.log(this.isShowText)
			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.picker {
		display: flex;

		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #fff;
		box-sizing: border-box;
		border: 1rpx solid #666;

		// border-right: none;
		// border-left: none;
		.all {
			width: 30%;
		}

		picker {
			width: 70%;
			background-color: pink;
		}

	}

	.ul {
		// margin-top: 128rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		box-sizing: border-box;
		padding: 15rpx 0;

		.li {
			display: flex;
			flex-direction: column;
			width: 690rpx;
			min-height: 249rpx;
			background: #ffffff;
			border-radius: 16rpx;
			margin: 15rpx 0;
			padding: 0 24rpx;
			box-sizing: border-box;

			.up {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;
				padding: 30rpx 0;
				border-bottom: 2rpx solid #f5f5f5;

				.left {
					display: flex;
					flex-direction: column;

					.msg {
						font-size: 30rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #333333;
					}

					.time {
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #999999;

						.time-text {
							width: 509rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.time-text1 {}
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #333333;

					.right-type {}

					.right-success {
						.right-success-button {
							display: inline-block;
							width: 60px;
							height: 26px;



							border-radius: 14px;
							background: linear-gradient(134deg, #54d685, #29c563 99%);
							// background: #EC6744;
							font-size: 10px;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: center;
							color: #ffffff;
							margin-top: 5px;
							// line-height: 10px;
						}

						.right-success-button1 {
							display: inline-block;
							width: 60px;
							height: 26px;
							border-radius: 14px;
							background: linear-gradient(134deg, #ccc, #bbb 99%);
							// background: #EC6744;
							font-size: 10px;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: center;
							color: #ffffff;
							margin-top: 5px;
							// line-height: 10px;
						}

						.right-success-button2 {
							display: inline-block;
							width: 60px;
							height: 26px;
							border-radius: 14px;
							background: linear-gradient(134deg, #ff0000, #ff0000 99%);
							// background: #EC6744;
							font-size: 10px;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: center;
							color: #ffffff;
							margin-top: 5px;
							// line-height: 10px;
						}
					}
				}
			}

			.down {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;
				padding: 24rpx 0;

				.left {
					display: flex;
					flex-direction: column;

					text {
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #999999;
					}

				}

				.right {
					margin-right: 10rpx;

					image {
						// background-color: skyblue;
						width: 42rpx;
						height: 46rpx;
					}
				}
			}
		}
	}

	.noBooking {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 322rpx auto 0;

		image {
			// background-color: skyblue;
			margin-bottom: 30rpx;
			width: 326rpx;
			height: 163rpx;
		}

		text {
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #999999;
		}
	}

	.chooseCar {
		position: fixed;
		top: 400rpx;
		left: 55rpx;
		z-index: 999;
		width: 640rpx;
		height: 470rpx;
		border-radius: 16rpx;

		.mask {
			position: absolute;
			left: -55rpx;
			top: -400rpx;
			width: 100vh;
			height: 100vh;
			opacity: 0.5;
			background: #000000;
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			width: 640rpx;
			height: 470rpx;
			background: #fff;
			border-radius: 16rpx;

			.title {
				margin-top: 50rpx;
				font-size: 34rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Bold;
				font-weight: 700;
				text-align: center;
				color: #111111;
			}

			.choose {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-top: 80rpx;
				width: 560rpx;
				height: 88rpx;
				box-sizing: border-box;
				padding: 20rpx;
				background: #f2f3f5;
				border-radius: 16rpx;

				picker {
					width: 100%;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}

				image {
					// background: #a2e899;
					width: 25rpx;
					height: 18rpx;
				}
			}

			.queren {
				margin-top: 80rpx;
				width: 560rpx;
				height: 88rpx;
				line-height: 88rpx;
				background: linear-gradient(134deg, #54d685, #29c563 99%);
				border-radius: 44rpx;
				font-size: 30rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
			}
		}
	}
</style>