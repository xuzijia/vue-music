<template>
  <transition name="slide">
    <div class="playlist">
      <back :url="backUrl"></back>
      <h1 class="title">华语 热门歌单</h1>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'

  export default {
    data(){
      return {
        backUrl:'/recommend'
      }
    },
    components:{
      back
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
</style>
