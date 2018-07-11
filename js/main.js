(function ($) {

    "use strict";
    $(document).ready(function () {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            autoHeight: true
        });
    });
})(jQuery);