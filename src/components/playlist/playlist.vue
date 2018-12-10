<template>
  <transition name="slide">
    <div class="playlist">
      <back :url="backUrl"></back>
      <h1 class="title">{{this.listData.cat}} 热门歌单</h1>
      <div class="filter">
        <span><i class="icon iconfont icon-shaixuan">&nbsp;</i>筛选 ></span>
      </div>
      <div class="list">
        <scroll ref="scroll" class="playlist-content" :data="playList"
                :pullup="pullup"
                :beforeScroll="beforeScroll"
                @scrollToEnd="loadMore"
        >
          <play-list @selectItem="selectItem" :playList="playList"></play-list>
        </scroll>
      </div>
      <div class="loading-container" v-show="!playList.length">
        <loading></loading>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import back from 'base/back/back'
  import {getPList} from 'api/playlist'
  import {config} from 'api/config'
  import {mapMutations} from 'vuex'
  import PlayList from 'components/common/playlist'

  export default {
    data () {
      return {
        backUrl: '/recommend',
        imgSize: '?param=200y200',
        hasMore: false,
        loadFlag:true,
        pullup: true,
        beforeScroll: true,
        listData: {
          cat: '全部',
          page: 0,
          size: 20
        },
        playList: []
      }
    },
    created () {
      this._getPlayList()
    },
    methods: {
      _getPlayList (flag) {
        console.log(this.loadFlag)
        getPList(this.listData.cat, this.listData.page * this.listData.size, this.listData.size).then((res) => {
          console.log(res)
          if (res.code == config.apiConfig.request_ok) {
            if (flag) {
              //递增歌单数据
              this.playList = this.playList.concat(res.playlists)
            } else {
              //首次加载 不递增数据
              this.playList = res.playlists
            }
            this.hasMore=res.more;
          }
        })
      },
      selectItem (item) {
        this.$router.push({
          path: `/playlist/${item.id}`
        })
        this.setDisc(item)
      },
      loadMore () {
        //下拉加载更多
        if (!this.hasMore) {
          return
        }
        this.loadFlag=true
        this.listData.page++
        this._getPlayList(true)
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    components: {
      back,
      Loading,
      Scroll,
      PlayList
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-theme
    .filter
      width 95%
      margin-top 10%
      text-align right
      padding 10px 0px
      padding-right 20px
      color $color-text-l
      background-color rgba(255, 255, 255, 0.01)
    .list
      position: fixed
      width: 100%
      top: 75px
      bottom: 0
      .playlist-content
        height: 100%
        overflow: hidden
</style>
