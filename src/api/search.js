/**
 * @description 搜索相关接口
 * @author simple
 * @date 2018/12/6 09:31
 */

import {fetch} from 'common/js/common'

/**
 * 获取搜索结果
 * @param query 搜索内容
 * @param 搜索类型
 * @returns 搜索结果
 */
export function search (query,type,offset,limit) {
  const url="/search";
  //获取100个
  const data={
    keywords:query,
    type:type,
    offset:offset,
    limit:limit
  };
  return fetch(url,data);
}

/**
 * 获取热门搜索项
 * @returns 热门搜索项
 */
export function getSearchHot () {
  const url="/search/hot";
  return fetch(url)
}

/**
 * 获取搜索提示
 * @param query
 * @returns 搜索提示
 */
export function getSuggest (query) {
  const url="/search/suggest"
  const data={
    keywords:query
  }
  return fetch(url,data)
}
