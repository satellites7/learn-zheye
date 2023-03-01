<template>
  <div class="container">
    <GrobleHeader :user="currentUser" />
    <Loading text="拼命加载中。。。" v-if="isLoading" />
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GrobleHeader from './components/GrobalHeader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import Loading from './components/Loading.vue'
import createMessage from './components/createMessage'

export default defineComponent({
  name: 'App',
  components: {
    GrobleHeader, Loading
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const isLoading = computed(() => store.state.isLoading)
    const currentUser = computed(() => store.state.user)
    const error = computed(() => store.state.error)
    watch(() => error.value.isError, () => {
      if (error.value.isError && error.value.msg) {
        createMessage('warning', error.value.msg)
      }
    })
    // onMounted(() => {
    //   if (token.value && !currentUser.value.isLogin) {
    //     axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
    //     store.dispatch('fetchCurrentUser')
    //   }
    // })
    return { currentUser, isLoading, error }
  }
})
</script>

<style></style>
