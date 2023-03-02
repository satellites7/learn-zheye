<template>
    <div class="post-detail-page w-75 mx-auto" v-if="postData">
        <img :src="postData.image.url" alt="" class="border w-100" />
        <h2 class="my-4">{{ postData.title }}</h2>
        <div class="author_info py-3 mb-5 align-items-center row g-0 border-top border-bottom">
            <div class="col">
                <img :src="postData.author.avatar" alt="" />
                <span>{{ postData.author.nickName }}</span>
            </div>
            <span class="text-muted col text-right font-italic">发表于：{{postData.createdAt}}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'PostDetail',
    setup () {
        const route = useRoute()
        const postId = route.params.id
        const postData = ref()
        onMounted(() => {
            axios.get(`posts/${postId}`).then(resp => {
                postData.value = resp.data.data
            })
        })
        return { postData }
    }
})
</script>
