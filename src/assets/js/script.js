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
            projectName.initOpenMenu();
            projectName.initPageTopLine();
            projectName.initSelects();
        },
        initSelects() {
            if (!$('.customSelect').length) return false;
            let select = $('.customSelect');
            select.each(function () {
                $(this).on('click', function () {
                    $(this).toggleClass('main-select_opened');
                });
            });

        },

        initPageTopLine() {
            if (!$('#pageTopLine').length) return false;

            let hideLine = $('#closePageTopLine'),
                line = $('#pageTopLine');

            hideLine.on('click', function () {
                $(this).closest(line).addClass('hidden');
                setTimeout(() => {
                    $(this).closest(line).hide();
                }, 400);
            });
        },
        initOpenMenu() {
            let openMenu = $('#openMenu'),
                menu = $('#mainMenu');
            openMenu.on('click', function (e) {
                e.preventDefault();
                menu.toggleClass('visible');
            });

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
                        $(this).siblings('.counterQuantity').val(+$(this).siblings('.counterQuantity').val() + 1);
                    });
                });
                remove.each(function (e) {
                    $(this).on('click', function (e) {
                        e.preventDefault();
                        if (+$(this).siblings('.counterQuantity').val() < 2) return false;
                        $(this).siblings('.counterQuantity').val(+$(this).siblings('.counterQuantity').val() - 1);
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
            productSliders();
            function productSliders() {
                if (!$('.productSliderMain').length) return false;
                let sMain = $('.productSliderMain'),
                    sNav = $('.productSliderNav');

                sMain.slick({
                    dots: false,
                    autoplay: true,
                    arrows: false,
                    draggable: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                });
            }
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
                    slidesToShow: 6,
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
