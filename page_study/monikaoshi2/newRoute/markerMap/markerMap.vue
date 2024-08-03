<!-- 移动位置并添加指令 -->
<template>
	<view>
		<!-- 地图 -->
		<view class="map">
			<map name="marker" :id="maps" scale="19" :polyline="polyLine()" :longitude="longitude" :latitude="latitude"
				:markers="markers" :circles="circles" @markertap="clickMark" @callouttap="clickCallout"
				show-compass="true" enable-3D="true" show-location="true" enable-traffic="true" enable-rotate="true" @tap="markLocation"
				style="width: 100%;height: 70vh"></map>
		</view>

		<!-- 标记指令 -->
		<view class="box">
			<view class="son" v-for="(k,i) in 15" @click="chooseCommond(i)" :key="i">
				<image :src="cdn+'/image/study/sourse3/voice/'+(i+1)+'.png'" mode="aspectFill"></image>
				<text>{{'指令'+(i+1)}}</text>
			</view>
		</view>

		<!-- 保存 -->
		<view class="save" @click="openTxTool()">保存</view>
		<!-- <button class="save">保存</button> -->
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
				maps: 1,
				longitude: null,
				latitude: null,
				//距离
				disArr:[],
				//标记点的经纬度
				points: [],
				//圆
				circles: [],
				// 标记点
				markers: [],
				markersIndex: 0, //点的序号
				markersIcon: null, //标记点执行的指令图标
				markersName: null, //标记点执行的指令名
				delMarkNum: 0, //记录删除了多少个标点
			}
		},
		methods: {
			//在地图上标点
			markLocation(e) {
				if (this.markersIcon == null && this.markersName == null) {
					this.$win.nlog('请先选择指令')
				} else {
					let location = {
						latitude: e.detail.latitude,
						longitude: e.detail.longitude,
					}
					let sign = {
						...location,
						id: this.markersIndex,
						width: 30,
						height: 30,
						alpha: 0.7,
						iconPath: this.markersIcon,
						callout: {
							content: this.markersName,
							color: '#383838',
							bgColor: '#fff',
							fontSize: '24rpx',
							padding: 5,
							borderColor: '#45d079',
							borderWidth: '3rpx',
							display: 'ALWAYS',
							borderRadius: '5'
						}
					}
					let circle = {
						radius: 6,//单位米
						color: '#AACCEE',
						fillColor: '#AACCEE32',
						strokeWidth: 2,
						...location
					}
					this.points.push(location)
					this.circles.push(circle)
					this.markers.push(sign)
					this.markersIndex++ //点索引id++
					this.markersName = null //指令名清空
					this.markersIcon = null //指令icon清空
				}
			},
			//返回标记的点的路线
			polyLine() {
				if (this.points.length >= 2) {
					return [{
						points: [...this.points],
						color: '#cc463d',
						width: 2
					}]
				}
				return []
			},
			//选择指令
			chooseCommond(i) {
				this.$win.nlog('选择了:指令' + (i + 1))
				this.markersIcon = this.cdn + '/image/study/sourse3/voice' + '/' + (i + 1) + '.png'
				this.markersName = '指令' + (i + 1)
			},
			//点击标记点
			clickMark(e) {
				console.log('点击标记');
			},
			//点击气泡
			clickCallout(e) {
				console.log('点击气泡', e);
				console.log(e.detail.markerId);
				this.delMark(e.detail.markerId - this.delMarkNum); //以标点ID减去删除的标点数为index传参
			},
			//删除指令点
			delMark(index) {
				uni.showModal({
					title: '是否删除该点',
					content: '指令1',
					cancelText: '取消删除',
					confirmText: '删除',
					success: (res) => {
						if (res.confirm) {
							this.circles.splice(index, 1)
							this.markers.splice(index, 1)
							this.points.splice(index, 1)
							this.delMarkNum++
							this.$win.nlog('删除成功!')
						} else if (res.cancel) {
							this.$win.nlog('取消删除!')
						}
					},
					fail: (err) => {
						console.log('错误', err);
					}
				})
			},
			//打开腾讯地图插件
			openTxTool() {
				const key = '3LUBZ-GBP6W-FBSRJ-R3E5G-DYQ66-YCB5R'; //使用在腾讯位置服务申请的key
				const referer = '乐驾团'; //调用插件的app的名称
				const location = JSON.stringify({
					latitude: this.latitude,
					longitude: this.longitude
				});
				const category = '生活服务,娱乐休闲';

				wx.navigateTo({
					url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' +
						location + '&category=' + category
				})
			},
			//获取当前经纬度
			getLocation() {
				uni.getLocation({
					// <map> 组件的宽/高推荐写直接量，比如：750rpx，不要设置百分比值。
					// 谷歌地图使用 wgs84 坐标，其他地图使用 gcj02 坐标，用错坐标类型会显示偏移。
					// type: 'wgs84',
					type: 'gcj02',
					// isHighAccuracy: true,//高精度(可能会卡)
					success: (res) => {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						console.log('精度', res.accuracy)
						this.longitude = res.longitude
						this.latitude = res.latitude
					}
				})
			},
			//开启小程序接收位置
			locationUpdate() {
				//接口未申请先注释
				this.$win.nlog('startLocationUpdate接口未申请成功。。。')
				// uni.startLocationUpdate({
				// 	success: (res) => {
				// 		console.log('开启小程序接收位置成功', res);
				// 		this.locationListen()
				// 	},
				// 	fail: (err) => {
				// 		console.log('开启小程序接收位置失败', err);

				// 	}
				// })
			},
			//监听实时地理位置变化
			locationListen() {
				this.$win.nlog('onLocationChange接口未申请成功。。。')
				// uni.onLocationChange((res) => {
				// 	console.log(res, '监听位置变化');
				// 	this.longitude = res.longitude
				// 	this.latitude = res.latitude
				// 	if(this.points.length!=0)
				// 	this.countDistance({longitude:this.longitude,latitude:this.latitude},this.points)
				// })
			},
			//关闭监听
			stopListen() {
				this.$win.nlog('onLocationChange接口未申请成功。。。')
				console.log('退出页面');
				// uni.stopLocationUpdate({
				// 	success: (res) => {
				// 		console.log('关闭监听位置变化');
				// 	},
				// 	fali: (err) => {
				// 		console.log('监听位置变化关闭失败');
				// 	}
				// })
			},
			//计算距离
			countDistance(myObj,pointArr) {
				let PI = 3.14159265358979323; //圆周率
				let R = 6371229; //地球半径
				var lon1 = myObj.longitude;
				var lat1 = myObj.latitude;
				let arr=[]
				for(let i=0;i<pointArr.length;i++){
					var lon2 = pointArr[i].longitude;
					var lat2 = pointArr[i].latitude;
					let x, y, distance;
					let lonres = lon1 > lon2 ? lon1 - lon2 : lon2 - lon1;
					let latres = lat1 > lat2 ? lat1 - lat2 : lat2 - lat1;
					x = (lonres) * PI * R * Math.cos(((lat1 + lat2) / 2) * PI / 180) / 180;
					y = (lat2 - lat1) * PI * R / 180;
					distance = Math.hypot(x, y);
					console.log('NO'+i,distance+'米')
					arr.push(distance)
				}
				this.disArr=arr
				
				// return distance
			}
		},
		computed: {

		},
		onLoad() {
			this.getLocation()
			this.locationUpdate()
		},
		onHide() {
			//隐藏页面
			// this.stopListen()
		},
		onUnload() {
			//卸载页面
			this.stopListen()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}


	.box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 3rpx;
		width: 100%;
		height: 23vh;
		max-height: 23vh;
		overflow-y: auto;

		// background-color: pink;
		.son {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 25%;
			height: 187rpx;
			box-sizing: border-box;
			border: 2rpx solid #f2f3f5;
			background-color: #ffffff;

			image {
				width: 90rpx;
				height: 90rpx;
				// border-radius: 50%;
				// background-color: skyblue;
			}

			text {
				margin-top: 12rpx;
				max-width: 150rpx;
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

			}
		}
	}

	.save {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 104rpx;
		line-height: 104rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}
</style>
