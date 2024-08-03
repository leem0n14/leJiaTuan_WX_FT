<!-- 学车技巧 -->
<template>
	<view>
		<view class="body">
			<!-- <text>aaaaaaaaaaaaaaaaaaa</text> -->
			<!-- 		<view class="richText" v-html="informationList1.text" v-if="informationList1.text">
			</view>
			<view else>暂未设置考试秘籍</view> -->
			<view class="son" v-for="k in list" @click="$win.show('detailed/detailed'+`?id=${k.id}`)" :key="k.id">
				<view class="text">
					<text class="name">{{k.title}}</text>


				</view>
				<image :src="`${cdn}/information/${k.photo}`" mode="" style="background-color: skyblue;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	// import {
	// 	getInformation
	// } from '../../api/study'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,

			}
		},
		computed: {
			...mapState({
				list: state => state.study.informationList1,

			})
		},
		methods: {
			...mapActions({
				getInformation_fun: 'study/getInformation',
				getDetail_fun: 'study/getInformDetail2',
			}),
			async getInformation(type, subject) {
				let data = {
					subject,
					type
				}
				await this.getInformation_fun(data)
			},


			async getDetail(id) {
				let data = {
					type: 2,
					id,
				}
				await this.getDetail_fun(data)


			},

		},
		onLoad(e) {

			//type:1考试秘籍，2学车技巧
			console.log(e);
			this.courseCode = e.courseCode
			console.log("e.courseCode" + e.courseCode)
			this.getInformation(1, e.courseCode)
			console.log(this.$store.state.study)
		},

	}
</script>

<style lang="scss">
	// page {
	// 	background-color: #f2f3f5;
	// }


	.body {
		display: flex;
		flex-direction: column;

		.son {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			box-sizing: border-box;
			width: 750rpx;
			height: 220rpx;
			background: #ffffff;
			border-bottom: 2rpx solid #f2f3f5;

			image {
				width: 250rpx;
				height: 174rpx;
			}

			.text {
				display: flex;
				flex-direction: column;

				.name {
					width: 421rpx;
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
					overflow: hidden;
					/*超出部分隐藏*/
					white-space: nowrap;
					/*禁止换行*/
					text-overflow: ellipsis;
					/*省略号*/

				}

				.content {
					height: 91rpx;
					width: 421rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
					line-height: 32rpx;
					overflow: hidden;
					/* 超过了就显示省略号 */
					text-overflow: ellipsis;
					/* webkit内核的浏览器 */
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;

				}
			}
		}
	}
</style>