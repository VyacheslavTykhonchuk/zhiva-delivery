(function ($) {
    "use strict";

    window.projectName = $.extend({}, {
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        winScroll: $(window).scrollTop(),
        preloader: $('.preloader'),
        modalWindow: $('.modal'),

        init: function () {
            projectName.initSlider();
        },
        initSlider: function () {
            $('.sliderContainer').slick({
                dots: true,
                autoplay: true,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
            });
        },
    });
    $(document).ready(function () {
        projectName.init();
    });
})(jQuery);
