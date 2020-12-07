class User {
	constructor({id, email, firebaseUser}) {
		this.id = id;
		this.email = email;
		this.firebaseUser = firebaseUser;

		this.firestoreData = null;
	}

	updateUserData(firestoreData) {
		this.firestoreData = firestoreData
	}
}

class UserAdmin {
	
}


export { User, UserAdmin }