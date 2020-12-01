<template>
	<b-form ref="reg-form" class="d-flex justify-space flex-column mx-auto mt-5" @submit.prevent="onSubmit" @reset="$v.userRegData.$reset" @keypress.enter.prevent="onSubmit">
		<b-form-group
			id="email-group"
			label="Ваш email:"
			label-for="email"
			:state="!$v.userRegData.email.$anyError"
			description="Адрес вашей почты будет скрыт"
			invalid-feedback="Вы ввели некорректный email">
			<b-form-input
				id="email" v-model="$v.userRegData.email.$model" trim
				type="email" placeholder="Введите email"></b-form-input>
		</b-form-group>

		<b-form-group
			id="password-group"
			label="Ваш пароль:"
			label-for="password"
			:state="!$v.userRegData.password.$anyError"
			description="Ваш пароль должен содержать не менее 8 символов"
			invalid-feedback="Ваш пароль должен содержать заглавную букву, строчную букву, цифру">
			<b-form-input
				id="password" v-model="$v.userRegData.password.$model" trim
				type="password"
				placeholder="Введите пароль"></b-form-input>
		</b-form-group>

		<b-form-group
			id="repeatpassword-group"
			label="Повторите пароль:"
			:state="!$v.userRegData.repeatpassword.$anyError"
			label-for="repeatpassword"
			invalid-feedback="Пароль не соответствует введенному выше">
			<b-form-input
				id="repeatpassword" v-model="$v.userRegData.repeatpassword.$model" trim
				type="password"
				placeholder="Введите пароль повторно"></b-form-input>
		</b-form-group>

		<!-- shows errors -->
		<span v-if="isError">
			{{ error }}
		</span>

		<span v-if="submitStatus === 'REGISTRED'" class="text-success">
			Вам на почту было отправлено письмо с подтверждением регистрации
		</span>

		<div class="d-flex justify-content-between">
			<b-button class="w-25 mx-auto mt-3" type="reset">
				Сбросить
			</b-button>	
			<b-button variant="primary" class="w-25 mx-auto mt-3" type="submit">
				Регистрация
			</b-button>	
		</div>
	</b-form>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, minLength, email, helpers, sameAs } from 'vuelidate/lib/validators';

export default {
	data() {
		return {
			userRegData: {
				email: '',
				password: '',
				repeatpassword: '',
			},
			submitStatus: null,
		}
	},
	validations: {
		userRegData: {
			email: {
				required,
				email,
			},
			password: {
				required,
				minLength: minLength(8),
				passwordValidate: (value) => {
					return !helpers.req(value) || (/\d/.test(value) & /[a-z]/.test(value) & /[A-Z]/.test(value))
				},
			},
			repeatpassword: {
				sameAsPassword: sameAs('password'),
			},
		},
	},
	computed: {
		...mapGetters(['loading', 'isError', 'error']),
	},
	methods: {
		onSubmit() {
			this.$v.userRegData.$touch();
			if (this.$v.userRegData.$error) return;
			const user = { 
				email: this.userRegData.email,
				password: this.userRegData.password,
			}

			this.$store.dispatch('registerUser', user)
				.then(() => {
					// if user was registred successfuly
					this.submitStatus = 'REGISTRED';
					this.$refs['reg-form'].reset();
					this.$v.userRegData.$reset();
				})
				.catch((error) => {
					this.submitStatus = error.message;
				});
		},

	},
}
</script>

<style lang="scss">

.map-container {
	width: 100%;
	height: 150px;
}

.user-passport-info {
	&:before {
		content: '';
		height: 100%;
		width: 2px;
		background: red;
	}
}

.reg-resend-email {
	align-self: flex-start;
	width: auto;
	border-bottom: 1px solid transparent;
	&:hover {
		cursor: pointer;
		color: $link-color;
		border-bottom: 1px solid $link-color;
	}
}

</style>
