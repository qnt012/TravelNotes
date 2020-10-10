<template>
  <span class="more" @click.prevent="openMore">
    <i class="fas fa-ellipsis-h"></i>
  </span>
</template>

<script>
export default {
  methods: {
    openMore: function () {
      this.$emit("openMore");
    },
  },
};
</script>