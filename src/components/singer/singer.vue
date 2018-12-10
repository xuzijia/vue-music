<template>
  <transition name="slide">
    <div class="singer" ref="singer">
      <scroll ref="scroll" class="singer-content" :data="singers">
       <singer :singers="singers" @selectItem="select"></singer>
        <div class="loading-container" v-show="!singers.length">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getHotSinger} from 'api/singer'
  import {config} from 'api/config'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'
  import Singer from 'components/common/singer'

  export default {
    mixins: [playlistMixin],
    data () {
      return {
        singers: [],
      }
    },
    created () {
      //获取热门歌手列表
      this._getSingerList()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getSingerList () {
        getHotSinger().then((res) => {
          if (res.code === config.apiConfig.request_ok) {
            // console.log(res);
            this.singers = res.artists
          }
        })
      },
      select (singer) {
        //将歌手的信息设置到vuex
        this.setSinger(singer)
        //进入歌手详情页
        this.$router.push({
          path: `/singer/${singer.id}`
        })
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      Scroll,
      Loading,
      Singer
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    width: 100%
    bottom 0

  .singer-content
    position: relative
    width: 100%
    height: 100%
    overflow: hidden

</style>
