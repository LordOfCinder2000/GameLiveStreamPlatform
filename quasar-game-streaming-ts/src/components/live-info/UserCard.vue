<template>
	<div v-if="show" :class="[{ 'q-list--dense': dense }, 'user-card']">
		<q-item :dense="dense" clickable class="rounded-borders">
			<q-item-section avatar>
				<ProfileAvatar
					:size="dense ? '2rem' : ''"
					:src="userCard.avatar"
				/>
			</q-item-section>

			<q-item-section>
				<q-item-label :lines="1">
					{{ userCard.ownerChannelUserName }}
					<slot name="middle">
						<q-badge align="middle" color="red"> LIVE </q-badge>
					</slot>
				</q-item-label>
				<q-item-label
					v-if="userCard.followers"
					caption
					:lines="1"
					v-once
				>
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

			<q-item-section side>
				<slot name="side">
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
				</slot>
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
import { ref, defineAsyncComponent, onBeforeMount } from "vue";
export interface UserCard {
	avatar?: string;
	followers?: number;
	ownerChannelUserName?: string;
}

export interface Props {
	userCard: UserCard;
	dense?: boolean;
}
const ProfileAvatar = defineAsyncComponent(
	() => import("components/ProfileAvatar.vue")
);
const props = withDefaults(defineProps<Props>(), {
	dense: false,
	userCard: () => <UserCard>{},
});

const show = ref(false);

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

const onClick = async () => {
	await waitFor(0);
	show.value = true;
};

onBeforeMount(async () => {
	await onClick();
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
