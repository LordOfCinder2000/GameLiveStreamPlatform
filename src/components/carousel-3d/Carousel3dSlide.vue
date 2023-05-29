<template>
	<q-card
		v-if="show"
		class="carousel-3d-slide fit"
		:style="slideStyle"
		:class="[computedClasses, { dimmed: isHover }]"
		@click="goTo()"
		@mouseenter="hoverSlide"
		@mouseleave="isHover = true"
	>
		<slot
			:index="index"
			:isCurrent="isCurrent"
			:leftIndex="leftIndex"
			:rightIndex="rightIndex"
		/>
	</q-card>

	<q-card
		v-else
		class="carousel-3d-slide-skeleton fit"
		:style="slideStyle"
		:class="[computedClasses]"
	>
		<q-skeleton class="fit" />
	</q-card>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
	props: {
		index: {
			type: Number,
		},
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

	data() {
		return {
			parent: this.$parent,
			styles: {},
			zIndex: 999,
			isHover: true,
			Z: 0,
		};
	},
	computed: {
		isCurrent() {
			return this.index === this.parent.currentIndex;
		},
		leftIndex() {
			if (
				this.parent.oneDirectional &&
				this.getSideIndex(this.parent.leftIndices) >
					this.parent.currentIndex - 1
			)
				return -1;

			return this.getSideIndex(this.parent.leftIndices);
		},
		rightIndex() {
			if (
				this.parent.oneDirectional &&
				this.getSideIndex(this.parent.rightIndices) >
					this.parent.total - this.parent.currentIndex - 2
			)
				return -1;

			return this.getSideIndex(this.parent.rightIndices);
		},
		slideStyle() {
			let styles = {};
			if (!this.isCurrent) {
				const lIndex = this.leftIndex;
				const rIndex = this.rightIndex;
				if (rIndex >= 0 || lIndex >= 0) {
					styles =
						rIndex >= 0
							? this.calculatePosition(rIndex, true, this.zIndex)
							: this.calculatePosition(
									lIndex,
									false,
									this.zIndex
							  );
					styles.opacity = 1;
					styles.visibility = "visible";
				}

				if (this.parent.hasHiddenSlides) {
					if (this.matchIndex(this.parent.leftOutIndex)) {
						styles = this.calculatePosition(
							this.parent.leftIndices.length - 1,
							false,
							this.zIndex
						);
					} else if (this.matchIndex(this.parent.rightOutIndex)) {
						styles = this.calculatePosition(
							this.parent.rightIndices.length - 1,
							true,
							this.zIndex
						);
					}
				}
			}

			return Object.assign(styles, {
				// "border-width": this.parent.border + "px",
				width: this.parent.slideWidth + "px",
				height: this.parent.slideHeight + "px",
				transition:
					" transform " +
					this.parent.animationSpeed +
					"ms, " +
					"               opacity " +
					this.parent.animationSpeed +
					"ms, " +
					"               visibility " +
					this.parent.animationSpeed +
					"ms",
			});
		},
		computedClasses() {
			return {
				[`left-${this.leftIndex + 1}`]: this.leftIndex >= 0,
				[`right-${this.rightIndex + 1}`]: this.rightIndex >= 0,
				current: this.isCurrent,
			};
		},
	},
	methods: {
		hoverSlide() {
			this.isHover = false;
			this.Z = this.Z - 20;
		},
		getSideIndex(array) {
			let index = -1;

			array.forEach((pos, i) => {
				if (this.matchIndex(pos)) {
					index = i;
				}
			});

			return index;
		},
		matchIndex(index) {
			return index >= 0
				? this.index === index
				: this.parent.total + index === this.index;
		},
		calculatePosition(i, positive, zIndex) {
			if (this.isHover)
				this.Z = !this.parent.disable3d
					? parseInt(this.parent.inverseScaling) + (i + 1) * 100
					: 0;
			const y = !this.parent.disable3d
				? parseInt(this.parent.perspective)
				: 0;
			const leftRemain =
				this.parent.spaceDynamic === "auto"
					? parseInt((i + 1) * (this.parent.width / 1.5), 10)
					: parseInt((i + 1) * this.parent.spaceDynamic, 10);
			const transform = positive
				? "translateX(" +
				  leftRemain +
				  "px) translateZ(-" +
				  this.Z +
				  "px) " +
				  "rotateY(-" +
				  y +
				  "deg)"
				: "translateX(-" +
				  leftRemain +
				  "px) translateZ(-" +
				  this.Z +
				  "px) " +
				  "rotateY(" +
				  y +
				  "deg)";
			const top =
				this.parent.space === "auto"
					? 0
					: parseInt((i + 1) * this.parent.space);

			return {
				transform: transform,
				top: top,
				zIndex: zIndex - (Math.abs(i) + 1),
			};
		},
		goTo() {
			if (!this.isCurrent) {
				if (this.parent.clickable === true) {
					this.parent.goFar(this.index);
				}
			} else {
				const { index } = this;
				this.parent.onMainSlideClick({ index });
			}
		},
	},
};
</script>

<style lang="scss">
.carousel-3d-slider {
	[class*="carousel-3d-slide"] {
		position: absolute;
		opacity: 0;
		visibility: hidden;
		overflow: hidden;
		top: 0;
		left: 0;
		background-size: cover;
		box-sizing: border-box;
		cursor: pointer;
		object-fit: cover;
	}
}

.carousel-3d-slide {
	// background-color: rgba(0, 0, 0, 0.6);
	background-color: $positive;
}

.carousel-3d-slide {
	text-align: left;
}

.carousel-3d-slide img {
	width: 100%;
	height: 100%;
}

.carousel-3d-slide video {
	object-fit: cover;
	background: no-repeat center center;
	// position: absolute;
	// top: -3px;
	// left: -3px;
}

.carousel-3d-slide.current,
.carousel-3d-slide-skeleton.current {
	opacity: 1 !important;
	visibility: visible !important;
	transform: none !important;
	z-index: 999;
	// outline: 5px solid $positive !important;
	border: 4px solid $positive;
	&::after {
		background: none !important;
	}
}

.carousel-3d-slide:not(.current) {
	&:hover {
		// background-color: rgba(0, 0, 0, 0.4);
		// & :after {
		// 	content: "";
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	width: 100%;
		// 	height: 100%;
		// 	background-color: red;
		// }
	}
}
</style>
