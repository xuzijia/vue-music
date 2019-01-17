<template>
  <transition name="slide">
    <div class="my">
      <div style="height: 40px;background-color: #000">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">我的音乐</h1>
      </div>
      <scroll ref="scroll" class="playlist-content" :data="playlist">
        <div class="main">
          <div class="menu">
            <!--<div class="butItem">-->
              <!--<div class="icon">-->
                <!--<i class="iconfont icon-user"></i>-->
              <!--</div>-->
              <!--<div class="t">-->
                <!--本地音乐-->
              <!--</div>-->
              <!--<div class="count">-->
                <!--0 >-->
              <!--</div>-->
            <!--</div>-->
            <div class="butItem" @click="selectPlayHistory(1)">
              <div class="icon">
                <i class="iconfont icon-zhuti"></i>
              </div>
              <div class="t" >
                最近播放
              </div>
              <div class="count">
                {{playHistory.length}} >
              </div>
            </div>
            <div class="butItem" @click="selectPlayHistory(0)">
              <div class="icon">
                <i class="iconfont icon-shoucang"></i>
              </div>
              <div class="t">
                我的收藏
              </div>
              <div class="count">
                {{favoriteList.length}} >
              </div>
            </div>
            <div class="butItem">
              <div class="icon">
                <i class="iconfont icon-biaoqing"></i>
              </div>
              <div class="t" style="border-bottom: none">
                我的云盘
              </div>
              <div class="count" style="border-bottom: none">
                0 >
              </div>
            </div>
          </div>
          <div v-if="login">
            <div class="create" v-show="myList.length">
              <h1 class="t">我创建的歌单({{myList.length}})</h1>
              <ul>
                <li v-for="(item,index) of myList" :key="index" @click="selectItem(item)">
                  <div class="img">
                    <img v-lazy="item.coverImgUrl+imgSize">
                  </div>
                  <div class="info">
                    <h1 class="name">{{item.name}}</h1>
                    <p class="count">{{item.trackCount}}首</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mylist" v-show="collectList.length">
              <h1 class="t">我收藏歌单({{collectList.length}})</h1>
              <ul>
                <li v-for="(item,index) of collectList" :key="index" @click="selectItem(item)">
                  <div class="img">
                    <img v-lazy="item.coverImgUrl+imgSize">
                  </div>
                  <div class="info">
                    <h1 class="name">{{item.name}}</h1>
                    <p class="count">{{item.trackCount}}首，by {{item.creator.nickname}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="!login" class="nologin">
            <i class="iconfont icon-login"></i> <span @click="selectLogin">点击登录</span>可以看到个人歌单信息
          </div>
        </div>
      </scroll>

      <div class="loading-container" v-show="!playlist.length && login">
        <loading title="正在加载歌单列表"></loading>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {setCookie, readCookie, deleteCookie,getLoginStatus} from 'base/utils/musicUtils'
  import {getMyPlayList} from 'api/my'
  import {config} from 'api/config'
  import {mapMutations,mapGetters} from 'vuex'
  import {playHistory} from '../../store/getters'

  export default {
    data () {
      return {
        imgSize: '?param=100y100',
        //我创建的歌单
        myList: [],
        //我收藏的歌单
        collectList: [],
        playlist: [],
        login:getLoginStatus(),
      }
    },
    created () {
      this._getMyPlayList()
    },
    methods: {
      back () {
        this.$router.back()
      },
      //获取用户歌单信息
      _getMyPlayList () {
        //获取用户cookie
        if (this.login) {
          getMyPlayList(readCookie('userid')).then((res) => {
            if (res.code == config.apiConfig.request_ok) {
              //过滤出我的歌单和收藏的歌单
              if (res.playlist.length > 0) {
                this.filterList(res.playlist, readCookie('userid'))
                this.playlist = res.playlist
              }
            }
          })
        }
      },
      selectPlayHistory(flag){
        this.$router.push("/playHistory/"+flag)
      },
      //跳转到歌单详情
      selectItem (item) {
        this.$router.push({
          path: `/my/${item.id}`
        })
        this.setDisc(item)
      },
      //跳转到登录页面
      selectLogin(){
        this.setLoginStatus(true);
        this.$destroy();
      },
      filterList (playlist, userid) {
        playlist.forEach((item) => {
          if (item.userId == userid) {
            //我创建的歌单
            this.myList.push(item)
          } else {
            //我收藏的歌单
            this.collectList.push(item)
          }
        })
      },
      ...mapMutations({
        setDisc: 'SET_DISC',
        setLoginStatus:'SET_LOGIN_STATUS'
      })
    },
    components: {
      Loading,
      Scroll
    },
    computed:{
      ...mapGetters([
        'playHistory',
        'favoriteList'
      ])
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .my
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 50px
      font-size: $font-size-large
      color: $color-theme
    .playlist-content
      height: 100%
      overflow: hidden
      .main
        position: relative
        width: 100%
        overflow: hidden
        .nologin
          text-align center
          color $color-dialog-background
          margin-top 15px
          span
            color #d93f30
            text-decoration underline
        .butItem
          display flex
          padding 0px 30px
          line-height 45px
          .icon
            width 15%
            text-align left
            padding-top 3px
            i
              font-size $font-size-large-x
              color $color-theme
          .t
            font-size $font-size-large
            width 70%
            border-bottom 1px dotted $color-dialog-background
          .count
            width 15%
            color $color-dialog-background
            font-size $font-size-large
            border-bottom 1px dotted $color-dialog-background
            text-align right

        .create
          margin-top 10px
          .t
            color $color-theme
            padding 10px 20px
            background-color $color-background-d
        .mylist
          margin-top 10px
          .t
            color $color-theme
            padding 10px 20px
            background-color $color-background-d
      ul
        margin-top 20px
        padding 0px 10px
        li
          display flex
          padding-bottom 10px
          .img
            width 20%
            position relative
            img
              width 50px
              height 50px
              border-radius 5px
          .info
            width 80%
            margin-left 1%
            border-bottom 1px dotted $color-dialog-background
            .name
              font-size: $font-size-medium
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
            .count
              font-size $font-size-small
              color $color-text-l
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              padding 10px 0px

  .loading-container
    position absolute
    top 50%
    left 40%
</style>
