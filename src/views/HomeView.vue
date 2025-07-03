<script setup lang="ts">
import { TextArea, Select } from '@/components/ui'
import { ref } from 'vue'

const textarea = ref<string>('')
const select = ref<string>('')
const options = [
	{
		label: 'test',
		value: 'test',
	},
	{
		label: 'test2',
		value: 'test2',
	},
]
</script>

<template>
	<div>
		<TextArea name="test" v-model="textarea"></TextArea>
		<Select name="Testt" :options="options" v-model="select" placeholder="Test" />
	</div>
</template>
