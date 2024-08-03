<!-- 我的教练 -->
<template>
	<view>
		<!-- 背景 -->
		<view class="background"></view>
		<!-- 教练信息卡 -->
		<view class="coachMsg">
			<image :src="cdn+'/coach/'+ myCoachMsg.coachPhoto" mode="aspectFill" class="pic"
				v-if="myCoachMsg.coachPhoto"></image>
			<view class="pic" v-else style="text-align: center;line-height: 100rpx;font-size: 18rpx;">{{'暂无头像'}}</view>
			<view class="info">
				<view class="name">{{myCoachMsg.coachName}}</view>
				<view class="school">{{myCoachMsg.school}}</view>
			</view>

			<view class="score">
				<uni-rate :value="myCoachMsg.evaluation" :readonly="true" size="40rpx"></uni-rate>
				<text style="font-size: 20rpx;margin-left: 14rpx;color: #666666;">{{myCoachMsg.evaluation}}</text>
			</view>
			<view class="labels">
				<view class="son" v-for="(k,i) in myCoachMsg.tags" :class="labelStyle[i]">
					{{k}}
				</view>
			</view>
			<!-- 			<view class="change" @click="$win.show('changeCoach/changeCoach')">
				<image :src="cdn+'/icon/changeCoach'+(!coachEvaluation.changing?'/change.svg':'/changing.svg')"
					mode="aspectFit"></image>
				<text
					:style="{'color':!coachEvaluation.changing?'':'#4988F5;'}">{{(!coachEvaluation.changing?'更换教练':'正在审核')}}</text>
			</view> -->
		</view>
		<!-- 教练评价 -->
		<view class="coachEvaluation">
			<view class="title">教练评价</view>
			<view class="score">
				<uni-rate v-model="coachEvaluation.score" :size="46" allowHalf="true"
					:readonly="coachEvaluation.scoreReadonly">
				</uni-rate>
				<text
					style="color: #666666;font-size: 22rpx;margin-left:30rpx;">{{coachEvaluation.score.toFixed(1)}}</text>
			</view>
			<view class="form">


				<u-subsection fontSize="26" :list="['科目二','科目三']" :current="currNav"
					@change="sectionChange"></u-subsection>


				<view v-show="currNav==0">
					<checkbox-group class="content-lable">
						<label v-for="(item,i) in TypeList " :key="i" style="min-width: 50%;margin: 10rpx 0;"
							@click="section_label(i)">
							<view>
								<checkbox value="false" :checked="item.bool" />{{item.name}}
							</view>
						</label>
					</checkbox-group>
				</view>
				<view class="input">
					<text class="label">{{`本次练车问题反馈(${coachEvaluation.value1.length}/200)`}}</text>
					<textarea :maxlength="200" v-model="coachEvaluation.value1" class="input"
						placeholder="本次练车问题反馈"></textarea>
				</view>
				<!-- <view class="input">
					<text class="label">本次练车对教练的客观评价</text>
					<u-input v-model="coachEvaluation.value2" class="input" placeholder="输入本次练车对教练的客观评价(例:不骂人)"></u-input>
				</view> -->

			</view>
			<!-- <view class="chooseLabels">
				<view class="son" v-for="(k,i) in coachEvaluation.labels" :style="{'color':k.isAct?'#29C563':'#666666',
				'borderColor':k.isAct?'#29C563':'#c7c7c7'}" @click="act(k)" v-if="k.isShow">
					{{k.text}}
					<view class="icon" v-if="k.isAct">
						<icon type="success" size="28rpx" />
					</view>
				</view>
			</view> -->
			<!-- :disabled="!coachEvaluation.value1||!content" -->
			<button class="subBtn" @click="sub()" 
				:style="{'background':coachEvaluation.isBan?'#e3e3e3':'','color':coachEvaluation.isBan?'#666666':''}">{{coachEvaluation.isBan?'已评价':'确定'}}</button>
			<!-- <view class="uni-form-item uni-column">
				<view class="title">实时获取输入值：{{inputValue}}</view>
				<input class="uni-input" @input="onKeyInput" placeholder="输入同步到view中" />
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				cdn: this.$conf.CDN_HOST,
				labelStyle: ['st', 'nd', 'rd'],
				id: null, //预约id
				//评价
				coachEvaluation: {
					banClick: false, // 提交后注销点击事件，布尔
					changing: false, //更换教练，布尔
					scoreReadonly: false, //评分只读，布尔
					isBan: false, //禁用按钮和改变按钮样式，布尔
					score: 5, //评分，数字
					value1: '', //不懂点
					value2: '', //评价
					labels: [{
							text: '脾气好', //标签文本，字符
							isAct: false, //选中，布尔
							isShow: true, //显示，布尔
						},
						{
							text: '不抽烟',
							isAct: false,
							isShow: true, //显示
						},
						{
							text: '不骂人',
							isAct: false,
							isShow: true, //显示
						}
					],
				},
				TypeList: [

					{
						name: '倒车入库(右)',
						bool: false,
					},
					{
						name: '倒车入库(左)',
						bool: false,
					},
					{
						name: '侧方停车',
						bool: false,
					},
					{
						name: 's弯',
						bool: false,
					},
					{
						name: '直角转弯',
						bool: false,
					},
					{
						name: '半坡停车',
						bool: false,
					},
				],
				// inputValue: '',
				currNav: 0,
			}
		},
		computed: {
			...mapState({
				myCoachMsg: state => state.coach.myCoach
			}),
			content() {
				let bool = false
				for (let i = 0; i < this.TypeList.length; i++) {
					bool |= this.TypeList[i].bool
				}
				return bool
			}
		},
		methods: {
			...mapActions({
				getMycoachMsg_fun: 'coach/getMyCoachMsg',
				pingjia_fun: 'booking/pingjia',
				getFenUpdate_fun: 'coachSection/getFenUpdate',
			}),
			act(k) {
				if (!this.coachEvaluation.banClick)
					k.isAct = !k.isAct
			},
			// submit() { //提交
			// 	var num = 0
			// 	for (var i = 0; i < this.coachEvaluation.labels.length; i++) {
			// 		if (this.coachEvaluation.labels[i].isAct)
			// 			num++
			// 	}
			// 	if (num == 0) {
			// 		uni.showModal({
			// 			title: '请至少选择一个标签',
			// 			showCancel: false
			// 		})
			// 	} else {
			// 		this.submited()
			// 	}
			// },
			// submited() { //提交后改变样式
			// 	this.coachEvaluation.banClick = true //注销标签点击事件
			// 	this.coachEvaluation.scoreReadonly = true
			// 	this.coachEvaluation.isBan = true
			// 	for (var a = 0; a < this.coachEvaluation.labels.length; a++) {
			// 		this.coachEvaluation.labels[a].isShow = this.coachEvaluation.labels[a].isAct
			// 	}
			// },
			onKeyInput: function(event) {
				this.inputValue = event.target.value
			},
			section_label(index) {
				this.TypeList[index].bool = !this.TypeList[index].bool
				console.log(this.TypeList[index].bool)
			},

			sectionChange() {
				this.currNav = !this.currNav
			},
			async sub() {

				if (!this.coachEvaluation.value1 || !this.content) {
					// console.log('??');
					this.$win.nlog('请选择练车内容和填写反馈')
					return
				}

				let arr = this.currNav == 0 ? '科目二' : '科目三'

				for (let i = 0; i < this.TypeList.length; i++) {
					if (this.TypeList[i].bool) {
						arr += ' ' + this.TypeList[i].name
						console.log(arr)
					}
				}
				let data = {
					id: parseInt(this.id),
					userId: this.$db.getSync('userId'),
					text: this.coachEvaluation.value1,
					score: this.coachEvaluation.score.toString(),
					typeText: arr,
				}
				let res = await this.pingjia_fun(data)
			},
			async getMycoachMsg() {
				let data = {
					userId: this.$db.getSync('userId')
				}
				let res = await this.getMycoachMsg_fun(data)
			},
		},


		onLoad(e) {
			this.id = e.id
		},
		onShow() {
			this.getMycoachMsg()
		}

	}
</script>

<style lang="scss">
	// image{
	// 	background-color: #999999;
	// }

	page {
		position: relative;
		background-color: #f2f3f5;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 255rpx;
		background: #29c563;
		z-index: -1;
	}

	/* 教练信息卡start */
	.coachMsg {
		position: absolute;
		margin: 0 24rpx;
		top: 100rpx;
		width: 702rpx;
		height: 260rpx;
		background: #ffffff;
		border-radius: 16rpx;
	}



	.coachMsg .pic {
		position: absolute;
		top: -50rpx;
		left: 24rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 8rpx solid #ffffff;
		background-color: #f2f3f5;
	}


	.coachMsg .info {
		position: absolute;
		top: 70rpx;
		left: 39rpx;
		display: flex;
		align-items: flex-end;

		.name {
			height: 32rpx;
			font-size: 32rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Medium;
			font-weight: Medium;
			text-align: left;
			color: #333333;
			line-height: 32rpx;
		}

		.school {
			margin-left: 20rpx;
			height: 24rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: left;
			color: #666666;
			line-height: 24rpx;
		}
	}

	// .coachMsg .name {
	// 	position: absolute;
	// 	top: 70rpx;
	// 	left: 39rpx;
	// 	// width: 96rpx;
	// 	height: 32rpx;
	// 	font-size: 32rpx;
	// 	font-family: Source Han Sans CN, Source Han Sans CN-Medium;
	// 	font-weight: Medium;
	// 	text-align: left;
	// 	color: #333333;
	// 	line-height: 32rpx;
	// }

	// .coachMsg .school {
	// 	position: absolute;
	// 	top: 78rpx;
	// 	left: 200rpx;
	// 	// width: 96rpx;
	// 	height: 24rpx;
	// 	font-size: 24rpx;
	// 	font-family: Source Han Sans CN, Source Han Sans CN-Regular;
	// 	font-weight: 400;
	// 	text-align: left;
	// 	color: #666666;
	// 	line-height: 24rpx;
	// }

	.coachMsg .score {
		display: flex;
		align-items: center;
		position: absolute;
		left: 39rpx;
		top: 133rpx;
	}

	.coachMsg .labels {
		display: flex;
		position: absolute;
		bottom: 38rpx;
		left: 39rpx;
		height: 36rpx;
	}

	.coachMsg .labels .son {
		margin-right: 16rpx;
		height: 36rpx;
		border-radius: 2rpx;
		padding: 0 19rpx;
		font-size: 20rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		line-height: 36rpx;
	}

	.coachMsg .labels .st {
		color: #f17516;
		background: #ffecd9;
	}

	.coachMsg .labels .nd {
		color: #29c563;
		background: #dff9dc;
	}

	.coachMsg .labels .rd {
		color: #4988f5;
		background: #c5daff;
	}

	.coachMsg .change {
		display: flex;
		align-items: center;
		position: absolute;
		top: 34rpx;
		right: 30rpx;
	}

	.coachMsg .change image {
		width: 33rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.coachMsg .change text {
		height: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 28rpx;
	}

	/* 教练信息卡end */

	/* 教练评价start */
	.coachEvaluation {
		position: absolute;
		top: 380rpx;
		width: 702rpx;
		height: 996rpx;
		box-sizing: border-box;
		margin: 0 24rpx;
		background: #ffffff;
		border-radius: 16rpx 16rpx 16rpx 0rpx;


		.form {
			// position: absolute;
			position: absolute;
			top: 244rpx;
			left: 30rpx;
			width: 642rpx;
			min-height: 200rpx;
			box-sizing: border-box;
			padding: 10rpx;
			// background-color: pink;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.input {
				display: flex;
				flex-direction: column;
				margin: 30rpx 0;
				border-radius: 15rpx;

				textarea {
					// width: ;
					max-height: 100rpx;
				}

				.label {
					font-weight: 700;
					margin: 10rpx 0;
				}

				padding: 5rpx;
				background-color: #f2f3f5;

			}
		}
	}

	.coachEvaluation .title {
		position: absolute;
		top: 40rpx;
		left: 30rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Bold;
		font-weight: 700;
		text-align: left;
		color: #333333;
		line-height: 32rpx;
	}

	.coachEvaluation .score {
		position: absolute;
		top: 123rpx;
		left: 30rpx;
		display: flex;
		align-items: center;
	}

	.coachEvaluation .chooseLabels {
		position: absolute;
		top: 244rpx;
		left: 30rpx;
		display: flex;
		flex-direction: row;
		max-height: 240rpx;
		max-width: 642rpx;
		flex-wrap: wrap;
	}

	.coachEvaluation .chooseLabels .son {
		position: relative;
		height: 60rpx;
		margin: 0 30rpx 30rpx 0;
		padding: 0 32rpx;
		background: #ffffff;
		box-sizing: border-box;
		border-radius: 4rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		line-height: 60rpx;
		color: #666666;
		border: 1rpx solid #c7c7c7;
	}

	.coachEvaluation .chooseLabels .son .act {
		color: #29c563;
		border-color: #29c563;
	}

	.coachEvaluation .chooseLabels .son .icon {
		position: absolute;
		top: -19rpx;
		right: -19rpx;
		display: flex;
		background-color: #fff;
		width: 32rpx;
		height: 32rpx;
	}

	.coachEvaluation .subBtn {
		position: absolute;
		left: 61rpx;
		bottom: 50rpx;
		width: 580rpx;
		height: 90rpx;
		background: linear-gradient(134deg, #54d685, #29c563 99%);
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN, Source Han Sans CN-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 90rpx;
	}

	.uni-form-item {
		position: absolute;
		top: -338rpx;
		left: -41rpx;
	}

	.content-lable {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-top: 20rpx;
		padding-left: 44rpx;
	}

	/* 教练评价end */
</style>