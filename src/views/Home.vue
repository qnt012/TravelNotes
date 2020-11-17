<template>
  <div class="home">
    <home-header></home-header>
    <app-banner></app-banner>
    <div>예시 노트들 출력 예정</div>
  </div>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue";
import Banner from "../components/Banner.vue";
export default {
  methods: {},
  components: {
    homeHeader: HomeHeader,
    appBanner: Banner
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>