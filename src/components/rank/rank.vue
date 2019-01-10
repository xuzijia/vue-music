<template>
  <transition name="slide">
    <div class="rank" ref="rank">
      <scroll class="top" ref="scroll" :data="topList">
        <div>
        <ul v-for="(item,index) of topList" :key="index">
          <li class="item" @click="selectItem(item)">
            <div class="icon">
              <img width="100" height="100" v-lazy="item.coverImgUrl" style="border-radius: 5px"/>
            </div>
            <ul class="songlist">
              <li class="song" v-for="(song,i) of item.tracks" :key="i">
                <span>{{i+1}}.</span>
                <span>{{song.first}} - {{song.second}}</span>
              </li>
            </ul>
          </li>
        </ul>
        </div>
        <div class="loading-container" v-show="!topList.length">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {config} from 'api/config'
  import {playlistMixin} from 'common/js/mixin'
  import {getRankList} from 'api/rank'
  import {mapMutations} from 'vuex'

  export default {
    mixins: [playlistMixin],
    data () {
      return {
        topList: []
      }
    },
    created () {
      this._getRankList()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getRankList () {
        getRankList().then((res) => {
          if (res.code == config.apiConfig.request_ok) {
            this.topList = res.list
          }
        })
      },
      selectItem (item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc: 'SET_DISC',
      })
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .top
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 10px
        height: 100px
        &:last-child
          padding-bottom: 10px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
