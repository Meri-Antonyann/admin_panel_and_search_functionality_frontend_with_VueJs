import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import auth from "../components/auth/auth";
import user from "../components/user/user";
import Search from "../components/search/SearchComponent";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'HelloWorld', component: HelloWorld},
    {path: '/search/result', name: 'Search', component: Search},
    ...auth,
    ...user
  ]
})
