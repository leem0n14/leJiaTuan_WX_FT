<template>
	<div class="body">
		<view class="msg box">
			<view class="son">
				<view class="label">报名姓名</view>
				<view class="input">
					<input type="text" placeholder="输入报名姓名" v-model="dataForm.stuName">
				</view>
			</view>
			<view class="son">
				<view class="label">性别</view>
				<view class="input">
					<radio-group @change="handleSex">
						<label class="radio" v-for="k,i in sexList" :key="i">
							<radio :value="k.name" :checked="k.checked" />{{k.name}}
						</label>

					</radio-group>

				</view>
			</view>
			<view class="son">
				<view class="label">身份证号码</view>
				<view class="input">
					<input placeholder="输入身份证号码" type="idcard" v-model="dataForm.cardId">
				</view>
			</view>
			<view class="son">
				<view class="label">身份证地址</view>
				<view class="input">
					<input type="text" placeholder="输入身份证地址" v-model="dataForm.cardAd">
				</view>
			</view>
			<view class="son">
				<view class="label">报名驾校</view>
				<view class="input">
					<picker mode="selector" range-key="schoolName" :range="schoolList" @change="handleSchool">
						<view style="color: #666666;">{{dataForm.school?dataForm.school:'选择驾校'}}</view>
					</picker>
				</view>
			</view>
			<view class="son">
				<view class="label">指定教练</view>
				<view class="input">
					<picker mode="selector" range-key="coachName" :range="coachList" @change="handleCoach">
						<view style="color: #666666;">{{dataForm.coachName?dataForm.coachName:'选择教练(不选默认直营)'}}</view>
					</picker>
				</view>
			</view>
			<view class="son">
				<view class="label">手机号码</view>
				<view class="input">
					<input placeholder="输入手机号码" type="number" v-model="dataForm.stuPhone">
				</view>
			</view>
		</view>
		<view class="picture box">
			<view class="idcard">
				<view class="title">
					身份证上传
				</view>
				<div class="son">

					<view class="upload" @click="upload(1)">

						<image :src="cdn+(dataForm.cardFront?('/student/'+dataForm.cardFront): '/image/user/null.png')"
							mode="aspectFill">
						</image>

						<text>身份证正面</text>
					</view>
					<view class="upload" @click="upload(2)">
						<image :src="cdn+(dataForm.cardBack?('/student/'+ dataForm.cardBack):'/image/user/null.png')"
							mode="aspectFill">
						</image>
						<text>身份证反面</text>
					</view>
				</div>

			</view>
			<view class="photo">
				<view class="title">
					照片上传
				</view>
				<div class="son">

					<view class="upload" @click="upload(3)">
						<image
							:src="cdn+(dataForm.tijianbiao?('/student/'+dataForm.tijianbiao): '/image/user/null.png')"
							mode="aspectFill">
						</image>
						<text>体检表</text>
					</view>
					<view class="upload" @click="upload(4)">
						<image :src="cdn+(dataForm.photo?('/student/'+dataForm.photo): '/image/user/null.png')"
							mode="aspectFill">
						</image>
						<text>上半身照片</text>
					</view>
				</div>

			</view>
		</view>

		<button class="sub" :disabled="!valid||statu === 1" @click="sub()">{{statu === 1?'审核已通过，不可修改':'提交'}}</button>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex"
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				path: this.$conf.BASE_HOST,
				dataForm: {
					id: null,
					stuName: '',
					stuSex: '',
					cardId: '',
					cardAd: '',
					stuPhone: '',
					school: '',
					coachId: '',
					coachName: '',
					cardFront: '', //图
					cardBack: '', //图
					tijianbiao: '',
					photo: '',
					statu: '',
				},



				pageIndex: 1,
				pageSize: 10,
				// schoolList: [],
				sexList: [{
					name: '男',
					checked: false,
				}, {
					name: '女',
					checked: false,
				}]
			}
		},
		computed: {
			...mapState({
				schoolList: state => state.venue.schoolList,
				coachList: state => state.coach.coachList,
			}),
			valid() {
				let msg = this.dataForm.stuName && this.dataForm.stuSex && this.dataForm.cardId && this.dataForm.cardAd &&
					this.dataForm.school && this.dataForm.stuPhone
				// &&this.dataForm.coachId&&this.dataForm.coachName
				let photo = this.dataForm.cardBack && this.dataForm.cardFront && this.dataForm.photo
				// && this.tijianbiao
				return msg && photo

			}
		},
		watch: {
			'dataForm.school'(newV) {
				// console.log('?????');
				this.getCoach(newV)
			},
			'dataForm.stuSex'(newV) {
				for (let i = 0; i < this.sexList.length; i++) {
					this.sexList[i].checked = false
				}
				for (let i = 0; i < this.sexList.length; i++) {
					if (newV === this.sexList[i].name) {
						this.sexList[i].checked = true
					}
				}
			}
		},
		methods: {
			...mapActions({
				getSchoolList_fun: 'venue/getSchoolList',
				sub_fun: 'my/subBaoming',
				getCoachList_fun: 'coach/getCoachBySchool'
			}),
			async getCoach(school) {
				let data = {
					school,
				}
				let res = await this.getCoachList_fun(data)
			},
			async getSchool() {
				let data = {

				}
				let res = await this.getSchoolList_fun(data)
			},
			handleSchool(e) {
				this.dataForm.school = this.schoolList[e.detail.value].schoolName
			},
			handleCoach(e) {
				this.dataForm.coachId = this.coachList[e.detail.value].coachId
				this.dataForm.coachName = this.coachList[e.detail.value].coachName
			},
			handleSex(e) {
				this.dataForm.stuSex = e.detail.value
			},
			upload(e) {
				let index = e
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: this.path + '/app/uploadFiles/photoUpload',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								token: this.$db.getSync('token'),
							},
							formData: {
								where: 'student'
							},
							data: {
								userId: this.$db.getSync('userId'),
							},
							success: (res) => {
								console.log(res);
								if (res.statusCode === 200) {
									this.$win.nlog('上传成功')
									switch (index) {
										case 1:
											this.dataForm.cardFront = JSON.parse(res.data)
												.fileName;
											break;
										case 2:
											this.dataForm.cardBack = JSON.parse(res.data).fileName;
											break;
										case 3:
											this.dataForm.tijianbiao = JSON.parse(res.data)
												.fileName;
											break;
										case 4:
											this.dataForm.photo = JSON.parse(res.data).fileName;
											break;
									}


								} else {
									console.log('上传失败');
								}
							},
							fail: (err) => {
								console.log(err, '错误');
							}
						});
					}
				});
			},
			async sub() {
				if (!this.valid) {
					this.$win.nlog('请填写完整信息')
					return
				}
				if (!/^[\u4e00-\u9fa5]{2,10}$/.test(this.dataForm.stuName)) {
					this.$win.nlog('名字必须为2~10个中文字符')
					return
				}
				if (!/^1[3-9]\d{9}$/.test(this.dataForm.stuPhone)) {
					this.$win.nlog('请填写正确的手机号码')
					return
				}

				let data = {
					...this.dataForm,
					id: parseInt(this.dataForm.id),
					coachId: this.dataForm.coachId ? this.dataForm.coachId : 0

				}

				let res = await this.sub_fun(data)


			}
		},
		onShow() {
			this.getSchool()
		},
		onLoad(e) {
			// console.log(e);
			Object.keys(e).forEach(k => {
				if (e[k] != '' && e[k] != 'null' && e[k] != null && e[k] != undefined && e[k] != 'undefined')
					this.dataForm[k] = e[k]
			})

			// 溺智写法，如下
			// if (e.id)
			// 	this.id = e.id
			// if (e.name)
			// 	this.name = e.name
			// if (e.phone)
			// 	this.phone = e.phone
			// if (e.school)
			// 	this.school = e.school
			// if (e.stuSex)
			// 	this.stuSex = e.stuSex
			// if (e.cardId)
			// 	this.cardId = e.cardId
			// if (e.cardAd)
			// 	this.cardAd = e.cardAd
			// if (e.coachId)
			// 	this.coachId = e.coachId
			// if (e.coachName)
			// 	this.coachName = e.coachName
			// if (e.cardFront)
			// 	this.cardFront = e.cardFront
			// if (e.cardBack)
			// 	this.cardBack = e.cardBack
			// if (e.tijianbiao)
			// 	this.tijianbiao = e.tijianbiao
			// if (e.photo)
			// 	this.photo = e.photo
		},
		onReachBottom() {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.body {
		padding-bottom: 100rpx;

		.box {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			box-sizing: border-box;
			padding: 40rpx 30rpx;

		}

		.msg {
			margin-bottom: 10rpx;

			.son {
				display: flex;
				// align-items: center;
				width: 690rpx;
				height: 90rpx;
				background: #f2f2f2;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				line-height: 90rpx;
				box-sizing: border-box;
				margin: 20rpx 0;

				.label {
					width: 200rpx;
					padding: 0 30rpx;
					box-sizing: border-box;
					height: 100%;
					color: #666666;

				}

				.input {
					display: flex;
					justify-content: space-around;
					height: 100%;
					// min-width: 400rpx;
					color: #000000;

					radio-group {
						display: flex;
						justify-content: space-between;
						min-width: 200rpx;
					}

					input {
						height: 100%;
					}
				}
			}
		}

		.picture {
			margin-top: 10rpx;

			.title {
				// width: 112rpx;
				height: 28rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
				line-height: 28rpx;
				margin: 20rpx 0;
			}

			.son {
				display: flex;
				flex-direction: row;

				.upload {
					display: flex;
					flex-direction: column;
					margin: 0 30rpx 16rpx 0;

					image {
						background-color: #ededed;
						width: 180rpx;
						height: 180rpx;
						margin: 0 0 20rpx;
					}

					text {
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #999999;
						line-height: 29rpx;
					}
				}
			}

		}

		.sub {
			margin-top: 100rpx;
			// margin-bottom: 100rpx;
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
</style>