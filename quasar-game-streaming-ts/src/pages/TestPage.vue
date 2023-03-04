<template>
	<q-page
		id="iframe-container"
		style="width: 800px; height: 80vh"
		class="dimmed flex flex-center"
	>
		<!-- <iframe
			ref="iframe"
			id="xsolla-iframe"
			class="fit no-margin no-border"
			:src="xsollaPaystationUrl"
			frameborder="0"
		/> -->
		<div>
			<img
				style="width: 100px; mix-blend-mode: lighten"
				src="https://img.trovo.live/imgupload/shop/20220824_mzo0rt1v8d.webp"
			/>
		</div>
	</q-page>
</template>

<script setup>
import { ref, defineAsyncComponent, computed, onMounted, nextTick } from "vue";
const XsollaIframe = defineAsyncComponent(() =>
	import("components/payments/XsollaIframe.vue")
);
const xsollaPaystationUrl = computed(
	() =>
		process.env.XSOLLA_PAYSTATION_URL +
		"txqfOhKluqqSaAbrAG7iMznKDhhdIkqh_lc_vi_bg_FFFFFF_tb_3D46F5"
);
const show = ref(true);
const openXsolla = ref(false);
// var iframe = document.getElementById("xsolla-iframe");
// var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
// var element = innerDoc.getElementById("my-element");
// element.style.color = "red";
// element.style.fontWeight = "bold";
const iframe = ref(null);
onMounted(() => {});
</script>

<style>
#xsolla-iframe::-webkit-scrollbar {
	width: 1px;
	height: 1px;
}
</style>
