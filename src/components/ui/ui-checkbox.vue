<script setup lang="ts">
import { defineProps, defineModel } from 'vue'

interface Props {
	label?: string
	name: string
	disabled?: boolean
	value?: string | number | boolean
	trueValue?: string | number | boolean
	falseValue?: string | number | boolean
}

const { label, name, disabled, trueValue, falseValue } = defineProps<Props>()

const model = defineModel<boolean | string | number>({
	default: false
})
</script>

<template>
	<div class="checkbox" :class="{ 'checkbox--disabled': disabled }">
		<input
			class="checkbox__native"
			type="checkbox"
			:id="name"
			:name="name"
			v-model="model"
			:disabled="disabled"
			:true-value="trueValue ?? true"
			:false-value="falseValue ?? false"
		/>
		<label :for="name" class="checkbox__label">
			<span class="checkbox__box"></span>
			<span class="checkbox__text">{{ label }}</span>
		</label>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/variables';

.checkbox {
	display: inline-flex;
	align-items: center;
	position: relative;
	cursor: pointer;

	&--disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	&__native {
		position: absolute;
		width: 0;
		height: 0;
		margin: 0;
		padding: 0;
		opacity: 0;
		pointer-events: none;
	}

	&__label {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
	}

	&__box {
		width: 16px;
		height: 16px;
		border: 2px solid variables.$border-color;
		border-radius: 4px;
		margin-right: 8px;
		position: relative;
		transition:
			background-color 0.2s,
			border-color 0.2s;

		&::after {
			content: '';
			position: absolute;
			left: 3px;
			top: 0;
			width: 3px;
			height: 8px;
			border: solid variables.$simple-color;
			border-width: 0 2px 2px 0;
			transform: rotate(45deg);
			opacity: 0;
			transition: opacity 0.2s;
		}
	}

	&__native:checked + .checkbox__label .checkbox__box {
		background-color: variables.$primary-color;
		border-color: variables.$primary-color;
	}
	&__native:checked + .checkbox__label .checkbox__box::after {
		opacity: 1;
	}

	&__text {
		user-select: none;
	}
}
</style>
