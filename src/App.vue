<template>
  <div id="app">
    <m-header></m-header>
    <top-tab></top-tab>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>


  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import TopTab from 'components/tab/tab'

  export default {
    name: 'App',
    components: {
      MHeader,
      TopTab
    }
  }
</script>

<style>

</style>
