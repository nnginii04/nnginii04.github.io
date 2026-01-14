$(document).ready(function () {
    var NAV_OFFSET = 80;
    var $body = $("body");
    var $navLinks = $(".navbar-nav li a");
    var $collapse = $(".navbar-collapse");

    $body.scrollspy({ target: ".navbar", offset: NAV_OFFSET });
    $(window).on("load resize", function () {
        $body.scrollspy("refresh");
        syncActiveNav(); // 리사이즈 시에도 바로 맞춤
    });

    // Smooth scroll
    $navLinks.on("click", function (event) {
        var hash = this.hash;
        if (!hash) return;

        var $target = $(hash);
        if ($target.length === 0) return;

        event.preventDefault();

        $("html, body").stop().animate(
            { scrollTop: $target.offset().top - (NAV_OFFSET - 1) },
            520,
            "swing",
            function () {
                window.location.hash = hash;
                syncActiveNav(); // 이동 끝나고 바로 active 동기화
            }
        );

        if ($(".navbar-toggle").is(":visible")) {
            $collapse.collapse("hide");
        }
    });

    // Sections list
    var sectionIds = $navLinks.map(function () {
        return $(this).attr("href");
    }).get();

    function syncActiveNav() {
        var scrollTop = $(window).scrollTop();
        var scrollPos = scrollTop + NAV_OFFSET + 2;

        // ✅ 맨 아래 근처면 무조건 CONTACT
        var docH = $(document).height();
        var winH = $(window).height();
        if (scrollTop + winH >= docH - 2) {
            setActive("#contact");
            return;
        }

        var current = sectionIds[0] || "#about";
        for (var i = 0; i < sectionIds.length; i++) {
            var id = sectionIds[i];
            var $sec = $(id);
            if ($sec.length && $sec.offset().top <= scrollPos) {
                current = id;
            }
        }
        setActive(current);
    }

    function setActive(id) {
        $(".navbar-nav li").removeClass("active");
        $(".navbar-nav li a[href='" + id + "']").parent().addClass("active");
    }

    // rAF scroll
    var ticking = false;
    $(window).on("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                syncActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // init
    syncActiveNav();
});
