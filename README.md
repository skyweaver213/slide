<h2>slide</h2>
这是一个微信里经常看到的翻页效果。<br/>
demo1和demo2效果是一样的，没有吸附功能。<br/>
demo1和demo2区别就是demo1是1个大容器里tranlateY处理， demo2是分开每一个页面单独处理。<br/>
demo1的写法如果增加一页或者减少一页对css的影响比较大，但是demo1的性能应该是最好的。<br/>
demo2单独对当前page和上一个page或下一个page处理，增加或减少一页对css和js也影响不大。但是性能应该没有demo1好。<br/>
demo3是带吸附功能的,用transition实现的，性能方面我觉得会比jq的animate效果要好。<br/>
第一个github项目 谢谢围观 ^ ^。<br/>

<h2>widget</h2>
widget目录是封装好的插件，slide1是不带吸附功能的(为了好扩展性用了demo2的方法，单独对每个page处理)<br/>
slide2是带吸附功能的，用法的灰常简单，只需要调用一个方法传几个参数<br/>
例如：  
    /*
     slide_page_dom          //滑动页面的class或者 id，             必传<br/>
     page_count              //一共滑动的页面的总个数               必传<br/>
     slide_range             //触发翻页效果移动的步长               不必传<br/>
     startCallback:          //touchStart的回调函数                 不必传<br/>
     moveCallback:           //touchmove的回调函数                  不必传<br/>
     endCallback:            //touchend的回调函数                   不必传<br/>
     */

    //调用滑动效果
    slide({
        slide_page_dom: '.slide_div',   //滑动页面的class或者 id，    必传
        page_count: 4,              //一共滑动的页面的总个数     必传
        slide_range: 150,           //触发翻页效果移动的步长    不必传
        //touchStart的回调函数
        startCallback: function(scope) {
            console.log('touch start', scope);
        },
        //touchmove的回调函数
        moveCallback: function(scope) {
            console.log('touch move', scope);
        },
        //touchend的回调函数
        endCallback: function(scope) {
            console.log('touch end', scope);
        }
    });
