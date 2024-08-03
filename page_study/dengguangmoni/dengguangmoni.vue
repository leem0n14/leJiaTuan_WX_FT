<!-- 灯光模拟 -->
<template>
	<view>
		<view class="hd">
			<view class="son" v-for="(k,i) in 8">
				<image :src="cdn+'/image/study/sourse3/ligthMock/light.png'" mode="aspectFill"></image>
				<text>{{'灯光'+'0'+ (i+1)}}</text>
			</view>
		</view>
		<view class="bd">
			<text v-for="(k,i) in textList" :key="i">{{k}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				textList:[
					'1、下面将进行模拟夜间行驶场景灯光使用的考试,请按语音指令在5秒内做出相应的灯光操作。夜间在没有路灯、照明不良条件下行驶',
					'2、请将前照灯变换成远光',
					'3、夜间在窄路与非机动车会车',
					'4、请将前照灯变换成远光',
					'5、夜间同方向近距离跟车行驶'
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.hd{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 40rpx 0 0 0;
	width: 750rpx;
	height: 370rpx;
	box-sizing: border-box;
	background: #ffffff;
	.son{
		display: flex;
		flex-direction: column;
		margin: 0 57rpx 42rpx;
		image{
			width: 72rpx;
			height: 72rpx;
		}
		text{
			margin-top: 24rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
		}
	}
}
.bd{
	display: flex;
	flex-direction: column;
	width: 750rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	margin-top: 60rpx;
	text{
		margin: 15rpx 0;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333;
		line-height: 40rpx;
	}
}
</style>
