<template>
    <div class="validate-input-container pb-3">
        <input v-if="tag !== 'textarea' " @input="updateValue" type="text" class="form-control" :value="inputRef.val"
         @blur="validateInput" :class="{'is-invalid': inputRef.error}" v-bind="$attrs" />
         <textarea v-else  @input="updateValue" type="text" class="form-control" :value="inputRef.val"
         @blur="validateInput" :class="{'is-invalid': inputRef.error}" v-bind="$attrs" />
        <span class="invalid-feedback" v-if="inputRef.error">{{ inputRef.message }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface RuleProp {
    type : 'required' | 'email' | 'custom',
    message: string,
    validator ?: () => boolean,
}

export type RulesProp = RuleProp[]

export type tagType = 'input' | 'textarea'

export default defineComponent({
    name: 'ValidateInput',
    props: {
        rules: Array as PropType<RulesProp>,
        modelValue: String,
        tag: {
            type: String as PropType<tagType>,
            default: 'input'
        }
    },
    inheritAttrs: false,
    setup (props, context) {
        const inputRef = reactive({
            val: props.modelValue || '',
            error: false,
            message: ''
        })
        const validateInput = () => {
            if (props.rules) {
                const allPassed = props.rules.every(rule => {
                    let passed = true
                    inputRef.message = rule.message
                    switch (rule.type) {
                        case 'required':
                            passed = (inputRef.val.trim() !== '')
                            break
                        case 'email':
                            passed = emailReg.test(inputRef.val)
                            break
                        case 'custom':
                            passed = rule.validator ? passed = rule.validator() : true
                            break
                        default:
                            break
                    }
                    return passed
                })
                inputRef.error = !allPassed
                return allPassed
            }
            return true
        }
        const updateValue = (e: Event) => {
            const inputValue = (e.target as HTMLInputElement).value
            inputRef.val = inputValue
            context.emit('update:modelValue', inputValue)
        }
        onMounted(() => {
            emitter.emit('form-item-created', validateInput)
        })
        return { inputRef, validateInput, updateValue }
    }
})
</script>
