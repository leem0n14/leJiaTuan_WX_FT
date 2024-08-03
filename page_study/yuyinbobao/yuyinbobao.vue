<!-- 语音播报 -->
<template>
	<view>
		<view class="body">
			<view class="son" v-for="(k,i) in (course==2?lists2:lists3)" :key="i">
				<view class="box">
					<image :src="cdn+((course==2)?(path2+k.pic):(path3+'/'+(i+1)+'.png'))" mode="aspectFill"></image>
					<!-- <audio src=""></audio> -->
					<!-- 用uni.createInnerAudioContext()控制播放 -->
				</view>
				<text>{{k.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				course:3,
				topTitle: '',
				path2: '/image/study/sourse2/voiceIcon',
				path3: '/image/study/sourse3/voice',
				lists2: [{
						pic: '/daocheruku.png',
						text: '倒车入库',
						audioSrc: '',
					}, {
						pic: '/cefangtingche.png',
						text: '侧方停车',
						audioSrc: '',
					}, {
						pic: '/quxianxingshi.png',
						text: '曲线行驶',
						audioSrc: '',
					}, {
						pic: '/zhijiaozhuanwan.png',
						text: '直角转弯',
						audioSrc: '',
					},
					{
						pic: '/shangpoqibu.png',
						text: '上坡起步',
						audioSrc: '',
					}
				],
				lists3: [
					{
						text:'上车准备',
						pic:'',
					},
					{
						text:'起步提示',
						pic:'',
					},
					{
						text:'直线行驶',
						pic:'',
					},
					{
						text:'加减档位',
						pic:'',
					},
					{
						text:'变更车道',
						pic:'',
					},
					{
						text:'靠边停车',
						pic:'',
					},
					{
						text:'路口直行',
						pic:'',
					},
					{
						text:'路口左转',
						pic:'',
					},
					{
						text:'路口右转',
						pic:'',
					},
					{
						text:'人行横道',
						pic:'',
					},
					{
						text:'学校区域',
						pic:'',
					},
					{
						text:'公交车站',
						pic:'',
					},
					{
						text:'会车提示',
						pic:'',
					},
					{
						text:'超车提示',
						pic:'',
					},
					{
						text:'掉头提示',
						pic:'',
					}
				],
			}
		},
		methods: {

		},
		onLoad(option) {
			this.topTitle = option.title + '语音报播'
			if(option.title=='科目二'){
				this.course=2
			}
			else if (option.title=='科目三')
			{
				this.course=3
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.body {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		// justify-content: space-between;
		width: 750rpx;
		padding-top:3rpx;
		// box-sizing: border-box;

		.son {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			width: 248rpx;
			height: 248rpx;
			margin:3rpx 3rpx 0 0;

			.box {
				position: relative;
				width: 120rpx;
				height: 120rpx;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 120rpx;
					height: 120rpx;
					z-index: 2;
				}

				// audio{
				// 	position: absolute;
				// 	top: 0;
				// 	left: 0;
				// 	width: 120rpx;
				// 	height: 120rpx;
				// }
			}

			text {
				margin-top: 20rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
			}
		}
	}
</style>
