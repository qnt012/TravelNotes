<template>
  <div>
    <app-banner></app-banner>
    <button @click="moveTo('/note')">Note.vue로</button>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import router from "../router.js";
export default {
  router,
  methods: {
    moveTo(page) {
      var router = this.$router;
      router.push(page);
    }
  },
  components: {
    appBanner: Banner
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>