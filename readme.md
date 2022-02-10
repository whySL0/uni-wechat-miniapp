初试uni-app框架
-------------------------

### 简介
选用uni-app搭建的基于vue2的多端项目，使用uni内置的组件和api(uni-ui)、sass。
### 请求封装
使用promise来封装http请求，封装方法如下：
```javascript
	import config from '../config';
	const baseURL = config.hostMap[config.mode] + '/service';

	const app = getApp(); 
	try {
		var userInfo = wx.getStorageSync('userInfo');
		var sessionId = userInfo?.sessionKey || '';
	} catch(e) {}

	const header = {
		'content-type': 'application/json;charset=UTF-8',
		'client': 'wechatapp',
		'auth_type': 'sid',
		'user_type': 'user',
		'authorization': 'Uyv5NG9zq1qds7VP',
		'userKey': 'param:key:loginInfo:' + sessionId || ''
	}

	export function api(url, method, data, option) {
		return new Promise((resolve, reject)=>{
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			uni.request({
				url: baseURL + url,
				timeout: option?.timeout || 3000,
				method: method || 'GET',
				header: {...header, ...option?.header},
				data: data || {},
				success: function(response) {
					uni.hideLoading();
					if(response.data.code != 0) {
						uni.showToast('请求异常');
						return resolve(response.data)
					} else {
						return resolve(response.data.data)
					}
				},
				fail: function(error) {
					uni.showToast('请求异常');
					return reject(error)
				}
			})
		})
	}
	export {
		baseURL
	}
```
具体调用方法，页面中的调用可用Promise then/catch来调用，也可用 async/await来调用
```javascript
	import { api } from '../utils/service/request'

	// 获取地区服务商列表
	export const getCompanyList = (() => {
		return api("/user/company/p_list")
	})
```
### 开发注意事项
* 除了可使用uni-app封装的api方法，微信专用的api（如微信运动、卡券等）一样可以使用
* 有一些写法有改动，如：wx:for="{{list}}" wx:key="key" 应改为 v-for="(item, index) in list"