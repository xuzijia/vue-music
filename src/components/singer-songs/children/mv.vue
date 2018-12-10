<template>
  <div class="mv-list" ref="mvList">
    <!--遍历歌手mv列表-->
    <scroll ref="scroll" class="mvs-content" :data="mvs"
            :pullup="pullup"
            :beforeScroll="beforeScroll"
            @scrollToEnd="loadMore"
    >
      <ul>
        <li v-for="(item,index) of mvs" :key="index" @click="playMv(item.id)">
          <div class="img">
            <img :src="item.imgurl+imgSize" alt="">
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
        <loading v-show="hasMore" title=""></loading>
      </ul>
      <div class="loading-container" v-show="!mvs.length"   v-if="load">
        <loading></loading>
      </div>
      <div v-show="!mvs.length && !load" class="no-result-wrapper">
        <no-result title="抱歉，暂无视频"></no-result>
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
  import NoResult from 'base/no-result/no-result'
  export default {
    name: 'mv',
    mixins: [playlistMixin],
    data(){
      return {
        mvs:[],
        imgSize:"?param=120y70",
        load:true,
        hasMore:false,
        pullup: true,
        beforeScroll: true,
        page:0,
        num:20
      }
    },
    created(){
      if(this.singer.id===undefined){
        this.$router.push("/singer");
        return;
      }
      this._getSingerMv(this.singer.id);
      console.log(this.mvs)
    },
    methods:{
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.mvList.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getSingerMv(id,flag){
          getSingerMv(id,this.page*this.num,this.num).then(res=>{
            if(res.code==config.apiConfig.request_ok){
              if(flag){
                this.mvs=this.mvs.concat(res.mvs);
              }else{
                this.mvs=res.mvs;
              }
              if(res.mvs.length==0){
                this.load=false;
              }
              this.hasMore=res.hasMore;
              console.log(res);
            }
          })
      },
      formatNumber(number){
        return numberFormat(number);
      },
      loadMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        this._getSingerMv(this.singer.id,true);
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
      Loading,
      NoResult
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
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)




</style>


