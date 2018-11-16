<template>
  <div class="recommend" ref="recommend" >
    <scroll ref="scroll" class="recommend-content" :data="playlists">
      <div>
        <div v-if="banners.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in banners">
              <a :href="item.url">
                <img class="needsclick" @load="loadImage" :src="item.imageUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="but" v-show="banners.length">
          <!--功能菜单版面设计-->
          <div class="fm">
            <div class="icon">
              <i class="iconfont icon-diantaizhibo"></i>
            </div>
            <span class="text">私人FM</span>
          </div>
          <div>
            <div class="icon">
              <i class="iconfont icon-rili1"></i>
            </div>
            <span class="text">每日推荐</span>
          </div>
          <div>
            <div class="icon">
              <i class="iconfont icon-icon-test"></i>
            </div>
            <span class="text">歌单</span>
          </div>
          <div>
            <div class="icon">
              <i class="iconfont icon-paihangbang"></i>
            </div>
            <span class="text">排行榜</span>
          </div>
        </div>

        <div class="recommend-list hr "  v-show="playlists.length">
            <router-link to="/">
              <h1 class="list-title"> 热门歌单推荐 &gt;</h1>
            </router-link>
          <!--热门歌单版面设计-->
          <div class="playlist">
            <div class="item" v-for="(item,index) of playlists" :key="index">
                <div class="img">
                  <img v-lazy="item.coverImgUrl+imgSize" width="100" height="100" >
                </div>
                <span class="item-name">{{item.name}}</span>
            </div>
          </div>
        </div>


        <!--新碟上架-->
        <div class="recommend-list hr" v-show="newlists.length">
          <router-link to="/singer">
            <h1 class="list-title"> 新碟上架 &gt;</h1>
          </router-link>
          <!--新碟上架版面设计-->
          <div class="new-album-list">
              <div class="item" v-for="(item,index) of newlists" :key="index">
                <div class="img">
                  <img v-lazy="item.picUrl+imgSize" width="100" height="100" >
                </div>
                <div class="album-name">{{item.name}}</div>
                <div class="album-singer">{{item.artist.name}}</div>
              </div>
          </div>

        </div>

      </div>
      <div class="loading-container" v-show="!playlists.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {getBanner, getPlayList,getDjRecommend,getNewAlbumList} from 'api/recommend'
  import {config} from 'api/config'

  export default {
    data () {
      return {
        banners: [],
        playlists: [],
        djlists:[],
        newlists:[],
        imgSize:"?param=350y350"
      }
    },
    created () {
      //获取banner
      this._getBanners()
      //获取推荐的歌单
      this._getPlayList()
      //获取新碟专辑
      this._getNewAlbumList()
    },
    methods: {
      loadImage () {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      _getBanners () {
        getBanner().then((res) => {
          if (res.code === config.apiConfig.request_ok) {
            this.banners = res.banners
          }
        })
      },
      _getPlayList () {
        getPlayList().then((res) => {
          if (res.code === config.apiConfig.request_ok) {
            this.playlists = res.playlists
          }

        })
      },
      _getDjList(){
        getDjRecommend().then((res) => {
          if(res.code=== config.apiConfig.request_ok){
            this.djlists=res.result;
          }
        })
      },
      _getNewAlbumList(){
        getNewAlbumList().then((res) => {
          if(res.code===config.apiConfig.request_ok){
            this.newlists=res.albums;
          }
        })
      }
    },
    components: {
      Slider,
      Loading,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .hr
    border-bottom 1px solid rgba(204, 204, 204, 0.15);
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium-x
          color: $color-theme
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
  .but
    display flex
    text-align center
    border-bottom 1px solid rgba(204, 204, 204, 0.21);
    margin-top 5px
    div
      flex 1
      margin 10px
      height width
      i
        color $color-theme
        font-size 34px;
      span
        color $color-text
        font-size 14px

  .playlist,.new-album-list
    display: flex
    text-align center;
    flex-flow row wrap
    justify-content center

    .item
      padding 5px 10px;
      width 25%
      img{
        border-radius 5px
      }
    .item-name,.album-name
      font-size 12px
      overflow hidden
      text-overflow ellipsis
      line-height 16px
    .album-singer
      color rgba(204, 204, 204, 0.7)
      font-size 10px
      line-height 16px
      padding-top 5px

</style>
