/**
 * Created by huangjianhua on 14-12-20.
 */
/*
 param1 滑动页面的class或者 id  -------------  (必传)
 param2 一共几个滑动的页面      -------------  (必传)
 param3 滑动页面委托事件的父节点，不传默认是document
 */
function slide(options) {

    //默认的值
    var defaultObj = {
        cur_page: 0,
        parent_wrap: document,
        slide_page_wrap: '.slide_div',
        slide_page_dom: '.slide_page'
    };

    //自定义的参数
    $.extend(defaultObj, options);

    //滑动区域的class或id
    var slide_page_wrap = defaultObj.slide_page_wrap;
    //滑动页面的class或id
    var slide_page_dom= defaultObj.slide_page_dom;
    var $slide_page =  $(slide_page_dom);

    //当前滑动的页码，从0开始算
    var cur_page= 0;
    //保存touchstart的事件对象
    var touchFirst_obj;
    //保存touchend的事件对象
    var touchLast_obj;
    //touch事件移动的Y轴距里
    var moveY;
    //一共滑动总页数
    var page_count = defaultObj.page_count || $slide_page.length;
    //总滑动页面的包裹器
    var parent_wrap = defaultObj.parent_wrap;


    $(slide_page_wrap).on('touchstart', slide_page_dom, function (e) {
        e.preventDefault();
        touchFirst_obj = {
            startY : e.touches[0].clientY
        };

        //touchstart的回调函数
        defaultObj.startCallback && defaultObj.startCallback($(this));

    }).on('touchmove', slide_page_dom, function (e) {
        e.preventDefault();
        touchLast_obj = e.touches[0];

        moveY = touchLast_obj.clientY - touchFirst_obj.startY;

        //touchmove的回调函数
        defaultObj.moveCallback && defaultObj.moveCallback($(this));

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

        //touchend的回调函数
        defaultObj.endCallback && defaultObj.endCallback($(this));

    });

}