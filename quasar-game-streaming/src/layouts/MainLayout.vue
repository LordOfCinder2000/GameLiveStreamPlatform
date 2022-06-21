<template>
	<q-layout view="hHh Lpr lff">
		<q-header
			elevated
			:class="[
				$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-dark',
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
				<q-toolbar-title style="min-width: 5rem" class="q-pa-sm" shrink>
					<q-avatar class="rotating bg-positive">
						<img
							src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
						/>
					</q-avatar>
					<span class="q-pl-sm">GameLive</span>
				</q-toolbar-title>

				<q-tabs
					class="text-weight-bold gt-xs col"
					inline-label
					v-model="tab"
					align="center"
					indicator-color="transparent"
					active-color="positive"
					stretch
					narrow-indicator
					shrink
					dense
				>
					<q-tab
						class="link-hover"
						:ripple="false"
						no-caps
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
						no-caps
						name="Live"
						icon="live_tv"
					>
						<label class="gt-md q-pl-sm cursor-inherit"
							>Phát trực tiếp</label
						>
					</q-tab>

					<q-tab
						@mouseover="hoverBtnHandel"
						@mouseleave="leaveBtnHandel"
						:ripple="false"
						no-caps
						name="Category"
						icon="category"
						class="link-hover"
					>
						<c-tooltip
							popover
							v-model="showTooltipCategory"
							no-parent-event
							@mouseover="hoverTHandel"
							@mouseleave="leaveTHandel"
							transition-show="fade"
							transition-hide="fade"
							class="all-pointer-events"
							arrow="top"
							:offset="[5, 5]"
							ref="tooltip"
						>
							<div class="block" style="width: 400px">
								<p v-for="n in 1" :key="n">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Fugit ectus commodi
									perferendis voluptate?
								</p>
							</div>
						</c-tooltip>
						<label class="gt-md q-pl-sm cursor-inherit"
							>Phân loại
						</label>
						<q-icon
							class="q-btn-dropdown__arrow"
							:class="{ 'rotate-180': rotateArrow }"
							name="arrow_drop_down"
							size="sm"
						/>
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
						/>
						<q-btn
							no-wrap
							no-caps
							color="positive"
							label="Đăng nhập"
						>
						</q-btn>
					</div>
				</div>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-if="routerName && !routerName.includes('user')"
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
			<router-view> </router-view>
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
</template>

<script>
import { defineComponent, ref, watch, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import EssentialLink from "components/EssentialLink.vue";
import HomeSidebar from "components/sidebar/HomeSidebar.vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { event } from "quasar";
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
		// "q-popper": Popper,
		// QPopper,
		"c-tooltip": require("components/CustomTooltip.vue").default,
	},

	setup() {
		const $q = useQuasar();

		// $q.loadingBar.start();
		// $q.loadingBar.stop();
		// $q.loadingBar.setDefaults({
		// 	color: "purple",
		// 	size: "15px",
		// 	position: "bottom",
		// });
		// $q.loadingBar.increment(value);
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
			// only fetch the user if the id changed as maybe only the query or the hash changed
			routerName.value = to.name;
		});
		const tooltip = ref(null);
		return {
			routerName,
			showTooltipCategory,
			essentialLinks: linksList,
			rotateArrow,
			leftDrawerOpen,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},
			checkDrawerClass,
			showBtnMenu,
			hoverTooltip,
			hoverBtn,
			tooltip,
			hoverBtnHandel() {
				rotateArrow.value = true;
				showTooltipCategory.value = true;
				hoverBtn.value = true;
				hoverTooltip.value = false;
			},
			leaveBtnHandel(e) {
				e.preventDefault();

				setTimeout(() => {
					if (!hoverTooltip.value) {
						rotateArrow.value = false;
						showTooltipCategory.value = false;
					}
				}, 100);
			},
			leaveBtn2Handel(e) {
				event.stopAndPrevent(e);
			},
			hoverTHandel(e) {
				rotateArrow.value = true;
				showTooltipCategory.value = true;
				hoverTooltip.value = true;
				hoverBtn.value = false;
			},
			leaveTHandel(e) {
				setTimeout(() => {
					if (!hoverBtn.value) {
						rotateArrow.value = false;
						showTooltipCategory.value = false;
					}
				}, 100);
			},
			darkModeHandel() {
				$q.dark.toggle();
			},
		};
	},

	data() {
		return {
			miniState: true,
			pinDrawer: false,
			tab: "Home",
			searchText: "",
			darkMode: false,
		};
	},
});
</script>

<style lang="scss">
.q-drawer-container {
	.q-drawer {
		z-index: 3000;
	}
}
.q-footer {
	z-index: 1998;
}
</style>

<!-- <VTooltip class="fit" :triggers="['hover']" :popperTriggers="['hover']">
            <q-tab
              class="link-hover fit"
              :ripple="false"
              no-caps
              name="Home"
              icon="home"
            >
              <label class="gt-md q-pl-sm cursor-inherit">Trang chủ</label>
            </q-tab>

            <template #popper>
              <q-card class="my-card">
                <img
                  width="100px"
                  height="100px"
                  src="https://cdn.quasar.dev/img/mountains.jpg"
                />
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </q-card-section>
              </q-card>
            </template>
          </VTooltip> -->
