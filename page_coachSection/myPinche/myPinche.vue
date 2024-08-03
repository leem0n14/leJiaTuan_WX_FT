<!-- 我的拼车---教练 -->
<template>
	<view>
		<!-- 主体列表 -->
		<view class="body">
			<view class="nav">
				<view class="son" v-for="(item,index) in navList" @click="navAct(item);getPclist(index)">
					<text :class="item.isAct?'act':'noAct'">{{item.text}}</text>
					<view v-show="item.isAct"></view>
				</view>
			</view>
			<view class="null" v-if="list.length==0">
				暂无记录
			</view>
			<view class="ul" v-else>
				<view class="li" v-for="(k,i) in list" :key='i'>
					<view class="userMsg">
						<image :src="cdn+'/background/pincheUserMsgBackground.png'" mode="aspectFill" class="bg">
						</image>
						<view class="content">
							<view class="msg">
								<image src="" mode="aspectFill"></image>
								<view class="text">
									<view class="name">{{k.fqName}}</view>
									<view class="phone">{{k.Phone}}</view>
								</view>
							</view>
							<image :src="cdn+'/icon/pinche'+(true?'/call.svg':'/finishCall.svg')" mode="aspectFill"
								class="callIcon"></image>
						</view>
					</view>
					<view class="time">{{k.startTime}}</view>
					<view class="mid">
						<view class="journey">
							<view class="start">
								<view class="circle" style="background: #29c563;"></view><text>{{k.startPlace}}</text>
							</view>
							<view class="end">
								<view class="circle" style="background: #ffbb1e;"></view><text>{{k.endPlace}}</text>
							</view>
						</view>
						<view class="price">
							<text>{{k.price}}</text>元
						</view>
					</view>
					<!-- 确认接送 -->
					<view class="confirm" v-if="navList[0].isAct" @click="getCars(k.id)">
						<button @click="isShowChoose=true">确认接送</button>
					</view>
					<!-- 正在拼车 -->
					<view class="pincheing" v-if="navList[1].isAct">
						<image :src="cdn+'/icon/pinche/pincheingIcon.svg'" mode="aspectFill"></image>
						<text>已发起拼车，请等待教练接送</text>
					</view>
					<!-- 接送教练信息 -->
					<view class="coachMsg" v-if="navList[2].isAct">
						<view class="detailed">
							<view class="key">
								接送教练：
							</view>
							<view class="value">
								{{k.jdName}}
							</view>
						</view>
						<view class="detailed">
							<view class="key">
								联系方式：
							</view>
							<view class="value">
								{{k.jdPhone}}
							</view>
						</view>
						<view class="detailed">
							<view class="key">
								接送车辆：
							</view>
							<view class="value">
								{{k.carId+k.carType}}
							</view>
						</view>
						<image :src="cdn+'/icon/pinche/call.svg'" mode="aspectFill" class="icon"></image>
					</view>
				</view>
			</view>
			
		</view>

		<!-- 选择接送车辆 -->
		<view class="chooseCar" v-show="isShowChoose">
			<view class="mask" @click="isShowChoose=false;orderId=null"></view>
			<view class="content">
				<view class="title">
					接送车辆
				</view>
				<view class="choose" >
					<picker mode="selector" :range="carList" @change="chooseCar">
						<view>{{choosedCar}}</view>
					</picker>
					<image :src="cdn+'/icon/triangle.svg'" mode="aspectFill"></image>
				</view>
				<view class="queren" @click="jiedan()">
					确认车辆
				</view>
			</view>
		</view>

		<!-- 底部发起拼车	 -->
		<button class="launch" @click="$win.show('/page_my/pinche/toPinche/toPinche')">发起拼车</button>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations,
		mapGetters,

	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				orderId:null,//订单id
				carId:null,
				carType:null,
				pageIndex:1,
				navList: [{
						text: '拼车列表',
						isAct: true,
					},
					// {
					// 	text: '拼车中',
					// 	isAct: false,
					// },
					{
						text: '拼车完成',
						isAct: false,
					},
					// {
					// 	text: '已结束',
					// 	isAct: false,
					// }
				],
				// carList: ['车辆1', '车辆2', '车辆3', '车辆4', '车辆5'],
				choosedCar: '请选择接送车辆',
				isShowChoose: false,
				coachMsgKeyList: ['接送教练', '联系方式', '接送车辆'],
			}
		},
		methods: {
			...mapActions({
				getList_fun: 'pinche/getPcList',
				getCars_fun:'coachSection/getCars',
				jiedan_fun:'pinche/jiedan',
			}),
			navAct(item) {
				console.log('11');
				for (let a = 0; a < this.navList.length; a++) {
					this.navList[a].isAct = false
				}
				item.isAct = true
			},
			//选择车辆
			chooseCar(e) {
				this.choosedCar = this.carList[e.detail.value]
			},
			async getPclist(n) {
				console.log(n);
				let data = {
					userId: this.$db.getSync('userId'),
					type:(n==0)?(-1):1,
					page:this.pageIndex.toString(),
					limit:'10',
				}
				let res = await this.getList_fun(data)
			},
			async getCars(id){
				console.log('订单id',id);
				this.orderId=id
				let data={
					userId: this.$db.getSync('userId'),
				}
				let res=await this.getCars_fun(data)
			},
			async jiedan(){
				if(this.orderId==null){
					this.$win.nlog('请选择订单')
					return
				}
				let data={
					userId: this.$db.getSync('userId'),
					id:this.orderId,
				}
				let res=await this.jiedan_fun(data).then((e)=>{
					console.log(e,'6');
					if(this.jiedanStatu==0){
						this.isShowChoose=false
						this.getPclist(0)
					}
				})
			}
		},
		computed: {
			...mapState({
				list: state => state.pinche.pincheList,
				carList:state=>state.coachSection.carsList,
				jiedanStatu:state=>state.pinche.jiedanStatu,
			})
		},
		onReachBottom(){
			
		},
		onShow() {
			this.getPclist(0)
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

		.nav {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 30rpx;
			box-sizing: border-box;
			width: 750rpx;
			height: 110rpx;

			.son {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-right: 46rpx;

				.act {
					font-size: 34rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: center;
					color: #333333;
				}

				.noAct {
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #999999;
				}

				view {
					position: absolute;
					bottom: -16rpx;
					width: 62rpx;
					height: 6rpx;
					background: #29c563;
					background-color: #29c563;
				}
			}
		}

		.ul {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 750rpx;
			max-height: 1000rpx;
			box-sizing: border-box;
			// padding: 20rpx 0 0;
			overflow-y: scroll;

			.li {
				position: relative;
				width: 690rpx;
				box-sizing: border-box;
				padding: 30rpx;
				margin-bottom: 20rpx;
				background: #ffffff;
				border-radius: 16rpx;

				.userMsg {
					position: relative;
					width: 630rpx;
					height: 150rpx;

					.bg {
						position: absolute;
						top: 0;
						left: 0;
						width: 630rpx;
						height: 150rpx;
						// background-color: #393939;

					}

					.content {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						position: absolute;
						top: 0;
						left: 0;
						width: 630rpx;
						height: 150rpx;
						box-sizing: border-box;
						z-index: 2;

						.msg {
							display: flex;
							flex-direction: row;
							align-items: center;
							margin-left: 24rpx;

							image {
								width: 102rpx;
								height: 102rpx;
								background: #f2f3f5;
								border-radius: 50%;
							}

							.text {
								display: flex;
								flex-direction: column;
								margin-left: 20rpx;

								.name {
									font-size: 30rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Bold;
									font-weight: 700;
									text-align: left;
									color: #ffffff;
									margin-bottom: 18rpx;
								}

								.phone {
									opacity: 0.5;
									font-size: 30rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-Regular;
									font-weight: 400;
									text-align: left;
									color: #ffffff;
								}
							}
						}

						.callIcon {
							margin-right: 30rpx;
							width: 56rpx;
							height: 56rpx;
							// background: #29c362;
						}

					}
				}

				.time {
					margin: 30rpx 0;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}

				.mid {
					display: flex;
					flex-direction: row;
					align-items: flex-end;
					justify-content: space-between;

					.journey {
						display: flex;
						flex-direction: column;
						align-items: flex-start;

						.start {
							margin-bottom: 20rpx;

							&::after {
								position: absolute;
								left: 6rpx;
								top: 26rpx;
								content: '';
								width: 2rpx;
								height: 53rpx;
								background: #f2f3f5;
								// background: #000;
							}
						}

						.start,
						.end {
							position: relative;
							display: flex;
							flex-direction: row;
							align-items: center;
							font-size: 30rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: left;
							color: #333333;

							.circle {
								width: 14rpx;
								height: 14rpx;
								border-radius: 50%;
								margin-right: 8rpx;
							}
						}
					}

					.price {
						font-size: 26rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: right;
						color: #111111;

						text {
							font-size: 36rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Bold;
							font-weight: 700;
							text-align: right;
							color: #f55549;
						}
					}
				}

				.confirm {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-end;
					width: 100%;
					padding-top: 27rpx;

					button {
						margin: 0;
						width: 180rpx;
						height: 60rpx;
						line-height: 60rpx;
						background: #ffffff;
						border: 2rpx solid #29c563;
						box-sizing: border-box;
						border-radius: 32rpx;
						font-size: 26rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #29c563;
					}
				}

				.pincheing {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-top: 42rpx;

					image {
						margin-right: 6rpx;
						width: 32rpx;
						height: 32rpx;
						// background-color: #29c362;
					}

					text {
						font-size: 26rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: left;
						color: #666666;
					}
				}

				.coachMsg {
					position: relative;
					display: flex;
					flex-direction: column;
					width: 100%;
					padding: 10rpx 0 0 0;
					margin-top: 30rpx;
					border-top: 2rpx solid #e4e4e4;

					.detailed {
						display: flex;
						flex-direction: row;
						margin-top: 20rpx;

						.key {
							font-size: 30rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: left;
							color: #999999;
						}

						.value {
							font-size: 30rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Regular;
							font-weight: 400;
							text-align: left;
							color: #666666;
						}
					}

					.icon {
						position: absolute;
						right: 0;
						top: 90rpx;
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
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

	.launch {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99rpx;
		width: 750rpx;
		height: 104rpx;
		line-height: 104rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}
</style>
