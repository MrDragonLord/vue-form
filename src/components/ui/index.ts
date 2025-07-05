import { defineAsyncComponent } from 'vue'

export const Input     = defineAsyncComponent(() => import('./ui-input.vue'))
export const TextArea  = defineAsyncComponent(() => import('./ui-textarea.vue'))
export const Select    = defineAsyncComponent(() => import('./ui-select.vue'))
export const CheckBox  = defineAsyncComponent(() => import('./ui-checkbox.vue'))
export const Button    = defineAsyncComponent(() => import('./ui-button.vue'))
export const Form      = defineAsyncComponent(() => import('./ui-form.vue'))
