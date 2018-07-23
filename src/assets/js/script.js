(function ($) {
    "use strict";

    window.zhiva = $.extend({}, {
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        winScroll: $(window).scrollTop(),
        preloader: $('.preloader'),
        modalWindow: $('.modal'),

        init() {
            zhiva.initSlider();
            zhiva.initQuantityItems();
            zhiva.initOpenMenu();
            zhiva.initPageTopLine();
            zhiva.initSelects();
            zhiva.initBucketCalc();
            zhiva.initLinkInfoBlock();
            zhiva.initShowPass();
            zhiva.initCopyRef();
        },
        initCopyRef() {
            if (!$('.copyItem').length) return false;
            let item = $('.copyItem'),
                copy = $('.copyIcon'),
                parent = $('.referal-block__item');

            copy.each(function () {
                let $this = $(this);
                $this.on('click', function () {
                    console.log('copied');
                    copyToClipboard($this.closest(parent).find(item));
                });
            });

            function copyToClipboard(element) {
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val($(element).text()).select();
                document.execCommand("copy");
                $temp.remove();
            }
        },
        initShowPass() {
            if (!$('.showPass').length) return false;
            let show = $('.showPass'),
                inputHidden = true;

            show.on('click', function () {
                let input = $(this).closest('.main-form-input__wrap').find('input'),
                    text = $(this).siblings('.showPassText');
                if (inputHidden) {
                    input.prop("type", "text");
                    text.text(text.attr('data-hide'));
                    inputHidden = !inputHidden;
                } else {
                    input.prop("type", "password");
                    text.text(text.attr('data-show'));
                    inputHidden = !inputHidden;
                }
            });
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
            if ((!$('.customSelect').length) && (!$('.openCustomSelect').length)) return false;

            mainSelects();
            customSelects();
            function mainSelects() {
                let select = $('.customSelect');
                select.each(function () {
                    $(this).on('click', function () {
                        $(this).toggleClass('main-select_opened');
                    });
                });
            }

            function customSelects() {
                let select = $('.openCustomSelect'),
                    selectItem = $('.customSelectItem');

                select.each(function () {
                    $(this).on('click', function () {
                        removeClass(makeActive, $(this));
                    });
                });

                selectItem.each(function () {

                    $(this).on('click', function () {
                        let data = $(this).attr('data-val'),
                            parent = $(this).closest('.openCustomSelect'),
                            textSelected = parent.find('.customSelectSelected');

                        chooseItem($(this), reinitText);

                        if ($(this).attr('id') === 'newAdress') {
                            activeNewAddress(true);
                        } else {
                            activeNewAddress(false);
                        }

                        function chooseItem($this, callback) {
                            parent.attr('data-selected-val', data);
                            callback();
                        }
                        function reinitText() {
                            let parentData = parent.attr('data-selected-val');
                            textSelected.text(parentData);
                        }
                    });
                });

                function removeClass(callback, $this) {
                    select.each(function () {
                        $(this).removeClass('active');
                        $(this).find('.customSelectDropdown').removeClass('select-custom__dropdown_visible');
                    });
                    callback($this);
                }

                function makeActive($this) {
                    $this.toggleClass('active');
                    $this.find('.customSelectDropdown').toggleClass('select-custom__dropdown_visible');
                }

                function activeNewAddress(active) {
                    let makeActive = $('.newAdressForm');
                    makeActive.each(function () {
                        if (active) {
                            $(this).removeClass('inactive');
                        } else {
                            $(this).addClass('inactive');
                        }
                    });
                }
            }
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
        zhiva.init();
    });
})(jQuery);
