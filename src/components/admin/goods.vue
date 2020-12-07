<template>
	<div>
		<div>
			<template v-if="!checkRequestedGood">
				<b-form-group
					id="good-id-group" :invalid-feedback="error"
					label="ID товара:" :state="!isError"
					label-for="good-id" class="w-50 mx-auto">
					<b-form-input
						id="good-id" v-model="goodID" placeholder="Введите ID товара" trim>
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

				<b-button :disabled="loading" @click="openChangeForm">
					Изменить товар
				</b-button>		
			</template>
			<template v-else>
				<div class="w-50 mx-auto">
					<good-data-form :good-data="requestedGood.toObject()" button-text="Обновить" @form-submited="updateGoodData">
						<template v-slot:extra-buttons>
							<b-button variant="danger" @click="deleteGood">
								Удалить
							</b-button>
							<b-button variant="success" @click="closeChangeForm">
								Назад
							</b-button>
						</template>
					</good-data-form>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import goodDataForm from '@/components/good/good-data-form.vue';

export default {
	components: {
		goodDataForm,
	},
	data() {
		return {
			goodID: 'K1Mcq0FQPl12R51TceWp',
		}
	},
	computed: {
		...mapGetters([
			'requestedGood', 
			'loading', 
			'error', 
			'isError',
			'checkRequestedGood',
		]),
	},
	methods: {
		openChangeForm() {
			this.$store.dispatch('requestGood', this.goodID);
		},
		updateGoodData(data) {
			this.$store.dispatch('changeGood', {
				goodID: data.goodID, 
				newName: data.name, 
				newPrice: data.price, 
				newCategoryID: data.categoryID,
			}).then(() => {
				window.alert('Данные были успешно обновлены')
			});
		},
		closeChangeForm() {
			this.goodID = '';
			this.$store.dispatch('clearRequestedGood');
		},
		deleteGood() {
			this.$store.dispatch('deleteGood', this.requestedGood.goodID);
			this.goodID = '';
			this.$store.dispatch('clearRequestedGood');
		},
	},
}
</script>

<style>

</style>