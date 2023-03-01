<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader action="/upload" class="d-flex justify-content-center align-items-center bg-light text-secondary w-100 my-4 " :before-upload="uploadCheck">
      <h1>点击上传图片</h1>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传中</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.respData.data.url" />
      </template>
    </Uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input placeholder="请输入文章详情" :rules="contentRules" v-model="contentVal" tag="textarea" rows="10" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import validateForm from '@/components/ValidateForm.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/components/createMessage'
import { checkBeforeUpload } from '@/helper'
import { defineComponent, ref } from 'vue'
import { GlobalDataProps, PostProps } from '../store'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput, validateForm, Uploader
  },
  setup () {
    const titleVal = ref('')
    const contentVal = ref('')
    const router = useRouter()
    const titleRules: RulesProp = [
      { type: 'required', message: '标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章内容不能为空' }
    ]
    const store = useStore<GlobalDataProps>()
    const uploadCheck = (file: File) => {
      const result = checkBeforeUpload(file, {
        format: ['jpeg/image', 'png/image'],
        size: 1
      })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('warning', '只能上传JPG/PNG格式图片')
      }
      if (error === 'size') {
        createMessage('warning', '图片大小不能超过1m')
      }
      return passed
    }
    const onFormSubmit = (result: boolean) => {
      const columnId = store.state.user.column
      if (result) {
        if (columnId) {
          const post: PostProps = {
            _id: new Date().getDate().toString(),
            title: titleVal.value,
            content: contentVal.value,
            column: columnId.toString(),
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', post)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }
    return { titleVal, contentVal, titleRules, contentRules, onFormSubmit, uploadCheck }
  }
})
</script>

<style>
.create-post-page .uploader-container{
cursor: pointer;
height: 200px;
}
.create-post-page .uploader-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
