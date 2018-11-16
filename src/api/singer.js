/**
 * @description 歌手页接口
 * @author simple
 * @date 2018/11/15 16:43
 */
import {fetch} from 'common/js/common'

/**
 * 获取前100个热门歌手
 */
export function getHotSinger () {
  const url="/artist/hot";
  //获取100个
  const data={
    limit:100
  };
  return fetch(url,data);
}
