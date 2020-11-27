<template>
	<div class="d-flex flex-column w-75	mx-auto mt-5">
		<nav class="auth-nav">
			<router-link
				v-for="option in options" :key="option.name" :to="{name: option.pathname}" 
				tag="h3" active-class="auth-nav-option--active" class="auth-nav-option">
				{{ option.name }}
			</router-link>
		</nav>



		<b-container class="w-50">
			<b-row>
				<b-col>
					<router-view></router-view>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
export default {
	name: "Auth",
	data() {
		return {
			options: [
				{
					name: 'Авторизация', 
					pathname: 'SignIn',
				},
				{
					name: 'Регистрация',
					pathname: 'Registration',
				},
			],
		}
	},
    
}
</script>

<style lang="scss">

.auth-nav {
	display: flex;
	justify-content: space-around;
	padding: 0 10%;
}

.auth-nav-option {
	cursor: pointer;
	transition: 0.3s;
	position: relative;

	user-select: none;

	&:hover {
		color: darken($white, 10%);
	}
	
	&--active::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 3px;

		bottom: -7px;
		left: 0;

		border-radius: 3px;

		background: rgba($second, 0.95);
	}
}

</style>