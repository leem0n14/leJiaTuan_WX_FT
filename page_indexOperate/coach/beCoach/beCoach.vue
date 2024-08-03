<template>
	<view class="beCoach-view">
		<view class="box idCard-img">
			<view class="son" @click="chooseImage(0)">
				<image class="image"
					:src="form.idPhotoz===''?`${cdn}/image/beCoach/idCard1.webp`:`${cdn}/coach/${form.idPhotoz}`">
				</image>
			</view>
			<text class="text">上传身份证正面</text>
			<view class="son" @click="chooseImage(1)">
				<image class="image"
					:src="form.idPhotof===''?`${cdn}/image/beCoach/idCard2.webp`:`${cdn}/coach/${form.idPhotof}`">
				</image>
			</view>
			<text class="text">上传身份证背面</text>
		</view>
		<view class="box form">
			<view class="item">
				<text class="text">身份证号</text>
				<input class="input" type="text" placeholder="请输入身份证号" v-model="form.idNumber">
			</view>
			<view class="item">
				<text class="text">姓名</text>
				<input class="input" type="text" placeholder="请输入姓名" v-model="form.name">
			</view>
			<view class="item">
				<text class="text">电话</text>
				<input class="input" type="text" placeholder="请输入电话" v-model="form.phone">
			</view>
			<view class="item">
				<text class="text">申请驾校</text>
				<picker @change="bindPickerChange" range-key="schoolName" :range="schoolList">
					<view class="picker-view">{{form.schoolName?form.schoolName:'请选择驾校'}}</view>
				</picker>
			</view>
			<view class="item">
				<text class="text">介绍</text>
				<textarea auto-height class="input" placeholder="请输入介绍" v-model="form.introduce" />
			</view>
		</view>
		<button class="sub-btn" @click="sub()">提交申请</button>
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
				cdn: this.$conf.CDN_HOST,
				form: {
					idNumber: '',
					idPhotof: '',
					idPhotoz: "",
					introduce: "",
					phone: '',
					name: '',
					schoolId: '',
					schoolName: '',
				}
			}
		},
		computed: {
			...mapState({
				schoolList: state => state.venue.schoolList,
			})
		},
		methods: {
			...mapActions({
				getSchoolList_fun: 'venue/getSchoolList',
				beCoach_fun:'coach/beCoach',
			}),
			bindPickerChange(e) {
				// console.log(e);
				this.form.schoolId = this.schoolList[e.detail.value].schoolId
				this.form.schoolName = this.schoolList[e.detail.value].schoolName
			},
			chooseImage(type) {
				let fNum = 1
				uni.chooseImage({
					count: fNum,
					success: (res) => {
						this.upLoad(res.tempFilePaths[0], type)
					}
				})
			},
			async upLoad(filePath, type) {
				let url = 'https://wx.lejiatuan.cn/data/lejiatuan/app/uploadFiles/photoUpload'
				uni.uploadFile({
					url,
					name: 'file',
					filePath,
					formData: {
						where: 'coach',
					},
					success: (res) => {
						console.log(res, '成功');
						let data = JSON.parse(res.data)
						// console.log('d',data);
						if (type === 0)
							this.form.idPhotoz = data.fileName
						else if (type === 1)
							this.form.idPhotof = data.fileName
					},
					fail: (err) => {
						this.$win.nlog('上传失败')
						console.log(err);
					}
				})
			},
			async sub() {
				let {idNumber,idPhotof,idPhotoz,introduce,phone,name,schoolId}=this.form
				if(idNumber===''||idPhotof===''||idPhotoz===''||introduce===''||phone===''||name===''||schoolId==='') {
					this.$win.nlog('请填写完整表单')
					return 
				} 
				let data = {
					userId: this.$db.getSync('userId'),
					city: this.$db.getSync('city'),
					...this.form
				}
				await this.beCoach_fun(data)
			},
			async getSchool() {
				let data = {
					userId: this.$db.getSync('userId'),
				}
				await this.getSchoolList_fun(data)
			}
		},
		onShow() {
			this.getSchool()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.beCoach-view {
		display: flex;
		flex-direction: column;
		align-items: center;

		.box {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #fff;
			width: 100%;
			box-sizing: border-box;
			margin-bottom: 20rpx;
		}

		.idCard-img {
			// display: flex;
			padding: 40rpx 75rpx;

			.son {
				margin-top: 30rpx;
				background-color: #999999;
				width: 600rpx;
				height: 340rpx;

				.image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				margin-top: 16rpx;
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #999999;
			}
		}

		.form {
			padding: 40rpx 30rpx;

			// margin-bottom: 100rpx;
			.item {
				display: flex;
				align-items: center;
				width: 690rpx;
				min-height: 90rpx;
				background: #f2f2f2;
				border-radius: 8rpx;
				margin: 30rpx 0;
				box-sizing: border-box;
				padding: 0 30rpx;

				.picker-view {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}

				.text {
					width: 20%;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
				}

				.input {
					width: 70%;
					font-size: 28rpx;
				}
			}
		}

		.sub-btn {
			display: inline-block;
			margin: 50rpx 0 50rpx;
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

	}
</style>