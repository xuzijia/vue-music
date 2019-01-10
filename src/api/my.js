/**
 * @description 获取关于用户歌单等个人信息的相关接口
 * @author simple
 * @date 2018/12/21 09:22
 */
import {fetch} from 'common/js/common'

/**
 * 获取用户歌单列表
 */
export function getMyPlayList (userid) {
  const url="/playlist/user";
  //理论上获取用户所有歌单
  const data={
    id:userid,
    limit:1000000000,
    offset:0
  };
  return fetch(url,data);
}

/**
 * 获取用户信息
 * @param userid
 * @returns {*}
 */
export function getUserDetail (userid) {
  const url="/user/detail"
  const data={
    id:userid
  };
  return fetch(url,data);
}
