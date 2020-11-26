<template>
  <div>
    <home-header></home-header>
    <naver-maps
      :height="height"
      :width="width"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @load="onLoad">
      <naver-marker :lat="35.83488283119064" :lng="129.21910014026193" @click="onMarkerClicked()" @mouseover="onMarkerOver('첨성대')" @mouseout="this.place = ''"/>
      <naver-marker :lat="37.513152374893636" :lng="127.10271074029531" @click="onMarkerClicked()" @mouseover="onMarkerOver('롯데월드타워')" @mouseout="this.place = ''"/>
      <naver-marker :lat="37.57613672244167" :lng="126.97682642865742" @click="onMarkerClicked()" @mouseover="onMarkerOver('광화문')" @mouseout="this.place = ''"/>
      <naver-marker :lat="36.084609378549544" :lng="129.5556382979372" @click="onMarkerClicked()" @mouseover="onMarkerOver('호미곶')" @mouseout="this.place = ''"/>
      <naver-marker :lat="35.83479346481853" :lng="129.22657274426172" @click="onMarkerClicked()" @mouseover="onMarkerOver('안압지')" @mouseout="this.place = ''"/>
    </naver-maps>
    <div v-if=this.search style="z-index: 1" class="noteContainer">
      <div v-for="(note, index) in notes" :key="`note-${index}`" :id="index" class="note" :style="{ 'background-color': note.theme, display: note.display }">
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
export default {
  name: "HelloWorld",
  data() {
    return {
      place: "",
      width: '100%',
      height: 600,
      search: false,
      marker: null,
      count: 1,
      map: null,
      isCTT: false,
      mapOptions: {
        lat: 37,
        lng: 127,
        zoom: 7,
        zoomControl: true,
        zoomControlOptions: { position: "TOP_RIGHT" },
        mapTypeControl: true
      },
      initLayers: [
        "BACKGROUND",
        "BACKGROUND_DETAIL",
        "POI_KOREAN",
        "TRANSIT",
        "ENGLISH",
        "CHINESE",
        "JAPANESE"
      ]
    };
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    }
  },
  methods: {
    onLoad(vue) {
      this.map = vue;
    },
    onWindowLoad(that) {
      console.log(that);
    },
    onMarkerOver(p) {
      this.place = p;
      
      console.log(event);
    },
    onMarkerClicked() {
      for (var i = 0; i < this.notes.length; i++) {
        if (this.notes[i].predict == this.place) {
          this.notes[i].display = "inline-block";
        } else {
          this.notes[i].display = "none";
        }
      }
      this.search = true;
      console.log(event);
    }
  },
  mounted() {
    if (localStorage.getItem("notes")) this.$store.commit("restoreNote");
  },
  components: {
    homeHeader: HomeHeader
  }
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>