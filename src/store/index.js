import Vue from 'vue';
import Vuex from 'vuex';

import { loadYmap } from 'vue-yandex-maps';

import user from './user.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		ymaps: Object,
	},
	mutations: {
		setYmap(state, ymaps) {
			state.ymaps = ymaps;
		},
	},
	actions: {
		async ymapAction(store) {
			await loadYmap({ ...{
				apiKey: 'b3a57652-f985-4341-b678-6ab29a39d09a',
				lang: 'ru_RU',
				coordorder: 'latlong',
				controls: ['geolocationControl'],
				version: '2.1',
			}, debug: true });
			// eslint-disable-next-line no-undef
			store.commit('setYmap', ymaps);
		},
	},
	getters: {
		ymapsGet(state) {
			return state.ymaps;
		},
	},
	modules: {
		user,
	},
});
