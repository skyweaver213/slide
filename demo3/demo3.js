/**
 * Created by huangjianhua on 14-12-14.
 */
$(function () {
    var cur_page= 0, touchFirst_obj, touchLast_obj, touchEnd_obj, moveY, startTranslateY, currentTranslateY,
        slide_range = 130,
        page_count = $('.slide_div div').length || 4;

    $(document).on('touchstart', '.slide_div', function (e) {
        e.preventDefault();
        touchFirst_obj = {
            startY : e.touches[0].clientY
        };

        $(this).removeClass('transition_fast');

        //取translateY的值
        var transfrom_info = window.getComputedStyle(e.currentTarget, null).getPropertyValue("-webkit-transform").match(/matrix\((\d+,\s?){1,5}(\-?\d+)/);
        startTranslateY = transfrom_info && transfrom_info[2] || 0;

        $(this).css('-webkit-transform', 'translateY('+ startTranslateY +'px) translateZ(0)');
//        console.log(startTranslateY , 'startY',window.getComputedStyle(e.currentTarget, null).getPropertyValue("-webkit-transform"));

    });

    $(document).on('touchmove', '.slide_div', function (e) {
        e.preventDefault();
        touchLast_obj = e.touches[0];

        moveY = touchLast_obj.clientY - touchFirst_obj.startY;
        currentTranslateY = +startTranslateY + +moveY;

        //第一张往上、和最后一张往下 return；
        if((startTranslateY ==0 && moveY > 0) || (startTranslateY == -window.innerHeight * (page_count-1) &&  moveY < 0)) {
            return;
        }
        $(this).css('-webkit-transform', 'translateY('+ currentTranslateY +'px) translateZ(0)');

    });

    $(document).on('touchend', '.slide_div', function (e) {
//        touchEnd_obj =  e.changedTouches[0];
        $(this).addClass('transition_fast');
        //上 或 下
        if(moveY > slide_range) {
            //第一页的话 不作处理
            if(cur_page == 0) return;
            cur_page--;
        } else if(moveY < -slide_range) {
            //最后一页的话 return
            if(cur_page == +page_count-1) return;
            cur_page++;
        }

        $(this).css('-webkit-transform', 'translateY('+ (-100 * (+cur_page)/4) +'%) translateZ(0)');
    });
});