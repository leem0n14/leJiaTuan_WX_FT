//预约练车
<template>
	<view>
		<view class="userMsg">
			<view class="header">
				<view class="name">
					<view class="text">姓名</view>
					<input type="text" placeholder="请输入姓名" v-model="name">
					<!-- <input type="text" placeholder="请输入姓名" v-model="name"> -->
				</view>
				<view class="phone">
					<!-- personMsg -->
					<view class="text">手机号码</view>
					<input type="number" placeholder="请输入手机号" v-model="phone" maxlength="11">
				</view>
				<view class="type son">
					<view class="text">驾照类型</view>
					<picker mode="selector" :range="typeName" @change="changeType" class="typeChoose">
						<view>{{type}}</view>
					</picker>
					<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
				</view>
				<view class="course son">
					<view class="text">练车科目</view>
					<picker mode="selector" :range="courseType" @change="chooseCourse" class="courseChoose">
						<view>{{course==''?'请选择科目':course}}</view>
					</picker>
					<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
				</view>
				<view class="site course son">
					<view class="text">练车场地</view>
					<picker mode="selector" :range="sites" range-key="siteName" @change="choosesite"
						class="courseChoose">
						<view>{{site==''?'请选择场地':site}}</view>
					</picker>
					<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
				</view>
			</view>

			<view class="body">
				<view class="isShuttle">
					<view class="title">{{receive===0?'该时间段不可接送':'是否接送'}}</view>
					<switch @click="$win.nlog(receive===0?'该时间段不可接送':'')" :checked="isShuttle" :disabled="receive===0"
						color="#29c563" style="transform:scale(0.8)" @change="shuttle" />
				</view>

				<view class="practiceTime son">
					<view class="text">
						练车时间
					</view>
					<picker mode="selector" :range="timeList" :range-key="'carTime'" @change="chooseTime" :value="pTime"
						class="chooseTime ">
						<view>{{pTime}}</view>
					</picker>
					<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
				</view>

				<view class="practiceTime son">
					<view class="text">
						练车日期
					</view>
					<picker mode="date" :start="formattedDate" :end="formattedDateEnd" @change="chooseDate"
						:value="pDate" class="chooseTime ">
						<view>{{pDate}}</view>
					</picker>
					<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
				</view>

				<!-- <view class="shuttleTime son" v-if="isShuttle">
					<view class="text">接送时间</view>
					<picker mode="selector" :range="shuttleTime" @change="chooseShuttleTime" class="shuttle">
						<view>{{sTime}}</view>
					</picker>
					<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
				</view> -->
				<view class="sAddress son" v-if="isShuttle">
					<view class="text">接送地址</view>
					<input type="text" :disabled="true" v-model="addName" placeholder="请选择地址" @click="chooseAddress()">
					<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
				</view>
				<button :disabled="!valid" @click="toBooking()">确定</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import moment from 'moment'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				isShuttle: false, //是否选择接送
				receive: 1, //该时间段是否可接送
				formattedDate: null, //今天的日期(yyyy-mm-dd)
				formattedDateEnd: null,
				isSub: false,
				type: '请选择驾照类型',
				typeName: ['c1(手动档)', 'c2(自动挡)', 'c3(小车)', 'A2(货车)', 'B2(货车)', 'A1(客车)', 'A3(客车)', 'B1(客车)', 'D(摩托车)',
					'E(摩托车)', 'F(摩托车)'
				],
				pTime: '请选择练车时间',
				sTime: '请选择接送时间',
				pDate: '请选择练车日期',
				course: '',
				site: '',
				addTime: null,
				practiceTime: ['7月28日14:00到17:00', '7月29日14:00到17:00', '7月30日14:00到17:00', '7月31日14:00到17:00'],
				shuttleTime: ['7月28日14:00', '7月29日14:00'],
				courseType: ['科目二', '科目三'],
				name: null,
				phone: null,
				jiesongStatu: null,
				carTime: null,
				mpTime: null,
				address: null,
				addName: null,
				addressLongitude: null,
				addressLatitude: null,
			}
		},

		methods: {
			initChange() {
				this.name = this.name1
				this.phone = this.phone1

			},
			...mapActions({
				toBooking_fun: 'booking/toPractice',
				getPTime_fun: 'booking/getPTime',
				getSite_fun: 'booking/getSite',
				getPersonMsg_fun: 'user/getPerson',
				getRule_fun: 'booking/getBookingRule',
			}),
			//选择日期
			chooseDate(e) {
				// console.log(e);
				this.pDate = e.detail.value
				this.addTime = e.detail.value
				// var l = moment(e.detail.value).unix()
				// console.log(l,e,'?');
				// this.addTime = l
			},
			//选择驾照类型
			changeType(e) {
				this.type = this.typeName[e.detail.value]
			},
			//选择练车时间
			chooseTime(e) {
				this.isShuttle = false
				this.address = ''
				this.addName = ''
				this.addressLatitude = ''
				this.addressLongitude = ''
				this.pTime = this.timeList[e.detail.value].carTime
				this.receive = this.timeList[e.detail.value].receive
			},
			//选择练车科目
			chooseCourse(e) {
				this.course = this.courseType[e.detail.value]
			},
			//选择练车场地
			choosesite(e) {
				// console.log(e);
				this.site = this.sites[e.detail.value].siteName
			},
			//选择接送时间
			chooseShuttleTime(e) {
				this.sTime = this.shuttleTime[e.detail.value]
			},
			shuttle() {
				this.isShuttle = !this.isShuttle
			},

			//获取练车场地列表
			async getSite() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getSite_fun(data)
			},
			async toBooking() {
				let jiesongStatu = 0
				if (this.isShuttle) {
					jiesongStatu = 1
				}
				if (this.name && this.phone && this.type != '请选择驾照类型' && this.course != '请选择练车科目' && this.pTime !=
					'请选择练车时间' && this.valid) {
					if (this.phone.length < 11) {
						this.$win.nlog('手机号不足11位')
						return
					}
					// this.isSub = true
					let data = {
						userId: this.$db.getSync('userId'),
						name: this.name,
						phone: this.phone,
						carType: this.type,
						object: this.course,
						jiesongStatu,
						carTime: this.pTime,
						mptime: this.sTime,
						address: this.address,
						addName: this.addName,
						longitude: this.addressLongitude,
						latitude: this.addressLatitude,
						site: this.site,
						addTime: this.addTime,
					}
					let res = await this.toBooking_fun(data)
				} else {
					this.$win.nlog('请填写完整信息')
					return
				}
			},
			chooseAddress() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.chooseLocation({
							latitude: latitude,
							longitude: longitude,
							success: (res1) => {
								console.log(res1);
								// this.address=res1.address+' '+res1.address
								this.address = res1.address
								this.addName = res1.name
								this.addressLatitude = res1.latitude
								this.addressLongitude = res1.longitude
							}
						});
					}
				})
			},
			timeToMinutes(time) {
				const [hours, minutes] = time.split(":");
				return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
			},

			async getTime() {
				let data = {}
				let res = await this.getPTime_fun(data)
			},

			async getRule() {
				await this.getRule_fun({
					way: 1
				}).then(() => {
					let date = new Date().getTime()
					// console.log(date, "date1111111111111111")
					// console.log(moment(date).format('YYYY-MM-DD'), "date2222")
					let currentDate = new Date(); // 获取当前日期对象
					let currentHour = currentDate.getHours(); // 获取当前小时数
					let currentMinute = currentDate.getMinutes(); // 获取当前分钟数
					let currentTotalMinutes = currentHour * 60 + currentMinute;
					// console.log(this.bookingRule)
					let endTime = date + this.bookingRule.days * 24 * 60 * 60 * 1000 //提前多少天的时间戳
					// console.log(endTime, 'endTime');
					// console.log(this.bookingRule.endTime)
					let endTimeMinutes = this.timeToMinutes(this.bookingRule.endTime);
					console.log(endTimeMinutes)
					if (currentTotalMinutes >= endTimeMinutes) {
						endTime += 1 * 24 * 60 * 60 * 1000
						this.formattedDate = moment(endTime).format('YYYY-MM-DD')
						console.log("cc")
					} else {
						this.formattedDate = moment(endTime).format('YYYY-MM-DD')
					}
					console.log(this.formattedDate, "this.formattedDate")
					// this.formattedDateEnd = moment(endTime).format('YYYY-MM-DD')
				})
			}
		},
		computed: {
			...mapState({
				pRes: state => state.booking.pRes,
				timeList: state => state.booking.timeList,
				sites: state => state.booking.site,
				personMsg: state => state.user.getPersonRes,
				name1: state => state.user.name,
				phone1: state => state.user.phone,
				bookingRule: state => state.booking.bookingRule,
			}),
			valid() {
				return this.name && this.phone && this.type != '请选择驾照类型' && this.course != '' && this.site != '' && this
					.pTime != '请选择练车时间' && this.pDate != '请选择练车日期' && (!this.isShuttle || this.addName)
			},

			// name: {
			// 	get() {
			// 		return this.$store.state.user.getPersonRes.name?this.$store.state.user.getPersonRes.name:null;
			// 	},
			// 	set(value) {
			// 		if(value)
			// 		this.$store.commit('user/getPersonRes', value);
			// 		else value=null
			// 	},
			// 	initialName() {
			// 		return this.$store.state.user.getPersonRes.name;
			// 	},
			// },
			// phone: {
			// 	get() {
			// 		return this.$store.state.user.getPersonRes.phone?this.$store.state.user.getPersonRes.phone:null;
			// 	},
			// 	set(value) {
			// 		if(value)
			// 		this.$store.commit('user/getPersonRes', value);
			// 		else value=null
			// 	},
			// 	initialName() {
			// 		return this.$store.state.user.getPersonRes.phone;
			// 	},
			// },

		},
		onShow() {
			this.getTime()
			this.getSite()
			this.initChange()
		},
		mounted() {
			let date = new Date().getTime()
			this.formattedDate = moment(date).format('YYYY-MM-DD')
			this.getRule()

		},

	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	/* 上半部分start */
	.userMsg .header {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		padding: 0 0 50rpx;
		background: #ffffff;
	}

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

	.name,
	.phone,
	.type,
	.course {
		display: flex;
		width: 690rpx;
		height: 90rpx;
		margin-top: 30rpx;
		background: #f2f2f2;
		border-radius: 8rpx;
	}

	.name input,
	.phone input,
	.sAddress input {
		/* 		background-color: pink; */
		height: 100%;
		width: 578rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
	}

	.typeChoose,
	.courseChoose {
		width: 578rpx;
		height: 100%;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 90rpx;
		/* background-color: pink; */
	}

	/* 上半部分end */


	/* 下半部分start */

	.body {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20rpx;
		padding: 40rpx 0;
		height: 750rpx;
		background-color: #ffffff;
	}


	.isShuttle {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		padding: 0 30rpx 10rpx;
	}

	.isShuttle .title {
		// width: 128rpx;
		height: 100%;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 60rpx;
	}

	.practiceDate,
	.practiceTime,
	.shuttleTime,
	.sAddress {
		display: flex;
		width: 690rpx;
		height: 90rpx;
		margin-top: 30rpx;
		background: #f2f2f2;
		border-radius: 8rpx;
	}



	.chooseTime,
	.shuttle {
		width: 578rpx;
		height: 100%;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 90rpx;
	}

	button {
		position: absolute;
		top: 520rpx;
		font-size: 32rpx;
		color: #fff;
		width: 580rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
	}

	/* 下半部分end */

	.son {
		position: relative;

		.triangle {
			position: absolute;
			top: 40rpx;
			right: 40rpx;
			width: 25rpx;
			height: 18rpx;
		}
	}
</style>