<template>
  <div class="home">
    <home-header></home-header>
    <app-banner></app-banner>
  </div>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue";
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
    homeHeader: HomeHeader,
    appBanner: Banner
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>