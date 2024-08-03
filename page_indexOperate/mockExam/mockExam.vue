//模拟考试
<template>
	<view>
		<button @click="get" style="background-color: goldenrod;">getLocation</button>
	</view>
</template>

<script>
	import QQMapWx from '@/qqmap-wx-jssdk.js'
	const qqmapSdk = new QQMapWx({
		key: 'RBNBZ-5QRKD-ZZD42-PEYZU-25XGV-56BIK' // 在腾讯地图上申请的key
	})
	export default {
		data() {
			return {

			}
		},
		methods: {
			//获取微信定位授权方法
			getAuthorize() {
				uni.authorize({
					scope: 'scope.userLocation',
					success: (res) => {
						this.getLocation()
					},
					fail: (err) => {
						uni.showModal({
							content: '需要授权位置信息',
							confirmText: '确认授权'
						}).then(res => {
							if (res['confirm']) {
								uni.openSetting({
									success: res => {
										if (res.authSetting['scope.userLocation']) {
											uni.showToast({
												title: '授权成功',
												icon: 'none'
											})
											
										} else {
											uni.showToast({
												title: '授权失败',
												icon: 'none'
											})
										}
										this.getLocation()
									}
								})
							}
							if (res['cancel']) {
								// 取消授权
								console.log('取消授权')
								this.getLocation()
							}
						})
					}
				})
			},
			//开始获取定位方法
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						const {
							latitude,
							longitude
						} = res
						qqmapSdk.reverseGeocoder({
							location: latitude ? `${latitude},${longitude }` : '',
							sig: 'gfOfdUfdyWmTa5FMeFl6AXhXKEUSSYVo', // 这个sig就是上面要准备的第二项SK
							success: (val) => {
								console.log('这就是要获取的当前所在城市的相关信息', val)
							},
							fail: (err) => {
								console.log('获取城市失败')
							}
						})
					},
					fail: (err) => {
						if (err.errMsg === 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF' || err
							.errMsg === 'getLocation:fail system permission denied') {
							uni.showModal({
								content: '请开启手机定位服务',
								showCancel: false
							})
						} else if (err.errMsg === 'getLocation:fail:system permission denied') {
							uni.showModal({
								content: '请给微信开启定位权限',
								showCancel: false
							})
						}
					}
				})
			},
			get() {
				console.log('111')
				this.getAuthorize()
				this.getLocation()
			}

		}
	}
</script>

<style>

</style>
