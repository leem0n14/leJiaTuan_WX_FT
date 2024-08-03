<!-- 我的收藏 -->
<template>
	<view>
		<view class="hd">
			<view class="box">
				<image class="bg" :src="cdn+'/background/myShoucang.png'" mode="aspectFill"></image>
				<view class="content">
					<image class="icon" :src="cdn+'/icon/study/shoucang.svg'" mode="aspectFill"></image>
					<text>我的收藏</text>
					<view class="num">{{collect_List?collect_List.length:0}}</view>
				</view>
			</view>
		</view>

		<view class="bd">
			<view class="son" v-for="(k,i) in collect_List" @click="toDetail(k.questionId)">
				
				<text class="son-text">{{i+1}}. {{k.titleInformation}}</text>
				
				<view class="num">
					<text>{{k.num}}</text>
					<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFill"></image>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
import { mapState,mapActions } from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				// sum: 0,
				shoucangList: [{
						text: '道路交通安全法律、法规和规章',
						num: 11,
					},
					{
						text: '安全行车、文明驾驶基础知识',
						num: 2,
					},
					{
						text: '机动车驾驶操作相关基础知识',
						num: 3,
					},
					{
						text: '交通信号',
						num: 12,
					}
				],
				couSt:'',
			}
		},
		methods: {
			...mapActions({
				collectList_fun: 'study/collectList',
			}),
			
			async collectListll() {
				let data = {
					course:this.couSt,
					userId:this.$db.getSync('userId')
				}
				let res = await this.collectList_fun(data)
			},
			toDetail(e){
				console.log(e, 'lll');
				this.$win.show('/page_study/lianti/lianti?questionId=' + e + '&type=' + '我的收藏'+'&courseCode='+this.couSt)
			}
		},
		onLoad(e) {
			// console.log(e,'科目')
			this.couSt=e.courseCode
			this.getSum()
		},
		onShow() {
			this.collectListll()
		},
		computed:{
			...mapState({
				collect_List: state => state.study.collect_List,
			}),
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #fd7828;
	// }
	
	page {
		background-color: #f2f3f5;
	}

	.hd {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		width: 750rpx;
		height: 331rpx;

		.box {
			position: relative;
			width: 702rpx;
			height: 271rpx;

			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 702rpx;
				height: 271rpx;
			}

			;

			.content {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 2;
				width: 702rpx;
				height: 271rpx;

				image {
					position: absolute;
					top: 44rpx;
					left: 38rpx;
					width: 36rpx;
					height: 35rpx;
					opacity: 0.58;
				}

				;

				text {
					position: absolute;
					top: 46rpx;
					left: 93rpx;
					height: 35rpx;
					line-height: 35rpx;
					font-size: 32rpx;
					font-weight: 400;
					text-align: left;
					color: #ffffff;
				}

				;

				.num {
					position: absolute;
					top: 125rpx;
					left: 93rpx;
					font-size: 91rpx;
					font-weight: 700;
					text-align: left;
					color: #ffffff;
				}
			}
		}
	}

	.bd {
		display: flex;
		flex-direction: column;
		padding: 12rpx 24rpx;
		background-color: #ffffff;

		.son {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 98rpx;
			width: 702rpx;

			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
			}
			
			.son-text{
				overflow:hidden;
				        white-space: nowrap;
				        text-overflow: ellipsis;
			}
			
			.num {
				display: flex;
				align-items: center;

				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #c1c1c1;
				}

				image {
					margin: 5rpx 0 0 10rpx;
					width: 17rpx;
					height: 17rpx;
				}
			}
		}
	}
</style>
