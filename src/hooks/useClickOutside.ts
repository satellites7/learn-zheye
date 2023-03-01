import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (el: Ref<null | HTMLElement>) => {
    const isClickOutside = ref(false)
    const handler = (e: MouseEvent) => {
        if (el.value) {
            if (el.value.contains(e.target as HTMLElement)) {
                isClickOutside.value = false
            } else {
                isClickOutside.value = true
            }
        }
    }
    onMounted(() => {
        document.addEventListener('click', handler)
    })
    onUnmounted(() => {
        document.removeEventListener('click', handler)
    })
    return isClickOutside
}
export default useClickOutside
