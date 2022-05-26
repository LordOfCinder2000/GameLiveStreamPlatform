<template>
  <div v-if="show">
    <q-card flat square class="my-card cursor-pointer" dark>
      <div class="col" :class="{ 'card-hover': true }">
        <q-video
          class="card-hover__thumbnail"
          :ratio="16 / 9"
          src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
          ref="video"
        >
        </q-video>

        <!-- placeholder-src="~assets/images/place-holder.png" -->
      </div>
      <q-item class="col-auto">
        <q-item-section avatar>
          <q-avatar size="xl">
            <q-img
              src="https://img.nimo.tv/t/1639520760395/202111261637952763880_1639520760395_avatar.png/w120_l0/img.webp"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section class="overflow-hidden">
          <q-item-label class="text-h6 ellipsis text-hover"
            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
            itaque culpa molestiae ex veniam suscipit quo sapiente fuga. Et enim
            porro eveniet, quibusdam impedit ratione nam aliquam officia
            deleniti esse.</q-item-label
          >
          <q-item-label
            class="text-subtitle2 text-weight-light ellipsis text-hover"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            autem dolor? Quam ipsa perspiciatis repudiandae possimus velit quod
            ipsam dolorum eius debitis aliquid vitae quidem, voluptate aliquam
            placeat. Modi, similique!</q-item-label
          >
          <q-item-label class="q-gutter-xs">
            <q-chip
              square
              size="sm"
              dense
              clickable
              label="Liên Minh Huyền Thoại"
            >
            </q-chip>
            <q-chip square size="sm" dense clickable label="CSGO"> </q-chip>
            <q-chip square size="sm" dense clickable label="Dark Souls">
            </q-chip>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
  <div v-else>
    <q-responsive :ratio="16 / 12.5">
      <q-card dark flat square class="my-card cursor-pointer column">
        <q-skeleton class="col" square />

        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>
          <q-item-section>
            <q-skeleton square width="90%" class="text-h6" type="text" />
            <q-skeleton square class="text-subtitle2" type="text" width="70%" />
            <q-skeleton square type="QChip" height="12px" width="40%" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-responsive>
  </div>
</template>

<script>
const { ref, defineComponent, onMounted, watch } = require("vue");

export default defineComponent({
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

<style lang="scss" scoped></style>
