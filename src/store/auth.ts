import type { Module } from 'vuex'
import type { RootState } from './index'

export interface AuthState {
	users: Record<string, string>
	current: string | null
}

const STORAGE_USERS_KEY = 'app_users'
const STORAGE_CURRENT_KEY = 'app_current'

export const auth: Module<AuthState, RootState> = {
	namespaced: true,

	state: (): AuthState => ({
		users: JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '{}'),
		current: localStorage.getItem(STORAGE_CURRENT_KEY) || null
	}),

	getters: {
		isAuthenticated: state => state.current !== null,
		currentUser: state => state.current
	},

	mutations: {
		REGISTER_USER(state, { email, password }: { email: string; password: string }) {
			state.users = { ...state.users, [email]: password }
			localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(state.users))
		},
		SET_CURRENT(state, email: string) {
			state.current = email
			localStorage.setItem(STORAGE_CURRENT_KEY, email)
		},
		LOGOUT(state) {
			state.current = null
			localStorage.removeItem(STORAGE_CURRENT_KEY)
		}
	},

	actions: {
		register({ state, commit }, payload: { email: string; password: string }) {
			const { email, password } = payload
			if (state.users[email]) {
				return Promise.reject(new Error('Пользователь уже зарегистрирован'))
			}
			commit('REGISTER_USER', { email, password })
			commit('SET_CURRENT', email)
			return Promise.resolve()
		},

		login({ state, commit }, payload: { email: string; password: string }) {
			const { email, password } = payload
			const stored = state.users[email]
			if (!stored || stored !== password) {
				return Promise.reject(new Error('Неверный email или пароль'))
			}
			commit('SET_CURRENT', email)
			return Promise.resolve()
		},

		logout({ commit }) {
			commit('LOGOUT')
		}
	}
}
