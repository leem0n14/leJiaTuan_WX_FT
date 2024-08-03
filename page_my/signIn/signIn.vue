<!-- 签到 -->
<template>
	<view>
		<image class="background" :src="cdn+'/background/signInBackground.png'" mode="aspectFit"></image>
		<view class="content">
			<view class="userMsg">
				<text>我的积分</text>
				<view class="detailed" @click="$win.show('detailed/detailed')">
					<image :src="cdn+'/icon/signIn/recordIcon.svg'" mode="aspectFit"></image>
					<view>积分明细</view>
				</view>
				<view class="num">{{(points==null)?0:points}}</view>
			</view>
			<view class="signIn">
				<view class="title">
					已连续签到<text style="color: #29C563;margin: 0 10rpx;">{{days==null?0:days}}</text>天
				</view>
				<view class="box">
					<view class="son" v-for="index in 7" :key="index"
						:style="{'background':(days>=(index+1))?'linear-gradient(134deg,#54d685, #29c563 99%)':''}"
						@click="(days==index)?signIn():''">
						<image :src="cdn+golds(index+1)" mode="aspectFill"></image>
						<text
							:style="{'color':(days>=(index+1))?'#fff':''}">{{(days>=(index+1))?'已签':'第'+(index+1)+'天'}}</text>
					</view>
				</view>
			</view>
			<view class="shop">
				<view class="title">积分商城</view>
				<view class="boxes">
					<view class="empty" v-if="goods&&goods.length===0">
						暂无上架商品
					</view>
					<view class="goodBox" v-for="(k,i) in goods" v-else>
						<image :src="cdn+k.pic" mode="aspectFill"></image>
						<text>{{k.name}}</text>
						<view class="getIt">
							{{k.price}}积分
						</view>
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
	import moment from 'moment'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				// days: 4, //已签到天数
				goods: [
					// {
					// 	pic: '/user/touxiang.png',
					// 	name: '商品名',
					// 	price: 1000,
					// },
					// {
					// 	pic: '/user/touxiang.png',
					// 	name: '商品名',
					// 	price: 1000,
					// },
					// {
					// 	pic: '/user/touxiang.png',
					// 	name: '商品名',
					// 	price: 1000,
					// },
					// {
					// 	pic: '/user/touxiang.png',
					// 	name: '商品名',
					// 	price: 1000,
					// },
					// {
					// 	pic: '/user/touxiang.png',
					// 	name: '商品名',
					// 	price: 1000,
					// },
					// {
					// 	pic: '/user/touxiang.png',
					// 	name: '商品名',
					// 	price: 1000,
					// },
				]
			}
		},
		computed: {
			...mapState({
				days: state => state.signIn.signInDays,
				points:state=>state.signIn.point,
				shopList: state => state.signIn.shopList,
				signState:state=>state.signIn.isSignIn,
				signMsg:state=>state.signIn.signMsg
			})
		},

		methods: {
			...mapActions({
				toSignIn_fun: 'signIn/toSignIn',
				getSignInDays_fun: 'signIn/getSignInDays',
				getShop_fun: 'signIn/getShop',
				isSign_fun:'signIn/isSignIn',
			}),
			signIn(){
				if(this.signState==true){
					this.$win.nlog('今天已签到,请明天再来')
				}
				else if(this.signState==false){
					this.toSignIn()
				}
				else {
					this.$win.nlog('错误')
					console.log(this.signState);
				}
			},
			async toSignIn() {
				let time = new Date()
				let day = time.getTime()
				console.log('时间戳',day);
				// let date=time.getDate()+1
				console.log('userId', this.$db.getSync('userId'))
				console.log('token',this.$db.getSync('token'));
				let sign = {
					signData:day,
					lastDay:day-24*3600*1000,
					userId: this.$db.getSync('userId'),
				}
				let res = await this.toSignIn_fun(sign)
				if(this.signMsg.code==0)
				{
					this.getSignInDays()
					this.isSignIn()
					this.$win.nlog('签到成功')
				}
				else{
					this.getSignInDays()
					this.isSignIn()
					this.$win.nlog('签到失败')
				}
			},
			async getSignInDays() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getSignInDays_fun(data)
			},
			async isSignIn(){
				let time = new Date()
				let day = time.getTime()
				console.log('时间戳',day)
				let sign = {
					signData:day,
					userId: this.$db.getSync('userId'),
				}
				let res = await this.isSign_fun(sign)
			},
			async getShop() {
				let data = {}
				let res = await this.getShop_fun(data)
			},
			//不同的签到天数返回不同的积分数
			golds(i) {
				if (i == 4)
					return '/icon/signIn/gold_30.svg'
				else if (i == 7)
					return '/icon/signIn/gold_50.svg'
				else
					return '/icon/signIn/gold_10.svg'
			},

		},
		onShow() {
			this.getSignInDays()
			this.isSignIn()
		}

	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #ffbf26;
	// }
	page {
		background-color: #f2f3f5;
	}

	.background {
		position: relative;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 400rpx;
		z-index: -1;
	}

	.content {
		position: relative;
		top: -400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
	}


	/* 用户信息start */

	.userMsg {
		position: relative;
		height: 240rpx;
		width: 690rpx;
	}

	.userMsg text {
		position: absolute;
		top: 58rpx;
		left: 0;
		height: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #412d00;
		line-height: 30rpx;
	}

	.userMsg .num {
		position: absolute;
		top: 94rpx;
		left: 0;
		height: 106rpx;
		font-size: 80rpx;
		font-family: Roboto, Roboto-Medium;
		font-weight: 500;
		text-align: left;
		color: #412d00;
		line-height: 106rpx;
	}

	.userMsg .detailed {
		position: absolute;
		right: -30rpx;
		top: 41rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 197rpx;
		height: 64rpx;
		opacity: 0.9;
		background: #ffffff;
		border-radius: 32rpx 0rpx 0rpx 32rpx;
	}

	.userMsg .detailed image {
		width: 30rpx;
		height: 32rpx;
		margin-right: 8rpx;
	}


	.userMsg .detailed view {
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #111111;
	}

	/* 用户信息end */

	/* 签到start */
	.signIn {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 690rpx;
		height: 240rpx;
		box-sizing: border-box;
		padding: 0 24rpx;
		background: #ffffff;
		border-radius: 16rpx;
	}

	.signIn .title {
		height: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #111111;
		line-height: 30rpx;
	}

	.signIn .box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 642rpx;
		height: 120rpx;
	}

	.signIn .box .son {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 80rpx;
		height: 120rpx;
		background: #f2f3f5;
		border-radius: 8rpx;
	}

	.signIn .box .son image {
		width: 68rpx;
		height: 68rpx;
	}

	.signIn .box .son text {
		font-size: 22rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #111111;
	}

	/* 签到end */

	/* 商城start */
	.shop {
		display: flex;
		flex-direction: column;
		width: 690rpx;
		height: 240rpx;
		margin-top: 20rpx;
	}

	.shop .title {
		margin: 29rpx 0;
		height: 34rpx;
		border: 1rpx solid rgba(0, 0, 0, 0.00);
		font-size: 34rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #333333;
		line-height: 34rpx;
	}

	.shop .boxes {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 690rpx;
		.empty{
			text-align: center;
			color: #999;
			// background-color: #fff;
			width: 100%;
		}
	}


	.shop .boxes .goodBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 216rpx;
		height: 330rpx;
		margin-bottom: 22rpx;
		box-sizing: border-box;
		background: #ffffff;
		border-radius: 16rpx;
	}

	.shop .boxes .goodBox image {
		margin-top: 20rpx;
		width: 176rpx;
		height: 176rpx;
		background: rgba(0, 0, 0, 0.00);
		border-radius: 8rpx;
	}

	.shop .boxes .goodBox text {
		margin-top: 16rpx;
		max-width: 160rpx;
		height: 22rpx;
		font-size: 22rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #111111;
		line-height: 22rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.shop .boxes .goodBox .getIt {
		margin-top: 24rpx;
		width: 166rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		color: #ffbb1e;
		background: #ffffff;
		border: 1rpx solid #ffbb1e;
		border-radius: 25rpx;
	}

	/* 商城end */
</style>
