$(document).ready(function () {
  var NAV_OFFSET = 90;

  // Smooth scroll (내부 앵커만)
  $(".navbar a, .to-top").on("click", function (event) {
    var hash = this.hash;
    if (!hash) return;

    var $target = $(hash);
    if ($target.length === 0) return;

    event.preventDefault();

    $("html, body").stop().animate(
      { scrollTop: $target.offset().top - (NAV_OFFSET - 10) },
      500,
      function () {
        // hash 갱신
        window.location.hash = hash;

        // scrollspy 즉시 refresh
        $("body").scrollspy("refresh");
      }
    );

    // 모바일에서 메뉴 닫기
    if ($(".navbar-toggle").is(":visible")) {
      $("#myNavbar").collapse("hide");
    }
  });

  // ScrollSpy가 "CONTACT"를 끝까지 못 잡는 문제 방지
  // (페이지 끝에 도달하면 마지막 섹션을 강제로 active)
  $(window).on("scroll", function () {
    var scrollBottom = $(window).scrollTop() + $(window).height();
    var docBottom = $(document).height() - 2;

    if (scrollBottom >= docBottom) {
      $(".navbar-nav li").removeClass("active");
      $('.navbar-nav li a[href="#contact"]').parent().addClass("active");
    }
  });

  // 초기 로드에도 refresh
  $("body").scrollspy({ target: ".navbar", offset: NAV_OFFSET });
  $(window).trigger("scroll");
});
