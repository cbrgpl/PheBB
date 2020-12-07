import firebase from 'firebase/app';

export default {
	state:{
		categories: [],
		requestedParentCategory: null,
		findedCategoryID: null,
	},
	mutations: {
		setCategories(state, payload) {
			state.categories = payload;
		},
		clearRequestedParentCategory(state) {
			state.requestedParentCategory = null;
		},
		setRequestedParentCategory(state, {name, id}) {
			state.requestedParentCategory = {
				name: name,
				id: id,
			}
		},
		setFindedCategoryID(state, newCategoryID) {
			state.findedCategoryID = newCategoryID;
		},
	},
	actions: {
		async removeFromChildren({commit}, {lastParentName, categoryID}) {
			try {
				const firestore = firebase.firestore();
				const lastParent = await firestore.collection('categories').where('name', '==', lastParentName).get();

				lastParent.forEach((parent) => {
					const parentChildren = parent.data().children;
					const indexOfCategoryID = parentChildren.indexOf(categoryID);

					parentChildren.splice(indexOfCategoryID, 1);

					firestore.collection('categories').doc(parent.id).set({
						children: parentChildren,
					}, {merge: true});
				})

			} catch (error) {
				commit('setError', error.code);
				throw error;
			}
		},

		async addToChildren({commit}, {newParentName, categoryID}) {
			try {
				if (newParentName === '') {
					commit('clearRequestedParentCategory');
					return;
				}

				const firestore = firebase.firestore();
				const newParent = await firestore.collection('categories').where('name', '==', newParentName).get();

				newParent.forEach((parent) => {
					const parentData = parent.data();
					const parentChildren = parentData.children;
					parentChildren.push(...categoryID);
					commit('setRequestedParentCategory', {name: parentData.name, id: parent.id})
					firestore.collection('categories').doc(parent.id).set({
						children: parentChildren,
					}, {merge: true});
				})
			} catch (error) {
				commit('setError', error.code);
				throw error;
			}
		},		
		async updateCategory({commit}, {newParentName, categoryID, categoryNewName}) {
			try {
				const firestore = firebase.firestore();
				
				if (!this.getters.requestedParentCategory & newParentName !== '') {
					// Если категории не было и она появилась
					
					const newParentRef = await firestore.collection('categories').where('name', '==', newParentName).get();

					if (newParentRef.empty & newParentName != '')
						throw { code: 'firestore/new-parent-does-not-exists' };

					this.dispatch('addToChildren', {newParentName: newParentName, categoryID: categoryID})

				} else if (this.getters.requestedParentCategory)
					if (this.getters.requestedParentCategory.name !== newParentName) {
						// Если категория была, но она изменилась 

						const newParentRef = await firestore.collection('categories').where('name', '==', newParentName).get();

						if (newParentRef.empty & newParentName != '')
							throw {code: 'firestore/new-parent-does-not-exists'}

						this.dispatch('removeFromChildren', {lastParentName: this.getters.requestedParentCategory.name, categoryID})

						this.dispatch('addToChildren', {newParentName: newParentName, categoryID: categoryID})
					}	
				
				// Просто меняем имя текущей категории
				firestore.collection('categories').doc(categoryID).set({
					name: categoryNewName,
				}, {merge: true})
			} catch (error) {
				commit('setError', error.code);
				throw error;
			}
		},
		async requestCategories({commit}) { 
			commit('clearError');
			try {
				const firestore = firebase.firestore();
				const categories = [];

				const querySnapshot = await firestore.collection('categories').get();
				
				querySnapshot.forEach((doc) => { 
					categories.push({
						id: doc.id,
						data: doc.data(),
					}) 
				});
				commit('setCategories', categories);
			} catch (error) {
				commit('setError', error.message);
				throw error;
			}
            
		},
		async createCategory({commit}, {parentName, categoryName}) {
			try {
				const firestore = firebase.firestore();

				// Проверяем не существует ли категория с таким именем уже
				const categoryRef = await firestore.collection('categories').where('name', '==', categoryName).get();

				// Если не пусто
				if (!categoryRef.empty)
					throw {code: 'firestore/category-already-exists'};

		
				// Добавляем новую категорию в бд
				const newCategoryRef = await firestore.collection('categories').add({
					name: categoryName,
					children: [],
				});


				// Получаем реф на документ родителя
				const parentCategoryRef = await firestore.collection('categories').where('name', '==', parentName).get();
				
				// Если для категории указан родитель
				if (!parentCategoryRef.empty) {
					let parentCategoryID;
					let parentCategoryChildren;

					parentCategoryRef.forEach((category) => {
						parentCategoryID = category.id;
						parentCategoryChildren = category.data().children;
					})
					parentCategoryChildren.push(newCategoryRef.id);

					// Обновляем детей для категории
					await firestore.collection('categories').doc(parentCategoryID).set({
						children: newCategoryRef.id,
					}, {merge: true});
				}	
			} catch (error) {
				commit('setError', error.code);
				throw error;
			}
		},
		async findCategoryParent({commit}, categoryID) {
			try {
				
				const firestore = firebase.firestore();

				// Ищем категорию, где среди массива дочерних категорий есть нужная
				const categoryParentRef = await firestore.collection('categories').where('children', 'array-contains', categoryID).get();
				
				// Если пусто, то оставляем нал
				if (categoryParentRef.empty) {
					commit('clearRequestedParentCategory');
					return
				}

				// Если нет, то устанавливаем запрашиваемую категорию
				categoryParentRef.forEach((category) => {
					commit('setRequestedParentCategory', {name: category.data().name, id: category.id});
				})

			} catch (error) {
				commit('setError', error.code);
				throw error;
			}
		},
		async deleteCategory({commit}, categoryID) {
			try {
				const firestore = firebase.firestore();

				const category = await firestore.collection('categories').doc(categoryID).get();
				const categoryChildren = category.data().children;

				const parent = await firestore.collection('categories').where('children', 'array-contains', categoryID).get();

				if (parent.empty) {
					firestore.collection("categories").doc(category.id).delete().then(() => {
						this.dispatch('requestCategories');
					});
					return
				}

				// Устанавливаю родителю, если он есть, детей удаляемых категорий в массив children
				parent.forEach(async (parent) => {
					const parentData = parent.data();
					await this.dispatch('addToChildren', {newParentName: parentData.name, categoryID: categoryChildren});
					await firestore.collection("categories").doc(category.id).delete();
					this.dispatch('requestCategories');
				})

			} catch (error) {
				commit('setError', error.code);
				throw error;
			}
		},
		setFirestoreListener({commit}) {
			commit('setLoading', true);
			const firestore = firebase.firestore();
			firestore.collection("categories").onSnapshot(() => {
				this.dispatch('requestCategories')
					.then(() => {
						commit('setLoading', false);
					})
					.catch((error) => {
						commit('setError', error.code);
						commit('setLoading', false);
					});
			});
		},
		async findCategoryByName({commit}, categoryName) {
			commit('clearError')
			try {
				const firestore = firebase.firestore();

				const category = await firestore.collection('categories').where('name', '==', categoryName).get();

				if (category.empty)
					throw {code: 'category-does-not-exists'};
				
				category.forEach((category) => {
					commit('setFindedCategoryID', category.id);
				})
			} catch (error) {
				commit('setError', error.code);
				throw error;
			}
		},
	},
	getters: {
		categories(state) {
			return state.categories;
		},
		requestedParentCategory(state) {
			return state.requestedParentCategory;
		},
		findedCategoryID(state) {
			return state.findedCategoryID;
		},
	},
}