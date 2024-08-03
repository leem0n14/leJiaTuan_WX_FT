<template>
	<!-- 学员信息 -->
	<view class="stuDetail-view">
		<view class="box">
			<view class="item">
				<text class="text">头像：</text>
				<view class="content">
					<image class="avatar" :src="`${cdn}/student/${stuDetail.photo}`" mode="aspectFill" v-if="stuDetail.photo"></image>
					<view class="avatar" v-else></view>
				</view>
			</view>
			<view class="item">
				<text class="text">姓名：</text>
				<view class="content">
					{{stuDetail.coachName}}
				</view>
			</view>
			<view class="item">
				<text class="text">身份证号：</text>
				<view class="content">
					{{stuDetail.cardId}}
				</view>
			</view>
			<view class="item">
				<text class="text">性别：</text>
				<view class="content">
					{{stuDetail.stuSex}}
				</view>
			</view>
		</view>
		<view class="box">
			<view class="item header">
				<view class="son">
					<view class="value">
						{{8}}次
					</view>
					<view class="key">
						练车次数
					</view>
				</view>
				<view class="son">
					<view class="value">
						{{stuDetail.mpTimes}}小时
					</view>
					<view class="key">
						练车时间
					</view>
				</view>
				<view class="son">
					<view v-if="" v-if="stuDetail.driveProjectList&&stuDetail.driveProjectList.length!==0">
						<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item v-for="k,i in stuDetail.driveProjectList" :key="i">
								<view class="value">{{k}}</view>
							</swiper-item>
						</swiper>
					</view>
					<view class="value" v-else>
					(无)
					</view>
					<view class="key">
						练车项目
					</view>
				</view>
			</view>
			<view class="item">
				<text class="text">反馈信息：</text>
				<view class="content">
					{{stuDetail.evaluatesText?stuDetail.evaluatesText:'无'}}
				</view>
			</view>
			<view class="item">
				<text class="text">学车进度：</text>
				<view class="content">
					{{getProgress(stuDetail.progress)}}
				</view>
			</view>
			<view class="item">
				<text class="text">考试时间：</text>
				<view class="content">
					{{stuDetail.examTime?stuDetail.examTime:'无'}}
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
				cdn: this.$conf.CDN_HOST,
stuId:null,
			}
		},
		computed: {
...mapState({
	stuDetail:state=>state.coachSection.stuDetailMsg,
})
		},
		methods: {
			...mapActions({
				getStuDetail_fun:'coachSection/getStuDetail',
				
			}),
			async getStuDetail(stuId){
				let data={
					stuId
				}
				await this.getStuDetail_fun(data)
			},
			 getProgress(pro) {
			      let v1 = pro / 10
			      let v2 = pro % 10
			      let c
			      switch (v2) {
			        case 0:
			          c = '待考'; break
			        case 1:
			          c = '已完成'; break
			
			      }
			      switch (v1) {
			        case 0:
			          return '未开始'
			        case 1:
			          return '科目一' + '(' + c + ')'
			        case 2:
			          return '科目二' + '(' + c + ')'
			        case 3:
			          return '科目三' + '(' + c + ')'
			        case 4:
			          return '科目四' + '(' + c + ')'
			      }
			
			    },
		},
		onLoad(e) {
			this.stuId=e.stuId
			this.getStuDetail(e.stuId)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f3f5;
	}

	.stuDetail-view {
		.box {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #fff;
			margin-top: 20rpx;
			padding: 8rpx 30rpx;


			.header {
				justify-content: space-around;

				.son {
					display: flex;
					flex-direction: column;
					align-items: center;

					.value {
						font-size: 34rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Medium;
						font-weight: 500;
						text-align: center;
						color: #000000;
					}

					.key {
						font-size: 26rpx;
						font-family: Source Han Sans CN, Source Han Sans CN-Regular;
						font-weight: 400;
						text-align: center;
						color: #999999;
					}

				}
			}

			.item {
				position: relative;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 0;
				width: 100%;

				.content {
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: right;
					color: #000000;

					.avatar {
						width: 96rpx;
						height: 96rpx;
						background: #f2f3f5;
						border-radius: 50%;
					}
				}


				&:after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 2rpx;
					background-color: #f2f3f5;
				}

				&:last-child::after {
					display: none;
					content: "";
				}

				.text {
					font-size: 30rpx;
					font-family: Source Han Sans CN, Source Han Sans CN-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
				}
			}
		}
	}
</style>