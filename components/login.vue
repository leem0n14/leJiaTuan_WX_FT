<template>
	<view class="login-page full-white">
		<template v-if="logintype == 'weapp'">
			<view class="sy-profile">
				<view class="sy-info">
					<view class="sy-info-icon sy-user-icon">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<view class="sy-info-name sy-wx-user-name">
						<open-data type="userNickName"></open-data>
					</view>
				</view>
				<image src="" class="login-jt"></image>
				<view class="sy-info">
					<image v-if="logo" :src="logo" class="sy-info-icon company-icon"></image>
					<view class="sy-info-name company-name">{{ company }}</view>
				</view>
			</view>
			<view class="sy-permit">
				<view class="sy-title">请确认以下授权信息：</view>
				<view class="sy-permit-item">● 获得您的公开信息（昵称、头像等）</view>
				<view class="sy-permit-item">● 授权订阅号消息提醒</view>
			</view>
			<view class="sy-btn-group">
				<button class="sy-btn sy-btn-primary" open-type="getUserInfo" @click="getUser">立即授权</button>
				<button class="sy-btn sy-btn-default" @click="navBack">取消授权</button>
			</view>
		</template>
	</view>
</template>

<script>
	// import loginJt from "@/static/images/login_jt.png";
	// import win from "../system/core/nardy.win.js"
	import {
		login,
		getUserState,
		getPhone
	} from '@/api/user.js'
	import {
		mapActions,
		mapState
	} from 'vuex'
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';

	export default {
		components: {},
		props: {
			logintype: {
				//登录类型  weapp为微信小程序  app为android和iOS的app端登录
				type: String,
				default: 'weapp'
			},
			company: {
				//公司名字
				type: String,
				default: ''
			},
			logo: {
				//公司logo
				type: String
			}
		},
		data() {
			return {
				code: '',
				nickName: '',
				avatarUrl: '',
				gender: '',
				iv: '',
				encryptedData: '',
				signature: '',
				djs: '',
				mobile: '',
				password: '',
				logining: false,
				isLogin: !!this.$db.get("token"),
				userInfo: {},
				statusBarHeight: statusBarHeight,
				num: 0,
			};
		},
		computed: {
			...mapState({
				uState: state => state.user.userState,
			})
		},
		methods: {
			...mapActions({
				saveUserMsg_fun: 'user/saveUserMsg',
				getUserState_fun: 'user/getUserState'
			}),
			async getCode() {
				let [err1, ret] = await uni.getProvider({
					service: 'oauth'
				});
				let [err2, res] = await uni.login({
					provider: ret.provider[0]
				});
				this.code = res.code;
				console.log('code',this.code);
			},
			navBack() {
				// let pages = getCurrentPages();
				// let prevPage = pages[pages.length - 2];
				// try{
				// 	prevPage.$vm.setFlag(true)
				// }catch(e){
				// 	console.log(e);
				// }
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			async getUser() {
				let _this = this;
				this.$win.loading("获取授权")
				uni.getUserProfile({
					desc: '获取您的公开信息，如昵称、头像',
					lang: 'zh_CN',
					success: (e) => {
						if (!e.iv) {
							this.$win.nlog("公开信息获取失败！")
						}
						let params = {
							code: _this.code,
							nickName: e.userInfo.nickName,
							avatarUrl: e.userInfo.avatarUrl,
							gender: e.userInfo.gender,
							iv: e.iv,
							encryptedData: e.encryptedData,
							signature: e.signature,
						}
						console.log('111', params)
						login(params).then((res) => {
							console.log(res)
							console.log('222', res.code)
							if (res && res.code == 0) {
								_this.$db.setSync('token', res.resultMap.token)
								_this.$db.setSync('userId', res.resultMap.userId)
								_this.$db.setSync('nickName',params.nickName)
								_this.$db.setSync('avatarUrl',params.avatarUrl)
								console.log('token', _this.$db.getSync('token'));
								console.log('userId',_this.$db.getSync('userId'));
								console.log('nickName',_this.$db.getSync('nickName'));
								console.log('avatarUrl',_this.$db.getSync('avatarUrl'));
								getUserState({}).then((res1)=>{
									console.log('状态',res1)
									//之前是否登录过
									if(res1&&res1.code==0){
										this.$db.setSync('identity',res1.resultMap.identity)//保存身份码0:路人1:学员2:教练
										if(res1.resultMap.statu == 'no'){
											this.$win.go('/pages/index/index_2?statu=no')
										}
										else if(res1.resultMap.statu == 'yes'){
											if(res1.resultMap.identity==2){
												this.$win.go('/pages/coachSection/coachSection')
											}
											else{
												this.$win.go('/pages/my/my?token=' + res.resultMap.token +
													'&nickName=' + params.nickName + '&avatarUrl=' + params
													.avatarUrl)
											}
										}
									}
									else{
										this.$win.nlog(res1.msg || '请求失败')
									}
								})
							} else {
								this.$win.nlog(res.msg || '请求失败')
							}
						})
					},
					fail: (err) => {
						console.log('fail',err);
						_this.$win.nlog('获取用户信息失败')
					},
					complete() {
						_this.$win.close("l")
					}
				})
			}
		},
		onLoad(o) {
			this.getCode();
			setInterval(() => {
				this.getCode();
			}, 3 * 60 * 1000)
		},
	};
</script>

<style lang="scss" scoped>
	@mixin text-format($size, $weight, $color) {
		font: {
			size: $size + upx;
			weight: $weight;
			family: Source Han Sans CN;
		}

		color: $color;
		line-height: 29rpx;
	}

	.login-page {
		padding-top: 50px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
		box-sizing: border-box;
	}

	.sy-wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		/* padding-top: var(--status-bar-height); */

		top: 40upx;
		font-size: 40upx;
		color: #303133;
		width: 40rpx;
		height: 40rpx;

		&:before {
			position: absolute;
			content: '';
			top: 0;
			left: 18rpx;
			width: 2rpx;
			height: 27rpx;
			background: #303133;
			transform: rotate(45deg);
		}

		&:after {
			position: absolute;
			content: '';
			top: 18rpx;
			left: 18rpx;
			width: 2rpx;
			height: 27rpx;
			background: #303133;
			transform: rotate(-45deg);
		}
	}

	.sy-left-top-sign {
		font-size: 120upx;
		color: #f8f8f8;
		position: relative;
		left: 16upx;
	}

	.sy-right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: '';
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.sy-left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.sy-welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
	}

	.sy-input-content {
		padding: 0 10upx;
	}

	.sy-input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $uni-bg-color;
		height: 80upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: 26upx;
			color: #606266;
		}

		input {
			height: 60upx;
			font-size: 30upx;
			color: #303133;
			width: 100%;
		}
	}

	.sy-confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: 32rpx;

		&:after {
			border-radius: 100px;
		}
	}

	.sy-forget-section {
		font-size: 26upx;
		color: #4399fc;
		text-align: center;
		margin-top: 40upx;
	}

	.sy-register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: 26upx;
		color: #606266;
		text-align: center;

		text {
			color: #4399fc;
			margin-left: 10upx;
		}
	}

	.sy-user {
		&-avatar {
			display: block;
			margin: 0 auto;
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
		}

		&-name {
			padding: 40rpx 0;
			text-align: center;
			color: #444;
			font-size: 32rpx;
		}

		&-jump {
			text-align: center;
			color: $main-color;
			font-size: 32rpx;
		}
	}

	.login-page {
		min-height: 100vh;
		background-color: #ffffff;
		padding: 0 50rpx;

		.sy-profile {
			display: flex;
			flex-wrap: nowrap;
			border: 1px solid reds;
			position: relative;
			box-sizing: border-box;
			overflow: hidden;

			&:after {
				content: '';
				position: absolute;
				width: 630rpx;
				height: 2rpx;
				background: #f0f0f0;
				bottom: -81rpx;
			}

			.sy-info {
				flex: 9;
				text-align: center;
				display: inline-block;
				box-sizing: border-box;
				padding: 30rpx;

				&-icon {
					width: 150rpx;
					height: 150rpx;
					box-sizing: border-box;
					border-radius: 100%;
					margin: 0 auto;
					overflow: hidden;
					margin-bottom: 16rpx;

					&.company-icon {
						width: 150rpx;
						height: 150rpx;
						border-radius: 50%;
					}
				}

				&-name {
					display: inline-block;
					width: 100%;
					@include text-format(32, 500, #111111);
					white-space: pre-wrap;
					word-break: break-all;
					word-wrap: break-word;
					text-align: center;
				}
			}

			.login-jt {
				flex: 3;
				width: 70rpx;
				height: 41rpx;
				margin-top: 100rpx;
			}
		}

		.sy-permit {
			margin-top: 160rpx;

			.sy-title {
				@include text-format(32, 500, #111111);
			}

			.sy-permit-item {
				@include text-format(28, 500, #b6b6b6);
				margin-top: 40rpx;
			}
		}

		.sy-btn-group {
			margin-top: 150rpx;

			.sy-btn {
				width: 620rpx;
				// height: 90rpx;
				background: $theme-color;
				border-radius: 8rpx;
				color: #ffffff;
				border-radius: 49rpx;
			}

			.sy-btn-default {
				background: #e9efff;
				margin-top: 40rpx;
				color: $theme-color;
			}
		}
	}
</style>
