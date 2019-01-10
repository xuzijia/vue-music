import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Recommend from 'components/recommend/recommend'
import DayRecommend from 'components/recommend/day-recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import Songs from 'components/singer-songs/children/songs'
import Album from 'components/singer-songs/children/album'
import Mv from 'components/singer-songs/children/mv'
import MvPlayer from 'components/mv/mv-player'
import Disc from 'components/disc/disc'
import AlbumDetail from 'components/album/album'
import TopList from 'components/top-list/top-list'
import PlayList from 'components/playlist/playlist'
import My from 'components/my/my'
import UserCenter from 'components/user-center/user-center'
import UserDetail from 'components/user-detail/user-detail'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'

    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        },
        {
          path: 'album/:aid',
          component: AlbumDetail
        },
      ]
    },
    {
      path:"/user/day",
      component:DayRecommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail,
          children: [
            {
              path: '/',
              redirect: '/songs'
            },
            {
              path: '/songs',
              component: Songs,
            },
            {
              path: '/album',
              component: Album,
            },
            {
              path: '/mv',
              component: Mv
            }
          ]
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        },
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: 'playlist/:id',
          component: Disc
        },
      ]
    },

    {
      path: '/mv/player/:id',
      component: MvPlayer
    },
    {
      path: '/album/detail/:id',
      component: AlbumDetail
    },

    {
      path:'/playlist',
      component:PlayList,
      children: [
        {
          path: ':id',
          component: Disc
        },
      ]
    },
    {
      path:'/my',
      component:My,
      children:[
        {
          path:':id',
          component:Disc
        }
      ]
    },
    {
      path:'/playHistory/:flag',
      component:UserCenter
    },
    {
      path:'/userDetail/:userid',
      component:UserDetail,
      children:[
        {
          path:':id',
          component:Disc
        }
      ]
    }
  ]
})
