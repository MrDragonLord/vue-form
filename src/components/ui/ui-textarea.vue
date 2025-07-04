<script setup lang="ts">
import { defineProps, defineModel } from 'vue'

interface Props {
	label?: string
	name: string
	placeholder?: string
	rows?: number
}

const { label, name, placeholder, rows } = defineProps<Props>()

const model = defineModel<string>({ default: '' })
</script>

<template>
	<div class="textarea__wrapper">
		<label v-if="label" :for="name" class="textarea__label">
			{{ label }}
		</label>

		<textarea
			:id="name"
			:name="name"
			v-model="model"
			:placeholder="placeholder"
			:rows="rows"
			class="textarea"
		/>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/variables';

.textarea {
	background-color: variables.$bg-color;
	display: block;
	width: 100%;
	padding: 8px 15px;
	border: 1px solid variables.$border-color;
	border-radius: variables.$border-radius;
	outline: none;
	transition: all 0.2s;
	resize: vertical;

	&__label {
		user-select: none;
	}

	&__wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&:focus {
		box-shadow: 0 0 0 4px rgba($color: variables.$primary-color, $alpha: 0.4);
	}

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.4;
	}
}
</style>
