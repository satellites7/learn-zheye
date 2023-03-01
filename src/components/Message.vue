<template>
    <Teleport to="#message">
        <div class="alert w-50 message-info fixed-top mx-auto d-flex mt-2 justify-content-between" v-if="isVisible"
            :class="classObject">
            <strong>{{ message }}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                @click.prevent="hide()"></button>
        </div>
    </Teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'
export type messageType = 'success' | 'warning' | 'default'

export default defineComponent({
    props: {
        message: String,
        type: {
            type: String as PropType<messageType>,
            default: 'default'
        }
    },
    emits: ['close-message'],
    setup (props, context) {
        useDomCreate('message')
        const classObject = {
            'alert-primary': props.type === 'default',
            'alert-success': props.type === 'success',
            'alert-warning': props.type === 'warning'
        }
        const isVisible = ref(true)
        const hide = () => {
            isVisible.value = false
            context.emit('close-message', true)
        }
        return { classObject, isVisible, hide }
    }
})
</script>
