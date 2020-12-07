export default {
	state:{
		loading: false,
		error: null,
		routeTo: null,
		NavVisible: true,
	},
	mutations: {
		setLoading(state, payload) {
			state.loading = payload;
		},
		setError(state, error) {
			state.error = error;
		},
		clearError(state) {
			state.error = null;
		},
		routeTo(state, payload) {
			state.routeTo = payload;
		},
		setNavVisible(state, payload) {
			state.NavVisible = payload;
		},
	},
	actions: {
		setLoading({commit}, payload) {
			commit('setLoading', payload);
		},
		setError({commit}, error) {
			console.error(error);
			commit('setError', error);
		},
		clearError({commit}) {
			commit('clearError');
		},
		setNavVisible({commit}, payload) {
			commit('setNavVisible', payload);
		},
	},
	getters: {
		loading(state) {
			return state.loading;
		},
		error(state) {
			return state.error;
		},
		isError(state) {
			return state.error !== null;
		},
		routeTo(state) {
			return state.routeTo;
		},
		navVisible(state) {
			return state.NavVisible;
		},
	},
}