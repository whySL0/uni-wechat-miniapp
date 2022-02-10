import { api } from '../utils/service/request'

// 获取地区服务商列表
export const getCompanyList = (() => {
	return api("/user/company/p_list")
})