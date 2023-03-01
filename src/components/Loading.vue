<template>
    <Teleport to="#back">
        <div class="d-flex h100 justify-content-center align-items-center loading-container">
            <div class="loading-content">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p v-if="text" class="text-primary fs-3">{{ text }}</p>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'
export default defineComponent({
    props: {
        background: {
            type: String
        },
        text: {
            type: String
        }
    },
    setup () {
        useDomCreate('back')
    }
})
</script>

<style scoped>
.loading-container {
    background: rgba(0, 0, 0, .8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    text-align: center;
}

</style>
