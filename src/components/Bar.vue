<template>
  <div class="bar">
    <div id="filter" class="bar-comp">
      <label for="note-filter">Note Filter: </label>
      <select
        id="note-filter"
        @click="UpdateCategoryOption"
        @change="SelectCategory"
        v-model="op"
      ></select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      op: "",
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
  },
  methods: {
    UpdateCategoryOption() {
      var sel = document.getElementById("note-filter");
      sel.innerHTML = "";
      sel.appendChild(document.createElement("option"));
      var none = document.createElement("option");
      none.setAttribute("label", "--none--");
      none.setAttribute("value", "--none--");
      sel.appendChild(none);
      for (var i = 0; i < this.categories.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("label", this.categories[i]);
        option.setAttribute("value", this.categories[i]);
        sel.appendChild(option);
      }
    },
    SelectCategory() {
      this.$store.commit("setFilter", this.op);
      for (var i = 0; i < this.notes.length; i++) {
        if (
          this.notes[i].category == this.op ||
          this.op == "--none--" ||
          this.filter == ""
        ) {
          this.notes[i].display = "inline-block";
        } else {
          this.notes[i].display = "none";
        }
      }
    },
  },
};
</script>