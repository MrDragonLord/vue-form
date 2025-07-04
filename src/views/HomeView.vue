<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

const store = useStore()
const router = useRouter()

const isAuth = computed(() => store.getters['auth/isAuthenticated'])
const user = computed(() => store.getters['auth/currentUser'])

const logout = () => {
	store.dispatch('auth/logout')
	router.push('/login')
}
</script>

<template>
	<div v-if="isAuth">
		<p>Привет, {{ user }}!</p>
		<Button @click="logout" className="logout" aria-label="Выйти">Выйти</Button>
		<Button
			@click="logout"
			:icon="DeleteIcon"
			variant="danger"
			className="logout"
			aria-label="Выйти"
		/>
	</div>
</template>
<style scoped lang="scss">
.logout {
	margin-top: 20px;
}
</style>
