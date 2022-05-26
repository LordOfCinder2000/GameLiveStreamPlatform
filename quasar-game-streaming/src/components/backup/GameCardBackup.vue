<template>
  <div v-if="show">
    <q-card flat square class="fit col my-card cursor-pointer">
      <div :class="{ 'card-hover': loaded }">
        <q-img
          loading="eager"
          draggable
          class="card-hover__thumbnail"
          :ratio="2 / 3"
          src="https://api.lorem.space/image/game?w=200&h=300"
          no-spinner
          @load="imgLoading"
          placeholder-src="~assets/images/place-holder.png"
        >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
        </q-img>
        <!-- placeholder-src="~assets/images/place-holder.png" -->
      </div>

      <q-card-section class="no-wrap no-padding">
        <div class="text-h6 ellipsis">
          <span class="text-hover">Changing Planet</span>
        </div>
        <div class="text-subtitle2 text-weight-light ellipsis">
          <span class="text-hover"> 236,3 N người xem</span>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div v-else>
    <q-responsive :ratio="2 / 3.5">
      <q-card flat square class="my-card cursor-pointer column">
        <q-skeleton class="col" square />

        <q-card-section class="no-wrap no-padding">
          <q-skeleton square width="70%" class="text-h6" type="text" />
          <q-skeleton square width="40%" class="text-subtitle2" type="text" />
        </q-card-section>
      </q-card>
    </q-responsive>
  </div>
</template>

<script>
const { ref, defineComponent, onMounted, watch } = require("vue");

export default defineComponent({
  setup() {
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
      show,

      loaded,
      imgLoading() {
        loaded.value = true;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.my-card {
  // &:hover {
  //   transition: all 0.2s ease-out;
  //   box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  //   top: -4px;
  //   background-color: white;
  // }
}
</style>

<!-- <div class="col-2 col-xs-12 col-sm-3 col-md-2 q-hoverable" v-if="true">
    <q-card v-ripple class="q-hoverable cursor-pointer">
      <span class="q-focus-helper"></span>
      <img
        src="https://i.picsum.photos/id/936/200/300.jpg?hmac=2SjFPkZpMzhNZnH6hwt9r9kUFo82iIJ22lkr7wdve8A"
      />

      <q-card-section class="no-wrap">
        <div class="text-h6 ellipsis">Our Changing Planet</div>
        <div class="text-subtitle2 ellipsis">by John Doe</div>
      </q-card-section>
    </q-card>
  </div> -->
