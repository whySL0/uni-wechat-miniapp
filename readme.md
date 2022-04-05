<!--
 * @Author: linglingling
-->
初试`uni-app`框架
-------------------------

### 简介
选用`uni-app`搭建的基于`vue2`的多端项目，使用`uni`内置的组件和`api`(`uni-ui`)、`sass`。
### 请求封装
使用`promise`来封装`http`请求，封装方法如下：
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
具体调用方法，页面中的调用可用`Promise` `then/catch`来调用，也可用 `async/await`来调用
```javascript
	import { api } from '../utils/service/request'

	// 获取地区服务商列表
	export const getCompanyList = (() => {
		return api("/user/company/p_list")
	})
```
### 开发注意事项
* 除了可使用`uni-app`封装的`api`方法，微信专用的`api`（如微信运动、卡券等）一样可以使用
* 有一些写法有改动，如：`wx:for="{{list}}" wx:key="key"` 应改为 `v-for="(item, index) in list"`，即所有微信小程序`wxml`表达式的写法都转为`vue`的写法
* 路由的配置信息需要在`pages.json`中配置，同样也支持分包配置，分包通过`subPackages`配置