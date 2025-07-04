<script setup lang="ts">
import { computed, defineModel, ref } from 'vue'

interface Props {
	label?: string
	name: string
	type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'datetime-local'
	placeholder?: string
}

const { label, name, placeholder, type } = defineProps<Props>()

const model = defineModel<string | number>({ default: '' })

const showPassword = ref(false)
const inputType = computed(() =>
	type === 'password' ? (showPassword.value ? 'text' : 'password') : type
)

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value
}
</script>

<template>
	<div class="input__wrapper">
		<slot name="label">
			<label v-if="label" :for="name">{{ label }}</label>
		</slot>
		<div class="input__container">
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
				class="input__eye"
				@click="togglePasswordVisibility"
			>
				{{ showPassword ? '👁️' : '🙈' }}
			</button>
		</div>

		<div class="input__hint">
			<slot name="hint" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/variables';

.input {
	background-color: variables.$bg-color;
	display: block;
	width: 100%;
	padding: 8px 15px;
	border: 1px solid variables.$border-color;
	border-radius: variables.$border-radius;
	outline: none;
	transition: all 0.2s;

	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	&__container {
		position: relative;
		display: flex;
		align-items: center;
	}

	&__hint {
		margin-top: 4px;
		font-size: 0.875rem;
		color: rgba($color: variables.$text-color, $alpha: 0.6);
	}

	&__eye {
		position: absolute;
		right: 10px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.125rem;
	}

	&__icon {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		font-size: 18px;
		cursor: pointer;
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
