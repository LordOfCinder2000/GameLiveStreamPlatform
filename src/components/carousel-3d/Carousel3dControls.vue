<template>
	<div class="carousel-3d-controls" v-if="show">
		<q-btn
			flat
			dense
			class="prev rotate-180"
			icon="arrow_forward_ios"
			@click.prevent="parent.goPrev()"
			:class="{ disabled: !parent.isPrevPossible }"
			aria-label="Previous slide"
		>
			<!-- <span v-html="prevHtml"></span> -->
		</q-btn>
		<q-btn
			flat
			dense
			class="next"
			icon="arrow_forward_ios"
			@click.prevent="parent.goNext()"
			:class="{ disabled: !parent.isNextPossible }"
			aria-label="Next slide"
		>
			<!-- :style="`width: ${width}px; height: ${height}px; line-height: ${height}px;`" -->
			<!-- <span v-html="nextHtml"></span> -->
		</q-btn>
	</div>
	<div class="carousel-3d-controls" v-else>
		<q-skeleton size="2rem" class="prev" type="QBtn" />
		<q-skeleton size="2rem" class="next" type="QBtn" />
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
	props: {
		/**
		 * Width in pixels of the navigation buttons
		 */
		width: {
			type: [String, Number],
			default: 50,
		},
		/**
		 * Height in pixels of the navigation buttons
		 */
		height: {
			type: [String, Number],
			default: 60,
		},
		/**
		 * Text content of the navigation prev button
		 */
		prevHtml: {
			type: String,
			default: "&lsaquo;",
		},
		/**
		 * Text content of the navigation next button
		 */
		nextHtml: {
			type: String,
			default: "&rsaquo;",
		},
	},
	data() {
		return {
			parent: this.$parent,
		};
	},
	setup() {
		const show = ref(false);
		const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
		const onClick = async (event) => {
			await waitFor(1000);
			show.value = true;
		};
		onMounted(() => {
			onClick();
		});
		return {
			show,
		};
	},
};
</script>

<style lang="scss" scoped>
.carousel-3d-controls {
	position: absolute;
	top: 50%;
	height: 0;
	margin-top: -30px;
	left: 0;
	width: 100%;
	// z-index: 1000;
}

.next,
.prev {
	position: absolute;
	// z-index: 1010;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	text-decoration: none;
	top: 0;
}

.next:hover,
.prev:hover {
	cursor: pointer;
	opacity: 0.7;
}

.prev {
	left: 0;
	text-align: left;
}

.next {
	right: 0;
	text-align: right;
}

.disabled {
	opacity: 0.2;
	cursor: default;
}

.disabled:hover {
	cursor: default;
	opacity: 0.2;
}
</style>
