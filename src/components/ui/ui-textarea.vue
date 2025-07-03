<script setup lang="ts">
import { defineProps, defineModel } from 'vue'

interface Props {
	label?:       string
	name:         string
	placeholder?: string
	rows?:        number
}

const {
	label,
	name,
	placeholder,
	rows
} = defineProps<Props>()

const model = defineModel<string>({ default: '' })
</script>

<template>
	<div class="textarea__wrapper">
		<label v-if="label" :for="name">
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
@import "@/assets/variables";

.textarea {
	background-color: $bg-color;
	display: block;
	width: 100%;
	padding: 8px 15px;
	border: 1px solid $border-color;
	border-radius: $border-radius;
	outline: none;
	transition: all 0.2s;
	resize: vertical;

	&:focus {
		box-shadow: 0 0 0 4px rgba($color: $primary-color, $alpha: 0.4);
	}
	&[disabled] {
		cursor: not-allowed;
		opacity: 0.4;
	}
}

.textarea__wrapper {
	position: relative;
	margin-bottom: 1em;
}
</style>
