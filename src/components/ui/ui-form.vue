<script setup lang="ts">
import { type PropType } from 'vue'
import { Input, Select, TextArea, CheckBox, Button } from '@/components/ui'
import type { Field, FieldValue } from '@/types/form.ts'

const { title, schema, submitText, cancelText } = defineProps<{
	title?: string
	schema: Field[]
	submitText?: string
	cancelText?: string
}>()

const emit = defineEmits<{
	(e: 'submit'): void
	(e: 'cancel'): void
	(e: 'update:modelValue', v: Record<string, FieldValue>): void
}>()

const formData = defineModel<Record<string, FieldValue>>('modelValue', {
	type: Object as PropType<Record<string, FieldValue>>,
	default: () => ({})
})

const updateField = (name: string, value: FieldValue) => {
	formData.value[name] = value
	emit('update:modelValue', formData.value)
}

const onSubmit = () => {
	emit('submit')
}

const onCancel = () => {
	emit('cancel')
}
</script>

<template>
	<form class="form" @submit.prevent="onSubmit" v-bind="$attrs">
		<h2 v-if="title" class="form__title">{{ title }}</h2>

		<div class="form__fields">
			<template v-for="field in schema" :key="field.name">
				<template v-if="field.type === 'input'">
					<slot
						name="input"
						:field="field"
						:value="formData[field.name]"
						:update="updateField"
					>
						<Input
							:name="field.name"
							:label="field.label"
							v-model="formData[field.name] as string"
							v-bind="field.attrs"
						/>
					</slot>
				</template>
				<template v-else-if="field.type === 'textarea'">
					<slot
						name="textarea"
						:field="field"
						:value="formData[field.name]"
						:update="updateField"
					>
						<TextArea
							:name="field.name"
							:label="field.label"
							v-model="formData[field.name] as string"
							v-bind="field.attrs"
						/>
					</slot>
				</template>

				<template v-else-if="field.type === 'select'">
					<slot
						name="select"
						:field="field"
						:value="formData[field.name]"
						:update="updateField"
					>
						<Select
							:name="field.name"
							:label="field.label"
							v-model="formData[field.name] as string"
							:options="field.options"
							v-bind="field.attrs"
						/>
					</slot>
				</template>

				<template v-else-if="field.type === 'checkbox'">
					<slot
						name="checkbox"
						:field="field"
						:value="formData[field.name]"
						:update="updateField"
					>
						<CheckBox
							:name="field.name"
							:label="field.label"
							v-model="formData[field.name]"
							v-bind="field.attrs"
						/>
					</slot>
				</template>
			</template>
		</div>

		<slot name="afterFields" class="form__after" />

		<div class="form__actions">
			<Button type="submit" variant="primary">
				{{ submitText || 'Сохранить' }}
			</Button>
			<Button type="button" variant="outline" @click.stop="onCancel">
				{{ cancelText || 'Отмена' }}
			</Button>
		</div>
	</form>
</template>

<style lang="scss" scoped>
@use '@/assets/variables';

.form {
	padding: 32px 40px;
	border: 1px solid variables.$border-color;
	border-radius: variables.$border-radius;
	width: 100%;

	&__title {
		margin-bottom: 20px;
		font-size: 24px;
		text-align: center;
		text-transform: uppercase;
	}

	&__fields {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__group {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	&__actions {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		margin-top: 24px;
	}
}
</style>
