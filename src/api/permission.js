import request from '@/utils/request'

export const tree = () => {
  return request({
    url: 'rights/tree'
  })
}

/**
 *  删除角色的某个权限
 * @param {*} param0
 * @returns
 */
export const dele = ({ roleId, rightId }) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

/**
 *  获取所有的权限
 * @returns
 */
export const getAllPer = () => {
  return request({
    url: 'rights/list'
  })
}

/**
 *  角色授权
 * @param {*} param0
 * @returns
 */
export const roleGive = ({ roleId, rids }) => {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids
    }
  })
}
