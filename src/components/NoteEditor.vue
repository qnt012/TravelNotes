<template>
  <div class="note-grid">
    <div class="note-editor">
      <input class="title-input" type="text" v-model="title" placeholder="Title"/>
      <span>
      <input class="effectButton" type="button" value="B" onclick="document.execCommand('bold')" />
      <input class="effectButton" type="button" value="/" onclick="document.execCommand('italic')" />
      <input class="effectButton" type="button" value="_" onclick="document.execCommand('underline')" />
      <input class="effectButton" type="button" value="-" onclick="document.execCommand('strikeThrough')" />
      </span>
      <div class="tArea" contentEditable="true"></div>
      <span class="input-else">
        <input class="writer-input" type="text" placeholder="writer" v-model="writer"/>
        <input type="checkbox" id="due" class="duedate" v-model="due" />
        <label for="due" class="due-label">due date</label>
        <input v-if="due" type="date" v-model="date"/>
      </span>
      <div class="selects">
        <label for="favcolor" class="fav-label"> select color </label>
        <input type="color" id="favcolor" value="#ffffff" v-model="theme" />
        
        <label for="category-input">category </label> 
        <select v-model = "category" id = "category-input" @click="UpdateCategoryOption">
        </select>
        <input v-if="openCategory" type="text" class="categoryInput" v-model="addCategory"/>
        <button v-if="!openCategory" @click="openCategory = !openCategory"><i class="fas fa-plus"></i></button>
        <button v-if="openCategory" @click="createNewCategory"><i class="fas fa-check"></i></button>

      </div>
      <div class="note-editor-bottom">
        <button @click="createNew" class="fas fas-check-circle"><i class="fas fa-check-circle"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categoriesData"],
  data: function() {
    return {
      title: "",
      theme: "#ffffff",
      text: "",
      due: false,
      writer: "",
      category: "",
      openCategory: false,
      addCategory: "",
      html: ""
    };
  },
  methods: {
    createNew() {
      this.text = document.getElementsByClassName("tArea")[0].textContent;
      this.html = document.getElementsByClassName("tArea")[0].innerHTML;
      this.$emit(
        "noteAdded",
        this.title,
        this.text,
        this.theme,
        this.date,
        this.writer,
        this.category,
        this.html
      );
      this.title = "";
      (this.text = ""), (this.theme = "#ffffff");
      this.due = false;
      this.date = "";
      this.writer = "";
      this.category = "";
      this.html = "";
      document.getElementsByClassName("tArea")[0].innerHTML = "";
    },
    deleteNote(index) {
      this.$emit("noteDeleted", index);
    },
    createNewCategory() {
      this.openCategory = false;
      this.$emit("categoryAdded", this.addCategory);
      this.addCategory = "";
    },
    UpdateCategoryOption() {
      var sel = document.getElementById("category-input");
      sel.innerHTML = "";
      sel.appendChild(document.createElement("option"));
      for (var i = 0; i < this.categoriesData.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("label", this.categoriesData[i]);
        option.setAttribute("value", this.categoriesData[i]);
        sel.appendChild(option);
      }
    }
  }
};
</script>
