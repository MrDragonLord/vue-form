<script setup lang="ts">
import { defineModel } from 'vue'

interface Option {
	label: string
	value: string | number
}
interface Props {
	label?: string
	name: string
	options: Option[]
	placeholder?: string
	disabled?: boolean
}

const { label, name, options, placeholder, disabled } = defineProps<Props>()

const model = defineModel<string | number>({ default: '' })
</script>

<template>
	<div class="select__wrapper">
		<label v-if="label" :for="name">{{ label }}</label>
		<select :id="name" :name="name" v-model="model" :disabled="disabled" class="select">
			<option v-if="placeholder" disabled value="" hidden>
				{{ placeholder }}
			</option>
			<option v-for="opt in options" :key="opt.value" :value="opt.value">
				{{ opt.label }}
			</option>
		</select>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/variables';

.select {
	appearance: none;
	position: relative;
	display: block;
	background-color: variables.$bg-color;
	background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
	background-repeat: no-repeat;
	background-position: right 0.5rem center;
	cursor: pointer;
	width: 100%;
	padding: 8px 15px;
	border: 1px solid variables.$border-color;
	border-radius: variables.$border-radius;
	outline: none;
	transition: all 0.2s;

	&__wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&:focus {
		box-shadow: 0 0 0 4px rgba(variables.$primary-color, 0.4);
	}
	&[disabled] {
		cursor: not-allowed;
		opacity: 0.4;
	}
}
</style>
