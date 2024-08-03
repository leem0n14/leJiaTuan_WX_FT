<!-- 信息收集2 -->
<template>
	<view>
		<view class="title">为您制定专属学习内容</view>
		<!-- 用户信息 -->
		<view class="userMsg">
			<view class="son" v-for="(k,i) in table" :key="k.id">
				<view class="choose">{{(i+1)+'.'+k.title}}</view>
				<view class="content">
					<view class="options" v-for="(item,index) in k.options" :key="item.id" @click="isAct(item,index,i)"
						:style="item.act? 'border:'+'1rpx' +' solid'+' #29c563':''">
						<image :src="cdn+(item.act?item.onPic:item.pic)" mode="aspectFit"></image>
						<view class="text" :style="item.act?'color:'+'#29c563':''">{{item.name}}</view>
					</view>
				</view>
			</view>
			<button class="next" :disabled="(msg[0]==null)||(msg[1]==null)||(msg[2]==null)" @click="subMsg">确定</button>
		</view>
		
	</view>
</template>

<script>
	import{
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				cdn:this.$conf.CDN_HOST,
				city:null,
				type:null,
				msg:[null,null,null],
				scene:null,
				table: [{
						title: '请选择您的性别',
						options: [{
								name: '男士',
								act: false,
								pic: '/image/getStudentMsg/male.png',
								onPic: '/image/getStudentMsg/maleOn.png',
								id:1
							},
							{
								name: '女士',
								act: false,
								pic: '/image/getStudentMsg/famale.png',
								onPic: '/image/getStudentMsg/famaleOn.png',
								id:2
							}
							
						],
						id:1
					}, {
						title: '是否完成驾校报名',
						options: [{
								name: '已报名驾校',
								act: false,
								pic: '/image/getStudentMsg/registered.png',
								onPic: '/image/getStudentMsg/registeredOn.png',
								id:1
							},
							{
								name: '未报名驾校',
								act: false,
								pic: '/image/getStudentMsg/unRegister.png',
								onPic: '/image/getStudentMsg/unRegisterOn.png',
								id:2
							}
						],
						id:2
					},
					{
						title: '您考驾照的目的',
						options: [{
								name: '有车没本',
								act: false,
								pic: '/image/getStudentMsg/purpose_1.png',
								onPic: '/image/getStudentMsg/purpose_1On.png',
								id:1
							},
							{
								name: '计划买车',
								act: false,
								pic: '/image/getStudentMsg/purpose_2.png',
								onPic: '/image/getStudentMsg/purpose_2On.png',
								id:2
							},
							{
								name: '纯为拿本',
								act: false,
								pic: '/image/getStudentMsg/purpose_3.png',
								onPic: '/image/getStudentMsg/purpose_3On.png',
								id:3
							}
						],
						id:3
					}
				]
			}
		},
		computed:{
			...mapState({
				saveUserMsgs:state=>state.user.userMsgSub,
			})
		},
		methods: {
			...mapActions({
				saveUserMsg_fun: 'user/saveUserMsg',
			}),
			// item当前遍历到的对象,index上一级对象数组的索引,i当前对象数组的索引
			isAct(item, index, i) {
				if(item.act==true)
				{
					for (var a = 0; a < this.table[i].options.length; a++) {
						this.table[i].options[a].act = false
					}
					this.msg[i]=null
				}
				else{
					for (var a = 0; a < this.table[i].options.length; a++) {
						this.table[i].options[a].act = false
					}
					item.act = true
					this.msg[i]=item.name
					console.log(item.name);
				}
			},
			async saveUserMsg(msg) {
				let data = {
					userId: this.$db.getSync('userId'),
					...msg
				}
				let res = await this.saveUserMsg_fun(data);
			},
			subMsg(){
				let scene=this.$db.getSync('scene')
				let userMsg={
					city:this.city,
					type:this.type,
					sex:this.msg[0],
					statu:this.msg[1],
					goal:this.msg[2],
					scene:scene?scene:null,
				}
				this.saveUserMsg(userMsg).then(()=>{
					if(this.saveUserMsgs.code==0)
					{
						uni.switchTab({
							url: '/pages/my/my'
						});
					}else{
						this.$win.nlog(this.saveUserMsgs)
					}
				})
				
				
			}
		},
		onLoad(op) {
			this.city=op.city
			this.type=op.type
			this.scene=decodeURIComponent(op.scene)
			
			console.log('index,e',decodeURIComponent(op.scene));
		}
	}
</script>

<style lang="scss">
/* 	image{
		background-color: #29c563;
	} */
	
	/* 标题start */
	.title {
		height: 192rpx;
		width: 750rpx;
		/* 		background-color: skyblue; */
		font-size: 52rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Medium;
		font-weight: 500;
		text-align: center;
		color: #111111;
		line-height: 192rpx;
	}

	/* 标题end */

	/* 选项的共同样式start */
	.son {
		position: relative;
		height: 278rpx;
		width: 750rpx;
	}

	.son .choose {
		position: absolute;
		top: 0;
		left: 24rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 28rpx;
	}

	.son .content {
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		top: 78rpx;
		left: 0;
		width: 750rpx;
		height: 140rpx;
		/* background-color: #f2f3f5; */
	}

	.son .content .options {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 140rpx;
		height: 140rpx;
		background: #ffffff;
		border: 1px solid #c1c1c1;
		border-radius: 4rpx;
	}


	.son .content .options image {
		position: absolute;
		top: 18rpx;
		width: 75rpx;
		height: 75rpx;
		/* 	background-color: orange; */
	}


	.son .content .options .text {
		position: absolute;
		bottom: 18rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 24rpx;
	}

	/* 选项的共同样式end */

	.next {
		margin-top: 88rpx;
		width: 580rpx;
		height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		color: #ffffff;
	}
</style>
