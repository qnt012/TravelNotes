<template>
  <div style="z-index: 2" class="note-directory">
    <div v-for="(note, index) in notesData" :key="`note-${index}`">
      <div :id="'note.title'" class="listNote">
        
        <a href="#note.title">{{ index + 1 }} : {{ note.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notesData"],
};
</script>