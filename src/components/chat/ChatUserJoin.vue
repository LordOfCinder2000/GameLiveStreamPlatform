<template>
	<div class="user-join-container fit column">
		<div class="user-join-header col-auto">
			<q-toolbar>
				<q-btn v-close-drawer dense flat>
					<q-icon name="close" />
				</q-btn>

				<q-toolbar-title
					class="text-center text-subtitle2 text-uppercase text-weight-bold"
				>
					Online Sub
				</q-toolbar-title>
				<q-btn class="invisible" dense flat>
					<q-icon />
				</q-btn>
			</q-toolbar>
		</div>
		<q-separator />
		<div class="user-join-body col">
			<q-scroll-area
				ref="scrollArea"
				:thumb-style="{ width: '5px' }"
				class="q-px-xs fit"
				@scroll="fnToCall"
			>
				<q-infinite-scroll @load="onLoadId" :offset="0">
					<UserCard
						class="q-mt-sm"
						v-for="follower in followers"
						:key="follower.id"
						:userCard="follower"
						dense
					>
						<q-popup-proxy>
							<ChatUserInfo
								:name="follower.name"
								:avatar="follower.avatar"
							/>
						</q-popup-proxy>
					</UserCard>
					<template v-slot:loading>
						<div class="row justify-center">
							<q-spinner-dots color="positive" size="40px" />
						</div>
					</template>
				</q-infinite-scroll>
			</q-scroll-area>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, onMounted } from "vue";
import { type UserCard } from "components/live-info/UserCard.vue";
import { QScrollArea } from "quasar";
import { apiClient } from "src/boot/openapi-client";
const UserCard = defineAsyncComponent(
	() => import("components/live-info/UserCard.vue")
);
const ChatUserInfo = defineAsyncComponent(
	() => import("components/chat/ChatUserInfo.vue")
);

const followers = ref<UserCard[] | null>([]);

// onMounted((number = 100) => {
// 	let count = 0;
// 	for (let index = 0; index < number; index++) {
// 		followers.value?.push({
// 			id: count++,
// 			name: `gatay${count}`,
// 			avatar: `https://i.pravatar.cc/${100 + index * 2}`,
// 		});
// 	}
// });

const scrollArea = ref<QScrollArea | null>(null);

const infiniteScroll = scrollArea.value?.getScrollTarget();

let count = 0;
const onLoadId = async (index: number, done: () => void) => {
	console.log(index);
	await apiClient.chatRoom
		.getListChannelJoined(
			"b278cac9-4990-a284-6e5f-3a0763c7e12a",
			false,
			"",
			10 * index,
			10
		)
		.then((data) => {
			data.items?.forEach((channel) => {
				followers.value?.push({
					id: count++,
					name: channel.id ?? "null",
					avatar: `https://i.pravatar.cc/${100 + index * 2}`,
				});
			});
		})
		.finally(() => {
			done();
		});
	// setTimeout(() => {
	// 	let count = 0;
	// 	for (let index = 0; index < 5; index++) {
	// 		followers.value?.push({
	// 			id: count++,
	// 			name: `gatay${count}`,
	// 			avatar: `https://i.pravatar.cc/${100 + index * 2}`,
	// 		});
	// 	}
	// 	done();
	// }, 2000);
};

const fnToCall = () => {
	console.log("go");
};
</script>

<style lang="scss" scoped></style>
