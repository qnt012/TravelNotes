<template>
  <div class="homeHeader">
    <img src="../assets/logo.png" @click="moveTo('/')" />
    <ul>
      <li @click="moveTo('/note')">My Notes</li>
      <li @click="moveTo('/browse')">Browse</li>
      <li>RoadMap</li>
      <li>Callender</li>
    </ul>

    <div @click="Disp" id="nlogin">
      <NaverLogin
        client-id="1QKUkUg9yH08n9vN4Zhz"
        callback-url="http://localhost:8080/"
        v-bind:is-popup="false"
        v-bind:button-type="3"
        v-bind:button-height="30"
        button-color="white"
        :callbackFunction="callbackFunction"
      />
    </div>
    <button @click="status">확인</button>
    <button @click="st">스타일</button>
    <div id="em"></div>
    <div id="at"></div>
    <button @click="logout">로그아웃</button>
  </div>
</template>

<script src="../../node_modules/jquery/dist/jquery.min.js"></script>
<script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"></script>
<script>
import router from "../router.js";
import NaverLogin from "vue-naver-login";
import $ from "jquery";

// $(document).ready(function () {
//   if ($("#nlogin").css("visibility") == "visible") {
//     $("#nlogin").show();
//   } else {
//     $("#nlogin").hide();
//   }
// });

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
  mounted() {
    if (localStorage.getItem("notes")) 
      this.$store.commit("restoreNote");
  },
  computed: {
    email() {
      return this.$store.getters.getEmail;
    },
    notes() {
      return this.$store.getters.getNotes;
    },
  },
  methods: {
    // Disp() {
    //   var con = document.getElementById("nlogin");
    //   con.style.visibility = "hidden";
    //   console.log(con.style.visibility);
    // },
    // st() {
    //   var con = document.getElementById("nlogin");
    //   con.style.visibility = "hidden";
    //   console.log(con.style.visibility);
    // },
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

      // var con = document.getElementById("nlogin");
      // con.style.visibility = "visible";
    },
    moveTo(page) {
      var router = this.$router;
      router.push(page);
      this.$store.commit("setEmail", document.getElementById("em").innerHTML);

      // for (var i = 0; i < this.notes.length; i++) {
      //   this.notes[i].display = "none";
      //   if (this.notes[i].writer == this.email) {
      //     this.notes[i].display = "inline-block";
      //   }
      // }
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

          const token = naverLogin.accessToken.accessToken;
          document.getElementById("at").innerHTML = token;
          console.log(token);
        } else {
          console.log("AccessToken이 올바르지 않습니다.");
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/global.scss";
</style>