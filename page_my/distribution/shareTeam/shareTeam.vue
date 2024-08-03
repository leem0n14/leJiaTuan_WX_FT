<!-- 分享团队 -->
<template>
	<view>
		<view class="hd">
			<view class="box">
				<image class="background" :src="cdn+path+'/myTeamBackground.png'" mode="aspectFit" ></image>
				<view class="text">我的团队(人)</view>
				<view class="teamNum">
					66
				</view>
			</view>
		</view>


		<view class="bd">
			<view class="nav">
				<view class="son" v-for="(k,i) in navArr" @click="isAct(k)">
					<text :style="{'color':k.isAct?'#29C563':''}">{{k.name+'('+k.num+')'}}</text>
					<view class="border" v-show="k.isAct"></view>
				</view>

			</view>
			<view class="noDistribution" v-if="!haveDistribution">
				<image :src="cdn+'/image/noList/noFenxiao.png'" mode="aspectFit" ></image>
				<text>暂无分销</text>
			</view>
			<view class="body" v-else>
				<view class="son" v-for="(k,i) in distributionMsg">
					<view class="up">
						<image :src="cdn+'/user/touxiang.png'" mode="aspectFill" style="background-color: #999999;"></image>
						<view class="name">{{k.name}}</view>
						<view class="registeredTime">注册时间：{{k.registeredTime}}</view>
						<view class="Recommender" v-show="(k.page==1)?false:true">推荐人：{{k.recommender}}</view>
						<view class="shareNum">分享{{k.shareNum}}人</view>
					</view>
					<view class="down">
						<view class="num">消费：{{k.consumeNum.toFixed(2)}}元</view>
						<view class="detailed" @click="$win.show('whoesOrder/whoesOrder')">
							Ta的订单
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
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				path:'/background/fenxiao',
				haveDistribution: false, //默认false
				navArr: [{
					name: '一级分销',
					num: 33,
					isAct: true,
				}, {
					name: '二级分销',
					num: 5,
					isAct: false,
				}, {
					name: '三级分销',
					num: 48,
					isAct: false,
				}],
				distributionMsg: [{
						page: 1,
						pic: '',
						name: '卢先生',
						registeredTime: '2018/12/21',
						shareNum: 13,
						consumeNum: 2222,
					},
					{
						page: 2,
						pic: '',
						name: '卢先生',
						registeredTime: '2018/12/21',
						recommender: '张三',
						shareNum: 13,
						consumeNum: 2222,
					},
					{
						page: 3,
						pic: '',
						name: '卢先生',
						registeredTime: '2018/12/21',
						recommender: '张三',
						shareNum: 18,
						consumeNum: 20022,
					}
				],
			}
		},
		methods: {
			...mapActions({
				getTeamList:'fenxiao/getShareTeam'
			}),
			isAct(k) {
				for (var a = 0; a < this.navArr.length; a++) {
					this.navArr[a].isAct = false
				}
				k.isAct = true
			},
			init() {
				if (this.distributionMsg.length == 0)
					this.haveDistribution = false
				else
					this.haveDistribution = true
			}
		},
		computed:{
			...mapState({
				teamList:state=>state.fenxiao.teamList
			})
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #29c563;
	// }
	
	page {
		background-color: #f2f3f5;
	}

	/* 上半start */
	.hd {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		height: 276rpx;
	}


	.hd .box {
		position: relative;
		width: 690rpx;
		height: 217rpx;
	}

	.hd image {
		position: absolute;
		top: 0;
		left: 0;
		width: 690rpx;
		height: 217rpx;
	}

	.hd .text {
		position: absolute;
		top: 51rpx;
		left: 40rpx;
		height: 31rpx;
		opacity: 0.6;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #60340a;
		line-height: 31rpx;
	}

	.hd .teamNum {
		position: absolute;
		top: 110rpx;
		left: 40rpx;
		height: 56rpx;
		font-size: 56rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #60340a;
		line-height: 56rpx;
	}

	/* 上半end */

	/* 下半start */
	.bd {}

	.nav {
		display: flex;
		width: 750rpx;
		height: 70rpx;
		background-color: #fff;
	}

	.nav .son {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 250rpx;
		height: 70rpx;
	}

	.nav .son text {
		margin-top: 22rpx;
		height: 26rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		color: #333333;
	}

	.nav .son .border {
		margin-top: 19rpx;
		width: 100rpx;
		height: 4rpx;
		background: #29c563;
	}


	.noDistribution {
		display: flex;
		flex-direction: column;
		margin: 193rpx auto 0;
		width: 326rpx;
	}

	.noDistribution image {
		width: 326rpx;
		height: 196rpx;
	}

	.noDistribution text {
		margin: 30rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 28rpx;
	}

	.body {
		width: 750rpx;
		margin-top: 10rpx;
	}

	.body .son {
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}

	.body .son .up {
		position: relative;
		width: 750rpx;
		height: 120rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		background: #ffffff;
	}


	.body .son .up image {
		position: absolute;
		top: 20rpx;
		width: 80rpx;
		height: 80rpx;
		background: rgba(0, 0, 0, 0.00);
		border-radius: 50%;
	}

	.body .son .up .name {
		position: absolute;
		top: 26rpx;
		left: 127rpx;
		height: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #111111;
		line-height: 30rpx;
	}


	.body .son .up .Recommender {
		position: absolute;
		top: 72rpx;
		right: 30rpx;
		height: 22rpx;
		font-size: 22rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #999999;
		line-height: 22rpx;
	}

	.body .son .up .registeredTime {
		position: absolute;
		left: 127rpx;
		top: 72rpx;
		height: 23rpx;
		font-size: 22rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 23rpx;
	}

	.body .son .up .shareNum {
		position: absolute;
		top: 28rpx;
		right: 30rpx;
		height: 26rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #111111;
		line-height: 26rpx;
	}

	.body .son .down {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 690rpx;
		height: 80rpx;
		margin: 0 auto;
		box-sizing: border-box;
		background: #ffffff;
		border-bottom: 2rpx solid #ededed;
	}

	.body .son .down .num {
		height: 26rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 26rpx;
	}

	.body .son .down .detailed {
		height: 26rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #4988f5;
		line-height: 26rpx;
	}

	/* 下半end */
</style>
