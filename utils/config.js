export default {
  // mode: 'prod', // 正式运行环境
  // mode: 'test', // 预上线运行环境
  mode: 'dev', // 本地开发运行环境

  hostMap: {
    dev: "http://10.10.31.60:8088",
    test: "http://10.10.31.60:8088",
    prod: "http://10.10.31.60:8088"
  }
}