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
				beforeEnter(to, from, next) {
					store.dispatch('clearError');
					next();
				},
			},
			{
				name: 'SignIn',
				path: 'sign-in',
				component: () => import('@/components/auth/sign-in.vue'),
				beforeEnter(to, from, next) {
					store.dispatch('clearError');
					next();
				},
			},
		],
	},
	{
		name: 'RegCompletion',
		path: '/reg-completion',
		component: () => import('@/views/Reg-completion.vue'),
		beforeEnter(to, from, next) {
			store.getters.checkRegCompletion ? next({name: 'Home'}) : next(true);
		},
	},
	{
		path: '/home',
		component: () => import('@/views/Home.vue'),
		name: 'Home',
		beforeEnter(to, from, next) {
			store.getters.checkUser ? next() : next({name: 'Main'})
		},
	},
	{
		path: '/ampanel',
		component: () => import('@/views/Admin-home.vue'),
		beforeEnter(to, from, next) {
			// Если токен есть в localStorage, то запускаем
			const token = localStorage.getItem('amtoken');
			if (token) {
				// Запоминаем токен, чтобы потом проверить его с тем, что придет с сервера
				to.params.token = token;
				next();			
				return;
			}

			store.dispatch('getAdminToken', store.getters.user.email)
				.then(() => {
					next();
					localStorage.setItem('amtoken', store.getters.adminToken);
				})
				.catch((error) => {
					console.error(error);
					next({name: 'Main'});
				})
		},
		children: [
			{
				path: 'users',
				component: () => import('@/components/admin/users.vue'),
			},
			{
				name: 'Admin',
				path: 'categories',
				component: () => import('@/components/admin/categories.vue'),
			},
			{
				path: 'goods',
				component: () => import('@/components/admin/goods.vue'),
			},
			{
				path: 'roles',
				component: () => import('@/components/admin/roles.vue'),
			},
		],
	},
	{
		path: '/*',
		component: () => import('@/views/nf404.vue'),
	},

];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
