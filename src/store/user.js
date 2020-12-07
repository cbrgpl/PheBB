import firebase from 'firebase/app';

import { User } from './user_help.js';





export default {
	state:{
		user: null,
		requestedUser: null,
		adminToken: null,
		requestedUsers: null,
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
		setRequestedUser(state, {data, email}) {
			state.requestedUser = new User({
				id: undefined,
				email: email,
				firebaseUser: undefined,
			});
			state.requestedUser.updateUserData(data)
		},
		setAdminToken(state, payload) {
			state.adminToken = payload;
		},
		setRequestedUsers(state, payload) {
			state.requestedUsers = payload;
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
		async setUserFirestoreData({commit}, {userData, email}) {
			commit('clearError');
			commit('setLoading', true);
			try {
				const db = firebase.firestore();

				// Ставим дефолтную роль user
				userData.role = 'user';
				
				// this.getters.user.firebaseUser.email
				db.collection('users').doc(email).set(userData, {merge: true})

				commit('updateUserData', userData);
				commit('setLoading', false);

			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error;
			}
		},
		loggedUser({commit}, user) {
			commit('setUser', user);
			this.dispatch('updateUserData', user.email);
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
				const docRef = await db.collection("users").doc(user.email).get();

				console.log(docRef.exists, docRef.data());

				if (!docRef.exists)
					throw {code: 'firestore/user-not-exists'};
				
				this.dispatch('updateUserData', user.email);
				
				commit('setLoading', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.code);
				throw error;
			}
		},
		async updateUserData({commit}, email) {
			const db = firebase.firestore();
			const docRef = db.collection("users").doc(email);
			const userData = await docRef.get();
			const data = userData.data();

			if (data != undefined)
				commit('updateUserData', data);

		},
		async logoutUser({commit}) {
			firebase.auth().signOut();
			commit('logoutUser', null);

		},
		async requestUserData({commit}, email) {
			commit('clearError');
			commit('setLoading', true);
			try {
				if (email.length === 0)
					throw {code: 'validation/not-valid-email'}

				const firestore = firebase.firestore();

				const docRef = await firestore.collection("users").doc(email).get();

				// Показываю админу что такого челика нет
				if (!docRef.exists)
					throw {code: 'firestore/user-not-exists'};

				// иначе ставлю запрашиваемого челика
				commit('setRequestedUser', {
					data: docRef.data(), 
					email: email,
				});
				
				
				commit('setLoading', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.code);
				console.error('message ', error.message);
				console.error('code ', error.code)
				throw error;
			}
		},
		async getAdminToken({commit}, email) {
			try {
				// Проверяем существует ли токен для этого аккаунта в БД
				const firestore = firebase.firestore();
				const token =  await firestore.collection('tokens').where('email', '==', email).get();

				if (token.empty)
					throw {code: 'access-denided'};

				token.forEach((token) => {
					localStorage.setItem('amtoken', token.id);
					commit('setAdminToken', token.id)
				})

			} catch (error) {
				commit('setError', error.code);
				throw error;
			}
		},
		async loadAllUsers({commit}) {
			commit('clearError');
			commit('setLoading', true);
			try {
				const firestore = firebase.firestore();

				// Загружаем всех юзеров, которые не являются админами
				const usersRef = await firestore.collection('users').where('role', '!=', 'admin').get();
			
				if (usersRef.empty)
					throw {code: 'users-was-not-found'};

				const users = [];
				
				usersRef.forEach((user) => {
					const data = user.data();
					users.push({
						'email': user.id,
						'Фамилия': data.fcs.secondName,
						'Имя': data.fcs.firstName,
						'Отчество': data.fcs.thirdName,
						'Роль': data.role,
					});
				});

				commit('setRequestedUsers', users);
				commit('setLoading', false);
			} catch (error) {
				commit('setError', error.code);
				commit('setLoading', false);
				throw error;
			}
		},
		async setUserRole({commit}, {email, role}) {
			try { 
				const firestore = firebase.firestore();

				const userRef = firestore.collection('users').doc(email);

				// Ставлю обновленные данные
				await userRef.set({
					role: role,
				}, {merge: true})

				
			} catch (error) {
				commit('setError', error.code);
				console.error(error);
				throw error;
			}

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
		requestedUser(state) {
			return state.requestedUser;
		},
		userRole(state) {
			return state.user.firestoreData ? state.user.firestoreData.role : null;
		},
		adminToken(state) {
			return state.adminToken;
		},
		requestedUsers(state) {
			return state.requestedUsers;
		},
	},
}