import {config} from 'api/config'
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
  album:{}
}
export default state
