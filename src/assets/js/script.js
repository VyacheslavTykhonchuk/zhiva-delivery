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
            zhiva.initCheckoutUserChange();
            zhiva.activeNewAddress();
            zhiva.activeCheckoutBonuses();
            zhiva.initBonusesVisibility();
            zhiva.initUserDropDown();
            zhiva.initHeaderBucket();
            zhiva.initMobileMenu();
        },
        initMobileMenu() {
            let mobileMenu = $('#mobileMainMenu'),
                closeMobile = $('.closeMobileMenu'),
                openMenu = $('.openMobileMenu'),
                openMenuItem = mobileMenu.find('.main-menu-mobile__item');

            closeMobile.on('click', function () {
                mobileMenu.removeClass('opened');
            });

            openMenu.on('click', function () {
                mobileMenu.addClass('opened');
            });

            openMenuItem.each(function () {
                $(this).on('click', function () {
                    $(this).toggleClass('opened');
                });
            });
        },
        initHeaderBucket() {
            let quantity = $('#headerBucketQuantity'),
                price = $('#headerBucketPrice'),
                addQ = $('.addQuantity'),
                removeQ = $('.removeQuantity'),
                addItem = $('.addDisplaying');

            addItem.on('click', function () {
                let itemPrice = $(this).closest('.quantityVisibility').find('.productPrice').attr('data-product-price');
                increaseBucketSize(itemPrice, refreshBucket);
            });

            addQ.on('click', function () {
                let itemPrice = $(this).closest('.quantityVisibility').find('.productPrice').attr('data-product-price');
                increaseBucketSize(itemPrice, refreshBucket);
            });

            removeQ.on('click', function () {
                let itemPrice = $(this).closest('.quantityVisibility').find('.productPrice').attr('data-product-price');
                decreaseBucketSize(itemPrice, refreshBucket);
            });

            function increaseBucketSize(num, callback) {
                let currPrice = price.attr('data-price'),
                    currQuantity = quantity.attr('data-quantity'),
                    newPrice = 0,
                    newQuantity = 0;

                newPrice = +currPrice + (+num);
                newQuantity = +currQuantity + 1;

                price.attr('data-price', parseFloat(newPrice).toFixed(2));
                quantity.attr('data-quantity', newQuantity);

                callback();
            }
            function decreaseBucketSize(num, callback) {

                let currPrice = price.attr('data-price'),
                    currQuantity = quantity.attr('data-quantity'),
                    newPrice = 0,
                    newQuantity = 0;

                newPrice = +currPrice - (+num);
                newQuantity = +currQuantity - 1;

                price.attr('data-price', parseFloat(newPrice).toFixed(2));
                quantity.attr('data-quantity', newQuantity);

                callback();
            }
            function refreshBucket() {
                let currPrice = price.attr('data-price'),
                    currQuantity = quantity.attr('data-quantity');
                price.text(currPrice);
                quantity.text(currQuantity);

                if (currQuantity < 1) {
                    $('#mainHeader').removeClass('bucketIsFull');
                } else if (!$('.bucket-page').length) {
                    $('#mainHeader').addClass('bucketIsFull');
                }
            }
        },

        initUserDropDown() {
            const openDropdown = $('.openUserDropdown'),
                dropdown = $('.userDropdown');

            openDropdown.on('click', function (e) {
                e.preventDefault();
                dropdown.toggleClass('active');
            });
        },
        initBonusesVisibility(status) {
            let block = $('.bonusBlock');
            if (status) {
                block.hide();
            } else {
                block.show();
            }
        },

        activeCheckoutBonuses() {
            let input = $('.bonusInput'),
                submit = $('.bonusSubmit'),
                bonusSumm = $('.bonusSumm'),
                checkoutSumm = $('.checkoutSumm');

            submit.on('click', function (e) {
                e.preventDefault();
                let bonuses = input.val(),
                    checkoutData = checkoutSumm.attr('data-checkout-summ'),
                    bonusData = bonusSumm.attr('data-bonus-summ'),
                    newBonuses,
                    newCheckout;

                if (bonuses <= 0 || bonuses > +bonusData || bonuses > +checkoutData) {
                    alert('Ви не можете зписати 0 бонусів, також сума списання не може перевищувати число доступних бонусів або суми замовлення.');
                    return false;
                }

                newBonuses = +bonusData - +bonuses;
                newCheckout = +checkoutData - +bonuses;

                bonusSumm.attr('data-bonus-summ', newBonuses);
                refreshData(bonusSumm);
                checkoutSumm.attr('data-checkout-summ', newCheckout);
                refreshData(checkoutSumm);

            });
            function refreshData(el) {
                let dataObj = el.attr('data-checkout-summ') ? el.attr('data-checkout-summ') : el.attr('data-bonus-summ');

                el.text(dataObj);
            }
        },
        initCheckoutUserChange() {
            let partherCheckout = $('#partherCheckout'),
                newCustomerCheckout = $('#newCustomerCheckout'),
                newUserCheckoutForm = $('#newUserCheckout'),
                partnerCheckoutForm = $('#partnerCheckout');

            partherCheckout.on('click', function () {
                changeCheckoutUser('partner');
                $(this).addClass('contact-info__item_active');
                $(this).siblings().removeClass('contact-info__item_active');
                zhiva.initBonusesVisibility(false);
            });

            newCustomerCheckout.on('click', function () {
                changeCheckoutUser('newUser');
                $(this).addClass('contact-info__item_active');
                $(this).siblings().removeClass('contact-info__item_active');
                zhiva.initBonusesVisibility(true);

            });

            function changeCheckoutUser(userType) {
                if (userType === 'partner') {
                    newUserCheckoutForm.addClass('falseDisplay');
                    partnerCheckoutForm.removeClass('falseDisplay');
                    zhiva.activeNewAddress(false);
                } else if (userType === 'newUser') {
                    newUserCheckoutForm.removeClass('falseDisplay');
                    partnerCheckoutForm.addClass('falseDisplay');
                    zhiva.activeNewAddress(true);
                }
            }
        },
        initCopyRef() {
            if (!$('.copyItem').length) return false;
            let item = $('.copyItem'),
                copy = $('.copyIcon'),
                parent = $('.referal-block__item');

            copy.each(function () {
                let $this = $(this);
                $this.on('click', function () {
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
                            zhiva.activeNewAddress(true);
                        } else {
                            zhiva.activeNewAddress(false);
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
                        if ($(this).hasClass('active') && $this.hasClass('active')) return true;
                        $(this).removeClass('active');
                        $(this).find('.customSelectDropdown').removeClass('select-custom__dropdown_visible');
                    });
                    callback($this);
                }

                function makeActive($this) {
                    $this.toggleClass('active');
                    $this.find('.customSelectDropdown').toggleClass('select-custom__dropdown_visible');
                }


            }
        },
        activeNewAddress(active) {
            let makeActive = $('.newAdressForm');
            makeActive.each(function () {
                if (active) {
                    $(this).removeClass('inactive');
                } else {
                    $(this).addClass('inactive');
                }
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
                if (zhiva.winWidth < 430) {
                    $('body').addClass('mobileNoLine');
                    $('#mainHeader').addClass('mobileNoLine');
                }
            });
        },
        initOpenMenu() {
            if (!$('#openMenu').length) return false;

            let openMenu = $('#openMenu'),
                menu = $('#mainMenu');
            openMenu.on('click', function (e) {
                e.preventDefault();
                menu.toggleClass('visible');
                e.stopPropagation();

            });
            openMenu.on('mouseover', function () {
                setTimeout(() => {
                    menu.addClass('visible');
                }, 300);
            });
            $(document).on('click', function (e) {
                let thisEl = document.getElementById('mainMenu'),
                    target = e.target;
                if (target != thisEl) {
                    menu.removeClass('visible');
                }
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
            // calls
            plateSlider();
            reviewSlider();
            productSliders();
            if (zhiva.winWidth > 500) {
                homeSlide();
            } else {
                mobileHomeSlider();
            }
            // calls end

            function mobileHomeSlider() {
                let mobileSlider = $('.main-home-block.wrap');
                mobileSlider.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    draggable: true,
                    variableWidth: true,
                    autoplay: true,
                });
            }
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
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1.1,
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
