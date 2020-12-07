<template>
  <div class="header">
    <img src="../assets/logo.png" @click="moveTo('/')" />
    <p>Calender</p>
  </div>
</template>


<script>
import router from "../router.js";
export default {
  router,
  methods: {
    moveTo(page) {
      if (page == "/") {
        location.href = "http://localhost:8080/";
      }
      var router = this.$router;
      router.push(page);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>