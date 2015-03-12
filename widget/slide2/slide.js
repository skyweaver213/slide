/**
 * Created by huangjianhua on 14-12-20.
 */
/*
 param1 所有用到参数的obj
 startCallback: function() {},
 moveCallback: function() {},
 endCallback: function() {}
 */
function slide(options) {

    //默认的值
    var defaultObj = {
        cur_page: 0,
        slide_range: 130,
        parent_wrap: document
    };

    //自定义的参数
    $.extend(defaultObj, options);

    //当前滑动的页码，从0开始算
    var cur_page= 0;
    //保存touchstart的事件对象
    var touchFirst_obj;
    //保存touchend的事件对象
    var touchLast_obj;
    //touch事件移动的Y轴距里
    var moveY;
    //touchstart开始时translateY的坐标点
    var startTranslateY;
    //touchmove时translateY的坐标点
    var currentTranslateY;
    //当touchmove大于设置的slide_range触发翻页
    var slide_range = +defaultObj.slide_range;
    //一共滑动总页数
    var page_count = defaultObj.page_count;
    //总滑动页面的包裹器
    var parent_wrap = defaultObj.parent_wrap;
    //滑动区域的class或id
    var slide_page_dom = defaultObj.slide_page_dom;


    //滑动页面的事件绑定
    $(parent_wrap).on('touchstart', slide_page_dom, function (e) {
        //禁止浏览器默认事件
        e.preventDefault();

        //防止事件冒泡
        e.stopPropagation();

        touchFirst_obj = {
            startY : e.touches[0].clientY
        };

        //移除transition的过渡效果
        $(this).removeClass('transition_fast');

        //取translateY的值
        var transfrom_info = window.getComputedStyle(e.currentTarget, null).getPropertyValue("-webkit-transform").match(/matrix\((\d+,\s?){1,5}(\-?\d+)/);
        startTranslateY = transfrom_info && transfrom_info[2] || 0;

        $(this).css('-webkit-transform', 'translateY('+ startTranslateY +'px) translateZ(0)');
//        console.log(startTranslateY , 'startY',window.getComputedStyle(e.currentTarget, null).getPropertyValue("-webkit-transform"));

        //touchstart的回调函数
        defaultObj.startCallback && defaultObj.startCallback($(this));

    }).on('touchmove', slide_page_dom, function (e) {
        e.preventDefault();
        e.stopPropagation();

        touchLast_obj = e.touches[0];

        //计算滑动的移动距里
        moveY = touchLast_obj.clientY - touchFirst_obj.startY;
        currentTranslateY = +startTranslateY + +moveY;

        //第一张往上、和最后一张往下 return；
        if((startTranslateY ==0 && moveY > 0) || (startTranslateY == -window.innerHeight * (page_count-1) &&  moveY < 0)) {
            return;
        }
        $(this).css('-webkit-transform', 'translateY('+ currentTranslateY +'px) translateZ(0)');

        //touchmove的回调函数
        defaultObj.moveCallback && defaultObj.moveCallback($(this));

    }).on('touchend', slide_page_dom, function (e) {
        //添加过渡效果的class
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

        $(this).css('-webkit-transform', 'translateY('+ (-100 * (+cur_page)/page_count) +'%) translateZ(0)');

        //touchend的回调函数
        defaultObj.endCallback && defaultObj.endCallback($(this));
    });
}