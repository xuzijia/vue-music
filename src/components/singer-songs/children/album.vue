<template>
  <div class="album-list" ref="albumList">
    <!--遍历歌手专辑列表-->
    <scroll ref="scroll" class="albums-content" :data="albums">
      <ul>
        <li v-for="(item,index) of albums" :key="index"  @click="selectItemByAlbum(item)">
          <div class="albumImg">
            <img v-lazy="item.picUrl+imgSize" alt="" width="80" height="80">
          </div>
          <div class="detail">
            <p class="name">{{item.name}}</p>
            <p class="time">
              <span>{{timeFormat(item.publishTime)}}</span>
            </p>
          </div>
          <div class="icon">
            >
          </div>

        </li>
      </ul>

      <div class="loading-container" v-show="!albums.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {formatTime} from 'base/utils/musicUtils'
  import {mapGetters,mapMutations} from 'vuex'
  import {getSingerAlbum} from 'api/singer'
  import {config} from 'api/config'
  import {playlistMixin} from 'common/js/mixin'
  export default {
    name: 'album',
    mixins: [playlistMixin],
    data(){
      return {
        albums:[],
        imgSize:"?param=80y80"
      }
    },
    created(){
      if(this.singer.id===undefined){
        this.$router.push("/singer");
        return;
      }
      this._getSingerAlbum(this.singer.id);
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.albumList.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getSingerAlbum (id) {
        //获取歌手专辑
        getSingerAlbum(id).then((res) => {
          if (res.code == config.apiConfig.request_ok) {
            this.albums=res.hotAlbums;
            console.log(res);
          }
        })
      },
      timeFormat(time){
        return formatTime(time,"date","-");
      },
      selectItemByAlbum(item){
        this.setAlbum(item)
        this.$router.push({
          path: `/album/detail/${item.id}`
        })
      },

      ...mapMutations({
        setAlbum:'SET_ALBUM'
      })
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

  .album-list
    position: fixed
    top: 275px
    bottom: 0
    width: 100%
    .albums-content
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      ul
        padding:15px 20px
        li
          display: flex
          align-items center
          margin-bottom 5px
          border-bottom:1px solid rgba(204, 204, 204, 0.1)
          .albumImg
            width: 80px
            img
              border-radius 5px
          .detail
            width: 60%
            padding-left 20px
            .time
              font-size $font-size-medium
              color: $color-text-l
              padding-top 10px
            .name
              overflow: hidden
              text-overflow:ellipsis
              white-space: nowrap
          .icon
            width: 10%
            text-align right
            color: $color-text-l
</style>

