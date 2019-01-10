<template>
  <transition name="slide">
    <div class="my">
      <div style="height: 40px;background-color: #000">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{user.nickname}}</h1>
      </div>
      <div class="bg" :style="bgStyle">
      </div>

      <scroll ref="scroll" class="playlist-content" :data="playlist">
        <div class="main">
          <div>
            <div class="create" v-show="myList.length">
              <h1 class="t">歌单({{myList.length}})</h1>
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
              <h1 class="t">收藏的歌单({{collectList.length}})</h1>
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
        </div>
      </scroll>

      <div class="loading-container" v-show="!playlist.length">
        <loading title="正在加载歌单列表"></loading>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {getMyPlayList,getUserDetail} from 'api/my'
  import {config} from 'api/config'
  import {mapMutations,mapGetters} from 'vuex'
  import {playHistory} from '../../store/getters'

  export default {
    data () {
      return {
        imgSize: '?param=100y100',
        //创建的歌单
        myList: [],
        //收藏的歌单
        collectList: [],
        playlist: [],
        userid:'',
        user:{}
      }
    },
    created () {
      this.user.nickname="正在加载中..."
      this.userid=this.$route.params.userid;
      //获取用户信息
      if(this.userid=="" || this.userid==undefined){
        this.$router.push("/");
      }
      this._getUserDetail(this.userid)
      this._getMyPlayList(this.userid)
    },
    methods: {
      back () {
        this.$router.back()
        this.$destroy();
      },
      //获取用户歌单信息
      _getMyPlayList (userid) {
          getMyPlayList(userid).then((res) => {
            if (res.code == config.apiConfig.request_ok) {
              //过滤出我的歌单和收藏的歌单
              if (res.playlist.length > 0) {
                this.filterList(res.playlist, userid)
                this.playlist = res.playlist
                this.user=res.playlist[0].creator;
              }
            }
          })
      },
      _getUserDetail(userid){
        getUserDetail(userid).then((res)=>{
          if (res.code == config.apiConfig.request_ok) {
            this.user=res.profile;
          }
        })
      },
      selectPlayHistory(flag){
        this.$router.push("/playHistory/"+flag)
      },
      //跳转到歌单详情
      selectItem (item) {
        this.$router.push({
          path: `/userDetail/${this.userid}/${item.id}`
        })
        this.setDisc(item)
      },
      filterList (playlist, userid) {
        playlist.forEach((item) => {
          if (item.userId == userid) {
            //创建的歌单
            this.myList.push(item)
          } else {
            //收藏的歌单
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
      bgStyle() {
        if(this.user){
          return `background-image:url(${this.user.avatarUrl})`
        }
      },
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
      line-height: 40px
      font-size: $font-size-large
      color: $color-theme
    .bg
      height 100%
      filter: blur(30px);
      background-position center center
    .main
      position: fixed
      width: 100%
      top: 45px
      bottom: 0
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
