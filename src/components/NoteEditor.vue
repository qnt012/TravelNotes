<template>
  <div class="note-grid">
    <div class="note-editor">
      <input class="title-input" type="text" v-model="title" placeholder="Title"/>
      <textarea rows="10" v-model="text" placeholder="Take a note..."></textarea>
      <span class="input-else">
        <input class="writer-input" type="text" placeholder="writer" v-model="writer"/>
        <input type="checkbox" id="due" class="duedate" v-model="due" />
        <label for="due" class="due-label">due date</label>
        <input v-if="due" type="date" v-model="date"/>
      </span>
      <div class="selects">
        <label for="favcolor" class="fav-label"> select color </label>
        <input type="color" id="favcolor" value="#ffffff" v-model="theme" />
        
        <!-- ↓↓↓↓ 카테고리 입력 박스 값 임시 설정 ↓↓↓↓ -->
        <label for="category-input">category </label> 
        <select v-model = "category" id = "category-input">
          <option></option>
          <option label="to-do" value="to-do"></option>
          <option label="meeting" value="meeting"></option>
          <option label="task" value="task"></option>
        </select>
        <!-- 여기까지, 수정 예정 -->

      </div>
      <div class="note-editor-bottom">
        <button @click="createNew" class="fas fas-check-circle"><i class="fas fa-check-circle"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: "",
      theme: "#ffffff",
      text: "",
      due: false,
      writer: "",
      category: ""
    };
  },
  methods: {
    createNew() {
      this.$emit(
        "noteAdded",
        this.title,
        this.text,
        this.theme,
        this.date,
        this.writer,
        this.category
      );
      this.title = "";
      (this.text = ""), (this.theme = "#ffffff");
      this.due = false;
      this.date = "";
      this.writer = "";
      this.category = "";
    },
    deleteNote(index) {
      this.$emit("noteDeleted", index);
    },
    createNewCategory() {
      this.emit("categoryAdded", this.category);
    }
  }
};
</script>
