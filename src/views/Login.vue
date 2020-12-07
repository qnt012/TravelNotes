<template>
  <div>
    <div id="nlogin">
      <NaverLogin
        client-id="1QKUkUg9yH08n9vN4Zhz"
        callback-url="http://localhost:8080/login"
        v-bind:is-popup="false"
        v-bind:button-type="3"
        v-bind:button-height="100"
        button-color="white"
        :callbackFunction="callbackFunction"
      />
      <button @click="[setem(), status()]">확인</button>
      <span id="em"></span>
      <button @click="moveTo('/')">홈페이지로</button>
    </div>
  </div>
</template>

<script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"></script>
<script>
import NaverLogin from "vue-naver-login";
import router from "../router.js";

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
      this.$store.commit("setEmail", document.getElementById("em").innerHTML);
    },
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

          const token = naverLogin.accessToken.accessToken;
          document.getElementById("at").innerHTML = token;
          console.log(token);
        } else {
          console.log("AccessToken이 올바르지 않습니다.");
        }
      });
    },
    setem() {
      this.$store.commit("setEmail", document.getElementById("em").innerHTML);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>