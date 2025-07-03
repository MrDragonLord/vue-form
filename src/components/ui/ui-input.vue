<script setup lang="ts">
import { ref, computed, watch, toRefs } from 'vue'

interface Props {
	label?:        string
	name:          string
	type:          'text' | 'date' | 'datetime-local' | 'number' | 'email' | 'password'
	modelValue:    string | number
	placeholder?:  string
}

const props = withDefaults(defineProps<Props>(), {
	type:       'text',
	modelValue: ''
})

const { modelValue } = toRefs(props)

const emit = defineEmits<{
	(e: 'update:modelValue', value: string | number): void
}>()

const innerValue = ref<string | number>(modelValue.value)

watch(modelValue, (val) => {
	innerValue.value = val
})

watch(innerValue, (val) => {
	emit('update:modelValue', val)
})

const showPassword = ref(false)
const inputType = computed(() => {
	return props.type === 'password'
		? (showPassword.value ? 'text' : 'password')
		: props.type
})

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value
}
</script>

<template>
	<div class="input__wrapper">
		<label v-if="props.label" :for="props.name">
			{{ props.label }}
		</label>

		<input
			id="props.name"
			name="props.name"
			v-model="innerValue"
			:type="inputType"
			:placeholder="props.placeholder"
			class="input"
		/>

		<button
			v-if="props.type === 'password'"
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
