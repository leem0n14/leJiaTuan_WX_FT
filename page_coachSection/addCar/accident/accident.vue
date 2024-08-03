<!-- 添加出险 -->
<template>
	<view>
		<view class="body">
			<view class="input">
				<view class="left">
					<view class="text">
						出险日期
					</view>
					<picker mode="date" @change="bindDateChange">
						<view class="content">{{date==''?'请选择出险日期':date}}</view>
					</picker>
					<!-- 					<view class="content">{{date==''?'':date}}</view> -->
				</view>
				<!-- <image :src="cdn+'/icon/triangle.svg'" mode="aspectFill"></image> -->
			</view>
			<view class="input">
				<view class="left">
					<view class="text">
						出险地点
					</view>
					<input type="text" placeholder="请输入出险地点" class="content" v-model="cxPlace">
				</view>
			</view>
			<view class="input">
				<view class="left">
					<view class="text">
						事故描述
					</view>
					<textarea auto-height placeholder="请输入事故描述" class="content" v-model="damageDetail"></textarea>
				</view>
			</view>
		</view>
		<view class="upload-view">
			<view class="img-view" @click="chooseImage()">
				<image :src="`${cdn}/damage/${damagePicture}`" mode="aspectFit" class="img" v-if="damagePicture"></image>
				<view class="add-ico" v-else>
					<u-icon name="plus" size="48" color="#999"></u-icon>
				</view>
			</view>
			<text class="text">上传出险现场图片</text>
		</view>
		<button class="save" @click="addAcc()">保存</button>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				date: '',
				carId: '',
				cxPlace: '',
				damagePicture: '', //事故图片
				damageDetail: "", //事故描述
				// cxTime:'',
			}
		},
		methods: {
			...mapActions({
				addAcc_fun: 'coachSection/addAcc',

			}),
			bindDateChange(e) {
				this.date = e.detail.value
			},
			chooseImage() {
				let fNum = 1
				uni.chooseImage({
					count: fNum,
					success: (res) => {
						this.upLoad(res.tempFilePaths[0])
					}
				})
			},
			async upLoad(filePath) {
				let url = 'https://wx.lejiatuan.cn/data/lejiatuan/app/uploadFiles/photoUpload'
				uni.uploadFile({
					url,
					name: 'file',
					filePath,
					formData: {
						where: 'damage',
					},
					success: (res) => {
						let data = JSON.parse(res.data)
						// console.log('d',data);
						this.damagePicture = data.fileName
					},
					fail(err) {
						this.$win.nlog('上传失败')
						console.log(err);
					}
				})
			},
			async addAcc() {
				let data = {
					carId: this.carId,
					cxTime: this.date,
					cxPlace: this.cxPlace,
					damagePicture:this.damagePicture,
					damageDetail:this.damageDetail
				}
				let res = await this.addAcc_fun(data)
			}
		},
		onLoad(e) {
			this.carId = e.carId
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.upload-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20rpx;
		width: 750rpx;
		box-sizing: border-box;
		padding: 40rpx 0 10rpx;
		background-color: #ffffff;

		.img-view {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 600rpx;
			height: 340rpx;
			background-color: #f2f3f5;
			border-radius: 15rpx;

			.add-ico {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
			}

			.img {
				width: 100%;
			}
		}

		.text {
			margin: 20rpx 0;
			font-size: 28rpx;
			text-align: center;
			color: #999999;
		}
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		// margin-top: 128rpx;
		width: 750rpx;
		// height: 290rpx;
		box-sizing: border-box;
		background: #ffffff;
		padding: 40rpx 0 10rpx;

		.input {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 690rpx;
			min-height: 90rpx;
			box-sizing: border-box;
			padding: 10rpx 30rpx;
			margin-bottom: 30rpx;
			background: #f2f2f2;
			border-radius: 8rpx;


			.left {
				display: flex;
				flex-direction: row;
				align-items: center;

				.text {
					margin-right: 30rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
				}

				.content {

					width: 450rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}
			}

			image {
				background-color: #29c563;
				width: 25rpx;
				height: 31rpx;
			}
		}
	}

	.save {
		margin-top: 100rpx;
		width: 580rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}
</style>