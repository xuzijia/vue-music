<template>
  <div id="app">
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

  export default {
    name: 'App',
    components: {
      MHeader,
      TopTab,
      Player
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>
