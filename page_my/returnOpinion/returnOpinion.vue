<!-- 反馈意见 -->
<template>
	<view>
		<form action="#" @submit="formSubmit">
			<textarea name="userOpinion" id="userOpinion" cols="30" rows="10" maxlength="300" class="userOpinion"
				placeholder="请输入您的意见反馈~" placeholder-class="placeholder" v-model="text" @input="input">
			</textarea>
			<view class="num">{{text.length}}/300</view>
			<button form-type="submit" :disabled="isDisabled">提交</button>
		</form>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				text: '',
				isDisabled: true,
			}
		},
		methods: {
			...mapActions({
				push_feedBack:'user/feedBack',
			}),
			input() {
				if (this.text.length != 0)
					this.isDisabled = false
				else
					this.isDisabled = true
			},
			formSubmit(e) {
				console.log('表单提交')
				console.log(this.text)
				this.pushFeedBack()
				// this.text = ''
			},
			async pushFeedBack(){
				let data={
					userId:this.$db.getSync('userId'),
					message:this.text
				}
				let res =await this.push_feedBack(data)
			},
		},
		computed:{
			...mapState({
				feedBackRes:state=>state.user.feedBackRes,
			})
		},
		onLoad() {
			
		},
		onShow() {
			
		}
	}
</script>

<style>
	.userOpinion {
		box-sizing: border-box;
		margin: 60rpx auto 0;
		padding: 30rpx;
		width: 690rpx;
		height: 509rpx;
		background: #f5f5f5;
		border-radius: 16rpx;
	}

	.placeholder {
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 28rpx;
	}

	.num {
		margin: 16rpx 30rpx 0 0;
		height: 26rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: right;
		color: #c1c1c1;
		line-height: 26rpx;
	}

	button {
		margin: 100rpx auto 0;
		width: 580rpx;
		height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 90rpx;
	}
</style>
