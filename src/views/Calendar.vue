<template>
  <v-app>
    <cal-header></cal-header>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
      <v-btn
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
      prev
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
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
      <v-btn
        class="ma-2"
        @click="$refs.calendar.next()"
      >
      next
      </v-btn>
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
    type: "month",
    types: ["month"],
    mode: "stack",
    modes: ["stack"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] }
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
      "grey darken-1"
    ]
  }),
  components: {
    calHeader: CalHeader
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    categories() {
      return this.$store.getters.getCategories;
    }
  },
  methods: {
    findCategoryIndex(c) {
      for (var i = 0; i < this.categories.length; i++)
        if (this.categories[i] == c) return i;
    },
    getEvents() {
      const events = [];
      //const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.notes.length;

      console.log(this.notes);
      console.log(this.categories);

      for (let i = 0; i < eventCount; i++) {
        const first = new Date(this.notes[i].date);
        const second = new Date(this.notes[i].date);

        console.log();

        events.push({
          name: this.notes[i].category + ": " + this.notes[i].title,
          start: first,
          end: second,
          color: this.colors[this.findCategoryIndex(this.notes[i].category) % 7]
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    }
  },
  mounted() {
    if (localStorage.getItem("notes")) this.$store.commit("restoreNote");
    if (localStorage.getItem("categories"))
      this.$store.commit("restoreCategory");
  }
};
</script>
