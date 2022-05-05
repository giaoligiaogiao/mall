import axios from 'axios';

// 创建 axios 实例
const url=window.location.host.substring(0,window.location.host.length-5)
console.log(url)
const requests = axios.create({
  // eslint-disable-next-line no-undef
  // baseURL: "http://"+"192.168.31.103"+":8080", // 基础url
  baseURL:'http://localhost:8080',
  timeout: 6000 // 请求超时时间
})

// 错误处理函数
const responseHandleError = (error) => {
  if (error.response) {
    const data = error.response.data;
    const err = (data && data.msg) ? data.msg : error.response.statusText;
    // PushMessage.error(err);

    // const token = Vue.ls.get(ACCESS_TOKEN)
    // if (error.response.status === 403) {
    //   Notify({type: 'danger', message: data.message || data.msg});
    // }
    // if (error.response.status === 401) {
    //   Notify({type: 'danger', message: '你没有权限。'});
    //   // if (token) {
    //   //   store.dispatch('Logout').then(() => {
    //   //     setTimeout(() => {
    //   //       window.location.reload()
    //   //     }, 1500)
    //   //   })
    //   // }
    // }
    return Promise.reject(err)
  }
}
const requestHandleError = (error) => {
  // Toast.fail(error);
  return Promise.reject(error)
}
// request interceptor(请求拦截器)
requests.interceptors.request.use(config => {
  
  if (config.url.includes('login')) {
    return config
  } 

  else {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
  }
  
}, requestHandleError)

// response interceptor（接收拦截器）
requests.interceptors.response.use((response) => {
  const res = response.data;
  if (response.status >= 400) {
    Toast.fail(res || res.statusText);
    // 401:未登录;
    // if (res.code === 401||res.code === 403||res.code===999) {
    //   Notify({ type: 'danger', message: '请登录'});
    // }
    return Promise.reject(res)
  } else {
    return res
  }
}, responseHandleError)

export default requests;

