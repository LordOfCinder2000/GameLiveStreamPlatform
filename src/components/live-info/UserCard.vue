<template>
	<div v-if="show" :class="[{ 'q-list--dense': dense }, 'user-card']">
		<q-item :dense="dense" clickable class="rounded-borders">
			<q-item-section avatar>
				<q-avatar :size="dense ? '2rem' : ''">
					<img :src="userCard.avatar" alt="" />
				</q-avatar>
			</q-item-section>

			<q-item-section>
				<q-item-label :lines="1">
					{{ userCard.name }}
					<q-badge v-if="!dense" align="middle" color="red">
						LIVE
					</q-badge>
				</q-item-label>
				<q-item-label v-if="userCard.followers" caption :lines="1">
					{{
						// $formatNumber(userCard.followers, {
						//   notation: "compact",
						//   compactDisplay: "short",
						// })
						$filters.viewCount($i18n.locale, userCard.followers)
					}}
					followers
				</q-item-label>
			</q-item-section>

			<q-item-section v-if="!dense" side>
				<q-btn
					dense
					unelevated
					color="positive"
					no-caps
					no-wrap
					class="q-px-sm text-weight-regular"
				>
					<q-icon size="xs" name="favorite_border" />
					<div class="row q-ml-sm flex-center">
						<span>Follow</span>
					</div>
				</q-btn>
			</q-item-section>
			<slot name="default" />
		</q-item>
	</div>
	<div v-else :class="[{ 'q-list--dense': dense }, 'user-card']">
		<q-item :dense="dense">
			<q-item-section avatar>
				<q-skeleton :size="dense ? '2rem' : ''" type="QAvatar" />
			</q-item-section>

			<q-item-section>
				<q-item-label>
					<q-skeleton width="50%" square />
				</q-item-label>
				<q-item-label v-if="userCard.followers" caption>
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
import { ref, computed, onMounted } from "vue";
export interface UserCard {
	id: string | number;
	name: string;
	avatar: string;
	followers?: number;
}

export interface Props {
	userCard: UserCard;
	dense?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	msg: "hello",
	dense: false,
});

const show = ref(false);

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

const onClick = async () => {
	await waitFor(1000);
	show.value = true;
};

onMounted(() => {
	onClick();
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
