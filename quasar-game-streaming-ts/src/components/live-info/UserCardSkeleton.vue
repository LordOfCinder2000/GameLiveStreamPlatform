<template>
	<div :class="[{ 'q-list--dense': dense }, 'user-card']">
		<q-item :dense="dense">
			<q-item-section avatar>
				<q-skeleton :size="dense ? '2rem' : ''" type="QAvatar" />
			</q-item-section>

			<q-item-section>
				<q-item-label>
					<q-skeleton width="50%" square />
				</q-item-label>
				<q-item-label v-if="!dense" caption>
					<q-skeleton width="20%" square />
				</q-item-label>
			</q-item-section>

			<q-item-section v-if="!dense" side>
				<q-skeleton height="2rem" type="QBtn" square />
			</q-item-section>
		</q-item>
	</div>
</template>

<script lang="ts" setup>
export interface Props {
	dense?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	dense: false,
});
</script>

<style lang="scss" scoped>
.user-card {
	:deep(.q-item--dense) {
		.q-item__section--avatar {
			min-width: auto;
		}
	}
}
</style>
