<template>
  <div id="app">
    <app-header @openEditor="editorOpen = !editorOpen, updaterOpen = false" ></app-header>
    <app-note-editor :categoriesData=categories v-if="editorOpen"  @noteAdded="newNote" @noteDeleted="deleteNote" @categoryAdded="newCategory"></app-note-editor>        
    <app-note-updater :notesData = notes v-if="updaterOpen == true && editorOpen == false" @noteUpdated="updateNewNote" ></app-note-updater>
    <app-bar :categoriesData=categories @filteringNote="notesFiltering"></app-bar>
    <div style="z-index: 1" class="noteContainer">
        <div v-for="(note, index) in notes" :key="`note-${index}`" class="note" :style="{'background-color': note.theme, 'display': note.display}">      
            <div @click="selected=index">
                <span class="update" @click="updateNote(note.title, note.text, note.theme, index, note.date, note.writer,note.category), editorOpen=false, updaterOpen = !updaterOpen"><i class="fas fa-edit" id="fa-edit"></i></span>
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
  </div>
</template>

<script>
import NoteEditor from "./components/NoteEditor.vue";
import Header from "./components/Header.vue";
import OpenMore from "./components/OpenMore.vue";
import NoteMenu from "./components/NoteMenu.vue";
import NoteUpdater from "./components/NoteUpdater.vue";
import Bar from "./components/Bar.vue";

export default {
  name: "App",
  data: function() {
    return {
      editorOpen: false,
      updaterOpen: false,
      notes: [],
      selected: -1,
      filter: "",
      categories: ["to-do", "meeting", "task"]
    };
  },
  computed: {},
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
      this.notes[index] = {
        title: title,
        text: text,
        theme: theme,
        date: date,
        writer: writer
      };
      this.updaterOpen = false;
    },
    reColor(theme) {
      this.notes[this.selected].theme = theme;
      this.notes.moreOpen = false;
    }
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
    appBar: Bar
  }
};
</script>

<style lang="scss">
@import "/styles/global.scss";
</style>
