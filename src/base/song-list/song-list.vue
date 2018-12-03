<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
        <div class="sort">
          {{index+1}}
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}
            <span class="alias" v-if="song.alias.length>0">
                &nbsp;({{song.alias[0]}})
              </span>
          </h2>


          <p class="desc">{{getDesc(song)}}</p>
        </div>
        <div class="song-cz" v-if="song.mv!=0 && song.mv" @click.stop="playMv(song.mv)">
          <i class="icon iconfont icon-video"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      getDesc(song) {
        return `${song.singer}`
      },
      getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      },
      //播放mv
      playMv(id){
        this.$router.push({
          path:`/mv/player/${id}`
        })
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      border-bottom:1px solid rgba(204, 204, 204, 0.1)
      .sort
        flex: 0 0 25px
        width: 25px
        margin-right: 15px
        text-align: center
        color:$color-theme
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        width 70%
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
          .alias
            color: $color-text-l
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
      .song-cz
        width 20%
        text-align center;
        color: $color-text-l
        line-height 46px
        i
          font-size 22px
</style>
