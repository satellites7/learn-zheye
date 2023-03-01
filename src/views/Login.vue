<template>
  <validateForm @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱</label>
      <ValidateInput :rules="emailRules" v-model="emailValue" type="eamil" placeholder="请输入邮箱地址" />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <ValidateInput :rules="passwordRules" type="password" placeholder="请输入密码" v-model="password" />
    </div>
    <template #submit>
      <button class="btn btn-danger">提交</button>
    </template>
  </validateForm>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import validateForm from '@/components/ValidateForm.vue'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps } from '@/store'
import createMessage from '@/components/createMessage'

const emailRules: RulesProp = [
  { type: 'required', message: '邮箱地址不能为空' },
  { type: 'email', message: '请输入正确格式的邮箱地址' }
]
const passwordRules: RulesProp = [
  { type: 'required', message: '密码不能为空' }
]
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput, validateForm
  },
  setup () {
    const emailValue = ref('')
    const password = ref('')
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        store.dispatch('loginAndFetchCurrentUser', { email: emailValue.value, password: password.value })
          .then(() => {
            createMessage('success', '登录成功，2秒后跳转')
            setTimeout(() => router.push('/'), 2000)
          }).catch(e => {
            console.log(e)
          })
      }
    }
    return { emailRules, emailValue, passwordRules, onFormSubmit, password }
  }
})
</script>
