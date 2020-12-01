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
				firebaseUser: firebase.auth().currentUser,
			});
		},
		logoutUser(state, payload) {
			state.user = payload;
		},
		updateUserData(state, payload) {
			state.user.updateUserData(payload);
		},
	},
	actions: {
		async registerUser({commit}, {email, password}) {
			commit('clearError');
			commit('setLoading', true);
			try {
				const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
				const user = res.user;
				
				await user.sendEmailVerification();

				commit('setLoading', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error;
			}
		},
		async setUserFirestoreData({commit}, userData) {
			commit('clearError');
			commit('setLoading', true);
			try {
				const db = firebase.firestore();

				const data = {
					address: {
						country: userData.address.country,
						city: userData.address.city,
						street: userData.address.street,
						apartmentNumber: userData.address.apartmentNumber,
					},
					phoneNumber: userData.phoneNumber,
					fcs: {
						firstName: userData.fcs.firstName,
						secondName: userData.fcs.secondName,
						thirdName: userData.fcs.thirdName,
					},
				}

				db.collection('users').doc(this.getters.user.firebaseUser.uid).set(data, {merge: true})

				commit('updateUserData', {
					country: userData.address.country,
					city: userData.address.city,
					street: userData.address.street,
					apartmentNumber: userData.address.apartmentNumber,
					phoneNumber: userData.phoneNumber,
					firstName: userData.fcs.firstName,
					secondName: userData.fcs.secondName,
					thirdName: userData.fcs.thirdName,
				})
				commit('setLoading', false);

			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error;
			}
		},
		loggedUser({commit}, user) {
			commit('setUser', user);
			this.dispatch('updateUserData', user.uid);
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
				const user = res.user;

				if (!user.emailVerified) {
					user.sendEmailVerification();
					firebase.auth().signOut();
					throw {code: 'auth/user-unverified'}
				}

				commit('setUser', user);


				// делаем запрос на БД, если приходит ничего, то ридерект на страницу дорегистрации без авторизации
				const db = firebase.firestore();
				const docRef = db.collection("users").doc(user.uid);

				const doc = await docRef.get();
				if (!doc.exists)
					throw {code: 'firestore/user-not-exists'};
				
				this.dispatch('updateUserData', user.uid);
				
				commit('setLoading', false);
			} catch (error) {
				commit('setError', error.code);
				console.error('message ', error.message);
				console.error('code ', error.code)
				throw error;
			}
		},
		async updateUserData({commit}, uid) {
			const db = firebase.firestore();
			const docRef = db.collection("users").doc(uid);
			let userData = await docRef.get();
			userData = userData.data();

			const data = {
				country: userData.address.country,
				city: userData.address.city,
				street: userData.address.street,
				apartmentNumber: userData.address.apartmentNumber,
				phoneNumber: userData.phoneNumber,
				firstName: userData.fcs.firstName,
				secondName: userData.fcs.secondName,
				thirdName: userData.fcs.thirdName,
			}

			commit('updateUserData', data);

		},
		async logoutUser({commit}) {
			firebase.auth().signOut();
			commit('logoutUser', null);

		},
	},
	getters: {
		user(state) {
			return state.user;
		},
		checkUser(state) {
			return state.user !== null;
		},
		checkRegCompletion(state) {
			return state.user ? state.user.firestoreData !== null : false;
		},
	},
}