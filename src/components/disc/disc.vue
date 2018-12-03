<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getPlayList} from 'api/playlist'
  import {config} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.disc.name
      },
      bgImage() {
        return this.disc.coverImgUrl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.id) {
          this.$router.push('/recommend')
          return
        }
        getPlayList(this.disc.id).then((res) => {
          if (res.code === config.apiConfig.request_ok) {
            this.songs = this._normalizeSongs(res.result.tracks)
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
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
