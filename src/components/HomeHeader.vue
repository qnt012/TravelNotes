<template>
  <div class="homeHeader">
    <img src="../assets/logo.png" @click="moveTo('/')" />
    <ul>
      <li @click="moveTo('/note')">My Notes</li>
      <li @click="moveTo('/browse')">Browse</li>
      <li>RoadMap</li>
      <li>Callender</li>
    </ul>

    <img id="trip" src="../assets/trip.jpg" @click="buttonSwitch" />
    <button id="moveLogin" @click="moveTo('/login')" v-if="this.switch">
      로그인페이지
    </button>
    <button id="Logout" @click="logout" v-if="this.switch">로그아웃</button>
    <button @click="showEm">이메일 확인</button>
    <span id="em"></span>
    <div id="at"></div>
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
  mounted() {
    if (localStorage.getItem("notes")) this.$store.commit("restoreNote");
  },
  computed: {
    email() {
      return this.$store.getters.getEmail;
    },
    notes() {
      return this.$store.getters.getNotes;
    },
    switch() {
      return this.$store.getters.getSwitch;
    },
  },
  methods: {
    buttonSwitch() {
      if (this.switch == false) {
        this.$store.commit("setSwitch", true);
      } else {
        this.$store.commit("setSwitch", false);
      }
    },
    showEm() {
      document.getElementById("em").innerHTML = this.email;
    },
    logout() {
      var deleteURL =
        "https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=jyvqXeaVOVmV&client_secret=527300A0_COq1_XV33cf&access_token=" +
        document.getElementById("at").innerHTML +
        "&service_provider=NAVER";
      location.href = deleteURL;
      location.href = "http://nid.naver.com/nidlogin.logout";

      localStorage.removeItem("com.naver.nid.access_token");
      localStorage.removeItem("com.naver.nid.oauth.state_token");

      document.getElementById("em").innerHTML = "";
      document.getElementById("at").innerHTML = "";
    },
    moveTo(page) {
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