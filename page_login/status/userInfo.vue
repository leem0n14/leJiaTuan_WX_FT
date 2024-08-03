<template>
	<view class="userInfo">
		<view class="photo">
			<image class="pic" :src="cdn+'/user'+'/'+photo" v-if="photo!=null">
			</image>
			<div class="picIsNull" v-else>{{'头像'}}</div>
			<button class="upLoad" @click="chooseImage()">{{false?'修改头像':'上传头像'}}</button>
		</view>
		<view class="user">
			<view class="userName">
				<view class="text">姓名</view>
				<input type="text" placeholder="请输入姓名" v-model="userName">
			</view>
			<view class="userPhone">
				<view class="text">手机号码</view>
				<input style="width: 378rpx;" type="number" placeholder="请输入手机号" v-model="userPhone" maxlength="11">
				<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号码</button>
			</view>
		</view>
		<button class="subBtn" @click="sub" :disabled="btnBool">保存</button>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import {
		getPhone
	} from '../../api/user'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				userName: '',
				userPhone: '',
				psdahoto: null,
				isNew: '',
				nicknameError: '',
				phoneError: ''
			}
		},
		watch: {
			personMsg: {
				deep: true,
				handler(newV) {
					this.userName = newV.name
					this.userPhone = newV.phone
					this.photo = newV.head
				}
			},
			getPhoneRes(newV) {
				this.userPhone = newV
			}
		},
		computed: {
			...mapState({
				setRes: state => state.user.setPersonRes,
				personMsg: state => state.user.getPersonRes,
				personMsgForm1: state => state.user.getPersonForm,
				getPhoneRes: state => state.user.getPhoneRes,
			}),

			btnBool() {
				return this.userName == '' || this.userPhone == '' || this.photo == ''
			}
		},
		methods: {
			...mapActions({
				setPersonMsg_fun: 'user/setPerson',
				getPersonMsg_fun: 'user/getPerson',
				getPhone_fun: 'user/getPhone',
			}),
			validateNickname() {
				const nickname = this.userName
				if (nickname.length === 0) {
					this.nicknameError = '昵称不能为空'
				} else if (!/^[\u4E00-\u9FA5]{2,10}$/.test(nickname)) {
					this.nicknameError = '昵称必须为2~10个汉字'
				} else {
					this.nicknameError = ''
				}
			},
			validatePhone() {
				const phone = this.userPhone
				if (phone.length === 0) {
					this.phoneError = '手机号码不能为空'
				} else if (!/^\d{11}$/.test(phone)) {
					this.phoneError = '请输入正确的手机号码'
				} else {
					this.phoneError = ''
				}
			},
			async sub() {
				this.validateNickname();
				this.validatePhone();
				if (this.nicknameError != '') {
					console.log(this.nicknameError)
					this.$win.nlog(this.nicknameError)

				} else if (this.phoneError != '') {
					console.log(this.phoneError)
					this.$win.nlog(this.phoneError)
				} else {
					let data = {
						userId: this.$db.getSync('userId'),
						nickName: this.userName,
						phone: this.userPhone,
						photo: this.photo,
						new: 1,
					}
					let res = await this.setPersonMsg_fun(data).then(() => {
						if (this.setRes.code == 0) {
							this.$win.show('/page_login/index_2?statu=no')
							// if (this.isNew)
							// 	this.$win.show('/page_login/index_2?statu=no')
							// else {
							// 	this.$win.back()
							// }
						}
					})
				}
			},
			async getPersonMsg() {
				let params = {
					userId: this.$db.getSync('userId'),
				}
				let res = await this.getPersonMsg_fun(params)
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
						where: 'user',
					},
					success: (res) => {
						console.log(res, '成功');
						let data = JSON.parse(res.data)
						// console.log('d',data);
						this.photo = data.fileName
					},
					complete: (res) => {
						console.log(res, 'complete');
					}
				})
			},
			async getPhoneNumber(e) {
				console.log(e);
				let data = {
					code: e.detail.code
				}
				let res = await this.getPhone_fun(data)
			}
		},
		onLoad(e) {
			if (e.new != 1) {
				this.getPersonMsg()
			}

			console.log(e);
			this.isNew = e.new == 1 ? true : false
		}
	}
</script>

<style lang="scss">
	.userInfo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20rpx 0;

		.photo {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 690rpx;

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

		.user {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 20rpx;

			.userName,
			.userPhone,
			{
			display: flex;
			align-items: center;
			width: 690rpx;
			height: 90rpx;
			margin-top: 30rpx;
			background: #f2f2f2;
			border-radius: 8rpx;

			.text {
				box-sizing: border-box;
				padding-left: 30rpx;
				width: 172rpx;
				height: 90rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
				line-height: 90rpx;
				/* 	background-color: skyblue;
				border-radius: 8rpx; */
			}

			input {
				height: 100%;
				width: 578rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}

			button {
				height: 80rpx;
				line-height: 80rpx;
				// width: 200rpx;
				font-size: 24rpx;
				border-radius: 20rpx;
				background-color: #29C563;
				color: #fff;
			}
		}
	}
	}

	.subBtn {
		margin-top: 75rpx;
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
</style>