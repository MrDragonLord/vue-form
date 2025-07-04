import { createStore } from 'vuex'
import { auth, type AuthState } from '@/store/auth.ts'

export interface RootState {
	auth: AuthState
}

const store = createStore({
	modules: {
		auth
	}
})

export default store
