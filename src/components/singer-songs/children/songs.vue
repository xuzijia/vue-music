<template>
  <div class="song-list" ref="songs">
    <!--遍历歌手歌曲列表-->
    <scroll ref="scroll" class="songs-content" :data="songs" @scroll="scroll"  >
      <ul>
        <li v-for="(item,index) of songs" :key="index" @click="playSong(item,index)">
          <div class="sort">
            {{index+1}}
          </div>
          <div class="song-name">
            <p class="music-name"><span style="color: white">{{item.name}}</span>
              <span class="alias" v-if="item.alias.length>0">
                ({{item.alias[0]}})
              </span>
            </p>
            <p class="album-name">{{item.album}}</p>
          </div>
          <div class="song-cz" v-if="item.mv!=0 && item.mv" @click.stop="playMv(item.mv)">
            <i class="icon iconfont icon-video"></i>
          </div>
        </li>
        <li style="height: 60px;border: none"></li>
      </ul>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {mapGetters,mapActions} from 'vuex'
  import {getHotSong} from 'api/singer'
  import {config} from 'api/config'
  import {playlistMixin} from 'common/js/mixin'
  import {createSongBySinger} from 'common/js/song'
  export default {
    name: 'songs',
    mixins: [playlistMixin],
    data(){
      return {
        songs:[],
        scrollY: 0
      }
    },
    computed:{
      ...mapGetters([
        'singer',
      ])
    },
    created(){
      if(this.singer.id===undefined){
        this.$router.push("/singer");
        return;
      }
      this._getHotSong(this.singer.id);
    },
    methods:{
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.songs.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getHotSong(id){
        //获取歌手热门单曲
        getHotSong(id).then((res)=>{
          if(res.code==config.apiConfig.request_ok){
            this.songs = this._normalizeSongs(res.hotSongs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id) {
            ret.push(createSongBySinger(musicData))
          }
        })
        return ret
      },
      playSong(song,index){
        //播放歌曲
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random() {
        this.randomPlay({
          list: this.songs
        })
      },
      //播放mv
      playMv(id){
        this.$router.push({
          path:`/mv/player/${id}`
        })
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        const top = playlist.length > 0 ? '1px' : ''
        this.$refs.scroll.$el.style.bottom = bottom
        this.$refs.scroll.$el.style.top = top
        this.$refs.scroll.refresh()
      },

      scroll(pos) {
        this.scrollY = pos.y
      },

      ...mapActions([
        'selectPlay',
        'randomPlay'
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

  .song-list
    position: fixed
    top: 275px
    bottom: 0
    width: 100%
    .songs-content
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
    ul
      padding:15px 20px
      li
        display: flex
        padding:5px 0px
        border-bottom:1px solid rgba(204, 204, 204, 0.1)
        align-items center

        .sort
          flex: 0 0 25px
          width: 25px
          margin-right: 15px
          text-align: center
          color $color-theme
        .song-name
            width 70%
            line-height 23px
            .music-name
              color: $color-text-l
              font-size $font-size-medium-x
              overflow: hidden
              text-overflow:ellipsis
              white-space: nowrap
              .alias
                color: $color-text-l
            .album-name
              font-size $font-size-small
              color: $color-text-d
        .song-cz
          width 20%
          text-align center;
          color: $color-text-l
          line-height 46px
          i
            font-size 22px
</style>
