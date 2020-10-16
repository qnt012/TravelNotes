<template>
  <div style="z-index: 2" class="note-directory">
    <div v-for="(note, index) in notesData" :key="`note-${index}`">
      <div title="해당 메모로 이동" class="listNote" @click="link(index)">
        {{ note.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notesData"],
  methods: {
    link(index) {
      this.$emit("noteLink", index);
    },
  },
};
</script>