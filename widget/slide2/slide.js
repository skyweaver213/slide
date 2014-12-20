/**
 * Created by huangjianhua on 14-12-20.
 */
/*
 param1 滑动页面的class或者 id  -------------  (必传)
 param2 一共几个滑动的页面      -------------  (必传)
 param3 吸附翻页的范围      -------------  (不必传)
 param4 滑动页面委托事件的父节点，不传默认是document
 */
function slide(slide_page_dom, page_count, slide_range, parent_wrap) {
    var cur_page= 0, touchFirst_obj, touchLast_obj, moveY, startTranslateY, currentTranslateY,
        slide_range = +slide_range || 130,
        page_count = page_count,
        parent_wrap = parent_wrap || document;

    $(parent_wrap).on('touchstart', slide_page_dom, function (e) {
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

    }).on('touchmove', slide_page_dom, function (e) {
        e.preventDefault();
        touchLast_obj = e.touches[0];

        moveY = touchLast_obj.clientY - touchFirst_obj.startY;
        currentTranslateY = +startTranslateY + +moveY;

        //第一张往上、和最后一张往下 return；
        if((startTranslateY ==0 && moveY > 0) || (startTranslateY == -window.innerHeight * (page_count-1) &&  moveY < 0)) {
            return;
        }
        $(this).css('-webkit-transform', 'translateY('+ currentTranslateY +'px) translateZ(0)');

    }).on('touchend', slide_page_dom, function (e) {
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
}