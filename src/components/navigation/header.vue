<template>
	<header class="header d-flex align-items-center">
		<b-container fluid>
			<b-row align-v="center">
				<b-col cols="2">
					<h2 class="d-flex align-items-center mb-0">
						<router-link tag="span" :to="{name: 'Main'}">
							<img :src="require('@/assets/images/navigation/header/logo.png')" alt="Site Logo" class="header-logo">
						</router-link>
						<span style="user-select:none;">PheBB</span>
					</h2>
				</b-col>
				<template v-if="!checkRegCompletion">
					<b-col offset="2" class="mr-xl-2">
						<b-row align-h="end">
							<router-link active-class="header-link--active" tag="span" class="header-link link p-1" :to="{name: 'SignIn'}">
								<b-icon icon="person-circle" class="mr-2"></b-icon>
								<span>Авторизация</span>
							</router-link>
							<router-link active-class="header-link--active" tag="span" class="header-link link p-1" :to="{name: 'Registration'}">
								<b-icon icon="shift-fill" class="mr-2"></b-icon>
								<span>Регистрация</span>
							</router-link>
						</b-row>
					</b-col>
				</template>
				<template v-else>
					<b-col offset="2" cols="8">
						<div class="d-flex justify-content-end align-items-center w-100">
							<router-link active-class="header-link--active" tag="span" class="header-link link p-1" to="/">
								<b-icon icon="bag-check-fill" class="mr-2"></b-icon>
								<span>Заказы</span>
							</router-link>
							<router-link active-class="header-link--active" tag="span" class="header-link link p-1" to="/">
								<b-icon icon="tags-fill" class="mr-2"></b-icon>
								<span>Избранное</span>
							</router-link>
							<router-link active-class="header-link--active" tag="span" class="header-link link p-1" to="/">
								<b-icon icon="cart4" class="mr-2"></b-icon>
								<span>Корзина</span>
							</router-link>
							<span class="header-link link p-1" @click="isProfileMenuVisible = !isProfileMenuVisible">
								<b-icon icon="house-fill" class="mr-2"></b-icon>
								<span>{{ user.email }}</span>
								<b-icon icon="caret-right-fill" :class="[{'header-profile-arrow--active': isProfileMenuVisible}, 'header-profile-arrow', 'ml-1']"></b-icon>
							</span>
						</div>
					</b-col>
				</template>
			</b-row>
		</b-container>
		<template v-if="checkRegCompletion">
			<nav
				:class="[{'header-menu--visible': isProfileMenuVisible}, 'header-menu']">
				<router-link tag="div" class="header-menu-item" to="/">
					<b-icon-cpu class="mr-2"></b-icon-cpu>
					Личный кабинет 
				</router-link>
				<router-link tag="div" class="header-menu-item" to="/">
					<b-icon-chat-dots class="mr-2"></b-icon-chat-dots>
					Сообщения 
				</router-link>
				<div class="header-menu-item" @click="logout">
					<b-icon-patch-minus class="mr-2"></b-icon-patch-minus>
					Выход
				</div>
			</nav>
		</template>
	</header>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
	name:'TopNav',
	data() {
		return {
			isProfileMenuVisible: false,
		}
	},
	computed: {
		...mapGetters(['checkRegCompletion', 'user']),
	},
	methods: {
		logout() {
			this.isProfileMenuVisible = false;
			this.$store.dispatch('logoutUser');
		},
	},
}

</script>

<style lang="scss">

.header {
	padding: 0 rem(50px);
	background: $second;
	border-bottom: 1px solid $black;
	box-shadow: 0 -2px 15px 1px $black;
	position: relative;
}

.header-logo {
	position: relative;
	width: rem(100px);
	cursor: pointer;
}

.header-link {
	@include font-size(rem(18px));
	margin-left: rem(15px);
	user-select: none;
}

.header-profile-arrow {
	font-size: rem(14px);
	color: #fff !important;
	transition: .8s ease;
	&--active {
		transform: rotateY(180deg);
	}
}

.header-menu {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	
	position: absolute;
	z-index: 2;
	right: 0;
	top: 100%;
	overflow: hidden;
	transform: translateX(100%);
	background: $second;
	box-shadow: 0 4xpx 4px 1px rgba($black, 0.8);
	transition: 0.8s cubic-bezier(.15,.87,1,.75);
	&--visible {
		transform: translateX(0);
		transition: 800ms ease-out;
	}
}

.header-menu-item {
	width: 100%;
	padding: rem(4px) rem(5px);
	cursor: pointer;
	&:hover {
		background: darken($second, 20%);
	}
}
</style>