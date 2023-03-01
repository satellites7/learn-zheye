<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <router-link class="navbar-brand" to="/">者也专栏</router-link>
        <ul class="list-line mb-0" v-if="!user?.isLogin">
            <li class="list-inline-item">
                <router-link class="btn btn-outline-light my-2" to="/login">登录</router-link>
            </li>
            <li class="list-inline-item">
                <router-link class="btn btn-outline-light my-2" to="/signup">注册</router-link>
            </li>
        </ul>
        <ul class="list-line mb-0" v-else>
            <li class="list-inline-item">
                <DropDown :title="`你好${user.nickName}`" >
                    <DropDownItem><router-link to="/createPost" class="dropdown-item">新建文章</router-link></DropDownItem>
                    <DropDownItem disabled><a class="dropdown-item" >编辑资料</a></DropDownItem>
                    <DropDownItem><a class="dropdown-item">退出登录</a></DropDownItem>
                </DropDown>
            </li>
        </ul>
</nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import { UserProps } from '@/store'

export default defineComponent({
    props: {
        user: {
            type: Object as PropType<UserProps>,
            require: true
        }
    },
    components: { DropDown, DropDownItem }
    // setup () {

    // }
})
</script>
