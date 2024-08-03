<!-- 拼团 -->
<template>
	<view>
		<!-- 无拼团 -->
		<!-- <view class="noPintuan" v-if="statu==1">
			<image :src="cdn+'/image/noList/noPintuan.png'" mode="aspectFit"></image>
			<view class="text">
				暂无拼团
			</view>
		</view> -->

		<!-- 拼团中 -->
		<!-- 记得改成！ -->
		<view class="pting" v-if="true">
			<view class="header">
				<image :src="cdn+'/background/pintuanSucceedBackground.png'" mode="aspectFit" class="bg"></image>
				<icon type="success_no_circle" color="#fff" size="60rpx" class="tick" />
				<!-- <image src="" mode="aspectFit" class="tick"></image> -->
				<view class="text">开团成功</view>
			</view>
			<view class="ptMsg">
				<image :src="cdn+'/image/goods/common/goods_2.png'" mode="aspectFit"></image>
				<view class="name">{{pintuanMsg.goodMsg.name}}</view>
				<view class="price">￥{{pintuanMsg.goodMsg.price}}</view>
				<view class="stages">{{pintuanMsg.goodMsg.stages}}</view>
			</view>
			<view class="footer">
				<view class="title">
					还差<text
						style="font-size: 60rpx;height: 60rpx;color: #f93030;line-height: 29rpx;">1</text>人拼团成功，快去邀请好友吧
				</view>
				<view class="time">
					<view class="longer"></view>
					<text class="text">剩余</text>
					<uni-countdown :font-size="15" color="#fff" background-color="#000" :show-day="false"
						:hour="pintuanMsg.countDown.h" :minute="pintuanMsg.countDown.m"
						:second="pintuanMsg.countDown.s"></uni-countdown>
					<text class="text">结束</text>
					<view class="longer"></view>
				</view>
				<view class="userPic">
					<view class="box">
						<image class="son" :src="cdn+'/user/touxiang2.png'" mode="aspectFill"></image>
						<!-- <image class="pinZhu" src="" mode="aspectFit"></image> -->
						<view class="pinZhu">拼主</view>
					</view>
					<view class="box">
						<image class="son" :src="cdn+'/image/user/null.png'" mode="aspectFill"></image>
					</view>
				</view>
				<button class="invite" open-type="share">邀请好友</button>
				<button class="toIndex" @click="$win.show('../../index/index')">返回首页</button>
			</view>
		</view>

		<!-- 拼团成功 -->
		<view class="ptSucceed" v-else>
			<view class="hd">
				<view class="title">
					<icon type="success" color="#f83030" size="50rpx" />
					<view class="text">拼团成功</view>
				</view>
				<view class="touXiang">
					<image :src="cdn+'/image/pintuan/pintuanBackground.png'" mode="aspectFit" class="picBg"></image>
					<view class="pz">拼主</view>
					<!-- 拼主头像 -->
					<image :src="cdn+'/user/touxiang1.png'" mode="aspectFill" class="user"
						style="background-color: #f2f3f5;"></image>
					<!-- 拼友头像 -->
					<image :src="cdn+'/user/touxiang2.png'" mode="aspectFill" class="user"
						style="background-color: #f2f3f5;"></image>
				</view>
			</view>
			<view class="bd">
				<image :src="cdn+'/image/goods/common/goods_2.png'" mode="aspectFill" style="background-color: #999;">
				</image>
				<view class="name">{{pintuanMsg.goodMsg.name}}</view>
				<view class="price">￥{{pintuanMsg.goodMsg.price}}</view>
			</view>
		</view>
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
				cdn: this.$conf.CDN_HOST,
				// statu: 2,
				id: null, //拼团id
				// 拼团信息
				pintuanMsg: {
					goodMsg: { //商品信息
						pic: '',
						name: '专车空调全包班',
						price: 12000.00,
						stages: '分3期（0手续费），￥4000.00/期',
					},
					countDown: { //倒计时参数
						h: 2,
						m: 0,
						s: 0,
					},
					master: { //拼主信息
						name: '',
						phone: '',
						pic: '',
					},
					member: { //拼友
						name: '',
						phone: '',
						pic: '',
					}
				},
			}
		},
		computed: {
			...mapState({
				pintuanMsgs: state => state.goods.pintuanMsg
			})

		},
		methods: {
			...mapActions({
				getPintuanMsg_fun: 'goods/getPintuan'
			}),
			init() {
				//判断是否有拼团和是否成功拼团，给havePintuan和isSucceed赋值
				let k1 = this.pintuanMsg
				if (JSON.stringify(k1) === '{}') {
					this.havePintuan = false
				} else {
					this.havePintuan = true
					let k2 = this.pintuanMsg.member
					if (JSON.stringify(k2) === '{}') {
						this.isSucceed = false
					} else {
						this.isSucceed = true
					}
				}
				console.log(this.havePintuan ? '有拼团' : '无拼团')
				console.log(this.isSucceed ? '拼团成功' : '未拼团成功')
			},
			async getPintuanMsg() {
				let data = {
					userId: this.$db.getSync('userId'),
					id:this.id,
				}
				let res = await this.getPintuanMsg_fun(data)
			}
		},
		onShareAppMessage(res) {
			function success() {
				this.$win.nlog('分享成功')
			}

			function fail(err) {
				this.$win.nlog('分享失败:' + err)
			}
			if (res.from === 'menu') {
				return {
					title: '拼团分享',
					path: `/page_my/pinTuan/pinTuan?id=${1}`,
					imageUrl: ``,
					success,
					fail,
				};
			} else if (res.from === 'button') {
				return {
					title: '拼团分享',
					path: `/page_my/pinTuan/pinTuan?id=${1}`,
					imageUrl: ``,
					success,
					fail,
				};
			}

		},
		onLoad(e) {
			this.init()
			this.id = e.id
		},
		onShow() {

		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #c1c1c1;
	// }

	page {
		background-color: #F2F3F5;
	}

	/* 没有拼团start */
	.noPintuan {
		position: relative;
		top: 290rpx;
		left: 212rpx;
		width: 326rpx;
		/* background-color: pink; */
	}

	.noPintuan image {
		width: 326rpx;
		height: 174rpx;
	}

	.noPintuan .text {
		margin: 30rpx auto 0;
		width: 112rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 28rpx;
	}

	/* 没有拼团end */

	/* 拼团中start */
	/* 头部start */
	.header {

		position: relative;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 249rpx;
	}

	.header .bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 249rpx;
		z-index: -1;
	}

	.header .tick {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 25rpx;
		left: 315rpx;
		width: 80rpx;
		height: 80rpx;
		padding: 10rpx;
		border-radius: 50%;
		border: 5rpx solid #fff;
	}

	.header .text {
		position: absolute;
		top: 169rpx;
		left: 295rpx;
		width: 160rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #ffffff;
		line-height: 40rpx;
	}

	/* 头部end */
	/* 信息start */
	.ptMsg {
		position: relative;
		width: 750rpx;
		height: 240rpx;
		background: #ffffff;
	}

	.ptMsg image {
		position: absolute;
		top: 30rpx;
		left: 30rpx;
		width: 180rpx;
		height: 180rpx;
	}

	.ptMsg .name {
		position: absolute;
		top: 50rpx;
		left: 240rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #333333;
		line-height: 32rpx;
	}

	.ptMsg .price {
		position: absolute;
		top: 99rpx;
		left: 240rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #f93030;
		line-height: 40rpx;
	}

	.ptMsg .stages {
		position: absolute;
		top: 165rpx;
		left: 240rpx;
		height: 26rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 26rpx;
	}

	/* 信息end */

	/* footer部分start */
	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		width: 750rpx;
		height: 717rpx;
		background-color: #fff;
	}

	.footer .title {
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 32rpx;
	}

	/* 倒计时start */
	.footer .time {
		display: flex;
		align-items: center;
		justify-content: center;
		display: flex;
		width: 100%;
		height: 56rpx;
	}

	.time .longer {
		width: 130rpx;
		height: 2rpx;
		background: #c1c1c1;
	}

	.time .text {
		margin: 0 14rpx;
		width: 60rpx;
		height: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 30rpx;
	}

	/* 倒计时end */

	/* 头像start */
	.userPic {
		position: relative;
		display: flex;
		justify-content: center;
		height: 120rpx;
		width: 100%;
	}

	.userPic .box {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 16rpx;
		width: 120rpx;
		height: 120rpx;
	}

	.box .son {
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.box .pinZhu {
		position: absolute;
		bottom: 0rpx;
		z-index: 2;
		width: 70rpx;
		height: 35rpx;
		line-height: 35rpx;
		border-radius: 17.5rpx;
		box-sizing: border-box;
		border: 2rpx solid #fff;
		background-color: #f93030;
		color: #ffffff;
		text-align: center;
		font-size: 20rpx;
	}

	/* 头像end */

	/* 按钮start */
	.footer button {
		width: 580rpx;
		height: 90rpx;
		border-radius: 45rpx;
	}

	.footer .invite {
		background: #f93030;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 90rpx;
	}

	.footer .toIndex {
		box-sizing: border-box;
		border: 1rpx solid #f93030;
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #f93030;
		line-height: 90rpx;
	}

	/* 按钮end */

	/* footer部分end */

	/* 拼团中end */


	/* 拼团成功start */
	.ptSucceed {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* hd部分start */
	.ptSucceed .hd {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 360rpx;
		background: #ffffff;
	}

	.hd .title {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title image {
		width: 50rpx;
		height: 50rpx;
	}

	.title .text {
		margin-left: 14rpx;
		width: 160rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #f93030;
		line-height: 35rpx;
	}

	.touXiang {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 309rpx;
		height: 145rpx;
		margin-top: 30rpx;
	}


	.touXiang .picBg {
		position: absolute;
		top: 0;
		left: 0;
		width: 309rpx;
		height: 145rpx;
		/* z-index: -1; */
	}

	.touXiang .user {
		margin: 0 20rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.touXiang .pz {
		position: absolute;
		bottom: 0rpx;
		left: 44rpx;
		width: 70rpx;
		height: 35rpx;
		line-height: 35rpx;
		border-radius: 17.5rpx;
		box-sizing: border-box;
		border: 2rpx solid #fff;
		background-color: #f93030;
		color: #ffffff;
		text-align: center;
		font-size: 20rpx;
	}

	/* hd部分end */

	/* bd部分start */
	.ptSucceed .bd {
		position: relative;
		width: 750rpx;
		height: 240rpx;
		background-color: #fff;
	}

	.ptSucceed .bd image {
		position: absolute;
		top: 30rpx;
		left: 30rpx;
		width: 180rpx;
		height: 180rpx;
		border-radius: 4rpx;
	}

	.ptSucceed .bd .name {
		position: absolute;
		top: 50rpx;
		left: 240rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #333333;
		line-height: 32rpx;
	}

	.ptSucceed .bd .price {
		position: absolute;
		left: 240rpx;
		top: 99rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #f93030;
		line-height: 40rpx;
	}

	/* bd部分end */
	/* 拼团成功end */
</style>