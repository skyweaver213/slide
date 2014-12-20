/**
 * Created by huangjianhua on 14-12-20.
 */
/*
 param1 滑动页面的class或者 id  -------------  (必传)
 param2 一共几个滑动的页面      -------------  (必传)
 param3 滑动页面委托事件的父节点，不传默认是document
 */
function slide(slide_page_dom, page_count, parent_wrap) {
    var cur_page= 0, touchFirst_obj, touchLast_obj, moveY,
        page_count = page_count,
        parent_wrap = parent_wrap || document;

    $(parent_wrap).on('touchstart', slide_page_dom, function (e) {
        e.preventDefault();
        touchFirst_obj = {
            startY : e.touches[0].clientY
        };
    }).on('touchmove', slide_page_dom, function (e) {
        e.preventDefault();
        touchLast_obj = e.touches[0];

        moveY = touchLast_obj.clientY - touchFirst_obj.startY;
    }).on('touchend',slide_page_dom, function (e) {
        var me = $(this);
        //上 或 下
        if(moveY > 0) {
            //第一页的话 不作处理
            if(cur_page == 0) return;
            cur_page--;

            me.prev(slide_page_dom).removeClass('hide').addClass('moveFromTop').addClass('current');
            me.addClass('moveToBottom');

            me.on('webkitAnimationEnd', function() {
                me.prev(slide_page_dom).removeClass('moveFromTop');
                me.removeClass('moveToBottom').removeClass('current').addClass('hide');
                me.off('webkitAnimationEnd');
            });

        } else if(moveY < 0) {
            //最后一页的话 return
            if(cur_page == +page_count-1) return;
            cur_page++;
            me.addClass('moveToTop').removeClass('moveFromBottom');
            me.next(slide_page_dom).removeClass('hide').addClass('moveFromBottom').addClass('current');
            me.on('webkitAnimationEnd', function() {
                me.removeClass('moveToTop').removeClass('current').addClass('hide');
                me.next(slide_page_dom).removeClass('moveFromBottom');
                me.off('webkitAnimationEnd');
            });

        }
    });

}