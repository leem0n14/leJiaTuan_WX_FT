<!-- 学车技巧 -->
<template>
	<view>
		<view class="body">
			<view class="son" v-for="(k,i) in list" :key="k.id" @click="this.$win.show('detail/detail'+`?id=${k.id}`)">
				<image class="bg" :src="cdn+`/information/${k.photo}`" mode="aspectFill"></image>
				<view></view>
				<text>{{k.title}}</text>
			</view>
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
				cdn: this.$conf.CDN_HOST,
				path: '/image/study/sourse2/studySkill',
				lists: [{
						pic: '/distance.png',
						text: '车距判断',
						link: '',
					},
					{
						pic: '/gears.png',
						text: '档位操作',
						link: '',
					}, {
						pic: '/lamplight.png',
						text: '灯光',
						link: '',
					}, {
						pic: '/goStraight.png',
						text: '直行',
						link: '',
					}, {
						pic: '/experience.png',
						text: '经验技巧',
						link: '',
					}
				]
			}
		},
		computed: {
			...mapState({
				list: state => state.study.informationList2,
			})
		},
		methods: {
			...mapActions({
				getInformation_fun: 'study/getInformation',
				getDetail_fun: 'study/getInformDetail1',
			}),
			async getInformation(subject, type) {
				let data = {
					subject,
					type,
				}
				await this.getInformation_fun(data)
			},
			async getDetail(id) {
				let data = {
					type: 1,
					id,
				}
				await this.getDetail_fun(data)
			},
		},
		onLoad(e) {
			//type:1考试秘籍，2学车技巧
			// console.log(e);
			this.getInformation(e.courseCode, 2)
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: skyblue;
	// }

	page {
		background-color: #f2f3f5;
	}


	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		margin-top: 30rpx;

		.son {
			position: relative;
			width: 690rpx;
			height: 201rpx;
			margin-bottom: 30rpx;

			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 690rpx;
				height: 201rpx;
			}

			view {
				position: absolute;
				top: 62rpx;
				left: 55rpx;
				width: 61rpx;
				height: 9rpx;
				border-radius: 4rpx;
				opacity: 0.6;
				background: #ffffff;
			}

			text {
				position: absolute;
				bottom: 61rpx;
				left: 55rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #ffffff;
			}
		}
	}
</style>