<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getDayRecommend} from 'api/recommend'
  import {config} from 'api/config'
  import {createSong} from 'common/js/song'
  import {mapMutations} from 'vuex'
  export default {
    computed: {
      title() {
        var date = new Date()
        var hours = date.getHours()
        var day = date.getDate()
        day=hours<6?day-1:day;
        return `每日推荐 ( ${day} 日 )`
      },
      bgImage() {
        //todo 根据日期生成封面
        return ""
      },
    },
    data() {
      return {
        songs: [],
        rank:false
      }
    },
    created() {
      this._getDayRecommend()
    },
    methods: {
      _getDayRecommend() {
        getDayRecommend().then((res) => {
          if (res.code === config.apiConfig.request_ok) {
            this.songs = this._normalizeSongs(res.recommend)
          }else if(res.code==config.apiConfig.no_login){
            //用户未登录
            this.setLoginStatus(true)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      ...mapMutations({
        'setLoginStatus':"SET_LOGIN_STATUS"
      })
    },
    components: {
      MusicList
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
