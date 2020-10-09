<template>
    <div class="note-grid">
        <div class="note-editor">
            <input class="title-input" type="text" v-model="inputTitle" placeholder="">
            <textarea rows="10" v-model="inputText" placeholder=""></textarea>   
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
            inputIndex: this.notesData[this.index].index
        }
    },   
    methods: {    
        createUpdate() {
            this.$emit('noteUpdated', this.inputTitle, this.inputText, this.inputTheme, this.inputIndex);
            this.inputTitle = '';
            this.inputText= '',
            this.inputTheme = '';
        },
    },
}
</script>

