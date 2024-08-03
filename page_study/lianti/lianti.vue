<!-- 顺序练题 -->
<template>
	<view>
		<!-- 倒计时 -->
		<view class="countdown" v-if="(type==='模拟考试')?true:false">
			<view>
				<image :src="cdn+'/icon/countdown.svg'" mode="aspectFill"></image>
				<text>倒计时：{{fix2(countdownTime.m)+':'+fix2(countdownTime.s)}}</text>
			</view>
		</view>

		<!-- 导航栏 -->
		<view class="nav" v-else>
			<view class="left"
				:style="{'color':nav.left.isAct?'#fff':'#333','background':nav.left.isAct?'#29c563':'#ffffff'}"
				@click="nav.left.isAct=true;nav.right.isAct=false;datiMode=0">
				答题模式
			</view>
			<view class="right"
				:style="{'color':nav.right.isAct?'#fff':'#333','background':nav.right.isAct?'#29c563':'#ffffff'}"
				@click="nav.right.isAct=true;nav.left.isAct=false;datiMode=1">
				背题模式
			</view>
		</view>
		<!-- 主体 -->
		<view class="body">
			<view class="question w">
				<text>{{type=='模拟考试'?(examIndex+'.'):''}}{{question.titleInformation}}</text>
				<view class="tixing">
					<image :src="cdn+'/image/question/questionType.png'" mode="aspectFill"></image>
					<text>{{(question.form==1)?'多选':'单选'}}</text>
				</view>
			</view>
			<image :src="cdn+'/subject'+courseCode+'/'+question.picture" mode="aspectFit" class="pic w"
				v-show="(question.picture==''||question.picture==null||question.picture==undefined)?false:true"
				style="background-color: #e0e3dd;"></image>
			<image :src="cdn+'/subject'+courseCode+'/'+question.scpicture" mode="aspectFit" class="pic w"
				v-show="((question.scpicture==''||question.scpicture==null||question.scpicture==undefined)||!(question.scpicture))?false:true"
				style="background-color: #e0e3dd;"></image>
			<view class="answer w">
				<view class="son" v-for="(k,i) in question.answers" :key="i" :class="" @click="clickAnswer(i)"
					v-if="k.option">
					<image :src="cdn+'/icon/study/exam/'+ (isCorrect?'correct.svg':'err.svg')" mode="aspectFill"
						v-if="false"></image>
					<view v-else :style="{'backgroundColor':option[i].isAct?'#29c563':'',}"></view>
					<text>{{k.name +'、' +k.option}}</text>
				</view>
			</view>
			<view class="correct w">
				<text v-show="true&&datiMode==0">我的答案： <text style="color: #333333;">{{myChoose}}</text> </text>
				<text v-show="isAnswer||datiMode==1">正确答案： <text style="color: #333333;">{{question.answer}}</text>
				</text>
				<view class=""></view>
				<button class="subBtn" @click="sub(question.id)" v-if="!isAnswer">提交答案</button>
				<button class="nextBtn" @click="getNext()" v-else>下一题</button>
			</view>

			<!-- 			<view class="explain w">
				<view class="title">
					<view></view>
					<text>官方解释</text>
				</view>
				<text class="content">{{questionMsg.explain}}</text>
			</view> -->

		</view>
		<!-- 题目列表 -->
		<view class="tiList" v-show="isShowList">
			<view class="mask" @click="isShowList=false"></view>
			<view class="content">
				<view class="son" v-for="(k,i) in examList.length" :key="i" @click="clickListGet(i)"
					:style="{'backgroundColor':examqk[i].statu==2?'red':(examqk[i].statu==1?'#37cf70':''),'color':examqk[i].statu!=0?'#fff':(examIndex==i+1?'#6090d5':''),'borderColor':(examIndex==i+1)?'#6090d5':''}">
					{{fix2(i+1)}}
				</view>
			</view>
		</view>
		<!-- 成绩 -->
		<view class="score" v-show="isSub">
			<!-- 用v-show进度条会消失... -->
			<view class="mask"></view>
			<view class="content">
				<view class="title">
					<view></view>
					<text>考试成绩</text>
					<view></view>
				</view>
				<view class="progressBar">
					<qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" :reshow="isSub" />
					<view class="text">
						<text>剩余未做</text>
						<text>{{wzt}}题</text>
					</view>
				</view>
				<text class="isPass" :style="{'color':score>=90?'':'red'}">{{score>=90?'考试合格':'考试不合格'}}</text>
				<view class="fenshu">
					当前考试成绩：<text>{{score+'分'}}</text>
				</view>
				<view class="btns">
					<button class="continue" @click="isSub=false">继续考试</button>
					<button class="sub" @click="toScore()">现在交卷</button>
				</view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="bottom">
			<!-- <view class="son" style="width: 100rpx;">
				<image :src="cdn+'/icon/study/exam/correctNum.svg'" mode="aspectFill"></image>
				<text>100</text>
			</view>
			<view class="son" style="width: 100rpx;margin-left: 50rpx;">
				<image :src="cdn+'/icon/study/exam/errNum.svg'" mode="aspectFill"></image>
				<text>100</text>
			</view> -->
			<view class="son" style="width: 180rpx;margin-left: 50rpx;" @click="true?isShowList=true:$win.nlog('暂未开放')"
				v-show="type=='模拟考试'">
				<image :src="cdn+'/icon/study/exam/questionList.svg'" mode="aspectFill"></image>
				<text v-if="type=='模拟考试'">{{examIndex}}/{{examList.length}}</text>
				<text v-else>{{id}}/{{sum}}</text>
			</view>
			<view class="son" @click="toCollect()" style="width: 150rpx;margin-left: 100rpx;"
				v-if="(type==='顺序练题')?true:false">
				<image :src="cdn+'/icon/study/exam'+(isShoucang?'/collected.svg':'/collect.svg')" mode="aspectFill">
				</image>
				<text :style="{'color':isShoucang?'#FC6624':''}">{{isShoucang?'已收藏':'收藏'}}</text>
			</view>
			<button v-else class="jiaojuan" @click="subExam">交卷</button>

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
				datiMode: 0, //答题模式：0答题，1背题
				cdn: this.$conf.CDN_HOST,
				type: '',
				isShowList: false,
				courseCode: null,
				examIndex: 1,
				examqk: [], //考试情况对多少错多少
				score: 0, //考试分数
				wzt: 0, //未做题
				ct:{
					list:[],//错题id列表
					pageIndex:1,
					limit:10,
				},//错题
				//记录用户选项
				option: [{
					isAct: false,
				}, {
					isAct: false,
				}, {
					isAct: false,
				}, {
					isAct: false,
				}], //选项false未选，true已选
				//倒计时
				countdownTime: {
					m: 45,
					s: 0,
				},
				timestamp: 0,
				answer: [{
					option: 'A',
					content: ''
				}, {
					option: 'B',
					content: ''
				}],
				myChoose: '',
				//是否已经回答
				isAnswer: false,
				//是否正确
				isCorrect: false,
				//是否收藏
				// isShoucang: false,
				//是否交卷
				isSub: false,
				// 进度条
				chartData: {
					series: [{
						name: "完成度",
						color: "#2fc25b",
						data: 0,
					}]
				},
				opts: {
					extra: {
						arcbar: {
							type: "circle",
							width: null,
							lineCap: "round"
						}
					}
				},
				nav: {
					left: {
						text: '答题模式',
						isAct: true
					},
					right: {
						text: '背题模式',
						isAct: false
					}
				},
			}
		},
		computed: {
			...mapState({
				question: state => state.study.questionMsg,
				id: state => state.study.id,
				sum: state => state.study.sum,
				// option:state=>state.study.option,
				examList: state => state.study.examList,
				isShoucang: state => state.study.collectBool,
			}),

		},
		methods: {
			...mapActions({
				getQuetion_fun: 'study/getQuetion', //获取题目
				getPro_fun: 'study/getQuetionId', //获取做题进度
				savePro_fun: 'study/savePro', //保存做题进度
				saveMis_fun: 'study/saveMistake', //保存错题
				getExam_fun: 'study/getExam1', //模拟考试拿题1
				getRate_fun: 'study/getRate', //模拟考试算分
				toCollect_fun: 'study/collect', //收藏
			}),
			...mapMutations({
				idAdd_fun: 'study/idAdd',
				
			}),
			//交卷跳成绩页
			toScore() {
				this.$win.show('score/score?wzt=' + this.wzt+'&courseCode='+this.courseCode +'&timeStamp='+this.timestamp+ '&score=' + this.score + '&examqk=' + 
				encodeURIComponent(JSON.stringify(this.examqk)))
			},
			//交卷
			subExam() {
				let score = 0
				let wzt = 0
				for (let i = 0; i < this.examqk.length; i++) {
					if (this.examqk[i].statu == 1) {
						score++
					}
				}
				this.chartData.series[0].data = score * 0.01

				for (let i = 0; i < this.examqk.length; i++) {
					if (this.examqk[i].statu == 0) {
						wzt++
					}
				}
				this.score = score
				this.wzt = wzt
				this.isSub = true
			},
			//显示两位数
			fix2(n) {
				if (n < 10)
					n = '0' + n
				return n
			},
			toPX() {
				//根据用户设备屏幕大小设置宽度
				this.px = uni.getWindowInfo().screenWidth / 750
				console.log('lwlsb', this.px)
				//给进度条宽度赋值
				this.opts.extra.arcbar.width = 13 * this.px
			},
			//考试倒计时
			countdown() {
				var t = setInterval(() => {
					if (this.countdownTime.s == 0) {
						this.countdownTime.s = 59
						this.countdownTime.m--
					} else {
						this.countdownTime.s--
					}
					if (this.countdownTime.m == 0 && this.countdownTime.s == 0) {
						clearInterval(t)
						return 0
					}
					this.timestamp += 1000
				}, 1000)
			},
			//判断正确答案
			answerJudge(item) {
				if (item != this.questionMsg.correct) {

				}
			},
			//返回答案是否正确的图标
			backAnswerIcon(n) {
				if (n == 1) {
					return '/correct.svg'
				} else if (n == 0) {
					return '/err.svg'
				} else {
					return ''
				}
			},
			//我的答案
			myAnswer() {
				let str = ''
				for (let i = 0; i < this.option.length; i++) {
					if (this.option[i].isAct) {
						str += String.fromCharCode(65 + i)
					}
				}
				this.myChoose = str
				return str
			},
			//点击列表拿题
			clickListGet(i) {
				this.examIndex = i + 1
				this.getQuetion().then(() => {
					this.isShowList = false
				})

			},
			//点击答案
			clickAnswer(n) {
				if (this.question.form == 1) {
					console.log('多选');
					if (this.isAnswer) return
					this.option[n].isAct = !this.option[n].isAct
				} else {
					console.log('单选');
					if (this.isAnswer) return
					for (let i = 0; i < this.option.length; i++) {
						this.option[i].isAct = false
					}
					this.option[n].isAct = true
				}

				this.myAnswer()
			},
			//提交答案
			sub(questionId) {
				let n = 0
				for (let i = 0; i < this.option.length; i++) {
					if (this.option[i].isAct) {
						continue
					} else {
						n++
						// console.log('lnn')
					}
					if (n == 4) {
						this.$win.nlog('请选择答案')
						return
					}
				}
				this.isAnswer = true
				let answer = this.myAnswer()//获取自己选择的答案
				if (this.type == '模拟考试') {
					// let answer = this.myAnswer()
					this.examqk[this.examIndex - 1].answer = answer
				}
				
				// console.log('answer',answer);
				if (answer == this.question.answer) {
					console.log('答案正确');
					this.isCorrect = true
					if (this.type == '模拟考试') {
						this.examqk[this.examIndex - 1].statu = 1
					}
				} else {
					console.log('答案错误');
					this.isCorrect = false
					console.log('保存错题’' + questionId);
					this.saveMis(questionId)
					if (this.type == '模拟考试') {
						this.examqk[this.examIndex - 1].statu = 2
					}
				}
				this.idAdd_fun()
				this.savePro()
			},
			//下一题
			getNext() {
				// console.log('id1', this.id);
				// this.getPro()
				// console.log('id2', this.id);
				if (this.type == '模拟考试') {
					this.examIndex++
				}
				// this.id++
				this.isAnswer = false
				this.myChoose = ''
				this.getQuetion()
				//清空答案选项
				for (let i = 0; i < this.option.length; i++) {
					this.option[i].isAct = false
				}
			},
			//获取题目（逐题获取）
			async getQuetion(ctId) {
				var id = this.type == '模拟考试' ? this.examList[this.examIndex - 1] : this.id + 1
				let data = {
					//判断有无错题id，ctId
					id:ctId?ctId:id, //下一题
					courseCode:this.courseCode,
					userId:this.$db.getSync('userId'),
				}
				let res = await this.getQuetion_fun(data)
			},
			//获取做题进度
			async getPro(courseCode) {
				let data = {
					userId: this.$db.getSync('userId'),
					courseCode,
				}
				let res = await this.getPro_fun(data)
			},
			//保存进度
			async savePro() {
				let data = {
					userId: this.$db.getSync('userId'),
					id: this.id,
					courseCode: this.courseCode
				}
				let res = await this.savePro_fun(data)
			},
			//保存错题
			async saveMis(id) {
				let data = {
					userId: this.$db.getSync('userId'),
					courseCode: this.courseCode,
					id,
				}
				let res = await this.saveMis_fun(data)
			},

			//模拟考试拿题（数组）
			async getExam() {
				let data = {
					km: this.courseCode,
					// userId: this.$db.getSync('userId'),
				}
				let res = await this.getExam_fun(data)
			},
			
			//收藏
			   async toCollect() {
			    let data = {
			     course: this.courseCode,
			     userId: this.$db.getSync('userId'),
			     id: this.id+1,
			     //是否收藏
			     bool:this.isShoucang,
			    }
			    let res = await this.toCollect_fun(data).then(()=>{
			     this.getQuetion()
			    })
			   },
		},
		onLoad(option) {
			this.courseCode = option.courseCode
			console.log('练题页拿到课程码', this.courseCode);
			this.type = option.type
			if (this.type === '模拟考试') {
				this.countdown()
				this.toPX()
				//那模拟考试题号数组，并那啥，搞个数组对象记录每题的答题情况和答案
				this.getExam().then(() => {
					console.log('666’');
					this.getQuetion().then(() => {
						let arr = []
						for (let i = 0; i < this.examList.length; i++) {
							let item = {
								statu: 0, //确定模拟考试题目做的情况。0未做1正确2错误
								answer: null, //选择的答案
							}

							arr.push(item)
						}
						this.examqk = arr
					})
				})

			} else if(option.type==='顺序练题') {
				this.getPro(this.courseCode).then((res) => {
					this.getQuetion()
				})
			}else if(option.type==='我的错题'){
				console.log(option.questionId,'错题id');
				this.getQuetion(option.questionId)
				
			}
			else if(option.type==='我的收藏'){
				console.log(option.questionId,'收藏的id');
				this.getQuetion(option.questionId)
				
			}
		},
		onShow() {
			console.log('show', this.courseCode);
			// this.getPro(this.courseCode).then((res) => {
			// 	
			// 	this.getQuetion(this.courseCode)
			// })

		}
	}
</script>

<style lang="scss">
	// image {
	// 	background-color: #29c563;
	// }

	.countdown {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 80rpx;
		background: #ffffff;

		view {
			display: flex;
			align-items: center;

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 12rpx;
			}

			text {
				font-size: 24rpx;
				line-height: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}
		}
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 80rpx;
		background: #ffffff;

		.left,
		.right {
			width: 269rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			border: 1rpx solid #29c563;
		}

		;

		.left {
			border-radius: 30rpx 0rpx 0rpx 30rpx;
		}

		;

		.right {
			border-radius: 0rpx 30rpx 30rpx 0rpx;
		}
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		max-height: 85vh;
		overflow-y: auto;

		.w {
			width: 690rpx;
		}

		;

		.question {
			position: relative;
			text-indent: 4em;
			padding: 20rpx 0;

			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				line-height: 37rpx;
				text-align: left;
				color: #333333;
			}

			.tixing {
				position: absolute;
				top: 20rpx;
				left: 10rpx;
				width: 74rpx;
				height: 37rpx;
				line-height: 37rpx;

				image {
					position: absolute;
					left: 0;
					top: 0;
					width: 74rpx;
					height: 37rpx;
				}

				;

				text {
					position: absolute;
					left: 0;
					top: 0;
					width: 74rpx;
					height: 37rpx;
					text-indent: 0em;
					font-size: 24rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
					line-height: 37rpx;
					color: #ffffff;
					z-index: 1;
				}
			}
		}

		;

		.pic {
			width: 690rpx;
			min-height: 241rpx;
			background-color: skyblue;
			margin-top: 29rpx;
		}

		;

		.answer {
			display: flex;
			flex-direction: column;
			margin-top: 30rpx;

			.answerAct {
				border-color: #29c563;
			}

			.son {
				display: flex;
				flex-direction: row;
				padding: 26rpx 24rpx;
				margin-bottom: 20rpx;
				background: #ffffff;
				border: 1rpx solid #c1c1c1;
				border-radius: 4rpx;

				image {
					margin-right: 24rpx;
					width: 28rpx;
					height: 28rpx;
					border-radius: 50%;

				}

				view {
					margin-right: 24rpx;
					width: 28rpx;
					height: 28rpx;
					border-radius: 50%;
					box-sizing: border-box;
					border: 1rpx solid #c1c1c1;
				}

				text {
					max-width: 586rpx;
					font-size: 28rpx;
					line-height: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}
		}

		;

		.correct {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 50rpx;

			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #666666;
			}

			.nextBtn {
				margin: 0;
				width: 200rpx;
				height: 60rpx;
				background: linear-gradient(134deg, #54d685, #29c563 99%);
				// border: 1rpx solid #707070;
				border-radius: 31rpx;
				font-size: 28rpx;
				line-height: 60rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #fff;
			}

			.subBtn {
				margin: 0;
				width: 200rpx;
				height: 60rpx;
				background: #ffffff;
				border: 1rpx solid #707070;
				border-radius: 31rpx;
				font-size: 28rpx;
				line-height: 60rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #111111;
			}
		}

		.explain {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 0 24rpx;
			margin-bottom: 20rpx;
			background: #eff0f2;
			border-radius: 8px;

			.title {
				display: flex;
				align-items: center;
				padding: 20rpx 0;

				view {
					margin-right: 16rpx;
					width: 8rpx;
					height: 28rpx;
					background: #29c563;
					border-radius: 4rpx;
				}

				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #333333;
				}
			}

			;

			.content {
				padding-bottom: 20rpx;
				font-size: 32rpx;
				line-height: 44rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: left;
				color: #666666;
			}
		}
	}

	.tiList {
		position: fixed;
		bottom: 8.5vh;
		left: 0;
		width: 750rpx;
		height: 70vh;
		box-sizing: border-box;
		z-index: 98;
		background-color: #fff;

		.mask {
			position: absolute;
			top: -30vh;
			width: 750rpx;
			height: 30vh;
			opacity: 0.5;
			background: #000000;

		}

		.content {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding: 20rpx 0 0 20rpx;
			max-height: 70vh;
			width: 750rpx;
			box-sizing: border-box;
			overflow-y: auto;

			.son {
				margin: 0 20rpx 20rpx 0;
				width: 85rpx;
				height: 85rpx;
				line-height: 85rpx;
				background: #ffffff;
				border: 1rpx solid #707070;
				border-radius: 50%;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #666666;
			}
		}

	}

	.score {
		position: fixed;
		top: 20vh;
		left: 55rpx;
		width: 640rpx;
		height: 698rpx;
		background: #ffffff;
		border-radius: 16rpx;
		z-index: 99;

		.mask {
			position: absolute;
			top: -20vh;
			left: -55rpx;
			width: 100vw;
			height: 100vh;
			opacity: 0.5;
			background: #000000;
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			width: 640rpx;
			height: 698rpx;
			background: #ffffff;
			border-radius: 16rpx;

			.title {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin: 50rpx 0;

				text {
					font-size: 40rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					font-weight: 500;
					text-align: center;
					color: #333333;
					margin: 0 26rpx;
				}

				view {
					width: 58rpx;
					height: 6rpx;
					background: #ededed;
					border-radius: 1rpx;
				}
			}

			.progressBar {
				position: relative;
				width: 200rpx;
				height: 200rpx;

				.text {
					position: absolute;
					top: 70rpx;
					left: 52rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					text {
						font-size: 24rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Medium;
						font-weight: 500;
						text-align: center;
						color: #666666;
						line-height: 36rpx;
					}
				}
			}

			.isPass {
				margin: 20rpx 0;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #29c563;
			}

			.fenshu {
				margin-top: 20rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #666666;

				text {
					font-size: 40rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Medium;
					font-weight: 500;
					text-align: center;
					color: #f93030;
				}
			}

			.btns {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;
				box-sizing: border-box;
				padding: 0 27rpx;
				margin-top: 50rpx;

				button {
					width: 260rpx;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: center;
				}

				.continue {
					background: #ffffff;
					border: 1rpx solid #29c563;
					border-radius: 41rpx;
					color: #29c563;
				}

				.sub {
					background: linear-gradient(134deg, #54d685, #29c563 99%);
					border-radius: 40rpx;
					color: #ffffff;
				}
			}
		}
	}

	.bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 750rpx;
		height: 98rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		border-top: 2rpx solid #ededed;
		background: #ffffff;

		.son {
			display: flex;
			align-items: center;

			image {
				margin-right: 10rpx;
				width: 34rpx;
				height: 34rpx;
			}

			;

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
			}
		}



		.jiaojuan {
			width: 200rpx;
			height: 68rpx;
			line-height: 68rpx;
			background: linear-gradient(134deg, #54d685, #29c563 99%);
			border-radius: 34rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
		}
	}
</style>
