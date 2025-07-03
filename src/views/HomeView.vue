<script setup lang="ts">
import { TextArea } from '@/components/ui'
import { ref } from 'vue'

const textarea = ref<string>('')
</script>

<template>
	<div>
		<TextArea name="test" v-model="textarea"></TextArea>
	</div>
</template>
