<template>
  <q-list separator>
    <q-item>
      <div class="col">
        <div class="live-title text-h6 ellipsis">My Game live title</div>
        <div class="live-contain row no-wrap">
          <div class="live-game text-positive text-subtitle2 ellipsis on-left">
            League of Legend
          </div>
          <div class="live-viewers text-subtitle2">232 viewers</div>
        </div>
      </div>
      <q-space />
      <div class="col-auto gifts row items-center justify-center">
        <q-btn class="bg-positive" dense flat>
          <q-icon color="white" size="lg" name="card_giftcard" />
        </q-btn>
      </div>
    </q-item>

    <q-item>
      <q-item-section avatar top>
        <q-avatar circle size="3rem">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
      </q-item-section>
      <q-item-section no-wrap>
        <q-item-label class="text-subtitle1 text-weight-bold" :lines="1">
          Gatayvaichuoi
        </q-item-label>
        <q-item-label caption>
          <q-chip
            icon="podcasts"
            class="q-ma-none"
            color="red"
            dense
            square
            label="LIVE"
            text-color="white"
          ></q-chip>
        </q-item-label>
      </q-item-section>
      <q-item-section side no-wrap>
        <div class="q-gutter-x-sm no-wrap">
          <q-btn flat dense icon="share" round>
            <c-tooltip
              :offset="[5, 5]"
              arrow="bottom"
              anchor="top middle"
              self="bottom middle"
            >
              Chia sẻ</c-tooltip
            >
          </q-btn>
          <q-btn
            dense
            unelevated
            color="positive"
            no-caps
            no-wrap
            class="q-px-sm text-weight-regular"
          >
            <q-icon size="xs" name="favorite_border" />
            <div class="row q-ml-sm items-center justify-center">
              <span>Follow</span>
              <!-- <div style="width: 2px; height: 1rem" class="bg-white q-mx-sm" /> -->
              <q-separator
                class="bg-white"
                size="0.1rem"
                vertical
                spaced
                inset="item"
              />
              <span>100K</span>
            </div>
          </q-btn>

          <q-btn flat dense icon="more_vert" round>
            <c-tooltip
              :offset="[5, 5]"
              arrow="bottom"
              anchor="top middle"
              self="bottom middle"
            >
              Thêm</c-tooltip
            >
          </q-btn>
        </div>
      </q-item-section>
    </q-item>
    <div class="q-pa-md q-item-type">
      <q-card class="q-pt-md no-scroll" flat square>
        <q-tabs
          v-model="tab"
          dense
          active-color="positive"
          indicator-color="positive"
          align="left"
          narrow-indicator
          no-caps
        >
          <q-tab name="about" label="About" />
          <q-tab name="replay" label="Replay" />
          <q-tab name="followers" label="Followers" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel class="no-scroll" name="about">
            <div class="text-h6">About</div>
            <div class="game-replays-wrapper">
              <div class="game-replays row q-mt-sm q-col-gutter-md">
                <InfoCard
                  class="col col-xs-12 col-md-6"
                  v-for="(cardInfo, index) in cardInfos"
                  :key="`card_info_${index}`"
                  :title="cardInfo.title"
                >
                  <template #content>
                    <component :is="cardInfo.name"></component>
                  </template>
                </InfoCard>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel class="no-scroll" name="replay">
            <div class="row">
              <div class="text-h6">Replay</div>
              <q-space />
              <ButtonFilter />
            </div>

            <div class="video-replays-wrapper">
              <div class="video-replays row q-mt-sm q-col-gutter-md">
                <VideoCardReplay
                  :class="[
                    collapseChat
                      ? 'col col-xs-6 col-sm-4 col-md-3'
                      : 'col col-xs-12 col-sm-5 col-md-4',
                  ]"
                  v-for="n in 11"
                  :key="n"
                />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel class="no-scroll overflow-hidden" name="followers">
            <div class="row">
              <div class="text-h6">Followers</div>
              <q-space />
              <ButtonFilter />
            </div>
            <div class="followers-wrapper q-mt-sm row q-col-gutter-md">
              <UserCard
                class="col-6"
                v-for="follower in followers"
                :key="follower.id"
                :user="follower"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-list>
</template>

<script>
import {
  defineAsyncComponent,
  defineComponent,
  ref,
  watchEffect,
  onMounted,
} from "vue";

export default defineComponent({
  name: "LiveInfo",
  components: {
    "c-tooltip": defineAsyncComponent(() =>
      import("components/CustomTooltip.vue")
    ),
    VideoCardReplay: defineAsyncComponent(() =>
      import("components/VideoCardReplay.vue")
    ),
    ButtonFilter: defineAsyncComponent(() =>
      import("components/buttons/ButtonFilter.vue")
    ),
    UserCard: defineAsyncComponent(() =>
      import("components/live_info/UserCard.vue")
    ),
    InfoCard: defineAsyncComponent(() =>
      import("components/live_info/InfoCard.vue")
    ),
    InfoCardLink: defineAsyncComponent(() =>
      import("components/live_info/InfoCardLink.vue")
    ),
    InfoCardAbout: defineAsyncComponent(() =>
      import("components/live_info/InfoCardAbout.vue")
    ),
  },
  props: {},
  setup() {
    const collapseChat = ref(false);

    const followers = ref([]);

    const cardInfos = [
      { title: "About of me", name: "InfoCardLink" },
      { title: "Social Link", name: "InfoCardAbout" },
    ];

    onMounted((number = 100) => {
      let count = 0;
      for (let index = 0; index < number; index++) {
        followers.value.push({
          id: count++,
          name: `gatay${count}`,
          avatar: `https://i.pravatar.cc/${100 + index * 2}`,
          followers: Math.floor(Math.random() * 1000000),
        });
      }
    });

    watchEffect(() => {});
    return {
      collapseChat,
      tab: ref("about"),
      followers,
      cardInfos,
    };
  },
});
</script>

<style lang="scss" scoped></style>
