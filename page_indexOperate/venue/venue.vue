<!-- 附近场地 -->
<template>
	<view>
		<view class="father">
			<image class="novenue" :src="cdn+'/image/noList/noVenue.png'" mode="aspectFill" v-if="(venueList==0)?'true':false"></image>
			<text class="text" v-if="(venueList==0)?'true':false">
				暂无驾校
			</text>
			<view class="son" v-for="(k,i) in venueList" :key="i" @click="this.$win.show('venueDetail/venueDetail'+'?id='+k.schoolId)"  v-else>
				<image :src="cdn+'/school/'+k.schoolPhoto[0]" mode="aspectFill" style="background-color: #f2f3f5;"></image>
				<text class="name">{{k.schoolName}}</text>
				<text class="address">{{k.schoolPlace}}</text>
				<view class="coachNum">{{k.coachNum}}位教练</view>
				<view class="carNum">{{k.carNum}}辆教练车</view>
				<view class="position" v-show="false">
					<!-- //点击position盒子打开地图没做 -->
					<image :src="cdn+'/image/venue/locationIcon.png'" mode="aspectFill" class="arrowhead"></image>
					<text class="distance">{{(k.distance/1000).toFixed(2)+'km'}}</text>
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
	import moment from 'moment'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				page:1,
				location: {},
				
			}
		},
		computed: {
			...mapState({
				venueList: state => state.venue.venueList,
				venueNameList: state => state.venue.venueNameList,
				
				
			})
		},
		methods: {
			...mapActions({
				
				getVenueList_fun: 'venue/getVenueList',
				getVenueNameList_fun: 'venue/getVenueNameList',
				
			}),
			//获取当前位置
			async getLocation() {
				uni.getLocation({
					type: 'wgs84',
					altitude: true,
					success: (res) => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude,
							// longitude: res.latitude,
							// latitude: res.longitude,
						}
						console.log('经度：'+res.longitude)
						console.log('纬度：'+res.latitude)
						console.log(JSON.stringify(this.location))
						this.getVenueList() 
					},
				})
				
			},

			async getVenueList(pagePlus) {
				if(pagePlus){
					this.page++
				}
				else{
					this.page=1
				}
				let data = {
					city: '梅州',
					page: this.page,
					...this.location
				}
				let res = await this.getVenueList_fun(data)
				if(res&&pagePlus&&res.schools.list.length==0)
				{
					this.page--
				}
				
			},
			async getVenueNameList() {
				let data = {
					city: '梅州',
				}
				let res = await this.getVenueNameList_fun(data)
				console.log('驾校名列表', res)
			},
			async getVenuePhotoList() {
				let data = {
					city: '梅州',
				}
				let res = await this.getVenuePhotoList_fun(data)
				console.log('驾校图片列表', res)
			},
			
		
		},
		onShow() {
				this.getLocation()
		},
		onReady() {
			
		},
		onInit() {
			
		},
		onLoad(option) {
			
		},
		onReachBottom() {
			this.getVenueList(1)
		}
		
	}
</script>

<style>
	page {
		background: #f2f3f5;
	}

	.father {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		padding-top: 20rpx;

	}

	.father .novenue {
		position: absolute;
		top: 287rpx;
		left: 212rpx;
		width: 326rpx;
		height: 177rpx;
	}

	.father .text {
		position: absolute;
		top: 494rpx;
		left: 319rpx;
		width: 112rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 40rpx;
	}

	.father .son {
		position: relative;
		margin: 0 24rpx 20rpx;
		width: 702rpx;
		height: 188rpx;
		background: #ffffff;
		border-radius: 8rpx;
	}

	.father .son image {
		position: absolute;
		top: 24rpx;
		left: 20rpx;
		width: 140rpx;
		height: 140rpx;
		/* background-color: #dff9dc; */
	}

	.father .son text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.father .son .name {
		position: absolute;
		top: 24rpx;
		left: 180rpx;
		width: 224rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #111111;
		line-height: 29rpx;
	}

	.father .son .address {
		position: absolute;
		top: 68rpx;
		left: 180rpx;
		width: 339rpx;
		height: 26rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 30rpx;
	}

	.father .son .coachNum {
		position: absolute;
		left: 180rpx;
		top: 118rpx;
		width: 109rpx;
		height: 36rpx;
		background: #ffecd9;
		border-radius: 2rpx;
		font-size: 20rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #f17516;
		line-height: 36rpx;
	}

	.carNum,
	.coachNum {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.father .son .carNum {
		position: absolute;
		top: 118rpx;
		left: 305rpx;
		width: 131rpx;
		height: 36rpx;
		background: #dff9dc;
		border-radius: 2rpx;
		font-size: 20rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #29c563;
		line-height: 36rpx;
	}

	.father .son .position {
		position: absolute;
		top: 24rpx;
		right: 0rpx;
		height: 140rpx;
		width: 156rpx;
		/* background-color: skyblue; */
		border-left: #e3e3e3 solid 2rpx;
	}

	.father .son .position .arrowhead {
		position: absolute;
		top: 26rpx;
		left: 57rpx;
		/* background-color: yellowgreen; */
		width: 54rpx;
		height: 58rpx;
	}

	.father .son .position .distance {
		position: absolute;
		bottom: 20rpx;
		right: 36rpx;
		width: 84rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #666666;
		line-height: 29rpx;
	}
</style>
