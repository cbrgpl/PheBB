import Vue from 'vue';
import Vuex from 'vuex';

import common from './common.js'
import user from './user.js';
import ymaps from './ymaps.js'

Vue.use(Vuex);

export default new Vuex.Store({
	
	modules: {
		common,
		user,
		ymaps,
	},
});
