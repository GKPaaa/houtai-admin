import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})

// 请求拦截器：一堆ajax请求配置项都要做的事情，就可以提取到请求拦截器，只需要写一次
// 添加请求拦截器
// interceptors -> 拦截器 楼下一楼 火车站检票 ETC

// instance.interceptors.request.use(成功的回调,失败的回调)
// 大事件
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user) {
    config.headers = {
      Authorization: store.state.user.token
    }
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
