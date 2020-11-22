<template>
	<div class="good-item">
		<div class="good-item__cluster">
			<img :src="goodData.imgPath" :alt="goodData.imgAlt" class="good-item__img" style="width:90%;">
			<b-icon
				class="good-item__bookmark"
				:icon="!isAddedToBookmark ? 'bookmark-plus' : 'bookmark-check'">
			</b-icon>
		</div>
		<router-link to="/" class="good-item__title link">
			<h5 class="">
				{{ goodData.title }}
			</h5>
		</router-link>
		<h6 class="good-item__location">
			<b-icon-geo-alt-fill></b-icon-geo-alt-fill> {{ goodData.location }}
		</h6>
		<h6 class="good-item__time">
			{{ goodData.time }}
		</h6>
		<div class="good-item__cluster">
			<h3 class="good-item__price">
				{{ goodData.price }} <span style="color: #aaa">
					₽
				</span>
			</h3>
			<router-link to="/">
				<b-icon-arrow-right-square-fill class="good-item__arrow" font-scale="1.75"></b-icon-arrow-right-square-fill>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		goodData: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			isAddedToBookmark: false,
		}
	},

}
</script>

<style lang="scss">
.good-item {
	position: relative;
	display: flex;
	flex-direction: column;
}

.good-item__cluster {
	display: flex;
	justify-content: space-between;
}

.good-item__img {
	margin-bottom: rem(15px);
}


.good-item__bookmark {
	position: absolute;
	right: 5px;
	top: 5px;	
	font-size: rem(25px);
	color: $white;
	padding: rem(8px);
	box-sizing: content-box;
	cursor: pointer;
	&:hover {
		color: $third;
	}
}

.good-item__title {
	display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow-y: hidden;
}

.good-item__time {
	color: 	#888;
}

.good-item__location {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: 	#888;
}

.good-item__arrow {
	color: $white;
	&:hover {
		color: $third;
	}	
}

</style>