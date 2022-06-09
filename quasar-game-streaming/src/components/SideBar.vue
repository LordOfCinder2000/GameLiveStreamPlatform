<template>
	<q-list class="sidebar-wrapper" separator>
		<q-item
			class="sidebar-item no-border rounded-borders text-weight-bold text-body1 text-capitalize q-pa-sm"
			clickable
		>
			<q-item-section avatar>
				<q-icon name="favorite" />
			</q-item-section>
			<q-item-section>Yêu thích</q-item-section>
		</q-item>
		<q-expansion-item
			icon="desktop_windows"
			label="Game PC"
			class="sidebar-item list-header rounded-borders no-border"
			header-class="rounded-borders text-weight-bold text-body1 text-capitalize q-pa-sm"
		>
			<q-list
				dark
				class="overflow-auto list-items rounded-borders bg-grey-8"
				bordered
			>
				<div class="q-gutter-y-sm q-pa-sm">
					<q-item
						v-for="n in 5"
						:key="n"
						class="list-item rounded-borders bg-green"
						clickable
						v-ripple
					>
						<q-item-section avatar>
							<q-avatar>
								<img
									src="https://cdn.quasar.dev/img/boy-avatar.png"
								/>
							</q-avatar>
						</q-item-section>
						<q-item-section>
							<q-item-label lines="1"
								>Single line item</q-item-label
							>
							<q-item-label caption lines="1"
								>Game offline</q-item-label
							></q-item-section
						>
						<q-item-section side>
							<q-item-label caption lines="1"
								>Live<q-icon name="circle"
							/></q-item-label>
							<q-item-label caption lines="1"
								><q-icon name="face" />12.2k</q-item-label
							>
						</q-item-section>
					</q-item>
					<q-item
						class="list-item-more rounded-borders bg-green"
						clickable
						v-ripple
						dense
					>
						<q-item-section>
							<q-item-label class="self-center"
								>Thêm ></q-item-label
							>
						</q-item-section>
					</q-item>
				</div>
			</q-list>
		</q-expansion-item>

		<q-expansion-item
			icon="smartphone"
			label="Game Mobile"
			class="sidebar-item rounded-borders list-header no-border"
			header-class="rounded-borders text-weight-bold text-body1 text-capitalize q-pa-sm"
		>
			<q-list
				dark
				class="overflow-auto list-items rounded-borders bg-grey-8"
				bordered
			>
				<div class="q-gutter-y-sm q-pa-sm">
					<q-item
						v-for="n in 5"
						:key="n"
						class="list-item rounded-borders bg-green"
						clickable
						v-ripple
					>
						<q-item-section avatar>
							<q-avatar>
								<img
									src="https://cdn.quasar.dev/img/boy-avatar.png"
								/>
							</q-avatar>
						</q-item-section>
						<q-item-section>
							<q-item-label lines="1"
								>Single line item</q-item-label
							>
							<q-item-label caption lines="1"
								>Game offline</q-item-label
							></q-item-section
						>
						<q-item-section side>
							<q-item-label caption lines="1"
								>Live<q-icon name="circle"
							/></q-item-label>
							<q-item-label caption lines="1"
								><q-icon name="face" />12.2k</q-item-label
							>
						</q-item-section>
					</q-item>
					<q-item
						class="list-item-more rounded-borders bg-green"
						clickable
						v-ripple
						dense
					>
						<q-item-section>
							<q-item-label class="self-center"
								>Thêm ></q-item-label
							>
						</q-item-section>
					</q-item>
				</div>
			</q-list>
		</q-expansion-item>

		<q-item
			class="sidebar-item no-border rounded-borders text-weight-bold text-body1 text-capitalize q-pa-sm"
			clickable
		>
			<q-item-section avatar>
				<q-icon name="sports_esports" />
			</q-item-section>
			<q-item-section>Game Console</q-item-section>
		</q-item>

		<q-item
			class="sidebar-item no-border rounded-borders text-weight-bold text-body1 text-capitalize q-pa-sm"
			clickable
		>
			<q-item-section avatar>
				<q-icon name="music_note" />
			</q-item-section>
			<q-item-section>Giải trí</q-item-section>
		</q-item>
	</q-list>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "SideBar",
	props: {
		title: {
			type: String,
		},

		caption: {
			type: String,
			default: "",
		},

		link: {
			type: String,
			default: "#",
		},

		icon: {
			type: String,
			default: "",
		},
	},
	setup(context) {
		return {};
	},
});
</script>
<style lang="scss">
.sidebar-wrapper {
	.sidebar-item {
		margin-bottom: 0.5rem;
	}
	.q-item__section--avatar {
		min-width: 2rem;
		padding-right: 0.5rem;
	}
}
</style>
