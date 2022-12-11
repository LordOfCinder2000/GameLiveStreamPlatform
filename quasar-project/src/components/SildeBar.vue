<template>
  <h1>sdsds</h1>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    title: {
      type: String,
      required: true,
      s,
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
};
</script>
