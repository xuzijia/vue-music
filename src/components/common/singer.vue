<template>
  <div class="list">
    <div class="item" v-for="item of singers" :key="item.id" @click="select(item)">
      <div class="headImg">
        <img v-lazy="item.picUrl+headImgSize" alt="">
      </div>
      <div class="name">
        {{item.name}}<span class="alias" v-if="item.alias.length>0">（&nbsp;{{item.alias[0]}}&nbsp;）</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        headImgSize: '?param=60y60'
      }
    },
    props: {
      singers: {
        type: Array,
      }
    },
    methods: {
      select (item) {
        this.$emit('selectItem', item)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .list
    padding: 10px
    padding-left 20px
    .item
      display flex
      margin-bottom 10px
      .name
        margin-left 20px
        width 100%
        line-height 62px
        border-bottom 1px solid rgba(204, 204, 204, 0.1)
        .alias
          color rgba(204, 204, 204, 0.7)

  .headImg
    img
      border-radius 60px
      width 60px
      height 60px

</style>
