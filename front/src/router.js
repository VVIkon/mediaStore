import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Hellow from './components/Hello.vue'
// import Auth from './components/Auth.vue'
// import Store from './store'

Vue.use(Router)

// const ifNotAuthenticated = (to, from, next) => {
//     if (!Store.getters.isAuthenticated || !Store.getters.isTokenLegal) {
//         next()
//         return
//     }
//     next('/')
// }

// const ifAuthenticated = (to, from, next) => {
//     if (Store.getters.isAuthenticated && Store.getters.isTokenLegal) {
//         next()
//         return
//     }
//     next('/login')
// }

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/hellow', component: Hellow },
        // { path: '/hellow', component: Hellow, beforeEnter: ifAuthenticated },
        // { path: '/login', name: 'Login', component: Auth, beforeEnter: ifNotAuthenticated },
    ],
})