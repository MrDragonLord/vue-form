<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import type { Component } from 'vue'

interface Props {
	to?: RouteLocationRaw
	isBusy?: boolean
	ariaLabel?: string
	icon?: Component
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
	variant?: 'outline' | 'primary' | 'danger'
	className?: string
}

const {
	to,
	isBusy   = false,
	ariaLabel,
	icon,
	disabled = false,
	type     = 'button',
	variant  = 'primary',
	className= ''
} = defineProps<Props>()

const variantClass = computed(() => (variant ? `button__${variant}` : ''))

const emit = defineEmits<{
	(e: 'click', event: Event): void
}>()

const handleClick = (event: Event) => {
	if (!isBusy && !disabled) {
		emit('click', event)
	}
}
</script>

<template>
	<component
		:is="to ? RouterLink : 'button'"
		v-bind="to ? { to: to } : { type: type }"
		:aria-label="ariaLabel"
		:disabled="!to && (disabled || isBusy)"
		:class="['button', { loading: isBusy }, variantClass, className, 'button__text']"
		@click="handleClick"
	>
		<template v-if="icon">
			<span class="icon">
				<component :is="icon" />
			</span>
		</template>
		<slot />
	</component>
</template>

<style lang="scss" scoped>
@use '@/assets/variables';

.button {
	border: none;
	display: flex;
	align-items: center;
	gap: 8px;
	border-radius: variables.$border-radius;
	background-color: transparent;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s;

	svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	&__outline {
		background-color: transparent;
		border: 1px solid variables.$primary-color;
		color: variables.$primary-color;
	}

	&__small {
		font-size: variables.$text-sm;
	}

	&__text {
		padding: 8px 20px;
	}

	&__icon {
		padding: 2px 5px;
	}

	&__primary {
		background-color: variables.$primary-color;
		color: variables.$btn-text-color;
	}

	&__danger {
		background-color: variables.$danger-color;
		color: variables.$btn-text-color;
	}

	&:hover {
		&.button__primary {
			background-color: variables.$primary-hover-color;
		}
		&.button__danger {
			background-color: variables.$danger-hover-color;
		}
		&.button__outline {
			background-color: rgba($color: variables.$primary-color, $alpha: 0.1);
		}
	}

	&:disabled,
	&.disabled {
		cursor: not-allowed;
		opacity: 0.4;
		pointer-events: none;
	}
}

.loading {
	position: relative;
	pointer-events: none;
	color: transparent !important;

	&::after {
		content: '';
		position: absolute;
		display: block;
		border-radius: 50%;
		border-left: 2px solid variables.$simple-color;
		border-right-color: transparent;
		border-top-color: transparent;
		height: 1em;
		width: 1em;
		left: calc(50% - (1em / 2));
		top: calc(50% - (1em / 2));
		animation: spinAround 500ms infinite linear;
	}

	@keyframes spinAround {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
}

.icon {
	display: inline-flex;
	align-items: center;
}
</style>
