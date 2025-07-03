<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'

interface Props {
	label?:       string
	name:         string
	modelValue:   string
	placeholder?: string
	rows?:        number
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	rows:       3
})

const { modelValue } = toRefs(props)

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const innerValue = ref(modelValue.value)

watch(modelValue, (val) => {
	innerValue.value = val
})

watch(innerValue, (val) => {
	emit('update:modelValue', val)
})
</script>

<template>
	<div class="textarea__wrapper">
		<label v-if="props.label" :for="props.name">
			{{ props.label }}
		</label>

		<textarea
			:id="props.name"
			:name="props.name"
			v-model="innerValue"
			:placeholder="props.placeholder"
			:rows="props.rows"
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
