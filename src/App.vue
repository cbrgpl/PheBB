<template>
	<div id="app">
		<vue-Header v-if="navVisible" />
		<main class="content">
			<router-view />
		</main>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import vueHeader from '@/components/navigation/header.vue';

export default {
	name: 'App',
	components: {
		vueHeader,
	},
	computed: {
		...mapGetters(['routeTo', 'navVisible']),
	},
	watch: {
		routeTo() {
			this.$router.push({name: this.routeTo})
		},
		
	},
	mounted() {
		this.$store.dispatch('ymapAction');	
		this.$router;
	},

}
</script>

<style lang="scss">
#app {
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
}

.content {
	overflow: auto;
	flex-grow: 1;
}
</style>
