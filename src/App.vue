<template>
	<div id="app">
		<vue-Header	/>
		<main class="content">
			<router-view />
		</main>
	</div>
</template>

<script>
import vueHeader from '@/components/navigation/header.vue';

export default {
	name: 'App',
	components: {
		vueHeader,
	},

}
</script>

<style lang="scss">
#app {
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-rows: rem(65px) 1fr;
}

.content {
	overflow: auto;
}
</style>
