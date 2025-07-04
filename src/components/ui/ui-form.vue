<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
	title: string
}

defineProps<Props>()

const emit = defineEmits<{
	(e: 'submit', event: Event): void
}>()

function handleSubmit(event: Event) {
	emit('submit', event)
}
</script>

<template>
	<form class="form" @submit.prevent="handleSubmit" v-bind="$attrs">
		<h2 class="form__title">{{ title }}</h2>
		<slot />
	</form>
</template>

<style lang="scss" scoped>
@use '@/assets/variables';

.form {
	max-width: 500px;
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 32px 40px;
	border: 1px solid variables.$border-color;
	border-radius: variables.$border-radius;
	width: 100%;
	margin: 0 auto;

	&__title {
		text-align: center;
		text-transform: uppercase;
		font-weight: 400;
		font-size: 24px;
	}
}
</style>
