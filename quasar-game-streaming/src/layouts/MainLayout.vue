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
				<q-toolbar>
					<q-btn
						v-if="showBtnMenu"
						flat
						@click="leftDrawerOpen = !leftDrawerOpen"
						round
						dense
						icon="menu"
					/>
					<q-toolbar-title
						class="q-pa-sm cursor-pointer"
						@click="gotoHomePage"
						shrink
					>
						<q-avatar class="rotating bg-positive">
							<img
								src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
							/>
						</q-avatar>
						<span class="q-pl-sm text-weight-bold">GameLive</span>
					</q-toolbar-title>

					<q-tabs
						class="text-weight-bold gt-xs"
						inline-label
						v-model="tab"
						align="left"
						indicator-color="transparent"
						active-color="positive"
						stretch
						shrink
						mobile-arrows
						no-caps
					>
						<q-tab
							class="link-hover"
							:ripple="false"
							name="Home"
							icon="home"
						>
							<label class="gt-md q-pl-sm cursor-inherit"
								>Trang chủ</label
							>
						</q-tab>

						<q-tab
							class="link-hover"
							:ripple="false"
							name="Live"
							icon="live_tv"
						>
							<label class="gt-md q-pl-sm cursor-inherit"
								>Trực tiếp</label
							>
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
							<label class="gt-md q-pl-sm cursor-inherit"
								>Phân loại
								<q-icon
									class="q-btn-dropdown__arrow"
									:class="{ 'rotate-180': rotateArrow }"
									name="arrow_drop_down"
									size="sm"
								/>
							</label>
						</q-tab>
					</q-tabs>

					<q-space />
					<!-- Tìm kiếm -->

					<q-input
						dense
						standout
						maxlength="100"
						debounce="1000"
						placeholder="Search"
						v-model="searchText"
						input-class="text-right"
						class="q-mr-md gt-md"
					>
						<template v-slot:append>
							<q-icon v-if="searchText === ''" name="search" />
							<q-icon
								v-else
								name="clear"
								class="cursor-pointer"
								@click="searchText = ''"
							/>
						</template>
					</q-input>

					<!-- Chế độ đêm -->
					<div class="overflow-hidden">
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
								no-wrap
								no-caps
								flat
								icon="videocam"
								label="Phát trực tiếp"
								class="gt-md"
							/>
							<q-btn
								class="gt-md"
								no-caps
								flat
								icon="monetization_on"
								padding="sm"
							/>
							<q-btn
								class="gt-md"
								no-caps
								flat
								icon="favorite"
								padding="sm"
							/>
							<q-btn
								class="gt-md"
								no-caps
								flat
								icon="history"
								padding="sm"
							/>
							<q-btn
								class="gt-md"
								no-caps
								flat
								icon="get_app"
								padding="sm"
							/>
							<q-btn
								class="lt-lg"
								no-caps
								flat
								icon="more_horiz"
								padding="sm"
							/>
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
							>
							</q-btn>
						</div>
					</div>
				</q-toolbar>
			</q-header>
		</transition>

		<q-drawer
			v-if="routerName && !routerName.includes('user') && showLayout"
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
				<div class="overflow-auto">
					<div class="col q-pt-lg">
						<div class="row no-wrap q-gutter-x-lg">
							<q-btn
								padding="xs"
								flat
								size="xl"
								icon="mdi-facebook"
							/>
							<q-btn
								padding="xs"
								flat
								size="xl"
								icon="mdi-youtube"
							/>
							<q-btn
								padding="xs"
								flat
								size="xl"
								icon="mdi-twitter"
							/>
							<q-btn
								padding="xs"
								flat
								size="xl"
								icon="mdi-instagram"
							/>
						</div>
					</div>
				</div>
				<div class="col-4"></div>
				<div class="col-auto">
					<p>
						Copyright &copy; {{ new Date().getFullYear() }} Huya
						PTE. LTD. All Rights Reserved
					</p>
				</div>
			</div>
		</q-footer>
	</q-layout>
	<AccountPopup v-model="accountPopupOpen" :tab="accountMode" class="z-max" />
</template>

<script>
import { defineComponent, ref, watch, onBeforeMount, nextTick } from "vue";
import { useQuasar } from "quasar";
import EssentialLink from "components/EssentialLink.vue";
import HomeSidebar from "components/sidebar/HomeSidebar.vue";
import AccountPopup from "components/account/AccountPopup.vue";
import CustomTooltip from "components/CustomTooltip.vue";
import CustomTooltipSimple from "components/CustomTooltipSimple.vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { event } from "quasar";
import { AuthService } from "boot/auth/oidc-oauth2";
import { useOidcStore } from "stores/modules/oidc-store";

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

export default defineComponent({
	name: "MainLayout",

	components: {
		HomeSidebar,
		AccountPopup,
		CustomTooltipSimple,
	},

	setup() {
		const $q = useQuasar();
		const rotateArrow = ref(false);
		const leftDrawerOpen = ref(false);
		const showBtnMenu = ref(false);
		const checkDrawerClass = (e) => {
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
		const layoutToggle = (val) => {
			showLayout.value = val;
		};

		//Login
		const accountPopupOpen = ref(false);

		const accountMode = ref("login");

		const gotoHomePage = () => {
			crRouter.push({ name: "home", path: "/" });
		};

		return {
			accountMode,
			accountPopupOpen,
			gotoHomePage,
			layoutToggle,
			showLayout,
			routerName,
			showTooltipCategory,
			essentialLinks: linksList,
			rotateArrow,
			leftDrawerOpen,
			checkDrawerClass,
			showBtnMenu,
			hoverTooltip,
			hoverBtn,
			miniState,
			pinDrawer,
			tab,
			searchText,
			darkMode,
			darkModeHandel() {
				$q.dark.toggle();
			},
		};
	},

	data() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
.q-drawer-container {
	:deep(.q-drawer) {
		z-index: 3000;
	}
}
.q-footer {
	z-index: 1998;
}
</style>
