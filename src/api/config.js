import axios from 'axios'

// get 请求
const get = (url, data, options) => axios(Object.assign({}, {
    method: 'get',
    url: url,
    params: {
      ...data
    }
  }, options))

// post 请求
const post = (url, data, options) => axios(Object.assign({}, {
    url,
    data,
    method: 'post'
  }, options))

const put = (url, data, options) => {
  let p = new Promise((resolve, reject) => {
    resolve(url)
  })
  return p
}

export {
    get,
    post,
    axios,
    put
}