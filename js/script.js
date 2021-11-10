jQuery(function ($) {
    $(document).ready(function () {
        $('.toggle-sidebar').click(function () {
            $('.sidebar').toggleClass('hide');
            $('.header').toggleClass('full-width');
            $('.content').toggleClass('full-width');
        });

        $('.treeview a').click(function (e) {
            if ($(this).parents('.hidden-menu').length === 0) {
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

        $('.page-content').on('click', '.open-next-row', function (e) {
            let nextEl = $(this).parents('tbody').nextAll();
            let closed = $(this).hasClass('open');
            if (closed) {
                $(this).removeClass('open');
            } else {
                $(this).addClass('open');
            }
            for (let i = 0; i < nextEl.length; i++) {
                if ($(nextEl[i]).hasClass('shown-row')) {
                    return true;
                }
                if (closed) {
                    if ($(nextEl[i]).hasClass('hidden-row-1')) {
                        $(nextEl[i]).fadeOut();
                        if ($(nextEl[i]).find('.open-next-row-2.open').length > 0) {
                            console.log($(nextEl[i]).find('.open-next-row-2'));
                            $(nextEl[i]).find('.open-next-row-2.open').click();
                        }
                    }
                } else {
                    if ($(nextEl[i]).hasClass('hidden-row-1')) {
                        $(nextEl[i]).fadeIn();
                    }
                }
            }
        });

        $('.page-content').on('click', '.open-next-row-2', function (e) {
            let nextEl = $(this).parents('tbody').nextAll();
            let closed = $(this).hasClass('open');
            if (closed) {
                $(this).removeClass('open');
            } else {
                $(this).addClass('open');
            }
            for (let i = 0; i < nextEl.length; i++) {
                if ($(nextEl[i]).hasClass('shown-row') || $(nextEl[i]).hasClass('hidden-row-1')) {
                    return true;
                }
                if (closed) {
                    if ($(nextEl[i]).hasClass('hidden-row-2')) {
                        $(nextEl[i]).fadeOut();
                    }
                } else {
                    if ($(nextEl[i]).hasClass('hidden-row-2')) {
                        $(nextEl[i]).fadeIn();
                    }
                }
            }
        });

        //filters change 
        $('.page-content').on('change', '.filter-wrapper select', function (e) {
            $(this).parents('form').submit();
        });

        //filters data change 
        $('.page-content').on('apply.daterangepicker', '.box-date input', (e, picker) => {
            $(e.target).parents('form').submit();
        });
        if($.fn.select2){
            $('.select2-single').select2({
                minimumResultsForSearch: Infinity
            });
        }
    });
});


/* one-anket-page */


// change profile image
$(".edit").click(function (e) {
    $("#imageUpload").click();
});

function photoPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#profileImage').attr('src',
            window.URL.createObjectURL(uploader.files[0]));
    }
}

$("#imageUpload").change(function () {
    photoPreview(this);
});




let surveyPoint = $('.point-square .point').text() * 1;
let form = $('#anket-form');

if (surveyPoint <= 6) {
    $('.take-to-work').show();
}

$('.take-to-work').on('click', function () {
    $(this).hide();
    $('.complete-btn-wrapper').show();
    $('.comment-container').fadeIn();
});

$('.send-btn').on('click', function (evt) {
    evt.preventDefault();
    let comment = $('.comment-field').val();
    if (comment == '') {
        $('.comment-container .comment-error').fadeIn();
    } else {
        $('.alert-comment').text(comment)
        $('.comment-container').hide();
        $('.complete-btn-wrapper').hide();
        $('.alert-history-container').fadeIn();
        // form.submit();
    }

});

$('.comment-field').focus(function() {
    $('.comment-container .comment-error').fadeOut();
  });