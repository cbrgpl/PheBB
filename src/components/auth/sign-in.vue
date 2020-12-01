
<template>
	<b-form class="d-flex justify-space flex-column mx-auto mt-5" @submit.prevent="onSubmit" @keypress.enter.prevent>
		<b-form-group
			id="email-group"
			label="Ваш email:"
			label-for="email" invalid-feedback="Введите email"
			:state="!$v.userLog.email.$anyError">
			<b-form-input
				id="email" v-model="$v.userLog.email.$model" trim
				type="email" placeholder="Введите email"></b-form-input>
		</b-form-group>
		<b-form-group
			id="password-group"
			label="Ваш пароль:"
			label-for="password" invalid-feedback="Введите пароль"
			:state="!$v.userLog.password.$anyError">
			<b-form-input
				id="password" v-model="$v.userLog.password.$model" trim
				type="password"
				placeholder="Введите пароль"></b-form-input>
		</b-form-group>

		<h6
			v-if="isError & formError !== 'user-unverified'" class="text-danger mb-2" 
			v-html="formError">
		</h6>
		<div class="d-flex justify-content-between align-items-center">
			<b-button variant="primary" class="w-50" type="submit" :disabled="isButtonDisabled">
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

import { required, email } from 'vuelidate/lib/validators'

export default {
	name: 'Authentification',
	components: {
	},
	data() {
		return {
			userLog: {
				email: '',
				password: '',
			},
			remember: false,
			submitStatus: null,
			emailVerificationChecker: null,
			isButtonDisabled: false,
		}
	},
	validations: {
		userLog: {
			email: {
				required,
				email,
			},
			password: {
				required,
			},
		},
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
			case 'auth/user-unverified': 
				return `Вы не подтвердили email<br>
						Вам на почту было отправлено письмо с подтвеждением регистрации!`;
			default:
				return '';
			}
		},
	},
	watch: {
		error() {
			if (this.error === 'firestore/user-not-exists')
				this.$router.push({name: 'RegCompletion'});
		},
	},
	methods: {
		onSubmit() {
			this.$v.userLog.$touch();
			if (this.$v.userLog.$error) return;

			const user = {
				email: this.userLog.email, 
				password: this.userLog.password,
				remember: this.remember,
			}
			this.$store.dispatch('signIn', user)
				.then(() => {
					this.$router.push({name: 'Home'});
				})
				.catch((error) => {
					console.log('got error', error);
					this.isButtonDisabled = true;
					setTimeout(() => this.isButtonDisabled = false, 60000)
					this.submitStatus = '!ok';
				});
		},
	},
}
</script>

<style>

</style>