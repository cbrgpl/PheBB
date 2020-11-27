import firebase from 'firebase/app';

import User from './user_help.js';

export default {
	state:{
		user: null,
	},
	mutations: {
		setUser(state, payload) {
			state.user = new User({
				id: payload.uid, 
				email: payload.email,
			});
		},
		logoutUser(state, payload) {
			state.user = payload;
		},
	},
	actions: {
		async registerUser({commit}, {email, password}) {
			commit('clearError');
			commit('setLoading', true);
			try {
				const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
				commit('setUser', res.user);

				commit('setLoading', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error;
			}
		},
		loggedUser({commit}, user) {
			commit('setUser', user);
		},
		async signIn({commit}, {email, password, remember}) {
			commit('clearError');
			commit('setLoading', true);
			try {
				// Ставим тип соединения сессионным
				if (!remember)
					await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
				else 
					await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

				const res = await firebase.auth().signInWithEmailAndPassword(email, password); 
				commit('setUser', res.user);
				commit('setLoading', false);
			} catch (error) {
				commit('setError', error.code);
			}

			

		},
		async logoutUser({commit}) {
			firebase.auth().signOut();
			commit('logoutUser', null);

		},
	},
	getters: {
		user(state) {
			console.log(state.user);
			return state.user;
		},
		checkUser(state) {
			return state.user !== null;
		},
	},
}