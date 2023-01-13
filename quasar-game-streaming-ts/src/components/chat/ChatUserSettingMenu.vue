<template>
	<q-menu>
		<q-list class="text-subtitle2" dense style="min-width: 150px">
			<q-item
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
				<q-menu
					v-if="!isBaned"
					separate-close-popup
					fit
					anchor="top end"
					self="top end"
				>
					<div>
						<q-toolbar :style="toolbarStyle">
							<q-icon
								size="1.5rem"
								v-close-popup
								name="keyboard_arrow_left"
								class="cursor-pointer q-mx-xs"
							/>

							<q-toolbar-title
								style="padding-left: 0"
								class="text-subtitle2"
							>
								Ban user: testusername
							</q-toolbar-title>
						</q-toolbar>
						<q-separator color="positive" />
						<q-list dense>
							<q-item
								v-for="(banTime, index) in banTimes"
								:key="index"
								dense
								clickable
								v-close-popup
							>
								<q-item-section
									@click="banChannel(banTime.time)"
								>
									{{ banTime.label }}
								</q-item-section>
							</q-item>
						</q-list>
					</div>
				</q-menu>
			</q-item>

			<q-item
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
						/>
						<img v-else src="~assets/images/mod-badge.png" alt="" />
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
import { ref } from "vue";
import { apiClient, ChatRoomBlockTimeType } from "boot/openapi-client";
import { useChatRoomStore } from "stores/components/chat-room-store";
export interface Props {
	channelId: string;
	isBaned: boolean;
	isMod: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "toggleBan", value: boolean): void;
	(e: "toggleMod", value: boolean): void;
}>();

const banTimes = ref<
	{
		label: string;
		time: ChatRoomBlockTimeType;
	}[]
>([
	{
		label: "5 minutes",
		time: "FiveMinutes",
	},
	{
		label: "30 minutes",
		time: "ThirtyMinutes",
	},
	{
		label: "60 minutes",
		time: "SixtyMinutes",
	},
	{
		label: "1 day",
		time: "OneDay",
	},
	{
		label: "1 week",
		time: "OneWeek",
	},
	{
		label: "365 days",
		time: "OneYear",
	},
]);

const chatRoomStore = useChatRoomStore();
const banChannel = async (banValue: ChatRoomBlockTimeType) => {
	// Call api ban channel
	await apiClient.chatRoom
		.blockChannel(
			chatRoomStore.chatRoom.id ?? "",
			props.channelId,
			banValue
		)
		.then(() => {})
		.catch((error) => {
			console.log(error);
		});

	emit("toggleBan", true);
};

const unbanChannel = async () => {
	//call api un ban
	// khong bi ban thi ban
	if (props.isBaned) {
		// co bi ban thi unban
		await apiClient.chatRoom
			.unblockChannel(chatRoomStore.chatRoom.id ?? "", props.channelId)
			.then(() => {
				emit("toggleBan", false);
			})
			.catch((error) => {
				console.log(error);
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
			.catch((error) => {
				console.log(error);
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
			.catch((error) => {
				console.log(error);
			});
	}
};

const toolbarStyle = {
	padding: 0,
	"min-height": "2.5rem",
	"padding-right": "8px",
};
</script>

<style lang="scss"></style>
