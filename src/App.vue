<template>
  <div id="app">
    <app-header @openEditor="editorOpen = !editorOpen"></app-header>
    <app-note-editor
      v-if="editorOpen"
      @noteAdded="newNote"
      @noteDeleted="deleteNote"
    ></app-note-editor>
    <div style="z-index: 1" class="noteContainer">
      <div
        v-for="(note, index) in notes"
        :key="`note-${index}`"
        class="note"
        :style="{ 'background-color': note.theme }"
      >
        <div>
          <span class="delete" @click.prevent="deleteNote(index)"
            ><i class="fas fa-times"></i
          ></span>
          <app-open-more
            @openMore="note.moreOpen = !note.moreOpen"
          ></app-open-more>
          <app-note-menu v-if="note.moreOpen"></app-note-menu>
          <span>{{ note.title }}</span>
          <p class="note-text">{{ note.text }}</p>
          <div class="note-bottom">
            <span class="date-text" v-if="note.date"
              >due date: {{ note.date }}</span
            >
            <div class="writer-text" v-if="note.writer">
              <img src="./assets/writer.png" id="img-writer" />
              {{ note.writer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteEditor from "./components/NoteEditor.vue";
import Header from "./components/Header.vue";
import OpenMore from "./components/OpenMore.vue";
import NoteMenu from "./components/NoteMenu.vue";

export default {
  name: "App",
  data: function () {
    return {
      editorOpen: false,
      notes: [],
    };
  },
  computed: {},
  methods: {
    newNote(title, text, theme, date, writer) {
      this.notes.push({
        title: title,
        text: text,
        theme: theme,
        date: date,
        writer: writer,
        moreOpen: false,
      });
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
  },
  mounted() {
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
  },
  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },
  },
  components: {
    appNoteEditor: NoteEditor,
    appHeader: Header,
    appOpenMore: OpenMore,
    appNoteMenu: NoteMenu,
  },
};
</script>

<style lang="scss">
@import "/styles/global.scss";
</style>
