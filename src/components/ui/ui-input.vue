<script setup lang="ts">
import { computed, defineModel, ref } from 'vue'

interface Props {
	label?:       string
	name:         string
	type?:        'text' | 'password' | 'email' | 'number' | 'date' | 'datetime-local'
	placeholder?: string
}

const {
	label,
	name,
	placeholder,
	type
} = defineProps<Props>()

const model = defineModel<string | number>({ default: '' })

const showPassword = ref(false)
const inputType = computed(() =>
	type === 'password'
		? (showPassword.value ? 'text' : 'password')
		: type
)

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value
}
</script>

<template>
	<div class="input__wrapper">
		<label v-if="label" :for="name">{{ label }}</label>
		<input
			:id="name"
			:name="name"
			:type="inputType"
			:placeholder="placeholder"
			v-model="model"
			class="input"
		/>
		<button
			v-if="type === 'password'"
			type="button"
			class="eye__icon"
			@click="togglePasswordVisibility"
		>
			{{ showPassword ? '👁️' : '🙈' }}
		</button>
	</div>
</template>


<style lang="scss" scoped>
@import "@/assets/variables";

.input {
	background-color: $bg-color;
	display: block;
	width: 100%;
	padding: 8px 15px;
	border: 1px solid $border-color;
	border-radius: $border-radius;
	outline: none;
	transition: all 0.2s;

	&__wrapper { position: relative; }

	&:focus {
		box-shadow: 0 0 0 4px rgba($color: $primary-color, $alpha: 0.4);
	}
	&[disabled] { cursor: not-allowed; opacity: 0.4; }
}

.eye__icon {
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	font-size: 18px;
	cursor: pointer;
}
</style>
