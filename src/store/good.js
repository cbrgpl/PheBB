import firebase from 'firebase/app';
import Good from './good_help.js';

export default {
	state: {
		requestedGood: null,
		requestedGoodsArray: [],
	},
	mutations: {
		addGoodToRequestedArray(state, {categoryID, name, price, id}) {
			state.requestedGoodsArray.push(new Good({
				categoryID: categoryID, 
				name: name, 
				price:price, 
				goodID: id,
			}));
		},
		clearRequstedGoodsArray(state) {
			state.requestedGoodsArray = [];
		},
		setRequestedGood(state, {categoryID, name, price, id}) {
			state.requestedGood = new Good({
				categoryID: categoryID, 
				name: name, 
				price:price, 
				goodID: id,
			});
		},
		clearRequestedGood(state) {
			state.requestedGood = null;
		},
	},
	actions: {
		async createGood({commit}, {categoryName, name, price}) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const firestore = firebase.firestore();
                
				await this.dispatch('findCategoryByName', categoryName);
                
				await firestore.collection('goods').doc().add({
					categoryID: this.getters.findedCategoryID,
					name: name,
					price: price,
				});

				commit('setLoading', false);
			} catch (error) {
				commit('setError', error.code);
				commit('setLoading', false);
				throw error;
			}
		},
		async deleteGood({commit}, goodID) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const firestore = firebase.firestore();
				firestore.collection('goods').doc(goodID).delete();		

				commit('setLoading', false);
			} catch (error) {
				commit('setError', error.code);
				commit('setLoading', false);
				throw error;
			}
		},
		async changeGood({commit}, {goodID, newName, newPrice, newCategoryID}) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const firestore = firebase.firestore();

				await firestore.collection('goods').doc(goodID).set({
					categoryID: newCategoryID,
					name: newName,
					price: newPrice,
				}, {merge: true});

				commit('setLoading', false);
			} catch (error) {
				commit('setError', error.code);
				commit('setLoading', false);
				throw error;
			}
		},
		async requestGood({commit}, goodID) {
			commit('clearError')
			commit('setLoading', true)
			commit('clearRequestedGood');
			try {
				const firestore = firebase.firestore();

				const good = await firestore.collection('goods').doc(goodID).get();
				
				if (!good.exists)
					throw {code: 'firestore/good-does-not-exists'};
				const goodData = good.data();
				commit('setRequestedGood', {
					categoryID: goodData.categoryID,
					name: goodData.name,
					price: goodData.price,
					id: good.id,
				});
				commit('setLoading', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.code);
				throw error;
			}
		},
		async requestManyGoods({commit}, goodIDArray) {
			commit('clearError');
			commit('setLoading', true);
			try {
				const firestore = firebase.firestore();

				await goodIDArray.forEach(async (goodID) => {
					const good = await firestore.collection('goods').doc(goodID).get();
					const goodData = good.data();
					commit('addGoodToRequestedArray', {
						categoryID: goodData.categoryID,
						name: goodData.name,
						price: goodData.price,
						id: good.id,
					});
				});
				commit('setLoading', false);
			} catch (error) {
				commit('setError', error.code);
				commit('setLoading', false);				
				throw error;
			}
		},
		clearRequestedGood({commit}) {
			commit('clearRequestedGood');
		},
		clearRequstedGoodsArray({commit}) {
			commit('clearRequstedGoodsArray');
		},
	},
	getters: {
		checkRequestedArrayEmpty(state) {
			return state.requestedGoodsArray.length !== 0;
		},
		checkRequestedGood(state) {
			return state.requestedGood !== null;
		},
		requestedGood(state) {
			return state.requestedGood;
		},
	},
}