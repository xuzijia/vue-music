<template>
  <transition name="slide">
    <div class="login" v-show="loginStatus">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title">手机号登录</h1>
      <div class="form">
        <div class="input">
          <i class="iconfont icon-phone"></i>
          <input ref="query" style="outline:none;" v-model="account" class="box" placeholder="手机号"/>
          <i @click="clearPhone" v-show="account" class="icon-dismiss"></i>
        </div>
        <div class="input">
          <i class="iconfont icon-password"></i>
          <input type="password" ref="query" style="outline:none;" v-model="password" class="box" placeholder="密码"/>
        </div>
        <div class="but" @click="login">
          <i class="iconfont icon-login"></i> 登录
        </div>
        <div class="tip">
          <p><i class="iconfont icon-tiptxt"></i> 该登录接口为网易云官方登录接口,请使用网易云音乐账号进行登录。</p>
        </div>

        <div v-show="logging" class="loading-container">
          <loading title="" class="loading"></loading>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {login} from 'api/login'
  import {config} from 'api/config'
  import Loading from 'base/loading/loading'
  import {getDayRecommend} from 'api/recommend'
  import {setCookie,readCookie,deleteCookie} from 'base/utils/musicUtils'

  export default {
    name: 'login',
    data(){
      return{
        account:"",
        password:"",
        logging:false
      }
    },
    computed:{
      ...mapGetters([
        'loginStatus'
      ])
    },
    methods:{
      back(){
        //隐藏登录页
        this.account=""
        this.password=""
        this.logging=false
        this.setLoginStatus(false);
        this.$router.push("/")
      },
      clearPhone(){
        this.account="";
      },
      //登录
      login(){
        //重置用户登录状态 删掉登录cookie
        deleteCookie("MUSIC_U");
        deleteCookie("userid");
        if(this.account!="" && this.password!=""){
          this.logging=true;
          //todo 校验账号类型 正则校验该账号是手机号码还是邮箱
          login(this.account,this.password).then((res)=>{
            if(res.code==config.apiConfig.request_ok){
              //获取userid 保存到cookie
              if(res.account.id){
                setCookie("userid",res.account.id);
              }
              alert("登录成功！");
              this.back()
            }else if(res.code==config.apiConfig.login_error){
              alert("账号不存在！");
            }else if(res.code==config.apiConfig.password_error){
              alert("密码错误！");
            }else if(res.code==config.apiConfig.ip_error){
              alert("频繁登录,请稍后再试!")
            }else{
               alert("登录失败")
            }
            this.logging=false
          })
        }else{
          alert("请填写登录信息!");
        }

      },
      ...mapMutations({
        setLoginStatus:'SET_LOGIN_STATUS'
      })
    },
    components:{
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .login
    position:fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 999
    background-color $color-background
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color $color-theme
    .form
      margin-top 40px
      padding 10px 15px
      .input
        display: flex
        align-items: center
        box-sizing: border-box
        width: 100%
        padding: 0 6px
        height: 40px
        background: $color-highlight-background
        border-radius: 6px
        margin-top 10px
        i
          color $color-background
      .but
        box-sizing: border-box
        margin-top 10px
        line-height: 40px
        background-color $color-highlight-background
        border-radius: 6px
        text-align center
      .tip
        width 100%
        color $color-theme
        font-size $font-size-medium
        margin-top 20px
        line-height 20px
      .box
        flex: 1
        margin: 0 5px
        line-height: 18px
        background: $color-highlight-background
        color: $color-text
        font-size: $font-size-medium
        &::placeholder
          color: $color-text-d
      .icon-dismiss
        font-size: 16px
        color: $color-background


  .loading-container
    position absolute
    top 0px
    left 0px
    width 100%
    height 100%
    background-color $color-background-d
    .loading
      position absolute
      top: 40%

</style>
