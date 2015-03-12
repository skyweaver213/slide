/**
 * Created bX huangjianhua on 14-12-20.
 */
/*
 param1 所有用到参数的obj {
     slide_page_wrap          //滑动区域的class或者 id，            必传
     slide_page_dom          //滑动页面的class或者 id，             必传
     page_count              //一共滑动的页面的总个数               不必传（不传默认是page_dom.length）
     slide_range             //触发翻页效果移动的步长               不必传
 }
 startCallback: function,     //touchStart的回调函数                 不必传
 moveCallback: function,      //touchmove的回调函数                  不必传
 endCallback: function        //touchend的回调函数                   不必传
 */
function slide(options) {

    //默认的值
    var defaultObj = {
        cur_page: 0,
        slide_range: 50,
        parent_wrap: document
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
    //touch事件移动的X轴距里
    var moveX;
    //touchstart开始时translateX的坐标点
    var startTranslateX;
    //touchmove时translateX的坐标点
    var currentTranslateX;
    //当touchmove大于设置的slide_range触发翻页
    var slide_range = +defaultObj.slide_range;
    //一共滑动总页数
    var page_count = defaultObj.page_count || $slide_page.length;
    //总滑动页面的包裹器
    var parent_wrap = defaultObj.parent_wrap;


    //兼容不支持calc的浏览器
    $slide_page.css('width', (100 / page_count) + '%');


    //滑动页面的事件绑定
    $(parent_wrap).on('touchstart', slide_page_wrap, function (e) {
        //禁止浏览器默认事件
        e.preventDefault();

        //防止事件冒泡
        e.stopPropagation();

        touchFirst_obj = {
            startX : e.touches[0].clientX
        };

        //移除transition的过渡效果
        $(this).removeClass('transition_fast');

        //取translateX的值
        var transfrom_info = window.getComputedStyle(e.currentTarget, null).getPropertyValue("-webkit-transform").match(/matrix\((\d+,\s?){1,5}(\-?\d+)/);
        startTranslateX = transfrom_info && transfrom_info[2] || 0;

        $(this).css('-webkit-transform', 'translateX('+ startTranslateX +'px) translateZ(0)');
//        console.log(startTranslateX , 'startX',window.getComputedStyle(e.currentTarget, null).getPropertyValue("-webkit-transform"));

        //touchstart的回调函数
        defaultObj.startCallback && defaultObj.startCallback($(this));

    }).on('touchmove', slide_page_wrap, function (e) {
        e.preventDefault();
        e.stopPropagation();

        touchLast_obj = e.touches[0];

        //计算滑动的移动距里
        moveX = touchLast_obj.clientX - touchFirst_obj.startX;
        currentTranslateX = +startTranslateX + +moveX;

        //第一张往上、和最后一张往下 return；
        if((startTranslateX ==0 && moveX > 0) || (startTranslateX == -window.innerWidth * (page_count-1) &&  moveX < 0)) {
            return;
        }
        $(this).css('-webkit-transform', 'translateX('+ currentTranslateX +'px) translateZ(0)');

        //touchmove的回调函数
        defaultObj.moveCallback && defaultObj.moveCallback($(this));

    }).on('touchend', slide_page_wrap, function (e) {
        //添加过渡效果的class
        $(this).addClass('transition_fast');

        //上 或 下
        if(moveX > slide_range) {
            //第一页的话 不作处理
            if(cur_page == 0) return;
            cur_page--;
        } else if(moveX < -slide_range) {
            //最后一页的话 return
            if(cur_page == +page_count-1) return;
            cur_page++;
        }

        $(this).css('-webkit-transform', 'translateX('+ (-100 * (+cur_page)/page_count) +'%) translateZ(0)');

        //touchend的回调函数
        defaultObj.endCallback && defaultObj.endCallback($(this));
    });
}