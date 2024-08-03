<!-- 答题技巧 -->
<template>
	<view>
		<view class="box" v-for="(item,index) in 1">
			<view class="title">
				答题技巧
			</view>
			<view class="ul">
				<view class="li" v-for="(k,i) in list" @click="this.$win.show(`detail/detail?id=${k.id}`)">
					<view>
						<view class="circle">
							<text>{{i+1}}</text>
							
						</view>
						<text>{{k.title}}</text>
						<text>{{k.groupText}}</text>
					</view>
					<image src="/static/iconfont/right.webp" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	export default {
		data() {
			return {
				data:{
					pageNum:2,
					pages:[
						{
							title:'答题技巧',
							list:[
								{
									text:'交规相关题巧记',
									link:'',
								},
								{
									text:'八种交警手势信号口诀',
									link:'',
								},
								{
									text:'处罚相关题巧记',
									link:'',
								},
								{
									text:'罚款金额题巧记',
									link:'',
								},
								{
									text:'最低最高时速题巧记',
									link:'',
								},
								{
									text:'安全距离题巧记',
									link:'',
								},
								{
									text:'日期类题巧记',
									link:'',
								},
								{
									text:'易混淆知识汇总',
									link:'',
								},
							]
						},
						{
							title:'最新法规',
							list:[
								{
									text:'2018新交规扣分标准',
									link:'',
								},
								{
									text:'酒驾新规',
									link:'',
								},
								{
									text:'机动车驾驶证申领和使用规定',
									link:'',
								},
								{
									text:'中华人民共和国道路交通安全法(2011修正)',
									link:'',
								},
								{
									text:'中华人民共和国道路交通安全法实施条例',
									link:'',
								},
								{
									text:'中华人民共和国刑法',
									link:'',
								}
							]
						}
					]
				},
				
			}
		},
		computed:{
			...mapState({
				list:state=>state.study.informationList3,
			})
		},
		methods: {
			...mapActions({
				getList_fun:'study/getInformation',
			}),
			async getList(subject){
				let data={
					type:3,
					subject,
				}
				await this.getList_fun(data)
			}
		},
		onLoad(e) {
			// console.log(e,'?.;');
			
			this.getList(e.courseCode)
		}
	}
</script>

<style lang="scss">
page{
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f2f3f5;
}
.box{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 15rpx 0;
	width: 702rpx;
	background: #ffffff;
	border-radius: 16rpx;
	.title{
		width: 100%;
		height: 108rpx;
		line-height: 108rpx;
		box-sizing: border-box;
		padding-left: 35rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
	};
	.ul{
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 20rpx;
		.li{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 90rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 24rpx;
			view{
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 90%;
				height: 100%;
				.circle{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 38rpx;
					height: 38rpx;
					background: #29c563;
					border-radius: 50%;
					margin-right: 20rpx;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						color: #ffffff;
						text-align: center;
					}
				}
				text{
					max-width: 400rpx;
					overflow: hiddden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 32rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			};
		image{
			width: 17rpx;
			height: 17rpx;
		}
		}
	}
}
</style>
