<template>
	<b-form class="d-flex justify-space flex-column mx-auto mt-5" @submit.prevent="onSubmit" @keypress.enter.prevent>
		<b-form-group
			id="email-group"
			label="Ваш email:"
			label-for="email"
			:state="isError">
			<b-form-input
				id="email" v-model="userLog.email" trim
				type="email" placeholder="Введите email"></b-form-input>
		</b-form-group>
		<b-form-group
			id="password-group"
			label="Ваш пароль:"
			label-for="password"
			:state="isError">
			<b-form-input
				id="password" v-model="userLog.password" trim
				type="password"
				placeholder="Введите пароль"></b-form-input>
		</b-form-group>

		<h5 v-if="isError" class="text-danger text-center">
			{{ formError }}
		</h5>
		<div class="d-flex justify-content-between align-items-center">
			<b-button variant="primary" class="w-50" type="submit">
				Авторизироваться
			</b-button>
			<b-form-checkbox id="remember" v-model="userLog.remember" name="remember">
				Запомнить пользователя
			</b-form-checkbox>
		</div>
	</b-form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Authentification',
	data() {
		return {
			userLog: {
				email: '',
				password: '',
				remember: false,
			},
		}
	},
	computed: {
		...mapGetters(['loading', 'error', 'isError']),
		formError() {
			switch (this.error) {
			case 'auth/invalid-email':
				return 'Введен невалидный email';
			case 'auth/user-disabled':
				return 'Пользователь с таким email заблокирован';
			case 'auth/user-not-found':
				return 'Пользователя с таким email не существует';
			case 'auth/wrong-password':
				return 'Введен неверный пароль';
			default:
				return '';
			}
		},
	},
	methods: {
		onSubmit() {
			const user = {
				email: this.userLog.email, 
				password: this.userLog.password,
				remember: this.userLog.remember,
			}

			this.$store.dispatch('signIn', user);
		},
	},
}
</script>

<style>

</style>