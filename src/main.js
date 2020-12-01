import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';


import { BootstrapVue, BootstrapVueIcons  } from 'bootstrap-vue';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/storage';

import YmapPlugin from 'vue-yandex-maps';

import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(YmapPlugin, settings);
Vue.use(Vuelidate)
Vue.use(VueMask);


const settings = {
	apiKey: 'b3a57652-f985-4341-b678-6ab29a39d09a',
	lang: 'ru_RU',
	coordorder: 'latlong',
	controls: ['geolocationControl'],
	version: '2.1',
}

Vue.config.productionTip = false;


new Vue({
	router,
	store, 
	created() {
		const firebaseConfig = {
			apiKey: "AIzaSyCsPZmGdp1UIEnmL4A5ghIu-t2VR3u1U8w",
			authDomain: "vuebb-c0e49.firebaseapp.com",
			databaseURL: "https://vuebb-c0e49.firebaseio.com",
			projectId: "vuebb-c0e49",
			storageBucket: "vuebb-c0e49.appspot.com",
			messagingSenderId: "1033254387396",
			appId: "1:1033254387396:web:0d363d3e5c0ddb568f5391",
		};
		
		firebase.initializeApp(firebaseConfig);
		firebase.auth().onAuthStateChanged((user) => {
			user ? 
				user.emailVerified ? 
					this.$store.dispatch('loggedUser', user)
					: null 
				: null
		});
	},

	render: (h) => h(App),
}).$mount('#app');