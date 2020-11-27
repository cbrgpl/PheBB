<template>
	<b-form class="d-flex justify-space flex-column mx-auto mt-5" @submit.prevent="onSubmit" @reset="$v.userRegData.$reset" @keypress.enter.prevent="onSubmit">
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

		<div class="d-flex justify-content-between">
			<b-button class="w-25 mx-auto mt-3" type="reset">
				Сбросить
			</b-button>	
			<b-button variant="primary" class="w-25 mx-auto mt-3" type="submit">
				Регистрация
			</b-button>	
		</div>

		<!-- <h2 class="mt-5">Данные о пользователе:</h2>
							<h5 style="color: #d48d01">Все ваши личные данные будут скрыты и доступны только вам и администрации непосредственно!</h5>
							<div class="d-flex align-items-stretch pl-3 mt-2">
								<span class="mr-3" style="width: 2px; background: #9a8b9f; opacity: 0.5"></span>
								<div class="flex-grow-1">
									<b-form-group
										id="passport-series-group"
										v-mask="'##-##-######'"
										label="Введите серию и номер паспорта:"
										:state="!$v.userRegData.passport.series.$anyError" label-for="passport-series"
										invalid-feedback="Серия и номер паспорта введенна некорректно">
										<b-form-input
											id="passport-series" v-model="$v.userRegData.passport.series.$model" trim
											type="text"
											placeholder="Введите серию и номер паспорта"></b-form-input>
									</b-form-group>

									<b-form-group
										id="passport-issuer-group" label="Кем выдан паспорт:" 
										:state="!$v.userRegData.passport.issuer.$anyError"
										label-for="passport-issuer" invalid-feedback="Введите наименование"
										description="(в Род. падеже)">
										<b-form-input
											id="passport-issuer" v-model="$v.userRegData.passport.issuer.$model" trim>
										</b-form-input>
									</b-form-group>

									<b-form-group
										id="passport-departmentcode-group"
										label="Код подразделения:" :state="!$v.userRegData.passport.departmentcode.$anyError"
										label-for="passport-departmentcode" invalid-feedback="Введите код подразделения">
										<b-form-input
											id="passport-departmentcode" v-model="$v.userRegData.passport.departmentcode.$model" v-mask="'###-###'" trim>
										</b-form-input>
									</b-form-group>


									<b-form-group
										id="passport-issueDate-group"
										label="Дата выдачи паспорта:" :state="!$v.userRegData.passport.issueDate.$anyError"
										label-for="passport-issueDate" invalid-feedback="Выберите дату">
										<b-form-input
											id="passport-issueDate" v-model="$v.userRegData.passport.issueDate.$model" type="date">
										</b-form-input>
									</b-form-group>

									<b-form-group
										id="passport-fcs-group"
										label="ФИО:" :state="!$v.userRegData.passport.FCS.$anyError"
										label-for="passport-fcs" invalid-feedback="Введите ФИО"
										description="Фамилия Имя Отчество">
										<b-form-input
											id="passport-fcs" v-model="$v.userRegData.passport.FCS.$model">
										</b-form-input>
									</b-form-group>

									<b-form-group label="Выберите пол">
										<b-form-radio v-model="userRegData.passport.sex" name="sexRadio" value="Мужской">Мужской</b-form-radio>
										<b-form-radio v-model="userRegData.passport.sex" name="sexRadio	" value="Женский">Женский</b-form-radio>
									</b-form-group>

									<b-form-group
										id="passport-birthDate-group"
										label="Дата рождения:" :state="!$v.userRegData.passport.birthDate.$anyError"
										label-for="passport-birthDate" invalid-feedback="Выберите дату">
										<b-form-input
											id="passport-birthDate" v-model="$v.userRegData.passport.birthDate.$model" type="date">
										</b-form-input>
									</b-form-group>

									<b-form-group
										id="passport-birthAddress-group"
										label="Место рождения:" :state="!$v.userRegData.passport.birthAddress.$anyError"
										label-for="passport-birthAddress" invalid-feedback="Введите место рождения">
										<b-form-input
											id="passport-birthAddress" v-model="$v.userRegData.passport.birthAddress.$model" trim>
										</b-form-input>
									</b-form-group>
								</div>
							</div> -->

		<!-- <div class="d-flex flex-column w-50 ml-3">
							<b-form-group
								id="address-group" label="Ваш адрес:" label-for="address" 
								description="Ваш адрес будет доступен зарегестрированным пользователям">
								<b-form-input
									id="address" v-model="userRegData.address" trim lazy
									@keyup.enter="findAddressOnMap"
									@change="findAddressOnMap">
								</b-form-input>
							</b-form-group>

							<b-form-group
								id="apartmentNumber-group" label="Номер вашей квартиры:" label-for="apartmentNumber" 
								description="Номер вашей квартиры будет скрыт для всех кроме вас">
								<b-form-input
									id="apartmentNumber" v-model="userRegData.apartmentNumber" trim>
								</b-form-input>
							</b-form-group>

							<yandex-map
								:coords="ymapSettings.coords"
								:zoom="ymapSettings.zoom"
								ymap-class="map-container" @click="onMapClick"
								@map-was-initialized="afterMapInitialized">
								<ymap-marker 
									:coords="ymapSettings.coords" 
									marker-id="user" 
									hint-content="Ваш адрес" />
							</yandex-map>

							<b-form-group
								id="phoneNumber-group" label="Номер телефона:" label-for="phoneNumber" 
								:state="!$v.userRegData.phoneNumber.$anyError" invalid-feedback="Введите правильный номер телефона"
								description="Номер вашей квартиры будет скрыт для всех кроме вас">
								<b-form-input
									id="phoneNumber" v-model="$v.userRegData.phoneNumber.$model" v-mask="'# (###) ###-##-##'" trim>
								</b-form-input>
							</b-form-group>


							<b-button type="submit">
								Закончить регистрацию
							</b-button>

							<span v-if="loading">Loading...</span>
							<span v-if="submitStatus !== 'OK'"> {{ submitStatus }}</span>
							<button @click.prevent="test">
								test
							</button>
						</div> -->
	</b-form>
</template>

<script>
// import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import { mapGetters } from 'vuex';
import { required, minLength, email, helpers, sameAs } from 'vuelidate/lib/validators';

export default {
	components: {
		// yandexMap,
		// ymapMarker, 
	},
	data() {
		return {
			userRegData: {
				email: '',
				address: '',
				password: '',
				repeatpassword: '',
				apartmentNumber: '',
				phoneNumber: '',
				passport: {
					series: '',
					issuer: '',
					departmentcode: '',
					issueDate: '',
					FCS: '',
					sex: '',
					birthDate: '',
					birthAddress: '',
				},
			},
			ymapSettings: {
				ymap: Object,
				coords: [
					54.82896654088406,
					39.831893822753904,
				],
				zoom: 10,
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
			// passport: {
			// 	series: {
			// 		required,
			// 		length(value) {
			// 			return !helpers.req(value) || value.length === 12;
			// 		},
			// 	},
			// 	issuer: {
			// 		required,
			// 		minLength: minLength(7),
			// 	},
			// 	departmentcode: {
			// 		required,
			// 		length(value) {
			// 			return !helpers.req(value) || value.length === 7;
			// 		},
			// 	},

			// 	issueDate: {
			// 		required,
			// 		length(value) {
			// 			return !helpers.req(value) || value.length === 10;
			// 		},
			// 	},

			// 	FCS: {
			// 		required,
			// 		minLength: minLength(8),
			// 	},
			// 	birthDate: {
			// 		required,
			// 		length(value) {
			// 			return !helpers.req(value) || value.length === 10;
			// 		},
			// 	},
			// 	birthAddress: {
			// 		required,
			// 		minLength: minLength(5),
			// 	},

			// 	apartmentNumber: {
			// 		required,
			// 		decimal: decimal(),
			// 		integer: integer(),
			// 	},
			// },
			// phoneNumber: {
			// 	required,
			// 	minLength: minLength(17),
			// },
			// apartmentNumber: {
			// 	required, 
			// 	minLength: minLength(1),
			// },
		},
	},
	computed: {
		...mapGetters(['ymapsGet', 'loading']),
	},
	methods: {
		test() {
			const user = { 
				email: this.userRegData.email,
				password: this.userRegData.password,
			};	

			this.$store.dispatch('registerUser', user)
				.then(() => {
					this.submitStatus = 'OK';
				})
				.catch((error) => {
					this.submitStatus = error.message;
				});
		},
		onSubmit() {
			this.$v.userRegData.$touch();
			if (this.$v.userRegData.$error) return;
			const user = { 
				email: this.userRegData.email,
				password: this.userRegData.password,
			}

			this.$store.dispatch('registerUser', user);
		},
		onMapClick(event) {
			this.ymapSettings.coords = event.get('coords');
			this.ymapsGet.geocode(this.ymapSettings.coords).then((res) => {
				const currentGeoObj = res.geoObjects.get(0);	
				// console.log(currentGeoObj.getCountry());
				// Через ленивый поиск убираем государство
				this.userRegData.address = currentGeoObj.getAddressLine().replace(/^(.*?), /g, '');
			})
		},
		findAddressOnMap() {
			this.ymapsGet.geocode(this.userRegData.address).then((res) => {
				const currentGeoObj = res.geoObjects.get(0);
				this.ymapSettings.coords = currentGeoObj.geometry.getCoordinates();
				this.ymapSettings.ymap.setZoom(15, {duration: 1000});
			})
		},
		afterMapInitialized(myMap) {
			myMap.controls.remove('geolocationControl');
			myMap.controls.remove('searchControl');
			myMap.controls.remove('trafficControl');
			myMap.controls.remove('typeSelector');
			myMap.controls.remove('fullscreenControl');
			myMap.controls.remove('rulerControl');
			myMap.controls.remove('typeSelector');
			this.ymapSettings.ymap = myMap;
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

</style>
