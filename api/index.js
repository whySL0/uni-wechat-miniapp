import { api } from '../utils/service/request'

// 获取地区服务商列表
export const getCompanyList = (() => {
	return api("/user/company/p_list")
})

// 微信一键登录
export const loginByWxCode = ((params) => {
  return api("/cust/custWechat/user/p_oauth", 'post', params)
})
// 获取验证码
export const getValidateCode = ((phone) => {
  return api("/cust/custWechat/user/register/p_sendLoginCode?userName=" + phone)
})

// 短信登录
export const loginByPhone = ((params) => {
  return api("/cust/custWechat/user/login/p_smsLogin", 'post', params)
})

// 密码登录
export function loginByPwd(params){
  return api("/cust/custWechat/user/login/p_account", 'post', params)
}


// 忘记密码 发送验证码
export function sendCode(phone){
  return api("/cust/custWechat/user/register/p_sendSmsRetrieveCode?userName=" + phone)
}

// 忘记密码 验证验证码
export function verifyCode(params){
  return api("/cust/custWechat/user/login/p_retrievePwdVerify", 'post', params)
}

// 忘记密码 重置密码
export function findPwd(params){
  return api("/cust/custWechat/user/info/p_updatePwdByUser", 'post', param)
}

// 忘记密码 校验手机号码是否已绑定
export function checkPhoneBind(phone){
  return api(`/cust/custWechat/user/p_isBindPhone?loginPhone=${phone}`, 'GET', null, {hideToast: true})
}

// 进入小程序，记录微信用户信息
export function remarkUser(params){
  return api(`/cust/custWechat/user/p_remarkUserInfo`, 'post', params, { hideToast: true })
}

// 退出登录
export function handleLogout(){
  return api(`/cust/fe/user/l_logout`, 'post')
}
