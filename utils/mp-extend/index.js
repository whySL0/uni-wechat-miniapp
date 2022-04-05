import MpExtend from  './extend.js'

import extendGlobalData from './module/globalData.js'
MpExtend(extendGlobalData)


App = MpExtend.App
Page = MpExtend.Page
Component = MpExtend.Component

// 暴露App、Page、Component构造函数
export default {
  App: MpExtend.App,
  Page: MpExtend.Page,
  Component: MpExtend.Component,
};
