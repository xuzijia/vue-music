/**
 * @description 排行榜相关api
 * @author simple
 * @date 2018/12/3 15:19
 */
import {fetch} from 'common/js/common'

/**
 * 获取排行榜列表
 * @returns 排行榜列表
 */
export function getRankList() {
  const url="/top/detail";
  return fetch(url);
}

