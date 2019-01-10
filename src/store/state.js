import {config} from 'api/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: config.playMode.sequence,
  currentIndex: -1,
  songs:[],
  disc:{},
  album:{},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite(),
  //登录状态
  loginStatus:false,
}
export default state
