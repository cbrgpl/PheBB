import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';

import Main from '@/views/Main.vue';

Vue.use(VueRouter);



const routes = [
	{
		path: '/',
		component: Main,
		name: 'Main',
	},
	{
		path: '/auth',
		name: 'Auth',
		component: () => import('@/views/Auth.vue'),
		beforeEnter(to, from, next) {
			const isRedirection = to.name !== 'Auth'; // Всегда будет false
			next(isRedirection ? true : {name: 'SignIn'});
		},
		children: [
			{
				name: 'Registration',
				path: 'registration',
				component: () => import('@/components/auth/registration.vue'),
			},
			{
				name: 'SignIn',
				path: 'sign-in',
				component: () => import('@/components/auth/sign-in.vue'),
			},
		],
	},
	{
		path: '/home',
		component: () => import('@/views/Home.vue'),
		name: 'Home',
		beforeEnter(to, from, next) {
			store.getters.checkUser ? next() : next({name: 'Main'})
		},
	},

];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

// router.beforeEach((to, from, next) => {
// 	if (to.name === 'Auth')
// 		next({name: 'SignIn'})
// 	else next();
// })

export default router;
