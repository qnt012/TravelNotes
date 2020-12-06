<template>
  <div class="homeHeader">     
    <img src="../assets/logo.png" @click="moveTo('/')">
    <ul>
        <li @click="moveTo('/note')">My Notes</li>
        <li @click="moveTo('/browse')">Browse</li>
        <li @click="moveTo('/roadmap')">RoadMap</li>
        <li @click="moveTo('/calendar')">Calendar</li>
    </ul>
  </div>
</template>

<script>
import router from "../router.js";
export default {
  router,
  methods: {
    moveTo(page) {
      var router = this.$router;
      router.push(page);
      if (page == "/") {
        location = "http://localhost:8080/";
        location.reload();
      }
    }
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>

