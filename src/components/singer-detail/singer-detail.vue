<template>
  <transition name="slide">
    <singer-songs :artist="artist" :songs="songs"></singer-songs>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getHotSong,getSingerAlbum,getSingerMv} from 'api/singer'
  import {config} from 'api/config'
  import SingerSongs from 'components/singer-songs/singer-songs'
  export default {
    name: 'singer-detail',
    data(){
      return {
        artist:{},
        songs:[]

      }
    },
    computed:{
      ...mapGetters([
        'singer'
      ])
    },
    components:{
      SingerSongs,
    },
    created(){
      if(this.singer.id===undefined){
        this.$router.push("/singer");
        return;
      }
      this._getHotSong(this.singer.id);
      // this._getSingerAlbum(this.singer.id);
      // this._getSingerMv(this.singer.id);
    },
    methods:{
      _getHotSong(id){
        //获取歌手热门单曲
        getHotSong(id).then((res)=>{
          if(res.code==config.apiConfig.request_ok){
            this.artist=res.artist;
            this.songs=res.hotSongs;
          }
        })
      },
      _getSingerAlbum(id){
        //获取歌手专辑
        getSingerAlbum(id).then((res)=>{
          if(res.code==config.apiConfig.request_ok){
            console.log(res);
          }
        })
      },
      _getSingerMv(id){
        //获取歌手mv
        getSingerMv(id).then((res)=>{
          if(res.code==config.apiConfig.request_ok){
            console.log(res);
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"


</style>
