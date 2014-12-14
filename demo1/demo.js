/**
 * Created by huangjianhua on 14-12-14.
 */
$(function () {
    var cur_page= 0, touchFirst_obj, touchLast_obj, touchEnd_obj, moveY,
        slide_range = 30,
        page_count = $('.slide_div div').length || 4;

    $(document).on('touchstart', '.slide_div', function (e) {
        e.preventDefault();
        touchFirst_obj = {
            startY : e.touches[0].clientY
        };

    });

    $(document).on('touchmove', '.slide_div', function (e) {
        e.preventDefault();
        touchLast_obj = e.touches[0];

        moveY = touchLast_obj.clientY - touchFirst_obj.startY;
    });

    $(document).on('touchend', '.slide_div', function (e) {
//        touchEnd_obj =  e.changedTouches[0];

        //上 或 下
        if(moveY > 0) {
            //第一页的话 不作处理
            if(cur_page == 0) return;
            cur_page--;
            $(this).attr('class', 'slide_div slide_animate_down_' + cur_page);
        } else if(moveY < 0) {
            //最后一页的话 return
            if(cur_page == +page_count-1) return;
            cur_page++;
            $(this).attr('class', 'slide_div slide_animate_up_' + cur_page);
        }
    });
});