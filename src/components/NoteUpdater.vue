<template>
    <div class="note-grid">
        <div class="note-editor">
            <input class="title-input" type="text" v-model="inputTitle" placeholder="">
            <span>
            <input class="effectButton" type="button" value="B" onclick="document.execCommand('bold')" />
            <input class="effectButton" type="button" value="/" onclick="document.execCommand('italic')" />
            <input class="effectButton" type="button" value="_" onclick="document.execCommand('underline')" />
            <input class="effectButton" type="button" value="-" onclick="document.execCommand('strikeThrough')" />
            </span>
            <div class="tArea" contentEditable="true" v-html="inputHtml"></div>
            <span class="input-else">
            <input class="writer-input" type="text" placeholder="writer" v-model="inputWriter">
            <input type="checkbox" id="due" class="duedate" v-model="due">
            <label for="due" class="due-label">due date</label>
            <input v-if="due" type="date" v-model="inputDate">
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
  props: ["notesData"],
  data() {
    return {
      inputTitle: this.notesData[this.index].title,
      inputText: this.notesData[this.index].text,
      inputTheme: this.notesData[this.index].theme,
      inputIndex: this.notesData[this.index].index,
      due: true,
      inputDate: this.notesData[this.index].date,
      inputWriter: this.notesData[this.index].writer,
      inputHtml: this.notesData[this.index].html
    };
  },
  methods: {
    createUpdate() {
      if (this.due == false) {
        this.inputDate = "";
      }
      this.inputText = document.getElementsByClassName("tArea")[0].textContent;
      this.inputHtml = document.getElementsByClassName("tArea")[0].innerHTML;
      this.$emit(
        "noteUpdated",
        this.inputTitle,
        this.inputText,
        this.inputTheme,
        this.inputIndex,
        this.inputDate,
        this.inputWriter,
        this.inputHtml
      );
      this.inputTitle = "";
      (this.inputText = ""), (this.inputTheme = "");
      this.due = true;
      this.inputDate = "";
      this.inputWriter = "";
      this.inputHtml = "";
      document.getElementsByClassName("tArea")[0].innerHTML = "";
    },
    cancelUpdate() {
      this.$emit(
        "noteUpdated",
        this.notesData[this.index].title,
        this.notesData[this.index].text,
        this.notesData[this.index].theme,
        this.notesData[this.index].index,
        this.notesData[this.index].date,
        this.notesData[this.index].writer,
        this.notesData[this.index].html
      );
      this.inputTitle = "";
      (this.inputText = ""), (this.inputTheme = "");
      this.due = true;
      this.inputDate = "";
      this.inputWriter = "";
      this.inputHtml = "";
      document.getElementsByClassName("tArea")[0].innerHTML = "";
    }
  }
};
</script>