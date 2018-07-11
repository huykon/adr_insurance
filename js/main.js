(function ($) {
    "use strict";

    // ADR Insurance Swiper
    function Adr_Ins_Swiper(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            autoHeight: true
        });
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
    function Adr_Ins_openMenu(){
        /*$(window).on('click', function (e) {
           if ($(e.target).is($select, $selectHolder, $current_select)){
               console.log($(this));
               $(this).closest($selectHolder).find($choiceList).toggleClass('menu-open');
           } else{
               console.log('12323');
               $(this).closest($selectHolder).find($choiceList).removeClass('menu-open');
           }
        });*/
        $($select).each(function(){
            $(this).on("click", function(e){
                var menuDropdown = $(this).closest($selectHolder).find($choiceList);
                var nstyle = menuDropdown.css('display');
                //menuDropdown.addClass('menu-open');
                if (nstyle == "none"){
                    menuDropdown.slideDown(100, function () {
                        $("html").bind("click", function(e) {
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

    function Adr_Ins_getSelection(){
        $($choices).each(function(){
            $(this).on("click", function(){
                var selectedChoice = $(this).data("choice");
                $(this).closest('ul').find('li').removeClass('ins_choiced');
                $(this).addClass('ins_choiced');
                $(this).closest($selectHolder).find($selection).text(selectedChoice);
                $(this).closest($selectHolder).find($choiceList).removeClass('menu-open');
            });
        });
    }

    function Adr_Ins_setValue(){
        $($choices).each(function(){
            $(this).on("click", function(){
                var value = $(this).data('choice');
                $(this).closest($selectHolder).find($select).attr('value', value);
                $(this).closest($selectHolder).find($hiddenTextField).attr('value', value);
            });
        });
    }


    $(document).ready(function () {
        Adr_Ins_Swiper();

        Adr_Ins_openMenu();
        Adr_Ins_getSelection();
        Adr_Ins_setValue();
    });
})(jQuery);