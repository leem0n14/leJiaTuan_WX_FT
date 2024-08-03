<!-- 图标二级页面 -->
<template>
	<view>
		<view class="body">
			<view class="list" v-for="(item,index) in lists"
				@click="$win.show('l3/l3?title='+item.text+'&photo='+item.photo)">
				<image :src="cdn+`/sign/`+item.photo" mode="aspectFill"></image>
				<text>{{item.text}}</text>
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
				title: '',
				cdn: this.$conf.CDN_HOST,
				path:'/image/study/iconManagement/trafficSign',
				list: [{
						text: '禁止驶入',
						pic: '/11.png'
					},
					{
						text: '禁止三轮车机动车通过',
						pic: '/8.png'
					},
					{
						text: '禁止拖拉机驶入',
						pic: '/9.png'
					},
					{
						text: '禁止非机动车进入',
						pic: '/10.png'
					},
					{
						text: '禁止通行',
						pic: '/11.png'
					},
					{
						text: '禁止机动车驶入',
						pic: '/12.png'
					},
					{
						text: '禁止驶入',
						pic: '/11.png'
					},
					{
						text: '禁止驶入',
						pic: '/11.png'
					},
				],
				limit:10,
				page:1,
			}
		},
		computed:{
			...mapState({
				lists:state=>state.study.signList_3,
			})
		},
		methods: {
			setTitle(){
				uni.setNavigationBarTitle({
					title:this.title
				})
			},
			...mapActions({
				getSignList_fun:'study/getSign'
			}),
			async getSignList(id){
				let data={
					id,
					limit:this.limit,
					page:this.page,
				}
				await this.getSignList_fun(data)
			},
		},
		onReachBottom() {
			this.page++
			this.getSignList()
		},
		onLoad(option) {
			// console.log(option);
			this.getSignList(option.id)
			// this.title = option.
			// this.setTitle()
		}
	}
</script>

<style lang="scss">
	// image{
	// 	background-color: chartreuse;
	// }
	
	
	page {
		background-color: #f2f3f5;
	}

	.body {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		max-height: 1175rpx;
		max-width: 750rpx;
		overflow-y: auto;
		padding: 10rpx 15rpx;

		// width: 750rpx;
		.list {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 10rpx;
			width: 340rpx;
			height: 370rpx;
			background: #ffffff;
			border-radius: 16px;

			image {
				margin-top: 40rpx;
				width: 220rpx;
				height: 220rpx;
			}

			;

			text {
				margin-top: 42rpx;
				max-width: 280rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: #4988f5;
			}
		}
	}
</style>
