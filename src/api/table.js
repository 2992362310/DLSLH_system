import request from '@/utils/request'

export function getTableList() {
  return request({
    //url: '/table/list',
    url: '/ImageTables',
    method: 'get'
  })
}

export function doCorrect(params) {
  return request({
    url: '/ImageTables/' + params.Id,
    method: 'put',
    data: params
  })
}

export function doVector(params) {
  return request({
    url: '/ImageTables/' + params.Id,
    method: 'put',
    data: params
  })
}

export function doDelete(params) {
  return request({
    url: '/ImageTables/' + params.Id,
    method: 'delete'
  })
}

export function doUpload(params) {
  return request({
    url: '/ImageTables',
    method: 'post',
    data: params
  })
}

// export function getList(params) {
//   return request({
//     //url: '/table/list',
//     url: '/ImageTables',
//     method: 'get',
//     params
//   })
// }
