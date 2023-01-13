<template>
	<q-menu transition-show="jump-down" transition-hide="jump-up">
		<q-list :style="{ 'max-width': width }" class="scroll" dense>
			<q-toolbar>
				<div><q-icon /></div>

				<q-toolbar-title class="text-center text-subtitle2">
					Chat room settings</q-toolbar-title
				>
				<q-btn flat dense icon="close" v-close-popup />
			</q-toolbar>
			<q-separator />
			<q-item
				v-for="menuItem in menuItems"
				:key="menuItem.id"
				:clickable="menuItem.click != null"
				:v-ripple="menuItem.sideComponent == null"
				@click.prevent="menuItem.click"
			>
				<q-item-section avatar top>
					<q-avatar :icon="menuItem.icon" />
				</q-item-section>

				<q-item-section>
					<q-item-label lines="1">{{ menuItem.label }}</q-item-label>
				</q-item-section>

				<q-item-section side>
					<component :is="menuItem.sideComponent"></component>
				</q-item-section>
				<!-- Submenu -->
				<q-menu
					v-if="menuItem.submenu"
					separate-close-popup
					transition-show="jump-down"
					transition-hide="jump-up"
					anchor="center middle"
					self="center middle"
					@update:model-value="submenuToggle"
				>
					<q-list
						:style="{ 'max-width': width }"
						class="scroll"
						dense
					>
						<q-toolbar>
							<q-btn
								flat
								dense
								icon="keyboard_arrow_left"
								v-close-popup
							/>

							<q-toolbar-title class="text-center text-subtitle2">
								{{ menuItem.label }}
							</q-toolbar-title>

							<div><q-icon /></div>
						</q-toolbar>
						<q-separator />
						<!-- Submenu title -->
						<q-item>
							<q-item-section>
								<q-item-label>
									{{ menuItem.submenu.title }}
								</q-item-label>
							</q-item-section>
							<q-item-section side>
								<q-toggle
									v-model="menuItem.submenu.model"
									color="positive"
								/>
							</q-item-section>
						</q-item>
						<q-separator />
						<!-- Submenu items -->
						<q-item
							v-for="submenuItem in menuItem.submenu.items"
							:key="submenuItem.id"
							:disable="!menuItem.submenu.model"
						>
							<q-item-section avatar top>
								<q-radio
									:disable="!menuItem.submenu.model"
									v-model="rateLimit"
									:val="submenuItem.value"
									color="positive"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label lines="1"
									>{{ submenuItem.label }}
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-menu>
			</q-item>
		</q-list>
	</q-menu>
</template>

<script lang="ts" setup>
import {
	ref,
	h,
	computed,
	cloneVNode,
	watch,
	onBeforeMount,
	toRef,
	toRaw,
	markRaw,
	onMounted,
} from "vue";
import { QToggle, QIcon, extend, throttle, debounce } from "quasar";
import { useChatRoomStore } from "stores/components/chat-room-store";
import { useUserProfileStore } from "stores/user-profile-store";

export interface Props {
	width: number;
}

const props = withDefaults(defineProps<Props>(), {
	width: 380,
});
const emit = defineEmits<{
	(e: "hideChatBox"): void;
	(e: "toggleTimestamp", value: boolean): void;
	(e: "toggleNotification", value: boolean): void;
}>();

const width = computed(() => {
	return props.width - 15 + "px";
});

const qIconRightRateLimit = () =>
	h("div", { class: ["row", "items-center"] }, [
		submenuRateLimitItems.value.model
			? submenuRateLimitItems.value.items.find(
					(x) => x.value == rateLimit.value
			  )?.label
			: "OFF",
		cloneVNode(
			h(QIcon, {
				name: "keyboard_arrow_right",
			}),
			{ size: "32px" }
		),
	]);

const qToggle = h(QToggle, {
	color: "positive",
});

const onTimestamp = ref(false);
const qToggleTimestamp = () =>
	cloneVNode(qToggle, {
		modelValue: onTimestamp.value,
		"onUpdate:model-value": (value: boolean) => {
			onTimestamp.value = value;
		},
	});

const onNotifications = ref(false);
const qToggleNotifications = () =>
	cloneVNode(qToggle, {
		modelValue: onNotifications.value,
		"onUpdate:model-value": (value: boolean) => {
			onNotifications.value = value;
		},
	});

watch(onTimestamp, () => {
	emit("toggleTimestamp", onTimestamp.value);
});
watch(onNotifications, () => {
	emit("toggleNotification", onNotifications.value);
});

const chatRoomStore = useChatRoomStore();
const rateLimit = ref(3);

const submenuRateLimitToggle = ref(false);
const submenuRateLimitItems = ref({
	title: "Require users to wait between sending messages.",
	model: submenuRateLimitToggle,
	items: [
		{
			id: 1,
			label: "3 seconds",
			value: 3,
		},
		{
			id: 2,
			label: "5 seconds",
			value: 5,
		},
		{
			id: 3,
			label: "10 seconds",
			value: 10,
		},
		{
			id: 4,
			label: "15 seconds",
			value: 15,
		},
		{
			id: 5,
			label: "30 seconds",
			value: 30,
		},
		{
			id: 5,
			label: "60 seconds",
			value: 60,
		},
	],
});

watch(rateLimit, (data) => {
	if (chatRoomStore.settings.sendMessageRateLimitRule !== undefined)
		chatRoomStore.settings.sendMessageRateLimitRule = {
			period: data + "s",
		};
});
watch(submenuRateLimitToggle, (data) => {
	if (chatRoomStore.settings.sendMessageRateLimitRule !== undefined) {
		if (!data) {
			chatRoomStore.settings.sendMessageRateLimitRule = {
				period: null,
			};
		} else {
			chatRoomStore.settings.sendMessageRateLimitRule = {
				period: rateLimit.value + "s",
			};
		}
	}
});

let settingRateLimitRaw: string | null;
let settingFollowerOnlyRaw: boolean;
onMounted(async () => {
	await chatRoomStore
		.getChatRoomSetting()
		.then((data) => {
			submenuRateLimitToggle.value = data.sendMessageRateLimitRule
				? true
				: false;
			rateLimit.value = parseInt(
				data.sendMessageRateLimitRule?.period ?? "3s"
			);
			// settingsRaw = extend(true, {}, data);
			// settingRateLimitRaw = cloneDeep(
			// 	data.sendMessageRateLimitRule ?? {}
			// );

			settingRateLimitRaw = data.sendMessageRateLimitRule?.period ?? null;
			settingFollowerOnlyRaw = data.followerSendMessageOnly ?? false;
		})
		.catch((error) => {
			console.log(error);
		});
});

// const onFollowerOnly = ref(settings.value.followerSendMessageOnly);
const toggleFollowerOnly = debounce(async (value: boolean) => {
	if (settingFollowerOnlyRaw != value) {
		await chatRoomStore.toggleFollowerOnly().then(() => {
			settingFollowerOnlyRaw = value;
		});
	}
}, 500);
const qToggleFollowerOnly = () =>
	cloneVNode(qToggle, {
		modelValue: chatRoomStore.settings.followerSendMessageOnly,
		"onUpdate:model-value": (value: boolean) => {
			chatRoomStore.settings.followerSendMessageOnly = value;
			toggleFollowerOnly(value);
		},
	});

const submenuToggle = (value: boolean) => {
	if (!value) {
		// Call api on/off rate limit
		// on
		// const differences = diffProps(
		// 	chatRoomStore.settings.sendMessageRateLimitRule,
		// 	settingRateLimitRaw
		// ) as UpdateSendMessageRateLimitRuleDto;

		const con =
			settingRateLimitRaw !=
			chatRoomStore.settings.sendMessageRateLimitRule?.period;

		if (con) {
			if (submenuRateLimitItems.value.model) {
				chatRoomStore.setRateLimit(rateLimit.value).then(() => {
					settingRateLimitRaw =
						chatRoomStore.settings.sendMessageRateLimitRule
							?.period ?? null;
				});
				console.log("call api set rate limit: " + rateLimit.value);
			}

			// off
			else {
				chatRoomStore.unsetRateLimit().then(() => {
					settingRateLimitRaw =
						chatRoomStore.settings.sendMessageRateLimitRule
							?.period ?? null;
				});
				console.log("call api un set rate limit");
			}
		}
	}
};

const userProfileStore = useUserProfileStore();
const menuItems = computed(() => {
	return userProfileStore.isAdminOfChatRoom
		? [
				{
					id: 1,
					icon: "comments_disabled",
					label: "Hide chat box",
					click: () => emit("hideChatBox"),
				},
				{
					id: 2,
					icon: "schedule",
					label: "Show timestamp",
					sideComponent: qToggleTimestamp,
				},
				{
					id: 3,
					icon: "safety_check",
					label: "Slow mode",
					sideComponent: qIconRightRateLimit,
					submenu: submenuRateLimitItems.value,
				},
				{
					id: 4,
					icon: "favorite_border",
					label: "Follower chat only",
					sideComponent: qToggleFollowerOnly,
				},
				{
					id: 5,
					icon: "notifications_active",
					label: "Disable chat room notifications",
					sideComponent: qToggleNotifications,
				},
		  ]
		: [
				{
					id: 1,
					icon: "comments_disabled",
					label: "Hide chat box",
					click: () => emit("hideChatBox"),
				},
				{
					id: 2,
					icon: "schedule",
					label: "Show timestamp",
					sideComponent: qToggleTimestamp,
				},
				{
					id: 5,
					icon: "notifications_active",
					label: "Disable chat room notifications",
					sideComponent: qToggleNotifications,
				},
		  ];
});
</script>

<style lang="scss"></style>
