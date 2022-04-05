<template>
	<!--pages/mine/index.wxml-->
	<view>
	  <view class="bg-gray" style="padding-bottom: 106rpx;">    
	    <view class="mine">
	        <!-- 订单模块 -->
			<view class="order-box">
				<view class="title-row flex align-center justify-between" data-url="../../order/list/list?tab=0" :data-login="true" @click="navTo">
				  <view class="title text-md ml-16">我的订单</view>
				  <view class="more text-df">全部<icon class="iconfont icon-gengduo"></icon></view>
				</view>
				<view class="order-warp flex align-center justify-between flex-wrap font-500">
				  <view class="order-item flex align-center flex-direction justify-center" data-url="../../order/list/list?tab=1" :data-login="true" @click="navTo">
					  <image lazy-load class="order-pic" mode="aspectFit" :src="`${$globalData.imgUrl}/mine/quotating.png`" />
					<view class="order-desc text-sm">报价中</view>
				  </view>
				  <view class="order-item flex align-center flex-direction justify-center" data-url="../../order/list/list?tab=2" :data-login="true" @click="navTo">
					  <image lazy-load class="order-pic" mode="aspectFit" :src="`${$globalData.imgUrl}/mine/quoted.png`" />
					<view class="order-desc text-sm">已报价</view>
				  </view>
				  <view class="order-item flex align-center flex-direction justify-center" data-url="../../order/list/list?tab=3" :data-login="true" @click="navTo">
					  <image lazy-load class="order-pic" mode="aspectFit" :src="`${$globalData.imgUrl}/mine/generate.png`" />
					<view class="order-desc text-sm">生成合同中</view>
				  </view>
				  <view class="order-item flex align-center flex-direction justify-center" data-url="../../order/list/list?tab=4" :data-login="true" @click="navTo">
					  <image lazy-load class="order-pic" mode="aspectFit" :src="`${$globalData.imgUrl}/mine/signing.png`" />
					<view class="order-desc text-sm">签署合同中</view>
				  </view>
				  <view class="order-item flex align-center flex-direction justify-center" data-url="../../order/list/list?tab=5" :data-login="true" @click="navTo">
					<image lazy-load class="order-pic" mode="aspectFit" :src="`${$globalData.imgUrl}/mine/signed.png`" />
					<view class="order-desc text-sm">已签署合同</view>
				  </view>
				  <view class="order-item flex align-center flex-direction justify-center" data-url="../../order/list/list?tab=6" :data-login="true" @click="navTo">
					<image lazy-load class="order-pic" mode="aspectFit" :src="`${$globalData.imgUrl}/mine/voided.png`" />
					<view class="order-desc text-sm">已作废</view>
				  </view>
				</view>
			</view>
			  <!-- 我的工作台 -->
			<view class="my-platform">
				<view class="platform-title-row flex align-center justify-between">
				  <view class="title text-md">我的工作台</view>
				</view>
				<view class="platform-warp flex align-center flex-wrap justify-between font-normal">
				  <view class="platform-item flex flex-direction align-center justify-around">
					<icon class="colorIcon color-dianziqianzhang text-xxxl"></icon>
					<view class="text-2 text-sm platform-desc">电子签章</view>
				  </view>
				  <view class="platform-item flex flex-direction align-center justify-around" data-url="/pages/account/accSetting" :data-login="true" @click="navTo">
					<icon class="colorIcon color-zhanghaoshezhi text-xxxl"></icon>
					<view class="text-2 text-sm platform-desc">账号设置</view>
				  </view>
				  <view class="platform-item flex flex-direction align-center justify-around" data-url="/pages/address/index" :data-login="true" @click="navTo">
					<icon class="colorIcon color-shouhuodizhi text-xxxl text-1"></icon>
					<view class="text-2 text-sm platform-desc">收货地址</view>
				  </view>
				  <view class="platform-item disabled-fun flex flex-direction align-center justify-around">
					<icon class="colorIcon color-wodeshoucang text-xxxl opacity-4"></icon>
					<view class="text-sm platform-desc text-disabled">我的收藏</view>
				  </view>
				  <view class="platform-item disabled-fun flex flex-direction align-center justify-around">
					<icon class="colorIcon color-zhuanshuzhekou text-xxxl opacity-4"></icon>
					<view class="text-sm platform-desc text-disabled">专属折扣</view>
				  </view>
				  <view class="platform-item disabled-fun flex flex-direction align-center justify-around">
					<icon class="colorIcon color-lishigouwu text-xxxl opacity-4"></icon>
					<view class="text-sm platform-desc text-disabled">历史购物</view>
				  </view>
				  <view class="platform-item disabled-fun flex flex-direction align-center justify-around">
					<icon class="colorIcon color-jifenshangcheng text-xxxl opacity-4"></icon>
					<view class="text-sm platform-desc text-disabled">积分商城</view>
				  </view>
				  <!-- <view class="platform-item flex flex-direction align-center justify-around">
					
				  </view> -->
				  <!-- 上线时，这里的活动入口要注释掉 -->
				  <view class="platform-item flex flex-direction align-center justify-around" @click="navTo" data-url="/wanKe/index">
					<icon class="colorIcon color-jifenshangcheng text-xxxl"></icon>
					<view class="text-sm platform-des">活动页</view>
				  </view>
				  
				</view>
			</view>
			<!-- 退出账号 -->
			<view v-if="storageUserInfo.id" class="quit bg-gray" @click="logout">
				<view class="quit-btn text-3 text-df text-center">退出账号</view>
			</view>
	    </view>
	  </view>
	</view>
</template>

<script>
	import {
	  handleLogout,
	  loginByWxCode
	} from '../../api/index'
	
	// import '../../utils/lodash/fix'
	// import _ from 'lodash'
	export default {
		data() {
			return {
				loading: {
				  login: false
				},
				showLogoutDialog: false,
				unbind: '', // 标记 该微信号是否已绑定账号
				addressListPermit: false, // 是否跳转到收货地址列表
				scoreActive: false, // 是否激活积分商城
				signPermit: true,
				sigUrl: '/pages/signature/add',
				userInfo: {}, // 获取头像信息 微信用户信息
				storageUserInfo: {},// 缓存用户信息 
				capsuleBg: 'rgba(255,255,255,0)', // 导航栏背景色
				user: {}, // 用户信息
				businessInfo: {}, // 商务业务信息
				orderNum: {}, // 订单信息
				toastShow: false,
				abv: null,
				statusLineHeight: null, // 获取 CapsuleBar 高度
			}
		},
		onReady() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()　　//获取胶囊坐标信息
			this.statusLineHeight = menuButtonInfo.top
		},
		onLoad() {
			this.abv = 'daf'
		},
		mounted() {
			
		},
		methods: {
			logout() {
				
			},
			 //  跳转页面
			navTo(e) {
				let { url, login } = e.currentTarget.dataset;
				// 需要登录权限 login
				if(login && !Object.keys(this.data.user).length) {
					uni.showToast({
						icon: "none",
						title: "您还未登录，请先登录！",
						duration: this.data.$globalData.toastDuration
					})
				} else {
					uni.navigateTo({
						url
					})
				}
			},
			nothing() {
				return;
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	/* pages/mine/index.wxss */
	/* **************** 导航栏样式开始 **************** */
	page {
	  position: relative;
	}
	
	/* **************** 导航栏样式结束 **************** */
	
	
	/* **************** 订单模块样式开始 **************** */
	.order-box {
	  height: calc(492rpx + 24rpx);
	  margin: 12rpx 32rpx;
	}
	.title-row {
	  margin-bottom: 20rpx;
	}
	.ml-16 {
	  margin-left: 32rpx;
	}
	.title {
	  color: #333;
	  line-height: 48rpx;
	  font-weight: 600;
	  
	}
	.more {
	  color: #999;
	  line-height: 44rpx;
	}
	.order-item {
	  width: 210rpx;
	  height: 192rpx;
	  background: #fff;
	  border-radius: 16rpx;
	  margin: 14rpx 0;
	}
	.order-pic {
	  width: 80rpx;
	  height: 80rpx;
	}
	.order-desc {
	  color :#666;
	  line-height: 40rpx;
	  margin-top: 16rpx;
	}
	/* **************** 订单模块样式结束 **************** */
	
	/* **************** 我的工作台样式开始 **************** */
	.my-platform {
	  background: #fff;
	  padding: 32rpx;
	  margin: 16rpx 32rpx;
	  border-radius: 8px;
	}
	.platform-title-row {
	  margin-bottom: 22rpx;
	}
	.platform-warp {
	  margin: 0 -9rpx;
	}
	.platform-item {
	  width: 142rpx;
	  height: 128rpx;
	  margin: 10rpx 9rpx;
	}
	.platform-pic {
	  width: 48rpx;
	  height: 48rpx;
	}
	.platform-desc {
	  line-height: 40rpx;
	}
	.disabled-fun {
	  position: relative
	}
	.disabled-fun::after {
	  position: absolute;
	  content: '';
	  background-image: url('https://zydmall-tinyapp.oss-cn-shenzhen.aliyuncs.com/miniapp/images/mine/disabled.png');
	  background-size: contain;
	  bottom: 60rpx;
	  left: 32rpx;
	  width: 80rpx;
	  height: 24rpx;
	}
	/* **************** 我的工作台样式结束 **************** */
	
	/* **************** 退出账号按钮 **************** */
	.quit {
	  padding: 16rpx 32rpx 32rpx;
	}
	.quit-btn {
	  width: 686rpx !important;
	  height: 88rpx;
	  background: #fff;
	  border-radius: 16rpx;
	  line-height: 88rpx;
	  margin: 0 !important;
	}
	
	.cer-icon {
	  width: 32rpx !important;
	  height: 32rpx !important;
	  object-fit: contain; 
	}
	.cer-box {
	  margin: 12rpx 50rpx;
	  width: 175rpx;
	  height: 54rpx;
	  line-height: 54rpx;
	}
	.cer-txt-box {
	  width: 116rpx;
	  margin-left: 8rpx;
	}
	.cer-txt {
	  text-align: right;
	  width: 82rpx;
	}
	.text-person {
	  color: #B57300;
	}
	.text-corp {
	  color: #D1C4B4;
	}
	.cer-txt-tit {
	  line-height: 24rpx;
	  margin-bottom: 4rpx;
	}
	.cer-txt-sub {
	  margin-top: 4rpx;
	  line-height: 20rpx;
	}
	.icon-r-arrow {
	  font-size: 18rpx;
	  display: inline-flex;
	}
	.wid-inherit {
	  width: inherit;
	}
	
	/* 确认弹框 */
	.confirm-content {
	  color: #666 !important;
	}

</style>
