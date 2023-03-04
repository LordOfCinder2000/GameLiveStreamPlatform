<template>
	<div class="user-join-container fit column">
		<div class="user-join-header col-auto">
			<q-toolbar>
				<q-btn v-close-drawer dense flat>
					<q-icon name="close" />
				</q-btn>

				<q-toolbar-title
					class="text-center text-subtitle2 text-uppercase"
				>
					<!-- <q-btn
						color="primary"
						icon="check"
						label="OK"
						@click="addFollower"
					/> -->
					Online Sub:
					<span class="text-positive text-weight-bold">
						{{ followers?.length }}</span
					>
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
				class="q-px-xs q-pb-sm fit"
				id="scroll-area-with-virtual-scroll"
			>
				<q-infinite-scroll
					:style="{ 'min-height': scrollAreaHeight }"
					@load="onLoadData"
					:offset="10"
					class="q-pt-sm"
					:debounce="500"
				>
					<!-- <q-virtual-scroll
						scroll-target="#scroll-area-with-virtual-scroll > .scroll"
						:items-size="followers?.length"
						:virtual-scroll-item-size="32"
						:items-fn="getItems"
						v-slot="{ index, item }"
					> -->
					<!-- <q-intersection

						class="example-item"
					> -->
					<UserCard
						v-for="follower in followers"
						:key="follower.channelId"
						class="q-mb-sm"
						:userCard="(follower as UserCard)"
						dense
					>
						<template v-slot:middle>
							<div></div>
						</template>
						<template v-slot:side>
							<div class="row q-gutter-x-sm">
								<q-avatar
									square
									size="1rem"
									v-if="
										channelStore.isAdmin(follower.channelId)
									"
								>
									<img
										src="~assets/images/broadcaster-badge.png"
										alt=""
									/>
								</q-avatar>
								<q-avatar
									square
									size="1rem"
									v-if="follower.role == 'Moderator'"
								>
									<img
										src="~assets/images/mod-badge.png"
										alt=""
									/>
								</q-avatar>
								<q-avatar
									square
									size="1rem"
									v-if="follower.blockTime !== 'NoBlock'"
								>
									<q-icon
										size="1rem"
										name="speaker_notes_off"
									/>
								</q-avatar>
							</div>
						</template>
						<template v-slot:default>
							<ChatUserInfo
								v-bind="{
									channelId: follower.channelId ?? '',
									avatar: follower.avatar ?? '',
								}"
								@toggleMod="
									(value) => {
										if (value) {
											follower.role = 'Moderator';
										} else {
											follower.role = 'Member';
										}
									}
								"
								@toggleBan="
									(value) => {
										follower.blockTime = value;
									}
								"
							/>
						</template>
					</UserCard>
					<!-- </q-intersection> -->

					<!-- </q-virtual-scroll> -->
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
import {
	ref,
	defineAsyncComponent,
	onBeforeMount,
	computed,
	onMounted,
	reactive,
} from "vue";
import { type UserCard } from "components/live-info/UserCard.vue";
import UserCardSkeleton from "components/live-info/UserCardSkeleton.vue";
import { QScrollArea, uid } from "quasar";
import { apiClient, ChannelChatRoomDto } from "boot/openapi-client";
import {
	useChatRoomStore,
	ChannelChatRoomInfoDtoExtend,
} from "stores/components/chat-room-store";
import { useChannelStore } from "stores/components/channel-store";

const UserCard = defineAsyncComponent(
	() => import("components/live-info/UserCard.vue")
);
const ChatUserInfo = defineAsyncComponent(
	() => import("components/chat/ChatUserInfo.vue")
);

const chatRoomStore = useChatRoomStore();
const channelStore = useChannelStore();
const followers = ref<ChannelChatRoomInfoDtoExtend[]>([]);
const scrollArea = ref<QScrollArea | null>(null);
const scrollAreaHeight = ref();

onMounted(async () => {
	if (scrollArea.value)
		scrollAreaHeight.value =
			scrollArea.value.$el.firstChild.getBoundingClientRect().height +
			"px";
});

onBeforeMount(async () => {
	await getChannelInChatRoom(0, 20);
});

const getChannelInChatRoom = async (skip: number, take: number) => {
	return await apiClient.chatRoom
		.getListChannelJoined(chatRoomStore.chatRoom.id ?? "", "", skip, take)
		.then((data) => {
			data.items?.forEach((channel) => {
				followers.value?.push({
					channelId: channel.channelId,
					ownerChannelUserName: channel.ownerChannelUserName,
					avatar: channelStore.getAvatarUrlById(channel.channelId),
					blockTime: channel.blockTime,
					connectedTime: channel.connectedTime,
					role: channel.role,
				});
			});

			return data;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
};

const onLoadData = async (index: number, done: (stop: boolean) => void) => {
	console.log(index);

	await getChannelInChatRoom(5 * index + 15, 5)
		.then((data) => {
			if (data.items?.length == 0) {
				done(true);
			}
		})
		.catch(() => {
			done(true);
		})
		.finally(() => {
			done(false);
		});
	//// ================== Test
	//let count = 0;
	// if (temp == 1) return;
	// temp++;
	// let record = 5;
	// setTimeout(() => {
	// 	for (let i = 0; i < record; i++) {
	// 		followers.value?.push({
	// 			id: uid(),
	// 			name: `gatay${count}`,
	// 			avatar: `https://i.pravatar.cc/${100 + i * 2}`,
	// 		});
	// 	}
	// 	done();
	// }, 500);
};

const addFollower = () => {
	followers.value?.push({
		channelId: uid(),
		ownerChannelUserName: "null",
		avatar: `https://i.pravatar.cc/${1}`,
	});
};

defineExpose({ followers });
</script>

<style lang="scss" scoped></style>
