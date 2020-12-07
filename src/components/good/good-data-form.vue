<template>
	<b-form
		@submit.prevent="$emit('form-submited', goodData)" 
		@keypress.enter.prevent="$emit('form-submited', goodData)">
		<b-form-group
			id="good-name-group" 
			label="Название товара:" :state="!$v.goodData.name.$anyError"
			label-for="good-name" invalid-feedback="Название товара обязательно">
			<b-form-input
				id="good-name"
				v-model="$v.goodData.name.$model" placeholder="Введите название товара">
			</b-form-input>
		</b-form-group>
		<b-form-group
			id="good-price-group" 
			label="Цена товара:" :state="!$v.goodData.price.$anyError" description="Пример цены 657,99"
			label-for="good-price" invalid-feedback="Цена товара обязательна">
			<b-form-input
				id="good-price"
				v-model="$v.goodData.price.$model" placeholder="Введите цену товара в рублях">
			</b-form-input>
		</b-form-group>

		<b-form-select
			v-model="goodData.categoryID" :options="getSelectOptions" 
			disabled-field="notEnabled">
		</b-form-select>

		<div class="d-flex justify-content-around mt-3">
			<b-button type="submit">
				{{ buttonText }}
			</b-button>
			<slot name="extra-buttons">
			</slot>
		</div>
	</b-form>
</template>

<script>
import {mapGetters} from 'vuex';
import {required} from 'vuelidate/lib/validators';


export default {
	props: {
		goodData: {
			type: Object,
			default() {
				return {
					name: '',
					categoryID: '',
					price: '', 
		            goodID: '',
				}
			},
		},
		buttonText: {
			type: String,
			default: 'Создать',
		},
	},
	validations: {
		goodData: {
			name: {
				required,
			},
			price: {
				required,
			},
		},
	},
	computed: {
		...mapGetters(['categories']),
		getSelectOptions() {
			const array = [
				{
					value: null,
					text: 'Выберите нужную категорию',
					notEnabled: true,
				},
			];
			this.categories.forEach((category) => {
				const categoryData = category.data;
				array.push(
					{
						value: category.id, 
						text: categoryData.name,
					}
				);
			})
			return array;
		},
	},
	created() {
		this.$store.dispatch('requestCategories');
	},
}
</script>