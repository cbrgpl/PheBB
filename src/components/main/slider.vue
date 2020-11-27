<template>
	<div style="width:100%;">
		<b-carousel
			id="carousel-1"
			v-model="slide"
			:interval="4000"
			controls
			indicators
			background="#ababab"
			img-width="100%"
			style="text-shadow: 1px 1px 2px #333;">
			<!-- Text slides with image -->
			<b-carousel-slide
				v-for="slidePath in slidesImagesPaths" :key="slidePath"
				:img-src="slidePath">
			</b-carousel-slide>
		</b-carousel>
	</div>
</template>

<script>
export default {
	props: {
		slidesImagesPaths: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			slide: 0,
			sliding: null,
		}
	},
	methods: {
		// @sliding-start="onSlideStart"
		// @sliding-end="onSlideEnd"
		//
		// onSlideStart(slide) {
		// 	console.log(slide);
		// 	this.sliding = true
		// },
		// onSlideEnd(slide) {
		// 	console.log(slide);
		// 	this.sliding = false
		// },
	},
}
</script>

<style lang="scss">
</style>