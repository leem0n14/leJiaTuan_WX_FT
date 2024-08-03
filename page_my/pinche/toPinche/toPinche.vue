<!-- 发起拼车 -->
<template>
	<view>
		<view class="box">
			<view class="son name">
				<text>发布人</text>
				<input type="text" class="input" placeholder="请输入发布人姓名" v-model="name">
			</view>
			<view class="son phone">
				<text>联系方式</text>
				<input type="number" class="input" placeholder="请输入联系方式" v-model="phone" maxlength="11">
			</view>
			<view class="son time">
				<text>出发日期</text>
				<picker mode="date" @change="bindDateChange" class="picker">
					<view >{{date==null?'请选择日期':date}}</view>
				</picker>
				<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
			</view>
			<view class="son time">
				<text>出发时间</text>
				<picker mode="time" @change="bindTimeChange" class="picker">
					<view>{{time==null?'请选择出发时间':time}}</view>
				</picker>
				<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
			</view>
			<view class="son startAddress" @click="chooseLocation(0)">
				<text>接送地点</text>
				<view class="content" >{{startAddress==null?'请选择接送地点':startAddress}}</view>
				<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
			</view>
			<view class="son endAddress" @click="chooseLocation(1)">
				<text>目的地</text>
				<view class="content" >{{endAddress==null?'请选择目的地':endAddress}}</view>
				<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
			</view>
			<view class="son price" @click="getPrice()">
				<text>价格(元)</text>
				<view class="content" v-text="price==null?'选择地点后自动根据距离算价格':price"></view>
				<!-- <input type="number" class="input" placeholder="选择地点后自动根据距离算价格"> -->
			</view>
		</view>

		<button @click="sub" :disabled="!(startAddress&&endAddress&&time&&phone&&name&&date)">发布</button>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import moment from 'moment'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				longitude: null,
				latitude: null,
				startLongitude: null,
				startLatitude: null,
				endLongitude: null,
				endLatitude: null,
				name:null,
				phone:null,
				time: null,
				date: null,
				startAddress: null,
				endAddress: null,
				// price: null,
				isBanBtn:false,
			}
		},
		computed: {
			...mapState({
				price:state=>state.pinche.price,
			})
		},
		watch:{
			startAddress(){
				if(this.startAddress&&this.endAddress){
					this.getPrice()
				}else{
					this.$win.nlog('请选择出发地或目的地')
				}
			},
			endAddress(){
				if(this.startAddress&&this.endAddress){
					this.getPrice()
				}else{
					this.$win.nlog('请选择出发地或目的地')
				}
			}
		},
		methods: {
			...mapActions({
				getPrice_fun:'pinche/countPrice',
				subFrom_fun:'pinche/toPinche',
			}),
			bindTimeChange(e) {
				this.time = e.detail.value
			},
			bindDateChange(e) {
				this.date = e.detail.value
			},
			//选择位置
			chooseLocation(n) {
				uni.chooseLocation({
					longitude: this.longitude,
					latitude: this.latitude,
					success: (res) => {
						console.log('位置名称：' + res.name)
						console.log('详细地址：' + res.address)
						console.log('纬度：' + res.latitude)
						console.log('经度：' + res.longitude)
						if (n == 0) {
							this.startAddress = res.name
							// that.startAddress = res1.address
							this.startLatitude = res.latitude
							this.startLongitude = res.longitude
						} else if (n == 1) {
							this.endAddress = res.name
							// that.endAddress = res1.address
							this.endLatitude = res.latitude
							this.endLongitude = res.longitude
						}
					}
				})
			},
			getLocation() {
				//形参n判断选择的是出发点还是目的地
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log('当前位置的经度：' + res.longitude)
						console.log('当前位置的纬度：' + res.latitude)
						console.log('\n')
						this.latitude = res.latitude
						this.longitude = res.longitude
					},
					fail(err) {
						uni.showToast({
							title: "获取位置失败",
							icon: "error"
						})
					}
				});
			},
			//按距离计算价格计算
			countPrice() {
				//直接用requestAPI
				uni.request({
					url: 'http://192.168.1.136:8080/renren-fast/app/wxcarpool/price',
					method: "POST",
					data: {
						stLongitude:this.startLongitude,
						stLatitude:this.startLatitude,
						edLongitude:this.endLongitude,
						edLatitude:this.endLatitude,
					},
					success: (res) => {
						console.log(res)
						// this.price = res.price
					},
					fail: (err) => {
						uni.showToast({
							title: "错误",
							icon: "error"
						})
					}
				});
			},
			async getPrice() {
				//VUEX
				if(this.startLongitude==null||this.startLatitude==null)
				{
					this.$win.nlog('请选择出发点')
					return 0;
				}
				else if(this.endLongitude==null||this.endLatitude==null)
				{
					this.$win.nlog('请选择目的地')
					return 0;
				}
				let data = {
					stLongitude:this.startLongitude,
					stLatitude:this.startLatitude,
					edLongitude:this.endLongitude,
					edLatitude:this.endLatitude,
				}
				let res = await this.getPrice_fun(data)
			},
			async subPinche(msg){
				let data={
					fqUserid:this.$db.getSync('userId'),
					...msg
				}
				let res =await this.subFrom_fun(data)
			},
			async Pay(){
				uni.getProvider({
					service:'payment',
					success: (res) => {
						console.log('s',res);
						// let t=new Date()
						// uni.requestPayment({
						// 	provider:'wxpay',
						// 	timeStamp:new Date().getTime(),
						// 	nonceStr:new Date().getTime()+Math.ceil(Math.random()*100),
						// 	package:
						// 	signType:MD5,
							
						// })
					},
					fail: (err) => {
						console.log('f',res);
					}
				})
			},
			sub(){
				// this.Pay()
				// console.log('sub');
				// return 0;
				// let t=new Date().getTime()
				let msg={
					fqName:this.name,
					fqPhone:this.phone,
					// startTime:t,
					// endTime:t+12*1000*60*60,
					time:this.date+'/'+this.time,
					startPlace:this.startAddress,
					endPlace:this.endAddress,
					price:this.price,
					statu:0
				}
				this.subPinche(msg)
			},
			
		},

		onLoad() {
			this.getLocation()
			this.datetimesingle = Date.now() - 2 * 24 * 3600 * 1000
		}
	}
</script>

<style>
	page {
		background-color: #f2f3f5;
	}

	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		width: 750rpx;
		height: 750rpx;
		padding: 20rpx 0;
		background-color: #fff;
	}

	.box .son {
		position: relative;
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		width: 690rpx;
		height: 90rpx;
		box-sizing: border-box;
		background: #f2f2f2;
		border-radius: 8rpx;
	}

	.box .son text {
		height: 90rpx;
		width: 172rpx;
		box-sizing: border-box;
		padding-left: 30rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 90rpx;
	}
	
	.triangle{
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		width: 25rpx;
		height: 18rpx;
	}

	.input {
		box-sizing: border-box;
		padding-right: 30rpx;
		height: 28rpx;
		width: 518rpx;
	}

	.picker {
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		width: 528rpx;
		height: 90rpx;
		line-height: 90rpx;
	}

	.content {
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		width: 528rpx;
		height: 90rpx;
		line-height: 90rpx;
	}


	button {
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
</style>
