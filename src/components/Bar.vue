<template>
    <div class="bar" >
        <div id = "filter" class="bar-comp">
            <label for="note-filter">Note Filter: </label>
            <select id="note-filter" @click="UpdateCategoryOption" @change="SelectCategory" v-model="op">
            </select>
        </div>
    </div>
</template>

<script>
export default {
  props: ["notesData", "categoriesData"],
  data() {
    return {
      op: "",
      firstOp: document.createElement("option")
    };
  },
  methods: {
    UpdateCategoryOption() {
      var sel = document.getElementById("note-filter");
      while (sel.hasChildNodes()) {
        sel.removeChild();
      }
      sel.appendChild(this.firstOp);
      for (var i = 0; i < this.categoriesData.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("label", this.categoriesData[i]);
        option.setAttribute("value", this.categoriesData[i]);
        sel.appendChild(option);
      }
    },

    SelectCategory() {
      this.$emit("filteringNote", this.op);
    }
  },
  watch: {
    notesData: {
      handler() {
        this.SelectCategory();
      },
      deep: true
    },
    categoriesData: {
      handler() {
        this.UpdateCategoryOption();
      },
      deep: true
    }
  }
};
</script>