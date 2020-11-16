<template>
  <div id="app">
    <app-header
      @openEditor="(editorOpen = !editorOpen), reUpdaterOpen(false), reUpdaterButton(true)"
    ></app-header>
    <app-note-search-menu @getKeyword="findKeyword"></app-note-search-menu>
    <app-note-editor
      :categoriesData="categories"
      v-if="editorOpen"
      @noteAdded="newNote"
      @categoryAdded="newCategory"
    ></app-note-editor>
    <app-note-updater
      :notesData="notes"
      v-if="this.updaterOpen == true && editorOpen == false"
    ></app-note-updater>
    <app-bar :categoriesData="categories"></app-bar>
    <div class="allNote">
      <div style="z-index: 1" class="noteContainer">
        <div
          v-for="(note, index) in notes"
          :key="`note-${index}`"
          :id="index"
          @click="select(index)"
          class="note"
          draggable="true"
          @dragstart="onDrag"
          @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
          @drop="onDrop"
          :style="{ 'background-color': note.theme, display: note.display }"
        >
          <span
            class="update"
            @click="(editorOpen = false), reUpdaterOpen(true), reUpdaterButton(false)"
          >
            <i v-if="updaterButton" class="fas fa-edit" id="fa-edit"></i>
          </span>
          <span
            class="delete"
            @click.prevent="deleteNote(index), reUpdaterOpen(false), editorOpen = false"
          >
            <i class="fas fa-times"></i>
          </span>
          <app-open-more
            @openMore="note.moreOpen = !note.moreOpen"
          ></app-open-more>
          <app-note-menu
            :notesData="notes"
            v-model="note.moreOpen"
            v-if="note.moreOpen"
            @recolorMenu="reColor"
          ></app-note-menu>
          <span>
            <p class="note-title">{{ note.title }}</p>
            <p v-html="note.html" class="note-text">{{ note.text }}</p>
          </span>
          <div class="note-bottom">
            <span class="date-text" v-if="note.date"
              >due date: {{ note.date }}</span
            >
            <div class="writer-text" v-if="note.writer">
              <i class="fas fa-user"></i>
              {{ note.writer }}
            </div>
          </div>
        </div>
      </div>
      <div class="noteList">
        <h2>[Note List]</h2>
        <app-note-dir @noteLink="move" :notesData="notes"></app-note-dir>
      </div>
    </div>
  </div>
</template>

<script>
import NoteEditor from "../components/NoteEditor.vue";
import Header from "../components/Header.vue";
import OpenMore from "../components/OpenMore.vue";
import NoteMenu from "../components/NoteMenu.vue";
import NoteUpdater from "../components/NoteUpdater.vue";
import Bar from "../components/Bar.vue";
import NoteSearchMenu from "../components/NoteSearchMenu.vue";
import NoteDir from "../components/NoteDirectory.vue";


export default {
  name: "App",
  data: function () {
    return {
      editorOpen: false,
    };
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    filter() {
      return this.$store.getters.getFilter;
    },
    selected() {
      return this.$store.getters.getSelected;
    },
    updaterOpen() {
      return this.$store.getters.getUpdaterOpen;
    },
    updaterButton() {
      return this.$store.getters.getUpdaterButton;
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    select(index) {
      this.$store.commit("setSelected", index);
    },
    deleteNote(index) {
      this.$store.commit("deleteNote", index);
    },
    reUpdaterOpen(tf) {
      this.$store.commit("setUpdaterOpen", tf);
    },
    reUpdaterButton(tf) {
      this.$store.commit("setUpdaterButton", tf);
    },
    reColor(theme) {
      this.notes[this.selected].theme = theme;
      this.notes[this.selected].moreOpen = false;
    },
    move(index) {
      window.scrollTo(
        0,
        document.getElementById(index).getBoundingClientRect().top
      );
    },
    onDrag() {
      event.dataTransfer.setData("select", event.target.id);
    },
    onDragOver() {
      if (this.notes[event.target.id] != null) {
        event.target.style.border = "3px solid rgb(154, 224, 48)";
      }
    },
    onDragLeave() {
      if (this.notes[event.target.id] != null) {
        event.target.style.border = "none";
      }
    },
    onDrop() {
      if (this.notes[event.target.id] != null) {
        var data = event.dataTransfer.getData("select");
        var temp = this.notes[data];
        this.notes.splice(data, 1, this.notes[event.target.id]);
        this.notes.splice(event.target.id, 1, temp);
        event.target.style.border = "none";
        this.notes[data].moreOpen = false;
        this.notes[event.target.id].moreOpen = false;
        this.$store.commit("setUpdaterOpen", false);
        this.$store.commit("setUpdaterButton", true);
        this.$store.commit("reMatchIdx");
      }
    },
  },
  mounted() {
    if (localStorage.getItem("notes")) this.$store.commit("restoreNote");
    if (localStorage.getItem("categories"))
      this.$store.commit("restoreCategory");
    if (localStorage.getItem("filter")) this.$store.commit("restoreFilter");
  },
  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },
    categories: {
      handler() {
        var newCategories = this.categories;
        localStorage.setItem("categories", JSON.stringify(newCategories));
      },
      deep: true,
    },
  },
  components: {
    appNoteEditor: NoteEditor,
    appHeader: Header,
    appOpenMore: OpenMore,
    appNoteMenu: NoteMenu,
    appNoteUpdater: NoteUpdater,
    appBar: Bar,
    appNoteSearchMenu: NoteSearchMenu,
    appNoteDir: NoteDir,
  },
};
</script>
