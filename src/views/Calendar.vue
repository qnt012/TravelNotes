<template>
  <v-app>
    <cal-header></cal-header>
    <v-sheet tile height="54" class="d-flex">
      <v-btn class="ma-2" @click="$refs.calendar.prev()">prev</v-btn>
      <v-select v-model="type" :items="types" dense outlined hide-details class="ma-2" label="type"></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        dense
        outlined
        hide-details
        label="event-overlap-mode"
        class="ma-2"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="$refs.calendar.next()">next</v-btn>
    </v-sheet>
    <v-sheet height="800">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </v-app>
</template>

<script>
import CalHeader from "../components/CalHeader.vue";
import "vuetify/dist/vuetify.min.css";
export default {
  data: () => ({
    colorNum: 0,
    categoryColor: {},
    type: "month",
    types: ["month"],
    mode: "stack",
    modes: ["stack"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  }),
  components: {
    calHeader: CalHeader,
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
  },
  methods: {
    makeCategories() {
      const set1 = new Set();
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].category != "") set1.add(this.notes[i].category);
      }
      return set1;
    },
    getEvents() {
      const events = [];
      //const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.notes.length;
      const categorySet = this.makeCategories();
      console.log("start");
      for (let e = 0; e < categorySet.size; e++) {
        var categoryArray = Array.from(categorySet);
        var maxDate = new Date(-8640000000000000);
        var minDate = new Date(8640000000000000);
        console.log(minDate);
        console.log(maxDate);
        for (let i = 0; i < eventCount; i++) {
          if (this.notes[i].category == categoryArray[e]) {
            var da = new Date(this.notes[i].date);
            console.log(da);
            if (da <= minDate) minDate = da;
            if (da >= maxDate) maxDate = da;
          }
        }
        events.push({
            name: categoryArray[e],
            start: minDate,
            end: maxDate,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
          });
      }
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
  mounted() {
    if (localStorage.getItem("notes")) this.$store.commit("restoreNote");
  },
};
</script>
