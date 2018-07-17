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
            projectName.initBucketCalc();
            projectName.initLinkInfoBlock();
        },
        initLinkInfoBlock() {
            if (!$('.openSuppDropdown').length) return false;
            let open = $('.openSuppDropdown');
            open.each(function () {
                let $this = $(this);

                $this.on('click', function () {
                    $this.siblings('.links-block__dropdown').toggleClass('links-block__dropdown_opened');
                });
            });
        },
        initBucketCalc() {
            if (!$('.priceCalc').length) return false;

            let priceCalc = $('.priceCalc'),
                quantity = $('.counterQuantity');

            calcItemPrice(bucketPrice);

            quantity.each(function () {
                $(this).on('change', function () {
                    calcItemPrice(bucketPrice);
                });
            });

            function calcItemPrice(bucketPrice) {
                priceCalc.each(function () {
                    let quantity = $(this).find('.counterQuantity').val(),
                        itemPrice = $(this).find('.priceResult').attr('data-piece-price'),
                        fullItemPrice;

                    fullItemPrice = itemPrice * quantity;

                    $(this).attr('data-item-price', fullItemPrice);
                    $(this).find('.priceResult').text(fullItemPrice);

                    weight(quantity, $(this).closest('.bucket-item'), summWeightAll);
                });
                bucketPrice(allPrice);
            }

            function weight(quantity, parent, summWeightAllCallback) {
                parent.each(function () {
                    let fullItemWeight,
                        itemWeight = $(this).find('.itemWeight').attr('data-piece-weight');

                    fullItemWeight = itemWeight * quantity;

                    $(this).find('.itemWeight').attr('data-items-weight', fullItemWeight);

                    summWeightAllCallback();
                });
            }
            function summWeightAll() {
                let wSumm = 0,
                    allWeight = $('.allWeight'),
                    itemWeight = $('.itemWeight');

                itemWeight.each(function () {
                    let fullItemWeight = $(this).attr('data-items-weight');

                    wSumm += +fullItemWeight;

                    allWeight.attr('data-all-weight', +wSumm);
                    allWeight.text(+wSumm);
                });


            }

            function bucketPrice(allPrice) {
                let bucketPrice = null,
                    priceEl = $('.itemsPrice');

                priceCalc.each(function () {
                    let price = $(this).attr('data-item-price');

                    bucketPrice += +price;

                    priceEl.attr('data-items-price', bucketPrice);
                    priceEl.text(bucketPrice);
                });
                allPrice(bucketPrice);
            }
            function allPrice(bucketPrice) {
                let fullPriceEl = $('.fullPrice'),
                    deliveryPrice = $('.deliveryPrice').attr('data-delivery'),
                    allPrice = 0;

                allPrice = +deliveryPrice + +bucketPrice;

                fullPriceEl.attr('data-full-price', allPrice);
                fullPriceEl.text(allPrice);
            }
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
                        $(this).siblings('.counterQuantity').change();

                    });
                });
                remove.each(function (e) {
                    $(this).on('click', function (e) {
                        e.preventDefault();
                        if (+$(this).siblings('.counterQuantity').val() == 1) {
                            let back = $(this);
                            openQuantity(back);
                        }
                        else {
                            $(this).siblings('.counterQuantity').val(+$(this).siblings('.counterQuantity').val() - 1);
                        }
                        $(this).siblings('.counterQuantity').change();
                    });
                });
            }
            function openQuantity(back) {
                if (!$('.addDisplaying').length) return false;

                let openQuantity = $('.addDisplaying');
                if (back) {
                    back.closest('.quantityVisibility').removeClass('quantityVisibility_visible');
                }
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: '.productSliderNav',
                    draggable: false,
                });
                sNav.slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: '.productSliderMain',
                    dots: false,
                    centerMode: true,
                    focusOnSelect: true,
                    arrows: false,

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
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 4,
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
