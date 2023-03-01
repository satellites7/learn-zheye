import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
axios.defaults.baseURL = 'http://api.vikingship.xyz/api'
axios.interceptors.request.use(config => {
    store.commit('setLoading', true)
    store.commit('setError', { isError: false, msg: '' })
    return config
})
axios.interceptors.response.use(config => {
    store.commit('setLoading', false)
    return config
}, e => {
    const { error } = e.response.data
    store.commit('setError', { isError: true, msg: error })
    store.commit('setLoading', false)
    return Promise.reject(error)
})
createApp(App).use(store).use(router).mount('#app')
