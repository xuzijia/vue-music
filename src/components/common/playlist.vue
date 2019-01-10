<template>
  <ul>
    <li v-for="(item,index) of playList" :key="index" @click="selectItem(item)">
      <div class="img">
        <img v-lazy="item.coverImgUrl+imgSize" alt="">
        <div class="bgzz">
        </div>
        <div class="zz">
          <i class="iconfont icon-icon-test"></i> {{formatNumber(item.playCount)}}
        </div>
      </div>
      <div class="info">
        <h1 class="name">{{item.name}}</h1>
        <p class="user">by: {{item.creator.nickname}}</p>
        <p class="disc">
          <span v-if="item.tags">{{item.tags[0]}}</span>
          {{item.description==null?"暂无简介":item.description}}
        </p>
      </div>
    </li>
    <loading v-show="hasMore" title=''></loading>
  </ul>
</template>

<script>
  import {numberFormat} from 'base/utils/musicUtils'
  import Loading from 'base/loading/loading'
  export default {
    data () {
      return {
        imgSize: '?param=200y200'
      }
    },
    props: {
      playList: {
        type: Array,
      },
      hasMore:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      selectItem (item) {
        this.$emit('selectItem', item)
      },
      formatNumber(number){
        return numberFormat(number);
      },
    },
    components:{
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  ul
    margin-top 10px
    padding 0px 10px
    li
      display flex
      padding-bottom 10px
      .img
        width 33%
        position relative
        img
          width 100px
          height 100px
          border-radius 5px
        .zz
          position absolute
          top 5px
          left  5px
          text-align center
          font-size $font-size-small
        .bgzz
          position absolute
          top:0
          left 0
          width 100px
          height 100px
          background-color rgba(0, 0, 0, 0.25)
      .info
        width 66%
        margin-left 1%
        border-bottom 1px dotted $color-dialog-background
        .name
          font-size: $font-size-medium
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .user
          font-size $font-size-small
          color $color-text-l
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          padding 15px 0px
        .disc
          span
            border 1px solid $color-theme
            color $color-theme
            padding 0px 1px
          font-size $font-size-small
          color $color-text-l
          line-height 20px
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;

</style>
