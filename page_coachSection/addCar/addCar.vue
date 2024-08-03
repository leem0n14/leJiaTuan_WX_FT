<!-- 添加车辆 -->
<template>
	<view>
		<view class="box1">
			<view class="input">
				<view class="t1">车型信息</view>
				<view class="t2">
					<input type="text" v-model="carType" :disabled="isBan" placeholder="请输入车型信息(例:比亚迪白色)"
						style="width: 450rpx;">
					<!-- <picker mode="selector" :range="carList" @change="bindPickerChange()">
						<view>{{chooseCar}}</view>
					</picker> -->
				</view>
				<image :src="cdn+'/icon/triangle.svg'" mode="aspectFill"></image>
			</view>
			
			<view class="input">
				<view class="t1">车牌号码</view>
				<view class="t2" @click="input">
					<input type="text" v-model="province" class="font" placeholder-style="color:#fff" :disabled="isBan">
					<input type="text" placeholder="请输入车牌号(左边输入省份)" :disabled="isBan" v-model="carId" maxlength="6"
						style="width: 400rpx;">
				</view>
			</view>
		</view>
		<view class="box3">
			<view class="type son">
				<view class="text">驾照类型</view>
				<picker mode="selector" :range="typeName" @change="changeType" class="typeChoose">
					<view>{{type}}</view>
				</picker>
				<image :src="cdn+'/icon/triangle.svg'" class="triangle" mode=""></image>
			</view>
		</view>
		<view class="box2">
			<view class="son" v-for="(k,i) in msgList" :key="i" v-if="carId?carId.length:0>=6">
				<view class="up">
					<view class="name">
						<image :src="cdn+'/coachSection/icon/'+k.pic" mode="aspectFill"></image>
						<text>{{k.name}}</text>
					</view>
					<view class="num" @click="$win.show('record/record?name='+k.name+'&carId='+msg.carId+'&type='+i)">
						<text>共{{k.num}}条</text>
						<image src="/static/images/icon/arrow-right-bold.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="mid">
					<!-- {{k.content}} -->
				</view>
				<view class="down" @click="carId?$win.show(k.link+'?carId='+province+carId):$win.nlog('请先输入车牌号')">
					<image src="/static/images/icon/add.svg" mode="aspectFill"></image>
					<view>记录</view>
				</view>
			</view>
			
		</view>
		
		
		<button class="sub" @click="add_Car()" :disabled="carId==null||carType==null||province==''" >确定</button>
		<button class="sub1" @click="subCar()"  v-if="haveCarid" style="margin-bottom: 20rpx;">删除</button>
		
		
		<!-- 选择是否确定 -->
		<view class="chooseCar" v-show="isShowChoose">
			<view class="mask" @click="isShowChoose=false;orderId=null"></view>
			<view class="content">
				<view class="title">
					是否确定删除
				</view>
				<view class="content-button">
					<view class="queren1" @click="jiedan1()">
						取消
					</view>
					<view class="queren" @click="jiedan()">
						确认
					</view>
				</view>
				
			</view>
		</view>
		
		
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
				province: '粤',
				carId: null,
				isBan: false,
				haveCarid:false,
				isNewCar: false,
				isShowChoose:false,
				carList: ['car1', 'car2'],
				chooseCar: '请选择车型信息',
				
				carType: null,
				type: 'c1(手动档)',
				typeName: ['c1(手动档)', 'c2(自动挡)', 'c3(小车)', 'A2(货车)', 'B2(货车)', 'A1(客车)', 'A3(客车)', 'B1(客车)', 'D(摩托车)',
					'E(摩托车)', 'F(摩托车)'
				],
				msgList: [{
						pic: '/insurance.png',
						name: '保险',
						num: 0,
						content: '--到期',
						link: 'insure/insure',
					},
					{
						pic: 'maintenance.png',
						name: '保养',
						num: 0,
						content: '--元',
						link: 'maintain/maintain',
					},
					{
						pic: 'accident.png',
						name: '出险',
						num: 0,
						content: '--次',
						link: 'accident/accident',
					},
					{
						pic: 'fix.png',
						name: '维修',
						num: 0,
						content: '--元',
						link: 'fix/fix',
					}
				]
			}
		},
		methods: {
			...mapActions({
				addCar_fun: 'coachSection/addCar',
				getCar_fun: 'coachSection/getCarMsg',
				getRecord_fun: 'coachSection/recordNum',
				postCoachDelate_fun:'coachSection/postCoachDelate'
			}),
			bindPickerChange(e) {
				console.log(e)
			},
			input() {

			},
			//选择驾照类型
			changeType(e) {
				this.type = this.typeName[e.detail.value]
			},
			subCar()
			{
				this.isShowChoose = true;
			},
			subCar1()
			{
				this.isShowChoose = true;
			},
			jiedan(){
				this.postCoachDelate()
				this.isShowChoose = false;
			},
			jiedan1()
			{
				this.isShowChoose = false;
			},
			add_Car()
			{
				this.addCar()
			},
			async addCar() {
				let carId = this.province + this.carId
					if (carId.length< 7) {
					this.$win.nlog('车牌号位数填写有误')
					return
				}
				let data = {
					userId: this.$db.getSync('userId'),
					carType: this.carType,
					carId,
					carForm:this.type
				}
				let res = await this.addCar_fun(data)
					wx.navigateBack({
					delta: 1
				})
			},

			async getCarMsg(id) {
				let data = {
					id,
				}
				let res = await this.getCar_fun(data)
				// console.log('8',res);
			},

			async getRecord(carId) {
				let data = {
					carId,
				}
				let res = await this.getRecord_fun(data)
			},
			async postCoachDelate() {
				let data = {
					id:this.msg.id
				}
				let res = await this.postCoachDelate_fun(data)
				
				wx.navigateBack({
				  delta: 1
				})
				
			},
			
		},
		computed: {
			...mapState({
				//车辆信息
				msg: state => state.coachSection.carMsg,
				//记录条数
				num: state => state.coachSection.recordNum,
				
				delateCar: state => state.coachSection.delateCar,
			})
		},
		onShow() {
			//自己理解
			if(this.province&&this.carId){
				this.getRecord(this.province + this.carId).then(() => {
					this.msgList[0].num = this.num.Bxsum
					this.msgList[1].num = this.num.Bysum
					this.msgList[2].num = this.num.Cxsum
					this.msgList[3].num = this.num.Wxsum
				})
			}
			
		},
		onLoad(e) {
			console.log(e);
			if (e.id) {
				// id数据库车id，carId车牌号
				this.isBan = true
				// console.log('carId',e.id);
				this.getCarMsg(e.id).then(() => {
					this.carType = this.msg.carType
					this.province = this.msg.carId[0]
					this.carId = this.msg.carId.slice(1, 7)
				})

			} else {

			}
			if (e.carId) {
				this.haveCarid=true //控制新增车辆按钮是否显示
				this.getRecord(e.carId).then(() => {
					this.msgList[0].num = this.num.Bxsum
					this.msgList[1].num = this.num.Bysum
					this.msgList[2].num = this.num.Cxsum
					this.msgList[3].num = this.num.Wxsum
				})
			} else {

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.box1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		// margin-top: 128rpx;
		width: 750rpx;
		    height: 250rpx;
		    box-sizing: border-box;
		    padding: 40rpx 0 0rpx;
		background: #ffffff;

		.input {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 690rpx;
			height: 90rpx;
			margin-bottom: 30rpx;
			background: #f2f2f2;
			border-radius: 8rpx;
			box-sizing: border-box;
			padding: 0 30rpx;

			.t1 {
				margin-right: 30rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}

			.t2 {
				display: flex;
				align-items: center;
				// justify-content: space-between;
				width: 450rpx;
				height: 90rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;

				.font {
					position: relative;
					background: #29c563;
					border-radius: 2rpx;
					text-align: center;
					width: 46rpx;
					height: 46rpx;
					box-sizing: border-box;
					font-size: 32rpx;
					line-height: 46rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					color: #fff;
					margin-right: 10rpx;

					&::after {
						position: absolute;
						bottom: 0;
						right: 0;
						width: 0;
						height: 0;
						content: '';
						border-bottom: 7rpx solid #000;
						border-right: 7rpx solid #000;
						border-top: 7rpx solid #29c563;
						border-left: 7rpx solid #29c563;
					}
				}

				picker {
					width: 100%;
					height: 100%;

					view {
						line-height: 90rpx;
					}
				}

			}

			image {
				position: absolute;
				right: 30rpx;
				width: 25rpx;
				height: 18rpx;
			}
		}
	}

	.box2 {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		width: 750rpx;
		box-sizing: border-box;
margin-top: 20rpx;

		.son {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			min-width: 330rpx;
			min-height: 312rpx;
			box-sizing: border-box;
			padding: 0 24rpx;
			background-color: #ffffff;
			border-radius: 16rpx;
			margin-bottom: 30rpx;

			.up {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;

				.name {
					display: flex;
					flex-direction: row;
					align-items: center;

					image {
						margin-right: 10rpx;
						width: 38rpx;
						height: 38rpx;
						// background: #37ca6e;
					}

					text {
						font-size: 30rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Bold;
						font-weight: 700;
						text-align: left;
						color: #333333;
					}
				}

				.num {
					display: flex;
					flex-direction: row;
					align-items: center;

					text {
						line-height: 24rpx;
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: right;
						color: #666666;
					}

					image {
						width: 17rpx;
						height: 17rpx;
						// background-color: #666666;
					}
				}
			}

			.mid {
				font-size: 26rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
			}

			.down {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 200rpx;
				height: 60rpx;
				background: #e8fbef;
				border-radius: 30rpx;

				image {
					margin-right: 4rpx;
					width: 26rpx;
					height: 26rpx;
					// background: #29c563;
				}

				view {
					line-height: 30rpx;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #29c563;
				}
			}
		}
	}


	.sub {
		margin-top: 30rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		width: 580rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
	}
	.sub1 {
		margin-top: 30rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		width: 580rpx;
		height: 90rpx;
		line-height: 90rpx;
		    background: linear-gradient(134deg, #ea948e, #a21341 99%);
		border-radius: 45rpx;
	}
	
	
	// 驾照类型
	.box3{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 30rpx 0;
		width: 750rpx;
		    height: 172rpx;
		box-sizing: border-box;
		background: #ffffff;
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
	
	.chooseCar {
			position: fixed;
			top: 400rpx;
			left: 55rpx;
			z-index: 999;
			width: 640rpx;
			height: 470rpx;
			border-radius: 16rpx;
	
			.mask {
				position: absolute;
				left: -55rpx;
				top: -400rpx;
				width: 100vh;
				height: 100vh;
				opacity: 0.5;
				background: #000000;
			}
	
			.content {
				display: flex;
				flex-direction: column;
				// align-items: center;
				// justify-content: space-between;
				position: absolute;
				top: 0;
				left: 0;
				width: 640rpx;
				height: 470rpx;
				background: #fff;
				border-radius: 16rpx;
	
				.title {
					margin-top: 50rpx;
					font-size: 34rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Bold;
					font-weight: 700;
					text-align: center;
					color: #111111;
				}
	
				.content-button
				{
					display: flex;
					justify-content: space-between;
					.queren {
					margin-right: 43rpx;
					margin-top: 80rpx;
					    width: 248rpx;
					height: 88rpx;
					line-height: 88rpx;
					background: linear-gradient(134deg, #ea948e, #a21341 99%);
					border-radius: 44rpx;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
				}
				.queren1 {
					margin-left: 43rpx;
					margin-top: 80rpx;
					    width: 248rpx;
					height: 88rpx;
					line-height: 88rpx;
					    background: linear-gradient(134deg, #606b65, #536359 99%);
					border-radius: 44rpx;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
				}
				}
	
				
			}
		}
	
	
</style>
