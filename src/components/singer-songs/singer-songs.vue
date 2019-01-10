<template>
  <transition name="slide">
    <div class="music-list">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title">{{artist.name}}</h1>
      <div class="bg-image" :style="bgStyle">
        <div class="play-wrapper">
          <!--<div ref="playBtn" class="play" v-show="artist.picUrl">-->
          <!--<i class="icon-play"></i>-->
          <!--<span class="text">随机播放全部</span>-->
          <!--</div>-->
        </div>
        <div class="filter"></div>
      </div>

      <!--歌手歌曲 专辑 视频列表-->
      <div class="tab">
        <router-link tag="div" class="tab-item" to="/songs">
          <span class="tab-link">热门单曲</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/album">
          <span class="tab-link">专辑</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/mv">
      <span class="tab-link">视频
      </span>
        </router-link>
        <!--<router-link tag="div" class="tab-item" to="/search">-->
        <!--<span class="tab-link">详情</span>-->
        <!--</router-link>-->
      </div>

      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </transition>
</template>

<script>
  import back from 'base/back/back'

  export default {
    name: 'singer-songs',
    props: {
      artist: {
        type: Object,
        default: {}
      },
      songs: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        backUrl: '/singer'
      }
    },
    methods:{
      back() {
        this.$router.push(
          {
            path:"/singer"
          }
        )
      },
    },
    computed: {
      bgStyle () {
        return `background-image:url('${this.artist.picUrl}?param=450y300')`
      },
    },
    components: {
      back
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme

  .music-list
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
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 60%
      transform-origin: top
      background-size: 100% 100%
      background-repeat no-repeat
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
