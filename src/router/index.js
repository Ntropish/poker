import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Lobby from '@/components/Lobby'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/lobby',
      name: 'Lobby',
      component: Lobby
    }
  ]
})
