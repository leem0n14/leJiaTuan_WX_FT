<!-- 考勤打卡 -->
<template>
	<view>

		<!-- 主体 -->
		<view class="box" v-if="code!=0">
			<view class="takePhoto" @click="takePhoto()">
				<view>
					<image :src="imageSrc" mode="aspectFill" style="height: 100%;width: 100%;"></image>
				</view>
				<text>拍照</text>
			</view>
			<view class="position" @click="getAuth()">
				<text style="margin-right: 35rpx;color: #666666;">定位</text>
				<text style="color: #333333;width: 380rpx;">{{position}}</text>
				<image :src="cdn+'/icon/locationGreen.svg'" mode="aspectFill"></image>
			</view>
			<view class="venue">
				<text>打卡场地</text>
				<!-- <input type="text" placeholder="请输入打卡场地" v-model="venue"> -->
				<picker @change="bindPickerChange" range-key="siteName" :range="venueList">
					<view class="uni-input">{{venue?venue:'请输入打卡场地'}}</view>
				</picker>
			</view>
		</view>

		<!-- 提交按钮 -->
		<button class="sub" v-if="code!=0" :disabled="imageSrc==null||position=='点击获取地址信息'||venue==null"
			@click="upLoadPhoto()">考勤打卡</button>

		<view class="nowTime" v-if="code!=0">{{checkTime}}</view>


		<!-- 打卡成功 -->
		<view class="bd" v-if="code==0">
			<icon style="margin-top: 140rpx;" type="success" color="#29c563" size="155rpx" />
			<text class="font1" style="margin-top: 30rpx;">打卡成功</text>
			<view class="address" style="margin-top: 40rpx;">
				<image :src="cdn+'/icon/location.svg'" mode="aspectFill"></image>
				<text class="font2">{{address==null?'':address}}</text>
			</view>
			<text class="font2 " style="margin-top: 16rpx;">{{time==null?'':time}}</text>
		</view>

		<!-- 返回主页 -->
		<button v-if="code==0" class="backIndex" @click="this.$win.back()">返回首页</button>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import QQMapWx from '@/qqmap-wx-jssdk.js'
	import moment from 'moment'
	const qqmapSdk = new QQMapWx({
		key: 'RBNBZ-5QRKD-ZZD42-PEYZU-25XGV-56BIK' // 在腾讯地图上申请的key
	})
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				path: this.$conf.BASE_HOST,
				// isSuccess: true,
				imageSrc: null, //图片路径
				position: '点击获取地址信息',
				latitude: null,
				longitude: null,
				gTime: null, //计时器名称
				checkTime: null,
				venue: null,
				siteId: '',
			}
		},
		computed: {
			...mapState({
				code: state => state.coachSection.checkCode,
				time: state => state.coachSection.time,
				address: state => state.coachSection.address,
				venueList: state => state.venue.venueListById,
			})
		},
		methods: {
			...mapActions({
				check_fun: 'coachSection/check',
				getVenueListById_fun: "venue/getVenueListById",
			}),
			//拿定位用户授权
			getAuth() {
				uni.authorize({
					scope: 'scope.userLocation',
					success:()=> {
						this.getLocation()
					},
					fail:()=> {
						this.$win.nlog('取消授权')
					}
				})
			},

			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						this.latitude = res.latitude
						this.longitude = res.longitude
						const {
							latitude,
							longitude
						} = res
						qqmapSdk.reverseGeocoder({
							location: latitude ? `${latitude},${longitude }` : '',
							sig: 'gfOfdUfdyWmTa5FMeFl6AXhXKEUSSYVo', // 这个sig就是上面要准备的第二项SK
							success: (val) => {
								console.log('这就是要获取的当前所在城市的相关信息', val)
								this.position = val.result.address
							},
							fail: (err) => {
								console.log('获取城市失败')
							}
						})
					}
				})
			},
			bindPickerChange(e) {
				this.venue = this.venueList[e.detail.value].siteName
				this.siteId = this.venueList[e.detail.value].id
			},
			//拍照或放图片
			takePhoto() {
				uni.authorize({
				    scope: 'scope.camera',
				    success:()=> {
				       uni.chooseImage({
				       	count: 1, //选择图片的上限
				       	sizeType: ['original', 'compressed'],
				       	sourceType: ['camera'],
				       	success: (res) => {
				       		console.log(res);
				       		this.$win.nlog('图片选择成功')
				       		this.imageSrc = res.tempFilePaths[0]
				       	},
				       	fail: (err) => {
				       		this.$win.nlog(err || '错误')
				       	}
				       })
				    },
					fail:()=>{
						this.$win.nlog('取消授权')
					}
				})
				// let that = this
				
			},
			//上传图片
			async upLoadPhoto() {
				uni.uploadFile({
					url: this.path + '/app/uploadFiles/upload',
					fileType: 'image',
					filePath: this.imageSrc,
					name: 'file', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
					header: {
						token: this.$db.getSync('token'),
					},
					data: {
						postion: this.position,
						userId: this.$db.getSync('userId'),
					},
					success: (res) => {
						console.log(res);
						if (res.statusCode == 200) {
							this.$win.nlog('上传成功')
							console.log('上传成功');
							this.check(res.data)
						} else {
							console.log('上传失败');
							this.$win.nlog('上传失败');
						}
					},
					fail: (err) => {
						console.log(err, '错误');
					}
				})
			},
			//获取当前时间
			getTime() {
				let dataArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				let year = moment().format('YYYY');
				let month = moment().format('M');
				let day = moment().format('DD');
				let date = moment().format('d');
				let hour = moment().format('HH');
				let min = moment().format('mm');
				let second = moment().format('ss');
				let time = year + '年' + month + '月' + day + '日' + dataArr[date] + hour + ':' + min + ':' + second
				this.checkTime = time
				// console.log(time);
			},
			async check(fName) {
				// console.log('tp',fName);
				let data = {
					userId: this.$db.getSync('userId'),
					registerTime: this.checkTime,
					longitude: this.longitude + '',
					latitude: this.latitude + '',
					siteName: this.position,
					venue: this.venue,
					id: this.siteId,
					fileName: fName,
				}
				let res = await this.check_fun(data)
			},
			//拿场地列表
			async getVenueList() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				await this.getVenueListById_fun(data)
			}
		},
		onShow() {
			this.getVenueList()
			this.getTime()
			this.gTime = setInterval(() => {
				this.getTime()
			}, 1000)
		},
		onHide() {
			// clearInterval(this.gTime)
		},
		onUnload() {
			clearInterval(this.gTime)
		},
		onLoad() {

		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f2f3f5;
	}

	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50rpx;
		width: 690rpx;
		// min-height: 566rpx;
		background: #ffffff;
		padding-bottom: 50rpx;
		border-radius: 16rpx;

		.takePhoto {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 80rpx;

			view {
				width: 212rpx;
				height: 212rpx;
				background: #f2f2f2;
				border-radius: 8rpx;
			}

			text {
				margin-top: 20rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}
		}

		.position {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 66rpx;
			width: 598rpx;
			height: 90rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			background: #f2f2f2;
			border-radius: 8rpx;

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			image {
				margin-left: 42rpx;
				width: 25rpx;
				height: 31rpx;
				// background-color: #29c563;
			}
		}

		.venue {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 598rpx;
			height: 90rpx;
			background: #f2f2f2;
			border-radius: 8rpx;
			margin-top: 30rpx;

			text {
				width: 172rpx;
				height: 90rpx;
				box-sizing: border-box;
				padding-left: 30rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
				line-height: 90rpx;
			}

			input {
				width: 488rpx;
				height: 90rpx;
			}
		}
	}

	.sub {
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

	.nowTime {
		margin-top: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
	}

	.bd {
		display: flex;
		flex-direction: column;
		align-items: center;
		// margin-top: 128rpx;
		width: 750rpx;
		height: 640rpx;
		background: #ffffff;

		.address {
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				margin-right: 7rpx;
				// background-color: #999999;
				width: 21rpx;
				height: 26rpx;
			}
		}

		.font1 {
			font-size: 32rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;
		}

		.font2 {
			font-size: 26rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #999999;
		}
	}

	.backIndex {
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