/**
 * @description 歌单专辑相关接口
 * @author simple
 * @date 2018/11/30 09:47
 */
import {fetch} from 'common/js/common'

/**
 * 获取歌单列表
 */
export function getPList (cat,offset,limit) {
  const url="/playlist/list";
  //获取100个
  const data={
    cat:cat,
    offset:offset,
    limit:limit
  };
  return fetch(url,data);
}

/**
 * 获取歌单全部分类
 */
export function getCatList () {
  const url="/playlist/catlist";
  return fetch(url)
}

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



