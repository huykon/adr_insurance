(function ($) {
    "use strict";

    // ADR Insurance Swiper
    function Adr_Ins_Swiper() {
        if (typeof $.fn.Swiper === 'function') {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30,
                autoHeight: true
            });
        }
    }

    var $selectHolder = $(".insw_selectbox--holder");
    var $select = $(".insw__select-box");
    var $current_select = $(".ins__current-choice");
    var $choiceList = $("ul.ins__choose-list");
    var $choices = $(".ins-choice__value");
    var $selection = $(".selected-choice");
    var $chev = $(".arrow-indicator");
    var $hiddenTextField = $(".hidden");

    // open menu
    function Adr_Ins_openMenu() {
        $($select).each(function () {
            $(this).on("click", function (e) {
                var menuDropdown = $(this).closest($selectHolder).find($choiceList);
                var nstyle = menuDropdown.css('display');
                //menuDropdown.addClass('menu-open');
                if (nstyle == "none") {
                    menuDropdown.slideDown(100, function () {
                        $("html").bind("click", function (e) {
                            if (!$(this).is(e.target) && !menuDropdown.is(e.target) && menuDropdown.has(e.target).length == 0) {
                                menuDropdown.slideUp(100);
                                // menuDropdown.removeClass('menu-open');
                                $("html").unbind("click");
                            }
                        });
                    })
                }
                //$(this).closest($selectHolder).find($choiceList).toggleClass('menu-open');
            });

        });

    }

    function Adr_Ins_getSelection() {
        $($choices).each(function () {
            $(this).on("click", function () {
                var selectedChoice = $(this).data("choice");
                $(this).closest('ul').find('li').removeClass('ins_choiced');
                $(this).addClass('ins_choiced');
                $(this).closest($selectHolder).find($selection).text(selectedChoice);
                /*$(this).closest($selectHolder).find($choiceList).removeClass('menu-open');*/
            });
        });
    }

    function Adr_Ins_setValue() {
        $($choices).each(function () {
            $(this).on("click", function () {
                var value = $(this).data('choice');
                $(this).closest($selectHolder).find($select).attr('value', value);
                $(this).closest($selectHolder).find($hiddenTextField).attr('value', value);
            });
        });
    }

    function Adr_Ins_Random_Benefit() {
        var divs = $('.choose__options-fit').find('.fit_item_ins'),
            len = divs.length,
            randomDiv,
            speed = 500;

        var interval = setInterval(
            function () {
                randomDiv = Math.floor(Math.random() * len);
                divs.removeClass('ins__fit--active');
                divs.eq(randomDiv).addClass('ins__fit--active');
            }, speed);

    }

    function Adr_Ins_ScrollSelect() {
        if (typeof $.fn.niceScroll === 'function') {
            $('.ins__choose-list').niceScroll({
                cursorcolor: "#D6D8E0",
                cursorwidth: "8px",
                cursorborder: "1px solid #d6d8e0",
                cursorborderradius: 0,
                cursorfixedheight: 128,
                cursoropacitymax: 1,
                boxzoom: false,
                autohidemode: true,
                touchbehavior: true
            });
        }
    }

    function Adr_Ins_Showmore() {

        $('ul.ins_content_benefits').each(function () {

            var data_visible = $(this).data('item_visible');
            if (typeof data_visible !== 'undefined') {
                var count_li = $(this).find('li').length;
                if (count_li > data_visible) {
                    $('li', this).eq(data_visible - 1).nextAll().hide().addClass('ins-toggleable');
                }
            }

        });


        $('.ins_each--item').on('click', '.ins_benefit--viewmore', function () {
            var pane_id = $(this).closest('.ins_each--item').data('pane_id');
            $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + ']').css('height','auto');
            $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + '] li.ins-toggleable').slideDown();
            $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + '] button.ins_benefit--viewmore').slideUp();
            $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + ']').removeClass('has__view-more');
            Adr_Ins_EqualHeight();
        });
    }

    $.fn.equalHeights = function(){
        var max_height = 0;
        $(this).each(function(){
            max_height = Math.max($(this).height(), max_height);
        });
        $(this).each(function(){
            $(this).height(max_height);
        });
    };

    function Adr_Ins_EqualHeight() {
        $('.ins__package-content').each(function () {
            var dt_max_items = $(this).data('max__items');
            if (typeof dt_max_items !== 'undefined' && dt_max_items > 0) {
                for (var i = 0; i < dt_max_items; i++) {
                    $('.ins__equal-item[data-pane_id=' + i + ']').equalHeights();
                }
            }
        });
    }

    $.fn.equalHeights1 = function(){
        var max_height = 0;
        $(this).each(function(){
            max_height = Math.max($(this).height(), max_height);
        });
        $(this).each(function(){
            $(this).height(max_height);
        });
    };

    function Adr_Ins_EqualHeight1() {
        $('.ins__package-content').each(function () {
            var dt_max_items = $(this).data('max__items');
            if (typeof dt_max_items !== 'undefined' && dt_max_items > 0) {
                for (var i = 0; i < dt_max_items; i++) {
                    $('.ins__equal-item[data-pane_id=' + i + ']').equalHeights1();
                }
            }
            console.log($('#ins__accordion-detail_11').height());
        });
    }

    function Ard_Ins_Accordion(){
        $('.ins_item__accordion').on('show.bs.collapse', function () {
            Adr_Ins_EqualHeight1();
        });
        $('.ins_item__accordion').on('hide.bs.collapse', function () {
            Adr_Ins_EqualHeight1();
        });
    }

    $(document).ready(function () {
        Adr_Ins_Swiper();

        Adr_Ins_openMenu();
        Adr_Ins_getSelection();
        Adr_Ins_setValue();

        Adr_Ins_Random_Benefit();
        Adr_Ins_ScrollSelect();
        Adr_Ins_Showmore();

        Adr_Ins_EqualHeight();
        //Ard_Ins_Accordion();
    });
})(jQuery);