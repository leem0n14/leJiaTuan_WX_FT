<template>
	<view>
		<button @click="$win.show('/page_coachSection/coachSection')">进入教练端</button>
		<button @click="$win.show('/page_shopping/shopping')">商品页</button>
		<image :src="cdn+'/user/touxiang.png'" mode="aspectFill"
			style="width: 75rpx; height: 75rpx;border-radius: 50%;"></image>
		<video src="http://119.91.194.65:8088/1.MP4"></video>
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
				path: '',
				// path:"D:\Users\lwl\Desktop\1.xlxs",
			}
		},
		methods: {
			
		},
		onShow() {

		}
	}
</script>

<style>

</style>
