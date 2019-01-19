import request from '@/utils/request'

export function login(username, password) {
  //debugger
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  //debugger
  return request({
    url: '/user/info',
    method: 'get',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
