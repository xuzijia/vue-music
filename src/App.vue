<template>
  <div id="app">
    <login></login>
    <m-header></m-header>
    <top-tab></top-tab>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import TopTab from 'components/tab/tab'
  import Player from 'components/player/player'
  import Login from 'components/login/login'
  import {readCookie} from 'base/utils/musicUtils'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'App',
    methods:{
      ...mapMutations({
        setLoginStatus:'SET_LOGIN_STATUS'
      })
    },
    computed:{
      ...mapGetters([
        'loginStatus'
      ])

    },
    components: {
      MHeader,
      TopTab,
      Player,
      Login
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  /*全局样式*/
  .video-js
    .vjs-big-play-button
      top:  45%
      left: 45%
      width: 3rem
      height: 3rem
      border-radius: 3rem
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

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
</style>
