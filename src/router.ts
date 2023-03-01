import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
import store from './store'
// test git
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: {
                redirectAleadyLogin: true
            }
        },
        {
            name: 'column',
            path: '/column/:id',
            component: ColumnDetail
        },
        {
            name: 'signup',
            path: '/signup',
            component: Signup
        },
        {
            name: 'createPost',
            path: '/createPost',
            component: CreatePost,
            meta: {
                requireLogin: true
            }
        }
    ]
})
router.beforeEach((to, from, next) => {
    const { isLogin, token } = store.state.user
    const { redirectAleadyLogin, requireLogin } = to.meta
    if (!isLogin) {
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            store.dispatch('fetchCurrentUser').then(() => {
                if (redirectAleadyLogin) {
                    next('/')
                } else {
                    next()
                }
            }).catch(e => {
                console.error(e)
                store.commit('logout')
                next('/login')
            })
        } else {
            if (requireLogin) {
                next('/login')
            } else {
                next()
            }
        }
    } else {
        if (redirectAleadyLogin) {
            next('/')
        } else {
            next()
        }
    }
})
export default router
