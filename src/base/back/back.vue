<template>
  <div class="back" @click="back">
    <i class="icon-back"></i>
  </div>
</template>

<script>
  export default {
    name: 'back',
    props:{
      url:{
        type:String,
        default:'/'
      }
    },
    methods:{
      back(){
        this.$router.push(this.url);
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .back
    position absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
</style>
