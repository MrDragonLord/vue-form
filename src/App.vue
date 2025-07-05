<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { RouterView } from 'vue-router'
import { Button } from '@/components/ui'

const store = useStore()

const isAuth = computed(() => store.getters['auth/isAuthenticated'])
</script>

<template>
	<div class="container">
		<nav class="nav">
			<RouterLink to="/">Главная</RouterLink>
			<template v-if="!isAuth">
				<RouterLink to="/login">Авторизация</RouterLink>
				<Button :asChild="true">
					<RouterLink to="/register">Регистрация</RouterLink>
				</Button>
			</template>
			<template v-else>
				<Button :asChild="true">
					<RouterLink to="/question">Опрос</RouterLink>
				</Button>
			</template>
		</nav>
		<RouterView />
	</div>
</template>

<style scoped lang="scss">
.nav {
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 20px 0;

	a:hover {
		text-decoration: underline;
	}
}
</style>
