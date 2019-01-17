<template>
  <transition name="slide">
    <scroll ref="scroll" class="songs-content">
      <div class="mv-play">
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>

          <!--mv-->
          <video-player class="video-player-box"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true"
                        customEventName="customstatechangedeventname">
          </video-player>

          <!--mv详细信息-->
          <div class="detail">
            <h1 class="title">{{mvData.name}}
            </h1>

            <p class="singer">
              <i class="icon iconfont icon-user " style="font-size: 20px"></i>&nbsp;&nbsp;{{mvData.artistName}}
            </p>
            <p class="ptime">
              <span class="t">发布：{{mvData.publishTime}}</span>
              <span>播放: {{formatNumber(mvData.playCount)}}</span>
            </p>

            <!--mv数据-->
            <div class="mvdata" v-show="mvData.likeCount">
              <div class="item">
                <i class="icon iconfont icon-dianzan"></i>
                <p>{{mvData.likeCount}}</p>
              </div>
              <div class="item">
                <i class="icon iconfont icon-shoucang"></i>
                <p>{{mvData.subCount}}</p>
              </div>
              <div class="item">
                <i class="icon iconfont icon-pinglun"></i>
                <p>{{mvData.commentCount}}</p>
              </div>
              <a class="item" style="color: #0086b3" :href="currMvUrl" download="1.mp4">
                <i class="icon iconfont icon-xiazai"></i>
                <p>立即下载</p>
              </a>
            </div>


            <p class="desc" v-show="mvData.desc">
              {{mvData.desc}}
            </p>
          </div>
          <div class="loading-container" v-show="!mvData.cover">
            <loading></loading>
          </div>
          <!--推荐mv-->
          <!--<div class="recommend">-->
          <!--<div class="title">-->
          <!--相关推荐-->
          <!--</div>-->
          <!--</div>-->

        </div>

      </div>
    </scroll>
  </transition>
</template>

<script>
  import {getMvInfo} from 'api/song'
  import {config} from 'api/config'
  import {numberFormatForOne} from 'base/utils/musicUtils'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  // require styles
  import 'video.js/dist/video-js.css'

  import {videoPlayer} from 'vue-video-player'

  export default {
    data () {
      return {
        show: true,
        mvid: 0,
        mvData: {},
        currMvUrl: '',
        playerOptions: {
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: 'video/mp4',
            src: ''
          }],
          poster: '', //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '视频正在加载中...', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: true,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    components: {
      videoPlayer,
      Loading,
      Scroll
    },
    created () {
      if (!this.$route.params.id) {
        this.back()
        return
      }
      //如果正在播放音乐 则暂停音乐播放
      // if(this.playing){
      //   this.setPlayingState(!this.playing)
      // }

      this.mvid = this.$route.params.id
      //获取mv信息
      this._getMvInfo()
    },
    methods: {
      back () {
        this.$destroy()
        this.$router.back()
      },
      _getMvInfo () {
        if (this.mvid != 0) {
          getMvInfo(this.mvid).then(res => {
            console.log(res)
            if (res.code == config.apiConfig.request_ok) {
              this.mvData = res.data
              this.getMvUrl()
              this.playerOptions = Object.assign({}, this.playerOptions, {

                sources: [{
                  type: 'video/mp4',
                  src: this.currMvUrl
                }],
                poster: this.mvData.cover, //你的封面地址

              })
            }else{
              //找不到mv信息
              alert("找不到mv信息！");
              this.$router.back();
            }
          })
        }
      },

      formatNumber (num) {
        return numberFormatForOne(num)
      },
      getMvUrl () {
        //获取mv中的url 默认获取480p
        if (this.mvData.brs['480']) {
          this.currMvUrl = this.mvData.brs['480']
        } else {
          this.currMvUrl = this.mvData.brs['240']
        }
      },


    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .mv-play
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 160
    background: $color-background
    .top
      position: relative
      margin-bottom: 25px
      .back
        position absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 9px
          font-size: $font-size-large-x
          color: $color-theme
    .detail
      padding 15px 10px
      .title
        font-size $font-size-large-s
        line-height 30px
        color $color-text-ll
      .ptime, .singer
        padding 20px 0px
        color $color-text-d
        .t
          padding-right 30px
      .ptime
        padding 0px 0px
      .desc
        font-size $font-size-small
        line-height 18px
        margin-top 20px
        color $color-text-d
        padding 15px 10px
        border 1px dashed $color-text-d
        text-indent: 25px
      .mvdata
        display flex
        justify-content center
        margin-top 20px
        color $color-text-l
        .item
          width 25%
          text-align center
          i
            font-size 32px
          p
            margin-top 10px
    .recommend
      margin 0px 10px
      padding 10px 10px
      background-color rgba(254, 255, 225, 0.1)
</style>
