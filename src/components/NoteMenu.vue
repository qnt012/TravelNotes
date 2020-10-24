<template>
  <div class="noteMenu">
    <input type="color" id="fav-color" class="input-color" v-model="theme" @change="reColor" />
  </div>
</template>

<script>
export default {
  props: ["notesData"],
  data: function () {
    return {
      theme: "",
      menuopen: this.notesData[this.notesData.index].moreOpen,
    };
  },
  methods: {
    reColor() {
      this.$emit("recolorMenu", this.theme);
      this.menuopen = false;
    },
  },
};
</script>