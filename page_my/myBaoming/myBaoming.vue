<template>
	<div class="body">
		<div class="ul">
			<view class="li" v-for="k,i in list" :key="i"
				@click="toBaoming(k.statu,k.id,k.stuSex,k.stuName,k.stuPhone,k.schoolName,k.coachId,k.cardFront,k.cardBack,k.photo,k.tijianbiao,k.coachName,k.cardAd,k.cardId)">
				<view class="msg">
					<view class="img">
						<image :src="cdn+(k.photo?'/student/'+k.photo:'/image/user/null.png')" mode="aspectFill">
						</image>
					</view>
					<view class="text">
						<view class="up">
							<view class="name">{{k.stuName}}</view>
							<view class="phone">{{k.stuPhone}}</view>
						</view>
						<view class="down">
							报名驾校：{{k.schoolName}}
						</view>
					</view>
					<view class="statu">
						<button class="pingjia" v-if="k.statu===null">填写资料</button>
						<button class="pingjia" v-else-if="k.statu===1">已通过</button>
						<button class="pingjia1" v-else-if="k.statu===2">未通过</button>
						<button class="pingjia" :disabled="true" v-else-if="k.statu===0">审核中</button>
					</view>
				</view>
				<view class="noReason" v-show="k.statu===2">
					<span style="font-weight: 600;color: red;">不同意原因:</span>{{k.noReason}}
				</view>
			</view>
		</div>

	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex"
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
			}
		},
		computed: {
			...mapState({
				list: state => state.my.baomingList
			})
		},
		methods: {
			...mapActions({
				getList_fun: 'my/getBaomingList',
			}),
			toBaoming(statu, id, stuSex, stuName, stuPhone, school, coachId, cardFront, cardBack, photo, tijianbiao,
				coachName, cardAd, cardId) {
				// if (statu === 1) {
				// 	this.$win.nlog('审核已通过，不可修改')
				// 	return
				// }
				this.$win.show('/page_my/myBaoming/toBaoming/toBaoming?id=' + id + '&stuName=' + stuName + '&stuSex=' +
					stuSex + '&stuPhone=' + stuPhone +
					'&school=' + school + '&coachId=' + coachId + '&cardFront=' + cardFront + '&cardBack=' + cardBack +
					'&photo=' + photo + '&tijianbiao=' + tijianbiao + '&coachName=' + coachName + '&cardAd=' + cardAd +
					'&cardId=' + cardId+'&statu='+statu)
			},
			async getList() {
				let data = {
					userId: this.$db.getSync('userId'),
				}
				let res = await this.getList_fun(data)
				
				
			}
		},
		onShow() {
			this.getList()
		},
		onLoad(e) {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.body {}

	.ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;

		.li {

			display: flex;
			flex-direction: column;
			// align-items: center;
			margin: 2rpx 0;
			padding: 30rpx 24rpx;
			width: 100%;
			min-height: 170rpx;
			background-color: #fff;
			box-sizing: border-box;

			.msg {
				display: flex;
				align-items: center;

				// justify-content: center;
				.img {
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 16rpx 0 0;

					image {
						width: 110rpx;
						height: 110rpx;
						// background-color: #333333;
						border-radius: 50%;
					}
				}

				.text {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					text-align: left;
					height: 100%;

					.up {
						display: flex;
						align-items: flex-end;

						.name {
							height: 32rpx;
							font-size: 32rpx;
							font-weight: 500;
							color: #333333;
							line-height: 32rpx;
						}

						.phone {
							height: 28rpx;
							font-size: 28rpx;
							font-weight: 400;
							color: #666666;
							line-height: 28rpx;
						}
					}

					.down {
						// width: 234rpx;
						height: 26rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #666666;
						line-height: 26rpx;
					}
				}

				.statu {
					.pingjia {
						margin-left: 80rpx;

						height: 60rpx;
						background: linear-gradient(134deg, #54d685, #29c563 99%);
						border-radius: 30rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 60rpx;
					}

					.pingjia1 {

						margin-left: 80rpx;
						height: 60rpx;
						background: linear-gradient(134deg, #F44336, #F44336 99%);
						border-radius: 30rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 60rpx;
					}
				}

			}

			.noReason {
				margin: 20rpx 0;
				padding: 5rpx 0;
				border-top: 1rpx solid #ddd;
				box-sizing: border-box;

			}
		}





	}
</style>