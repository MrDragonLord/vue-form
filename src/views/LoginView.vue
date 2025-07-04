<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Input, Button, Form } from '@/components/ui'

interface LoginData {
	email: string
	password: string
}

const router = useRouter()
const store = useStore()

const formData = ref<LoginData>({
	email: '',
	password: ''
})

const error = ref<string | null>(null)
const isBusy = ref(false)

const onSubmit = async () => {
	error.value = null
	isBusy.value = true
	try {
		await store.dispatch('auth/login', formData.value)
		await router.push('/')
	} catch (err) {
		console.error('Login:', err)
		if (err instanceof Error) {
			error.value = err?.message
		}
	} finally {
		isBusy.value = false
	}
}

const onCancel = () => {
	formData.value = { email: '', password: '' }
	error.value = null
}
</script>

<template>
	<Form title="Авторизация" @submit="onSubmit">
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
		/>

		<p v-if="error" class="form__error">{{ error }}</p>

		<div class="form__actions">
			<Button type="submit" variant="primary" :disabled="isBusy">
				{{ isBusy ? 'Вход...' : 'Войти' }}
			</Button>
			<Button type="button" variant="outline" @click="onCancel"> Очистить </Button>
		</div>
	</Form>
</template>
