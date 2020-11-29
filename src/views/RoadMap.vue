<template>
  <div>
    <home-header></home-header>
    <div id="roadmapTop">
      <div id="info">{{selectedCategory}}</div>
    </div>
    <naver-maps :height="height" :width="width" :mapOptions="mapOptions" :initLayers="initLayers" @load="onLoad">
        <div v-if="drawMap">   
            <naver-marker v-if="mark[0]" :lat="35.83488283119064" :lng="129.21910014026193" @click="onMarkerClicked()" @mouseover="onMarkerOver('첨성대')" @mouseout="place = ''"/>
            <naver-marker v-if="mark[1]" :lat="37.513152374893636" :lng="127.10271074029531" @click="onMarkerClicked()" @mouseover="onMarkerOver('롯데월드타워')" @mouseout="place = ''"/>
            <naver-marker v-if="mark[2]" :lat="37.57613672244167" :lng="126.97682642865742" @click="onMarkerClicked()" @mouseover="onMarkerOver('광화문')" @mouseout="place = ''"/>
            <naver-marker v-if="mark[3]" :lat="36.084609378549544" :lng="129.5556382979372" @click="onMarkerClicked()" @mouseover="onMarkerOver('호미곶')" @mouseout="place = ''"/>
            <naver-marker v-if="mark[4]" :lat="35.83479346481853" :lng="129.22657274426172" @click="onMarkerClicked()" @mouseover="onMarkerOver('안압지')" @mouseout="place = ''"/>
            <naver-polyline :path="paths" />
       </div>
    </naver-maps>
    <div id="roadmapCategory">
        <button id="btn-category" v-for="(category, index) in categories" :key="`note-${index}`" @click="selectCategory(category)" >{{category}}</button>
    </div>
    <div v-if="search" style="z-index: 1" class="noteContainer">
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
      drawMap: false,
      selectedCategory: "",
      place:"",
      width: "100%",
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
      ],      
      placeList:[
        ['첨성대', 35.83488283119064, 129.21910014026193],
        ['롯데월드타워', 37.513152374893636, 127.10271074029531],
        ['광화문', 37.57613672244167, 126.97682642865742],
        ['호미곶', 36.084609378549544, 129.5556382979372],
        ['안압지', 35.8347934648185, 129.22657274426172] 
      ],
      mark:[false, false, false, false, false]
    };
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    paths() {
      return this.$store.getters.getPaths;
    },
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
    },
    onMarkerClicked() {
      for (var i = 0; i < this.notes.length; i++) {
        if (this.notes[i].predict == this.place && this.notes[i].category == this.selectedCategory ) {
          this.notes[i].display = "inline-block";
        } else {
          this.notes[i].display = "none";
        }
      }
      this.search = true;
      console.log(event);
    },
    selectCategory(category){
        this.search = false
        this.notes.display = "inline-block";
        this.paths.splice(0);
        this.selectedCategory = category;
        this.drawMap = false;
        this.mark = [false, false, false, false, false]
        for (var i = 0; i < this.notes.length; i++) {
            if (this.notes[i].category == category) {
                for(var j = 0; j < this.placeList.length; j++){
                    if(this.notes[i].predict == this.placeList[j][0]){
                        this.drawMap = true;
                        this.mark[j] = true;
                        this.paths.push({lat:this.placeList[j][1], lng:this.placeList[j][2]}) 
                    }
                }
            } 
        }
    },
    
  },
  mounted() {
    if (localStorage.getItem("notes")) this.$store.commit("restoreNote");
    if (localStorage.getItem("categories")) this.$store.commit("restoreCategory");
    if (localStorage.getItem("paths")) this.$store.commit("restorePaths");
  },
    watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },
    categories: {
      handler() {
        var newCategories = this.categories;
        localStorage.setItem("categories", JSON.stringify(newCategories));
      },
      deep: true,
    },
    paths: {
      handler() {
        var newPaths = this.paths;
        localStorage.setItem("paths", JSON.stringify(newPaths));
      },
      deep: true,
    },
  },
  components: {
    homeHeader: HomeHeader
  }

};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>