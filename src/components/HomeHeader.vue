<template>
  <div class="homeHeader">     
    <img src="../assets/logo.png">
    <ul>
        <li @click="moveTo('/note')">내 노트</li>
        <li>둘러보기</li>
        <li>로드맵</li>
        <li>캘린더</li>
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
    }
  }
};
</script>