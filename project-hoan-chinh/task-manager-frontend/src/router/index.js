import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../pages/TaskList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TaskList
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
