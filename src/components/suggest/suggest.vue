<template>
  <scroll ref="suggest"
          class="suggest"
          :data="getData"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
  >
    <div class="suggest-list">
      <!--<ul v-show="type==1">-->
        <!--<li @click="selectItem(item)" class="suggest-item" v-for="item in result">-->
          <!--<div class="icon">-->
            <!--<i :class="getIconCls(item)"></i>-->
          <!--</div>-->
          <!--<div class="name">-->
            <!--<p class="text" v-html="getDisplayName(item)"></p>-->
          <!--</div>-->
        <!--</li>-->
        <!--<loading v-show="hasMore" title=""></loading>-->
      <!--</ul>-->

      <div v-show="type==1" class="song-list">
        <song-list :songs="result" @select="selectItem"></song-list>
        <loading title="" v-show="hasMore"></loading>
      </div>

      <div v-show="type==100">
        <singer :singers="singers" @selectItem="select"></singer>
        <loading title="" v-show="hasMore"></loading>
      </div>
      <div v-show="type==1000" class="song-list">
        <play-list @selectItem="selectPlayList" :playList="playList"></play-list>
        <loading title="" v-show="hasMore"></loading>
      </div>
    </div>

    <div v-show="!hasMore">
      <div v-show="!result.length && type==1" class="no-result-wrapper">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
      <div v-show="!singers.length && type==100" class="no-result-wrapper">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
      <div v-show="!playList.length && type==1000" class="no-result-wrapper">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
  </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import {search} from 'api/search'
  import {config} from 'api/config'
  import {createSongBySinger} from 'common/js/song'
  import {mapMutations, mapActions} from 'vuex'
  import Singer from 'components/common/singer'
  import PlayList from 'components/common/playlist'
  import SongList from 'base/song-list/song-list'
  import VideoMv from 'components/common//video'

  const perpage = 20

  const SONG = 1 //单曲
  const SINGER = 100 //歌手
  const PLAYLIST = 1000 //歌单
  const VIDEO = 1014 //视频

  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      },
      type: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        page: 0,
        pullup: true,
        beforeScroll: true,
        hasMore: true,
        result: [],
        singers: [],
        playList: [],
        video: []
      }
    },
    computed: {
      getData () {
        console.log(this.type)
        if (this.type == SINGER) {
          return this.singers
        } else if (this.type == PLAYLIST) {
          return this.playList
        } else if (this.type == VIDEO) {
          return this.videos
        } else {
          return this.result
        }
        this.refresh()
      }

    },
    methods: {
      refresh () {
        this.$refs.suggest.refresh()
      },
      setType (type) {
        this.type = type
      },
      //点击歌手进入歌手页
      select (singer) {
        this.$emit('select', singer)
        //将歌手的信息设置到vuex
        this.setSinger(singer)
        //进入歌手详情页
        this.$router.push({
          path: `/singer/${singer.id}`
        })
      },
      selectPlayList (item) {
        this.$emit('select', item)
        this.$router.push({
          path: `/search/playlist/${item.id}`
        })
        this.setDisc(item)
      },
      search () {
        this.result = []
        this.singers = []
        this.playList = []
        //重置分页参数
        this.page = 0
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.type, this.page * perpage, perpage).then((res) => {
          if (res.code === config.apiConfig.request_ok) {
            //根据不同的搜索类型 解析数据
            if (this.type == SONG) {
              this.result = this._genResult(res.result)
              this._checkMore(res.result)
            } else if (this.type == SINGER) {
              console.log(res.result.artists)
              this.singers = res.result.artists == undefined ? [] : res.result.artists
              if (res.result.artists == undefined) {
                this.hasMore = false
              } else {
                this._checkMoreForSinger(res.result)
              }
            } else if (this.type == PLAYLIST) {
              this.playList = res.result.playlists
              this._checkMoreForPlayList(res.result)
              console.log(this.playList)
            }
          }
        })
      },
      //下拉加载更多
      searchMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.type, this.page * perpage, perpage).then((res) => {
          if (res.code === config.apiConfig.request_ok) {
            //根据不同的搜索类型 解析数据
            if (this.type == SONG) {
              this.result = this.result.concat(this._genResult(res.result))
              this._checkMore(res.result)
            } else if (this.type == SINGER) {
              this.singers = this.singers.concat(res.result.artists)
              this._checkMoreForSinger(res.artists)
            } else if (this.type == PLAYLIST) {
              this.playList = this.playList.concat(res.result.playlists)
              this._checkMoreForPlayList(res.result)
            }

          }
        })
      },
      listScroll () {
        this.$emit('listScroll')
      },
      selectItem (item) {
        this.insertSong(item)
        this.$emit('select', item)
      },
      playMv(id){
        this.$router.push({
          path:`/mv/player/${id}`
        })
      },
      getIconCls () {
        return 'icon-music'
      },
      _genResult (data) {
        let ret = []
        if (data.songs) {
          ret = ret.concat(this._normalizeSongs(data.songs))
        }
        return ret
      },
      //解析歌曲
      _normalizeSongs (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id && musicData.al.id) {
            ret.push(createSongBySinger(musicData))
          }
        })
        return ret
      },
      getDisplayName (item) {
        return `${item.name}-${item.singer}`
      },
      _checkMore (data) {
        if (data.songCount == 0 || !data.songs.length || (data.songs.length + this.page * perpage) >= data.songCount) {
          this.hasMore = false
        }
      },
      _checkMoreForSinger (data) {
        if (data.artistCount == 0 || !data.artists.length || (data.artists.length + this.page * perpage) >= data.artistCount) {
          this.hasMore = false
        }
      },
      _checkMoreForPlayList (data) {
        if (data.playlistCount == 0 || !data.playlists.length || (data.playlists.length + this.page * perpage) >= data.playlistCount) {
          this.hasMore = false
        }
      },
      ...mapActions([
        'insertSong'
      ]),
      ...mapMutations({
        setSinger: 'SET_SINGER',
        setDisc: 'SET_DISC'
      })
    },
    watch: {
      query (newQuery) {
        this.search(newQuery)
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult,
      Singer,
      PlayList,
      SongList,
      VideoMv
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      .song-list
        padding 0px 10px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
