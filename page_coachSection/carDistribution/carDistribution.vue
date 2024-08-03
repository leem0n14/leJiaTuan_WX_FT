<!-- 车辆分配 -->
<template>
	<view>
		<!-- 无可分配车辆 -->
		<view class="noCar" v-if="!cars">
			<image :src="cdn+'/coachSection/background/noCar.png'" mode="aspectFill"></image>
			<text class="t1">暂无车辆</text>
			<view class="button" @click="this.$win.show('../addCar/addCar')">
				<!-- <image src="" mode="aspectFill"></image> -->
				<text style="font-size: 54rpx;color: #29c563;height: 54rpx;line-height: 54rpx;font-weight:200
				 ;margin-bottom: 2rpx;">+</text>
				<text class="t2">添加车辆</text>
			</view>
		</view>

		<!-- 分配列表 -->
		<view class="ul" v-else>
			<view class="title">
				<image :src="cdn+'/icon/warning.svg'" mode="aspectFill"></image>
				<text>请分配明日需要练车的学员</text>
			</view>
			<view class="li" v-for="(k,index) in fenListCar.cars" :key="index">
				<view class="carMsg">
					<text class="name">{{k.carType}}</text>
					<view class="plate">
						<view class="province">{{k.carId[0]}}</view>
						<view class="num">{{k.carId.slice(1)}}</view>
					</view>
				</view>

				<view class="students">
					<view class="son" v-for="(g,i) in k.studentEntityList" :key="i" @click="selectstudents(g.stuId)">
						<image :src="cdn+'/student/'+g.photo" mode="aspectFill"></image>
						<text>{{g.stuName}}</text>




					</view>
					<!-- <view class="son" v-for="(g,i) in 4-k.studentEntityList.length" :key="i">
						<image :src="cdn+'/coachSection/image/addStudent.png'" mode="aspectFill"></image>
						<text>{{g.stuName}}</text>
					</view> -->
				</view>

			</view>

		</view>


		<!-- 是否添加 -->
		<view class="chooseCar" v-show="isShowChoose">
			<view class="mask" @click="isShowChoose=false;orderId=null"></view>
			<view class="content">
				<view class="title">
					是否练车完成
				</view>
					
					
					
						<!-- <checkbox-group class="content-lable">
							<label style="min-width: 75%;margin: 10rpx 0;">
								<view >
									<checkbox value="false" checked="true" />科目二
								</view>
								<view >
									<checkbox value="false" checked="true" />科目三
								</view>
							</label>
						</checkbox-group> -->
						<u-subsection fontSize="26"  :list="['科目二','科目三']" :current="currNav" @change="sectionChange"></u-subsection>
					
				
							<view v-show="currNav==0">
								<checkbox-group class="content-lable" >
									<label v-for="(item,i) in TypeList " :key="i" style="min-width: 50%;margin: 10rpx 0;" @click="section_label(i)">
										<view >
											<checkbox value="false" :checked="item.bool"/>{{item.name}}
										</view>
									</label>
								</checkbox-group>
							</view>	
				<!-- <view class="choose"> -->

				<!-- <picker mode="selector" :range="listCar" range-key="carId" @change="bindPickerChange"
						:value="index">
						<view>{{choosedCar}}</view>
					</picker>
					<image :src="cdn+'/icon/triangle.svg'" mode="aspectFill"></image> -->
				<!-- </view> -->
				<view class="queren_flex">
					<view class="queren" @click="jiedan()">
						取消
					</view>
					<view class="queren1" @click="jiedan1()">
						确定添加
					</view>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters,
		mapMutations,
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				haveCar: true,
				isShowChoose: false,
				sss: '',
				pageSize:10,
				pageIndex:1,
				TypeList:[
						
					{
						name:'倒车入库(右)',
						bool:false,
					},
					{
						name:'倒车入库(左)',
						bool:false,
					},
					{
						name:'侧方停车',
						bool:false,
					},
					{
						name:'s弯',
						bool:false,
					},
					{
						name:'直角转弯',
						bool:false,
					},
					{
						name:'半坡停车',
						bool:false,
					},
				],
				currNav:0,
			}
		},
		computed: {
			...mapState({
				carList: state => state.coachSection.carsList,
				cars: state => state.coachSection.cars,
				fenListCar: state => state.coachSection.fenListCar,
			})


		},
		methods: {
			
			section_label(index)
			{
				this.TypeList[index].bool=!this.TypeList[index].bool
				console.log(this.TypeList[index].bool)
			},
			
			sectionChange() {
							this.currNav = !this.currNav
						},
			
			// gg(k)
			// {
			// 	console.log(k)
			// 	console.log(这是k的值)
			// },

			...mapActions({
				getCars_fun: 'coachSection/getCars',
				getFenListCar_fun: 'coachSection/getFenListCar',
				getFenUpdate_fun: 'coachSection/getFenUpdate',
			}),

			async getCars() {
				let data = {
					userId: this.$db.getSync('userId'),
				}
				let res = await this.getCars_fun(data)
			},
			async getFenListCar(i) {
				console.log('getFenListCar，拿列表');
				let data = {
					userId: this.$db.getSync('userId'),
					limit:this.pageSize,
					page:this.pageIndex,
					i:i?i:null,//是否拿第一页
				}
				let res = await this.getFenListCar_fun(data)
			},
			async getFenUpdate() {
				// 将选中数据整合到一个数组去
				let arr=[]
				for(let i=0;i<this.TypeList.length;i++){
					if(this.TypeList[i].bool){
						arr.push(this.TypeList[i].name)
					}
				}
				let data = {
					stuId: this.sss,
					typeList:arr,
					progress:(this.currNav+2)*10,
				}
				console.log('提交');
				let res = await this.getFenUpdate_fun(data).then((data)=>{
					this.getFenListCar()
				})
			},
			selectstudents(e) {
				this.sss = e
				this.isShowChoose = true
			},
			jiedan() {
				this.isShowChoose = false
			},
			jiedan1() {
				this.getFenUpdate()
				this.isShowChoose = false
				this.getCars()
				this.getFenListCar()				
			},
			onReachBottom(){
				this.pageIndex++
				this.getFenListCar()
			}
		},
		onShow() {
			this.getCars()
			this.getFenListCar(1)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.noCar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 396rpx auto 0;

		image {
			width: 326rpx;
			height: 196rpx;
			// background-color: skyblue;
		}

		.t1 {
			margin: 30rpx 0 24rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #999999;
		}

		.button {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 228rpx;
			height: 64rpx;
			border: 2rpx solid #29c563;
			box-sizing: border-box;
			border-radius: 34rpx;

			.t2 {
				line-height: 64rpx;
				font-size: 30rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #29c563;
			}

			image {
				margin-right: 4rpx;
				background-color: #29c563;
				width: 26rpx;
				height: 26rpx;
			}
		}
	}

	.ul {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		padding: 0 30rpx;
		box-sizing: border-box;

		.title {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 30rpx 0;

			image {
				margin-right: 8rpx;
				width: 30rpx;
				height: 30rpx;
				// background: #999999;
			}

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}
		}

		.li {
			display: flex;
			flex-direction: column;
			width: 690rpx;
			min-height: 279rpx;
			background: #ffffff;
			border-radius: 16rpx;
			box-sizing: border-box;
			padding: 30rpx 24rpx;
			margin-bottom: 20rpx;

			.carMsg {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 30rpx;

				.name {
					font-size: 34rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}

				.plate {
					display: flex;
					flex-direction: row;
					align-items: center;
					border-radius: 2rpx;
					border: 1rpx solid #333333;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;

					.province {
						width: 34rpx;
						height: 34rpx;
						line-height: 34rpx;
						background: #333333;
						color: #f2f3f5;
						border-right: 1rpx solid #333333;
					}

					.num {
						height: 34rpx;
						line-height: 34rpx;
						background: #f2f3f5;
						padding: 0 6rpx;
						color: #333333;
					}
				}
			}

			.students {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 10rpx 10rpx 0;
				max-width: 610rpx;
				overflow-x: auto;

				.son {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin-right: 40rpx;
					min-width: 102rpx;

					image {
						margin-bottom: 16rpx;
						width: 102rpx;
						height: 102rpx;
						background: #f2f3f5;
						border-radius: 50%;
					}

					text {
						font-size: 26rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #666666;
					}
				}
			}
		}
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
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			width: 640rpx;
			
			min-height: 503rpx; 
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

			.content-lable{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin-top: 20rpx;
				padding-left: 80rpx;
			}

			.choose {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-top: 80rpx;
				width: 560rpx;
				height: 88rpx;
				box-sizing: border-box;
				padding: 20rpx;
				background: #f2f3f5;
				border-radius: 16rpx;

				picker {
					width: 100%;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}

				image {
					// background: #a2e899;
					width: 25rpx;
					height: 18rpx;
				}
			}

			.queren_flex {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 491rpx;
				
				.queren {
					margin-top: 10rpx;
					width: 200rpx;
					height: 88rpx;
					line-height: 88rpx;
					background: linear-gradient(134deg, #ccc, #bbb 99%);
					border-radius: 44rpx;
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
				}

				.queren1 {
					margin-top: 10rpx;
					width: 200rpx;
					height: 88rpx;
					line-height: 88rpx;
					background: linear-gradient(134deg, #54d685, #29c563 99%);
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
	.title-view{
		font-size: 26rpx;
	}
</style>