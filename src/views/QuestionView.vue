<script setup lang="ts">
import { ref } from 'vue'
import { Form, Select, TextArea, Button } from '@/components/ui'

interface SurveyData {
	source: string
	feedback: string
}

const sourceOptions = [
	{ label: 'Друзья', value: 'friends' },
	{ label: 'Соцсети', value: 'social' },
	{ label: 'Поиск в сети', value: 'search' },
	{ label: 'Реклама', value: 'ads' },
	{ label: 'Другое', value: 'other' }
]

const formData = ref<SurveyData>({
	source: '',
	feedback: ''
})

const error = ref<string | null>(null)
const isBusy = ref(false)

const onSubmit = async () => {
	error.value = null
	isBusy.value = true
	try {
		console.log('Результаты опроса:', formData.value)
		alert('Успешно')
	} catch (err) {
		console.error('question:', err)
		if (err instanceof Error) {
			error.value = err?.message
		}
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
	<Form title="Опрос / Анкета" @submit="onSubmit">
		<Select
			label="Как вы узнали о нас?"
			name="source"
			v-model="formData.source"
			:options="sourceOptions"
			placeholder="Выберите вариант"
		/>

		<TextArea
			label="Ваш отзыв"
			name="feedback"
			v-model="formData.feedback"
			placeholder="Расскажите, что думаете о нашем сервисе"
			:rows="5"
		/>

		<p v-if="error" class="form__error">{{ error }}</p>

		<div class="form__actions">
			<Button type="submit" variant="primary" :disabled="isBusy">
				{{ isBusy ? 'Отправка...' : 'Отправить' }}
			</Button>
			<Button type="button" variant="outline" @click="onCancel"> Очистить </Button>
		</div>
	</Form>
</template>
