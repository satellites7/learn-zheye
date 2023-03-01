<template>
    <div class="file-upload">
        <div class="uploader-container" @click.prevent="triggerUploader" v-bind="$attrs">
            <slot v-if="fileStatus === 'loading'" name="loading">
                <button class="btn btn-primary">上传中...</button>
            </slot>
            <slot v-else-if="fileStatus === 'success'" name="uploaded" :respData=respData>
                <button class="btn btn-primary">上传成功</button>
            </slot>
            <slot v-else name="default"><button class="btn btn-primary">点击上传</button></slot>
        </div>
        <input type="file" class="d-none" ref="fileInput" @change="handleFileChange">
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, PropType } from 'vue'
type UploaderStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
    props: {
        action: {
            type: String,
            require: true
        },
        beforeUpload: {
            type: Function as PropType<CheckFunction>
        }
    },
    inheritAttrs: false,
    emits: ['upload-file', 'upload-file-error'],
    setup (props, context) {
        const fileInput = ref<null | HTMLInputElement>(null)
        const fileStatus = ref<UploaderStatus>('ready')
        const respData = ref()
        const triggerUploader = () => {
            if (fileInput.value) {
                fileInput.value.click()
            }
        }
        const handleFileChange = (e: Event) => {
            const currentTarget = e.target as HTMLInputElement
            if (currentTarget.files) {
                const files = Array.from(currentTarget.files)
                if (props.beforeUpload) {
                    const result = props.beforeUpload(files[0])
                    if (!result) {
                        return
                    }
                }
                const formData = new FormData()
                formData.append('file', files[0])
                fileStatus.value = 'loading'
                axios.post(props.action as string, formData, {
                    headers: {
                        'Content-Type': 'multipart/from-data'
                    }
                }).then(res => {
                    context.emit('upload-file', res.data)
                    respData.value = res.data
                    fileStatus.value = 'success'
                }).finally(() => {
                    if (fileInput.value) fileInput.value.value = ''
                })
            }
        }

        return { fileInput, triggerUploader, fileStatus, handleFileChange, respData }
    }
})
</script>
