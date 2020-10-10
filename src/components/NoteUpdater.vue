<template>
    <div class="note-grid">
        <div class="note-editor">
            <input class="title-input" type="text" v-model="inputTitle" placeholder="">
            <textarea rows="10" v-model="inputText" placeholder="Take a note..."></textarea>           
            <span class="input-else">
              <input class="writer-input" type="text" placeholder="writer" v-model="inputWriter">
              <input type="checkbox" id="due" class="duedate" v-model="due">
              <label for="due" class="due-label">due date</label>
              <input v-if="due" type="date" v-model="inputDate">
            </span>
            <div class="note-editor-bottom">
                <button @click=createUpdate class="fas fa-edit"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['notesData'],
    data() {
        return {
            inputTitle: this.notesData[this.index].title,                       
            inputText: this.notesData[this.index].text,
            inputTheme: this.notesData[this.index].theme,
            inputIndex: this.notesData[this.index].index,
            due: true,
            inputDate: this.notesData[this.index].date,
            inputWriter: this.notesData[this.index].writer
        }
    },   
    methods: {    
        createUpdate() {
            if (this.due == false) {
                this.inputDate = '';
            }
            this.$emit('noteUpdated', this.inputTitle, this.inputText, this.inputTheme, this.inputIndex, this.inputDate, this.inputWriter);
            this.inputTitle = '';
            this.inputText= '',
            this.inputTheme = '';
            this.due = true;
            this.inputDate = '';
            this.inputWriter = '';
        },
    },
}
</script>

