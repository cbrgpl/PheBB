<template>
	<div class="d-flex align-items-center justify-content-center h-100">
		<b-card title="admin-nav" no-body class="admin-card">
			<b-card-title class="d-flex justify-content-between align-items-center p-2">
				<span>Личный кабинет администратора для управления всяким</span>
				<b-button variant="success" :to="{name: 'Main'}">
					Вернуться на сайт
				</b-button> 
			</b-card-title>

			<b-card-header header-tag="nav">
				<b-nav card-header tabs>
					<b-nav-item
						v-for="tab of navTabs"
						:key="tab.name"
						:to="tab.to" active-class="admin-link--active"
						link-classes="link admin-link">
						{{ tab.name }}
					</b-nav-item>
				</b-nav>
			</b-card-header>

			<b-card-body class="text-center admin-body">
				<router-view />
			</b-card-body>
		</b-card>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'AdminHome',
	data() {
		return {
			isBusy: true,
			navTabs: [
				{
					name: 'Категория', 
					to: '/ampanel/categories',
				},
				{
					name: 'Пользователи',
					to: '/ampanel/users',
				}, 
				{
					name: 'Роли пользователей',
					to: '/ampanel/roles',
				},
				{
					name: 'Товары',
					to: '/ampanel/goods',	
				},

			],
		}
	},
	computed: {
		...mapGetters(['user', 'adminToken']),
	},
	watch: {
		async user() {
			// Срабатывает в случае, если человек вбивает адрес в адресную строку браузера или перезагружается страницу
			await this.$store.dispatch('getAdminToken', this.$store.getters.user.email);

			if (this.adminToken !== this.$route.params.token)
				this.$router.push({name: 'Home'});
		},

	},
	mounted() {
		this.$store.dispatch('setNavVisible', false);
	},
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('setNavVisible', true);
		next();
	},

}
</script>

<style lang="scss">

.admin-card {
	background: $second;
	width: 90%;
	height: 90vh;
}


.admin-body {
	height: 100%;
	overflow: auto;
}

.admin-link {
	border: none !important;
	border-bottom: 2px solid transparent i !important;
	padding-bottom: rem(4px);

	&--active {
		border-bottom: 3px solid $link-color !important;
	}
}

</style>