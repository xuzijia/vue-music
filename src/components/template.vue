<template>
  <transition name="slide">
    <div class="playlist">
      <back :url="backUrl"></back>

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
