<!-- 邀请好友 -->
<template>
	<view>
		<view class="big">
			<image :src="cdn+'/background/invite/inviteBackground.png'" mode="aspectFill" class="background">
			</image>
			<image :src="QRcodePic" mode="aspectFill" class="QRcode"></image>
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
				baseUrl:this.$conf.BASE_HOST,
				QRcodePic: '',
			}
		},
		computed: {
			...mapState({
				QRcode: state => state.user.QRcode
			})
			
		},
		methods: {
			...mapActions({
				getQRcode_fun: 'user/getQRcode'
			}),
			//获取二维码数据
			async getQRcode() {
				let data = {
					userId: this.$db.getSync('userId'),
				}
				let res = await this.getQRcode_fun(data)
			},

			//不用vuex
			async QRrequest() {
				this.$win.loading('正在获取二维码')
				uni.request({
					url: this.baseUrl+'/app/qrcode/test',
					data: {
						userId: this.$db.getSync('userId'),
					},
					method: 'POST',
					responseType: "ArrayBuffer",//这个请求要求的响应数据类型为ArrayBuffer，所以不用vuex
					success: (res) => {
						this.$win.close('l')
						// console.log("获取buffer成功", res)
						const arrayBuffer = res.data
						// const base64 =uni.arrayBufferToBase64(arrayBuffer).replace("/\/","")
						// this.QRcodePic ='data:image/png;base64,'+ uni.arrayBufferToBase64(arrayBuffer).replace(/[\r\n]/g, "")
						this.QRcodePic=`data:image/jpeg;base64,${uni.arrayBufferToBase64(arrayBuffer)}`
						console.log('二维码', this.QRcodePic)
					}
				})
			},
		},
		onLoad() {
			
		},
		onShow() {
			this.QRrequest()
			// this.getQRcode()
		}
	}
</script>

<style>
	.big {
		position: relative;
		width: 750rpx;
		height: 1206rpx;

	}

	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		min-height: 100vh;
		width: 100vw;
		z-index: -1;
		background-color: burlywood;
	}

	.QRcode {
		position: absolute;
		top: 45vh;
		left: 206rpx;
		background-color: #fff;
		width: 338rpx;
		height: 338rpx;
		border-radius: 169rpx;
		z-index: 99;
	}
</style>
