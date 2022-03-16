import axios from 'axios'
// import { faker } from '@faker-js/faker'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://192.168.46.83:8080',
    baseURL: 'http://127.0.0.1:8080',
    timeout: 5000
  })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (err) => {
      console.log(err)
    }
  )

  instance.interceptors.response.use(
    (res) => {
      return res.data
    },
    (err) => {
      console.log(err)
    }
  )

  return instance(config)
}

// export default faker
