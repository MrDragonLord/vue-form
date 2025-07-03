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

const {
	label,
	name,
	options,
	placeholder,
	disabled,
} = defineProps<Props>()

const model = defineModel<string | number>({ default: '' })
</script>

<template>
	<div class="select__wrapper">
		<label v-if="label" :for="name">{{ label }}</label>
		<select
			:id="name"
			:name="name"
			v-model="model"
			:disabled="disabled"
			class="select"
		>
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
@import "@/assets/variables";

.select {
	background-color: $bg-color;
	display: block;
	width: 100%;
	padding: 8px 15px;
	border: 1px solid $border-color;
	border-radius: $border-radius;
	outline: none;
	transition: all 0.2s;
	appearance: none;

	&:focus {
		box-shadow: 0 0 0 4px rgba($primary-color, 0.4);
	}
	&[disabled] {
		cursor: not-allowed;
		opacity: 0.4;
	}
}

.select__wrapper {
	position: relative;
	margin-bottom: 1em;
}
</style>
