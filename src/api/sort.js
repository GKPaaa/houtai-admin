import request from '@/utils/request'
// 商品分类的接口
export const sort = (params) => {
  return request({
    url: 'categories',
    params
  })
}

/**
 *  增加父级分类
 * @param {*} data
 * @returns
 */
export const fatherSort = (data) => {
  return request({
    url: 'categories',
    method: 'POST',
    data
  })
}
