<template>
	<div class="w-100 h-100">
		<b-form class="d-flex justify-space flex-column mx-auto mt-5" @submit.prevent="onSubmit" @keypress.enter.prevent="onSubmit">
			<div class="d-flex justify-content-between mb-3 w-100">
				<b-form-group
					id="fcs-firstName-group" 
					label="Имя:" :state="!$v.userData.fcs.firstName.$anyError"
					label-for="fcs-firstName" invalid-feedback="Введите Имя">
					<b-form-input
						id="fcs-firstName"
						v-model="$v.userData.fcs.firstName.$model" placeholder="Введите Имя">
					</b-form-input>
				</b-form-group>

				<b-form-group
					id="fcs-secondName-group"
					label="Фамилия:" :state="!$v.userData.fcs.secondName.$anyError"
					label-for="fcs-secondName" invalid-feedback="Введите фамилию">
					<b-form-input
						id="fcs-secondName" v-model="$v.userData.fcs.secondName.$model" placeholder="Введите Фамилию">
					</b-form-input>
				</b-form-group>

				<b-form-group
					id="fcs-thirdName-group"
					label="Отчество" :state="!$v.userData.fcs.thirdName.$anyError"
					label-for="fcs-thirdName" invalid-feedback="Введите отчество">
					<b-form-input
						id="fcs-thirdName"
						v-model="$v.userData.fcs.thirdName.$model" placeholder="Введите Отчество">
					</b-form-input>
				</b-form-group>
			</div>

			<div class="d-flex justify-content-between w-100">
				<b-form-group
					id="address-group" label="Адрес:" label-for="address" 
					description="Адрес будет доступен только зарегистрированным пользователям">
					<b-form-input
						id="address" :value="userAddress" trim lazy
						disabled placeholder="Выберите адрес на карте"
						@keyup.enter="findAddressOnMap" @change="findAddressOnMap">
					</b-form-input>
				</b-form-group>

				<b-form-group
					id="apartmentNumber-group" label="Номер дома:" label-for="apartmentNumber" 
					description="Номер дома будет скрыт для всех кроме курьера" 
					:state="!$v.userData.address.apartmentNumber.$anyError" invalid-feedback="Введите номер своего дома">
					<b-form-input
						id="apartmentNumber" v-model="$v.userData.address.apartmentNumber.$model" placeholder="Введите номер вашего дома" trim>
					</b-form-input>
				</b-form-group>
			</div>

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

			<div class="d-flex mt-3">
				<b-form-group
					id="phoneNumber-group" label="Номер телефона:" label-for="phoneNumber" 
					:state="!$v.userData.phoneNumber.$anyError" invalid-feedback="Введите правильный номер телефона"
					description="Номер телефона будет доступен только зарегистрированным пользователям">
					<b-form-input
						id="phoneNumber" v-model="$v.userData.phoneNumber.$model" v-mask="'# (###) ###-##-##'" 
						placeholder="X (XXX) XXX-XX-XX" trim>
					</b-form-input>
				</b-form-group>

				<b-form-group class="ml-5" label="Выберите пол">
					<b-form-radio v-model="userData.sex" name="sexRadio" value="Мужской">
						Мужской
					</b-form-radio>
					<b-form-radio v-model="userData.sex" name="sexRadio" value="Женский">
						Женский
					</b-form-radio>
				</b-form-group>
			</div>

			<span v-if="loading">
				Loading...
			</span>

			<b-button type="submit" variant="primary">
				Закончить регистрацию
			</b-button>
		</b-form>
	</div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import { mapGetters } from 'vuex';

import { required, helpers } from 'vuelidate/lib/validators';

export default {
	components: {
		yandexMap,
		ymapMarker, 
	},
	props: {
		userData: {
			type: Object,
			default() {
				return {
					address: {
						country: '',
						city: '',
						street: '',
						apartmentNumber: '',
					},
					phoneNumber: '',
					fcs: {
						firstName: '',
						secondName: '',
						thirdName: '',
					},
					sex: '',
				}
			},
		},
	},
	data() {
		return {
			ymapSettings: {
				ymap: Object,
				coords: [
					54.82896654088406,
					39.831893822753904,
				],
				zoom: 10,
			},
		}
	},
	validations: {
		userData: {
			phoneNumber: {
				required,
				length: (value) => {
					return  !helpers.req(value) || value.length === 17;
				},
				
			},
			address: {
				apartmentNumber: {
					required,
				},	
			},
			fcs: {
				firstName: {
					required,
				},
				secondName: {
					required,
				},
				thirdName: {
					required,
				},
			},
		},
	}, 
	computed:{
		...mapGetters(['loading', 'ymapsGet', 'error']),
		userAddress() {
			let address = '';
			for (const key in this.userData.address)
				if (key != 'apartmentNumber')
					this.userData.address[key] ? address = address.concat(this.userData.address[key], ', ') : null;

			// 'Россия, Московская область, Москва, ' slice to  'Россия, Московская область, Москва'
			address = address.slice(0, -2)
			
			return address;
		},
	},
	methods: {
		onSubmit() {
			this.$v.userData.$touch();
			if (this.$v.userData.$error) return;
            
			this.$emit('submit', this.userData);
			
		},
		onMapClick(event) {
			this.ymapSettings.coords = event.get('coords');
			this.ymapsGet.geocode(this.ymapSettings.coords).then((res) => {
				const currentGeoObj = res.geoObjects.get(0);	

				// Если кто-то будет читать этот бред, то это нужно сугубу по причине упертости препода
				// В нормальной ситуации можно было бы вполне легко использовать getAddressLine, как ниже
				this.userData.address.country = currentGeoObj.getCountry();
				// gets only city
				this.userData.address.city = currentGeoObj.getLocalities()[0] || '';
				this.userData.address.street = currentGeoObj.getThoroughfare() || '';
				this.userData.address.apartmentNumber = currentGeoObj.getPremiseNumber() || this.userData.address.apartmentNumber || '';

				// Через ленивый поиск убираем государство
				// this.userData.address = currentGeoObj.getAddressLine().replace(/^(.*?), /g, '');
			})
		},
		findAddressOnMap() {
			this.ymapsGet.geocode(this.userData.address).then((res) => {
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
	height: 250px;
	width: 100%;
}

</style>