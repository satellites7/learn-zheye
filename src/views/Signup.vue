<template>
    <validateForm @form-submit="onFormSubmit">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">邮箱</label>
            <ValidateInput :rules="emailRules" v-model="formData.email" type="eamil" placeholder="请输入邮箱地址" />
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">用户名</label>
            <ValidateInput :rules="nickNameRules" v-model="formData.nickName" placeholder="请输入用户名" />
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">密码</label>
            <ValidateInput :rules="passwordRules" type="password" placeholder="请输入密码" v-model="formData.password" />
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">再次输入密码</label>
            <ValidateInput :rules="repeatPasswordRules" type="password" v-model="formData.repeatPassword" placeholder="请再次输入密码" />
        </div>
        <template #submit>
            <button class="btn btn-danger">注册</button>
        </template>
    </validateForm>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import validateForm from '@/components/ValidateForm.vue'
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

import createMessage from '@/components/createMessage'
import axios from 'axios'

export default defineComponent({
    name: 'Signup',
    components: {
        ValidateInput, validateForm
    },
    setup () {
        const router = useRouter()
        const formData = reactive({
            email: '',
            password: '',
            nickName: '',
            repeatPassword: ''
        })
        const emailRules: RulesProp = [
            { type: 'required', message: '邮箱地址不能为空' },
            { type: 'email', message: '请输入正确格式的邮箱地址' }
        ]
        const passwordRules: RulesProp = [
            { type: 'required', message: '密码不能为空' }
        ]
        const nickNameRules: RulesProp = [
            { type: 'required', message: '用户名不能为空' }
        ]
        const repeatPasswordRules: RulesProp = [
            { type: 'required', message: '请再次输入密码' },
            { type: 'custom', validator: () => formData.password === formData.repeatPassword, message: '密码不相同' }
        ]
        const onFormSubmit = (result: boolean) => {
            if (result) {
                const payload = {
                    email: formData.email,
                    nickName: formData.nickName,
                    password: formData.password
                }
                axios.post('/users/', payload).then(() => {
                    createMessage('success', '注册成功两秒后跳转到登录页面')
                    setTimeout(() => router.push('/login'), 2000)
                }).catch(e => console.log(e))
            }
        }
        return { onFormSubmit, emailRules, passwordRules, nickNameRules, repeatPasswordRules, formData }
    }
})
</script>
