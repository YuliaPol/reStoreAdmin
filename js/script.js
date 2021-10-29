jQuery(function ($) {
    $(document).ready(function () {
        $('.toggle-sidebar').click( function(){
            $('.sidebar').toggleClass('hide');
            $('.header').toggleClass('full-width');
            $('.content').toggleClass('full-width');
        });

        $('.treeview a').click(function(e){
            if($(this).parents('.hidden-menu').length === 0){
                e.preventDefault();
                $(this).parents('.treeview').toggleClass('open');
            }
        });

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });
    
        $('.scrollup').on('click', function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        $('.page-content').on('click', '.open-next-row', function(e){
            let nextEl = $(this).parents('tbody').nextAll();
            let closed = $(this).hasClass('open');
            if(closed){
                $(this).removeClass('open');
            } else {
                $(this).addClass('open');
            }
            for (let i = 0; i < nextEl.length; i++) {
                if($(nextEl[i]).hasClass('shown-row')) {
                    return true;
                }
                if(closed){
                    if($(nextEl[i]).hasClass('hidden-row-1')){
                        $(nextEl[i]).fadeOut();
                        if($(nextEl[i]).find('.open-next-row-2.open').length > 0){
                            console.log($(nextEl[i]).find('.open-next-row-2'));
                            $(nextEl[i]).find('.open-next-row-2.open').click();
                        }
                    }
                } else {
                    if($(nextEl[i]).hasClass('hidden-row-1')){
                        $(nextEl[i]).fadeIn();
                    }
                }
            }
        });

        $('.page-content').on('click', '.open-next-row-2', function(e){
            let nextEl = $(this).parents('tbody').nextAll();
            let closed = $(this).hasClass('open');
            if(closed){
                $(this).removeClass('open');
            } else {
                $(this).addClass('open');
            }
            for (let i = 0; i < nextEl.length; i++) {
                if($(nextEl[i]).hasClass('shown-row') || $(nextEl[i]).hasClass('hidden-row-1')) {
                    return true;
                }
                if(closed){
                    if($(nextEl[i]).hasClass('hidden-row-2')){
                        $(nextEl[i]).fadeOut();
                    }
                } else {
                    if($(nextEl[i]).hasClass('hidden-row-2')){
                        $(nextEl[i]).fadeIn();
                    }
                }
            }
        });

        //filters change 
        $('.page-content').on('change', '.filter-wrapper select', function(e){
            $(this).parents('form').submit();
        });

        //filters data change 
        $('.page-content').on('apply.daterangepicker', '.box-date input', (e, picker) => {
            $(e.target).parents('form').submit();
        });
    });
});