
<template>
	<!-- 考试秘籍详细 -->
	<view>
		<view class="body">
			<!-- <text>sssssssssssssssssssssssssssssssssss</text> -->
			<view class="" v-if="!detail.text">
				<text>管理员未添加富文本</text>
			</view>
			<view style="width: 100%;" v-else v-html="detail.text" class="richText"></view>
			<!-- <view class="title">
				倒车入库技巧图解
			</view>
			<view class="step" v-for="k in 4">
				<text>自从驾考改革之后，考场上已经看不见标杆了，有的只是地上的黄线，而且还取消了移库。没有标杆这倒库可要怎么倒进去呀，今天就给大家准备全新的科目二倒车入库技巧。</text>
				<image src="" mode="aspectFit" style="background-color: skyblue;"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				// richText: '',
				id: '',
			}
		},
		methods: {
			...mapActions({
				getDetail_fun: 'study/getInformDetail1'
			}),
			async getDetail(id) {
				let data = {
					id,
				}
				await this.getDetail_fun(data)
			}
		},
		computed: {
			...mapState({
				detail:state=>{
					console.log(state.study.datail2,"aaaaaaaaaaaaaa")
					return state.study.datail2
				}
			})
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail(e.id)
			// console.log()
			// this.richText=e.richText
		}
	}
</script>

<style lang="scss">
	page {}


	.body {
		padding: 0 30rpx;
		width: 750rpx;
		box-sizing: border-box;

		.title {
			margin: 50rpx 0;
			font-size: 44rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Bold;
			font-weight: 700;
			text-align: left;
			color: #333333;
		}

		.step {
			display: flex;
			flex-direction: column;
			margin: 30rpx 0;
			padding: 30rpx 0;
			border-bottom: 2rpx solid #ededed;

			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
				margin-bottom: 30rpx;
			}

			image {
				width: 690rpx;
				height: 386rpx;
			}
		}
	}
</style>