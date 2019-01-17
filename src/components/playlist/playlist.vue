<template>
  <transition name="slide">
    <div class="playlist">
      <div v-show="!showCat">
        <back :url="backUrl"></back>
        <h1 class="title">{{this.listData.cat}} 热门歌单</h1>
        <div class="filter" @click="filter">
          <span><i class="icon iconfont icon-shaixuan">&nbsp;</i>筛选 ></span>
        </div>
        <div class="list" ref="list">
          <scroll ref="scroll" class="playlist-content" :data="playList"
                  :pullup="pullup"
                  :beforeScroll="beforeScroll"
                  @scrollToEnd="loadMore"
          >
            <play-list @selectItem="selectItem" :playList="playList" :hasMore="hasMore"></play-list>
          </scroll>
        </div>
        <div class="loading-container" v-show="!playList.length">
          <loading></loading>
        </div>
      </div>
      <div class="cat" v-show="showCat" >
        <div class="top">
          <span class="cancel" @click="cancel">取消</span>
          <span class="f">筛选歌单</span>
        </div>
        <scroll ref="scrollCat" class="cat-content" :data="catList.sub">
          <div class="catlist" ref="cat">
            <div class="all" @click="selectCat('全部歌单')">
              <div>全部歌单</div>
            </div>

            <div class="catitem" v-for="(value,key) of catList.categories">
              <div class="itemTitle">
                <i class="iconfont" :class="getIcon(key)"></i> <span>{{value}}</span>
              </div>
              <div class="item" @click="selectCat(item.name)" v-for="item of catList.sub" v-if="key==item.category">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </scroll>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import back from 'base/back/back'
  import {getPList, getCatList} from 'api/playlist'
  import {config} from 'api/config'
  import {mapMutations} from 'vuex'
  import PlayList from 'components/common/playlist'
  import {playlistMixin} from 'common/js/mixin'
  export default {
    mixins: [playlistMixin],
    data () {
      return {
        backUrl: '/recommend',
        imgSize: '?param=200y200',
        hasMore: false,
        loadFlag: true,
        pullup: true,
        beforeScroll: true,
        showCat: false,
        listData: {
          cat: '全部歌单',
          page: 0,
          size: 20
        },
        playList: [],
        catList: {}
      }
    },
    created () {
      this._getPlayList()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.list.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getPlayList (flag) {
        console.log(this.loadFlag)
        getPList(this.listData.cat, this.listData.page * this.listData.size, this.listData.size).then((res) => {
          if (res.code == config.apiConfig.request_ok) {
            if (flag) {
              //递增歌单数据
              this.playList = this.playList.concat(res.playlists)
            } else {
              //首次加载 不递增数据
              this.playList = res.playlists
            }
            this.hasMore = res.more
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
        this.loadFlag = true
        this.listData.page++
        this._getPlayList(true)
      },
      //点击筛选按钮 显示歌单分类
      filter () {
        //判断分类是否加载过了 如果加载过 则显示即可
        if (this.catList != {}) {
          //加载分类
          getCatList().then((res) => {
            if (res.code == config.apiConfig.request_ok) {
              this.catList = res
              console.log(res)
            }
          })
        }
        this.showCat = true
      },
      //隐藏歌单分类
      cancel () {
        this.showCat = false
      },
      selectCat (cat) {
        //修改分类 重新渲染歌单数据
        this.listData.cat = cat
        //重置当前页
        this.listData.page = 0
        //重置歌单数据
        this.playList = []
        this.hasMore = false
        //隐藏歌单分类
        this.showCat = false
        //重新渲染数据
        this._getPlayList()

      },
      getIcon(key){
        if(key==0){
          return "icon-duoyuyan"
        }else if(key==1){
          return "icon-fengge"
        }else if(key==2){
          return "icon-jingdian"
        }else if(key==3){
          return "icon-biaoqing"
        }else if(key==4){
          return "icon-zhuti"
        }else{
          return "icon-zhuti"
        }

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

  .cat
    position absolute
    top 0
    left 0
    z-index 666
    width 100%
    height 100%
    background-color $color-background
    .top
      position fixed
      top 0
      left 0
      width 100%
      padding 15px 10px
      display flex
      color #c2c2c2
      .cancel
        width 40%
        text-align left
        color $color-theme
    .catlist
      position fixed
      top:46px
      bottom -80px
      width 100%
      color #fff
      z-index 210
      .all
        /*background-color #cc757a*/
        padding 10px
        div
          width 100%
          line-height: 40px
          border 1px solid $color-theme
          text-align center
      .catitem
        margin-top 10px
        /*background-color #cc757a*/
        padding 10px
        display flex
        flex-flow wrap row
        div
          width 22%
          line-height: 40px
          text-align center
          border 1px solid $color-theme
          margin-right 2%
          margin-bottom 2%
          height 42px
          overflow hidden
        .itemTitle
          color #ccc
          border 1px solid $color-background
          i
            font-size 22px
</style>
