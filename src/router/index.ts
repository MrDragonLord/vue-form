import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue')
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('../views/RegisterView.vue')
		},
		{
			path: '/question',
			name: 'question',
			component: () => import('../views/QuestionView.vue')
		}
	]
})

export default router
