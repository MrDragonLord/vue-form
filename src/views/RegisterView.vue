<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Input, CheckBox, Button, Form } from '@/components/ui'
import { useStore } from 'vuex'

interface RegistrationData {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
	agree: boolean
}

const router = useRouter()
const store = useStore()

const error = ref<string | null>(null)
const isBusy = ref(false)

const formData = ref<RegistrationData>({
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	agree: false
})

const onSubmit = async () => {
	error.value = null
	isBusy.value = true
	try {
		console.log('Register:', formData.value)
		await store.dispatch('auth/register', formData.value)
		await router.push('/')
	} catch (err) {
		console.error('Register:', err)
		if (err instanceof Error) {
			error.value = err?.message
		}
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
	<Form title="Регистрация" @submit="onSubmit">
		<Input label="Имя" name="firstName" v-model="formData.firstName" placeholder="Ваше имя" />

		<Input
			label="Фамилия"
			name="lastName"
			v-model="formData.lastName"
			placeholder="Ваша фамилия"
		/>

		<Input
			label="Email"
			name="email"
			type="email"
			v-model="formData.email"
			placeholder="example@mail.com"
		/>

		<Input
			label="Пароль"
			name="password"
			type="password"
			v-model="formData.password"
			placeholder="Введите пароль"
		>
			<template #hint>
				Пароль должен быть не менее 8 символов,<br />
				содержать буквы и цифры.
			</template>
		</Input>

		<Input
			label="Подтвердите пароль"
			name="confirmPassword"
			type="password"
			v-model="formData.confirmPassword"
			placeholder="Повторите пароль"
		/>

		<CheckBox name="agree" v-model="formData.agree" label="Я согласен с условиями" />

		<p v-if="error" class="form__error">{{ error }}</p>

		<div class="form__actions">
			<Button type="submit" variant="primary" :disabled="isBusy">
				{{ isBusy ? 'Регистрация...' : 'Зарегистрироваться' }}
			</Button>
			<Button type="button" variant="outline" @click="onCancel"> Очистить </Button>
		</div>
	</Form>
</template>
