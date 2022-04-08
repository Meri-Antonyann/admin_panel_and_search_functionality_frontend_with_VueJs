import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import auth from "../components/auth/auth";
import user from "../components/user/user";
import Search from "../components/search/SearchComponent";
import Error from "../components/Errorpage";

Vue.use(Router)

const router =new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'HelloWorld', component: HelloWorld},
    {path: '/search/result', name: 'Search', component: Search},
    {path: '/error', name: 'ErrorPage', component: Error},
    ...auth,
    ...user
  ]
})


router.beforeEach((to, from,  next)=>{
  const authuser = localStorage.getItem('access_token')
  if (to.name !== 'Posts' && to.name !== 'Login' &&to.name !== 'HelloWorld'  && to.name !== 'ErrorPage' && to.name !== 'Search'  && !authuser ) next({ name: 'ErrorPage' })
  else next()

})

router.beforeEach((to, from,  next)=>{
  const authuser = localStorage.getItem('access_token')
  if (to.name !== 'Profile' && to.name !== 'Posts' && to.name !== 'HelloWorld'  && to.name !== 'ErrorPage' && to.name !== 'Search' && to.name !== 'Edit'   && authuser ) next({ name: 'ErrorPage' })
  else next()

})

export default router;
