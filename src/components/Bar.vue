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
  props: ["categoriesData"],
  data() {
    return {
      op: ""
    };
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
  }
};
</script>