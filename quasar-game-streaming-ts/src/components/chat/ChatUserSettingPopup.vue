<template>
	<q-menu @before-show="beforeShow">
		<q-list class="text-subtitle2" dense style="min-width: 150px">
			<q-item
				v-if="authorize"
				style="padding: 0px 8px"
				clickable
				v-close-popup="isBaned"
				@click="unbanChannel"
			>
				<q-item-section style="padding: 8px; min-width: 0" avatar>
					<q-icon
						size="1rem"
						:name="isBaned ? 'speaker_notes' : 'speaker_notes_off'"
					/>
				</q-item-section>
				<q-item-section>
					{{ isBaned ? "Unban" : "Ban" }}
				</q-item-section>
				<q-item-section v-if="!isBaned" side>
					<q-icon name="keyboard_arrow_right" />
				</q-item-section>
				<q-dialog v-model="showBanPopup">
					<q-card>
						<q-toolbar>
							<q-btn dense class="invisible">
								<q-icon />
							</q-btn>

							<q-toolbar-title class="text-center text-subtitle2">
								Banned to Comment
							</q-toolbar-title>
							<q-btn flat dense icon="close" v-close-popup />
						</q-toolbar>
						<q-separator color="positive" />
						<q-card-section class="overflow-hidden">
							<div class="row q-col-gutter-md">
								<div
									v-for="(
										banTime, index
									) in chatRoomStore.banTimes"
									:key="index"
									class="col-4 flex flex-center"
								>
									<q-btn
										style="min-width: 120px"
										class="q-px-md"
										:color="
											banTime.time == selectedBanTime
												? 'positive'
												: ''
										"
										outline
										dense
										:label="banTime.label"
										no-caps
										@click="selectBanTime(banTime.time)"
									/>
								</div>
							</div>
						</q-card-section>
						<q-separator color="positive" />
						<q-card-actions align="around">
							<q-btn
								style="min-width: 120px"
								unelevated
								color="positive"
								no-caps
								v-close-popup
								@click="banChannel"
							>
								Submit
							</q-btn>
							<q-btn
								v-close-popup
								style="min-width: 120px"
								outline
								color="positive"
								no-caps
							>
								Cancel
							</q-btn>
						</q-card-actions>
					</q-card>
				</q-dialog>
			</q-item>

			<q-item
				v-if="userProfileStore.isAdminOfChatRoom"
				style="padding: 0px 8px"
				clickable
				@click="toggleMod(!isMod)"
			>
				<q-item-section style="padding: 8px; min-width: 0" avatar>
					<q-icon size="1rem">
						<img
							v-if="isMod"
							src="~assets/images/unmod-badge.png"
							alt=""
							loading="eager"
						/>
						<q-img
							loading="eager"
							v-else
							src="~assets/images/mod-badge.png"
							alt=""
						/>
					</q-icon>
				</q-item-section>
				<q-item-section>{{
					isMod ? "Unmod" : "Set Mod"
				}}</q-item-section>
			</q-item>

			<q-separator />
			<q-item style="padding: 0px 8px" clickable v-close-popup>
				<q-item-section style="padding: 8px; min-width: 0" avatar>
					<q-icon size="1rem" name="flag"> </q-icon>
				</q-item-section>
				<q-item-section>Report</q-item-section>
			</q-item>
		</q-list>
	</q-menu>
</template>

<script lang="ts" setup>
import { QDialog, useQuasar } from "quasar";
import { apiClient, ChatRoomBlockTimeType } from "boot/openapi-client";
import { useChatRoomStore } from "stores/components/chat-room-store";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useUserProfileStore } from "stores/user-profile-store";

export interface Props {
	channelId: string;
	isBaned: boolean;
	isMod: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "toggleBan", value: ChatRoomBlockTimeType): void;
	(e: "toggleMod", value: boolean): void;
}>();

const $q = useQuasar();
const chatRoomStore = useChatRoomStore();
const selectedBanTime = ref(chatRoomStore.banTimes[0].time);
const selectBanTime = (value: ChatRoomBlockTimeType) => {
	selectedBanTime.value = value;
};

const banChannel = async () => {
	// Call api ban channel
	await apiClient.chatRoom
		.blockChannel(
			chatRoomStore.chatRoom.id ?? "",
			props.channelId,
			selectedBanTime.value
		)
		.then(() => {
			showBanPopup.value = false;
			emit("toggleBan", selectedBanTime.value);
		})
		.catch((error: ApiError) => {
			if (error.status === 403 && error.body.error)
				$q.notify({
					type: "negative",
					message: error.body.error.message ?? "Error ban action!",
				});
		});
};

const unbanChannel = async () => {
	// khong bi ban thi ban
	if (!props.isBaned) {
		showBanPopup.value = true;
	} else {
		// co bi ban thi unban
		await apiClient.chatRoom
			.unblockChannel(chatRoomStore.chatRoom.id ?? "", props.channelId)
			.then(() => {
				emit("toggleBan", "NoBlock");
			})
			.catch((error: ApiError) => {
				console.log(error);
				if (error.status === 403 && error.body.error)
					$q.notify({
						type: "negative",
						message:
							error.body.error.message ?? "Error unban action!",
					});
			});
	}
};

const toggleMod = async (value: boolean) => {
	//call api mod
	if (value) {
		await apiClient.chatRoom
			.setChannelModerator(
				chatRoomStore.chatRoom.id ?? "",
				props.channelId
			)
			.then(() => {
				emit("toggleMod", value);
			})
			.catch((error: ApiError) => {
				console.log(error);
				if (error.status === 403 && error.body.error)
					$q.notify({
						color: "negative",
						message:
							error.body.error.message ?? "Error set mod action!",
					});
			});
	} else {
		await apiClient.chatRoom
			.unsetChannelModerator(
				chatRoomStore.chatRoom.id ?? "",
				props.channelId
			)
			.then(() => {
				emit("toggleMod", value);
			})
			.catch((error: ApiError) => {
				console.log(error);
				if (error.status === 403 && error.body.error)
					$q.notify({
						type: "negative",
						message:
							error.body.error.message ??
							"Error unset mod action!",
					});
			});
	}
};

const showBanPopup = ref(false);

const toolbarStyle = {
	padding: 0,
	"min-height": "2.5rem",
	"padding-right": "8px",
};

const beforeShow = async () => {
	await chatRoomStore.getListModerator().catch((error) => {
		console.log(error);
	});
};

const userProfileStore = useUserProfileStore();
const authorize = computed(() => {
	return (
		userProfileStore.isAdminOfChatRoom || userProfileStore.isModOfChatRoom
	);
});
</script>

<style lang="scss"></style>
