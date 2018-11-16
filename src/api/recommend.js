/**
 * @description 推荐页面数据接口
 * @author simple
 * @date 2018/10/30 09:47
 */
import {fetch} from 'common/js/common'

/**
 * 获取推荐页banner
 * @returns banner
 */
export function getBanner(){
  const url="/banner/getBanner";
  const data={
    clientType:"pc"
  }
  return fetch(url,data);
}

/**
 * 获取推荐歌单
 * @returns playList
 */
export function getPlayList () {
  const url="/playlist/highquality";
  //默认显示6条
  const data={
    limit:6
  }
  return fetch(url,data);
}

/**
 * 获取推荐电台
 * @returns djList
 */
export function getDjRecommend () {
  const url="/dj/personalized";
  return fetch(url);
}

/**
 * 获取歌手新碟
 * @returns newAlbumList
 */
export function getNewAlbumList () {
  const url="/album/new";
  const data={
    limit:6,
    type:"ZH"
  }
  return fetch(url,data);

}
