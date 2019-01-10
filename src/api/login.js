/**
 * @description 登录相关接口
 * @author simple
 * @date 2018/12/13 11:08
 */
import {fetch} from 'common/js/common'

/**
 * 登录接口
 * @param account 账号
 * @param password 密码
 * @param type 登录类型 phone or email 默认为手机号码登录
 */
export function login (account, password, type) {
  let url = ''
  let data = {}
  if (type == 'email') {
    //邮箱登录
    data = {
      email: account,
      password: password
    }
    url = '/login_email'
  } else {
    //手机号码登录
    data = {
      phone: account,
      password: password
    }
    url = '/login_phone'
  }
  return fetch(url, data)
}
