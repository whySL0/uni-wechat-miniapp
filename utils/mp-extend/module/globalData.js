// 将app.globalData注入到所有页面的data.$globalData中
// 并提供this.$global.setData的方法修改 globalData

let appInstance = null;
let appOption = null;

// 本来应该以symbol类型作为key避免冲突，但是小程序不支持，只能直接用字符串类型了
// let $globalSetDataArray = Symbol('$globalSetDataArray')
let $globalSetDataArray = "$globalSetDataArray";

export default {
  App: {
    preprocess() {
      appOption = this;
    },
    onLaunch() {
      appInstance = this;
    }
  },
  Page: {
    preprocess() {
      this.data.$globalData = appOption.globalData;
    },
    data: {
      $globalData: {},
      test: 'test'
    },

    onLoad() {
      this.setData({
        $globalData: appInstance.globalData
      });
    },

    // 根据小程序文档中描述，所有非显示的页面都不应当调用setData
    // 这里使用一个 $globalSetDataArray 数组暂存在页面显示时需要更新的data
    // 在页面onShow时才调用setData进行更新
    onShow() {
      this[$globalSetDataArray].forEach(obj => {
        this.setData(obj);
      });
      this[$globalSetDataArray] = [];
    },

    [$globalSetDataArray]: [],

    // $globalSetData(o) {
    //   // 所有页面setData所用的object
    //   let obj = {};
    //   for (let key in o) {
    //     obj["$globalData." + key] = o[key];
    //   }

    //   // 对当前页面堆中的所有页面进行操作
    //   const currentPages = this.$getCurrentPages();
    //   for (const pagePath in currentPages) {
    //     const pageItem = currentPages[pagePath];
    //     // 直接调用前台页面的setData
    //     if (pageItem.__route__ === this.__route__) {
    //       pageItem.setData(obj);
    //       // 更新 app.globalData 的值
    //       appInstance.globalData = deepCopyData(pageItem.data.$globalData);
    //     }
    //     // 后台页面暂存到数组中
    //     else {
    //       pageItem[$globalSetDataArray].push(obj);
    //     }
    //   }
    // }
  },
  Component: {
    preprocess() {
      this.data.$globalData = appOption.globalData;
    },
    data: {
      $globalData: {}
    },
    attached() {
      this.setData({
        $globalData: appInstance.globalData
      });
    }
  }
};

/**
 * 用于data的深拷贝，不可用于函数、时间、正则等
 */
function deepCopyData(o) {
  return JSON.parse(JSON.stringify(o));
}
