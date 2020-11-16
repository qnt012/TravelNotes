<template>
    <div class="note-grid">
        <div class="note-editor">
            <input class="title-input" type="text" v-model="this.notes[this.selected].title" placeholder="title">
            <span>
            <input class="effectButton" type="button" value="B" onclick="document.execCommand('bold')" />
            <input class="effectButton" type="button" value="/" onclick="document.execCommand('italic')" />
            <input class="effectButton" type="button" value="_" onclick="document.execCommand('underline')" />
            <input class="effectButton" type="button" value="-" onclick="document.execCommand('strikeThrough')" />
            </span>
            <div class="tArea" contentEditable="true" v-html="this.notes[this.selected].html"></div>
            <span class="input-else">
            <input class="writer-input" type="text" placeholder="writer" v-model="this.notes[this.selected].writer">
            <input type="checkbox" id="due" class="duedate" v-model="due">
            <label for="due" class="due-label">due date</label>
            <input id="dat" v-if="due" type="date" v-model="this.notes[this.selected].date">
            </span>
            <div class="note-editor-bottom">
                <button @click=createUpdate class="fas fa-edit"></button>
                <button @click=cancelUpdate class="fas fa-times"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      inputTitle:"",
      inputText:"",
      inputDate:"",
      inputWriter:"",
      inputHtml:"",
      due: true
    };
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
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
  methods: {
    createUpdate() {
      if (this.due == false)
        this.inputDate = "";
      else
        this.inputDate = document.getElementById("dat").value;
      
      this.inputTitle = document.getElementsByClassName("title-input")[0].value;
      this.inputText = document.getElementsByClassName("tArea")[0].textContent;
      this.inputWriter = document.getElementsByClassName("writer-input")[0].value;
      this.inputHtml = document.getElementsByClassName("tArea")[0].innerHTML;
      
      this.$store.commit("updateNote", {
        title: this.inputTitle,
        text: this.inputText,
        date: this.inputDate,
        writer: this.inputWriter,
        html: this.inputHtml
        }
      ); 
      this.$store.commit("setUpdaterOpen", false);
      this.$store.commit("setUpdaterButton", true);
    },
    cancelUpdate() {
      this.inputTitle = "";
      this.inputText = "";
      this.due = true;
      this.inputDate = "";
      this.inputWriter = "";
      this.inputHtml = "";
      document.getElementsByClassName("tArea")[0].innerHTML = "";
      this.$store.commit("setUpdaterOpen", false);
      this.$store.commit("setUpdaterButton", true);
    }
  },
  mounted() {
    if (localStorage.getItem("notes")) this.$store.commit("restoreNote");
  }
};
</script>