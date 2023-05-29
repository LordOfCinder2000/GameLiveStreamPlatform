<template>
	<div v-if="show">
		<q-card class="my-card cursor-pointer">
			<div class="relative-position overflow-hidden">
				<q-img
					loading="lazy"
					draggable
					src="https://api.lorem.space/image/game?w=1600&h=900"
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

				<q-icon
					size="50px"
					class="play-icon absolute-center"
					name="play_circle_outline"
					color="positive"
				/>
			</div>
			<div class="q-px-sm q-pb-sm">
				<div class="text-h6 text-hover ellipsis">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Autem itaque culpa molestiae ex veniam suscipit quo sapiente
					fuga. Et enim porro eveniet, quibusdam impedit ratione nam
					aliquam officia deleniti esse.
				</div>

				<div class="row flex-center">
					<!-- <q-item>
						<q-item-section top avatar>
							<q-avatar size="lg">
								<q-img
									src="https://img.nimo.tv/t/1639520760395/202111261637952763880_1639520760395_avatar.png/w120_l0/img.webp"
								/>
							</q-avatar>
						</q-item-section>
						<q-item-section>
							<q-item-label>Lorem, ipsum dolor sit</q-item-label>
						</q-item-section>
						<q-item-section side top>
							<q-item-label caption>17/11/2000</q-item-label>
						</q-item-section>
					</q-item> -->
					<div class="col-auto">
						<q-avatar size="lg">
							<q-img
								src="https://img.nimo.tv/t/1639520760395/202111261637952763880_1639520760395_avatar.png/w120_l0/img.webp"
							/>
						</q-avatar>
					</div>
					<div class="col ellipsis text-body2 text-hover q-ml-sm">
						Lorem, ipsum dolor sit
					</div>

					<div
						class="col-auto text-caption text-weight-light text-hover q-pt-xs"
					>
						17/11/2000
					</div>
				</div>
			</div>
		</q-card>
	</div>
	<div v-else>
		<q-responsive :ratio="16 / 13">
			<q-card class="cursor-pointer column">
				<q-skeleton class="col" square></q-skeleton>

				<q-card-section
					class="no-wrap q-px-sm q-py-none q-pb-sm column"
				>
					<q-skeleton
						square
						width="100%"
						class="text-h6 col-auto"
						type="text"
					/>
					<div class="row flex-center">
						<div class="col-auto">
							<q-skeleton size="3rem" type="QAvatar" />
						</div>
						<div class="col q-ml-sm row">
							<q-skeleton
								width="50%"
								height="1.8rem"
								class="col-auto"
								square
								type="text"
							/>
							<q-space />
							<q-skeleton
								height="1.8rem"
								class="q-ml-sm"
								square
								width="25%"
								type="text"
							/>
						</div>
					</div>
				</q-card-section>
				<!-- <q-item dense>
          <q-skeleton square type="text-h6" height="1rem" width="100%" />
        </q-item>
        <q-item dense class="q-py-xs">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>
          <q-item-section
            ><q-skeleton
              square
              class="text-subtitle2"
              type="text"
              width="70%" />
            <q-skeleton square type="QChip" height="12px" width="40%"
          /></q-item-section>
        </q-item> -->
			</q-card>
		</q-responsive>
	</div>
</template>

<script>
import { ref, defineComponent, onMounted, watch } from "vue";

export default defineComponent({
	props: {
		replay: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const video = ref(null);
		const loaded = ref(false);

		const show = ref(false);

		const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

		const onClick = async (event) => {
			await waitFor(1000);
			show.value = true;
		};

		onMounted(() => {
			onClick();
		});

		return {
			video,
			show,

			loaded,
			imgLoading() {
				console.log("loading");
				loaded.value = true;
			},
		};
	},
});
</script>

<style lang="scss" scoped>
.chip-videos {
	.q-chip {
		max-width: 100px;
	}
}

.my-card:hover .play-icon {
	opacity: 1;
	-webkit-transform: scale(1.3);
	transform: scale(1.3);
}

.play-icon {
	opacity: 0;
	position: absolute;
	z-index: 2;
	margin: -25px 0 0 -25px;
	-webkit-transform: scale(2);
	transform: scale(2);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-transition: all 0.25s ease-out;
	transition: all 0.25s ease-out;
}
</style>

<!-- <template>
  <div v-if="show">
    <q-card class="my-card cursor-pointer">
      <div class="col relative-position overflow-hidden">
        <q-img
          :ratio="16 / 9"
          loading="lazy"
          draggable
          src="https://api.lorem.space/image/game?w=1600&h=900"
          no-spinner
          placeholder-src="~assets/images/place-holder.png"
        >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
        </q-img>

        <q-icon
          size="50px"
          class="play-icon absolute-center"
          name="play_circle_outline"
          color="positive"
        />
      </div>
      <div>
        <q-item dense>
          <q-item-section avatar top class="q-py-none">
            <q-img
              :ratio="2 / 3"
              loading="lazy"
              draggable
              src="https://api.lorem.space/image/game?w=200&h=300"
              no-spinner
              placeholder-src="~assets/images/place-holder.png"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label
              class="text-weight-bold text-hover text-subtitle2"
              :lines="1"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              autem dolor? Quam ipsa perspiciatis repudiandae possimus velit
              quod ipsam dolorum eius debitis aliquid vitae quidem, voluptate
              aliquam placeat. Modi, similique!
            </q-item-label>
            <q-item-label caption class="text-hover" :lines="1"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              autem dolor? Quam ipsa perspiciatis repudiandae possimus velit
              quod ipsam dolorum eius debitis aliquid vitae quidem, voluptate
              aliquam placeat. Modi, similique!
            </q-item-label>
            <q-item-label :lines="1" class="q-gutter-xs chip-videos">
              <q-chip square size="sm" dense clickable label="">
                <span class="ellipsis">Liên Minh Huyền Thoại</span>
              </q-chip>
              <q-chip square size="sm" dense clickable label="">
                <span class="ellipsis">CSGO</span></q-chip
              >
              <q-chip square size="sm" dense clickable label="">
                <span class="ellipsis">Dark Souls</span></q-chip
              >
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-card>
  </div>
  <div v-else>
    <q-responsive :ratio="16 / 13">
      <q-card class="cursor-pointer column">
        <q-skeleton class="col" square />

        <q-item class="q-py-xs">
          <q-item-section avatar>
            <q-skeleton square height="60px" width="40px" type="QAvatar" />
          </q-item-section>
          <q-item-section>
            <q-skeleton square height="15px" width="90%" />
            <q-skeleton square class="text-subtitle2" type="text" width="70%" />
            <q-skeleton square type="QChip" height="12px" width="40%" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-responsive>
  </div>
</template> -->
