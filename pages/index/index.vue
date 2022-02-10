<template>
	<view class="container">
		<view class="intro">测试用</view>
		<button type="primary" @click="getList()">测试按钮</button>
		
		<view class="flex flex-wrap align-center">
			<view class="item lh-20 text-2" v-for="(item, index) in companyList">{{item.sshortName}}</view>
		</view>
	</view>
</template>

<script>
	import {
		getCompanyList
	} from '../../api/index.js'
	
	export default {
		data() {
			return {
				loading: {
					test: false
				},
				companyList: []
			}
		},
		onLoad() {},

		methods: {
			getList() {
				getCompanyList().then(res => {
					this.companyList = res;
					// this.setData({
					// 	companyList: res
					// })
				}).catch(err => {
					console.log('err', err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		.item {
			margin: 10rpx 20rpx;
		}
	}
	
</style>
