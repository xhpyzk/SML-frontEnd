import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
import Project from '@/pages/projects/project.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      // component: require('@/pages/home/Home.vue').default
      component: Home
    },
    {
      path: '/project/:id',
      name: 'Project',
      component: Project
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
