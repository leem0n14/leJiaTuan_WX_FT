<template>
	<view class="confirm">
		<video :custom-cache="false" :src="cdn+'/subject23/'+videoUrl" object-fit="fill" class="video"
			:title="titleName" @screenChange="screenChange" id="video_play1" @play="playVideo">
		</video>
		<view class="box">
			<view class="title">
				<text class="title-name">{{`${titleName}:`}}</text>
				<text class="content">{{content}}</text>
			</view>
		</view>
		<view class="richText">
			<view v-if="richText!='null'" v-html="$db.getSync('_richText')">
			</view>
			<view v-else>
				还没有添加富文本
			</view>
		</view>
	</view>

</template>

<script>
	import {
		data
	} from "../../uni_modules/uview-ui/libs/mixin/mixin"
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				videoUrl: '',
				titleName: '',
				richText: "",
				content: "",
			}
		},
		methods: {
			playVideo(e) {
				// 获取 video 上下文 videoContext 对象
				console.log('播放', e);
				this.videoContext = uni.createVideoContext('video_play');
				// 进入全屏状态
				this.videoContext.requestFullScreen({
					direction: 90
				});
			},
			screenChange(e) {
				const video = uni.createVideoContext('video_play')
				video.requestFullScreen({
					direction: 'horizontal', // 全屏方向，可选值为 vertical 或 horizontal，默认为 vertical
					success() {
						console.log('进入全屏成功')
					},
					fail() {
						console.log('进入全屏失败')
					}
				})
			},
		},
		onLoad(e) {

			// console.log('进来了')

			this.videoUrl = e.video
			this.titleName = e.name
			this.richText = e.richText
			// console.log( e._richText)
			// this.richText = e.richText
			this.content = e.content
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.confirm {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.video {
			/* position: absolute; */
			/* left: 0; */
			/* top: 0; */
			width: 750rpx;
		}

		.box {
			display: flex;
			justify-content: center;
			margin: 0 0 20rpx 0;
			background-color: #fff;
			width: 100%;
		}

		.title {
			display: flex;
			flex-direction: column;
			background-color: #f2f3f5;
			width: 90%;
			box-sizing: border-box;
			border-radius: 15rpx;
			border: 1rpx dashed red;
			margin: 20rpx 0;
			padding: 20rpx;

			.title-name {
				margin-bottom: 10rpx;
				font-weight: 600;
				font-size: 36rpx;
				color: red;
			}

			.content {
				font-weight: 400;
				font-size: 24rpx;
				color: #000;
			}
		}

		.richText {
			box-sizing: border-box;
			padding: 20rpx 0;
			width: 100%;
			text-align: center;
			background-color: #fff;
		}
	}
</style>