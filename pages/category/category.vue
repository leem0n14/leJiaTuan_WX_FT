<!-- 分类 -->
<template>
	<view class="view">
		<view class="nav">
			<view class="list" v-for="(k,i) in navList" :style="{'background':k.isAct?'#f2f3f5':'#ffffff'}"
				@click="navAct(i)">
				<view v-show="k.isAct"></view>
				<text :style="{'color':k.isAct?'#29C563':'#333333'}">{{k.name}}</text>
			</view>
		</view>
		<view class="body">
			<view class="title">
				<view></view>
				<text>{{title}}</text>
				<view></view>
			</view>
			<view class="list" v-for="(k,i) in goodsList"  @click="toBM(k.goodId)" >
				<view class="box">
					<image :src="cdn+'/goods/'+k.photo" mode="aspectFit"></image>
					<view class="bottom">
						<view class="price">
							￥<text>{{k.goodPrice}}</text>
						</view>
						<view class="pay" @click="toBM(k.goodId)">
							立即报名
						</view>
					</view>
				</view>
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
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				typeList:[],				
			}
		},
		methods: {
			...mapActions({
				getTypeList_fun: 'category/getTypeList',
				getListByType_fun: 'category/getListByType',
			}),
			...mapMutations({
				navAct:'category/navClick',
				add_fun:'category/addIndex',
				clear_fun:'category/clearIndex',
			}),
			async getTypeList() {
				let data = {}
				let res = await this.getTypeList_fun(data)
			},
			async getList(i) {
				let data = {
					type:this.title,
					limit:this.pageSize.toString(),
					page:this.pageIndex.toString(),
					i:i?i:'',
				}
				let res = await this.getListByType_fun(data)
			},
			toBM(id){
				// console.log('..',id);
				this.$win.show('/page_shopping/shopping?id='+id)
			}
		},
		watch:{
			title(newV){
				this.clear_fun()
				this.getList()
			}
		},
		computed: {
			...mapState({
				navList: state => state.category.typeList,
				title:state=>state.category.title,
				goodsList:state=>state.category.list,
				//分页
				pageSize:state=>state.category.pageSize,
				pageIndex:state=>state.category.pageIndex,
			})
		},
		onLoad() {
			
		},
		onReachBottom(){
			console.log('滚动到底部');
			this.add_fun()
			this.getList(1)
		},
		onShow() {
			this.getTypeList()
			this.getList()
		},
		onHide(){
			this.clear_fun()
			// this.pageIndex=0
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.view {
		display: flex;
	}

	// 导航栏
	.nav {
		display: flex;
		flex-direction: column;
		// position: fixed;
		// top: 0;
		// left: 0;
		height: 100vh;
		box-sizing: border-box;
		// max-height: 1102rpx;
		width: 210rpx;
		overflow-y: auto;

		.list {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 210rpx;
			height: 112rpx;
			min-height: 112rpx;
			background: #f2f3f5;

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #29c563;
			}

			;

			view {
				position: absolute;
				left: 0;
				width: 8rpx;
				height: 112rpx;
				background: #29c563;
			}
		}
	}

	//列表
	.body {
		// position: relative;
		// position: fixed;
		// right: 0;
		// top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 540rpx;
		height: 95vh;
		padding-top: 84rpx;
		// box-sizing: border-box;
		overflow-y: auto;

		.title {
			position: fixed;
			top: 0;
			right: 0;
			z-index: 99;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 540rpx;
			padding: 30rpx 0;
			background-color: #f4f5f7;

			text {
				font-size: 24rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #666666;
				margin: 0 11rpx;
			}

			;

			view {
				width: 71rpx;
				height: 2rpx;
				background: #e3e3e3;
			}

			;
		}


		.list {
			margin-bottom: 20rpx;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 8rpx;

			.box {
				display: flex;
				flex-direction: column;
				width: 432rpx;
				height: 225rpx;
				border-radius: 0rpx 0rpx 4rpx 4rpx;

				image {
					height: 176rpx;
					// width: 432rpx;
					width: 100%;
					border-radius: 4rpx;
					background-color: #f4f5f7;
				}


				.bottom {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					width: 432rpx;
					height: 49rpx;
					box-sizing: border-box;
					padding: 0 18rpx 0 10rpx;
					background: #f4f5f7;
					border-radius: 0rpx 0rpx 4rpx 4rpx;

					.price {
						font-size: 17rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #f93030;

						text {
							font-size: 24rpx;
							font-family: Source Han Sans CN, Source Han Sans CN-Bold;
							font-weight: 700;
							text-align: left;
						}
					}

					.pay {
						width: 113rpx;
						height: 37rpx;
						background: linear-gradient(134deg, #54d685, #29c563 99%);
						border-radius: 19rpx;
						font-size: 20rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 37rpx;
					}

				}
			}
		}
	}
</style>
