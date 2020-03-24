import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StudnetList from '../views/StudnetList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/list',
    children: [
      {
        path: 'list',
        name: 'StudentList',
        component: StudnetList
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('./../views/AddStudent.vue')
      },
      {
        path: 'classList',
        name: 'ClassList',
        component: () => import('./../views/ClassList.vue')
      },
      {
        path: 'addClass',
        name: 'AddClass',
        component: () => import('./../views/AddClass.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
