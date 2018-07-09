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
        initSlider: function name(params) {
            console.log('initialized');
            $('.sliderContainer').slick({
                autoplay: true,
            });
        },
    });
    $(document).ready(function () {
        projectName.init();
    });
})(jQuery);
