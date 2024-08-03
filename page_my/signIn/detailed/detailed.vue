<!-- 积分明细 -->
<template>
	<view>
		<view class="ul">
			<view class="noRecord" v-if="records.length==0">
				暂无记录
			</view>
			<view class="list"  v-for="(k,i) in records" :key="k.id" v-else>
				<view class="msg">
					<text>{{(k.point>0)?'签到':'兑换'}}</text>
					<text style="font-weight: Bold;" :style="{'color':(k.point>0)?'#FFBB1E':''}">{{(k.point>0)?('+'+k.point):k.point}}积分</text>
				</view>
				<view class="time">
					{{k.signData}}
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
				
			}
		},
		methods: {
			...mapActions({
				getRecord_fun:'signIn/seeRecord'
			}),
			async getRecord(){
				let data={
					userId:this.$db.getSync('userId')
				}
				let res=await this.getRecord_fun(data)
			}
		},
		computed:{
			...mapState({
				records:state=>state.signIn.record,
			})
			
		},
		onShow() {
			this.getRecord()
		}
	}
</script>

<style>
page{
	background-color: #f2f3f5;
}
 
 
.ul{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 750rpx;
}

.list{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 750rpx;
	height: 134rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	border-bottom: 2rpx solid #ededed;
	background-color: #ffffff;
}

.list .msg{
	display: flex;
	justify-content: space-between;
	font-size: 30rpx;
	color: #333333;
}

.list .time{
	font-size: 24rpx;
	font-weight: 400;
	font-family: Source Han Sans CN, Source Han Sans CN-Regular;
	color: #999999;
}
</style>
