import axios from 'axios'
// import { Message } from 'element-ui'
import storage from './storage'
import qs from 'qs'
const request = axios.create({
  // API 请求的默认前缀
  baseURL: '/inter/api',
  timeout: 30000 // 请求超时时间
})

request.interceptors.request.use(
  config => {
    const token = storage.get('token')
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response.data //可以不做任何处理，在这里了直接返回请求会的结果
    // const res = response.data || {}
    // console.log(res)
    // if (res.code != 200) {
    //   // 401: Unauthorized
    //   if (res.code === 401) {
    //     notification.error({
    //       key: 'Unauthorized',
    //       message: '错误',
    //       description: '身份验证失败，请重新登录！'
    //     })
    //     // 从 localstorage 获取 token
    //     const token = storage.get('token')
    //     if (token) {
    //       storage.removeAll()
    //       window.location.href = '/login'
    //       Message.error('登陆信息过期')
    //       // 原文  store.dispatch('Logout').then(() => {
    //       //     window.location.reload()
    //       //   })
    //     }
    //   }

    //   return Promise.reject(response.data)
    // } else {
    //   return res.data
    // }
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  /**
   *
   * @param {String} url
   * @param {Object} data
   * @param {String} isForm
   * @param {Object} config
   *
   * 这里是通用请求
   * 如果需要特殊的配置在config中配置
   *
   */
  post(para, config = {}) {
    if (para.isForm === 'FORM') {
      const formHeaders = {
        // 'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
      const transformRequest = data =>
        qs.stringify(data, {
          encode: false,
          allowDots: true,
          arrayFormat: 'indices'
        })
      config.transformRequest = config.transformRequest
        ? [transformRequest, ...config.transformRequest]
        : [transformRequest]

      config = { headers: formHeaders, ...config }
    }
    // 文件上传
    if (para.isForm === 'FILE') {
      const formHeaders = {
        'Content-Type': 'multipart/form-data'
      }
      config = { headers: formHeaders, ...config }
      const forms = new FormData()
      forms.append('file', para.data)
      para.data = forms
    }
    return request.post(para.url, para.data, config)
    //return request.post(url, data, config).then(res => res).catch(e => e),这里的处理和上边的不同是因为上面没做处理的结果return出来的promise对象，做了处理就return出来的是一个经过处理的对象，
  },
  /**
   *
   * @param {String} url
   * @param {Object} params
   */
  get(data) {
    return request.get(data.url, { params: data.params }, data.config)
    //retrun request.get(url, { params: params }, config)//同上
  }
}
//参考自：https://juejin.cn/post/6994728394378182669
