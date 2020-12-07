<template>
  <div class="homeHeader">
    <img src="../assets/logo.png" @click="moveTo('/')" />
    <ul>
        <li @click="moveTo('/note')">My Notes</li>
        <li @click="moveTo('/browse')">Browse</li>
        <li @click="moveTo('/roadmap')">RoadMap</li>
        <li @click="moveTo('/calendar')">Calendar</li>
    </ul>

    <img id="trip" src="../assets/trip.jpg" @click="buttonSwitch" />
    <button
      id="moveLogin"
      @click="moveTo('/login')"
      v-if="this.switch && this.in"
    >
      로그인페이지
    </button>
    <button id="Logout" @click="logout" v-if="this.switch && this.out">
      로그아웃
    </button>
    <button @click="showEm">이메일 확인</button>
    <span id="em"></span>
  </div>
</template>

<script src="../../node_modules/jquery/dist/jquery.min.js"></script>
<script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"></script>
<script>
import router from "../router.js";
import NaverLogin from "vue-naver-login";
import $ from "jquery";

export default {
  router,
  components: {
    NaverLogin,
  },
  data: function () {
    return {
      switch: false,
    };
  },
  mounted() {
    if (localStorage.getItem("notes")) this.$store.commit("restoreNote");
  },
  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },
  },
  computed: {
    email() {
      return this.$store.getters.getEmail;
    },
    notes() {
      return this.$store.getters.getNotes;
    },
    in() {
      return this.$store.getters.getIn;
    },
    out() {
      return this.$store.getters.getOut;
    },
  },
  methods: {
    buttonSwitch() {
      this.switch = !this.switch;
    },
    showEm() {
      document.getElementById("em").innerHTML = this.email;
      this.$store.commit("setIn", false);
      this.$store.commit("setOut", true);
      for (var i = 0; i < this.notes.length; i++) {
        this.notes[i].display = "none";
        if (this.notes[i].writer == this.email) {
          console.log(i);
          this.notes[i].display = "inline-block";
        }
      }
    },
    logout() {
      this.$store.commit("setIn", true);
      this.$store.commit("setOut", false);
      var deleteURL =
        "https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=jyvqXeaVOVmV&client_secret=527300A0_COq1_XV33cf&access_token=" +
        localStorage.getItem("com.naver.nid.access_token") +
        "&service_provider=NAVER";
      location.href = deleteURL;
      location.href = "http://nid.naver.com/nidlogin.logout";

      localStorage.removeItem("com.naver.nid.access_token");
      localStorage.removeItem("com.naver.nid.oauth.state_token");

      document.getElementById("em").innerHTML = "";
      //document.getElementById("at").innerHTML = "";
    },
    moveTo(page) {
      if (page == "/") {
        location.href = "http://localhost:8080/";
      }
      var router = this.$router;
      router.push(page);
      this.$store.commit("setEmail", document.getElementById("em").innerHTML);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>
