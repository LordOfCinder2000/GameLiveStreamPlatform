<template>
  <q-page padding>
    <div>
      <div
        class="banner-image"
        :class="[
          $q.dark.isActive ? 'banner-image--dark' : 'banner-image--white',
        ]"
        :style="`background-image: url(${bannerImg}) `"
      ></div>
      <!-- <q-img
        :ratio="4 / 3"
        position="0 0"
        src="https://api.lorem.space/image/game?w=2000&h=1440 "
        class="banner-image-test"
        style="max-height: 340px"
      ></q-img> -->
      <div class="row no-wrap overflow-auto" style="max-height: 340px">
        <div>
          <q-img
            class="rounded-borders on-left col"
            height="200px"
            width="150px"
            src="https://api.lorem.space/image/game?w=150&h=200"
            :ratio="2 / 3"
            spinner-color="primary"
            spinner-size="82px"
          ></q-img>
        </div>
        <q-card class="column col q-pb-sm q-pt-sm transparent" flat square>
          <div
            class="wrap text-weight-medium text-body2"
            style="max-width: 500px"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
            hic qui laborum quisquam saepe nemo enim illo voluptas dolore rerum
            officiis debitis corrupti, quia perferendis, deserunt odit.
            Suscipit, recusandae eligendi?
          </div>
          <q-space />
          <div class="row text-h4 ellipsis row">God of war</div>
          <div>
            <q-icon color="green" name="mdi-broadcast" />
            <span>11 viewers</span>
          </div>
        </q-card>
      </div>
    </div>
    <!-- <q-parallax class="absolute-full banner-image" :height="480" :speed="1">
      <template v-slot:media>
        <img src="https://api.lorem.space/image/game?w=2000&h=1440" alt="" />
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute-full row"
          :style="{
            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
            top: scope.percentScrolled * 60 + '%',
            left: 0,
            right: 0,
          }"
        >
          <q-card class="my-card q-ml-lg" flat>
            <q-card-section horizontal>
              <q-img
                width="100px"
                :ratio="2 / 3"
                class=""
                src="https://cdn.quasar.dev/img/mountains.jpg"
              />
              <q-card-section class="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                obcaecati magni vero ea quae. Praesentium similique eos officia
                fuga dolore cupiditate voluptate ducimus natus dolorum quos
                reprehenderit, asperiores non magni.
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-parallax> -->
    <div class="live-items-wrapper">
      <div class="live-items row q-mt-sm q-col-gutter-md">
        <VideoCard
          class="col-3 col-xs-12 col-sm-6 col-md-3"
          v-for="n in 13"
          :key="n"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import VideoCard from "components/VideoCard.vue";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "ListLive",
  components: {
    VideoCard,
  },

  setup() {
    const $q = useQuasar();
    const bannerImg = ref("https://api.lorem.space/image/game?w=2000&h=1440");

    return { bannerImg };
  },
});
</script>
<!-- 
 https://api.lorem.space/image/game?w=2000&h=1440 
        https://images.prd.dlivecdn.com/category/ar6ru -->

<style lang="scss" scoped>
.banner-image-test {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(15, 18, 20, 0.4)),
      to($dark)
    );
    background: linear-gradient(180deg, rgba(15, 18, 20, 0.4), $dark);
  }
}
[class*="banner-image"] {
  background-position: center top;
  background-size: cover;
  height: 340px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
.banner-image {
  &--white::before {
    background: linear-gradient(180deg, rgba(15, 18, 20, 0.4), $white);
  }
  &--dark::before {
    background: linear-gradient(180deg, rgba(15, 18, 20, 0.4), $dark-page);
  }
}
// .banner-image {
//   background-position: center top;
//   background-size: cover;
//   height: 340px;
//   position: absolute;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   &::before {
//     position: absolute;
//     content: "";
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;

//     background: -webkit-gradient(
//       linear,
//       left top,
//       left bottom,
//       from(rgba(15, 18, 20, 0.4)),
//       to($white)
//     );
//     background: linear-gradient(180deg, rgba(15, 18, 20, 0.4), $white);
//   }
// }
.no-before {
  &:before,
  &::before {
    background: none;
  }
}
</style>
