<template>
	<div class="main-content">
		<slider :slides-images-paths="sliderImagesPaths" />
		
		<div class="px-5">
			<section class="goods-section">
				<h2 class="goods-section-title">
					Популярные категории
				</h2>
				<b-container fluid> 
					<b-row cols="4">
						<b-col v-for="category in goodsCategories" :key="category.name">
							<div class="good-category mb-3 py-2">
								<b-img :src="category.path" height="50" :alt="category.name" style="color: red;"></b-img>
								<h5>{{ category.name }}</h5>
							</div>
						</b-col>
					</b-row>
				</b-container>
				<div class="goods-section-items">
				</div>
			</section>
			<section class="goods-section my-5">
				<h2 class="goods-section-title">
					Топ просмотров
				</h2>


				<div class="goods-section-items">
					<good-item v-for="item in test" :key="item.id" :good-data="item" class="main-goods-item"></good-item>
				</div>
			</section>
			<section class="goods-section">
				<h2 class="goods-section-title">
					Новые Товары
				</h2>
				<div class="goods-section-items">
					<good-item v-for="item in test" :key="item.id" :good-data="item" class="main-goods-item"></good-item>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import slider from '@/components/main/slider.vue';
import goodItem from '@/components/good/good-item.vue'
export default {
	name: "Main",
	components: {
		slider,
		goodItem,
	},
	data() {
		return {
			test: [
		
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0d',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0a',
					time: '14 ноября 19:65',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
				{
					title: 'Товар 1',
					id: '14d0c',
					imgPath: require('@/assets/images/test/test1.jpg'),
					price: 22356,
					holder: 'noone',
					location: 'Novosibirsk',
				},
			],

			sliderImagesPaths: [
				require('@/assets/images/main/slider/slider1.jpeg'),
				require('@/assets/images/main/slider/slider2.jpeg'),
				require('@/assets/images/main/slider/slider3.jpeg'),
			],
			goodsCategories: [
				{
					name: 'Процессоры',
					path: require('@/assets/images/main/categories/1.svg'),
				},
				{
					name: 'Мониторы',
					path: require('@/assets/images/main/categories/2.svg'),
				},
				{
					name: 'Садовая техника',
					path: require('@/assets/images/main/categories/3.svg'),
				},
				{
					name: 'Ноутбуки',
					path: require('@/assets/images/main/categories/4.svg'),
				},
				{
					name: 'Смартфоны',
					path: require('@/assets/images/main/categories/5.svg'),
				},
				{
					name: 'Телевизоры',
					path: require('@/assets/images/main/categories/6.svg'),
				},
				{
					name: 'Стиральные машинки',
					path: require('@/assets/images/main/categories/7.svg'),
				},
				{
					name: 'Климатические приборы',
					path: require('@/assets/images/main/categories/8.svg'),
				},
				{
					name: 'Холодильники',
					path: require('@/assets/images/main/categories/9.svg'),
				},
				{
					name: 'Компьютеры',
					path: require('@/assets/images/main/categories/10.svg'),
				},
			],
		}
	},
}
</script>

<style lang="scss">
.main-content {
	height: 300vh;
}

.good-category {
	border: 1px solid $second;
	width: 100%;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: rem(3px);
	cursor: pointer;
	transition: 0.3s;
	& img {
		transition: 0.3s;
	}

	&:hover {
		background: darken($second, 15%);
		& img {
			transform: scale(1.1);
		}
	}
}

.goods-section-items {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

.main-goods-item {
	width: 350px;
	padding: rem(10px) rem(30px);
	transition: 0.2s;
	&:hover {

		box-shadow: 0 0 12px 2px rgba(#000, 0.35);
	}
}
</style>