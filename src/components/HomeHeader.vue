<template>
  <div class="homeHeader">
    <img src="../assets/logo.png" @click="moveTo('/')" />
    <ul>
      <li @click="moveTo('/note')">My Notes</li>
      <li @click="moveTo('/browse')">Browse</li>
      <li>RoadMap</li>
      <li>Callender</li>
    </ul>

    <div class="nlogin" v-if="isLogIn">
      <NaverLogin
        client-id="1QKUkUg9yH08n9vN4Zhz"
        callback-url="http://127.0.0.1:8080/"
        v-bind:is-popup="false"
        v-bind:button-type="3"
        v-bind:button-height="30"
        button-color="green"
        :callbackFunction="callbackFunction"
      />
    </div>
    <button v-if="isLogIn" @click="[status(), (isLogIn = !isLogIn)]">
      확인
    </button>
    <div id="em"></div>
    <button
      type="button"
      onclick="location.href='http://nid.naver.com/nidlogin.logout'"
      v-if="!isLogIn"
    >
      로그아웃
    </button>
  </div>
</template>

<script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"></script>
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
  data: function () {
    return {
      isLogIn: true,
    };
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
    status() {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: "1QKUkUg9yH08n9vN4Zhz",
        isPopup: false,
      });
      naverLogin.init();
      naverLogin.getLoginStatus(function (status) {
        if (status) {
          const email = naverLogin.user.getEmail();
          document.getElementById("em").innerHTML = email;
          console.log(email);
        } else {
          alert("AccessToken이 올바르지 않습니다.");
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>