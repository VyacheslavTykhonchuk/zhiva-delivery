(function ($) {
    "use strict";

    window.projectName = $.extend({}, {
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        winScroll: $(window).scrollTop(),
        preloader: $('.preloader'),
        modalWindow: $('.modal'),

        init() {
            projectName.initSlider();
            projectName.initQuantityItems();
        },
        initQuantityItems() {
            openQuantity();
            initInputBtns();

            function initInputBtns() {
                if (!$('.addQuantity').length) return false;

                let add = $('.addQuantity'),
                    remove = $('.removeQuantity');
                add.each(function (e) {
                    $(this).on('click', function (e) {
                        e.preventDefault();
                        $(this).siblings('.counterQuantity').stepUp(1);
                    });
                });
                remove.each(function (e) {
                    $(this).on('click', function (e) {
                        e.preventDefault();
                        $(this).siblings('.counterQuantity').stepDown(1);
                    });
                });
            }
            function openQuantity() {
                if (!$('.addDisplaying').length) return false;

                let openQuantity = $('.addDisplaying');
                openQuantity.each(function (e) {
                    $(this).on('click', function (e) {
                        e.preventDefault();
                        $(this).closest('.quantityVisibility').addClass('quantityVisibility_visible');
                    });
                });
            }
        },
        initSlider() {
            // call 
            plateSlider();
            homeSlide();
            reviewSlider();

            function homeSlide() {
                if (!$('.sliderContainer').length) return false;

                $('.sliderContainer').slick({
                    dots: true,
                    autoplay: true,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                });
            }

            function plateSlider() {
                if (!$('.plateSlider').length) return false;

                $('.plateSlider').slick({
                    dots: false,
                    autoplay: true,
                    arrows: true,
                    infinite: true,
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    prevArrow: $('.arrPrev'),
                    nextArrow: $('.arrNext'),
                    responsive: [
                        {
                            breakpoint: 1445,
                            settings: {
                                slidesToShow: 5,
                                slidesToScroll: 1,
                                infinite: true,
                            }
                        },
                        {
                            breakpoint: 1025,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                infinite: true,
                            }
                        },
                    ]
                });
            }
            function reviewSlider() {
                if (!$('.reviewSlider').length) return false;
                $('.reviewSlider').slick({
                    dots: true,
                    autoplay: true,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                });
            }
        },
    });
    $(document).ready(function () {
        projectName.init();
    });
})(jQuery);
