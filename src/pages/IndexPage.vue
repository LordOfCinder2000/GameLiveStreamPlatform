<template>
	<q-page padding class="q-pa-lg" style="width: 200px">
		<q-card v-if="show" flat class="cursor-pointer home-games">
			<div class="home-games-img flex">
				<span class="home-games-img-content fit relative-position">
					<q-img
						:ratio="2 / 3"
						loading="lazy"
						draggable
						src="https://static-cdn.jtvnw.net/ttv-boxart/21779-188x282.jpg"
						no-spinner
						placeholder-src="~assets/images/place-holder.png"
					>
						<template v-slot:error>
							<div
								class="absolute-full flex flex-center bg-negative text-white"
							>
								Cannot load image
							</div>
						</template>
					</q-img>
					<div
						class="home-games-img-overlay absolute-full show-overlay-image text-left column"
					>
						<div class="q-ma-md relative-position col">
							<div class="text-h6 text-white">LMHT</div>
							<q-separator
								class="bg-positive rounded-borders"
								size="0.5rem"
								width="30%"
							/>

							<q-btn
								unelevated
								round
								class="img-overlay-btn absolute-bottom-right"
								icon="double_arrow"
								color="positive"
							/>
						</div>
					</div>
				</span>
			</div>

			<q-card-section class="no-wrap no-padding">
				<div class="text-hover text-h6 ellipsis">Changing Planet</div>

				<div
					class="text-subtitle2 text-weight-light ellipsis text-hover"
				>
					236,3 N người xem
				</div>
				<div>
					<q-chip
						class="no-margin"
						square
						size="0.8rem"
						dense
						clickable
						label=""
					>
						<span class="ellipsis">Game PC</span>
					</q-chip>
				</div>
			</q-card-section>
		</q-card>
		<div v-else>
			<q-card flat class="home-games">
				<div class="home-games-skeleton flex">
					<div class="fit relative-position">
						<q-responsive :ratio="2 / 3">
							<q-skeleton type="QImg"></q-skeleton>
						</q-responsive>
					</div>
				</div>

				<q-card-section class="q-mt-sm no-wrap no-padding">
					<q-skeleton square width="90%" />
					<q-skeleton
						square
						class="q-mt-sm"
						width="60%"
						height="1rem"
					/>
					<q-skeleton
						width="40%"
						height="1.5rem"
						type="QChip"
						class="rounded-borders q-mt-xs"
					/>
				</q-card-section>
			</q-card>
		</div>
	</q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const show = ref(false);

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

const onClick = async (event) => {
	await waitFor(1000);
	show.value = true;
};

onMounted(() => {
	onClick();
});
</script>

<style lang="scss" scoped>
.home-games {
	&-img {
		&:hover {
			background-color: $positive;
		}
		border-radius: $generic-border-radius !important;
		-webkit-transition: background-color 0.3s ease-in-out;
		transition: background-color 0.3s ease-in-out;
		&-content {
			display: inline-block;
			overflow: hidden;
			border-radius: $generic-border-radius;
			text-align: center;
			vertical-align: middle;
			white-space: nowrap;
			transition: all 0.3s;
			&:hover {
				-webkit-transform: translateY(-15px) translateX(15px);
				transform: translateY(-15px) translateX(15px);
				.show-overlay-image {
					opacity: 1;
					border-color: $positive;
				}
			}
		}

		-webkit-transform: skew(-8.745deg) translateX(1.2rem);
		transform: skew(-8.745deg) translateX(1.2rem);

		will-change: transform, opacity;

		&-overlay {
			background-color: $dimmed-background;
			border-style: solid;
			border-width: 3px;
			opacity: 0;
			-webkit-transition: $generic-hover-transition;
			transition: $generic-hover-transition;
			border-radius: $generic-border-radius;
		}
	}
	.q-img {
		// transform-origin: top right;
		-webkit-transform: skew(8.745deg) scale(1.23);
		transform: skew(8.745deg) scale(1.23);
	}
	.img-overlay-btn {
		-webkit-transform: skew(8.745deg);
		transform: skew(8.745deg);
	}
}

.home-games-skeleton {
	-webkit-transform: skew(-8.745deg) translateX(1.1rem);
	transform: skew(-8.745deg) translateX(1.1rem);
}
</style>

<!-- <template>
  <q-page>
    <div class="locale-changer absolute-center column fit">
      <select v-model="$i18n.locale" class="col-sink">
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
      <UserCard class="col" :user="{ followers: 10000 }" />
    </div>
  </q-page>
</template>

<script>
import { inject, defineAsyncComponent, defineComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "IndexPage",
  components: {
    UserCard: defineAsyncComponent(() =>
      import("components/live-info/UserCard.vue")
    ),
  },

  setup() {
    const appName = inject("appName");
    console.log(appName);
    const { locale } = useI18n({ useScope: "global" });
    const $q = useQuasar();

    console.log(locale);
    watch(locale, () => {});
    return {
      langs: ref(["ja", "en"]),
    };
  },
});
</script>

<style lang="scss" scoped></style> -->
