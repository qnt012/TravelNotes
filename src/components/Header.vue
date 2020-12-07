<template>
  <div class="header">
    <img src="../assets/logo.png" @click="moveTo('/')" />
    <p>My Notes</p>
    <button class="add-btn" @click.prevent="openEditor">
      <i class="fas fa-plus"></i>
    </button>
    <button class="del-btn" @click.prevent="deleteAll">
      <i class="fas fa-trash-alt"></i>
    </button>
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
      if (page == "/") {
        location.href = "http://localhost:8080/";
      }
      var router = this.$router;
      router.push(page);
    },
    deleteAll() {
      this.$store.commit("clearAll");
    }
  }
};
</script>