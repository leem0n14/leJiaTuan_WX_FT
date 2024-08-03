<!-- 身份判断 -->
<template>
	<view>
		<view class="ul">
			<view class="list name">
				<view class="text">
					姓名
				</view>
				<input type="text" placeholder="请填写姓名" class="input" v-model="name">
			</view>
			<view class="list phone">
				<view class="text">
					电话
				</view>
				<input type="number" placeholder="请填写电话号码" maxlength="11" class="input" v-model="phone">
			</view>
			<view class="list status">
				<view class="text">
					身份
				</view>
				<view class="input">
					<picker mode="selector" :range="status" @change="chooseStatus" style="height: 100%;width: 100%;">
						<view :class="statusText=='请选择身份信息(教练或者学员)'?'act':''">{{statusText}}</view>
					</picker>
				</view>
			</view>
		</view>
		<button class="sub btn" @click="saveStatus()">保存身份</button>
		<button class="back btn" @click="this.$win.go('/pages/index/index')">暂不认证</button>
	</view>
</template>

<script>
	import {mapActions,
	mapState} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				statusText:'请选择身份信息(教练或者学员)',
				status:['学员','教练'],
				statusType:0,
				name:null,
				phone:null,
			}
		},
		methods: {
			...mapActions({
				subStatus_fun:'user/saveStatus',
				
			}),
			chooseStatus(e){
				console.log(e);
				this.statusText=this.status[e.detail.value]
				this.statusType=e.detail.value
			},
			saveStatus(){
				if(this.name==null&&this.phone==null&&this.statusText=='请选择身份信息(教练或者学员)')
				{
					this.$win.nlog('请填写完整信息')
					return
				}
				if(!this.$db.getSync('userId')){
					this.$win.nlog('请先登录')
					// console.log('1');
					return
				}
				this.subStatus()
			},
			async subStatus(){
				let statu=parseInt(this.statusType)+1
				let data={
					userId:this.$db.getSync('userId'),
					name:this.name,
					phone:this.phone,
					statu,
				}
				console.log('?',data);
				let res=await this.subStatus_fun(data)
			}
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
page{
	
}

.ul{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 750rpx;
	margin:40rpx 0;
	.list{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 690rpx;
		height: 90rpx;
		margin: 20rpx 0;
		background: #f2f2f2;
		border-radius: 8rpx;
		.text{
			width: 172rpx;
			height: 90rpx;
			box-sizing: border-box;
			padding-left: 30rpx;
			line-height: 90rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: left;
			color: #666666;
		}
		.input{
			width: 488rpx;
			height: 90rpx;
			picker{
				display: flex;
				flex-direction: row;
				align-items: center;
				view{
					width: 488rpx;
					// height: 90rpx;
					// line-height: 90rpx;
				}
				.act{
					font-size: 28rpx;
					// line-height:90rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
					line-height: 29rpx;
				}
			}
		}
	}
}

.btn{
	margin-top:  20rpx;
	width: 580rpx;
	height: 90rpx;
	line-height: 90rpx;
	font-size: 32rpx;
	font-family: Source Han Sans CN, Source Han Sans CN-Regular;
	font-weight: 400;
	text-align: center;
	border-radius: 45rpx;
}

.sub{
	background: linear-gradient(134deg,#54d685, #29c563 99%);
	color: #ffffff;
}

.back{
	background-color: #ffffff;
	color: #999;
	border: 2rpx solid #999;
}

</style>
