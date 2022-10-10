/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

// Preloader js
$(window).on("load", function() {
    "use strict";
    $(".preloader").fadeOut(0);
});

(function($) {
    "use strict";

    // tab
    $(".tab-content")
        .find(".tab-pane")
        .each(function(idx, item) {
            var navTabs = $(this).closest(".code-tabs").find(".nav-tabs"),
                title = $(this).attr("title");
            navTabs.append(
                '<li class="nav-item"><a class="nav-link" href="#">' +
                title +
                "</a></li>"
            );
        });

    $(".code-tabs ul.nav-tabs").each(function() {
        $(this).find("li:first").addClass("active");
    });

    $(".code-tabs .tab-content").each(function() {
        $(this).find("div:first").addClass("active");
    });

    $(".nav-tabs a").click(function(e) {
        e.preventDefault();
        var tab = $(this).parent(),
            tabIndex = tab.index(),
            tabPanel = $(this).closest(".code-tabs"),
            tabPane = tabPanel.find(".tab-pane").eq(tabIndex);
        tabPanel.find(".active").removeClass("active");
        tab.addClass("active");
        tabPane.addClass("active");
    });

    // accordion-collapse
    $(".accordion-collapse").on("show.bs.collapse", function() {
        $(this).siblings(".accordion-header").addClass("active");
    });
    $(".accordion-collapse").on("hide.bs.collapse", function() {
        $(this).siblings(".accordion-header").removeClass("active");
    });

    //post slider
    $(".post-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        dots: false,
        arrows: true,
        prevArrow: '<button type="button" class="prevArrow"><i class="fas fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="nextArrow"><i class="fas fa-angle-right"></i></button>',
    });

    // videoPopupInit
    function videoPopupInit() {
        var $videoSrc;
        $(".video-play-btn").click(function() {
            $videoSrc = $(this).data("src");
        });
        $("#videoModal").on("shown.bs.modal", function(e) {
            $("#showVideo").attr(
                "src",
                $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
            );
        });
        $("#videoModal").on("hide.bs.modal", function(e) {
            $("#showVideo").attr("src", $videoSrc);
        });
    }
    videoPopupInit();

    // table of content
    new ScrollMenu("#TableOfContents a", {
        duration: 400,
        activeOffset: 40,
        scrollOffset: 10,
    });
})(jQuery);











//
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};