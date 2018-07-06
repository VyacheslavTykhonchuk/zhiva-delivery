(function ($) {
    "use strict";

    window.projectName = $.extend({}, {
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        winScroll: $(window).scrollTop(),
        preloader: $('.preloader'),
        modalWindow: $('.modal'),

        init: function () {
            projectName.initHeader();
        },
        initHeader: function name(params) {
            console.log('initialized');
        },
    });
    $(document).ready(function () {
        projectName.init();
    });
})(jQuery);
