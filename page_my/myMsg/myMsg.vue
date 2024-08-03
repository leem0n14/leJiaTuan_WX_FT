<template>
	<view class="editMy">
		<div class="box">
			<form>
				<view class="photo">
					<!-- <label for="photo">
						<view class="text" style="background-color: #f2f3f5;width: 90rpx;height: 90rpx;border-radius: 50%;text-align: center;line-height: 90rpx;">{{'头像'}}</view>
					</label> -->
					<image class="pic" :src="cdn+'/user'+'/'+personMsgForm.photo" v-if="personMsgForm.photo!=''">
					</image>
					<div class="picIsNull" v-else>{{'头像'}}</div>
					<button class="upLoad" @click="chooseImage()">{{false?'修改头像':'上传头像'}}</button>
				</view>
				<view class="son">
					<label for="nickName">
						<view class="text">{{'昵称'}}</view>
					</label>
					<input v-model="personMsgForm.nickName" id="nickName" type="nickname" placeholder="请输入昵称"
						placeholder-class="placeholderStyle" @input="validateNickname">
					<view v-if="nicknameError" class="error">{{ nicknameError }}</view>
				</view>
				<view class="son">
					<label for="phone">
						<view class="text">{{'手机号码'}}</view>
					</label>
					<input v-model="personMsgForm.phone" id="phone" type="number" placeholder="请输入手机号码"
						placeholder-class="placeholderStyle" @input="validatePhone">
					<view v-if="phoneError" class="error">{{ phoneError }}</view>
				</view>
				<view class="btns">
					<button form-type="submit" class="submit" @click="subForm">提交</button>
				</view>

			</form>
		</div>
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
				personMsgForm: {
					nickName: '',
					phone: '',
					photo: '',
				},
				nicknameError: '',
				phoneError: '',
			}
		},
		watch: {
			personMsg: {
				deep: true,
				handler(newV) {
					this.personMsgForm.nickName = newV.name
					this.personMsgForm.phone = newV.phone
					this.personMsgForm.photo = newV.head
				}
			}
		},
		computed: {
			...mapState({
				personMsg: state => state.user.getPersonRes,
				personMsgForm1: state => state.user.getPersonForm,
			})
		},
		methods: {
			...mapActions({
				getPersonMsg_fun: 'user/getPerson',
				setPersonMsg_fun: 'user/setPerson',
			}),
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
						where: 'user',
					},
					success: (res) => {
						console.log(res, '成功');
						let data = JSON.parse(res.data)
						// console.log('d',data);
						this.personMsgForm.photo = data.fileName
					},
					complete: (res) => {
						console.log(res, 'complete');
					}
				})
			},
			validateNickname() {
				const nickname = this.personMsgForm.nickName
				if (nickname.length === 0) {
					this.nicknameError = '昵称不能为空'
				} else if (!/^[\u4E00-\u9FA5]{2,10}$/.test(nickname)) {
					this.nicknameError = '昵称必须为2~10个汉字'
				} else {
					this.nicknameError = ''
				}
			},
			validatePhone() {
				const phone = this.personMsgForm.phone
				if (phone.length === 0) {
					this.phoneError = '手机号码不能为空'
				} else if (!/^\d{11}$/.test(phone)) {
					this.phoneError = '请输入正确的手机号码'
				} else {
					this.phoneError = ''
				}
			},
			async subForm() {
				this.validateNickname();
				this.validatePhone();
				if (this.nicknameError != '') {
					console.log(this.nicknameError)
					this.$win.nlog(this.nicknameError)

				} else if (this.phoneError != '') {
					console.log(this.phoneError)
					this.$win.nlog(this.phoneError)
				} else {
					let params = {
						userId: this.$db.getSync('userId'),
						...this.personMsgForm
					}
					let res = await this.setPersonMsg_fun(params)
				}

			},
			async getPersonMsg() {
				let params = {
					userId: this.$db.getSync('userId'),
				}
				let res = await this.getPersonMsg_fun(params)
			}
		},
		onLoad() {
			this.getPersonMsg()

		},
		onShow() {

		}
	}
</script>

<style lang="scss">
	.error {
		color: red;
		font-size: 14px;
		margin-top: 6px;
	}

	page {
		background-color: #f2f3f5;
	}

	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 0;
		background-color: #fff;

		.photo {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.text {
				text-align: center;
				width: 112rpx;
				// line-height: 28px;
				font-size: 28rpx;
				// height: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}

			.pic {
				background: #f2f3f5;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				color: #999;
			}

			.picIsNull {
				background: #f2f3f5;
				width: 100rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				border-radius: 50%;
				color: #999;
			}

			.upLoad {
				margin: 0;
				background: #1aa034;
				border-radius: 40rpx;
				color: #fff;
				font-size: 26rpx;
			}

		}

		.son {
			display: flex;
			flex-direction: row;
			align-items: center;
			// justify-content: center;
			width: 690rpx;
			height: 90rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			margin: 20px 0;
			background: #f2f2f2;
			border-radius: 8rpx;

			.text {
				text-align: center;
				width: 112rpx;
				// line-height: 28px;
				font-size: 28rpx;
				// height: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}

			.placeholderStyle {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}

			input {
				padding-left: 30rpx;
				// background-color: #29c563;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				width: 450rpx;
				// height: ;
			}
		}

		.btns {
			width: 100%;

			.submit {
				width: 580rpx;
				height: 90rpx;
				background: linear-gradient(134deg, #54d685, #29c563 99%);
				border-radius: 45rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 90rpx;
			}
		}
	}
</style>