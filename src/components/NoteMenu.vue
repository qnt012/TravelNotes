<template>
  <div class="noteMenu">
    <input type="color" id="fav-color" class="input-color" v-model="theme" @change="reColor" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      theme: "",
    };
  },
  methods: {
    reColor() {
      this.$emit("recolorMenu", this.theme);
    },
  },
};
</script>