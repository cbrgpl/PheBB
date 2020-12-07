<template>	
	<div v-if="loading">
		Loading...
	</div>
	<b-table
		v-else sticky-header head-variant="light"
		dark :items="requestedUsers" :fields="fields" table-class="table-class"
		borderless hover>
		<template #cell(Роль)="data">
			<b-form-select
				v-model="data.value" 
				@input="rowSelectRole($event, {email: data.item.email, value: data.value})">
				<b-form-select-option
					v-for="option in rolesSelect" :key="option.value" :value="option.value">
					{{ option.text }}
				</b-form-select-option>
			</b-form-select>
		</template>
	</b-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			fields: ["email", "Фамилия", "Имя", "Отчество", 'Роль'],
			rolesSelect: [
				{value: 'user', text: 'Обычный пользователь'},
				{value: 'courier', text: 'Курьер'},
				{value: 'seller', text: 'Продавец'},
			],
		}
	},
	computed: {
		...mapGetters(['requestedUsers', 'loading']),
	},
	async mounted() {
		this.$store.dispatch('loadAllUsers')
			.then(() => {});
	},

	methods: {
		getRoles(currentRole) {
			return this.rolesSelect.filter((role) => role.value !== currentRole)
		},
		rowSelectRole(event, {email, value}) {
			this.$store.dispatch('setUserRole', {email: email, role: value});
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

</style>