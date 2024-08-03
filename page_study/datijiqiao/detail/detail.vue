<template>
	<view class="empty" v-if="!msg.text">
		管理员未设置富文本
	</view>
	<view v-else v-html="msg.text">

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

			}
		},
		computed: {
			...mapState({
				msg: state => state.study.datail3
			})
		},
		methods: {
			...mapActions({
				getDetail_fun: 'study/getInformDetail3',
			}),
			async getDetail(id) {
				let data = {
					id,
				}
				await this.getDetail_fun(data)
			}
		},
		onLoad(e) {
			console.log('id', e.id);
			this.getDetail(e.id)
		}
	}
</script>

<style lang="scss">
</style>