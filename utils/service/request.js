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
		if(option.header.showLoading) {
			uni.showLoading({
				title: '加载中',
				mask: true
			})
		}
		
		uni.request({
			url: baseURL + url,
			timeout: option?.timeout || 3000,
			method: method || 'GET',
			header: {...header, ...option?.header},
			data: data || {},
			success: function(response) {
				if(option.header.showLoading) {
					uni.hideLoading();
				}
				
				if(response.data.code != 0) {
					uni.showToast('请求异常');
					return resolve(response.data)
				} else {
					return resolve(response.data.data)
				}
			},
			fail: function(error) {
				if(!option.header.hideToast) {
					uni.hideLoading();
					uni.showToast('请求异常');
				}
				return reject(error)
			}
		})
	})
}
export {
	baseURL
}

