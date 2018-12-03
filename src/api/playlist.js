/**
 * @description 歌单专辑相关接口
 * @author simple
 * @date 2018/11/30 09:47
 */
import {fetch} from 'common/js/common'

/**
 * 获取歌单详细内容
 */
export function getPlayList (id) {
  const url="/playlist/detail";
  //获取100个
  const data={
    id:id
  };
  return fetch(url,data);
}
/**
 * 获取专辑详细内容
 */
export function getAlbumList (id) {
  const url="/album/detail";
  //获取100个
  const data={
    id:id
  };
  return fetch(url,data);
}


