<template>
  <div id="app">
    <app-header @openEditor="editorOpen = !editorOpen, updaterOpen = false" ></app-header>
    <app-note-search-menu @getKeyword="findKeyword"></app-note-search-menu>
    <app-note-editor v-if="editorOpen"  @noteAdded="newNote" @noteDeleted="deleteNote" ></app-note-editor>        
    <app-note-updater :notesData = notes v-if="updaterOpen == true && editorOpen == false" @noteUpdated="updateNewNote"></app-note-updater>
    <div style="z-index: 1" class="noteContainer">
        <div v-for="(note, index) in notes" :key="`note-${index}`" class="note" :style="{'background-color': note.theme, 'display': note.display}">      
            <div @click="selected=index">
                <span class="update" @click="updateNote(note.title, note.text, note.theme, index, note.date, note.writer), editorOpen=false, updaterOpen = !updaterOpen"><i class="fas fa-edit" id="fa-edit"></i></span>
                <span class="delete" @click.prevent="deleteNote(index), updaterOpen = true, editorOpen = false"><i class="fas fa-times"></i></span> 
                <app-open-more @openMore="note.moreOpen = !note.moreOpen"></app-open-more>
                <app-note-menu :notesData="notes" v-if="note.moreOpen" @recolorMenu="reColor"></app-note-menu>
                <span >{{ note.title }}</span>
                <p class="note-text">{{ note.text }}</p>
                <div class="note-bottom">
                  <span class="date-text" v-if="note.date">due date: {{note.date}}</span>
                  <div class="writer-text" v-if="note.writer"><img src="./assets/writer.png" id="img-writer"> {{note.writer}}
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
import NoteUpdater from './components/NoteUpdater.vue';
import NoteSearchMenu from './components/NoteSearchMenu.vue';

export default {
  name: "App",
  data: function() {
    return {
      editorOpen: false,
      updaterOpen: false,
      notes: [],
      selected: -1,
    };
  },
  computed: {},
  methods: {
    newNote(title, text, theme, date, writer) {
      this.notes.push({title: title, text: text, theme: theme, date: date, writer: writer, moreOpen: false, display: "auto"});
    },
    deleteNote(index) {
      this.notes.splice(index, 1)
    },
    updateNote(title, text, theme, index, date, writer) {
      this.notes[this.index] = {title: title, text: text, theme: theme, index : index, date:date, writer:writer}
    },
    updateNewNote(title, text, theme, index, date, writer) {
      this.notes[index] = {title: title, text: text, theme: theme, date:date, writer:writer}
      this.updaterOpen = false
    },
    reColor(theme) {
      this.notes[this.selected].theme = theme;
      this.notes.moreOpen = false;
    },
    findKeyword(keyword) {
      for (var i = 0; i < this.notes.length; i++) {
        if (this.notes[i].title == keyword || keyword =='') {
            this.notes[i].display = "inline-block";
          } 
        else if (this.notes[i].text == keyword || keyword =='') {
            this.notes[i].display = "inline-block";
          } 
        else if (this.notes[i].writer == keyword || keyword =='') {
            this.notes[i].display = "inline-block";
          }
          else {
            this.notes[i].display = "none";
          }
        }
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
      deep: true
    }
  },
  components: {
    appNoteEditor: NoteEditor,
    appHeader: Header,
    appOpenMore: OpenMore,
    appNoteMenu: NoteMenu,
    appNoteUpdater: NoteUpdater,
    appNoteSearchMenu: NoteSearchMenu
  }
};
</script>

<style lang="scss">
@import "/styles/global.scss";
</style>
