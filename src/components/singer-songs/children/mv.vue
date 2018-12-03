<template>
  <div class="mv-list" ref="mvList">
    <!--遍历歌手mv列表-->
    <scroll ref="scroll" class="mvs-content" :data="mvs">
      <ul>
        <li v-for="(item,index) of mvs" :key="index" @click="playMv(item.id)">
          <div class="img">
            <img v-lazy="item.imgurl+imgSize" alt="">
            <div class="zz">
            {{formatNumber(item.playCount)}}
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
      </ul>
      <div class="loading-container" v-show="!mvs.length" v-if="flag">
        <loading></loading>
      </div>
      <div class="tip" v-else style="text-align: center; font-size: 14px;margin-top: 10px" >
        暂无mv信息...
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {numberFormat} from 'base/utils/musicUtils'
  import {mapGetters} from 'vuex'
  import {getSingerMv} from 'api/singer'
  import {config} from 'api/config'
  import {playlistMixin} from 'common/js/mixin'
  export default {
    name: 'mv',
    mixins: [playlistMixin],
    data(){
      return {
        mvs:[],
        imgSize:"?param=120y70",
        flag:true
      }
    },
    created(){
      if(this.singer.id===undefined){
        this.$router.push("/singer");
        return;
      }
      this._getSingerMv(this.singer.id);
    },
    methods:{
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.mvList.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getSingerMv(id){
          getSingerMv(id).then(res=>{
            if(res.code==config.apiConfig.request_ok){
              this.mvs=res.mvs;
              if(res.mvs.length==0){
                this.flag=false;
              }
              console.log(res);
            }
          })
      },
      formatNumber(number){
        return numberFormat(number);
      },
      playMv(id){
        this.$router.push({
          path:`/mv/player/${id}`
        })
      }
    },
    computed:{
      ...mapGetters([
        'singer'
      ])
    },
    components:{
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .mv-list
    position: fixed
    top: 275px
    bottom: 0
    width: 100%
    .mvs-content
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      li
        display flex
        margin-bottom 10px
        align-items center
        margin-left 10px
        border-bottom:1px solid rgba(204, 204, 204, 0.1)
        .img
          width 140px
          height 70px
          position relative
          font-size  $font-size-small
          img
            border-radius 5px
          .zz
            position absolute
            top 5px
            left  5px
            text-align center
            color $color-text-ll

          .playTime
            position absolute
            bottom 5px
            left  5px
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
            text-overflow:ellipsis
            white-space: nowrap






</style>


