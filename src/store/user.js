import firebase from 'firebase/app';

export default {
	state:{
		user: null,
	},
	mutation: {},
	actions: {
		async registerUser({commit}, {email, password}) {
			const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
			console.log(user);
			console.log(commit);
		},
	},
	getters: {
		user(state) {
			return state.user;
		},
		checkUser(state) {
			return state.user !== null;
		},
	},
}