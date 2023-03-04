<template>
	<q-menu ref="qMenuRef" @before-show="getUserInfo" :style="computedStyle">
		<q-card class="user-info">
			<q-card-section class="no-padding">
				<q-banner
					v-touch-pan.prevent.mouse="dragMove"
					dense
					class="user-info-banner no-border q-pa-xs"
				>
					<template v-slot:avatar>
						<ProfileAvatar size="4rem" :src="userInfo.avatar" />
					</template>
					<div class="row">
						<div>
							<div class="ellipsis user-name text-h6">
								{{ userInfo.ownerChannelUserName }}
							</div>
							<!-- <div class="user-id text-subtitle2">
								ID: 696969696
							</div> -->
							<div class="user-follow row">
								<div class="user-following">
									<span class="text-subtitle2">{{
										$filters.viewCount(
											$i18n.locale,
											userInfo.followings
										)
									}}</span>
									following
								</div>
								<q-separator vertical class="q-mx-sm" />
								<div class="user-followers">
									<span class="text-subtitle2">{{
										$filters.viewCount(
											$i18n.locale,
											userInfo.followers
										)
									}}</span>
									followers
								</div>
							</div>
						</div>
						<q-space />
						<div>
							<q-btn
								flat
								padding="xs"
								icon="close"
								v-close-popup
							/>
						</div>
					</div>
				</q-banner>
			</q-card-section>
			<!-- <q-separator color="positive" /> -->
			<q-card-section class="q-pa-sm overflow-hidden border-top-positive">
				<div class="row q-gutter-x-md">
					<div
						class="row flex-center"
						v-if="userInfo.role == 'Moderator'"
					>
						<q-avatar square size="1rem">
							<img src="~assets/images/mod-badge.png" alt="" />
						</q-avatar>
						<div class="q-ml-xs text-subtitle2">Chat moderator</div>
					</div>
					<div
						class="row flex-center"
						v-else-if="channelStore.isAdmin(userInfo.channelId)"
					>
						<q-avatar square size="1rem">
							<img
								src="~assets/images/broadcaster-badge.png"
								alt=""
							/>
						</q-avatar>
						<span class="q-ml-xs text-subtitle2">
							Chat broadcaster
						</span>
					</div>
					<div class="row flex-center" v-else>
						<q-icon name="loyalty" size="1rem" color="positive" />

						<span class="q-ml-xs text-subtitle2">
							Chat member
						</span>
					</div>
				</div>
			</q-card-section>
			<!-- <q-separator color="positive" /> -->
			<q-card-actions class="q-pa-xs border-top-positive">
				<q-btn
					dense
					unelevated
					color="positive"
					icon="favorite"
					label="Follow"
					no-caps
				>
				</q-btn>
				<q-btn
					dense
					outline
					color="positive"
					icon="alternate_email"
					label="Mention"
					no-caps
					@click="
						chatRoomStore.setMentionUser(
							userInfo.ownerChannelUserName ?? ''
						)
					"
				>
				</q-btn>
				<q-space />
				<q-btn flat padding="xs" icon="more_vert">
					<ChatUserSetting
						anchor="bottom end"
						self="top end"
						separate-close-popup
						v-bind="userStatus"
						@toggleBan="toggleBan"
						@toggleMod="toggleMod"
					/>
				</q-btn>
			</q-card-actions>
		</q-card>
	</q-menu>
</template>

<script lang="ts" setup>
import {
	ref,
	computed,
	defineAsyncComponent,
	onBeforeMount,
	onMounted,
	watch,
} from "vue";
import { ChatRoomBlockTimeType } from "boot/openapi-client";
import { Props as ChatUserSettingProps } from "./ChatUserSettingMenu.vue";
import { QMenu } from "quasar";
import { useChannelStore } from "stores/components/channel-store";
import {
	useChatRoomStore,
	ChannelChatRoomInfoDtoExtend,
} from "stores/components/chat-room-store";

export interface Props {
	avatar: string;
	channelId: string;
}

const ChatUserSetting = defineAsyncComponent(
	() => import("components/chat/ChatUserSettingPopup.vue")
);

const emit = defineEmits<{
	(e: "toggleBan", value: ChatRoomBlockTimeType): void;
	(e: "toggleMod", value: boolean): void;
	(e: "before-show"): void;
}>();

// const props = withDefaults(defineProps<Props>(), {
// 	// userInfo: () =>
// 	// 	<UserInfo>{
// 	// 		followerCount: 0,
// 	// 		followingCount: 0,
// 	// 	},
// });

const props = defineProps<Props>();

const channelStore = useChannelStore();
const popupPos = ref([0, 0]);
const qMenuRef = ref<QMenu | null>(null);
const dragMove = (details: any) => {
	const qMenu = qMenuRef.value?.contentEl.getBoundingClientRect();
	if (qMenu) {
		popupPos.value = [qMenu.y + details.delta.y, qMenu.x + details.delta.x];
	}
};

const userInfo = ref<ChannelChatRoomInfoDtoExtend>({
	channelId: props.channelId,
	avatar: props.avatar,
	blockTime: "NoBlock",
	connectedTime: "",
	ownerChannelUserName: "",
	role: "Member",
	followers: 0,
	followings: 0,
});
const chatRoomStore = useChatRoomStore();
const getUserInfo = async () => {
	userInfo.value = await chatRoomStore.getChannelJoinedInfo(
		userInfo.value.channelId ?? ""
	);
};

const computedStyle = computed(() => {
	return {
		width: "350px",
		top: popupPos.value[0] + "px",
		left: popupPos.value[1] + "px",
	};
});

const userStatus = computed(() => {
	return <ChatUserSettingProps>{
		channelId: userInfo.value.channelId,
		isBaned: userInfo.value.blockTime === "NoBlock" ? false : true,
		isMod: userInfo.value.role == "Moderator",
	};
});

const toggleBan = (value: ChatRoomBlockTimeType) => {
	value === "NoBlock"
		? (userStatus.value.isBaned = false)
		: (userStatus.value.isBaned = true);
	qMenuRef.value?.hide();
	emit("toggleBan", value);
};

const toggleMod = (value: boolean) => {
	userStatus.value.isMod = value;
	qMenuRef.value?.hide();
	emit("toggleMod", value);
};
</script>

<style lang="scss" scoped>
.user-info {
	border-top: 3px solid $positive;
	&-banner {
		// background-image: url("https://img.nimo.tv/t/1639520760395/202111261637952763880_1639520760395_avatar.png/w120_l0/img.png");
		// background-size: cover;
		// background-repeat: no-repeat;
		cursor: move;
	}
}
</style>
