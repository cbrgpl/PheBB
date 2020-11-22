import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: Main,
		name: 'Main',
	},
	{
		path: '/registraion',
		component: () => import('@/views/Registration.vue'),
		name: 'Registarion',
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
