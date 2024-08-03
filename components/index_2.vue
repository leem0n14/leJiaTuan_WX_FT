<!-- 首页2 -->
<template>
	<view>
		<!-- 标题 -->
		<view class="title">
			<view class="text1">请选择您要考试的题库</view>
			<view class="text2">请选择驾照类型</view>
			<image :src="cdn+'/icon/warning.svg'" mode="aspectFill" class="warnIcon"></image>
		</view>
		<!-- 定位 -->
		<view class="position">
			<view class="position_left">
				<image :src="cdn+'/icon/location.svg'" alt=""></image>
				<view class="content">
					学车城市
				</view>
			</view>
			<view class="position_right">
				<view class="content">
					<picker mode="region" @change="changeCity">
						<view>
							<text>{{myregion}}</text>
							<image src="/static/images/icon/arrow-right-bold.png"></image>
						</view>
					</picker>
				</view>
			</view>
		</view>

		<!-- 选择类型 -->
		<view class="chooseType">
			<view class="typeTitle">
				驾驶证/资格证 （当前类型:{{name}}）
			</view>

			<view class="car_Type">
				<view class="son" v-for="(k,i) in carType" :key="k.id" @click="isAct(k,i)"
					:style="k.act? 'border:'+'1rpx' +' solid'+' #29c563':''">
					<image :src="cdn+(k.act?k.onPic:k.pic)" mode="aspectFit"></image>
					<view class="name" :style="k.act?'color:'+'#29c563':''">{{k.name}}</view>
					<view class="text" :style="k.act?'color:'+'#29c563':''">{{k.text}}</view>
					<view></view>
				</view>
			</view>
			<button :disabled="(name=='未选'||myregion=='选择省市')" @click="save">{{(statu=='no')?'下一步':'保存'}}</button>
		</view>

	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				//定位
				myregion: '选择省市',
				statu: null,
				name: '未选',
				typeNames: ['小车', '货车', '客车', '摩托车'],
				carType: [{
					pic: '/image/getStudentMsg/car.png',
					onPic: '/image/getStudentMsg/carOn.png',
					name: '小车',
					text: 'C1/C2/C3',
					act: false,
					id: 1,
				}, {
					pic: '/image/getStudentMsg/truck.png',
					onPic: '/image/getStudentMsg/truckOn.png',
					name: '货车',
					text: 'A2/B2',
					act: false,
					id: 2,
				}, {
					pic: '/image/getStudentMsg/bus.png',
					onPic: '/image/getStudentMsg/busOn.png',
					name: '客车',
					text: 'A1/A3/B1',
					act: false,
					id: 3,
				}, {
					pic: '/image/getStudentMsg/motor.png',
					onPic: '/image/getStudentMsg/motorOn.png',
					name: '摩托车',
					text: 'D/E/F',
					act: false,
					id: 4,
				}]
			}
		},
		methods: {
			...mapActions({
				changeTiku_fun:'user/changeTiku',
			}),
			changeCity(e) {
				this.myregion = e.detail.value[1].replace('市', '');
				console.log('成功切换')
			},
			isAct(k, i) {
				if (k.act == true) {
					for (var a = 0; a < this.carType.length; a++) {
						this.carType[a].act = false;
					}
					this.name = '未选'
				} else {
					for (var a = 0; a < this.carType.length; a++) {
						this.carType[a].act = false;
					}
					k.act = true
					this.name = this.typeNames[i]
				}
			},
			async save() {
				if (this.statu == "no") {
					this.$win.show('index_3' + '?city=' + this.myregion + '&type=' + this.name)
				} else {
					//发请求修改设置
					this.changeTiku()
					
				}

			},
			//更改题库
			async changeTiku(){
				let data={
					userId:this.$db.getSync('userId'),
					type:this.name,
					city:this.myregion
				}
				let res=await this.changeTiku_fun(data)
			}
		},
		computed:{
			...mapState({
				changeRes:state=>state.user.TikuRes,
			})
		},
		onShow() {

		},
		onLoad(op) {
			this.statu = op.statu
			this.myregion = this.$db.getSync('city')
			console.log('城市', this.myregion);
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #29C563;
	// }


	/* 标题start */
	.title {
		width: 750rpx;
		height: 300rpx;
		/* 	background: skyblue; */
	}

	.title .text1 {
		position: absolute;
		top: 99rpx;
		left: 115rpx;
		width: 520rpx;
		height: 52rpx;
		font-size: 52rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: center;
		color: #111111;
		line-height: 52rpx;
	}

	.title .text2 {
		position: absolute;
		top: 177rpx;
		left: 312rpx;
		width: 168rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 24rpx;
	}

	.title .warnIcon {
		position: absolute;
		top: 177rpx;
		left: 271rpx;
		width: 24rpx;
		height: 24rpx;
	}

	/* 标题end */

	/* 定位start */
	.position {
		display: flex;
		align-items: center;
		height: 80rpx;
		background-color: #fff;
		justify-content: space-between;
		padding: 0 24rpx;
	}

	.position_left {
		display: flex;
		align-items: center;
	}

	.position_left .content {
		margin-left: 10rpx;
	}

	.position_left image {
		width: 26rpx;
		height: 34rpx;
	}

	.position_right {
		display: flex;
		align-items: center;

	}

	.position_right picker view {
		display: flex;
		align-items: center;
	}

	.position_right picker image {
		height: 40rpx;
		width: 40rpx;
	}

	.position_right .content {
		font-size: 28rpx;
		color: #29C563;
	}

	/* 定位end */


	/* 选择类型start */

	.chooseType {
		position: relative;
		width: 750rpx;
		height: 822rpx;
		/* background: yellowgreen; */
	}

	.chooseType .typeTitle {
		position: absolute;
		top: 40rpx;
		left: 24rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 28rpx;
	}

	.chooseType .car_Type {
		display: flex;
		flex-direction: row;
		position: absolute;
		top: 120rpx;
		width: 100%;
		height: 200rpx;
		/* background: skyblue; */
		border-radius: 8rpx;
	}

	.chooseType .car_Type .son {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		width: 147rpx;
		height: 200rpx;
		background: #ffffff;
		border: 1rpx solid #c1c1c1;
		border-radius: 8px;
		margin: 0 20rpx;
	}



	.chooseType .car_Type .son image {
		position: absolute;
		top: 33rpx;
		width: 94rpx;
		height: 40rpx;
		/* 	background-color: skyblue; */
	}

	.chooseType .car_Type .son .name {
		position: absolute;
		top: 114rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		/* background-color: skyblue; */
	}

	.chooseType .car_Type .son .text {
		position: absolute;
		top: 154rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		/* background-color: skyblue; */
	}


	.chooseType button {
		position: absolute;
		top: 430rpx;
		left: 85rpx;
		width: 580rpx;
		height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		color: #ffffff;
	}

	/* 选择类型end */
</style>
