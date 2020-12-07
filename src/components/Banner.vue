<template>
    <div class="contents">
        <div class="banner">
            <ul class>
                <li><img src="../assets/banner1.png"></li>
                <li><img src="../assets/banner2.png"></li>
                <li><img src="../assets/banner3.png"></li>
            </ul>
        </div>
    </div>
</template>

<script src="../../node_modules/jquery/dist/jquery.min.js"></script>
<script language="javaScript">
import $ from "jquery";
import router from "../router.js";
$(document).ready(function() {
  var $banner = $(".banner").find("ul");

  var $bannerWidth = $banner.children().outerWidth(); //이미지의 폭
  var $bannerHeight = $banner.children().outerHeight(); // 높이
  var $length = $banner.children().length; //이미지의 갯수
  var rollingId;

  //정해진 초마다 함수 실행
  rollingId = setInterval(function() {
    rollingStart();
  }, 4000); //다음 이미지로 롤링 애니메이션 할 시간차

  function rollingStart() {
    $banner.css("width", $bannerWidth * $length + "px");
    $banner.css("height", $bannerHeight + "px");

    //배너의 좌측 위치를 옮겨 준다.
    $banner.animate({ left: -$bannerWidth + "px" }, 3000, function() {
      //숫자는 롤링 진행되는 시간이다.
      //첫번째 이미지를 마지막 끝에 복사(이동이 아니라 복사)해서 추가한다.
      $(this).append(
        "<li>" +
          $(this)
            .find("li:first")
            .html() +
          "</li>"
      );
      //뒤로 복사된 첫번재 이미지는 필요 없으니 삭제한다.
      $(this)
        .find("li:first")
        .remove();
      //다음 움직임을 위해서 배너 좌측의 위치값을 초기화 한다.
      $(this).css("left", 0);
      //이 과정을 반복하면서 계속 롤링하는 배너를 만들 수 있다.
    });
  }
  console.log(rollingId);
});
export default {
  router,
  methods: {
    moveTo(page) {
      var router = this.$router;
      router.push(page);
    }
  }
};
</script>