<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { RouterView } from 'vue-router'

const store = useStore()

const isAuth = computed(() => store.getters['auth/isAuthenticated'])
</script>

<template>
	<div class="container">
		<nav class="nav">
			<RouterLink to="/">Главная</RouterLink>
			<RouterLink to="/question">Опрос</RouterLink>
			<template v-if="!isAuth">
				<RouterLink to="/login">Авторизация</RouterLink>
				<RouterLink to="/register">Регистрация</RouterLink>
			</template>
		</nav>
		<RouterView />
	</div>
</template>

<style scoped lang="scss">
.nav {
	display: flex;
	gap: 20px;
	padding: 20px 0;

	a:hover {
		text-decoration: underline;
	}
}
</style>
