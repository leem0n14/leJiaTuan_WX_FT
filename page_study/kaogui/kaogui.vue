<!-- 考规 -->
<template>
	<view>
		<view class="box">
			<view class="richText" v-html="examRule.rule" v-if="examRule.rule">
			</view>
			<view class="empty" v-else>暂未设置规则</view>
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
				courseCode: null,
			}
		},
		computed: {
			...mapState({
				examRule: state => state.study.examRule,
			})
		},
		methods: {
			...mapActions({
				getExamRule_fun: 'study/getExamRule'
			}),
			async getExamRule(subject) {
				let data = {
					userId: this.$db.getSync('userId'),
					subject,
				}
				await this.getExamRule_fun(data)
			},
		},
		onLoad(e) {
			console.log(e);
			
			this.courseCode = e.courseCode
			this.getExamRule(e.courseCode)
		}
	}
</script>

<style lang="scss">
	.box {
		margin: 42rpx 24rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 45rpx;
	}

	.br {
		width: 100%;
		height: 50rpx;
	}

	.empty {
		text-align: center;
		color: #999;
	}
</style>