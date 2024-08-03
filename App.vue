<script>
	import {
		login,
		getUserState,
	} from '@/api/user.js'
	export default {
		globalData: {
			scene: 'cnm',
			globalBottom: 0,
			loginNow: false, //标记是否正在登录页面，如果是，则不重复打开
		},
		data() {
			return {
				code: '',
			}
		},
		onLaunch: function(options) {

			this.$app.update(); //更新
			if (options.query.scene) {
				let arr = options.query.scene.split('_')
				if (arr[0] == 'recomm') {
					uni.setStorageSync("recommender", arr[1]);
				} else if (arr[0] == 'channel') {
					uni.setStorageSync("channel", arr[1]);
				}
			}
			if (options.query.relation) {
				uni.setStorageSync('relation', options.query.relation)
			}
			//拿code，每三分钟过期一次
			this.getCode();
			// setInterval(() => {
			// 	this.getCode();
			// }, 3 * 60 * 1000)


			let _this = this;
			uni.getSystemInfo({
				success(res) {
					if (res.safeArea.top > 20) {
						_this.globalData.globalBottom = res.safeArea.top - 20 - 14 //兼容屏幕黑边 20为固定值
					}
				}
			})
		},
		onShow: function() {},
		onHide: function() {},

		methods: {
			//拿code
			async getCode() {
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						this.code = loginRes.code
						this.userLogin()
					}
				})
			},

			async userLogin() {
				let params = {
					code: this.code
				}
				login(params).then((res) => {
					if (res && res.code == 0) {
						this.$win.nlog('已登录')
						let whos = res.resultMap
						this.$db.setSync('userId', whos.userId)
						this.$db.setSync('token', whos.token)
						this.$db.setSync('identity', whos.identity)
						if (whos.statu == 0) {
							console.log('新用户', whos.statu);
							// this.$win.go('/page_login/index_2?statu=no')
							this.$win.go('/page_login/status/userInfo?new=1')
						} else if (whos.statu == 1) {
							console.log('老用户');
							if (whos.identity == 0) {
								console.log('路人');
								this.$win.go('/pages/my/my')
							} else if (whos.identity == 1) {
								console.log('学员');
								this.$win.go('/pages/my/my')
							} else if (whos.identity == 2) {
								console.log('教练');
								// this.$win.go('/page_coachSection/coachSection')
							}
						}
					} else {

					}
				})
			},

			//跳转
			skip() {

			}
		},
		computed: {},
		onShow() {

		},
		onLoad(e) {
			console.log('rnm', e)
		}
	};
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";

	/*每个页面公共css */
	page {
		background: #fff;
		font-size: 26rpx;
		color: #333333;
	}
</style>