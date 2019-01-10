<template>
  <transition name="slide">
    <div class="search">
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @query="onQueryChange"></search-box>
      </div>
      <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
        <scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
          <div>
            <div class="hot-key" v-show="hotKey.length">
              <h1 class="title">热门搜索</h1>
              <ul>
                <li @click="addQuery(item.first)" class="item" v-for="item in hotKey">
                  <span>{{item.first}}</span>
                </li>
              </ul>
            </div>
            <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
              </h1>
              <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
            </div>
          </div>
        </scroll>
      </div>
      <div class="tab" v-show="query">
        <div tag="div" class="tab-item">
          <span class="tab-link" :class="{'tab-link-active':type==1}" @click="search(1)">单曲</span>
        </div>
        <div tag="div" class="tab-item">
          <span class="tab-link" :class="{'tab-link-active':type==100}" @click="search(100)">歌手</span>
        </div>
        <div tag="div" class="tab-item">
          <span class="tab-link" :class="{'tab-link-active':type==1000}" @click="search(1000)" >歌单
          </span>
        </div>
        <!--<div tag="div" class="tab-item">-->
          <!--<span class="tab-link" :class="{'tab-link-active':type==1004}" @click="search(1014)">视频</span>-->
        <!--</div>-->
      </div>

      <div class="search-result" v-show="query" ref="searchResult">
        <suggest @listScroll="blurInput" @select="saveSearch" ref="suggest" :query="query" :type="type"></suggest>
      </div>
      <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import SearchBox from 'base/search-box/search-box'
  import SearchList from 'base/search-list/search-list'
  import Scroll from 'base/scroll/scroll'
  import Confirm from 'base/confirm/confirm'
  import Suggest from 'components/suggest/suggest'
  import {getSearchHot} from 'api/search'
  import {config} from 'api/config'
  import {playlistMixin, searchMixin} from 'common/js/mixin'
  import {mapActions} from 'vuex'

  export default {
    mixins: [playlistMixin, searchMixin],
    data () {
      return {
        hotKey: [],
        type:1,
        singer:[]
      }
    },
    computed: {
      shortcut () {
        return this.hotKey.concat(this.searchHistory)
      }
    },
    created () {
      this._getSearchHot()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()

        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
      },
      search(type){
        this.type=type;
        //重新触发查询
        this.$refs.suggest.setType(type);
        this.$refs.suggest.search();
      },
      showConfirm () {
        this.$refs.confirm.show()
      },
      _getSearchHot () {
        getSearchHot().then((res) => {
          if (res.code === config.apiConfig.request_ok) {
            this.hotKey = res.result.hots
          }
        })
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    watch: {
      query (newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      SearchBox,
      SearchList,
      Scroll,
      Confirm,
      Suggest
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 205px
      bottom: 0
    .tab
      display: flex
      height: 44px
      /*line-height: 44px*/
      font-size: $font-size-medium
      .tab-item
        flex: 1
        text-align: center
        .tab-link
          padding-bottom: 5px
          color: $color-text-l
        .tab-link-active
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
