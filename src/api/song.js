/**
 * @description 歌曲相关api
 * @author simple
 * @date 2018/11/27 11:24
 */
import {fetch} from 'common/js/common'

/**
 * 获取歌曲歌词
 * @param id 歌曲id
 * @returns 歌词
 */
export function getLyric(id) {
  const url="/song/lyric";
  const data={
    id:id,
  }
  return fetch(url,data);
}

/**
 * 获取mv信息
 * @param id
 * @returns mv详细信息
 */
export function getMvInfo (id) {
  const url="/mv/detail";
  const data={
    id:id
  }
  return fetch(url,data);
}
