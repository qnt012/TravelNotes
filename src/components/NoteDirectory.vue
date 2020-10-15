<template>
  <div style="z-index: 2" class="note-directory">
    <div v-for="(note, index) in notesData" :key="`note-${index}`">
      <div class="listNote">{{ index + 1 }} : {{ note.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notesData"],
};
</script>