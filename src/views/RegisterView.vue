<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Form } from '@/components/ui'
import type { Field, FieldValue } from '@/types/form.ts'

const router = useRouter()
const store = useStore()

const formData = ref<Record<string, FieldValue>>({
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	agree: false
})

const error = ref<string | null>(null)
const isBusy = ref(false)

const schema: Field[] = [
	{ name: 'firstName', label: 'Имя', type: 'input', attrs: { placeholder: 'Ваше имя' } },
	{ name: 'lastName', label: 'Фамилия', type: 'input', attrs: { placeholder: 'Ваша фамилия' } },
	{
		name: 'email',
		label: 'Email',
		type: 'input',
		attrs: { type: 'email', placeholder: 'example@mail.com', required: true }
	},
	{
		name: 'password',
		label: 'Пароль',
		type: 'input',
		attrs: { type: 'password', placeholder: 'Введите пароль', required: true }
	},
	{
		name: 'confirmPassword',
		label: 'Подтвердите пароль',
		type: 'input',
		attrs: { type: 'password', placeholder: 'Повторите пароль' }
	},
	{
		name: 'agree',
		label: 'Я согласен с условиями',
		type: 'checkbox',
		attrs: {
			required: true
		}
	}
]

const onSubmit = async () => {
	error.value = null
	isBusy.value = true
	try {
		console.log('Register:', formData.value)
		await store.dispatch('auth/register', formData.value)
		await router.push('/')
	} catch (err) {
		console.error('Register:', err)
		if (err instanceof Error) error.value = err.message
	} finally {
		isBusy.value = false
	}
}

const onCancel = () => {
	formData.value = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		agree: false
	}
}
</script>

<template>
	<Form
		title="Регистрация"
		:schema="schema"
		v-model:modelValue="formData"
		:submitText="isBusy ? 'Регистрация...' : 'Зарегистрироваться'"
		cancelText="Очистить"
		@submit="onSubmit"
		@cancel="onCancel"
	>
		<template #afterFields>
			<p v-if="error" class="form__error">{{ error }}</p>
		</template>
	</Form>
</template>

<style lang="scss" scoped>
form {
	max-width: 500px;
	margin: 0 auto;
}
</style>
