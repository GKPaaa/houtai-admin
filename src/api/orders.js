import request from '@/utils/request'
export const order = (params) => {
  return request({
    url: 'orders',
    params
  })
}
