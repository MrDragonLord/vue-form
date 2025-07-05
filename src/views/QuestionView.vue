<script setup lang="ts">
import { ref } from 'vue'
import { Form } from '@/components/ui'
import type { Field, FieldValue } from '@/types/form.ts'

const sourceOptions = [
	{ label: 'Друзья', value: 'friends' },
	{ label: 'Соцсети', value: 'social' },
	{ label: 'Поиск в сети', value: 'search' },
	{ label: 'Реклама', value: 'ads' },
	{ label: 'Другое', value: 'other' }
]

const formData = ref<Record<string, FieldValue>>({
	source: '',
	feedback: ''
})

const error = ref<string | null>(null)
const isBusy = ref(false)

const schema: Field[] = [
	{
		name: 'source',
		label: 'Как вы узнали о нас?',
		type: 'select',
		attrs: {
			placeholder: 'Выберите вариант',
			required: true
		},
		options: sourceOptions
	},
	{
		name: 'feedback',
		label: 'Ваш отзыв',
		type: 'textarea',
		attrs: { placeholder: 'Расскажите, что думаете о нашем сервисе', rows: 5, required: true }
	}
]

const onSubmit = async () => {
	error.value = null
	isBusy.value = true
	try {
		console.log('Результаты опроса:', formData.value)
		alert('Успешно')
	} catch (err) {
		console.error('question:', err)
		if (err instanceof Error) error.value = err.message
	} finally {
		isBusy.value = false
	}
}

const onCancel = () => {
	formData.value = { source: '', feedback: '' }
	error.value = null
}
</script>

<template>
	<Form
		title="Анкета"
		:schema="schema"
		v-model:modelValue="formData"
		:submitText="isBusy ? 'Отправка...' : 'Отправить'"
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
	max-width: 700px;
	margin: 0 auto;
}
</style>
