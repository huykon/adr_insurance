(function ($) {
    "use strict";

    // ADR Insurance Swiper
    function Adr_Ins_Swiper() {
       	if (typeof $.fn.swiper === 'function') { console.log('123123');
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

    function Adr_Ins_openMenu() {
        $($select).each(function () {
            $(this).on("click", function (e) {
                var menuDropdown = $(this).closest($selectHolder).find($choiceList);
                var nstyle = menuDropdown.css('display');
                if (nstyle == "none") {
                    menuDropdown.slideDown(100, function () {
                        $("html").bind("click", function (e) {
                            if (!$(this).is(e.target) && !menuDropdown.is(e.target) && menuDropdown.has(e.target).length == 0) {
                                menuDropdown.slideUp(100);
                                $("html").unbind("click");
                            }
                        });
                    })
                }
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

            $('.ins_show_case_area').niceScroll({
                cursorcolor: "#D6D8E0",
                cursorwidth: "8px",
                cursorborder: "1px solid #d6d8e0",
                cursorborderradius: 0,
                cursorfixedheight: 95,
                cursoropacitymax: 1,
                boxzoom: false,
                autohidemode: true,
                touchbehavior: true
            });

			$('.ins__modal-agree-rules').on('shown.bs.modal', function (e) {
				$('.ins__modal-agree-rules .modal-body').niceScroll({
					cursorcolor: "#D6D8E0",
					cursorwidth: "8px",
					cursorborder: "1px solid #d6d8e0",
					cursorborderradius: 0,
					cursorfixedheight: 95,
					cursoropacitymax: 1,
					boxzoom: false,
					autohidemode: true,
					touchbehavior: true
				});
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
            $(this).closest('.tab-pane').find('.ins_each--item[data-pane_id=' + pane_id + '] li.ins-toggleable').stop().slideToggle(300, function () {
                Adr_Ins_EqualHeight('.ins__has--view-more', ' data-bene_expand');
                Adr_Ins_EqualHeight('.ins__equal-item', 'data-pane_id');
            });

        });
    }

    $.fn.Ins_equalHeights = function(o){
        var s = $.extend({
            mobile: 767 // Mobile breakpoint
        },o);
        var w = Math.max(document.documentElement.clientWidth,window.innerWidth || 0);
        this.css('height','auto');
        if(w > s.mobile){
            var h = 0;
            this.each(function(){
                h = Math.max(h,$(this).outerHeight());
            }).css('height',h);
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
            Adr_Ins_EqualHeight('.ins__eq_accordion', 'data-ins_accordion');
            Adr_Ins_EqualHeight('.ins__equal-item', 'data-pane_id');
        });
        $('.ins_item__accordion').on('hidden.bs.collapse', function () {
            Adr_Ins_EqualHeight('.ins__eq_accordion', 'data-ins_accordion');
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
            parent.find('.ins__show_chosen').animate({left:'999999px'},350);
            parent.find('form.comf_view__result').animate({left:'0'},400);
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

    function Adr_Ins_DatePicker(){
        if (typeof $.fn.datepicker == 'function'){

            $.fn.datepicker.dates['vi'] = {
                days: ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
                daysShort: ["CN","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"],
                daysMin: ["CN","T2","T3","T4","T5","T6","T7"],
                months: ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],
                monthsShort: ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"],
                today: "Hôm nay",
                clear: "Xoá",
                format: "dd/mm/yyyy",
                titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
                weekStart: 0
            };

            $('.ins__input--date-picker.input-group.date').datepicker({
                todayHighlight: true,
                language: 'vi',
                templates: {
                    leftArrow: '<i class="adr-icon icon-arrow-left-sm"></i>',
                    rightArrow: '<i class="adr-icon icon-arrow-right-sm"></i>'
                }
            });

            $('.ins__input--date-picker.input-group.date.ins__for_plc_startdate').datepicker().on('changeDate', function (ev) {
                $(this).find('input[name="ins_policy_start_date"]').on('change', function () {
                    var date_val = $(this).val();
                    if (date_val){
                        $(this).closest('.rev__right-col').find('.rev_field_base_date').removeClass('hidden');
                    }else{
                        $(this).closest('.rev__right-col').find('.rev_field_base_date').addClass('hidden');
                    }
                });
            });

        }
    }

    function Adr_Ins_CloseUpload(){
        $('.ins__rev_close').on('click', function (e) {
            var $el = $(this),
                parent = $el.closest('.ins__field-uploads');
            parent.find('.ins__form-file--label').removeClass('hidden');
            parent.find('.ins__response-area').addClass('hidden');
        })
    }

    function Adr_Ins_CloneRowTB(){
        $(".ins__btn--add-case").on('click', function () {

            var $el = $(this),
                $table = $el.closest('.ins__tb-showcase'),
                count_tr = $table.find('.insred-table-body .insred-table-body').length;
            var $clone = $table.find('.insred-table-body div.insred-body-row:last').clone(true);

            $clone.each(function () {
                var id_current = $(this).attr('data-row_id'),
                    id_replaced = id_current.replace(/\d+/, function(match) {
                    return (parseInt(match)+1);
                });
                $(this).attr('data-row_id', id_replaced);
                $(this).find('.remove_row').attr('data-id', id_replaced);
                $(this).find('textarea').val('');

            });

            /*$clone.find("input,select").each(function(){
                $(this).attr({
                    id: $(this).attr("id") + count,
                    name: $(this).attr("name") + count
                });
            });*/

            $table.find('.insred-table-body').append($clone);
        });

        $(".remove_row").on('click', function () { console.log('23123');
            var $el = $(this),
                $el_id = $el.data('id');
            $el.closest('.insred-table-body').find('.insred-body-row[data-row_id='+$el_id+']').remove();
        });
    }

    function Adr_Ins_ConditionShow(input_name, parent, find, compare) {
        if ($('input[name="'+input_name+'"]').length) {
            var value = $('input[name="'+input_name+'"]:checked').val();
            if (value == compare) {
                $('input[name="'+input_name+'"]').closest(parent).find(find).removeClass('hidden');
            } else {
                $('input[name="'+input_name+'"]').closest(parent).find(find).addClass('hidden');
            }
        }

        $('input[name="'+input_name+'"]').on('change', function () {
            var value = $(this).val();
            if (value == compare) {
                $(this).closest(parent).find(find).removeClass('hidden');
            } else {
                $(this).closest(parent).find(find).addClass('hidden');
            }
        });
    }

    function Adr_Ins_FillValuetoSelect(object, val_display = "Chọn", val_attr = '', set_class = true, set_choiced = true) {
        object.val(val_attr);
        if (set_class){
            object.closest('.insw_selectbox--holder').addClass('disabled');
        } else{
            object.closest('.insw_selectbox--holder').removeClass('disabled');
        }

        if (set_choiced){
            object.closest('.insw_selectbox--holder').find('.ins-choice__value[data-choice="'+val_attr+'"]').addClass('ins_choiced');
        } else{
            object.closest('.insw_selectbox--holder').find('.ins-choice__value[data-choice="'+val_attr+'"]').removeClass('ins_choiced');
        }

        object.closest('.insw_selectbox--holder').find('.insw__select-box').attr('value', val_attr);
        object.closest('.insw_selectbox--holder').find('.selected-choice').html(val_display);
    }

    function Adr_Ins_ShowSamePolicy(){

        var fullName = $('input[name="policy_holder_fullname"]').val() ,
            dateOfBirth =  $('input[name="policy_holder_dateofbirth"]').val(),
            idPassPort =  $('input[name="policy_holder_idpassport"]').val();
        var fullNameSame = $('input[name="policy_holder_fullname_same"]'),
            dateOfBirthSame = $('input[name="policy_holder_dateofbirth_same"]'),
            idPassPortSame = $('input[name="policy_holder_idpassport_same"]');

        if ($('#same_as_policy_holder').prop('checked')) {
            fullNameSame.val(fullName);
            dateOfBirthSame.val(dateOfBirth);
            idPassPortSame.val(idPassPort);
            $('#same_as_policy_holder:checked').closest('.ins__holder_same').find('.ins_group-fields input').attr("disabled", true);
        } else {
            fullNameSame.val('');
            dateOfBirthSame.val('');
            idPassPortSame.val('');
            $('#same_as_policy_holder:checked').closest('.ins__holder_same').find('.ins_group-fields input').attr("disabled", false);
        }

        $('#same_as_policy_holder').on('change', function () {
            var fullName = $('input[name="policy_holder_fullname"]').val(),
                dateOfBirth = $('input[name="policy_holder_dateofbirth"]').val(),
                idPassPort = $('input[name="policy_holder_idpassport"]').val();
            var fullNameSame = $('input[name="policy_holder_fullname_same"]'),
                dateOfBirthSame = $('input[name="policy_holder_dateofbirth_same"]'),
                idPassPortSame = $('input[name="policy_holder_idpassport_same"]'),
                relationship = $('input[name="ins_select_relationship"]');

            if ($(this).prop('checked')) {
                fullNameSame.val(fullName);
                dateOfBirthSame.val(dateOfBirth);
                idPassPortSame.val(idPassPort);
                Adr_Ins_FillValuetoSelect(relationship, 'Bản thân', 'Bản thân', true);

                $(this).closest('.ins__holder_same').find('.ins_group-fields input').attr("disabled", true);
            } else {
                fullNameSame.val('');
                dateOfBirthSame.val('');
                idPassPortSame.val('');
                Adr_Ins_FillValuetoSelect(relationship, 'Chọn', '', false);

                $(this).closest('.ins__holder_same').find('.ins_group-fields input').attr("disabled", false);
            }
        });

        $('#beneficiary_same_as_policy_holder').on('change', function () {
            var fullName = $('input[name="policy_holder_fullname"]').val(),
                idPassPort = $('input[name="policy_holder_idpassport"]').val(),
                permanentAddress = $('input[name="policy_holder_permanent_address"]').val(),
                cellPhone = $('input[name="policy_holder_cell_phone"]').val();

            var fullNameSame = $('input[name="beneficiary_policy_holder_fullname_same"]'),
                idPassPortSame = $('input[name="beneficiary_policy_holder_idpassport_same"]'),
                select_relationship = $('input[name="beneficiary_policy_holder_relationship_same"]'),
                beneficiaryAddress = $('input[name="beneficiary_policy_holder_address_same"]');

            var permanent_address_city = $('input[name="policy_holder_permanent_address_city"]').val(),
                permanent_address_township = $('input[name="policy_holder_permanent_address_township"]').val(),
                permanent_address_ward = $('input[name="policy_holder_permanent_address_ward"]').val();

            var permanent_address_citySame = $('input[name="beneficiary_policy_holder_address_city_same"]'),
                permanent_address_townshipSame = $('input[name="beneficiary_policy_holder_address_township_same"]'),
                permanent_address_wardSame = $('input[name="beneficiary_policy_holder_address_ward_same"]'),

                beneficiaryCellPhoneSame = $('input[name="beneficiary_policy_holder_cell_phone_same"]');

            if ($(this).prop('checked')) {
                fullNameSame.val(fullName);
                idPassPortSame.val(idPassPort);
                beneficiaryAddress.val(permanentAddress);
                beneficiaryCellPhoneSame.val(cellPhone);

                if (permanent_address_city){
                    Adr_Ins_FillValuetoSelect(permanent_address_citySame, permanent_address_city, permanent_address_city, false);
                } else{
                    Adr_Ins_FillValuetoSelect(permanent_address_citySame, 'Thành phố', permanent_address_city, false);
                }

                if (permanent_address_township){
                    Adr_Ins_FillValuetoSelect(permanent_address_townshipSame, permanent_address_township, permanent_address_township, false);
                } else{
                    Adr_Ins_FillValuetoSelect(permanent_address_townshipSame, 'Quận', permanent_address_township, false);
                }

                if (permanent_address_ward){
                    Adr_Ins_FillValuetoSelect(permanent_address_wardSame, permanent_address_ward, permanent_address_ward, false);
                } else{
                    Adr_Ins_FillValuetoSelect(permanent_address_wardSame, 'Phường', permanent_address_ward, false);
                }

                Adr_Ins_FillValuetoSelect(select_relationship, 'Bản thân', 'Bản thân', true);

                $(this).closest('.ins__holder_same').find('.ins_group-fields input:not(.ins_not_disable_same)').attr("disabled", true);
            } else {
                fullNameSame.val('');
                idPassPortSame.val('');
                beneficiaryAddress.val('');
                beneficiaryCellPhoneSame.val('');

                Adr_Ins_FillValuetoSelect(permanent_address_citySame, 'Thành phố', '', false);
                Adr_Ins_FillValuetoSelect(permanent_address_townshipSame, 'Quận', '', false);
                Adr_Ins_FillValuetoSelect(permanent_address_wardSame, 'Phường', '', false);
                Adr_Ins_FillValuetoSelect(select_relationship, 'Chọn', '', false);

                $(this).closest('.ins__holder_same').find('.ins_group-fields input').attr("disabled", false);
            }
        });
    }

    function Adr_Ins_CheckRules(){
        if ( $('input[name="optionsAgreeRule"]').is(":checked")){
            $('input[name="optionsAgreeRule"]:checked').closest('.review-again').find('.btn_ins-continues').attr('disabled', false);
        }else{
            $('input[name="optionsAgreeRule"]:checked').closest('.review-again').find('.btn_ins-continues').attr('disabled', true);
        }

        $('input[name="optionsAgreeRule"]').on('change', function () {
            if ( $(this).prop("checked")){
				$('#ins_modal_confirm_rules').modal({show: true});
                $(this).closest('.review-again').find('.btn_ins-continues').attr('disabled', false);
            }else{
                $(this).closest('.review-again').find('.btn_ins-continues').attr('disabled', true);
            }
        });
    }

    function Adr_Ins_ControlTabs(){

        $('.btn-prev-nac').on('click', function () {
            if ($('.ins__nav-tab-dropdown .nav-tabs > .active').prev('li').find('a').length){
                $('.ins__nav-tab-dropdown .nav-tabs > .active').prev('li').find('a').trigger('click');
            } else{
                $('.ins__nav-tab-dropdown .nav-tabs > .active').prev('li').prev('li').find('a').trigger('click');
            }

        });

        $('.btn-next-nac').on('click', function(){
            if ($('.ins__nav-tab-dropdown .nav-tabs > .active').next('li').find('a').length){
                $('.ins__nav-tab-dropdown .nav-tabs > .active').next('li').find('a').trigger('click');
            } else{
                $('.ins__nav-tab-dropdown .nav-tabs > .active').next('li').next('li').find('a').trigger('click');
            }
        });
    }

    $(document).ready(function () {

        Adr_Ins_Swiper();
        Adr_Ins_DatePicker();

        Adr_Ins_openMenu();
        Adr_Ins_getSelection();
        Adr_Ins_setValue();

        Adr_Ins_Random_Benefit();
        Adr_Ins_ScrollSelect();
        Adr_Ins_Showmore();

        Adr_Ins_EqualHeight('.ins__bor_bottom .ins_bene_line', 'data-ins_bene');
        Adr_Ins_EqualHeight('.ins__eq_accordion', 'data-ins_accordion');
        Adr_Ins_EqualHeight('.ins__has--view-more', ' data-bene_expand');
        Adr_Ins_EqualHeight('.ins__equal-item', 'data-pane_id');

        Adr_Ins_Accordion();

        Adr_Ins_CheckedBenefit();
        Adr_Ins_CheckedBenefit_Change();

        Adr_Ins_ChangeOld();

        Adr_Ins_StickThis();
        Adr_Ins_CloseUpload();

        Adr_Ins_CloneRowTB();

        Adr_Ins_ConditionShow('reject_insurance','.rev_flex-box--right','textarea','1');
        Adr_Ins_ConditionShow('check_insured_1','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_3','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_4','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_5','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_6','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_7','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_8','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_9','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_10','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_11','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_12','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_13','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_14','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_15','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_16','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_17','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_18','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_19','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_20','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_21','.row-full-field','.ins__tb-showcase','1');
        Adr_Ins_ConditionShow('check_insured_22','.row-full-field','.ins__tb-showcase','1');

        Adr_Ins_ShowSamePolicy();
        Adr_Ins_CheckRules();
        Adr_Ins_ControlTabs();
    });

    $(window).on('resize', function(){
        Adr_Ins_StickThis();
    });

})(jQuery);


// File Upload
function Adr_Ins_Upload(){
    function Adr_Ins_UF_Init() {

        var fileSelect    = document.getElementById('ins__upload-certificate'),
            fileDrag      = document.getElementById('ins__upload-file-drag');

        if (fileSelect != null){
            fileSelect.addEventListener('change', Adr_Ins_UF_fileSelectHandler, false);
        }
        // Is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload && fileDrag != null) {
            // File Drop
            fileDrag.addEventListener('dragover', Adr_Ins_UF_fileDragHover, false);
            fileDrag.addEventListener('dragleave', Adr_Ins_UF_fileDragHover, false);
            fileDrag.addEventListener('drop', Adr_Ins_UF_fileSelectHandler, false);
        }
    }

    function Adr_Ins_UF_fileDragHover(e) {
        var fileDrag = document.getElementById('ins__upload-area-start');

        e.stopPropagation();
        e.preventDefault();

        if (e.type === 'dragover'){
            fileDrag.setAttribute('data-hover','1');
        }else{
            fileDrag.removeAttribute('data-hover');
        }
    }

    function Adr_Ins_UF_fileSelectHandler(e) {
        // Fetch FileList object
        var files = e.target.files || e.dataTransfer.files;

        // Cancel event and hover styling
        Adr_Ins_UF_fileDragHover(e);

        // Process all File objects
        for (var i = 0, f; f = files[i]; i++) {
            Adr_Ins_UF_parseFile(f);
            Adr_Ins_UF_uploadFile(f);
        }
    }

    // Output
    function Adr_Ins_UF_output(msg) {
        // Response
        var m = document.getElementById('ins__upload-messages');
        m.innerHTML = msg;
    }

    function Adr_Ins_UF_parseFile(file) {

        Adr_Ins_UF_output(
            '<span>' + encodeURI(file.name) + '</span>'
        );

        var imageName = file.name,
            isGood = (/\.(?=gif|jpg|png|jpeg|bmp|tiff)/gi).test(imageName);
        if (isGood) {
            document.getElementById('ins__upload-file-drag').classList.add("hidden");
            document.getElementById('ins__upload-response').classList.remove("hidden");
            document.getElementById('ins__upload-notimage').classList.add("hidden");
            // Thumbnail Preview
            document.getElementById('ins__upload-file-image').classList.remove("hidden");
            document.getElementById('ins__upload-file-image').src = URL.createObjectURL(file);
        }
        else {
            document.getElementById('ins__upload-file-image').classList.add("hidden");
            document.getElementById('ins__upload-notimage').classList.remove("hidden");
            document.getElementById('ins__upload-file-drag').classList.remove("hidden");
            document.getElementById('ins__upload-response').classList.add("hidden");
        }
    }

    function Adr_Ins_UF_uploadFile(file) {
        var xhr = new XMLHttpRequest(),
            fileInput = document.getElementById('class-roster-file'),
            fileSizeLimit = 5; // In MB
        if (xhr.upload) {
            if (file.size <= fileSizeLimit * 1024 *1024) {

                // File received / failed
                xhr.onreadystatechange = function(e) {
                    if (xhr.readyState == 4) {
                        // Everything is good!

                        // progress.className = (xhr.status == 200 ? "success" : "failure");
                        // document.location.reload(true);
                    }
                };

                // Start upload
                xhr.open('POST', document.getElementsByClassName('adr-insurance-form').action, true);
                xhr.setRequestHeader('X-File-Name', file.name);
                xhr.setRequestHeader('X-File-Size', file.size);
                xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                xhr.send(file);
            } else {
                Adr_Ins_UF_output('Vui lòng upload file nhỏ hơn (< ' + fileSizeLimit + ' MB).');
            }
        }
    }

    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
        Adr_Ins_UF_Init();
    } else {
        document.getElementById('ins__upload-file-drag').style.display = 'none';
    }
}

Adr_Ins_Upload();