<script>
	// 定义 全局混入
	import './utils/mp-extend/index'
	export default {
		globalData: {
				toastDuration: 2000,
				userInfo: {},
				imgUrl: "https://zydmall-tinyapp.oss-cn-shenzhen.aliyuncs.com/miniapp/images",
		},
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 引入公共样式
	@import './uni.scss';
	// 设置整个项目的背景色
	page {
		background-color: #fff;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
