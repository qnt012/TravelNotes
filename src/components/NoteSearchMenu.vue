<template>
  <div class="noteSearchMenu">
    <input
      class="input-search"
      type="search"
      v-model="keyword"
      @change="searchKeyword"
      placeholder="  검색"
    />
    <i @click="searchKeyword" class="fas fa-search"></i>
    <i @click="deleteKeyword" class="fas fa-undo"></i>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      keyword: "",
    };
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
  },
  methods: {
    searchKeyword() {
      for (var i = 0; i < this.notes.length; i++) {
        this.notes[i].display = "none";
        if (this.keyword != "") {
          if (this.notes[i].title.indexOf(this.keyword) != -1) {
            this.notes[i].display = "inline-block";
          }
          if (this.notes[i].text.indexOf(this.keyword) != -1) {
            this.notes[i].display = "inline-block";
          }
          if (this.notes[i].writer.indexOf(this.keyword) != -1) {
            this.notes[i].display = "inline-block";
          }
        } else {
          this.notes[i].display = "inline-block";
          this.keyword = "";
        }
      }
    },
    deleteKeyword() {
      this.keyword = "";
      for (var i = 0; i < this.notes.length; i++) {
        this.notes[i].display = "inline-block";
      }
    },
  },
};
</script>