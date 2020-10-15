<template>
  <div style="z-index: 2" class="note-directory">
    <p>RRRRRRRRRRRRRRRRRRRRRRRRRRR</p>
  </div>
</template>

<script>
export default {
  props: ["notesData"],
  data() {
    return {
      displayTitle: this.notesData[this.index].title,
    };
  },
};
</script>