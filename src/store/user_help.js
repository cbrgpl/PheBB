export default class User {
	constructor({id, email, firebaseUser}) {
		this.id = id;
		this.email = email;
		this.firebaseUser = firebaseUser;

		this.firestoreData = null;
	}

	updateUserData(firestoreData) {
		this.firestoreData = {};
		for (const key in firestoreData)
			this.firestoreData[key] = firestoreData[key];
	}
}