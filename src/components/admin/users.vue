<template>
	<div class="position-relative w-75 mx-auto pb-3">
		<template v-if="!userGot">
			<b-form-group
				id="user-id-group" type="email" :invalid-feedback="error"
				label="Email пользователя:" :state="!isError"
				label-for="user-id" class="w-50 mx-auto" description="Для загрузки данных о пользователе">
				<b-form-input
					id="user-id" v-model="requestUserID" placeholder="Введите данные пользователя" trim>
				</b-form-input>

				<template v-slot:invalid-feedback>
					<div class="input-invalid-feedback">
						{{ error }}
					</div>
				</template>
			</b-form-group>		
			
			<div v-if="loading">
				Loading...
			</div>

			<b-button v-if="!loading" @click="requestUser">
				Загрузить данные о пользователе
			</b-button>
		</template>

		<template v-else>
			<user-data-form :user-data="requestedUser.firestoreData" @submit="requestUserAgain" />
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import userDataForm from '@/components/user/userDataForm.vue';

export default {
	name: 'AdminUsers',
	components: {
		userDataForm,
	},
	data() {
		return {
			userGot: false,
			requestUserID: '',
		}
	},
	computed: {
		...mapGetters(['error', 'isError', 'loading', 'requestedUser']),	
	},
	methods: {
		requestUser() {
			this.$store.dispatch('requestUserData', this.requestUserID)
				.then(() => {
					this.userGot = true;
				})
				.catch((error) => {
					console.error(error);
				});
		},
		requestUserAgain(data) {
			this.$store.dispatch('setUserFirestoreData', {userData: data, email: this.requestUserID})
				.then(() => {
					this.requestUserID = '';
					this.userGot = false;
				});
			
		},
	},
}
</script>

<style lang="scss">

.input-invalid-feedback {
	font-size: rem(14px);
	font-weight: 600;
	letter-spacing: 0.5px;
	color: $error;
}
</style>