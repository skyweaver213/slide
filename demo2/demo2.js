/**
 * Created by huangjianhua on 14-12-14.
 */
$(function () {
    var cur_page= 0, touchFirst_obj, touchLast_obj, touchEnd_obj, moveY,
        slide_range = 30,
        page_count = $('.slide_div div').length || 4;

    $(document).on('touchstart', '.slide_page', function (e) {
        e.preventDefault();
        touchFirst_obj = {
            startY : e.touches[0].clientY
        };
    });

    $(document).on('touchmove', '.slide_page', function (e) {
        e.preventDefault();
        touchLast_obj = e.touches[0];

        moveY = touchLast_obj.clientY - touchFirst_obj.startY;

    });

    $(document).on('touchend', '.slide_page', function (e) {
//        touchEnd_obj =  e.changedTouches[0];

        //上 或 下
        if(moveY > 0) {
            //第一页的话 不作处理
            if(cur_page == 0) return;
            cur_page--;
            $(this).prev('.slide_page').removeClass('hide').addClass('moveFromTop').addClass('current');
            $(this).addClass('moveToBottom');

            $(this).on('webkitAnimationEnd', function() {
                $(this).prev('.slide_page').removeClass('moveFromTop');
                $(this).removeClass('moveToBottom').removeClass('current').addClass('hide');
                $(this).off('webkitAnimationEnd');
            });

        } else if(moveY < 0) {
            //最后一页的话 return
            if(cur_page == +page_count-1) return;
            cur_page++;
            $(this).addClass('moveToTop').removeClass('moveFromBottom');
            $(this).next('.slide_page').removeClass('hide').addClass('moveFromBottom').addClass('current');
            $(this).on('webkitAnimationEnd', function() {
                $(this).removeClass('moveToTop').removeClass('current').addClass('hide');
                $(this).next('.slide_page').removeClass('moveFromBottom');
                $(this).off('webkitAnimationEnd');
            });

        }
    });


});