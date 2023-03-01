import { h, render } from 'vue'
import MessageVue from './Message.vue'
export type messageType = 'success' | 'warning' | 'default'

const createMessage = (type: messageType, message: string, timeout = 2000) => {
    const messageVnode = h(MessageVue, { type, message })
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    render(messageVnode, mountNode)
    setTimeout(() => {
        render(null, mountNode)
        document.body.removeChild(mountNode)
    }, timeout)
}

export default createMessage
