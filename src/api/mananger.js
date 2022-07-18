import request from '@/utils/request'
export const goods = (params) => {
  return request({
    url: 'goods',
    params
  })
}

/**
 *  商品分类数据列表
 * @returns
 */
export const sort = (params) => {
  return request({
    url: 'categories',
    params
  })
}

/**
 * 分类参数管理
 * @param {*} param0
 * @returns
 */
export const editSubmit = ({ id }) => {
  return request({
    url: `categories/${id}/attributes?sel=many`
  })
}

export const editSubmits = ({ id }) => {
  return request({
    url: `categories/${id}/attributes?sel=only`
  })
}
/**
 *  根据名称搜索相对应的商品信息
 * @param {*} param0
 * @returns
 */
export const usersSearch = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 *  删除参数
 * @param {*} param0
 * @returns
 */
export const delParameter = ({ id, attrid }) => {
  return request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'delete'
  })
}

/**
 *  编辑提交的参数
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const editParameter = ({ id, attrid, attr_name, attr_sel }) => {
  return request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'put',
    data: {
      attr_name,
      attr_sel
    }
  })
}

export const delTags = ({
  // eslint-disable-next-line camelcase
  id, attrid, attr_name, attr_sel, attr_vals
}) => {
  return request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'put',
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}
