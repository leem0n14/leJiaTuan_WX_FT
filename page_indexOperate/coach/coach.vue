<!-- //教练团 -->
<template>
	<view class="coach">
		<view class="nav">
			<view class="sort">
				<picker mode="selector" :range="sortType" @change="setSort" :value="sortIndex">
					<view class="display">{{sortType[sortIndex]}}</view>
				</picker>
			</view>
			<view class="school">
				<picker mode="selector" :range="schools" @change="setSchool" :value="schoolIndex">
					<view class="display">{{schools[schoolIndex]}}</view>
				</picker>
			</view>
		</view>
		<scroll-view class="coachList">
			<view class="lists" v-for="(k,i) in coachList" :key="k.coachId" @click="this.$win.show('coachDetail/coachDetail?id='+k.coachId)">
				<image :src="cdn+'/coach/'+k.coachPhoto" mode="aspectFill" class="coachPic"></image>
				<view class="coachName">{{k.coachName}}</view>
				<view class="school">{{k.school}}</view>
				<view class="score">
					<uni-rate :value="k.evaluation" :readonly="true" size="30rpx"></uni-rate>
				</view>
				<view class="scoreNum">{{k.evaluation.toFixed(1)}}</view>
				<view class="labels">
					<view class="son" :class="labelStyle[index]" v-for="(item,index) in k.tags" :key="index">
						{{item}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="noCoach" v-if="(coachList.length==0)?true:false">
			<image :src="cdn+'/image/noList/noCoach.png'" mode="aspectFill" ></image>
			<text>暂无教练</text>
		</view>
		<view class="beCoach" @click="this.$win.show('beCoach/beCoach')">
			<image :src="cdn+'/image/coach/beCoach.png'" mode="aspectFill"></image>
		</view>
		
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import moment from 'moment'
	// import coachM from '@/store/modules/coach.js'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				sortIndex: 0,
				schoolIndex: 0,
				page:1,
				cityPosition: '梅州', //首页传过来的地址
				sortType: ['综合排序', '合格率排序', '评分排序', '排序3'],
				labelStyle: ['first', 'second', 'third'], //标签样式,
			}
		},
		computed: {
			...mapState({
				coachList: state => state.coach.coachList,
				schools:state=>state.coach.schools,
				
			})
		},
		methods: {
			...mapActions({
				getCoachList_fun: 'coach/getCoachList',
				getCitySchool_fun: 'coach/getCitySchool',
				getCoachBySchool_fun:'coach/getCoachBySchool',
				getDetail_fun:'coach/getCoachDetail',
			}),
			//查询
			queryData() {
				console.log(this.cityPosition)
				console.log('选择的驾校名',this.schools[this.schoolIndex])
			},
			//选择排序规则
			setSort(e) {
				console.log('选择排序规则')
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.sortIndex = e.detail.value
			},
			//选择驾校
			setSchool(e) {
				console.log('选择驾校')
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.schoolIndex = e.detail.value
				console.log(this.schoolIndex)
				this.queryData()
				if(e.detail.value==0){
					this.getCoachList()
				}
				else{
					this.getCoachBySchool()
				}
			},
			//传统请求（忽略）
			async listRequest() {
				uni.request({
					url: "http://192.168.1.114:8080/renren-fast/app/selectAllCoach",
					header:{
						'token':this.$db.getSync('token')
					},
					data: {
						city: '梅州',
						page: this.page,
					},
					method: 'POST',
					success: (res) => {
						console.log(res.data);
						this.result = res.data.coachs.list
						console.log(this.result)
					}
				});
			},
			//获得综合查询的教练列表
			async getCoachList(pagePlus) {
				if(pagePlus){
					console.log('下一页');
					this.page++
				}
				else {
					this.page=1
				}
				let data = {
					city: this.cityPosition,
					page: this.page,
					token:this.$db.getSync('token')
				}
				let res = await this.getCoachList_fun(data)
				if(res && pagePlus &&res.coachs.list.length==0){
					this.page--
				}
				// console.log(res)
			},
			//获得该城市的所有驾校名称
			async getCitySchool() {
				let data = {
					city: this.cityPosition,
				}
				let res = await this.getCitySchool_fun(data)
				// console.log(res)
			},
			
			//按驾校查询
			async getCoachBySchool(){
				let data={
					school:this.schools[this.schoolIndex],
					page:1,
				}
				let res =await this.getCoachBySchool_fun(data)
				// console.log(res)
			},
			
			//获得教练详细
			async getCoachDetail(id){
				console.log('st',id);
				let data={
					id,
				}
				let res=await this.getDetail_fun(data)
			}
		},
		onShow() {
			// this.result = this.coachMsg  
			// this.listRequest()
			this.getCoachList()
			this.getCitySchool()
			// this.getCoachDetail(1)
		},
		//页面滚动到底部触发
		onReachBottom(){
			this.getCoachList(1)
		},
		watch: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F3F5;
	}

	/* 顶部导航start */
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		width: 750rpx;
		height: 80rpx;
		background-color: #fff;
		z-index: 99;
	}

	.nav .sort,
	.nav .school {
		width: 50%;
		height: 100%;
	}

	.nav .sort {
		/* background-color: pink; */
	}

	.nav .school {
		/* background-color: skyblue; */
	}

	.display {
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		color: #29C563;
		// color: $theme-color;
	}

	/* 顶部导航end */


	/* 教练列表start */
	.coachList {
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.noCoach {
		position: relative;
	}

	/* 暂无教练start */
	.noCoach image {
		position: absolute;
		top: 217rpx;
		left: 212rpx;
		width: 326rpx;
		height: 167rpx;
	}

	.noCoach text {
		position: absolute;
		top: 414rpx;
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

	/* 暂无教练end */

	.coachList .lists {
		position: relative;
		margin: 1rpx 0;
		width: 750rpx;
		height: 180rpx;
		background: #ffffff;
	}

	.lists .coachPic {
		position: absolute;
		top: 30rpx;
		left: 34rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background-color: skyblue;
	}

	.lists .coachName {
		position: absolute;
		top: 30rpx;
		left: 168rpx;
		width: 84rpx;
		height: 28rpx;
		/* 溢出部分省略号 */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: left;
		color: #333333;
		/* background-color: #29C563; */
		line-height: 28rpx;
	}

	.lists .school {
		position: absolute;
		top: 70rpx;
		left: 168rpx;
		height: 24rpx;
		/* 溢出部分省略号 */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		/* background-color: orange; */
		line-height: 24rpx;
	}

	.lists .score {
		position: absolute;
		left: 274rpx;
		top: 28rpx;
	}

	.lists .scoreNum {
		position: absolute;
		top: 32rpx;
		right: 280rpx;
		width: 28rpx;
		height: 20rpx;
		font-size: 20rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 20rpx;
	}

	.lists .labels {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		position: absolute;

		bottom: 30rpx;
		left: 168rpx;
		height: 36rpx;
		border-radius: 2px;
	}

	/* 标签样式 */
	.lists .labels .son {
		margin-right: 32rpx;
		width: 97rpx;
		height: 36rpx;
		border-radius: 2rpx;
		font-size: 20rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		line-height: 36rpx;
	}

	.lists .labels .first {
		color: #f17516;
		background: #ffecd9;
	}

	.lists .labels .second {
		color: #29c563;
		background: #dff9dc;
	}

	.lists .labels .third {
		color: #4988f5;
		background: #c5daff;
	}

	/* 教练列表end */
	
	// 成为教练
	.beCoach{
		position: fixed;
		right: 0;
		bottom: 10vh;
		z-index: 999;
		width: 242rpx;
		height: 242rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	
</style>
