<template>
  <div class="homeHeader">
    <img src="../assets/logo.png" @click="moveTo('/')" />
    <ul>
      <li @click="moveTo('/note')">My Notes</li>
      <li @click="moveTo('/browse')">Browse</li>
      <li>RoadMap</li>
      <li>Callender</li>
    </ul>

    <div class="nlogin">
      <NaverLogin
        client-id="1QKUkUg9yH08n9vN4Zhz"
        callback-url="http://localhost:8080/"
        v-bind:is-popup="false"
        v-bind:button-type="3"
        v-bind:button-height="30"
        button-color="green"
        :callbackFunction="callbackFunction"
      />
    </div>
  </div>
</template>

<script>
import router from "../router.js";
import NaverLogin from "vue-naver-login";

let callbackFunction = (status) => {
  if (status) {
    /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
    var email = NaverLogin.user.getEmail();
    if (email == undefined || email == null) {
      alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
      /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
      NaverLogin.reprompt();
      return;
    }
    window.location.replace(
      "http://" +
        window.location.hostname +
        (location.port == "" || location.port == undefined
          ? ""
          : ":" + location.port) +
        "/"
    );
  } else {
    console.log("callback 처리에 실패하였습니다.");
  }
};
export default {
  router,
  components: {
    NaverLogin,
  },
  computed: {
    email() {
      return this.$store.getters.getEmail;
    },
  },
  methods: {
    moveTo(page) {
      var router = this.$router;
      router.push(page);
    },
    callbackFunction,
  },
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>