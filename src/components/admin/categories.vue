<template>
	<div v-if="loading">
		Loading...
	</div>
	<div v-else>
		<b-button variant="primary" @click="popups.create = true">
			Добавить новую категорию
		</b-button>
		<b-table
			dark :items="cetegoriesData" :fields="fields" table-class="table-class"
			borderless
			hover>
			<template #cell(Управление)="data">
				<div class="d-flex justify-content-between w-50 mx-auto">
					<b-button variant="secondary" @click="openChangeCategoryPopup($event, data.item)">
						Изменить
					</b-button>
					<b-button variant="danger" @click="deleteCategory($event, data.item)">
						Удалить
					</b-button>
				</div>
			</template>
		</b-table>

		<div v-if="popups.create" class="category-popup-wrapper">
			<div class="category-popup-window">
				<div class="d-flex"> 
					<b-form-group
						id="add-parentName-group"
						class="mr-4" description="Оставьте пустым, если у категории нет родителя"
						label="Введите название родительской категории:" label-for="add-parentName">
						<b-form-input
							id="add-parentName"
							v-model="manipulateCategoryData.parentName"
							trim placeholder="Введите Имя">
						</b-form-input>
					</b-form-group>
					<b-form-group
						id="add-categoryName-group" 
						label="Введите название текущей категории:" :state="!$v.manipulateCategoryData.categoryName.$anyError"
						label-for="add-categoryName" invalid-feedback="Название категории не может быть пустым">
						<b-form-input
							id="add-categoryName" v-model="$v.manipulateCategoryData.categoryName.$model"
							trim placeholder="Введите название категории">
						</b-form-input>
					</b-form-group>
				</div>
				<div class="d-flex justify-content-around w-100">
					<b-button @click="createCategory">
						Создать категорию
					</b-button>

					<b-button variant="danger" @click="closePopups">
						Закрыть
					</b-button>
				</div>
			</div>
		</div>

		<div v-if="popups.change" class="category-popup-wrapper">
			<div class="category-popup-window">
				<div class="d-flex"> 
					<b-form-group
						id="update-parentName-group"
						class="mr-4" description="Оставьте пустым, если у категории нет родителя"
						label="Введите название родительской категории:" label-for="update-parentName">
						<b-form-input
							id="update-parentName" v-model="manipulateCategoryData.parentName"
							trim placeholder="Введите Имя">
						</b-form-input>
					</b-form-group>
					<b-form-group
						id="update-categoryName-group" 
						label="Введите название текущей категории:" :state="!$v.manipulateCategoryData.categoryName.$anyError"
						label-for="update-categoryName" invalid-feedback="Название категории не может быть пустым">
						<b-form-input
							id="update-categoryName" v-model="$v.manipulateCategoryData.categoryName.$model"
							trim placeholder="Введите название категории">
						</b-form-input>
					</b-form-group>
				</div>
				<div class="d-flex justify-content-around w-100">
					<b-button @click="changeCategory">
						Изменить категорию
					</b-button>

					<b-button variant="danger" @click="closePopups">
						Закрыть
					</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
	name: 'AdminCategories',
	data() {
		return {
			fields: ['ID', 'Имя', 'Управление'],
			cetegoriesData: [],
			popups: {
				create: false,
				change: false,
			},
			manipulateCategoryData: {
				parentName: '',
				categoryName: '',
				categoryID: '',
			},
			popupFunction: 'create',
		}
	},
	validations: {
		manipulateCategoryData: {
			categoryName: {
				required,
			},
		},
	},
	computed: {
		...mapGetters(['loading', 'requestedParentCategory', 'categories']),
	},
	watch: {
		categories(categories) {
			this.cetegoriesData = [];
			categories.forEach(function (category) {
				this.cetegoriesData.push({
					ID: category.id,
					Имя: category.data.name,
				})
			}.bind(this))
		},
	},
	async mounted() {
		this.$store.dispatch('setFirestoreListener');
	},
	methods: {
		createCategory() {
			this.$v.$touch();

			if (this.$v.$error) return;

			this.$store.dispatch('createCategory', {
				parentName: this.manipulateCategoryData.parentName, 
				categoryName: this.manipulateCategoryData.categoryName,
			})
				.then(() => {
					window.alert('Категория была успешно создана!');
				})
		},
		async openChangeCategoryPopup(event, data) {
			this.popups.change = true;
			
			// Запрашиваем родителя
			await this.$store.dispatch('findCategoryParent', data.ID)
				.then(() => {
					console.log('findparentcategory done', this.requestedParentCategory);
				});
			
			this.manipulateCategoryData.categoryName = data["Имя"];
			this.manipulateCategoryData.categoryID = data.ID;
			
			// Если у категории был родитель, то присваиваем полю родителя, иначе пустая строка
			this.requestedParentCategory ? this.manipulateCategoryData.parentName = this.requestedParentCategory.name : this.manipulateCategoryData.parentName = '';
			console.log(this.manipulateCategoryData.parentName)
		},
		closePopups() {
			this.manipulateCategoryData.parentName = '';
			this.manipulateCategoryData.categoryName = '';
			this.manipulateCategoryData.categoryID = '';

			this.popups.change = false;
			this.popups.create = false;

			this.$v.$reset();
		},
		deleteCategory(event, data) {
			console.log('data.ID ', data.ID)
			this.$store.dispatch('deleteCategory', data.ID);
		},
		changeCategory() {
			this.$v.$touch();

			if (this.$v.$error) return;

			this.$store.dispatch('updateCategory', {
				newParentName: this.manipulateCategoryData.parentName,
				categoryID: this.manipulateCategoryData.categoryID,
				categoryNewName: this.manipulateCategoryData.categoryName,
			}).then((res) => {
				console.log(res);
			})

		},
	},
}
</script>

<style lang="scss">
.table-class {
    background: $second
}

.row--hover {
    cursor: pointer;
    filter: brightness(0.7);
    &:active {
        transform: scale(0.5);
    }
}

.category-popup-wrapper {
	&::before {
		content: '';
		display: block;
		width: 100vw;
		height: 100vh;

		position: absolute;
		right: 50%;
		bottom: 50%;
		transform: translate(50%, 50%);

		background: rgba(0,0,0,0.35);
	}
}

.category-popup-window {

	background: $main;

	padding: rem(10px) rem(15px);
	border-radius: rem(4px);

	position: absolute;
	right: 50%;
	bottom: 50%;
	transform: translate(50%, 50%);
	z-index: 3;
}

</style>