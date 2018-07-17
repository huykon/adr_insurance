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
    var $choiceList = $("ul.ins__choose-list");
    var $choices = $(".ins-choice__value");
    var $selection = $(".selected-choice");
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
            speed = 1500;

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

            if( $(this).hasClass('less') ){
                $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + '] button.ins_benefit--viewmore').text('Xem thêm').removeClass('less');
                $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + ']').removeClass('has__view-more');
            }else{
                $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + '] button.ins_benefit--viewmore').text('Đóng lại').addClass('less');
                $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + ']').addClass('has__view-more');
            }

            $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + ']').css('height','auto');
            $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + '] li.ins-toggleable').slideToggle();
            Adr_Ins_EqualHeight('.ins__equal-item', 'data-pane_id');
        });
    }

    $.fn.Ins_equalHeights = function(o){
        /*var selector = this;
        var heights = [];

        selector.each(function(){
            var height = $(this).height();
            heights.push(height);
        });

        var maxHeight = Math.max.apply(null, heights);
        console.log(heights,maxHeight);

        selector.each(function(){
            $(this).height(maxHeight);
        });*/

        var s = $.extend({
            mobile: 767 // Mobile breakpoint
        },o);
        var w = Math.max(document.documentElement.clientWidth,window.innerWidth || 0); // Get the viewport width
        this.css('height','auto'); // Make sure an explicit height isn't declared
        if(w > s.mobile){ // If we're NOT on a mobile
            var h = 0; // Initialize height variable
            this.each(function(){ // For each matched element...
                h = Math.max(h,$(this).outerHeight()); // Set h equal to its height, if it's taller than h
            }).css('height',h); // Set all matched elements' height equal to h
        }
        return this;
    };

    function Adr_Ins_EqualHeight(item, data_pane) {
        $('.ins__package-content').each(function () {
            var dt_max_items = $(this).data('max__items');
            if (typeof dt_max_items !== 'undefined' && dt_max_items > 0) {
                for (var i = 0; i < dt_max_items; i++) {
                    $(item+'['+data_pane+'=' + i + ']').Ins_equalHeights();
                }
            }
        });
    }

    function Adr_Ins_Accordion(){
        $('.ins_item__accordion').on('shown.bs.collapse', function () {
            Adr_Ins_EqualHeight('.ins_item__accordion', 'data-ins_accordion');
            Adr_Ins_EqualHeight('.ins__equal-item', 'data-pane_id');
        });
        $('.ins_item__accordion').on('hidden.bs.collapse', function () {
            Adr_Ins_EqualHeight('.ins_item__accordion', 'data-ins_accordion');
            Adr_Ins_EqualHeight('.ins__equal-item', 'data-pane_id');
        });
    }

    function Adr_Ins_CheckedBenefit(){
        if ( $('input.ins-styled-checkbox').is(":checked")){
            $('input.ins-styled-checkbox:checked').closest('.ins__bene--child').addClass('active');
        }else{
            $('input.ins-styled-checkbox:checked').closest('.ins__bene--child').removeClass('active');
        }
    }

    function Adr_Ins_CheckedBenefit_Change(){
        $('.ins-styled-checkbox').on('change', function () {
            if ( $(this).prop("checked")){
                $(this).closest('.ins__bene--child').addClass('active');
                Adr_Ins_EqualHeight('.ins__bor_bottom .ins_bene_line', 'data-ins_bene');
                Adr_Ins_EqualHeight('.ins__equal-item', 'data-pane_id');
            }else{
                $(this).closest('.ins__bene--child').removeClass('active');
                Adr_Ins_EqualHeight('.ins__bor_bottom .ins_bene_line', 'data-ins_bene');
                Adr_Ins_EqualHeight('.ins__equal-item', 'data-pane_id');
            }
        });
    }

    function Adr_Ins_ChangeOld(){
        $('.ins__change-age').on('click', function () {
            var el = $(this),
            parent = el.closest('.notify_bar_content');
            parent.find('.ins__show_chosen').slideUp(300);
            parent.find('form.comf_view__result').removeClass('hide');
        })
    }

    function Adr_Ins_StickThis() {
        if ($('.ins__nav-tabs--content').length > 0 && $('.ins--page-heading').length > 0) {
            var $heding_height = $('.ins--page-heading').outerHeight();
            $('.ins--page-heading').css('top', -$heding_height + 'px');

            if ($(window).width() >= 768) {
                var $tab_st = $('.ins__nav-tabs--content');
                var $tab_st_pos = $tab_st.position();

                $(window).on("scroll", function () {
                    var fromTop = $(window).scrollTop();
                    $('.ins--page-heading').toggleClass("ins_is-sticky", (fromTop > $tab_st_pos.top));
                });
            }
        }
    }

    $(document).ready(function () {

        Adr_Ins_Swiper();

        Adr_Ins_openMenu();
        Adr_Ins_getSelection();
        Adr_Ins_setValue();

        Adr_Ins_Random_Benefit();
        Adr_Ins_ScrollSelect();
        Adr_Ins_Showmore();

        Adr_Ins_EqualHeight('.ins__equal-item', 'data-pane_id');
        Adr_Ins_EqualHeight('.ins__bor_bottom .ins_bene_line', 'data-ins_bene');
        Adr_Ins_Accordion();

        Adr_Ins_CheckedBenefit();
        Adr_Ins_CheckedBenefit_Change();

        Adr_Ins_ChangeOld();

        Adr_Ins_StickThis();

    });

    $(window).on('resize', function(){
        Adr_Ins_StickThis();

    });

})(jQuery);