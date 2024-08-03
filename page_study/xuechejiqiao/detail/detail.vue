<template>
	<!-- 学车技巧 -->
	<view class="view">
		<view class="empty" v-if="!detail.text">
			管理员未添加富文本
		</view>
		<view class="richText" v-html="detail.text" v-else></view>
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
				getDetail_fun: 'study/getInformDetail2',
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
					return state.study.datail2
				}
			})
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail(e.id)
		}
	}
</script>

<style lang="scss">
	.view {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>