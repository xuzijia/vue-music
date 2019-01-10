<template>
  <ul>
    <li v-for="(item,index) of mvs" :key="index" @click="playMv(item.id)">
      <div class="img">
        <img :src="item.imgurl+imgSize" alt="">
        <div class="bgzz">
        </div>
        <div class="zz">
          <i class="iconfont icon-icon-test"></i> {{formatNumber(item.playCount)}}
        </div>
        <!--<div class="playTime">-->
        <!--05:10-->
        <!--</div>-->
      </div>
      <div class="title">
        <p class="name">{{item.name}}</p>
        <p class="time">{{item.publishTime}}</p>
      </div>
    </li>
    <loading v-show="hasMore" title=""></loading>
  </ul>
</template>

<script>
  import {numberFormat} from 'base/utils/musicUtils'
  import Loading from 'base/loading/loading'
  export default {
    data () {
      return {
        imgSize: '?param=120y70'
      }
    },
    methods: {
      playMv (id) {
        this.$emit('playMv', id)
      },
      formatNumber(number){
        return numberFormat(number);
      },
    },
    props: {
      mvs: {
        type: Array
      },
      hasMore:{
        type:Boolean,
        default:false
      }
    },
    components:{
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  li
    display flex
    margin-bottom 10px
    align-items center
    margin-left 10px
    border-bottom: 1px solid rgba(204, 204, 204, 0.1)
    .img
      width 140px
      height 70px
      position relative
      font-size $font-size-small
      img
        border-radius 5px
      .zz
        position absolute
        top 5px
        left 5px
        text-align center
        color $color-text-ll
      .bgzz
        position absolute
        top: 0
        left 0
        width 100%
        height 100%
        background-color rgba(0, 0, 0, 0.25)

      .playTime
        position absolute
        bottom 5px
        left 5px
        text-align center
        color $color-text-l
    .title
      width 75%
      padding-left 15px
      .time
        font-size $font-size-medium
        color: $color-text-l
        padding-top 10px
      .name
        width 75%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap


</style>

