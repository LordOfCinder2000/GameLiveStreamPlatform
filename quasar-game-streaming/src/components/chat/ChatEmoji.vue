<!-- <template>
  <q-popup-proxy transition-show="jump-down" transition-hide="jump-up">
    <Suspense>
      <EmojiPicker
        :class="{ 'emoji-dark--active': $q.dark.isActive }"
        type=""
        @select="$emit('onSelectEmoji', $event)"
      />
      <template #fallback>
        <q-skeleton class="column q-pa-sm" style="width: 280px; height: 320px">
          <q-skeleton class="col" style="height: 30%"> </q-skeleton>
          <q-skeleton class="col-auto q-mt-md" style="height: 70%">
          </q-skeleton>
        </q-skeleton>
      </template>
    </Suspense>
  </q-popup-proxy>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue";

import "../../../node_modules/vue3-emoji-picker/dist/style.css";
import { useQuasar } from "quasar";
export default {
  components: {
    EmojiPicker: defineAsyncComponent(() => import("vue3-emoji-picker")),
  },
  setup() {
    const input = ref("");

    function showEmoji(emoji) {
      alert(`emoji ${emoji.i} selected, check console for details`);
      console.log(emoji);
    }

    const $q = useQuasar();

    onMounted(() => {
      if ($q.dark.isActive) {
      }
    });

    return {
      input,
      showEmoji,
    };
  },
};
</script>

<style lang="scss">
.v3-emoji-picker {
  border: 1px solid $positive;
  font-family: inherit;
  border-radius: $generic-border-radius;
  .v3-body .v3-body-inner .v3-group .v3-emojis button {
    border-radius: $generic-border-radius;
    &:hover {
      background-color: $dark;
    }
  }
}
.v3-emoji-picker .v3-body .v3-body-inner .v3-group h5 {
  font-weight: 800;
  font-size: 1rem;
}
.emoji-dark--active {
  background-color: $dark;
  color: $white;
  .v3-text,
  .v3-is-open,
  .v3-skin-tones {
    background-color: $dark;
    color: $white;
  }
  .v3-body .v3-body-inner .v3-group h5 {
    background: $dark;
  }
  .v3-header .v3-groups .v3-group {
    filter: invert(100%);
  }
}
</style> -->

<template>
	<q-popup-proxy transition-show="jump-down" transition-hide="jump-up">
		<Suspense>
			<q-card class="emoji-wrapper no-scroll">
				<Picker
					:data="emojiIndex"
					set="twitter"
					:i18n="{
						search: 'Tìm kiếm',
						categories: {
							search: 'Kết quả tìm kiếm',
							recent: 'Hay dùng',
						},
					}"
					:color="color"
					title="Emoji!"
					sheetSize="32"
					@select="$emit('onSelectEmoji', $event)"
					:class="{ 'emoji-dark--active': $q.dark.isActive }"
				/>
			</q-card>
			<template #fallback>
				<q-skeleton
					class="column q-pa-sm"
					style="width: 280px; height: 320px"
				>
					<q-skeleton class="col" style="height: 30%"> </q-skeleton>
					<q-skeleton class="col-auto q-mt-md" style="height: 70%">
					</q-skeleton>
				</q-skeleton>
			</template>
		</Suspense>
	</q-popup-proxy>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { colors } from "quasar";

// Import data/twitter.json to reduce size, all.json contains data for
// all emoji sets.
import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";

// Vue 3, import components from `/src`:
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";

// Create emoji data index.
// We can change it (for example, filter by category) before passing to the component.
const emojiIndex = ref(new EmojiIndex(data));

const input = ref("");

function showEmoji(emoji) {
	alert(`emoji ${emoji.i} selected, check console for details`);
	console.log(emoji);
}

const $q = useQuasar();
const { getPaletteColor } = colors;

const color = ref(getPaletteColor("positive"));

// onMounted(() => {
// 	if ($q.dark.isActive) {
// 	}
// });
</script>

<style lang="scss">
.emoji-wrapper {
	// border: 1px solid $positive;
}
.emoji-dark--active {
	background-color: $dark;
	color: $white;
	.emoji-mart-category-label h3,
	.emoji-mart-skin-swatches {
		background-color: $dark;
		color: $white;
	}

	.emoji-mart-anchors svg {
		fill: $white;
	}
}
.emoji-mart {
	border: none;
	background-color: inherit;
	border-radius: $generic-border-radius;
	font-size: $body-font-size;
	button,
	button span,
	.emoji-mart-preview-skins {
		cursor: pointer !important;
	}

	.emoji-mart-body .emoji-type-image.emoji-set-twitter {
		background-image: url(/img/twitter-5.0.1-sheets-256-64.png);
	}

	.emoji-mart-category-label h3 {
		margin: 0.25rem;
	}
	.emoji-mart-anchor {
		padding-bottom: 0.25rem;
		padding-top: 0.5rem;
	}
	.emoji-mart-bar {
		border-color: $positive;
	}
	.emoji-mart-search {
		margin-bottom: 0.25rem;
		input {
			border-radius: $generic-border-radius;
			font-size: inherit;
		}
	}
	.emoji-mart-preview {
		height: 4rem;

		.emoji-mart-title-label {
			font-size: 1rem;
			color: $positive;
		}
	}
	.emoji-mart-category .emoji-mart-emoji:hover:before,
	.emoji-mart-emoji-selected:before {
		background-color: $positive;
		opacity: 0.8;
	}
	.emoji-mart-skin-swatches {
		border-color: $positive;
	}

	.emoji-mart-anchor-selected {
		fill: $positive;
	}
}
</style>
