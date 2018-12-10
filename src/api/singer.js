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

/**
 * 获取歌手热门单曲
 */
export function getHotSong(id){
  const url="/artist/song";
  const data={
    id:id
  };
  return fetch(url,data);
}

/**
 * 获取歌手专辑
 */
export function getSingerAlbum(id){
  const url="/artist/album";
  const data={
    id:id,
    limit:30
  }
  return fetch(url,data);
}

/**
 * 获取歌手mv
 */
export function getSingerMv(id,offset,limit){
  const url="/artist/mv";
  const data={
    id:id,
    offset:offset,
    limit:limit

  }
  return fetch(url,data);
}
