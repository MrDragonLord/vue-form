<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Form } from '@/components/ui'
import type { Field, FieldValue } from '@/types/form.ts'

const router = useRouter()
const store = useStore()

const formData = ref<Record<string, FieldValue>>({
	email: '',
	password: ''
})
const error = ref<string | null>(null)
const isBusy = ref(false)

const schema: Field[] = [
	{
		name: 'email',
		label: 'Email',
		type: 'input',
		attrs: {
			type: 'email',
			placeholder: 'example@mail.com',
			required: true
		}
	},
	{
		name: 'password',
		label: 'Пароль',
		type: 'input',
		attrs: {
			type: 'password',
			placeholder: 'Введите пароль',
			required: true
		}
	}
]

const onSubmit = async () => {
	error.value = null
	isBusy.value = true
	try {
		await store.dispatch('auth/login', formData.value)
		await router.push('/')
	} catch (err) {
		console.error('Login:', err)
		if (err instanceof Error) error.value = err.message
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
	<Form
		title="Авторизация"
		:schema="schema"
		v-model="formData"
		:submitText="isBusy ? 'Вход...' : 'Войти'"
		cancelText="Очистить"
		@submit="onSubmit"
		@cancel="onCancel"
	>
		<template #input="{ field, value, update }">
			<label :for="field.name">{{ field.label }}</label>
			<div class="input">
				<input
					:id="field.name"
					:name="field.name"
					:placeholder="field.attrs?.placeholder"
					:value="value as string"
					v-bind="field.attrs"
					@input="
						(evt: Event) => update(field.name, (evt.target as HTMLInputElement).value)
					"
					class="my-input"
				/>
			</div>
		</template>
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
.my-input {
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	width: 100%;
}
</style>
