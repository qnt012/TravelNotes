<template>
  <div class="header">     
    <img src="../assets/logo.png" @click="moveTo('/')">
    <p>내 노트</p>
    <button class="add-btn" @click.prevent="openEditor"><i class="fas fa-plus"></i></button> 
  </div>
</template>


<script>
import router from "../router.js";
export default {
  router,
  methods: {
    openEditor: function() {
      this.$emit("openEditor");
    },
    moveTo(page) {
      var router = this.$router;
      router.push(page);
      location.reload();
    }
  }
};
</script>