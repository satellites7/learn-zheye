<template>
    <div class="row">
        <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
            <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                    <img class="card-img-top rounded-circle border border-light w-25 my-3" :src="column.avatar?.url"
                        :alt="column.title" />
                    <h5 class="card-title">{{ column.title }}</h5>
                    <p class="card-text text-left">{{ column.description }}</p>
                    <router-link :to="`/column/${column._id}`" href="#" class="btn btn-outline-primary ">进入专栏</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity'
import { defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/store'

export default defineComponent({
    name: 'ColumnList',
    props: {
        list: {
            type: Array as PropType<ColumnProps[]>,
            require: true
        }
    },
    setup (props) {
        const columnList = computed(() => {
            if (props.list) {
                return props.list.map((item) => {
                    if (!item.avatar) {
                        item.avatar = {
                            url: require('@/assets/logo.png')
                        }
                    }
                    return item
                })
            }
        })
        return { columnList }
    }
})
</script>
