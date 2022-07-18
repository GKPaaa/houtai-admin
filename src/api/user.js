import request from '@/utils/request'

/**
 *  登录ajax功能的实现
 * @param {*} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    url: 'login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
/**
 * 用户数据列表
 * @returns
 */
export const usersAPI = ({ pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      pagenum,
      pagesize
    }
  })
}
/**
 *  添加用户
 * @param {username:用户名, password：用户密码, email：用户邮箱, mobile：用户手机号} param0
 * @returns
 */
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    url: 'users',
    method: 'POST',
    data: {
      username, password, email, mobile
    }
  })
}

/**
 *  根据传入的id删除该用户
 * @param {*} id
 * @returns
 */
export const delUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

/**
 *  编辑用户对用户进行设置
 * @param {*} id
 * @param {*} param1
 * @returns
 */
export const editUser = ({ id, email, mobile }) => {
  return request({
    url: `users/${id}`,
    method: 'put',
    data: {
      id,
      email,
      mobile
    }
  })
}

/**
 *  设置用户--分配角色
 * @param {*} param0
 * @returns
 */
export const setUser = ({ id, rid }) => {
  return request({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid
    }
  })
}

/**
 *  根据id查询用户
 * @param {*} id
 * @returns
 */
export const searchUser = (id) => {
  return request({
    url: `users/${id}`
  })
}

/**
 *  角色管列表
 * @returns
 */
export const rolesManage = () => {
  return request({
    url: 'roles'
  })
}

/**
 *  修改用户的状态
 * @param {*} param0
 * @returns
 */
export const roleState = ({ uId, type }) => {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}

/**
 *  分配用户权限
 * @param {*} id
 * @returns
 */
export const assignment = (id) => {
  return request({
    url: `users/${id}/role`,
    method: 'put'
  })
}
