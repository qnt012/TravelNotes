<template>
  <div class="home" @load="lo">
    <home-header></home-header>
    <app-banner></app-banner>
    <div class="noteContainerHeader"></div>
    <div style="z-index: 1" class="homeNoteContainer">
      <div v-for="(note, index) in notes.reverse().slice(0,10)" :key="`note-${index}`" :id="index" class="note" :style="{ 'background-color': note.theme, display: note.display }">
          <span>
            <p class="note-title">{{ note.title }}</p>
            <img id="noteImg" v-if='note.img != ""' :src="note.img" width="100%"/>
            <p v-html="note.html" class="note-text">{{ note.text }}</p>
          </span>
          <div class="note-bottom">
            <span class="date-text" v-if="note.date">due date: {{ note.date }}</span>
            <div class="writer-text" v-if="note.writer">
              <i class="fas fa-user"></i>
              {{ note.writer }}
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue";
import Banner from "../components/Banner.vue";
export default {
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    }
  },
  methods: {
    lo() {
      for (var i = 0; i < this.notes.length; i++) {
        this.notes[i].display = "none";
        if (this.notes[i].writer == this.email) {
          console.log(i);
          this.notes[i].display = "inline-block";
        }
      }
    }

  },
  mounted() {
    if (localStorage.getItem("notes")) this.$store.commit("restoreNote");
  },
  components: {
    homeHeader: HomeHeader,
    appBanner: Banner
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>

