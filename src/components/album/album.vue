<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getAlbumList} from 'api/playlist'
  import {config} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSongBySinger} from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.album.name
      },
      bgImage() {
        return this.album.picUrl
      },
      ...mapGetters([
        'album'
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
        if (!this.album.id) {
          this.$router.push('/recommend')
          return
        }
        getAlbumList(this.album.id).then((res) => {
          if (res.code === config.apiConfig.request_ok) {
            this.songs = this._normalizeSongs(res.songs)
            console.log(this.songs);
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id) {
            ret.push(createSongBySinger(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    },
    watch:{
      '$route'(to,from){
        //解决路由跳转数据不刷新问题
        if(from.fullPath=="/album"){
          this.songs=[]
          this._getSongList();
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
