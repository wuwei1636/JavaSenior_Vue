import Vue from "vue";
import VueRouter from "vue-router";
import Index from '@/components/index.vue'
import Main from '@/components/body/main.vue'
import MyFile from '@/components/body/myfile.vue'

Vue.use(VueRouter)
let originPush = VueRouter.prototype.push
let originreplace = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originreplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const routes = [
    {
        path: '/',
        redirect: '/main',
        name: 'index',
        component: Index,
        children: [
          {
            path: 'main',
            component: Main,
          },
          {
            path: 'myfile',
            component: MyFile,
          }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
]


const router = new VueRouter({
    routes
  })
  export default router