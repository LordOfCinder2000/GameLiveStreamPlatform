<template>
	<q-layout view="hHh Lpr lff">
		<transition
			appear
			enter-active-class="animated slideInDown"
			leave-active-class="animated slideOutUp"
		>
			<q-header
				v-if="showLayout"
				elevated
				:class="[
					$q.dark.isActive
						? 'bg-dark text-white'
						: 'bg-white text-dark',
					showBtnMenu ? '' : 'z-max',
				]"
			>
				<q-toolbar class="items-stretch">
					<div class="items-center row">
						<q-btn
							v-if="showBtnMenu"
							flat
							@click="leftDrawerOpen = !leftDrawerOpen"
							round
							dense
							icon="menu"
						/>
					</div>

					<q-toolbar-title
						class="q-pa-sm cursor-pointer items-center row no-wrap"
						@click="gotoHomePage"
						style="min-width: unset; overflow: unset"
					>
						<q-avatar class="rotating bg-positive">
							<img
								src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
							/>
						</q-avatar>
						<img
							class="q-pl-sm"
							src="https://text2image.com/user_images/202209/text2image_W9439224_20220915_135641.png"
							alt=""
						/>
						<!-- <span class="q-pl-sm text-weight-bold">GameLive</span> -->
					</q-toolbar-title>

					<q-tabs
						class="text-weight-bold gt-xs"
						inline-label
						v-model="tab"
						align="left"
						indicator-color="transparent"
						active-color="positive"
						stretch
						outside-arrows
						mobile-arrows
						no-caps
					>
						<q-tab
							class="link-hover"
							:ripple="false"
							name="Home"
							icon="home"
						>
							<div class="q-tab__label gt-md">HOME</div>
						</q-tab>

						<q-tab
							class="link-hover"
							:ripple="false"
							name="Live"
							icon="live_tv"
						>
							<div class="q-tab__label gt-md">LIVE</div>
						</q-tab>
						<q-tab
							:ripple="false"
							name="Category"
							icon="category"
							class="link-hover"
							@mouseenter="
								() => {
									rotateArrow = false;
								}
							"
							@mouseleave="
								() => {
									rotateArrow = true;
								}
							"
						>
							<CustomTooltipSimple
								popover
								transition-show="fade"
								transition-hide="fade"
								class="all-pointer-events"
								arrow="top"
								:offset="[5, 5]"
								@mouseenter="
									() => {
										rotateArrow = false;
									}
								"
								@mouseleave="
									() => {
										rotateArrow = true;
									}
								"
							>
								<div class="block" style="width: 400px">
									<p v-for="n in 1" :key="n">
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Fugit ectus commodi
										perferendis voluptate?
									</p>
								</div>
							</CustomTooltipSimple>
							<div class="q-tab__label gt-md">
								CATEGORIES
								<q-icon
									class="q-btn-dropdown__arrow"
									:class="{ 'rotate-180': rotateArrow }"
									name="arrow_drop_down"
									size="sm"
								/>
							</div>
						</q-tab>
					</q-tabs>

					<q-space />
					<!-- Tìm kiếm -->
					<div class="items-center row">
						<q-input
							dense
							standout
							maxlength="100"
							debounce="1000"
							placeholder="Search"
							v-model="searchText"
							input-class="text-right"
							class="q-mr-md gt-md items-center"
						>
							<template v-slot:append>
								<q-icon
									v-if="searchText === ''"
									name="search"
								/>
								<q-icon
									v-else
									name="clear"
									class="cursor-pointer"
									@click="searchText = ''"
								/>
							</template>
						</q-input>
					</div>

					<!-- Chế độ đêm -->
					<div class="overflow-hidden row items-center">
						<div class="q-gutter-x-sm row no-wrap items-center">
							<q-toggle
								v-model="darkMode"
								checked-icon="nights_stay"
								color="black"
								unchecked-icon="sunny"
								class="gt-md"
								@click="darkModeHandel"
							/>
							<q-btn
								v-for="toolbarButton in toolbarButtons"
								:key="toolbarButton.id"
								no-wrap
								no-caps
								flat
								:icon="toolbarButton.icon"
								:label="toolbarButton.label"
								class="gt-md"
								:padding="
									toolbarButton.label ? undefined : 'sm'
								"
							/>
							<q-btn
								class="lt-lg"
								no-caps
								flat
								icon="more_horiz"
								padding="sm"
							/>
							<div
								v-if="!userLogin"
								class="q-gutter-x-sm row no-wrap items-center"
							>
								<q-btn
									no-wrap
									no-caps
									outline
									color="positive"
									label="Đăng ký"
									@click.prevent="
										accountPopupOpen = true;
										accountMode = 'register';
									"
									class="gt-xs"
								/>
								<q-btn
									no-wrap
									no-caps
									color="positive"
									label="Đăng nhập"
									@click.prevent="
										accountPopupOpen = true;
										accountMode = 'login';
									"
								/>
							</div>
							<q-avatar
								class="user-avatar cursor-pointer q-mx-sm relative-position"
								v-else
							>
								<q-img
									spinner-size="1rem"
									spinner-color="positive"
									initial-ratio="1"
									src="https://cdn.quasar.dev/img/chaosmonkey.png"
									placeholder-src="https://astatic.trovocdn.net/cat/img/e8ec087.webp"
								/>
								<AvatarMenu />
							</q-avatar>
						</div>
					</div>
				</q-toolbar>
			</q-header>
		</transition>

		<q-drawer
			v-if="
				routerName &&
				!routerName.includes('user') &&
				!routerName.includes('studio') &&
				showLayout
			"
			v-model="leftDrawerOpen"
			show-if-above
			:mini="miniState && !pinDrawer"
			@mouseover="miniState = false"
			@mouseout="miniState = true"
			:mini-to-overlay="!pinDrawer"
			:width="250"
			:breakpoint="500"
			elevated
			:ref="checkDrawerClass"
		>
			<q-list class="q-pa-sm">
				<q-item-label
					v-show="!showBtnMenu"
					class="flex justify-end no-padding"
					header
					style="color: inherit"
				>
					<q-btn
						@click="
							() => {
								pinDrawer = !pinDrawer;
								if (pinDrawer == false) {
									miniState = true;
								}
							}
						"
						dense
						flat
					>
						<q-icon
							name="mdi-arrow-expand-right"
							:class="[{ 'rotate-180': pinDrawer }]"
						/>
					</q-btn>
				</q-item-label>

				<HomeSidebar />
			</q-list>
		</q-drawer>

		<q-page-container class="main-container">
			<router-view @layout-toggle="layoutToggle"> </router-view>
			<q-page-scroller
				v-if="routerName !== 'watch-live'"
				position="bottom-right"
				:scroll-offset="150"
				:offset="[18, 18]"
			>
				<q-btn fab icon="keyboard_arrow_up" color="positive" />
			</q-page-scroller>
		</q-page-container>

		<q-footer
			v-if="routerName === 'home'"
			style="height: 200px"
			:class="[
				$q.dark.isActive
					? 'bg-dark text-white'
					: 'bg-green-1 text-dark',
			]"
		>
			<div class="column full-height items-center">
				<div class="col overflow-hidden flex items-center">
					<div class="row no-wrap q-gutter-x-lg">
						<q-btn
							v-for="footerButton in footerButtons"
							:key="footerButton.id"
							padding="xs"
							flat
							size="xl"
							:icon="footerButton.icon"
						/>
					</div>
				</div>
				<div class="col-shrink">
					<div class="fit flex items-center">
						<span class="text-h6 on-left">
							Powered by Ant Media
						</span>
						<a href="https://antmedia.io/" target="_blank">
							<q-icon size="xl">
								<img src="~assets/images/ams.png" alt="" />
							</q-icon>
						</a>
					</div>
				</div>
				<div class="col flex items-center">
					<div>
						Copyright &copy; {{ new Date().getFullYear() }} Game
						Streaming
					</div>
				</div>
			</div>
		</q-footer>
		<AccountPopup
			v-model="accountPopupOpen"
			:tab="accountMode"
			class="z-max"
		/>
	</q-layout>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watchEffect, defineAsyncComponent } from "vue";
import { useQuasar } from "quasar";
import EssentialLink from "components/EssentialLink.vue";
import HomeSidebar from "components/sidebar/HomeSidebar.vue";
import CustomTooltip from "components/CustomTooltip.vue";
import CustomTooltipSimple from "components/CustomTooltipSimple.vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { useOidcStore } from "stores/modules/oidc-store";
import { storeToRefs } from "pinia";
import { useAccountStore } from "stores/components/account-store";
const AccountPopup = defineAsyncComponent(
	() => import("components/account/AccountPopup.vue")
);
const AvatarMenu = defineAsyncComponent(
	() => import("components/menus/AvatarMenu.vue")
);

const linksList = [
	{
		title: "Docs",
		caption: "quasar.dev",
		icon: "school",
		link: "https://quasar.dev",
	},
	{
		title: "Github",
		caption: "github.com/quasarframework",
		icon: "code",
		link: "https://github.com/quasarframework",
	},
	{
		title: "Discord Chat Channel",
		caption: "chat.quasar.dev",
		icon: "chat",
		link: "https://chat.quasar.dev",
	},
	{
		title: "Forum",
		caption: "forum.quasar.dev",
		icon: "record_voice_over",
		link: "https://forum.quasar.dev",
	},
	{
		title: "Twitter",
		caption: "@quasarframework",
		icon: "rss_feed",
		link: "https://twitter.quasar.dev",
	},
	{
		title: "Facebook",
		caption: "@QuasarFramework",
		icon: "public",
		link: "https://facebook.quasar.dev",
	},
	{
		title: "Quasar Awesome",
		caption: "Community Quasar projects",
		icon: "favorite",
		link: "https://awesome.quasar.dev",
	},
];
const $q = useQuasar();
const rotateArrow = ref(false);
const leftDrawerOpen = ref(false);
const showBtnMenu = ref(false);
const checkDrawerClass = (e: any) => {
	if (e && e.$el.children.length > 1) {
		showBtnMenu.value = true;
	} else {
		showBtnMenu.value = false;
	}
};

const miniState = ref(true);
const pinDrawer = ref(false);
const tab = ref("Home");
const searchText = ref("");
const darkMode = ref(false);
const darkModeHandel = () => {
	$q.dark.toggle();
};

const showTooltipCategory = ref(false);
const hoverTooltip = ref(false);
const hoverBtn = ref(false);

const crRouter = useRouter();
const routerName = ref();
onBeforeMount(() => {
	routerName.value = crRouter.currentRoute.value.name;
	console.log(crRouter.currentRoute.value.name);
});
onBeforeRouteUpdate(async (to, from) => {
	routerName.value = to.name;
});

const showLayout = ref(true);
const layoutToggle = (val: boolean) => {
	showLayout.value = val;
};

//Login
const { loginPopupOpen } = storeToRefs(useAccountStore());
const accountPopupOpen = loginPopupOpen;

const accountMode = ref("login");
const userLogin = ref(false);
const oidcStore = storeToRefs(useOidcStore());
watchEffect(() => {
	if (oidcStore.oidcIsAuthenticated.value) {
		userLogin.value = true;
	} else {
		userLogin.value = false;
	}
});

const gotoHomePage = () => {
	crRouter.push({ name: "home", path: "/" });
};

const toolbarButtons = ref([
	{
		id: 1,
		icon: "videocam",
		label: "Phát trực tiếp",
	},
	{
		id: 2,
		icon: "notifications",
	},
	{
		id: 3,
		icon: "monetization_on",
	},
]);

const footerButtons = ref([
	{
		id: 1,
		icon: "mdi-facebook",
	},
	{
		id: 2,
		icon: "mdi-youtube",
	},
	{
		id: 3,
		icon: "mdi-twitter",
	},
	{
		id: 4,
		icon: "mdi-instagram",
	},
]);
</script>

<style lang="scss" scoped>
.q-toolbar {
	min-height: 60px;
	.q-toolbar__title {
		flex: 0;
	}
}
.q-drawer-container {
	:deep(.q-drawer) {
		z-index: 3000;
	}
}
.q-footer {
	z-index: 1998;
}

:deep(.user-avatar) {
	.q-avatar__content {
		&:hover {
			outline: 3px solid $positive;
			&:after {
				border-right-color: $positive;
				border-bottom-color: $positive;
			}
		}
		&:after {
			position: absolute;
			right: 0;
			bottom: 0;
			border-left: 3px solid transparent;
			border-top: 3px solid transparent;
			border-right: 3px solid gray;
			border-right-color: gray;
			border-bottom: 3px solid gray;
			border-bottom-color: gray;
			content: "";
		}
	}
}
</style>
