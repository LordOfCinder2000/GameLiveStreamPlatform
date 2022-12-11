<template>
	<div id="app">
		<carousel-3d>
			<slide v-for="(n, index) in 3" :index="index" :key="'key-' + index">
				Slide 1 Content
			</slide>
			<HelloWorld msg="Welcome to Your Vue.js App" />
		</carousel-3d>
	</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { Carousel3d, Slide } from "./components/carousel-3d";
export default {
	name: "App",
	components: {
		HelloWorld,
		Carousel3d,
		Slide,
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
