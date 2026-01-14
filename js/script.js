$(document).ready(function () {
    var NAV_OFFSET = 70;

    $(".navbar a, footer a[href='#myPage'], a[href='#background']").on("click", function (event) {
        var hash = this.hash;
        if (!hash) return;

        var $target = $(hash);
        if ($target.length === 0) return;

        event.preventDefault();

        $("html, body").animate(
            { scrollTop: $target.offset().top - NAV_OFFSET },
            650,
            function () { window.location.hash = hash; }
        );

        if ($(".navbar-toggle").is(":visible")) {
            $(".navbar-collapse").collapse("hide");
        }
    });
});
