<template>
  <div id="app">
    <app-header @openEditor="editorOpen = !editorOpen, updaterButton = true, updaterOpen = false" ></app-header>
    <app-note-search-menu @getKeyword="findKeyword"></app-note-search-menu>
    <app-note-editor :categoriesData=categories v-if="editorOpen"  @noteAdded="newNote" @noteDeleted="deleteNote" @categoryAdded="newCategory"></app-note-editor>        
    <app-note-updater :notesData = notes v-if="updaterOpen == true && editorOpen == false" @noteUpdated="updateNewNote" ></app-note-updater>
    <app-bar :categoriesData=categories @filteringNote="notesFiltering"></app-bar>
    <div class="allNote">
      <div style="z-index: 1" class="noteContainer">
          <div v-for="(note, index) in notes" :key="`note-${index}`" class="note" :style="{'background-color': note.theme, 'display': note.display}">      
              <div :id="index" @click="selected=index">
                  <span class="update" @click="updateNote(note.title, note.text, note.theme, index, note.date, note.writer), editorOpen=false, updaterOpen = !updaterOpen, updaterButton =  !updaterButton"><i v-if="updaterButton" class="fas fa-edit" id="fa-edit"></i></span>
                  <span class="delete" @click.prevent="deleteNote(index), updaterOpen = true, editorOpen = false"><i class="fas fa-times"></i></span> 
                  <app-open-more @openMore="note.moreOpen = !note.moreOpen"></app-open-more>
                  <app-note-menu :notesData="notes" v-if="note.moreOpen" @recolorMenu="reColor"></app-note-menu>
                  <span >{{ note.title }}</span>
                  <p class="note-text">{{ note.text }}</p>
                  <div class="note-bottom">
                    <span class="date-text" v-if="note.date">due date: {{note.date}}</span>
                    <div class="writer-text" v-if="note.writer"><i class="fas fa-user"></i> {{note.writer}}
                  </div>
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
import NoteEditor from "./components/NoteEditor.vue";
import Header from "./components/Header.vue";
import OpenMore from "./components/OpenMore.vue";
import NoteMenu from "./components/NoteMenu.vue";
import NoteUpdater from "./components/NoteUpdater.vue";
import Bar from "./components/Bar.vue";
import NoteSearchMenu from './components/NoteSearchMenu.vue';
import NoteDir from "./components/NoteDirectory.vue";

export default {
  name: "App",
  data: function () {
    return {
      editorOpen: false,
      updaterOpen: false,
      updaterButton: true,
      updaterCancel:false,
      notes: [],
      selected: -1,
      filter: "",
      categories: ["to-do", "meeting", "task"]
    };
  },
  computed: {},
  filters: { 
    capitalize: function (value) { 
      if (!value) return '' 
      value = value.toString() 
      return value.charAt(0).toUpperCase() + value.slice(1) 
    } 
  },
  methods: {
    newNote(title, text, theme, date, writer, category) {
      var dis = "none";
      if (this.filter == category) {
        dis = "inline-block";
      }
      this.notes.push({
        title: title,
        text: text,
        theme: theme,
        date: date,
        writer: writer,
        category: category,
        display: dis,
        moreOpen: false
      });
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
    newCategory(category) {
      for (var i = 0; i < this.categories.length; i++) {
        if (category == "") {
          alert("값을 입력해주세요.");
          return;
        } else if (category == this.categories[i]) {
          alert("이미 존재하는 카테고리 입니다.");
          return;
        }
      }
      this.categories.push(category);
    },
    notesFiltering(category) {
      this.filter = category;
      for (var i = 0; i < this.notes.length; i++) {
        if (this.notes[i].category == category || category == "--none--") {
          this.notes[i].display = "inline-block";
        } else {
          this.notes[i].display = "none";
        }
      }
    },
    updateNote(title, text, theme, index, date, writer) {
      this.notes[this.index] = {
        title: title,
        text: text,
        theme: theme,
        index: index,
        date: date,
        writer: writer
      };
    },
    updateNewNote(title, text, theme, index, date, writer) {
      this.notes[index] = {title: title, text: text, theme: theme, date:date, writer:writer}
      var newNotes = this.notes;
      localStorage.setItem("notes", JSON.stringify(newNotes));
      this.updaterOpen = false
      this.updaterButton = true
    },
    reColor(theme) {
      this.notes[this.selected].theme = theme;
      this.notes.moreOpen = false;
    },
    findKeyword(keyword) {
      for (var i = 0; i < this.notes.length; i++) {
        this.notes[i].display = "none";
        if (keyword != ''){
          if (this.notes[i].title.indexOf(keyword) != -1) {
            this.notes[i].display = "inline-block";
          } 
          if (this.notes[i].text.indexOf(keyword) != -1) {
            this.notes[i].display = "inline-block";
          } 
          if (this.notes[i].writer.indexOf(keyword)!= -1) {
            this.notes[i].display = "inline-block";
          }
        }
        else {
          this.notes[i].display = "inline-block";
        }
      }
    },
    move(index) {
      window.scrollTo(
        0,
        document.getElementById(index).getBoundingClientRect().top
      );
    },
  },
  mounted() {
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
    if (localStorage.getItem("categories"))
      this.categories = JSON.parse(localStorage.getItem("categories"));
  },
  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true
    },
    categories: {
      handler() {
        var newCategories = this.categories;
        localStorage.setItem("categories", JSON.stringify(newCategories));
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
    appBar: Bar,
    appNoteSearchMenu: NoteSearchMenu,
    appNoteDir: NoteDir,
  },
};
</script>

<style lang="scss">
@import "/styles/global.scss";
</style>